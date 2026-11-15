---
id: w14-tradeoff-questions
title: Trade-off questions
week: 14
estimatedMinutes: 14
tags: [interviews, execution, decisions]
---

## Why this matters for a PM

“After launch, engagement went up 5% but revenue dropped 2%. Do you keep the feature?” “Your team can build A or B this quarter. Which?” Trade-off questions test product judgement: weighing competing goals with evidence and making a call you can defend. They’re common in execution rounds and reveal how you think about long-term value vs. short-term numbers.

## Core concepts

### Common forms

1. **Conflicting metrics after a launch:** metric A up, metric B down. Ship, roll back, or iterate?
2. **Choose between projects:** limited capacity; A vs. B.
3. **Quality vs. speed:** launch now with known issues, or delay?
4. **User vs. business:** a change users love that costs revenue (or vice versa).
5. **Segment vs. segment:** helping new users hurts power users.
6. **Short-term vs. long-term:** a promotion that spikes orders but may harm margins or habits.

### A structure for conflicting-metrics questions

1. **Clarify the metrics:** definitions, size of changes, statistical confidence, time window.
2. **Validate the result:** was the test sound (sample size, duration, novelty, SRM)? Is the drop real or noise?
3. **Understand why both moved:** what user behaviour changed? Segment the effects (new vs. existing, platforms, regions).
4. **Tie to goals and strategy:** which metric matters more for the company now? What’s the long-term effect (retention, LTV, trust)?
5. **Quantify:** translate both into a common unit where possible (e.g., ₹ impact on lifetime value; engagement’s effect on retention and future revenue).
6. **Consider options:** ship as is; roll back; ship to some segments; iterate to reduce the downside; run a longer test or holdout.
7. **Decide and set monitoring:** recommendation, guardrails, follow-up checkpoint.

### A structure for “A vs. B” questions

1. Clarify goals and constraints.
2. Describe each option: user value, business value, effort, risk, confidence, strategic fit, reversibility.
3. Compare (RICE-style or a simple table).
4. Consider sequencing or a smaller version of both.
5. Decide, explain what you give up, and how you’ll revisit.

### Principles that help

- **Long-term value over short-term vanity:** engagement that comes from manipulation (notifications, dark patterns) may hurt retention and trust.
- **Reversibility:** prefer reversible decisions when uncertain; slow down on irreversible ones.
- **Segment-level thinking:** a change may be great for one segment and bad for another; ship selectively.
- **Guardrails matter:** some metrics (trust, safety, reliability) are non-negotiable.
- **Confidence:** small, noisy differences shouldn’t drive big decisions.
- **Mitigations:** often you can keep the upside and reduce the downside with iteration.

## Worked example

**Prompt:** “Swiggy tested a new home feed with personalised dish recommendations. Orders per user +3% (significant), but average order value (AOV) −4% (significant). Ship it?”

