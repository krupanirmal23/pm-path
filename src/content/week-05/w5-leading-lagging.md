---
id: w5-leading-lagging
title: Leading vs. lagging and guardrail metrics
week: 5
estimatedMinutes: 12
tags: [metrics, guardrails, experimentation]
---

## Why this matters for a PM

Some metrics tell you what already happened; others warn you about what’s coming. If you only watch lagging numbers like revenue or annual churn, you learn about problems months too late. If you only watch fast-moving signals, you might optimise things that don’t matter. And without guardrails, a team can hit its goal while damaging the product. Knowing the difference is basic metric literacy for PMs.

## Core concepts

### Lagging metrics

A **lagging metric** (or lagging indicator) measures an outcome after it has happened. It’s the result you ultimately care about, but it moves slowly and is hard to influence directly.

Examples: revenue, profit, annual retention, customer lifetime value, market share, 12-month churn.

Strengths: they reflect real success. Weaknesses: slow feedback; by the time they move, it’s late to change course; many factors influence them, so it’s hard to tell what caused a change.

### Leading metrics

A **leading metric** (or leading indicator) moves earlier and **predicts** a lagging metric. It’s something teams can influence quickly and measure within days or weeks.

Examples:
- For 12-month retention: % of new users activated in week 1; number of orders in the first 30 days.
- For revenue: weekly orders; checkout conversion rate.
- For churn in a subscription: drop in weekly usage; failed payment attempts; support complaints.

A good leading metric must be **predictive**: you should have evidence (or a strong reason) that moving it moves the lagging metric. Example: “Users who place 3 orders in their first 14 days have 4x higher 6-month retention.” This is how famous “aha moment” metrics are found (e.g., a social network finding that users who connect with a certain number of friends early tend to stay).

### Correlation vs. causation

Finding that a leading metric correlates with retention doesn’t prove that pushing it *causes* retention. Users who order 3 times early might simply be people who were already hungry for the product. If you force a third order with heavy discounts, retention may not follow. Test with experiments (Week 6) before betting everything on a correlation.

### Guardrail metrics

A **guardrail metric** (also called a **counter-metric** or **health metric**) is something that must not get worse while you improve your target. It protects users, the business and the long term from narrow optimisation.

Common guardrails:
- **User experience:** cancellation rate, complaints, app crash rate, page load time, uninstall rate, notification opt-outs.
- **Business:** cost per order, discount spend, margin, fraud rate, refund rate.
- **Ecosystem:** delivery partner earnings, restaurant cancellations, seller churn.
- **Trust and safety:** spam reports, privacy complaints.

Set guardrails **with thresholds**: “Cancellation rate must stay below 4%”, “p95 load time must not increase by more than 200 ms”. If a change breaches a guardrail, it doesn’t ship, even if the target metric improved.

### Putting it together: a metric set for a project

For any feature or experiment, define:
1. **Primary (goal) metric:** the outcome you’re trying to move; ideally a leading metric linked to the North Star.
2. **Secondary metrics:** help explain what happened (e.g., step-by-step funnel rates).
3. **Guardrail metrics:** must not degrade beyond a threshold.
4. **Lagging check:** the long-term metric you’ll review later to confirm the leading metric was right.

### Goodhart’s law

“When a measure becomes a target, it ceases to be a good measure.” Once people are rewarded for a number, they find ways to move the number that don’t reflect real value: more notifications to boost opens, easier sign-up that brings fraud, discounts that buy orders that don’t stick. Guardrails and periodic checks against lagging metrics are your defence.

## Worked example

**Zerodha Coin (illustrative): improve long-term investing behaviour of new investors.**

- **Lagging goal:** % of new investors still invested after 12 months.
- **Leading metric (primary):** % of new investors who set up a SIP (systematic investment plan) within 30 days. Evidence: internal analysis shows SIP starters are 3x more likely to still be invested after a year.
- **Secondary:** SIP setup funnel steps; average SIP amount.
- **Guardrails:** SIP cancellation within 60 days below 15% (prevents pushing people into SIPs they immediately cancel); support tickets about SIPs not increasing; no increase in complaints about mis-selling.
- **Lagging check:** compare 12-month retention of this year’s cohorts with last year’s.

**What could go wrong without guardrails:** the team adds an aggressive pop-up pushing SIPs to everyone at sign-up. SIP setups jump 40% (leading metric up!), but 50% cancel within two months and complaints rise. The guardrails catch it.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 220" role="img" aria-labelledby="ll-t ll-d">
<title id="ll-t">Leading, lagging and guardrail metrics</title>
<desc id="ll-d">A leading metric on the left points to a lagging metric on the right over time; guardrails sit above and below like road barriers.</desc>
<defs><marker id="ll-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="20" y="20" width="600" height="22" rx="6" class="d-pink d-ink" stroke-width="2"/>
<text x="230" y="36" class="d-text-dark" font-size="12" font-weight="700">Guardrail: cancellations, complaints, cost</text>
<rect x="20" y="178" width="600" height="22" rx="6" class="d-pink d-ink" stroke-width="2"/>
<text x="250" y="194" class="d-text-dark" font-size="12" font-weight="700">Guardrail: opt-outs, crashes, fraud</text>
<rect x="40" y="75" width="200" height="70" rx="10" class="d-sky d-ink" stroke-width="2"/>
<text x="56" y="102" class="d-text-dark" font-weight="700">Leading</text>
<text x="56" y="124" class="d-text-dark" font-size="11">SIP started in 30 days</text>
<rect x="400" y="75" width="200" height="70" rx="10" class="d-mint d-ink" stroke-width="2"/>
<text x="416" y="102" class="d-text-dark" font-weight="700">Lagging</text>
<text x="416" y="124" class="d-text-dark" font-size="11">Still invested at 12 months</text>
<line x1="245" y1="110" x2="394" y2="110" class="d-ink" stroke-width="3" marker-end="url(#ll-a)"/>
<text x="268" y="100" class="d-text" font-size="11">predicts (weeks → months)</text>
</svg>
<figcaption>Steer with leading metrics, confirm with lagging ones, and stay between the guardrails.</figcaption>
</figure>

