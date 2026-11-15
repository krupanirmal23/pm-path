---
id: w5-retention-cohorts
title: Retention and cohorts
week: 5
estimatedMinutes: 15
tags: [metrics, retention, cohorts]
---

## Why this matters for a PM

Retention is the clearest signal of whether a product delivers lasting value. Downloads can be bought; retention can’t. **Cohort analysis** shows how retention changes for groups of users over time, which is how you tell whether your product is actually improving. Interviewers love asking you to read and interpret a retention curve.

## Core concepts

### Retention, defined

**Retention** is the share of users who come back to the product after a period of time. To define it precisely you need three things:
1. **Who:** the starting group (e.g., users who signed up in January).
2. **What counts as “active”:** opened the app? placed an order? made a payment? Use a **value action**, not just an app open, where possible.
3. **When:** the time point (Day 1, Day 7, Day 30, Week 4, Month 3).

Example: “Day-30 retention = % of users who signed up on a given day and placed at least one order on day 30 (or in the 7 days around it).”

### Types of retention

- **N-day (classic) retention:** active exactly on day N. Strict; good for daily-use apps.
- **Unbounded (rolling) retention:** active on day N *or any day after*. More forgiving; good for infrequent products.
- **Bracket retention:** active within a window (e.g., days 28–34). A practical middle ground for weekly products like food ordering.

Choose based on the product’s natural frequency, like the North Star time window.

### Cohorts

A **cohort** is a group of users who share a starting characteristic, usually the time they started (sign-up week or month). Cohort analysis tracks each group separately over time.

Why not just look at overall active users? Because overall numbers mix old loyal users with new ones. If you acquire lots of new users, overall activity rises even if new users churn faster than before. Cohorts separate those effects.

### The cohort table

Rows = cohorts (e.g., sign-up month). Columns = time since start (Month 0, 1, 2…). Cells = % of the cohort still active.

| Cohort | Users | M0 | M1 | M2 | M3 |
|---|---|---|---|---|---|
| Jan | 1,000 | 100% | 42% | 33% | 30% |
| Feb | 1,200 | 100% | 45% | 36% | 33% |
| Mar | 1,500 | 100% | 51% | 41% | — |
| Apr | 1,400 | 100% | 52% | — | — |

How to read it:
- **Read across a row** to see how one cohort decays over time.
- **Read down a column** to see whether newer cohorts retain better at the same age. Here, M1 retention improved from 42% to 52%: the product (or the users acquired) got better.
- The **triangle shape** is normal: newer cohorts haven’t reached later months yet.

### The retention curve

Plot % retained (y) against time since start (x). Three shapes matter:
1. **Declining to zero:** users keep leaving until almost none remain. No product–market fit for this group.
2. **Flattening:** the curve drops at first, then levels off. A core of users keeps getting value. This is a strong sign of PMF. The level where it flattens is your **terminal retention**.
3. **Smiling (rising again):** some users return later (resurrection), often due to new features or network effects. Rare and great.

**What to improve:** lift the early drop (better activation and onboarding) and raise the flat level (more lasting value).

### Churn

**Churn rate** is the share of users (or customers) lost in a period: churn = 1 − retention for that period. For subscriptions: monthly churn of 5% means you lose 5% of subscribers every month, which compounds: after 12 months, 0.95^12 ≈ 54% remain.

### Segmenting cohorts

Cohorts can also be grouped by **channel** (organic vs. paid), **platform**, **city**, or **first action** (users who used a coupon on their first order vs. not). This often reveals that one acquisition channel brings users who never stay.

## Worked example

**Swiggy-like app (illustrative). Weekly order retention by sign-up month, bracketed weekly activity.**

You notice overall weekly orders are up 20% since February, and leadership is happy. You build the cohort table:

| Cohort | Users | W1 | W4 | W8 |
|---|---|---|---|---|
| Feb (organic heavy) | 50,000 | 38% | 26% | 22% |
| Mar (big ₹150-off campaign) | 120,000 | 30% | 14% | 9% |
| Apr | 60,000 | 36% | 24% | — |