1. **Clarify:** 2-week A/B test, 50/50, large sample; revenue per user? *Interviewer: net revenue per user −1% (not significant).*
2. **Validate:** no SRM; effect stable across both weeks (no novelty decay).
3. **Why:** segment analysis: users order more single-person meals (snack-sized dishes surfaced), smaller baskets. Heavy users: orders +5%, AOV −6%. New users: orders +2%, AOV flat.
4. **Goals:** company focus this year is order frequency and habit (retention), with profitability as a guardrail.
5. **Quantify:** more frequent orders build habit (likely better 90-day retention); contribution margin per order may fall for small orders because delivery cost is fixed-ish. Need margin per user, not just revenue.
6. **Options:** (a) ship as is; (b) ship but adjust ranking to balance dish size (e.g., boost combos, suggest add-ons); (c) ship to new users only; (d) extend test with a holdout to measure 60-day retention.
7. **Decision:** ship **with iteration (b)** to new and medium users, keep a 5% long-term holdout, and add guardrails: contribution margin per user must not fall more than 1%; monitor 60-day retention. Revisit in 6 weeks.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 230" role="img" aria-labelledby="tq-t tq-d">
<title id="tq-t">Resolving conflicting metrics</title>
<desc id="tq-d">Metric A up and metric B down feed into steps: validate the result, understand why with segments, tie to goals, quantify in a common unit, consider options, decide with guardrails.</desc>
<defs><marker id="tq-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="15" y="40" width="110" height="40" rx="8" class="d-mint d-ink" stroke-width="2"/><text x="27" y="65" class="d-text-dark" font-weight="700" font-size="11">Orders +3% ▲</text>
<rect x="15" y="100" width="110" height="40" rx="8" class="d-pink d-ink" stroke-width="2"/><text x="27" y="125" class="d-text-dark" font-weight="700" font-size="11">AOV −4% ▼</text>
<g font-size="10">
<rect x="160" y="65" width="80" height="50" rx="8" class="d-surface d-ink" stroke-width="2"/><text x="170" y="94" class="d-text">Validate</text>
<rect x="255" y="65" width="80" height="50" rx="8" class="d-sky d-ink" stroke-width="2"/><text x="262" y="88" class="d-text-dark">Why?</text><text x="262" y="102" class="d-text-dark">segments</text>
<rect x="350" y="65" width="80" height="50" rx="8" class="d-lavender d-ink" stroke-width="2"/><text x="357" y="88" class="d-text-dark">Goals +</text><text x="357" y="102" class="d-text-dark">long term</text>
<rect x="445" y="65" width="80" height="50" rx="8" class="d-butter d-ink" stroke-width="2"/><text x="452" y="88" class="d-text-dark">Common</text><text x="452" y="102" class="d-text-dark">unit (₹)</text>
<rect x="540" y="55" width="90" height="70" rx="8" class="d-mint d-ink" stroke-width="3"/><text x="548" y="80" class="d-text-dark" font-weight="700">Decide</text><text x="548" y="96" class="d-text-dark">+ guardrails</text><text x="548" y="110" class="d-text-dark">+ revisit date</text>
</g>
<g class="d-ink" stroke-width="2"><line x1="127" y1="60" x2="156" y2="82" marker-end="url(#tq-a)"/><line x1="127" y1="120" x2="156" y2="98" marker-end="url(#tq-a)"/><line x1="242" y1="90" x2="251" y2="90" marker-end="url(#tq-a)"/><line x1="337" y1="90" x2="346" y2="90" marker-end="url(#tq-a)"/><line x1="432" y1="90" x2="441" y2="90" marker-end="url(#tq-a)"/><line x1="527" y1="90" x2="536" y2="90" marker-end="url(#tq-a)"/></g>
<text x="130" y="190" class="d-text" font-size="12">Options often include: ship to a segment, iterate, or extend with a holdout.</text>
</svg>
<figcaption>Validate, explain, align with goals, quantify, then decide with safeguards.</figcaption>
</figure>

## Step by step

Practising trade-off questions:

1. **Collect 5 prompts** (Interview Prep: execution/trade-offs).
2. **For each, write the 7-step outline** in under 10 minutes.
3. **Practise saying the decision first, then the reasoning** in the summary.
4. **Prepare 2–3 personal examples** of trade-offs you made (for behavioural rounds): P4 cost vs. quality, P1 scope cuts.
5. **Mock with a partner** who pushes back on your decision.

## Common mistakes

1. **Refusing to decide** (“we need more data” without a plan).
2. **Treating every metric equally**, ignoring company goals.
3. **Not validating the experiment** before trusting the numbers.
4. **Ignoring segments**, where the real story often is.
5. **Short-term thinking** (choosing the metric that looks best this week).
6. **No mitigation or monitoring plan.**

## How it shows up in interviews

> [!INTERVIEW]
> **“A new onboarding flow increased sign-ups by 10% but 30-day retention fell by 3%. What do you do?”**
> Outline: validate → understand (which users signed up more? lower-intent users?) → long-term goal (retained users matter more) → quantify retained users net (+10% × lower rate) → options (keep for some channels, add an intent step, iterate) → decide with guardrails.

