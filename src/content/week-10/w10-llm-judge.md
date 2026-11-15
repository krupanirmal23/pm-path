---
id: w10-llm-judge
title: "Code-based checks and LLM-as-judge"
week: 10
estimatedMinutes: 16
tags: [ai, evals, llm-as-judge]
---

## Why this matters for a PM

Human labelling is the gold standard, but you can’t hand-label every output after every change, or every conversation in production. Two scalable methods fill the gap: **code-based checks** (deterministic rules) and **LLM-as-judge** (using a model to grade outputs against a rubric). Used well, they let you test hundreds of cases in minutes. Used carelessly, they give you confident, wrong scores. Your deliverable includes an LLM judge **checked against your own labels**.

## Core concepts

### Code-based checks (deterministic evals)

A **code-based check** is a rule your code can verify exactly. Examples:
- **Format:** output is valid JSON; required fields present; values in the allowed list (enum).
- **Exact match:** extracted order ID equals the expected ID; category equals the label.
- **Numeric checks:** amounts sum to the total; refund ≤ order value.
- **Length limits:** under 80 words.
- **Contains / doesn’t contain:** includes a required disclaimer; no banned words; no phone numbers or email addresses (PII patterns).
- **Language detection:** reply is in the user’s language.
- **Citation validity:** cited document IDs exist in the retrieved set.

Strengths: fast, free, perfectly consistent, easy to run on every change. Weaknesses: can’t judge nuance (helpfulness, tone, whether an explanation is correct in meaning).

**Rule of thumb:** use code checks for everything that *can* be checked by code, before reaching for an LLM judge.

### LLM-as-judge

**LLM-as-judge** means asking an LLM to evaluate another model’s output against criteria, returning a grade (pass/fail or a score) and usually a short reason.

Common formats:
- **Single-output grading:** “Given the question, the source documents and the answer, does the answer contain any claim not supported by the sources? Answer PASS or FAIL, then explain in one sentence.”
- **Pairwise comparison:** “Which of answers A and B better follows these guidelines?” Useful for comparing versions.
- **Reference-based:** compare the output to an expected answer: “Does the answer convey the same facts as the reference?”

### Writing a good judge prompt

1. **One criterion per judge** (or clearly separated criteria). “Faithfulness” and “tone” in one judge muddles results.
2. **Binary pass/fail** with precise definitions beats 1–10 scores.
3. **Provide the evidence** the judge needs: question, sources, output, and reference answer if available.
4. **Define pass and fail with examples**, including borderline cases.
5. **Ask for a short reason** before or after the verdict (helps debugging; reasoning first can improve accuracy).
6. **Use structured output** (JSON: `{"verdict": "PASS", "reason": "..."}`).
7. **Low temperature** for consistency.

### Known judge biases

LLM judges have systematic tendencies:
- **Position bias:** in pairwise comparisons, favouring the first (or second) answer. Fix: run both orders and combine.
- **Verbosity bias:** preferring longer answers.
- **Self-preference:** favouring outputs from the same model family.
- **Leniency:** passing outputs a strict human would fail.
- **Missing domain knowledge:** can’t judge correctness without the source facts.

That’s why you must **validate the judge against human labels**.

### Checking the judge against human labels (the essential step)

Treat the judge like a new team member whose work you check:
1. Take a set of outputs you’ve **labelled yourself** (e.g., your 50 golden examples).
2. Run the judge on the same outputs.
3. Compare judge verdicts with your labels in a **confusion matrix**:

| | Human PASS | Human FAIL |
|---|---|---|
| **Judge PASS** | agree (true pass) | **false pass** (judge missed a failure) |
| **Judge FAIL** | **false fail** (judge too strict) | agree (true fail) |

4. Compute:
   - **Agreement (accuracy):** (agree cells) ÷ total.
   - **Recall on failures** (or the true negative rate for “fail” class): of outputs you marked FAIL, what share did the judge also fail? This matters most: a judge that misses failures gives false comfort.
   - **Precision on failures:** of outputs the judge marked FAIL, what share were really failures?
5. **Read disagreements**, improve the judge prompt (clearer definitions, examples), and re-check.
6. Only trust the judge at scale once agreement is high (many teams aim for roughly 85–90%+ agreement, with strong recall on failures, for the criterion in question) and keep spot-checking periodically.

PM Path’s **Eval Labeler** includes a judge-vs-human agreement checker: paste both label columns and it computes agreement and the confusion matrix.

### Layered evaluation

A practical stack:
1. **Code checks** on every output (format, numbers, PII, length).
2. **LLM judges** for nuanced criteria (faithfulness, helpfulness), each validated against human labels.
3. **Human review** of a sample and of all judge-flagged high-risk cases.
4. **Production signals** (next lesson).

## Worked example

**Feature:** a RAG help assistant. Criterion: **faithfulness** (no claims unsupported by the retrieved sources).

**Judge prompt (summary):** “You are checking whether an answer is fully supported by the sources. FAIL if the answer states any fact, number, timeline or policy not present in the sources, even if it might be true. PASS if every claim is supported or the answer says the information isn’t available. Return JSON with verdict and the unsupported claim if FAIL.”