**Insight:** March brought 2.4x more users, but their W8 retention is 9% vs. 22%. Many came for the discount and left. Overall orders rose because of volume, hiding the weak quality. Segmenting March by coupon use confirms it: users who signed up with the ₹150 coupon retain at 6% at W8; others at 21%.

**Decision:** Reduce first-order discounts for paid channels; invest in second-order experience (reorder prompts, smaller recurring offers); measure W4 retention of new cohorts as the success metric.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 260" role="img" aria-labelledby="rc2-t rc2-d">
<title id="rc2-t">Retention curve shapes</title>
<desc id="rc2-d">Three curves: one declining to zero, one flattening at around 25 percent, one smiling back upward.</desc>
<line x1="60" y1="220" x2="610" y2="220" class="d-ink" stroke-width="2"/>
<line x1="60" y1="220" x2="60" y2="20" class="d-ink" stroke-width="2"/>
<text x="300" y="248" class="d-text" font-size="12">Time since sign-up →</text>
<text x="22" y="150" class="d-text" font-size="12" transform="rotate(-90 22 150)">% retained</text>
<path d="M60 30 C 120 140 200 190 600 216" fill="none" style="stroke: var(--c-pink)" stroke-width="5"/>
<path d="M60 30 C 120 120 180 160 260 168 S 500 170 600 170" fill="none" style="stroke: var(--c-sky)" stroke-width="5"/>
<path d="M60 30 C 120 120 180 160 280 165 S 480 140 600 120" fill="none" style="stroke: var(--c-mint)" stroke-width="5"/>
<path d="M60 30 C 120 140 200 190 600 216" fill="none" class="d-ink" stroke-width="1"/>
<path d="M60 30 C 120 120 180 160 260 168 S 500 170 600 170" fill="none" class="d-ink" stroke-width="1"/>
<path d="M60 30 C 120 120 180 160 280 165 S 480 140 600 120" fill="none" class="d-ink" stroke-width="1"/>
<text x="470" y="210" class="d-text" font-size="12" font-weight="700">Declining to zero: no PMF</text>
<text x="470" y="186" class="d-text" font-size="12" font-weight="700">Flattening: PMF</text>
<text x="470" y="112" class="d-text" font-size="12" font-weight="700">Smile: resurrection</text>
</svg>
<figcaption>A curve that flattens means a core group keeps getting value. Raise the floor and shrink the early drop.</figcaption>
</figure>

## Step by step

Running a cohort analysis (in Sheets or SQL):

1. **Define the cohort** (e.g., sign-up month) and the **active action** (e.g., delivered order).
2. **Choose the retention type** (N-day, unbounded or bracket) and time unit (week/month).
3. **For each user**, find their cohort and the periods in which they were active.
4. **Count active users per cohort per period**; divide by the cohort size.
5. **Lay out the triangle table**; add a colour scale (darker = higher).
6. **Read across** (decay) and **down** (improvement over time).
7. **Plot the curves** for 2–3 cohorts on one chart.
8. **Segment** by channel, platform or first-order behaviour.
9. **Write the insight**: what changed, for whom, and what you’ll do.

## Common mistakes

1. **Using overall active users** instead of cohorts; growth hides churn.
2. **Defining “active” as app open** when the value action is ordering or paying.
3. **Comparing cohorts at different ages** (Jan at M3 vs. Apr at M1).
4. **Ignoring small cohort sizes**; 40 users can swing wildly.
5. **Using the wrong retention type** for the product’s frequency.
6. **Stopping at the number** without segmenting to find the cause.

## How it shows up in interviews

> [!INTERVIEW]
> **“Here’s a retention curve. What do you see?”**
> Outline: describe the shape (declining vs. flattening) → where the biggest drop is (early = activation/onboarding problem) → the terminal level vs. benchmarks for the category → compare cohorts if given → hypotheses → what you’d do.

