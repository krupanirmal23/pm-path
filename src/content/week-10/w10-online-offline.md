---
id: w10-online-offline
title: Online vs. offline evals and tracing
week: 10
estimatedMinutes: 15
tags: [ai, evals, observability]
---

## Why this matters for a PM

A great score on your golden set doesn’t guarantee happy users. Real people ask things you never imagined, models get updated, data drifts and costs creep up. **Offline evals** tell you whether a change is safe to ship; **online evals** and **tracing** tell you what’s actually happening in production. AI PMs need both, plus the habit of turning production failures into new test cases.

## Core concepts

### Offline evals

**Offline evals** run on a fixed dataset *before* release, in a controlled setting. Everything from the last two lessons: golden datasets, code checks, LLM judges, human labels.

Use them to:
- Compare prompts, models and retrieval settings.
- Catch **regressions** before users see them (run the suite on every change, like automated tests).
- Make go/no-go decisions.

Limits: the dataset may not reflect real usage; users change; it can’t measure real user satisfaction or business impact.

### Online evals

**Online evals** measure the system’s behaviour with real users in production. They include:

**1. Explicit user feedback**
- 👍/👎 rates, “Report a problem” reasons, ratings, survey responses.
- Biased (only some users respond, often unhappy ones), but valuable for spotting failure types.

**2. Implicit behavioural signals**
- Did the user accept the suggestion, copy the answer, click the citation?
- Did they edit the draft heavily, retry, rephrase, abandon, or escalate to a human?
- Did they complete the task (paid, booked, resolved)?
- Did they come back (retention for AI feature users)?

**3. Production evals on sampled traffic**
- Run code checks and validated LLM judges on a sample of real outputs (e.g., 5% daily) to estimate faithfulness, safety and policy violations at scale.
- Human review of a smaller random sample plus all flagged high-risk cases.

**4. Business and product metrics**
- Task success rate, resolution rate without human, time saved, conversion, support tickets, CSAT.
- **A/B tests** comparing AI vs. non-AI, or v1 vs. v2, on real outcomes (Week 6).

**5. Operational metrics**
- Latency (time to first token, total time, p95), error and timeout rates, **cost per request and per user**, token usage, rate-limit hits.

### Tracing

**Tracing** records the full path of each AI request: inputs, retrieved documents, prompts, tool calls, model outputs, latency and cost at each step. A **trace** is the record of one request; a **span** is one step inside it (e.g., “retrieve”, “LLM call”, “tool: get_order”).

Why it matters:
- **Debugging:** when a user reports a wrong answer, find the trace and see exactly what happened: was the right document retrieved? which prompt version ran? what did the tool return?
- **Cost and latency analysis:** which step is slow or expensive?
- **Dataset building:** turn interesting traces (failures, edge cases) into golden examples.
- **Accountability:** audit trail of what the AI did, especially for agents taking actions.

Tools like **Langfuse** (open source, free tier), LangSmith, Arize and others provide tracing and production evals (see the Langfuse guide).

### Privacy in traces

Traces can contain personal data. Apply **data minimisation**: mask or avoid storing sensitive fields (phone numbers, addresses, card details), set retention limits, restrict access, and get consent where required (DPDP basics in Week 11).

### Drift

**Drift** is when production conditions change over time, so quality changes even if you didn’t change anything:
- **Input drift:** users ask new kinds of questions (a new product launch, a festival, a policy change).
- **Data drift:** your documents or catalogue change; retrieval breaks.
- **Model drift:** the provider updates the model behind the same name, or you switch versions.

Monitor online metrics over time, re-run offline evals on a schedule, and **pin model versions** where possible.

### The full loop

1. Build offline evals → ship when they pass.
2. Monitor online signals and sampled production evals.
3. Investigate failures via traces.
4. Add failures to the golden dataset.
5. Fix, re-run offline evals, ship, repeat.

This loop is how AI products improve continuously.

## Worked example

**Product:** an AI order-help assistant at a food delivery app, launched to 10% of users.

**Offline (before launch):** 200-example golden set; faithfulness 94% (validated judge), correct resolution 88%, safety 100%, p95 latency 2.8 s.

**Online (first two weeks):**
- 👎 rate: 9% overall, but **21% on “refund” conversations**.
- Escalation to human: 18% (target ≤ 15%).
- Cost per conversation: ₹0.35 (budget ₹0.40).
- Sampled production judge: faithfulness 89% (lower than offline).

