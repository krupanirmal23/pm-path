---
id: w9-when-not-ai
title: When not to use AI
week: 9
estimatedMinutes: 13
tags: [ai, strategy, judgement]
---

## Why this matters for a PM

“Add AI” is the most common solution-in-search-of-a-problem today. AI features are slower, costlier, less predictable and harder to test than normal software. The best AI PMs are known as much for where they *don’t* use generative AI as where they do. Your P4 idea must pass a test: **AI is genuinely better than a form or a rule**.

## Core concepts

### Start from the problem, not the technology

Week 1’s lesson still applies: “Build an AI chatbot” is a solution. Ask: what user problem are we solving, and what’s the simplest reliable way to solve it? Sometimes the answer is a better form, clearer copy, a search filter or a rule.

### When AI is a good fit

Generative AI tends to shine when:
- **Inputs are messy and varied:** free text, voice, images, documents, mixed languages (Hinglish WhatsApp messages, scanned receipts).
- **The task involves language understanding or generation:** summarising, rewriting, translating, explaining, drafting.
- **Rules would be endless:** there are too many cases to hand-code (categorising thousands of differently worded complaints).
- **Some errors are tolerable**, or a human reviews the output.
- **Personalisation at scale:** explaining the same concept differently for different users.
- **Users benefit from flexible, open-ended interaction** (asking questions about a long document).

### When NOT to use generative AI

1. **A deterministic rule works.** If “orders over ₹199 get free delivery” is the logic, write the rule. Rules are instant, free, testable and always correct.
2. **Exact calculations or data lookups.** Balances, prices, tax amounts, order status: use code and databases. (AI may *explain* them, using the real numbers.)
3. **Zero tolerance for errors with no human review.** Moving money, medical dosing, legal decisions, safety-critical controls.
4. **A simple form or UI is clearer.** Choosing a delivery slot from 5 options is faster with buttons than typing “tomorrow 8 to 9 am please”.
5. **Latency or cost can’t be afforded.** A feature on every app open for millions of users can be very expensive, or too slow.
6. **You lack the data or context** the AI would need to be accurate.
7. **Explainability is required** (e.g., why a loan was rejected), and you can’t ground and explain the AI’s decision.
8. **Regulatory or privacy constraints** prevent sending the data to a model provider.
9. **Users don’t want it.** Not every interaction benefits from a conversational layer.

### Other kinds of AI: not everything needs an LLM

“AI” includes more than generative models:
- **Classic machine learning (ML)**: models trained on your structured data for prediction and ranking: fraud detection, ETA prediction, recommendations, demand forecasting. Often cheaper, faster and more accurate than LLMs for these tasks.
- **Rules + heuristics:** simple logic that’s often good enough.
- **Search:** keyword or semantic search can answer many “questions” better than generation.

Ask: is this a **generation** problem (write, explain, converse), a **prediction** problem (what will happen, which item is best), or a **lookup** problem (find the fact)?

### The “AI test” for an idea

Run each AI idea through these questions:
1. **What’s the user problem?** (Evidence?)
2. **What’s the non-AI baseline?** (Rule, form, search, human.) How good is it?
3. **What does AI add?** Handles messy input? Saves meaningful time? Better quality?
4. **What happens when it’s wrong?** Stakes and recovery.
5. **Can we measure it?** Eval set and success metrics.
6. **Unit economics:** cost per use vs. value per use.
7. **Speed:** acceptable latency?

If AI doesn’t beat the baseline clearly on the dimension users care about, don’t use it (or use it only for a sub-part).

### Hybrid designs often win

Combine AI with rules and UI:
- AI **parses** messy input → rules **validate** → the user **confirms** in a normal UI.
- Rules handle 80% of common cases; AI handles the long tail.
- AI **drafts**, humans **decide**.

## Worked example

**Proposal:** “Add an AI chatbot to Zepto so users can order groceries by chatting.”

**AI test:**
1. **Problem:** some users find searching for many items tedious; repeat shoppers want speed.
2. **Baseline:** search + “Buy again” list + previous orders. Fast for known items.
3. **What AI adds:** parsing a long list (“2 litres milk, bread, eggs, coriander, the usual curd”) or a photo of a handwritten list into a cart. Search can’t do that easily.
4. **When wrong:** wrong item or quantity in cart → user can fix before paying (medium stakes, recoverable).
5. **Measurable:** cart accuracy vs. intended list; time to build cart.
6. **Cost:** a few paise per list; fine if it increases basket size.
7. **Speed:** 2–3 seconds to parse is acceptable.

