---
id: w6-metric-drop
title: Root-causing a metric drop
week: 6
estimatedMinutes: 16
tags: [analytics, diagnosis, interviews]
---

## Why this matters for a PM

“DAU dropped 10% yesterday. What do you do?” is one of the most common PM interview questions, and a real Monday-morning situation. Panicked teams guess and ship fixes for the wrong cause. Good PMs follow a calm, structured process. This lesson is your Week 6 checkpoint and the core of your P2 diagnosis of a 15% activation drop.

## Core concepts

### The structured approach

Work from **cheap, likely explanations to expensive, unlikely ones**, and from **is the data right?** to **what changed?** to **why?**

**Step 1: Clarify the metric and the drop.**
- Exactly which metric? How is it defined? (DAU of what: app opens, logged-in users, ordering users?)
- How big is the drop, compared with what? (Yesterday vs. the day before? vs. same day last week?)
- Is it sudden (a step down) or gradual (a slope)? Sudden drops usually mean a specific event; gradual ones mean slow shifts.
- Is it outside normal variation? A 3% daily wobble may be normal; 10% often isn’t.

**Step 2: Check the data (is it real?).**
- **Tracking or pipeline issues:** did an app release break an event? Did a data job fail or arrive late? Did a dashboard definition change?
- **Compare with other sources:** if DAU dropped but orders and revenue (server-side) didn’t, suspect tracking.
- **Check for partial data:** is yesterday’s data complete?

A surprising number of “drops” are tracking bugs. Rule this out first.

**Step 3: Segment (where is it?).**
Break the metric down by:
- **Platform** (Android/iOS/web) and **app version**
- **Geography** (city, state)
- **User type** (new vs. returning; free vs. premium)
- **Acquisition channel**
- **Funnel step** (which step lost users?)
- **Time of day**

If the drop is concentrated in one segment (e.g., Android version 7.4 only), you’ve almost found it. If it’s evenly spread, look for a broad cause (external event, seasonality, a sitewide change).

**Step 4: Look for what changed (internal).**
- Releases, feature flags, experiments started or stopped.
- Pricing, fees, offers or coupons changed.
- Marketing campaigns paused (paid traffic dropped).
- Infrastructure incidents, outages, slow pages.
- Notification or email changes (sending fewer notifications reduces app opens).
- Changes by partners (restaurants, payment gateways, banks).

**Step 5: Look for what changed (external).**
- **Seasonality and events:** festivals (Diwali, Eid, Holi), long weekends, exam season, cricket matches (big IPL or India games change food and app usage), weather (heavy rain in Bengaluru or Mumbai).
- **Competitors:** a big promotion by a competitor.
- **Platform changes:** an app store policy change, an OS update, a Google algorithm change affecting SEO.
- **Regulation or news:** e.g., an RBI rule affecting payments; negative press.
- **Ecosystem outages:** UPI or bank downtime.

**Step 6: Form and rank hypotheses.**
List 3–5 hypotheses. Rank them by **likelihood** (fits the evidence: timing and segments) and **impact**. For each, write the data that would confirm or reject it.

**Step 7: Act and communicate.**
- If it’s a bug: roll back or hotfix; estimate impact; postmortem.
- If it’s external: decide whether to respond (e.g., counter-promotion) or wait.
- Communicate early with a short update: what we know, what we don’t, next update time.

### Decomposing the metric

Use the metric tree (Week 5): DAU = new users + returning users. Orders = users × conversion × frequency. Which branch moved? This often halves the search space in minutes.

### Internal vs. external, one quick test

If **competitors or the whole category** show the same pattern (e.g., Google Trends, public data, industry chatter), suspect external. If **only you** dropped, or only one platform/version did, suspect internal.

## Worked example

**Prompt:** “Swiggy’s DAU dropped 10% yesterday (Tuesday). What do you do?”

1. **Clarify:** DAU = unique users who opened the app. Compared with last Tuesday it’s −10%; vs. Monday −12%. Sudden step. Normal Tuesday variation is ±3%. Real anomaly.
2. **Check data:** Server-side orders are down only 2%. Interesting: opens fell more than orders. Event pipeline healthy; data complete. Possibly a client tracking issue, or fewer casual opens.
3. **Segment:** The drop is almost entirely **Android**, **app version 9.12**, released Monday night. iOS flat. All cities affected similarly.
4. **What changed internally:** Version 9.12 changed the analytics SDK initialisation to speed up app start.
5. **Hypotheses (ranked):**
   - H1 (most likely): 9.12 fires `app_opened` only on cold starts, not when resuming from background → under-counting. Test: compare 9.12 vs. 9.11 events per session; check server-side session logs.
   - H2: 9.12 crashes on some devices → fewer real opens. Test: crash-free rate by version.
   - H3: A notification campaign was paused Monday → fewer opens. Test: notification sends by day.
6. **Result:** H1 confirmed: the event no longer fires on resume. Real usage barely changed (orders −2% is within normal range).
7. **Action:** hotfix the tracking; annotate dashboards; backfill or flag the affected days; add an automated check comparing client opens with server sessions.

