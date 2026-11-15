---
id: w13-improvement
title: Product improvement questions
week: 13
estimatedMinutes: 15
tags: [interviews, product-sense, improvement]
---

## Why this matters for a PM

“How would you improve Swiggy?” or “Pick a feature of CRED and improve it” are among the most common PM interview questions. They test whether you understand an existing product’s users, business and constraints, and can prioritise a meaningful change rather than listing random features. They’re also the closest to real PM work: most PMs improve existing products.

## Core concepts

### How improvement questions differ from design questions

- The product **already exists**, with users, strategy and constraints.
- You must **understand the current state** first: who uses it, why, how it makes money.
- Good answers **tie improvements to a goal** (engagement, retention, revenue, trust) and to evidence (reviews, your use, known pain points).
- The interviewer may use the product daily; vague claims are easy to challenge.

### A structure

1. **Clarify (1–2 min):** which product/surface? Any goal from the interviewer (growth, retention, monetisation)? Platform? If open, choose and state.
2. **Product understanding (3–4 min):** mission, core users, core job, key flows, business model, where it is in its lifecycle. Show you know it.
3. **Choose a goal (1–2 min):** pick one to optimise (e.g., increase repeat orders among new users), with a reason linked to the company’s situation.
4. **Segment users (2–3 min):** relevant to the goal; pick one segment.
5. **Pain points / opportunities (4–5 min):** along the journey for that segment, using evidence (reviews, your use, observed behaviour). Prioritise.
6. **Solutions (5–6 min):** 3 ideas, distinct; one quick win, one bigger bet.
7. **Prioritise (2–3 min):** impact vs. effort, risks, strategic fit; choose one.
8. **Metrics (2–3 min):** primary, secondary, guardrails; how you’d test (A/B).
9. **Summarise.**

Total ~25–30 minutes; often shorter than full design questions.

### Showing product understanding quickly

A strong 60-second product snapshot:
- **Core user and job:** “Zerodha Kite serves active traders and long-term investors who want to trade reliably at low cost.”
- **Business model:** “Brokerage on intraday/F&O trades, account fees, interest/float, and adjacent products.”
- **Lifecycle and strategy:** “Mature market leader; strategy emphasises reliability and education, not aggressive growth hacks.”
- **Key metric:** “Active traders and order volume.”

This frames improvements that fit the company (you wouldn’t propose gamified trading streaks for Zerodha, given its stance on responsible investing).

### Choosing what to improve

Good targets:
- A **known pain** (visible in reviews, social media, or your own use).
- A **leaky step** in a key funnel (onboarding, checkout, first-week activation).
- A **segment underserved** by the current design (new users, tier 2 users, elderly users, Hindi speakers).
- A **strategic gap** (a competitor’s strength, a new market).

Avoid trivial UI tweaks unless you can show big impact.

### Using evidence in interviews

You can’t run research in the room, but you can cite:
- **Your observations** (“When I order, I scroll for 4–5 minutes before picking”).
- **Public signals** (“Many recent Play Store reviews complain about surprise fees”).
- **Logical inference** (“Quick-commerce users ordering a single item face minimum order fees”).
State assumptions clearly and say how you’d validate them.

### Feature critique variant

“What’s one feature of [app] you’d change?” Do a mini teardown: what the feature does, who it serves, what works, what doesn’t (with heuristics or laws of UX), your change, the metric.

## Worked example

**Prompt:** “How would you improve Zerodha Kite?”

1. **Clarify:** any focus? (Interviewer: “Your choice.”) I’ll focus on the mobile app.
2. **Snapshot:** Kite serves active traders and long-term investors; known for reliability, low cost and education (Varsity). Business: brokerage mainly on intraday/F&O, plus account charges and adjacent products. Mature leader facing competition from newer apps targeting beginners.
3. **Goal:** improve **retention of new investors** in their first 90 days, because many new users stop after early losses or confusion, and long-term investors are durable customers aligned with Zerodha’s philosophy.
4. **Segments:** new investors (first 90 days), active traders, F&O traders, passive SIP investors. **Pick:** new investors.
5. **Pains (journey: first deposit → first order → first drop → ongoing):**
   - Order screen jargon (market vs. limit, CNC vs. MIS) causes mistakes.
   - First portfolio drop triggers panic selling.
   - Hard to tell if they’re “doing OK” vs. a benchmark.
   - Charges on small trades feel confusing.
   **Prioritise:** jargon on the first order + panic on first drop (highest impact on early churn).