**Validation on 60 human-labelled answers:**

| | Human PASS (42) | Human FAIL (18) |
|---|---|---|
| Judge PASS | 40 | 6 |
| Judge FAIL | 2 | 12 |

- Agreement: (40 + 12) / 60 = **87%**.
- Recall on failures: 12 / 18 = **67%** → the judge misses one in three real failures. Not good enough.

**Disagreement review:** the 6 missed failures were answers that **rounded or paraphrased numbers** (“about a week” for “5–7 working days”) or added generic advice (“contact your bank”) not in the sources.

**Judge v2:** add explicit rules (“paraphrased numbers or timelines must match exactly”; “generic advice not in sources counts as unsupported”) and two borderline examples.

**Re-validation:** agreement 93%; recall on failures 16/18 = **89%**. Now usable for regression testing, with weekly human spot checks on 20 samples.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 260" role="img" aria-labelledby="lj-t lj-d">
<title id="lj-t">Validating an LLM judge</title>
<desc id="lj-d">A confusion matrix comparing judge verdicts with human labels, highlighting false passes as the most dangerous cell, alongside a layered evaluation stack.</desc>
<text x="40" y="30" class="d-text" font-weight="700">Judge vs. your labels</text>
<text x="150" y="58" class="d-text" font-size="11" font-weight="700">Human PASS</text>
<text x="265" y="58" class="d-text" font-size="11" font-weight="700">Human FAIL</text>
<text x="30" y="98" class="d-text" font-size="11" font-weight="700">Judge PASS</text>
<text x="30" y="168" class="d-text" font-size="11" font-weight="700">Judge FAIL</text>
<rect x="130" y="68" width="110" height="60" class="d-mint d-ink" stroke-width="2"/><text x="150" y="103" class="d-text-dark" font-weight="700">agree · 40</text>
<rect x="240" y="68" width="110" height="60" class="d-pink d-ink" stroke-width="3"/><text x="252" y="96" class="d-text-dark" font-weight="700">false pass · 6</text><text x="252" y="114" class="d-text-dark" font-size="10">most dangerous</text>
<rect x="130" y="128" width="110" height="60" class="d-butter d-ink" stroke-width="2"/><text x="142" y="156" class="d-text-dark" font-weight="700">false fail · 2</text><text x="142" y="172" class="d-text-dark" font-size="10">too strict</text>
<rect x="240" y="128" width="110" height="60" class="d-mint d-ink" stroke-width="2"/><text x="260" y="163" class="d-text-dark" font-weight="700">agree · 12</text>
<text x="40" y="218" class="d-text" font-size="12">Agreement 87% · failure recall 12/18 = 67% → improve judge</text>
<rect x="400" y="40" width="220" height="40" rx="8" class="d-lavender d-ink" stroke-width="2"/><text x="412" y="65" class="d-text-dark" font-size="11" font-weight="700">1 Code checks (every output)</text>
<rect x="400" y="90" width="220" height="40" rx="8" class="d-sky d-ink" stroke-width="2"/><text x="412" y="115" class="d-text-dark" font-size="11" font-weight="700">2 LLM judges (validated)</text>
<rect x="400" y="140" width="220" height="40" rx="8" class="d-butter d-ink" stroke-width="2"/><text x="412" y="165" class="d-text-dark" font-size="11" font-weight="700">3 Human samples + high risk</text>
<rect x="400" y="190" width="220" height="40" rx="8" class="d-peach d-ink" stroke-width="2"/><text x="412" y="215" class="d-text-dark" font-size="11" font-weight="700">4 Production signals</text>
</svg>
<figcaption>Never trust a judge you haven’t checked against human labels. Watch false passes most closely.</figcaption>
</figure>

## Step by step

Building and validating your judge (deliverable):

1. **List your criteria** and mark which can be checked by code. Implement those first (Promptfoo assertions or simple scripts).
2. **Pick one nuanced criterion** (e.g., faithfulness or helpfulness) for an LLM judge.
3. **Write the judge prompt**: definition, pass/fail rules, borderline examples, JSON output.
4. **Run the judge** on your 50 human-labelled outputs.
5. **Paste both label columns** into the Eval Labeler’s agreement checker.
6. **Compute agreement** and **failure recall**; read every disagreement.
7. **Improve the judge prompt** and re-run until agreement is high and failure recall is strong.
8. **Document** the judge version and its agreement numbers in your P4 eval report.
9. **Use the judge** for regression checks on future versions, with periodic human spot checks.

## Common mistakes

1. **Using an LLM judge where a code check works.**
2. **Never validating the judge** against human labels.
3. **One judge for many criteria**, producing muddled verdicts.
4. **1–10 scores** with no anchors, giving noisy results.
5. **Ignoring position and verbosity bias** in pairwise judging.
6. **Trusting agreement alone** when the judge misses most real failures.

## How it shows up in interviews

