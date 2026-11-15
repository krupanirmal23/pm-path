---
id: w14-ai-pm-cases
title: AI PM cases
week: 14
estimatedMinutes: 18
tags: [interviews, ai, cases]
---

## Why this matters for a PM

AI PM interviews add case types you won’t see in traditional loops: “Design an AI feature for X”, “How would you evaluate our AI assistant?”, “Our AI costs tripled; what do you do?”, “Users don’t trust our AI; fix it.” They test whether you combine product sense with AI-specific judgement: when to use AI, quality measurement, cost, risk and trust. Everything from Weeks 9–11 comes together here, and your P4 gives you real examples.

## Core concepts

### Case 1: “Design an AI feature for [product]”

**Structure (35–40 min):**
1. **Clarify** goal, users, constraints (data available, latency, risk tolerance).
2. **Users and problems** (as in product design); pick one high-value problem.
3. **Why AI?** Compare with non-AI baselines (rule, form, search). AI should handle messy inputs, language, endless cases or personalisation.
4. **Solution design:** inputs, outputs, where it appears in the flow, interface (button, inline, chat, background).
5. **System design (light):** model choice tier; grounding (RAG, tools/APIs); prompts and structured output; workflow vs. agent; human-in-the-loop level.
6. **AI UX:** expectations, streaming/progress, citations, editable drafts, confirmations, fallbacks, feedback.
7. **Quality and evals:** golden set, criteria, LLM-judge validation, release thresholds.
8. **Risks and guardrails:** hallucination, safety, privacy (DPDP), bias, prompt injection.
9. **Cost and latency:** cost per user estimate; latency budget.
10. **Metrics:** user value (task success, time saved), AI quality (acceptance rate, edit rate, 👎), business, guardrails.
11. **Rollout:** beta, staged rollout, monitoring.

### Case 2: “How would you evaluate our AI assistant?”

**Structure:**
1. **Clarify** what the assistant does, users, stakes, current signals.
2. **Define success criteria** per use case (correctness, faithfulness, helpfulness, safety, tone, task completion).
3. **Offline evals:** build a golden dataset from real logs (common, edge, adversarial, multilingual); label with a rubric; code checks; LLM-judge validated against humans.
4. **Error analysis:** categorise failures; prioritise fixes.
5. **Online evals:** user feedback, implicit signals (edits, retries, escalation), sampled production judging, task success, A/B tests vs. baseline.
6. **Operational metrics:** latency, cost, errors.
7. **Process:** regression suite on every change, weekly trace review, adding production failures to the set.

### Case 3: “Our AI costs tripled. What do you do?”

**Structure:**
1. **Clarify:** total cost or per user? Over what period? Did value/revenue also grow?
2. **Decompose:** cost = users × requests per user × tokens per request × price (+ extra calls).
3. **Find the driver:** traffic growth? heavy users? longer prompts or context (history bug)? model switch? new feature with more calls (agents, judges, retries)? price change?
4. **Segment:** by feature, model, user cohort, request type.
5. **Fix the cause** (bugs first, e.g., unbounded history).
6. **Levers:** routing/cascades, smaller models, prompt and context trimming, caching, batching, output limits, usage limits/fair use, pricing changes.
7. **Protect quality:** re-run evals for every cost change.
8. **Prevent recurrence:** cost dashboards, per-feature budgets, alerts.

### Case 4: “Users don’t trust our AI. Fix it.”

**Structure:**
1. **Diagnose why:** is it actually wrong (accuracy), opaque (no sources), inconsistent, over-confident, intrusive, or a privacy worry? Use data (👎 reasons, edits, abandonment) and interviews.
2. **Measure accuracy** with evals; separate perception from reality.
3. **Fix accuracy first** if it’s genuinely unreliable (grounding, scope, model, guardrails).
4. **Increase transparency:** citations, “why this suggestion”, labels, honest uncertainty.
5. **Give control:** editable drafts, undo, confirmations, settings to turn it off.
6. **Set expectations:** clear scope, onboarding, example prompts.
7. **Handle failures gracefully:** fallbacks to humans.
8. **Communicate improvements** and track trust signals (repeat usage, acceptance rate, 👍, survey trust score).

### Other AI PM questions to prepare

- “When would you NOT use an LLM?” (Week 9)
- “RAG or fine-tuning?” (Week 10)
- “Workflow or agent?” (Week 10)
- “How would you price an AI feature?” (Week 11)
- “What’s your AI product strategy for X? What’s the moat?” (Week 11)
- “Tell me about an AI product you built.” (P4 story)

### Use your P4 as evidence

In every AI case, weave in real experience briefly: “In my AI expense assistant, I saw exactly this: Hinglish inputs failed most, so I…”. It turns theory into credibility.

## Worked example

**Prompt:** “Design an AI feature for Swiggy Instamart.”