6. **Solutions:**
   - A: “Beginner mode” order screen: plain-language labels, sensible defaults, a one-line explanation of each choice, switchable to pro view.
   - B: “First market dip” guidance: when a new investor’s portfolio falls 5%+, show context and long-term charts (no advice).
   - C: Goal-based portfolio view showing progress towards a user-set goal instead of daily P&L.
7. **Prioritise:** A first (affects everyone’s first order, low risk, quick to test); B second (high impact at a key moment; needs compliance review).
8. **Metrics (for A):** % of new users whose first order executes as intended (no immediate cancel/modify); first-week order rejection rate; 90-day retention of new investors (lagging). Guardrails: active traders’ order speed unaffected (beginner mode off for them); support tickets about orders. Test: A/B on new accounts.
9. **Summary:** “For new investors, I’d add a beginner-friendly order screen that explains choices in plain language, measured by first-order success and 90-day retention, without slowing down experienced traders.”

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 220" role="img" aria-labelledby="im-t im-d">
<title id="im-t">Improvement answer flow</title>
<desc id="im-d">Clarify, product snapshot, choose goal, choose segment, pains with evidence, three solutions, prioritise, metrics and test, summary.</desc>
<defs><marker id="im-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<g font-size="10">
<rect x="10" y="20" width="140" height="44" rx="8" class="d-lavender d-ink" stroke-width="2"/><text x="20" y="46" class="d-text-dark" font-weight="700">Clarify + snapshot</text>
<rect x="170" y="20" width="140" height="44" rx="8" class="d-butter d-ink" stroke-width="2"/><text x="180" y="40" class="d-text-dark" font-weight="700">Choose ONE goal</text><text x="180" y="55" class="d-text-dark">tied to strategy</text>
<rect x="330" y="20" width="140" height="44" rx="8" class="d-sky d-ink" stroke-width="2"/><text x="340" y="46" class="d-text-dark" font-weight="700">Segment → pains</text>
<rect x="490" y="20" width="140" height="44" rx="8" class="d-sky d-ink" stroke-width="2"/><text x="500" y="40" class="d-text-dark" font-weight="700">Evidence</text><text x="500" y="55" class="d-text-dark">reviews, use, logic</text>
<rect x="490" y="110" width="140" height="44" rx="8" class="d-mint d-ink" stroke-width="2"/><text x="500" y="136" class="d-text-dark" font-weight="700">3 solutions</text>
<rect x="330" y="110" width="140" height="44" rx="8" class="d-mint d-ink" stroke-width="2"/><text x="340" y="136" class="d-text-dark" font-weight="700">Prioritise one</text>
<rect x="170" y="110" width="140" height="44" rx="8" class="d-peach d-ink" stroke-width="2"/><text x="180" y="130" class="d-text-dark" font-weight="700">Metrics + test</text><text x="180" y="145" class="d-text-dark">guardrails, A/B</text>
<rect x="10" y="110" width="140" height="44" rx="8" class="d-pink d-ink" stroke-width="2"/><text x="20" y="136" class="d-text-dark" font-weight="700">Summarise</text>
</g>
<g class="d-ink" stroke-width="2"><line x1="152" y1="42" x2="166" y2="42" marker-end="url(#im-a)"/><line x1="312" y1="42" x2="326" y2="42" marker-end="url(#im-a)"/><line x1="472" y1="42" x2="486" y2="42" marker-end="url(#im-a)"/><line x1="560" y1="66" x2="560" y2="106" marker-end="url(#im-a)"/><line x1="488" y1="132" x2="474" y2="132" marker-end="url(#im-a)"/><line x1="328" y1="132" x2="314" y2="132" marker-end="url(#im-a)"/><line x1="168" y1="132" x2="154" y2="132" marker-end="url(#im-a)"/></g>
<text x="40" y="196" class="d-text" font-size="11">Respect the product’s strategy: improvements should fit who the company is.</text>
</svg>
<figcaption>Understand the product, pick one goal and segment, then improve with evidence.</figcaption>
</figure>

## Step by step

Preparing 4 improvement answers (deliverable):

1. **Choose 4 products** you use (e.g., Swiggy, PhonePe, Zerodha, LinkedIn).
2. **Write a 60-second snapshot** for each (users, job, business model, lifecycle, key metric).
3. **Mine 20 reviews** each to find real pain points.
4. **Practise the structure** with a 25-minute timer in Mock Interview mode.
5. **Record** each answer on Loom; self-score; refine.
6. **Prepare a “favourite feature critique”** for each product too.

## Common mistakes