> [!INTERVIEW]
> **“You can build a feature requested by your biggest enterprise customer or a feature that helps 10,000 small customers. Which?”**
> Outline: clarify revenue and churn risk → strategic direction → reach, impact, effort → can the enterprise need be met with a workaround or generalised feature? → decide and communicate (Week 3 trade-offs lesson).

## Practice exercise

**Task (25 minutes):** “Meesho added a ‘Lowest price’ default sort. Orders +6%, but return rate rose from 12% to 15%, and seller satisfaction dropped. Keep it?” Write your 7-step answer and final decision.

```answer Reveal a model answer
1. **Clarify:** test duration 3 weeks, significant results; return costs borne partly by Meesho; seller satisfaction from surveys.
2. **Validate:** check SRM and novelty; returns lag orders, so the full return effect may still be growing.
3. **Why:** cheapest items skew to lower-quality listings; mismatch with photos → more returns; sellers with better quality but slightly higher prices lose visibility.
4. **Goals:** Meesho wants growth *and* trust; high returns hurt unit economics (reverse logistics cost) and buyer trust; seller ecosystem health matters for supply.
5. **Quantify:** net orders after returns: +6% orders × higher return rate → net delivered and kept orders up only ~2–3%; reverse logistics cost and seller churn risk may outweigh.
6. **Options:** revert to relevance sort; keep “Lowest price” as an option, not default; blend price with quality signals (ratings, return rate) in ranking; show quality badges.
7. **Decision:** don’t keep it as default. Ship a **value-ranked default** (price + rating + low return rate) and test it, with guardrails: return rate ≤ 12.5%, seller satisfaction not lower; keep “Lowest price” as a user-selected sort.
```

## Quiz

```quiz
Q: After a launch, engagement rose and revenue fell. What’s the first step?
- [ ] Roll back immediately :: Premature before understanding the result.
- [x] Validate the result and understand what behaviour changed, by segment :: Correct. Know what happened before deciding.
- [ ] Ship because engagement matters most :: Ignores revenue and goals.
- [ ] Ignore revenue :: Revenue is a key business metric.

Q: Why convert conflicting metrics into a common unit when possible?
- [ ] To make charts prettier :: Not the purpose.
- [x] So you can compare their net effect, for example in ₹ of lifetime value :: Correct. A common unit makes the trade-off concrete.
- [ ] Because interviewers require rupees :: Any common unit works.
- [ ] It removes the need for judgement :: Judgement is still needed.

Q: Which is often a better option than “ship” or “roll back”?
- [ ] Ship to everyone and never review :: Ignores the downside.
- [x] Ship to the segments that benefit, or iterate to reduce the downside, with a holdout :: Correct. You often keep the upside and limit the cost.
- [ ] Delete the experiment data :: Loses learning.
- [ ] Run the test forever :: Delays decisions indefinitely.

Q: A change increases sign-ups but lowers 30-day retention. What matters most usually?
- [ ] Sign-ups, because they’re the top of the funnel :: Low-quality sign-ups may not add value.
- [x] The net number of retained, valuable users over time :: Correct. Long-term value beats top-of-funnel spikes.
- [ ] Neither :: Both matter; combine them.
- [ ] Whichever went up more :: Size alone doesn’t decide value.

Q: What should every trade-off answer end with?
- [ ] “It depends” :: Avoids the decision.
- [x] A decision, the reason, what you give up, guardrails and a revisit point :: Correct. That’s a complete, defensible answer.
- [ ] A new experiment idea only :: Doesn’t answer the question.
- [ ] A list of all metrics :: Not a decision.
```

## Key takeaways

- Trade-offs appear as **conflicting metrics, project choices, quality vs. speed, user vs. business, segment vs. segment**.
- For conflicting metrics: **validate → explain why (segments) → tie to goals → quantify → options → decide with guardrails**.
- Favour **long-term value**, **reversibility** and **segment-level** solutions.
- Consider **ship to a segment, iterate, or holdout** rather than only ship/rollback.
- Always **decide**, name **what you give up**, and set a **revisit point**.