1. **Clarify:** goal: increase basket completion and repeat orders; users on mobile; latency-sensitive.
2. **Users and problems:** households doing weekly restocks find adding 15–20 items tedious; they think in lists (“milk, eggs, atta, the usual detergent”), often written on paper or WhatsApp.
3. **Why AI:** messy, multilingual list input (Hinglish, brand names, quantities) maps to catalogue items; rules and search can’t handle it well in one step.
4. **Solution:** “Paste or snap your list” → AI parses items and quantities → matches to catalogue (preferring past purchases) → editable cart draft with confidence markers; unmatched items listed for quick search.
5. **System:** OCR for photos; a mid-size model with structured output (item, quantity, unit, brand); retrieval over the catalogue and user’s purchase history (hybrid search) to match items; workflow (parse → match → validate), not an agent; no human review needed (user confirms cart).
6. **AI UX:** progress (“Reading your list…”), draft cart with items highlighted where unsure (“Did you mean Aashirvaad atta 5 kg?”), one-tap swaps, nothing added until “Add all”.
7. **Evals:** 200 real lists (anonymised) with expected carts; criteria: item match accuracy, quantity accuracy, no hallucinated items (must exist in catalogue); code checks for catalogue IDs; release threshold: ≥ 90% item accuracy.
8. **Risks:** wrong item/quantity (user confirms); privacy (lists may contain names/addresses → mask); allergens (not inferred; user chooses).
9. **Cost/latency:** ~₹0.3 per list (example pricing); target cart draft ≤ 3 s at p95.
10. **Metrics:** % of lists converted to orders; items per list order vs. normal orders; draft acceptance with ≤ 2 edits; repeat use of the feature; guardrails: order cancellations/returns for wrong items, latency.
11. **Rollout:** beta in Bengaluru to frequent buyers, 10% → 50% → 100% with monitoring.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 270" role="img" aria-labelledby="ac-t ac-d">
<title id="ac-t">AI PM case checklist</title>
<desc id="ac-d">A checklist wheel with eight areas: why AI, system design, AI UX, evals, risks and guardrails, cost and latency, metrics, rollout, around a central user problem.</desc>
<circle cx="320" cy="135" r="55" class="d-butter d-ink" stroke-width="3"/>
<text x="285" y="132" class="d-text-dark" font-weight="700" font-size="12">User</text>
<text x="280" y="148" class="d-text-dark" font-weight="700" font-size="12">problem</text>
<g font-size="11">
<rect x="250" y="10" width="140" height="34" rx="8" class="d-lavender d-ink" stroke-width="2"/><text x="262" y="32" class="d-text-dark" font-weight="700">Why AI? (vs. baseline)</text>
<rect x="430" y="45" width="150" height="34" rx="8" class="d-sky d-ink" stroke-width="2"/><text x="442" y="67" class="d-text-dark" font-weight="700">System: model, RAG, tools</text>
<rect x="455" y="118" width="150" height="34" rx="8" class="d-mint d-ink" stroke-width="2"/><text x="467" y="140" class="d-text-dark" font-weight="700">AI UX + control</text>
<rect x="430" y="190" width="150" height="34" rx="8" class="d-peach d-ink" stroke-width="2"/><text x="442" y="212" class="d-text-dark" font-weight="700">Evals + thresholds</text>
<rect x="250" y="225" width="140" height="34" rx="8" class="d-pink d-ink" stroke-width="2"/><text x="262" y="247" class="d-text-dark" font-weight="700">Risks + guardrails</text>
<rect x="60" y="190" width="150" height="34" rx="8" class="d-butter d-ink" stroke-width="2"/><text x="72" y="212" class="d-text-dark" font-weight="700">Cost + latency</text>
<rect x="35" y="118" width="150" height="34" rx="8" class="d-lavender d-ink" stroke-width="2"/><text x="47" y="140" class="d-text-dark" font-weight="700">Metrics (value + quality)</text>
<rect x="60" y="45" width="150" height="34" rx="8" class="d-sky d-ink" stroke-width="2"/><text x="72" y="67" class="d-text-dark" font-weight="700">Rollout + monitoring</text>
</g>
<g class="d-ink" stroke-width="1.2"><line x1="320" y1="44" x2="320" y2="80"/><line x1="430" y1="70" x2="365" y2="105"/><line x1="455" y1="135" x2="375" y2="135"/><line x1="430" y1="200" x2="365" y2="165"/><line x1="320" y1="225" x2="320" y2="190"/><line x1="210" y1="200" x2="275" y2="165"/><line x1="185" y1="135" x2="265" y2="135"/><line x1="210" y1="70" x2="275" y2="105"/></g>
</svg>
<figcaption>Start from the user problem, then cover all eight areas. Weave in your own P4 evidence.</figcaption>
</figure>

## Step by step

Preparing AI PM cases (deliverable: 2+ AI PM mocks):

1. **Write one-page outlines** for each of the four case types using the structures above.
2. **Attach P4 evidence** to each (a number, a failure, a fix).
3. **Practise “Design an AI feature”** for 3 products (fintech, quick commerce, B2B SaaS).
4. **Practise “costs tripled”** with a decomposition on paper.
5. **Practise “users don’t trust it”** with diagnosis first.
6. **Run 2 mocks** focused on AI PM cases; log scores.
7. **Refine your P4 story** (2-minute version) as a reusable example.

