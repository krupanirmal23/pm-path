---
id: w5-aarrr
title: AARRR funnels
week: 5
estimatedMinutes: 13
tags: [metrics, funnels, growth]
---

## Why this matters for a PM

Growth isn’t one number; it’s a chain of steps where users join, get value, stay, pay and bring others. The **AARRR** framework (often called “pirate metrics” because it sounds like “Arrr!”) gives you a simple map of that chain, so you can find the weakest step instead of guessing. Funnel thinking is behind many interview answers and your 5 funnel queries this week.

## Core concepts

### What a funnel is

A **funnel** is a sequence of steps users go through, where some users drop off at each step. You measure how many reach each step and the **conversion rate** between steps.

Conversion rate (step A → step B) = users who reached B ÷ users who reached A.

Example checkout funnel for a food app, per week:
- Opened app: 100,000
- Viewed a restaurant: 60,000 (60%)
- Added to cart: 30,000 (50% of viewers)
- Started checkout: 21,000 (70% of carts)
- Paid: 18,900 (90% of checkouts)

Overall conversion (open → paid) = 18,900 ÷ 100,000 = 18.9%.

### The five AARRR stages

1. **Acquisition:** how users find and arrive at your product. Metrics: visitors, installs, sign-ups by channel, cost per acquisition (CPA).
2. **Activation:** do new users reach the first moment of real value (the “aha moment”)? Metrics: % of new users who complete the key first action within a time window (e.g., place a first order within 7 days).
3. **Retention:** do they come back and keep getting value? Metrics: Day 1/7/30 retention, weekly active users, cohort curves (next lesson).
4. **Referral:** do they bring others? Metrics: invites sent per user, referral conversion, **viral coefficient** (new users generated per existing user).
5. **Revenue:** do they pay, and how much? Metrics: conversion to paying, average revenue per user (ARPU), lifetime value (LTV).

Some versions put **Awareness** before Acquisition (AAARRR). Some reorder Referral and Revenue. The order matters less than measuring each stage.

### Defining activation well

Activation is the most important and most often vague stage. A good activation definition:
- Is a **specific action** tied to value (“placed first order”, “made first UPI payment”, “completed first SIP”).
- Has a **time window** (“within 7 days of sign-up”).
- **Predicts retention**: users who activate are much more likely to still be around later. Find it by comparing retention of users who did vs. didn’t do candidate actions.

Example: “Users who add 3+ expenses and invite 1 flatmate in their first week retain at 60% vs. 15%.” That makes “3 expenses + 1 invite in 7 days” a strong activation definition.

### Retention is the foundation

If retention is weak, everything above it leaks. Pouring more users into acquisition with poor retention is like filling a bucket with holes. Most strong PMs check retention first, then activation, then acquisition.

### Unit economics, briefly

Two numbers connect the funnel to business viability:
- **CAC (customer acquisition cost):** marketing and sales spend ÷ new customers acquired.
- **LTV (lifetime value):** the total profit (or revenue) a customer generates over their relationship with you.

A healthy business typically needs LTV comfortably above CAC (a common rule of thumb is 3:1). If CAC is ₹600 and LTV is ₹400, every new customer loses money.

### Funnels inside funnels

AARRR is the big picture. Each stage has detailed funnels: activation might be sign-up → KYC → first deposit → first trade. When a stage is weak, zoom into its detailed funnel to find the leaking step.

## Worked example

**Groww (illustrative, monthly numbers for new users).**

| Stage | Definition | Number | Conversion |
|---|---|---|---|
| Acquisition | App installs | 500,000 | — |
| Sign-up | Account created | 300,000 | 60% of installs |
| Activation | First investment within 14 days | 75,000 | 25% of sign-ups |
| Retention | Still investing in month 3 | 37,500 | 50% of activated |
| Referral | Referred at least one friend | 5,000 | 13% of retained |
| Revenue | Generated brokerage/fees in month | — | — |

