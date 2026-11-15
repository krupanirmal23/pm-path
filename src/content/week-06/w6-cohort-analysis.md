---
id: w6-cohort-analysis
title: Cohort and retention analysis
week: 6
estimatedMinutes: 14
tags: [analytics, retention, cohorts]
---

## Why this matters for a PM

In Week 5 you learned what cohorts and retention curves are. This week you’ll use them as an analyst would: to find **why** users stay or leave, evaluate a launch, and find the behaviours that predict long-term retention. These analyses show up in nearly every growth or analytics interview and in your P2 case.

## Core concepts

### Three questions cohort analysis answers

1. **Is the product getting better?** Compare recent cohorts with older ones at the same age (e.g., Week-4 retention of March vs. May sign-ups).
2. **Who retains best?** Compare behavioural or acquisition segments (organic vs. paid; users who did X vs. didn’t).
3. **Did a change work?** Compare cohorts before and after a launch, or in an experiment (Week 6, A/B testing).

### Acquisition cohorts vs. behavioural cohorts

- **Acquisition cohorts** group users by **when** they started (sign-up week/month). Good for spotting trends and the effect of product changes over time.
- **Behavioural cohorts** group users by **what they did**: “used search in week 1”, “ordered from 3+ restaurants in their first month”, “enabled notifications”. Good for finding behaviours linked to retention.

Analytics tools (Mixpanel, Amplitude, PostHog) let you define behavioural cohorts with clicks and compare their retention.

### Finding retention drivers (the “aha” analysis)

A practical approach:
1. Choose a **retention outcome**: e.g., “ordered in week 4 after sign-up”.
2. List **candidate early behaviours** (first 7 days): used search, saved an address, ordered twice, tried 2+ cuisines, used a coupon, enabled notifications.
3. For each, compare week-4 retention of users who **did** vs. **didn’t**.
4. Look for behaviours with a **big gap** *and* enough users doing them.
5. Look for a **threshold**: retention may jump between 1 and 2 orders, then flatten. That suggests a target (“get users to 2 orders in 7 days”).
6. Treat the result as a **hypothesis**: correlation, not proof. Confirm with an experiment that nudges the behaviour.

### Retention by feature (feature retention)

For an individual feature, ask: of users who used it in week 1, what share use it again in week 2, 3, 4? A feature with high first use but low repeat use may be a novelty or a disappointment.

### Reading retention changes carefully

Before celebrating or panicking about a cohort change, check:
- **Mix shift:** did the channel mix change (more paid users)? Paid users often retain worse. Compare within channels.
- **Seasonality:** festival months, exam seasons, IPL and holidays affect behaviour in India.
- **Cohort size:** small cohorts are noisy.
- **Definition changes:** did tracking or the definition of “active” change?

### Resurrection and churn analysis

- **Churned users:** not active for a defined period (e.g., 30 days for food ordering).
- **Resurrected users:** churned users who came back. Tracking resurrection tells you whether win-back campaigns work.
- **Churn reasons:** combine data (what they did last, e.g., a cancelled order or a failed payment) with surveys or interviews.

## Worked example

**Question (P2-style):** “What early behaviour predicts that a new user is still ordering in week 4?” Food delivery app, 20,000 new users in April.

| First-7-day behaviour | Users who did it | W4 retention (did) | W4 retention (didn’t) |
|---|---|---|---|
| Placed 2+ orders | 5,200 | 46% | 12% |
| Ordered from 2+ different cuisines | 3,100 | 41% | 17% |
| Saved a home address | 14,000 | 24% | 13% |
| Used a first-order coupon | 15,500 | 18% | 28% |
| Enabled notifications | 9,800 | 23% | 18% |
| Rated an order | 4,000 | 34% | 18% |

**Reading it:**
- **“2+ orders in 7 days”** has the biggest gap (46% vs. 12%) and a meaningful share of users. Strong candidate for an activation target.
- **Coupon users retain worse** (18% vs. 28%): many are deal-seekers. A warning about over-relying on first-order discounts.
- **Notifications** barely matter here.
- **Ratings** correlate, but probably because engaged users rate; forcing ratings likely won’t create retention.