1. **Skipping product understanding**, proposing changes that clash with strategy.
2. **Listing many features** without choosing.
3. **No goal**, so improvements can’t be judged.
4. **Trivial UI suggestions** (“make the button bigger”) without impact reasoning.
5. **Criticising without empathy** for the team’s constraints.
6. **No metrics or test plan.**

## How it shows up in interviews

> [!INTERVIEW]
> **“How would you improve PhonePe?”**
> Outline: clarify focus → snapshot (payments super app, UPI leader, monetises via merchant services, financial products) → goal (e.g., grow monthly users of financial products among UPI users) → segment → pains → 3 solutions → pick → metrics and guardrails (payment reliability must not suffer) → summary.

> [!INTERVIEW]
> **“What’s a feature in an app you use that you’d change?”**
> Outline: name the feature and its purpose → what works → what doesn’t (heuristic) → your change → expected impact and metric → how you’d test.

## Practice exercise

**Task (35 minutes):** “How would you improve LinkedIn for job seekers in India?” Write bullet notes for each step, then speak it in 25 minutes.

```answer Reveal a model answer outline
- **Clarify:** focus on job seekers (not recruiters), mobile app, India.
- **Snapshot:** professional network; revenue from premium subscriptions, recruiter tools and ads; job seekers are high-intent users; Easy Apply creates high application volume.
- **Goal:** increase the share of job seekers who get recruiter responses (quality outcomes), which improves trust and premium value.
- **Segments:** fresh graduates; mid-career switchers; experienced professionals; blue/grey-collar job seekers. **Pick:** career switchers (low response rates, unclear positioning).
- **Pains:** applications disappear without response; unclear how they match a role; profiles don’t show transferable skills; too many irrelevant job recommendations.
- **Solutions:** (A) Match explanation on each job: which requirements your profile meets and gaps, with suggestions; (B) application status transparency (viewed, in review, closed); (C) AI-assisted profile repositioning for switchers, grounded in their actual experience (editable suggestions).
- **Prioritise:** A first (helps users choose better jobs, improving response rates; uses existing data). B needs recruiter-side changes.
- **Metrics:** recruiter response rate on applications from users who saw match explanations; applications per job seeker (guardrail: shouldn’t drop too much); job-seeker 30-day retention. A/B test.
- **Summary.**
```

## Quiz

```quiz
Q: What’s the key difference between improvement and design questions?
- [ ] Improvement questions don’t need users :: Users are still central.
- [x] The product already exists, so you must understand its users, strategy and business before changing it :: Correct. Changes must fit the existing context.
- [ ] Improvement questions have no metrics :: Metrics remain essential.
- [ ] Design questions never involve existing products :: Some do, as feature design.

Q: Why choose a single goal early in an improvement answer?
- [ ] Interviewers dislike goals :: They expect one.
- [x] A clear goal lets you choose segments, pains and solutions coherently and judge success :: Correct. Without a goal, every idea looks equally good.
- [ ] It shortens the answer :: Focus matters more than length.
- [ ] Goals don’t matter for mature products :: They matter for all products.

Q: Which improvement best fits Zerodha’s known positioning?
- [ ] Gamified trading streaks with rewards :: Conflicts with a responsible-investing stance.
- [x] A beginner-friendly order screen that explains choices clearly :: Correct. Fits reliability and education.
- [ ] Removing all charges :: Ignores the business model.
- [ ] Pushing more F&O trading to new users :: Risky and against user interest.

Q: What evidence can you use in an interview without running research?
- [ ] Made-up statistics presented as facts :: Never present invented numbers as fact.
- [x] Your observations, public review patterns and clearly stated assumptions with a plan to validate :: Correct. Honest evidence and assumptions are expected.
- [ ] Only internal company data :: You won’t have it.
- [ ] Nothing; evidence isn’t expected :: Evidence strengthens answers.

Q: Which is a weak improvement answer?
- [ ] Reduce checkout drop-off for new users by showing all-in prices early, measured by checkout completion :: Specific and measurable.
- [x] Make the app more modern and add more features :: Correct. Vague, no goal, segment or metric.
- [ ] Add a beginner order mode, measured by first-order success :: Specific and tied to a goal.
- [ ] Improve refund status clarity to cut support tickets :: Specific and measurable.
```

## Key takeaways

- Improvement questions start with **understanding the existing product**: users, job, business model, strategy.
- Pick **one goal**, **one segment**, and **prioritised pains** backed by **evidence or stated assumptions**.
- Offer **3 distinct solutions**, choose one, and define **metrics, guardrails and a test**.
- Respect the company’s **positioning**; avoid trivial UI tweaks without impact reasoning.
- Prepare **snapshots and critiques** for 4–5 products you use.