**Tracing investigation:** filter traces for refund conversations with 👎. Pattern: users asking about refunds for **cancelled orders paid by COD** (cash on delivery); retrieval returns the online-payment refund policy; the model says “refund to your original payment method” (nonsense for COD). Offline set had no COD-cancellation cases (**input coverage gap**).

**Fix:** add a COD-specific policy chunk and a routing rule (payment method from order data selects the policy section); add 15 COD cases to the golden set; re-run offline evals (refund correctness 72% → 93%); ship.

**After:** refund 👎 rate 21% → 8%; escalation 18% → 14%.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 270" role="img" aria-labelledby="oo2-t oo2-d">
<title id="oo2-t">Offline and online evaluation loop</title>
<desc id="oo2-d">Offline evals gate releases; in production, traces, user feedback, sampled judges and business metrics monitor quality; failures from traces feed back into the golden dataset.</desc>
<defs><marker id="oo2-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="15" y="40" width="200" height="190" rx="12" class="d-lavender d-ink" stroke-width="2"/>
<text x="30" y="66" class="d-text-dark" font-weight="700">Offline (before release)</text>
<text x="30" y="92" class="d-text-dark" font-size="11">• golden dataset</text>
<text x="30" y="112" class="d-text-dark" font-size="11">• code checks</text>
<text x="30" y="132" class="d-text-dark" font-size="11">• validated judges</text>
<text x="30" y="152" class="d-text-dark" font-size="11">• regression suite</text>
<text x="30" y="182" class="d-text-dark" font-size="11" font-weight="700">Gate: ship only if</text>
<text x="30" y="200" class="d-text-dark" font-size="11" font-weight="700">thresholds pass</text>
<rect x="290" y="40" width="330" height="190" rx="12" class="d-sky d-ink" stroke-width="2"/>
<text x="305" y="66" class="d-text-dark" font-weight="700">Online (production)</text>
<rect x="305" y="80" width="145" height="60" rx="8" class="d-surface d-ink" stroke-width="1.5"/><text x="315" y="102" class="d-text" font-size="11" font-weight="700">User signals</text><text x="315" y="120" class="d-text" font-size="10">👍/👎, edits, retries</text>
<rect x="460" y="80" width="145" height="60" rx="8" class="d-surface d-ink" stroke-width="1.5"/><text x="470" y="102" class="d-text" font-size="11" font-weight="700">Sampled judges</text><text x="470" y="120" class="d-text" font-size="10">faithfulness, safety</text>
<rect x="305" y="150" width="145" height="60" rx="8" class="d-surface d-ink" stroke-width="1.5"/><text x="315" y="172" class="d-text" font-size="11" font-weight="700">Business + ops</text><text x="315" y="190" class="d-text" font-size="10">success, cost, latency</text>
<rect x="460" y="150" width="145" height="60" rx="8" class="d-butter d-ink" stroke-width="2"/><text x="470" y="172" class="d-text-dark" font-size="11" font-weight="700">Traces</text><text x="470" y="190" class="d-text-dark" font-size="10">every step, debuggable</text>
<line x1="217" y1="120" x2="286" y2="120" class="d-ink" stroke-width="2" marker-end="url(#oo2-a)"/>
<text x="225" y="112" class="d-text" font-size="10">ship</text>
<path d="M530 232 C 530 262 115 262 115 234" fill="none" class="d-ink" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#oo2-a)"/>
<text x="230" y="258" class="d-text" font-size="11">production failures → new golden examples</text>
</svg>
<figcaption>Offline evals gate releases; online signals and traces show reality; failures flow back into the test set.</figcaption>
</figure>

## Step by step

Planning evaluation for P4’s launch (Week 11):

1. **Set offline release thresholds** (e.g., faithfulness ≥ 90%, safety 100%, task pass rate ≥ 85%).
2. **Instrument tracing** (Langfuse) for every request: inputs, retrieval, prompt version, outputs, latency, cost.
3. **Add feedback UI** (👍/👎 + reasons) and log implicit signals (accept, edit, retry, abandon).
4. **Define online metrics**: task success, feedback rate, escalation, latency p95, cost per user.
5. **Sample production outputs** weekly for judge scoring and a small human review.
6. **Set alerts** on key thresholds (error rate, latency, cost spikes, 👎 spikes).
7. **Review traces of failures weekly**; add 5–10 to the golden set each week.
8. **Pin model versions** and re-run offline evals before any model change.

## Common mistakes

1. **Only offline evals**, then surprise in production.
2. **Only 👍/👎**, which few users click and skews negative.
3. **No tracing**, so failures can’t be debugged.
4. **Storing personal data in traces** without controls.
5. **Ignoring drift** and model updates.
6. **Not feeding production failures back** into the golden set.