**Decision:** don’t build a general chatbot (search and buttons are faster for single items). **Do** build “Paste or snap your shopping list → AI fills your cart (editable)”. AI where messy input is the problem; normal UI for everything else.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 270" role="img" aria-labelledby="na-t na-d">
<title id="na-t">Should we use generative AI here?</title>
<desc id="na-d">A decision tree: if a simple rule works, use the rule; if exact data or maths, use code; if errors are unacceptable without review, add human review or avoid; if input is messy language, AI may fit; then check cost and latency.</desc>
<defs><marker id="na-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<g font-size="11">
<rect x="10" y="20" width="170" height="40" rx="8" class="d-butter d-ink" stroke-width="2"/><text x="22" y="45" class="d-text-dark" font-weight="700">Does a simple rule work?</text>
<rect x="230" y="20" width="120" height="40" rx="8" class="d-mint d-ink" stroke-width="2"/><text x="244" y="45" class="d-text-dark">Yes → use the rule</text>
<rect x="10" y="85" width="170" height="40" rx="8" class="d-butter d-ink" stroke-width="2"/><text x="22" y="110" class="d-text-dark" font-weight="700">Exact maths / lookup?</text>
<rect x="230" y="85" width="120" height="40" rx="8" class="d-mint d-ink" stroke-width="2"/><text x="244" y="110" class="d-text-dark">Yes → use code/DB</text>
<rect x="10" y="150" width="170" height="40" rx="8" class="d-butter d-ink" stroke-width="2"/><text x="22" y="168" class="d-text-dark" font-weight="700">Messy language/images</text><text x="22" y="182" class="d-text-dark" font-weight="700">or endless cases?</text>
<rect x="230" y="150" width="120" height="40" rx="8" class="d-pink d-ink" stroke-width="2"/><text x="244" y="175" class="d-text-dark">No → simpler UI</text>
<rect x="10" y="215" width="170" height="40" rx="8" class="d-sky d-ink" stroke-width="2"/><text x="22" y="233" class="d-text-dark" font-weight="700">Yes → AI candidate:</text><text x="22" y="247" class="d-text-dark">check stakes, cost, speed</text>
<rect x="400" y="200" width="225" height="60" rx="8" class="d-lavender d-ink" stroke-width="2"/><text x="412" y="222" class="d-text-dark" font-weight="700">High stakes?</text><text x="412" y="240" class="d-text-dark">Add human review or don’t</text><text x="412" y="254" class="d-text-dark">let AI decide alone</text>
</g>
<g class="d-ink" stroke-width="2"><line x1="182" y1="40" x2="226" y2="40" marker-end="url(#na-a)"/><line x1="95" y1="62" x2="95" y2="81" marker-end="url(#na-a)"/><line x1="182" y1="105" x2="226" y2="105" marker-end="url(#na-a)"/><line x1="95" y1="127" x2="95" y2="146" marker-end="url(#na-a)"/><line x1="182" y1="170" x2="226" y2="170" marker-end="url(#na-a)"/><line x1="95" y1="192" x2="95" y2="211" marker-end="url(#na-a)"/><line x1="182" y1="235" x2="396" y2="230" marker-end="url(#na-a)"/></g>
<text x="105" y="76" class="d-text" font-size="10">no</text><text x="105" y="141" class="d-text" font-size="10">no</text>
</svg>
<figcaption>Generative AI earns its place when inputs are messy or cases endless, and when errors are recoverable.</figcaption>
</figure>

## Step by step

Running the AI test on your P4 idea (this week’s deliverable):

1. **Write the user problem** with evidence.
2. **Describe the non-AI baseline** and try it yourself (a form, rule, search).
3. **List what AI adds** that the baseline can’t.
4. **Rate stakes** and design recovery (drafts, confirmations, human review).
5. **Estimate cost per use** and compare with the value per use.
6. **Estimate latency** and check it fits the interaction.
7. **Decide**: full AI, hybrid, AI for a sub-step, or no AI.
8. **Write the justification** in your P4 spec (“Why AI?” section), including test 2 of P4: “AI is genuinely better than a form or rule”.

## Common mistakes

1. **Starting from “we need AI”** instead of a user problem.
2. **Using LLMs for exact maths or live data.**
3. **Replacing a fast UI with a chat box** that’s slower to use.
4. **Ignoring cost at scale** for features used constantly.
5. **Using generative AI where classic ML or search is better.**
6. **Letting AI make high-stakes decisions alone.**

## How it shows up in interviews