**Diagnosis:** The biggest relative leak is sign-up → activation (only 25%). Zooming in:
- Sign-up → KYC complete: 55%
- KYC → bank linked: 85%
- Bank linked → first investment: 53%

KYC completion and the final “first investment” step leak most. Research (Week 2) suggests fear and confusion about which fund to pick. So the team focuses on KYC friction and a guided “start with ₹500” flow before spending more on acquisition.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 260" role="img" aria-labelledby="aa-t aa-d">
<title id="aa-t">The AARRR funnel</title>
<desc id="aa-d">Five stacked, narrowing bars: acquisition, activation, retention, referral and revenue, with a loop arrow from referral back to acquisition.</desc>
<defs><marker id="aa-m" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="60" y="15" width="440" height="40" rx="8" class="d-lavender d-ink" stroke-width="2"/><text x="76" y="41" class="d-text-dark" font-weight="700">Acquisition · arrive</text>
<rect x="100" y="62" width="360" height="40" rx="8" class="d-sky d-ink" stroke-width="2"/><text x="116" y="88" class="d-text-dark" font-weight="700">Activation · first value</text>
<rect x="140" y="109" width="280" height="40" rx="8" class="d-mint d-ink" stroke-width="2"/><text x="156" y="135" class="d-text-dark" font-weight="700">Retention · come back</text>
<rect x="175" y="156" width="210" height="40" rx="8" class="d-peach d-ink" stroke-width="2"/><text x="191" y="182" class="d-text-dark" font-weight="700">Referral · bring others</text>
<rect x="205" y="203" width="150" height="40" rx="8" class="d-butter d-ink" stroke-width="2"/><text x="221" y="229" class="d-text-dark" font-weight="700">Revenue · pay</text>
<path d="M390 176 C 560 170 590 60 505 36" fill="none" class="d-ink" stroke-width="2" marker-end="url(#aa-m)"/>
<text x="520" y="120" class="d-text" font-size="11">referrals feed</text>
<text x="520" y="134" class="d-text" font-size="11">acquisition</text>
</svg>
<figcaption>Find the leakiest stage first. Weak retention makes every other stage expensive.</figcaption>
</figure>

## Step by step

Building a funnel model for P1 (Google Sheets):

1. **Define each AARRR stage** for your product with a specific action and time window.
2. **Estimate numbers** for a month (use research, competitor benchmarks or reasonable assumptions; label them).
3. **Calculate conversion between stages** with formulas (`=B3/B2`).
4. **Find the biggest leak**: the lowest conversion relative to what’s achievable.
5. **Zoom in**: break the leaking stage into its detailed steps.
6. **Write hypotheses** for why users drop at the worst step.
7. **Model improvements**: if activation goes from 25% to 30%, what happens to retained users and revenue? (This is how you size impact for RICE.)
8. **Write funnel SQL** in the Playground to measure real step counts from the `events` table (lesson on SQL coming up).

## Common mistakes

1. **Vague activation.** “Engaged users” isn’t a definition.
2. **Obsessing over acquisition** while retention leaks.
3. **Comparing conversion rates across different time windows** or user groups without noticing.
4. **Counting events instead of users.** Ten add-to-cart clicks from one user isn’t ten users.
5. **Ignoring the order of steps.** A user who paid without “viewing a restaurant” (reorder) may break naive funnels; decide how to handle it.
6. **Average-only thinking.** Funnels differ a lot by segment (platform, city, channel). Always segment.

## How it shows up in interviews

> [!INTERVIEW]
> **“How would you grow [product]?”**
> Outline: map AARRR for the product → define activation precisely → find the weakest stage with data (or reasonable assumptions) → focus there → 2–3 ideas → metrics. Saying “first I’d check retention” signals maturity.

> [!INTERVIEW]
> **“Sign-ups are up 40% but revenue is flat. Why?”**
> Outline: walk the funnel → maybe new users from a new channel aren’t activating (low-quality traffic, incentive-driven sign-ups) → check activation and retention by channel → check CAC vs. LTV → fix targeting or onboarding.