**What an interviewer listens for:** you clarified, checked data before theories, segmented systematically, considered internal and external causes, ranked hypotheses with tests, and ended with action and communication.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 260" role="img" aria-labelledby="md-t md-d">
<title id="md-t">Metric drop investigation flow</title>
<desc id="md-d">Six steps in sequence: clarify, check data, segment, internal changes, external factors, hypotheses and action.</desc>
<defs><marker id="md-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<g font-size="12">
<rect x="20" y="20" width="180" height="56" rx="10" class="d-lavender d-ink" stroke-width="2"/><text x="34" y="44" class="d-text-dark" font-weight="700">1. Clarify</text><text x="34" y="62" class="d-text-dark" font-size="11">which metric, how big, vs. what</text>
<rect x="230" y="20" width="180" height="56" rx="10" class="d-pink d-ink" stroke-width="2"/><text x="244" y="44" class="d-text-dark" font-weight="700">2. Is the data right?</text><text x="244" y="62" class="d-text-dark" font-size="11">tracking, pipeline, partial day</text>
<rect x="440" y="20" width="180" height="56" rx="10" class="d-sky d-ink" stroke-width="2"/><text x="454" y="44" class="d-text-dark" font-weight="700">3. Segment</text><text x="454" y="62" class="d-text-dark" font-size="11">platform, version, city, user type</text>
<rect x="440" y="110" width="180" height="56" rx="10" class="d-butter d-ink" stroke-width="2"/><text x="454" y="134" class="d-text-dark" font-weight="700">4. Internal changes</text><text x="454" y="152" class="d-text-dark" font-size="11">releases, pricing, campaigns</text>
<rect x="230" y="110" width="180" height="56" rx="10" class="d-peach d-ink" stroke-width="2"/><text x="244" y="134" class="d-text-dark" font-weight="700">5. External factors</text><text x="244" y="152" class="d-text-dark" font-size="11">festivals, rain, competitors</text>
<rect x="20" y="110" width="180" height="56" rx="10" class="d-mint d-ink" stroke-width="2"/><text x="34" y="134" class="d-text-dark" font-weight="700">6. Hypotheses → act</text><text x="34" y="152" class="d-text-dark" font-size="11">rank, test, fix, communicate</text>
</g>
<g class="d-ink" stroke-width="2"><line x1="202" y1="48" x2="226" y2="48" marker-end="url(#md-a)"/><line x1="412" y1="48" x2="436" y2="48" marker-end="url(#md-a)"/><line x1="530" y1="78" x2="530" y2="106" marker-end="url(#md-a)"/><line x1="438" y1="138" x2="414" y2="138" marker-end="url(#md-a)"/><line x1="228" y1="138" x2="204" y2="138" marker-end="url(#md-a)"/></g>
<text x="40" y="210" class="d-text" font-size="12">Data check comes before theories: many “drops” are tracking bugs.</text>
<text x="40" y="232" class="d-text" font-size="12">Concentrated in one segment → internal cause likely. Everywhere at once → broad or external.</text>
</svg>
<figcaption>Calm, cheap-to-expensive, data-before-theory. This is the structure interviewers expect.</figcaption>
</figure>

## Step by step

Your P2 diagnosis of a made-up **15% activation drop**:

1. **Define activation** (e.g., first order within 7 days) and describe the drop (sudden/gradual, since when).
2. **List data checks** you’d run (tracking for `order_placed` with `is_first_order`, pipeline, definition changes).
3. **List segments** to cut (platform, version, city, channel, sign-up method, funnel step).
4. **Brainstorm causes**: internal (onboarding change, OTP provider issue, new KYC rule, coupon change, serviceability changes) and external (festival, competitor offer, OS update).
5. **Pick 4 hypotheses** and rank them, with your reasoning.
6. **Write a query for each** (SQL Playground style), showing what result would confirm it.
7. **Write the action plan** for the most likely cause, and a 5-line stakeholder update.
8. **Practise the checkpoint**: answer “DAU dropped 10% yesterday” aloud in 8 minutes using the six steps.

## Common mistakes

1. **Jumping to a cause** (“it’s the competitor!”) before checking data.
2. **Not asking what the metric means** and what it’s compared with.
3. **Segmenting randomly** instead of systematically.
4. **Ignoring external factors** like festivals, weather and cricket in India.
5. **Listing hypotheses without tests.**
6. **Forgetting communication**: leadership wants a quick, honest update, not silence until you know everything.

## How it shows up in interviews

> [!INTERVIEW]
> **“DAU dropped 10% yesterday. What do you do?”** (8 minutes)
> Outline: clarify (definition, comparison, sudden vs. gradual, normal variance) → check data validity → segment (platform, version, geo, new/returning, funnel) → internal changes → external factors → 3–4 ranked hypotheses with tests → action and communication. Say your structure first, then walk it.

> [!INTERVIEW]
> **“Orders are down 5% week over week, but revenue is up. What’s happening?”**
> Outline: decompose revenue = orders × AOV (× take rate) → AOV or take rate rose → check pricing/fee changes, mix shift to bigger orders, fewer small orders (minimum order changes) → decide if it’s good or bad (guardrails: retention, complaints).