**Next step:** experiment with a “second order within 7 days” nudge (e.g., a small, time-limited offer on the second order or a reorder reminder at the user’s usual meal time). Measure week-4 retention in test vs. control, not just second orders.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 250" role="img" aria-labelledby="ca2-t ca2-d">
<title id="ca2-t">Retention by early behaviour</title>
<desc id="ca2-d">Two retention curves: users with two or more orders in week one flatten at a high level; users with one order decline to a low level.</desc>
<line x1="60" y1="210" x2="610" y2="210" class="d-ink" stroke-width="2"/>
<line x1="60" y1="210" x2="60" y2="20" class="d-ink" stroke-width="2"/>
<text x="290" y="238" class="d-text" font-size="12">Weeks since sign-up →</text>
<text x="22" y="150" class="d-text" font-size="12" transform="rotate(-90 22 150)">% ordering</text>
<path d="M60 30 C 150 70 220 95 320 100 S 520 104 600 104" fill="none" style="stroke: var(--c-mint)" stroke-width="6"/>
<path d="M60 30 C 150 70 220 95 320 100 S 520 104 600 104" fill="none" class="d-ink" stroke-width="1"/>
<path d="M60 30 C 120 140 200 175 320 183 S 520 190 600 192" fill="none" style="stroke: var(--c-pink)" stroke-width="6"/>
<path d="M60 30 C 120 140 200 175 320 183 S 520 190 600 192" fill="none" class="d-ink" stroke-width="1"/>
<text x="440" y="96" class="d-text" font-size="12" font-weight="700">2+ orders in week 1 (46% at W4)</text>
<text x="440" y="180" class="d-text" font-size="12" font-weight="700">1 order in week 1 (12% at W4)</text>
</svg>
<figcaption>A large, persistent gap suggests a behaviour worth testing as an activation goal. Confirm with an experiment.</figcaption>
</figure>

## Step by step

Running a retention-driver analysis for P2:

1. **Define the outcome** (e.g., ordered in week 4) and the **observation window** (first 7 days).
2. **List 6–10 candidate behaviours** that are trackable from your tracking plan.
3. **Build behavioural cohorts** in your analytics tool (or with SQL in the Playground: flag each user with CASE, then compare retention).
4. **Compare retention** did vs. didn’t; note the number of users in each group.
5. **Check thresholds** (1 vs. 2 vs. 3+ of the behaviour).
6. **Check for mix shift and confounders** (channel, city, platform).
7. **Rank candidates** by gap × reach × how actionable they are.
8. **Write a hypothesis and experiment** for the best one.

## Common mistakes

1. **Treating correlation as causation.** Engaged people do many things; pushing one behaviour may not cause retention.
2. **Ignoring group size.** A 60% retention gap among 40 users is noise.
3. **Comparing cohorts with different channel mixes** and blaming the product.
4. **Choosing behaviours you can’t influence.** “Lives in a dense area” isn’t a product lever.
5. **Measuring the nudge, not the outcome.** More second orders isn’t success if week-4 retention doesn’t move.
6. **Forgetting seasonality** in Indian markets (festivals, exams, cricket).

## How it shows up in interviews

> [!INTERVIEW]
> **“How would you find the ‘aha moment’ for a product?”**
> Outline: define long-term retention outcome → list early behaviours → compare retention did vs. didn’t, with group sizes → find thresholds → shortlist → validate causation with an experiment → set it as the activation metric.

> [!INTERVIEW]
> **“Retention for May sign-ups is worse than April. Why might that be?”**
> Outline: check definitions and tracking → mix shift (channels, cities, campaigns) → seasonality → product changes in May (releases, pricing) → segment to isolate → confirm with data.

## Practice exercise