> [!INTERVIEW]
> **“Our CEO wants AI in every feature. How do you respond?”**
> Outline: agree AI is powerful → propose criteria (messy input, language tasks, tolerable errors, measurable value, cost/latency fit) → audit features against criteria → pick 2–3 high-value bets → show baselines and evals → avoid AI where rules/forms are better → report results.

> [!INTERVIEW]
> **“Would you use an LLM to decide loan approvals?”**
> Outline: no, not alone → high stakes, regulation, need for explainability and fairness → use validated risk models with clear features and audit trails → LLMs might help with document extraction (with verification) or explaining decisions to customers using approved reasons.

## Practice exercise

**Task (25 minutes):** For each idea, decide: no AI, classic ML, generative AI, or hybrid. Explain in 2 lines.
1. Showing “free delivery above ₹199” in the cart.
2. Predicting delivery time for each order.
3. Summarising 30-minute sales call recordings for B2B account managers.
4. Approving merchant refunds automatically.
5. Turning a photo of a handwritten grocery list into a cart.
6. Answering “Is this saree washable?” from the product listing.

```answer Reveal a model answer
1. **No AI.** A deterministic rule; instant, free and always correct.
2. **Classic ML.** A prediction problem using structured data (distance, prep time, rider supply, traffic); LLMs aren’t suited to precise numeric forecasting.
3. **Generative AI.** Messy, long language input; summarisation is a core LLM strength; errors are tolerable because managers review.
4. **Hybrid/rules (no LLM decision).** Use rules and risk models with thresholds; maybe AI to summarise evidence for a human reviewer; money movement shouldn’t be decided by a generative model alone.
5. **Generative AI (multimodal) + hybrid UI.** Messy handwriting and varied item names; AI parses, the user confirms the editable cart.
6. **Generative AI with grounding (or simple lookup).** Answer only from the listing’s care instructions; if missing, say so. A structured “care instructions” field might solve most of it without AI.
```

## Quiz

```quiz
Q: Which task is the best fit for generative AI?
- [ ] Applying “free delivery above ₹199” :: A simple rule is better.
- [ ] Calculating GST on an invoice :: Exact maths belongs in code.
- [x] Summarising long, unstructured customer complaints :: Correct. Messy language input is an LLM strength.
- [ ] Looking up a user’s current wallet balance :: A database lookup is exact and instant.

Q: What should you compare an AI idea against first?
- [ ] Competitors’ AI features :: Useful context, but not the baseline.
- [x] The simplest non-AI baseline, such as a rule, form or search :: Correct. AI must clearly beat it.
- [ ] The most expensive model :: Not a meaningful baseline.
- [ ] Nothing; AI is always better :: Often it isn’t.

Q: Which problem is better solved with classic machine learning than an LLM?
- [ ] Drafting a reply email :: Language generation suits LLMs.
- [x] Predicting delivery ETA from distance, traffic and prep time :: Correct. Structured numeric prediction suits classic ML.
- [ ] Translating a product description :: Language task suited to LLMs.
- [ ] Summarising a document :: Language task suited to LLMs.

Q: Why is a chat interface sometimes worse than buttons?
- [ ] Chat is illegal in some apps :: Not true: chat is allowed; it’s just slower for simple choices.
- [x] For simple choices, tapping an option is faster and less error-prone than typing a request :: Correct. Buttons beat typing for a handful of options.
- [ ] Buttons are always cheaper to build :: Not always, but speed and clarity are the main points.
- [ ] Users can’t type :: Most can; it’s about efficiency.

Q: What’s a hybrid design?
- [ ] Using two apps :: Not what it means.
- [x] Combining AI with rules and normal UI, e.g., AI parses input, rules validate, the user confirms :: Correct. Each part does what it’s best at.
- [ ] Running AI on hybrid cars :: Unrelated: hybrid here means mixing AI with rules and UI.
- [ ] Using two models at random :: Not the meaning here.

Q: Which is a strong reason NOT to use generative AI for a feature?
- [ ] The input is messy free text :: That’s a reason to consider AI.
- [x] Errors are unacceptable and there’s no human review :: Correct. High stakes without review is a red flag.
- [ ] The feature involves language :: Often a reason to consider AI.
- [ ] Users ask varied questions :: Often a reason to consider AI.
```

## Key takeaways

- Start from the **user problem**, then compare AI against the **simplest non-AI baseline**.
- Generative AI fits **messy inputs, language tasks, endless cases and recoverable errors**.
- Don’t use it for **simple rules, exact maths, live data, or high-stakes decisions without review**.
- Remember **classic ML, search and rules** often beat LLMs for prediction and lookup.
- **Hybrid designs** (AI parses, rules validate, users confirm) usually win.