## Practice exercise

**Task (30 minutes):** Build an AARRR model in Google Sheets for **a meal-subscription startup in Bengaluru** with these assumptions: 40,000 site visitors/month; 8% sign up; 35% of sign-ups order a trial meal within 7 days; 40% of trial users subscribe; 70% of subscribers renew after month 1; 10% of subscribers refer someone. Calculate the numbers at each stage, find the weakest step, and estimate what happens to subscribers if trial→subscribe improves from 40% to 50%.

```answer Reveal a model answer
- Visitors: 40,000
- Sign-ups: 40,000 × 8% = **3,200**
- Activated (trial in 7 days): 3,200 × 35% = **1,120**
- Subscribed (revenue): 1,120 × 40% = **448**
- Retained (renew after month 1): 448 × 70% = **314**
- Referrers: 448 × 10% ≈ **45**

**Weakest step:** visitor → sign-up at 8% is low but typical for cold traffic; the most actionable product leak is **sign-up → trial (35%)**, meaning 2 in 3 people who sign up never try a meal. Trial → subscribe at 40% is moderate.

**If trial → subscribe goes to 50%:** 1,120 × 50% = **560** subscribers (+112, +25%); retained: 560 × 70% = **392** (+78).

A PM would compare that with the effort to improve sign-up → trial from 35% to 45% (→ 1,440 trials → 576 subscribers at 40%), which is an even bigger gain.
```

## Quiz

```quiz
Q: What does the “Activation” stage measure?
- [ ] How many people visit the website :: That’s acquisition.
- [x] Whether new users reach their first moment of real value :: Correct. E.g., first order within 7 days.
- [ ] Whether users pay :: That’s revenue.
- [ ] Whether users invite friends :: That’s referral.

Q: 50,000 users started checkout; 42,500 paid. What’s the conversion rate?
- [ ] 15% :: That’s the drop-off rate.
- [x] 85% :: Correct. 42,500 ÷ 50,000 = 0.85.
- [ ] 117% :: Conversion can’t exceed 100% for a later step.
- [ ] 42.5% :: That ignores the denominator.

Q: Why do many PMs check retention before acquisition?
- [ ] Acquisition is unimportant :: It matters, but not first.
- [x] Without retention, new users leak away, making acquisition spending wasteful :: Correct. A leaky bucket can’t be filled.
- [ ] Retention is easier to measure :: Not necessarily.
- [ ] Investors only care about retention :: Not the main reason.

Q: What makes a strong activation definition?
- [ ] “User opened the app” :: Too shallow; doesn’t reflect value.
- [x] A specific value action within a time window that predicts retention :: Correct.
- [ ] “User is engaged” :: Vague.
- [ ] “User has a profile photo” :: Unlikely to reflect core value.

Q: CAC is ₹800 and LTV is ₹500. What does this mean?
- [ ] The business is healthy :: The opposite.
- [x] Each new customer costs more to acquire than they bring in, so growth loses money :: Correct.
- [ ] Marketing should spend more :: That would increase losses.
- [ ] Nothing; these metrics don’t matter :: They’re key unit economics.

Q: When counting funnel steps, why count users instead of events?
- [ ] Events can’t be counted :: They can.
- [x] One user can trigger an event many times, inflating the numbers :: Correct. Funnels track the share of people progressing.
- [ ] Users are easier to query :: Not the reason.
- [ ] It doesn’t matter :: It matters a lot.
```

## Key takeaways

- **AARRR** = Acquisition, Activation, Retention, Referral, Revenue.
- **Conversion rate** = users at the next step ÷ users at this step; count **users, not events**.
- Define **activation** as a specific value action, within a time window, that **predicts retention**.
- Fix **retention and activation** before scaling acquisition; check **LTV vs. CAC**.
- Find the **leakiest stage**, then **zoom into its detailed funnel** and **segment**.