## Practice exercise

**Task (40 minutes):** Write your P2 activation-drop diagnosis: *“First-order activation (first order within 7 days of sign-up) fell from 32% to 27% (−15%) starting last Thursday.”* Give 4 ranked hypotheses, each with a check and a SQL query or analytics step.

````answer Reveal a model answer
**Clarify:** sudden drop starting Thursday; affects sign-ups from Thursday onward (7-day window means recent cohorts are incomplete, so compare 3-day activation too).

**Data checks:** `order_placed.is_first_order` still populated on all platforms? Any change to the activation query or sign-up event? Sign-up counts normal?

**Hypotheses (ranked)**
1. **OTP/sign-up flow change creates low-quality sign-ups** (e.g., a new “continue with Google” option brings curious browsers). Check: activation by `signup_method` before/after Thursday.
2. **Serviceability / location issue**: new users in areas we don’t deliver to. Check: % of new users with `location_set.serviceable = false` by day.
3. **First-order coupon change** (e.g., ₹100 off reduced to ₹50 on Thursday). Check: activation by date vs. coupon config; first-order checkout drop-off.
4. **Android release with a checkout bug.** Check: activation by platform and app version; payment failure rate for first orders.

**Example query (playground-style) for a version/platform cut:**
```sql
SELECT u.platform,
       CASE WHEN u.signup_date >= '2025-05-15' THEN 'after' ELSE 'before' END AS period,
       COUNT(*) AS signups,
       ROUND(100.0 * AVG(CASE WHEN f.first_ts IS NOT NULL
                               AND julianday(f.first_ts) - julianday(u.signup_date) <= 3
                              THEN 1 ELSE 0 END), 1) AS activated_3d_pct
FROM users u
LEFT JOIN (SELECT user_id, MIN(order_ts) AS first_ts FROM orders GROUP BY user_id) f
  ON f.user_id = u.user_id
WHERE u.signup_date >= '2025-05-01'
GROUP BY u.platform, period
ORDER BY u.platform, period;
```

**Action:** if H1 is confirmed, keep Google sign-in but add an address/serviceability step before account creation, and change the activation metric to exclude non-serviceable users from the target. Communicate: “Activation dropped 15% from Thursday; early evidence points to a new sign-up method bringing in lower-intent users; next update by 4 p.m. tomorrow.”
````

## Quiz

```quiz
Q: DAU dropped 12% but server-side orders are flat. What should you suspect first?
- [ ] A competitor stole users :: Orders would usually fall too.
- [x] A tracking or client-event issue :: Correct. Check data validity before theories.
- [ ] Users ordered more per session :: Possible but less likely to explain a 12% open drop.
- [ ] A festival :: Would likely affect orders too.

Q: The drop is concentrated in Android app version 8.3 only. What’s most likely?
- [ ] An external event like rain :: External events affect all platforms.
- [x] Something in the 8.3 release (a bug or tracking change) :: Correct. Concentration in one segment points to an internal cause.
- [ ] Seasonality :: Would affect all versions.
- [ ] Competitor promotion :: Would affect all versions.

Q: Which is the best first step when told “DAU dropped 10%”?
- [ ] Announce a rollback :: Too early: you don’t yet know whether the drop is real or what caused it.
- [x] Clarify the metric definition, comparison period and whether it’s outside normal variation :: Correct. You can’t diagnose a drop until you know exactly what dropped and whether it’s unusual.
- [ ] Email all users :: Not appropriate.
- [ ] Blame marketing :: Not structured.

Q: Orders are down 5% WoW but revenue is up 3%. What does the metric tree suggest?
- [ ] Revenue data is wrong :: Possible, but there’s a simpler explanation.
- [x] Average order value or take rate increased :: Correct. Revenue = orders × AOV (× take rate).
- [ ] More users joined :: Doesn’t explain fewer orders.
- [ ] Nothing changed :: Something clearly did.

Q: Why consider cricket matches when diagnosing a food app metric in India?
- [ ] It’s a fun fact :: It’s a real driver.
- [x] Big matches change when and how much people order and use apps :: Correct. External events affect behaviour.
- [ ] Cricket apps share data with food apps :: Not relevant.
- [ ] Matches cause app crashes :: Not generally.

Q: What makes a hypothesis useful in a metric-drop investigation?
- [ ] It sounds plausible :: Plausibility isn’t enough.
- [x] It fits the timing and segment evidence and has a clear test to confirm or reject it :: Correct. Testable hypotheses that match the evidence let you converge quickly.
- [ ] It blames another team :: Not useful: blame doesn’t help you test or fix anything.
- [ ] It requires a big experiment :: Prefer quick data checks first.
```

## Key takeaways

- Follow a structure: **clarify → check data → segment → internal changes → external factors → hypotheses → act and communicate**.
- **Check data validity first**; many drops are tracking bugs.
- **Segment systematically**; concentrated drops point to internal causes, broad ones to external causes.
- Use the **metric tree** to see which branch moved.
- Rank **testable hypotheses** and send **early, honest updates**.