## Step by step

Defining the metric set for your P1 feature:

1. **Write the lagging goal** (often connected to retention or revenue).
2. **Find a leading metric** that moves within weeks. Ask: “What early behaviour predicts the lagging goal?” Use data if you have it; otherwise cite research and label it a hypothesis.
3. **State the evidence** for the link, or how you’ll validate it.
4. **Add 2–4 secondary metrics** to explain changes (funnel steps).
5. **Choose 2–4 guardrails** across user experience, business and ecosystem, each with a threshold.
6. **Plan the lagging check**: when will you look at the lagging metric to confirm?
7. **Write it all into your PRD’s Goals section** and your tracking plan (Week 6).

## Common mistakes

1. **Only lagging metrics.** Feedback comes too late to steer.
2. **Leading metrics with no proven link.** You optimise something that doesn’t matter.
3. **Guardrails without thresholds.** “Watch cancellations” isn’t a rule.
4. **Too many guardrails.** Ten guardrails mean something always fails by noise. Pick the important few.
5. **Ignoring Goodhart’s law.** Rewarding a single number invites gaming.
6. **Never checking the lagging metric** to confirm your leading metric still predicts it.

## How it shows up in interviews

> [!INTERVIEW]
> **“How would you measure the success of [feature]?”**
> Outline: goal → primary metric (leading, linked to North Star) → secondary metrics (funnel) → guardrails with thresholds → long-term lagging check → how you’d read the results (experiment).

> [!INTERVIEW]
> **“Your team increased notification open rates by 30%. Is that good?”**
> Outline: not necessarily → check guardrails (opt-outs, uninstalls, complaints) → check downstream value (did opens lead to orders/retention?) → mention Goodhart’s law → decide.

## Practice exercise

**Task (20 minutes):** For **Meesho’s “bulk listing from photos” feature for sellers**, define: a lagging goal, a leading primary metric with a hypothesised link, 2 secondary metrics, 3 guardrails with thresholds, and when you’d check the lagging metric.

```answer Reveal a model answer
- **Lagging goal:** % of new sellers still active (making sales) 90 days after sign-up.
- **Leading primary metric:** % of new sellers who list 10+ products within their first 7 days. Hypothesised link: sellers with larger early catalogues get early orders and stay; verify with past cohort data.
- **Secondary:** median time to list 10 products; % of photo-uploaded listings published without edits.
- **Guardrails:** listing rejection rate (quality) ≤ 5%; return rate on bulk-listed products not higher than manually listed ones by more than 1 percentage point; seller support tickets about listings ≤ current level.
- **Lagging check:** compare 90-day seller retention for cohorts before and after launch, at 3 months post-launch.
```

## Quiz

```quiz
Q: Which is a lagging metric?
- [ ] % of new users who complete onboarding today :: Leading: fast-moving and predictive.
- [x] Annual revenue :: Correct. It reflects results after the fact and moves slowly.
- [ ] Add-to-cart rate this week :: Leading.
- [ ] First-week orders per new user :: Leading.

Q: What makes a leading metric useful?
- [ ] It’s easy to increase :: Easy-to-move metrics can be meaningless.
- [x] It moves quickly and reliably predicts the lagging outcome you care about :: Correct.
- [ ] It’s reported to investors :: Not the criterion.
- [ ] It’s the same as the North Star :: Not necessarily.

Q: Which is the best guardrail for a feature aiming to increase sign-ups?
- [ ] Number of sign-ups :: That’s the target, not a guardrail.
- [x] Fraudulent account rate must stay below 0.5% :: Correct. It protects against harmful ways of hitting the target.
- [ ] Number of designers on the team :: Not a product metric.
- [ ] Brand colour consistency :: Not measurable in this context.

Q: What does Goodhart’s law warn about?
- [ ] Metrics are always wrong :: Too strong.
- [x] When a measure becomes a target, people find ways to move it that don’t reflect real value :: Correct.
- [ ] Leading metrics are always better than lagging ones :: Not what it says.
- [ ] Metrics should be secret :: Not what it says.

Q: Users who order 3 times in 14 days retain 4x better. What should you do before investing heavily in pushing a third order?
- [ ] Nothing; correlation is enough :: Correlation may not be causation.
- [x] Test whether causing a third order actually improves retention, e.g., with an experiment :: Correct.
- [ ] Give everyone a huge discount on a third order :: Might buy orders that don’t lead to retention.
- [ ] Ignore the finding :: It’s a promising hypothesis worth testing.
```

## Key takeaways

- **Lagging** metrics measure final outcomes but move slowly; **leading** metrics move fast and **predict** them.
- A leading metric is only useful if it’s **truly predictive**; test **causation** with experiments.
- **Guardrails** with **thresholds** stop teams from winning in harmful ways.
- Define a full set: **primary, secondary, guardrails, lagging check**.
- Remember **Goodhart’s law**: targets get gamed unless protected.