> [!INTERVIEW]
> **“DAU is growing but you suspect the product is getting worse. How would you check?”**
> Outline: cohort analysis → compare W1/W4 retention across recent cohorts → segment by channel → check if growth is driven by acquisition volume hiding worse retention.

## Practice exercise

**Task (25 minutes):** Interpret this monthly cohort table for a bill-payments feature, and write 3 insights and 2 actions.

| Cohort | Users | M1 | M2 | M3 |
|---|---|---|---|---|
| Jan | 8,000 | 55% | 48% | 46% |
| Feb | 9,000 | 54% | 47% | 45% |
| Mar (cashback campaign) | 25,000 | 35% | 22% | 18% |
| Apr | 10,000 | 61% | 55% | — |

```answer Reveal a model answer
**Insights**
1. Jan and Feb cohorts flatten around 45–46% by M3, a sign that a core group gets lasting value from bill payments.
2. The March cashback cohort was 2.5x bigger but retained far worse (18% at M3 vs. ~45%): many users came for cashback and left. Overall numbers in March–April would look great while hiding this.
3. April retains better than any previous cohort at M1 and M2 (61%, 55%), suggesting a recent product improvement (or better targeting) is working.

**Actions**
1. Reduce broad cashback for acquisition; if used, target users with recurring bills (e.g., electricity, broadband) and measure M2 retention, not sign-ups.
2. Find what changed for April (feature launch? channel mix?) and double down; confirm by segmenting April by channel and first bill type.
```

## Quiz

```quiz
Q: What is a cohort?
- [ ] All users of the product :: That’s the whole user base.
- [x] A group of users who share a starting characteristic, such as sign-up month :: Correct.
- [ ] A group of power users :: That’s a segment, not necessarily a cohort.
- [ ] A team of analysts :: Not related.

Q: In a cohort table, what does reading down a column tell you?
- [ ] How one cohort decays over time :: That’s reading across a row.
- [x] Whether newer cohorts retain better or worse at the same age :: Correct.
- [ ] Total revenue :: Not shown in a retention table.
- [ ] The number of features shipped :: Not shown.

Q: A retention curve drops quickly and then flattens at 25%. What does it suggest?
- [ ] No product–market fit :: That would be a curve heading to zero.
- [x] A core group keeps getting value, which is a sign of product–market fit :: Correct.
- [ ] The data is wrong :: Flattening is a common, healthy shape.
- [ ] Users are resurrecting :: That would be an upward “smile”.

Q: Overall weekly orders rose 20%, but the newest cohorts retain much worse. What’s happening?
- [ ] The product is improving :: Not for new users.
- [x] Acquisition volume is hiding worse retention of new users :: Correct. Cohorts reveal what totals hide.
- [ ] Retention doesn’t matter if orders rise :: It will catch up with you.
- [ ] Old users are leaving :: The data points to new users leaving.

Q: Monthly churn for a subscription is 5%. Roughly what share of subscribers remain after 12 months without new sign-ups?
- [ ] 40% :: Too low.
- [x] About 54% :: Correct. 0.95^12 ≈ 0.54.
- [ ] 60% :: That would be simple subtraction (100 − 12 × 5 + …); churn compounds.
- [ ] 95% :: That’s one month.

Q: For a food app used weekly, which retention type is usually most practical?
- [ ] Day-1 N-day retention only :: Too strict for weekly behaviour.
- [x] Bracket (window) retention, e.g., ordered in week 4 :: Correct. It matches the natural frequency.
- [ ] Yearly retention only :: Too slow to guide decisions.
- [ ] Retention isn’t useful for food apps :: It’s essential.
```

## Key takeaways

- **Retention** = who, what counts as active, and when; prefer **value actions** over app opens.
- **Cohorts** separate new users from old, revealing what totals hide.
- Read a cohort table **across** (decay) and **down** (improvement).
- A **flattening curve** signals product–market fit; improve the **early drop** and the **floor**.
- Always **segment** cohorts (channel, platform, first action) to find causes.