> [!INTERVIEW]
> **“How do you evaluate AI outputs at scale?”**
> Outline: code checks for deterministic criteria → LLM-as-judge for nuanced criteria with binary rubrics → validate judges against human labels (agreement, failure recall) → human sampling for high-risk cases → production signals → regression suite on every change.

> [!INTERVIEW]
> **“Can you trust an LLM to grade another LLM?”**
> Outline: only after validation → known biases (position, verbosity, self-preference, leniency) → mitigations (clear binary rubrics, evidence provided, both orders for pairwise, structured output) → measure agreement with humans → keep spot-checking.

## Practice exercise

**Task (25 minutes):** Your judge for “answers in the user’s language and stays polite” was compared with your labels on 40 outputs: Judge PASS & Human PASS = 26; Judge PASS & Human FAIL = 5; Judge FAIL & Human PASS = 3; Judge FAIL & Human FAIL = 6. Calculate agreement and failure recall. Is it good enough? What would you change? Also: which part of this criterion should be a code check instead?

```answer Reveal a model answer
- **Agreement:** (26 + 6) / 40 = 32/40 = **80%**.
- **Human FAILs:** 5 + 6 = 11. **Failure recall:** 6 / 11 = **55%**: the judge misses almost half of real failures.
- **Verdict:** not good enough to rely on; it would give false comfort.
- **Changes:** split the criterion into two judges (language and politeness), because they’re different things; define “polite” with concrete fail examples (blaming the user, sarcasm, all caps); add borderline examples; ask for a reason before the verdict; re-validate.
- **Code check:** “answers in the user’s language” can mostly be checked with a language-detection library comparing the input and output languages (with care for Hinglish), leaving the LLM judge to handle politeness only.
```

## Quiz

```quiz
Q: Which criterion is best checked with code rather than an LLM judge?
- [ ] Is the explanation helpful for a beginner? :: Nuanced; suited to human or LLM judgement.
- [x] Is the output valid JSON with all required fields? :: Correct. Deterministic checks are fast, free and exact.
- [ ] Is the tone empathetic? :: Nuanced; needs judgement.
- [ ] Is the answer persuasive? :: Nuanced; needs judgement.

Q: What is LLM-as-judge?
- [ ] An LLM that writes laws :: Unrelated: the judge grades outputs, not legislation.
- [x] Using an LLM to grade AI outputs against defined criteria :: Correct. It scales nuanced grading once validated.
- [ ] A human judging the LLM :: That’s human evaluation.
- [ ] A legal review of AI :: Unrelated: it’s an evaluation technique, not legal review.

Q: Why must you validate an LLM judge against human labels?
- [ ] Regulations require it :: Not generally; it’s about reliability.
- [x] Judges have biases and can miss failures, so you need to know how often they agree with careful humans :: Correct. Measure agreement and failure recall before trusting it.
- [ ] To make the judge faster :: Validation doesn’t change speed.
- [ ] Judges never make mistakes :: They do make mistakes, which is exactly why validation matters.

Q: In judge validation, which cell is usually most dangerous?
- [ ] Judge FAIL, Human FAIL :: That’s agreement.
- [ ] Judge PASS, Human PASS :: That’s agreement.
- [x] Judge PASS, Human FAIL (false pass) :: Correct. Real failures slip through and give false confidence.
- [ ] Judge FAIL, Human PASS :: Too strict, annoying but safer.

Q: What is position bias in pairwise judging?
- [ ] Favouring answers from certain countries :: Not what it means.
- [x] Favouring the answer shown first (or second) regardless of quality :: Correct. Run both orders to counter it.
- [ ] Preferring shorter answers :: That would be a length bias, usually the opposite (verbosity bias).
- [ ] Bias in where the server is located :: Unrelated: position bias is about answer order in a comparison.

Q: Why prefer binary pass/fail over 1–10 scores for judges?
- [ ] Binary is required by APIs :: It isn’t required.
- [x] Clear binary definitions produce more consistent, interpretable results :: Correct. Pass/fail rules are easier to apply the same way every time.
- [ ] Scores can’t be stored :: Scores can be stored easily; consistency is the real issue.
- [ ] Binary judges are always correct :: No judge is always correct.

Q: A judge agrees with you 90% of the time, but catches only 40% of real failures. Should you rely on it?
- [ ] Yes, 90% agreement is high :: High agreement can hide poor failure detection if most outputs pass.
- [x] No; improve it until it reliably catches failures, because missed failures give false comfort :: Correct. Failure recall matters as much as overall agreement.
- [ ] Yes, but only for high-stakes outputs :: The opposite of what you want.
- [ ] Agreement doesn’t matter at all :: It matters, alongside failure recall.
```

## Key takeaways

- Use **code-based checks** for anything deterministic: format, numbers, PII, length, enums, citations.
- **LLM-as-judge** scales nuanced grading; use **one criterion per judge**, **binary rubrics**, evidence and **JSON output**.
- Judges have **biases** (position, verbosity, self-preference, leniency).
- **Validate against human labels**: confusion matrix, **agreement** and especially **failure recall**.
- Layer **code checks → validated judges → human samples → production signals**.