## How it shows up in interviews

> [!INTERVIEW]
> **“Your AI feature scored 95% in testing but users complain. Why?”**
> Outline: offline set doesn’t match real inputs (coverage gap) → drift → judge leniency → latency or UX issues not captured offline → investigate with traces and segment complaints → add failures to the golden set → fix and re-measure.

> [!INTERVIEW]
> **“What would you monitor after launching an AI assistant?”**
> Outline: quality (sampled judges, human review), user signals (feedback, edits, retries, escalation), task and business outcomes, safety incidents, operations (latency, errors, cost per user), drift over time → alerts and a weekly review ritual.

## Practice exercise

**Task (25 minutes):** Write a monitoring plan for your P4 launch: 3 offline release thresholds, 4 online metrics (with targets), 2 alerts, what you’ll capture in traces (and what you’ll mask), and your weekly review ritual.

```answer Reveal a model answer (for an AI expense parser)
- **Offline thresholds:** overall pass rate ≥ 88% on 60-example golden set; zero invented names in adversarial cases; valid JSON 100%.
- **Online metrics:** % drafts accepted without edits (target ≥ 70%); % drafts abandoned (≤ 10%); 👎 rate (≤ 8%); p95 latency (≤ 2.5 s); cost per active user per month (≤ ₹2).
- **Alerts:** parser error/timeout rate > 3% over 15 minutes; daily cost > 150% of the 7-day average.
- **Traces capture:** prompt version, model, input message (with names replaced by member IDs), parsed output, validation result, latency, tokens, cost. **Mask:** phone numbers, UPI IDs, free-text notes containing addresses.
- **Weekly ritual (45 min, Saturday):** review metrics dashboard → read 20 random traces + all 👎 traces → categorise failures → add 5–10 to the golden set → pick one fix for next week → note results in the P4 case study log.
```

## Quiz

```quiz
Q: What’s the main purpose of offline evals?
- [ ] Measuring real user satisfaction :: That needs online signals.
- [x] Testing changes on a fixed dataset before release to catch regressions :: Correct. They act as a release gate.
- [ ] Replacing production monitoring :: They complement it.
- [ ] Training the model :: Evals measure; they don’t train.

Q: Which is an implicit online signal?
- [ ] A user clicking 👎 :: That’s explicit feedback.
- [x] A user heavily editing an AI draft before sending it :: Correct. Behaviour reveals quality without asking.
- [ ] A golden dataset score :: That’s offline.
- [ ] A survey answer :: That’s explicit.

Q: What is a trace?
- [ ] A drawing of the UI :: Unrelated: a trace records what the system did, not how it looks.
- [x] A record of one request’s full path: inputs, retrieval, prompts, tool calls, outputs, latency and cost :: Correct. It lets you debug any single request step by step.
- [ ] A type of model :: Unrelated: traces are logs, not models.
- [ ] A user’s location history :: Not in this context.

Q: Offline faithfulness is 94% but production sampled faithfulness is 89%. What’s a likely cause?
- [ ] The judge is always wrong in production :: Not necessarily.
- [x] Real inputs include cases the golden set didn’t cover :: Correct. Investigate with traces and add those cases.
- [ ] Production has fewer users :: Volume alone doesn’t lower faithfulness.
- [ ] Offline evals are useless :: They’re useful; they just don’t cover everything.

Q: Why should you pin model versions in production?
- [ ] Pinning makes models cheaper :: Not the purpose.
- [x] So provider updates don’t silently change behaviour; you upgrade deliberately after re-running evals :: Correct. You control when behaviour changes.
- [ ] Unpinned models don’t work :: They work, but may change.
- [ ] To avoid writing prompts :: Unrelated: pinning versions doesn’t replace prompts.

Q: What should you do with production failures found in traces?
- [ ] Delete them to keep metrics clean :: Hides problems.
- [x] Add representative ones to the golden dataset and fix the cause :: Correct. The loop makes evals stronger over time.
- [ ] Ignore them if rare :: Rare can still be severe.
- [ ] Share them publicly :: Privacy risk; keep them internal.
```

## Key takeaways

- **Offline evals** gate releases; **online evals** reveal real-world quality and impact.
- Online signals: **explicit feedback, implicit behaviour, sampled judges, business and operational metrics**.
- **Tracing** records every step for **debugging, cost/latency analysis and dataset building**; mask personal data.
- Watch for **drift** in inputs, data and models; **pin model versions**.
- Close the loop: **production failures → golden set → fix → re-test → ship**.