## Common mistakes

1. **AI for its own sake**, with no baseline comparison.
2. **Ignoring evals**, saying “we’ll test it” without specifics.
3. **No cost or latency thinking.**
4. **Skipping risks** (hallucination, privacy, injection, bias).
5. **Jumping to solutions in trust cases** without diagnosing.
6. **Overly technical answers** that lose the user.

## How it shows up in interviews

> [!INTERVIEW]
> **“Design an AI feature for a bank’s mobile app.”**
> Outline: users (e.g., customers confused by charges) → why AI (varied questions) → grounded assistant over statements and fee policies (RAG + account data API) → strict scope and no financial advice → citations and human escalation → evals (faithfulness ≥ 97%) → privacy (DPDP, masking) → cost/latency → metrics (resolution without human, complaints about charges) → staged rollout.

> [!INTERVIEW]
> **“How would you know if our AI assistant is getting better or worse over time?”**
> Outline: fixed golden set re-run on every change and on a schedule → online signals by week (👍, edits, escalations, task success) → sampled judge scoring → drift checks → dashboards and alerts → weekly trace reviews.

## Practice exercise

**Task (40 minutes):** Answer “Our AI support assistant’s costs tripled last month while conversations grew only 20%. What do you do?” in outline form, including a decomposition with illustrative numbers.

```answer Reveal a model answer
1. **Clarify:** cost per conversation rose ~2.5x (3x cost ÷ 1.2x conversations). Revenue impact? Quality changes?
2. **Decompose:** cost/conversation = turns × tokens per turn × price (+ extra calls per turn).
   - Turns per conversation: 4 → 4.4 (+10%).
   - Input tokens per turn: 2,000 → 4,500 (+125%) ← big jump.
   - Extra calls: a new LLM-judge safety check on every turn added in a recent release (+1 call per turn).
   - Model price: unchanged.
3. **Root causes:** (a) a bug: full conversation history is re-sent without summarisation after a release; (b) new judge on 100% of turns.
4. **Fixes:** restore history summarisation after 3 turns (back to ~2,200 tokens); run the judge on a sample plus all high-risk intents (detected by a cheap classifier), not every turn; route simple intents (order status) to a smaller model.
5. **Quality check:** re-run the golden set and safety suite; ensure faithfulness and safety unchanged.
6. **Result estimate:** cost per conversation back to ~1.1x of the previous level.
7. **Prevent:** cost-per-conversation dashboard by release; alert at +30% week over week; cost review in release checklist.
```

## Quiz

```quiz
Q: In “design an AI feature” cases, what should you establish early?
- [ ] Which model has the most parameters :: Model size isn’t the starting point.
- [x] Why AI is better than a non-AI baseline for the user problem :: Correct. Justify the use of AI.
- [ ] The UI colour scheme :: Not a priority.
- [ ] The company’s stock price :: Irrelevant to whether AI fits the user problem.

Q: AI costs tripled while usage grew 20%. What’s the first analytical step?
- [ ] Switch to the cheapest model immediately :: May hurt quality and miss the real cause.
- [x] Decompose cost per conversation into turns, tokens per turn, extra calls and price to find the driver :: Correct. Find the cause before choosing a lever.
- [ ] Cut the feature :: Premature: you don’t know the cause or the value lost.
- [ ] Raise prices for users :: Doesn’t address the cause.

Q: Users say they don’t trust the AI. What should you do first?
- [ ] Add more disclaimers everywhere :: Doesn’t diagnose the cause.
- [x] Diagnose why: wrong answers, opacity, inconsistency or privacy concerns, using data and interviews :: Correct. Different causes need different fixes.
- [ ] Hide the AI label :: Damages trust further.
- [ ] Make the AI sound more confident :: Over-confidence worsens trust when wrong.

Q: Which is a strong evaluation plan for an AI assistant?
- [ ] Try it a few times before launch :: Not systematic.
- [x] Golden set from real logs, rubric labels, validated LLM judges, online signals and regression runs on every change :: Correct. Offline and online measurement together.
- [ ] Rely only on user ratings :: Biased and sparse.
- [ ] Use public benchmarks only :: Don’t reflect your task.

Q: How should you use your P4 experience in AI cases?
- [ ] Not at all; stick to theory :: Real experience adds credibility.
- [x] Briefly cite real numbers, failures and fixes as evidence :: Correct. Real experience makes answers credible.
- [ ] Spend the whole answer on P4 :: Answer the question asked.
- [ ] Exaggerate P4’s scale :: Never misrepresent.
```

## Key takeaways

- AI PM cases: **design an AI feature, evaluate an assistant, costs tripled, users don’t trust the AI**, plus RAG/agents/pricing/strategy questions.
- Always justify **why AI** versus a baseline, and cover **system, UX, evals, risks, cost/latency, metrics, rollout**.
- For cost spikes, **decompose** before cutting; protect quality with **evals**.
- For trust problems, **diagnose first**, then fix accuracy, transparency and control.
- Weave in **P4 evidence** for credibility.