**Task (35 minutes, SQL Playground):** Using the playground dataset, compare the share of users who ordered in **at least two different months** between those whose first order used a coupon and those whose first order didn’t. Then write 3 lines interpreting the result and one experiment idea.

*Hint:* find each user’s first order (MIN(order_ts)), check its coupon_code, then count distinct months of orders per user.

````answer Reveal a model answer
```sql
WITH firsts AS (
  SELECT o.user_id, o.coupon_code
  FROM orders o
  JOIN (
    SELECT user_id, MIN(order_ts) AS first_ts
    FROM orders
    GROUP BY user_id
  ) f ON f.user_id = o.user_id AND f.first_ts = o.order_ts
),
months AS (
  SELECT user_id, COUNT(DISTINCT substr(order_ts, 1, 7)) AS active_months
  FROM orders
  WHERE status = 'delivered'
  GROUP BY user_id
)
SELECT CASE WHEN f.coupon_code IS NULL THEN 'no coupon' ELSE 'coupon' END AS first_order,
       COUNT(*) AS users,
       ROUND(100.0 * AVG(CASE WHEN m.active_months >= 2 THEN 1 ELSE 0 END), 1) AS multi_month_pct
FROM firsts f
LEFT JOIN months m ON m.user_id = f.user_id
GROUP BY first_order;
```
(`WITH … AS (…)` defines named subqueries, called CTEs, that make long queries readable.)

**Interpretation (pattern to look for):** if coupon-first users show a lower multi-month rate, many may be deal-seekers who don’t return at full price. Check group sizes before concluding. Also segment by acquisition_channel to see whether coupons come mostly with paid users.

**Experiment:** for new users, test a smaller first-order discount plus a second-order offer valid for 7 days vs. the current large first-order discount; primary metric: users ordering in 2+ months; guardrail: first-order conversion.
````

## Quiz

```quiz
Q: What’s a behavioural cohort?
- [ ] Users grouped by sign-up date :: That’s an acquisition cohort.
- [x] Users grouped by something they did, like ordering twice in week 1 :: Correct.
- [ ] Users grouped by age :: That’s a demographic segment.
- [ ] All users who churned :: A segment, but not specifically a behavioural cohort definition.

Q: Users who rate orders retain better. Should you force everyone to rate?
- [ ] Yes, it will raise retention :: Likely correlation, not causation.
- [x] Not without an experiment; engaged users probably rate because they’re engaged :: Correct.
- [ ] Yes, ratings are always good :: Forcing them may annoy users.
- [ ] No, ratings never matter :: They might; you need evidence.

Q: May cohort retention dropped, and May had a big paid campaign. What should you check first?
- [ ] The app’s colour scheme :: Unlikely.
- [x] Retention within each acquisition channel, to rule out mix shift :: Correct.
- [ ] Total downloads :: Doesn’t explain retention.
- [ ] Nothing; retention is random :: A drop deserves analysis.

Q: A behaviour shows a 50-point retention gap, but only 30 users did it. What’s the issue?
- [ ] None; the gap is huge :: Small groups produce unreliable rates.
- [x] The group is too small to trust the result :: Correct.
- [ ] The behaviour is too common :: The opposite problem.
- [ ] You should only look at averages :: Not the issue.

Q: You launched a nudge that doubled second orders. What’s the real success metric?
- [ ] Second orders :: That’s the nudge’s direct effect, not the goal.
- [x] Longer-term retention (e.g., week-4 ordering) vs. a control group :: Correct.
- [ ] Number of notifications sent :: An output.
- [ ] App store rating :: Not the primary outcome.
```

## Key takeaways

- Cohort analysis answers: **is it getting better, who retains best, and did a change work?**
- **Acquisition cohorts** show trends; **behavioural cohorts** reveal retention drivers.
- Find drivers by comparing **did vs. didn’t**, with **group sizes** and **thresholds**.
- Watch for **mix shift, seasonality, small samples and definition changes**.
- Treat drivers as **hypotheses** and confirm with **experiments** measured on the **real outcome**.
