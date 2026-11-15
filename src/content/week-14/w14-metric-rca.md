---
id: w14-metric-rca
title: Metric definition and root-cause questions
week: 14
estimatedMinutes: 15
tags: [interviews, metrics, execution]
---

## Why this matters for a PM

Execution rounds lean heavily on two question types: **“How would you measure success of X?”** and **“Metric Y dropped. Why?”**. They test whether you can define meaningful metrics and diagnose problems calmly with data. You learned the tools in Weeks 5–6; this lesson turns them into crisp interview answers.

## Core concepts

### Type 1: “How would you measure success of [feature/product]?”

**Structure:**
1. **Clarify** the feature and its purpose (who uses it, what job it does).
2. **State the goal** of the feature for users and the business.
3. **Map the user journey** through the feature (awareness → use → value → repeat).
4. **Pick a primary (North Star-style) metric** that captures value delivered by the feature.
5. **Add input/supporting metrics** across the journey (adoption, engagement, funnel steps, quality).
6. **Add guardrails** (what must not get worse).
7. **Explain trade-offs and measurement**: how you’d attribute impact (A/B test), time windows, segments.

**Good metric qualities (recap):** reflects value, measurable, sensitive to the feature, hard to game, time-bound, clearly defined.

**Example (summary):** “Success of Swiggy’s ‘Reorder’ button”
- Goal: help returning users get a familiar meal faster.
- Primary: % of returning users who place a reorder within 7 days (or reorder-driven orders per returning user per week).
- Supporting: button visibility → taps → checkout completion from reorder; time from app open to order for reorderers.
- Guardrails: discovery of new restaurants (share of orders from new-to-user restaurants), overall order frequency (cannibalisation check), AOV.
- Measurement: A/B test on returning users; segment by order frequency.

### Type 2: “Metric dropped. Why?” (root-cause analysis, RCA)

Use the Week 6 structure, compressed for interviews (15–20 minutes):
1. **Clarify** the metric, size, time frame, comparison, and whether it’s sudden or gradual.
2. **Check data validity** (tracking, pipeline, definition changes, partial data).
3. **Decompose** with a metric tree (e.g., orders = users × conversion × frequency).
4. **Segment** (platform, version, geography, user type, channel, funnel step, time of day).
5. **Internal changes** (releases, experiments, pricing, marketing, outages, partners).
6. **External factors** (seasonality, festivals, weather, cricket, competitors, regulation, ecosystem outages like UPI downtime).
7. **Hypotheses** ranked with tests.
8. **Action and communication.**

**Pro tips for interviews:**
- Say the **structure first**, then go step by step; the interviewer will reveal data as you ask.
- **Ask for data** specifically: “Is the drop across all platforms or one?” Interviewers often have answers ready.
- **Use the answers** to narrow quickly; don’t keep asking generic questions once you’ve found the segment.
- **Close the loop** with an action plan.

### Type 3: Trade-off metric questions (preview of next lesson)

“Metric A went up and metric B went down after a launch. Ship or not?” Requires weighing metrics against goals and long-term value.

### Type 4: “Define the North Star for [product]” (Week 5)

Value moment → candidate metrics → choose → inputs → guardrails.

## Worked example

**Prompt:** “Instagram-style Reels watch time in India dropped 8% week over week. What happened?”
(Interview simulation; interviewer answers in italics.)

1. **Clarify:** total watch time or per user? *Total.* Sudden or gradual? *Sudden, starting Tuesday.* Compared with the previous Tuesday? *Yes, −8%.*
2. **Data check:** any logging changes or app releases Monday/Tuesday? *A new Android version rolled out Monday to 50%.* Do other metrics (sessions, DAU) show a drop? *DAU is flat; sessions per user flat.*
3. **Decompose:** total watch time = DAU × sessions per user × Reels views per session × watch time per view. DAU and sessions flat → it’s in views per session or time per view. *Views per session down 9%; time per view flat.*
4. **Segment:** platform? *Only Android.* Version? *Only the new version.*
5. **Internal change:** what changed in that version? *A redesigned feed that shows Reels lower on the home screen.*
6. **Hypothesis:** the redesign reduced Reels entry points, lowering views per session. Test: compare views per session for new vs. old version users; check entry-point clicks to Reels.
7. **External check:** nothing unusual (no major event, iOS unaffected).
8. **Action:** pause the rollout at 50%; review whether the redesign was an experiment and how its goal metric did; weigh Reels watch time against the redesign’s intended benefit (e.g., more posts from friends viewed); decide with the experiment owner; communicate findings.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 240" role="img" aria-labelledby="rca-t rca-d">
<title id="rca-t">Decomposing a metric drop</title>
<desc id="rca-d">Total watch time breaks into daily active users times sessions per user times views per session times time per view; flat branches are marked and the dropping branch is highlighted and segmented to one platform and version.</desc>
<rect x="210" y="14" width="220" height="38" rx="8" class="d-pink d-ink" stroke-width="2"/>
<text x="224" y="38" class="d-text-dark" font-weight="700" font-size="12">Total watch time −8%</text>
<g class="d-ink" stroke-width="2"><line x1="320" y1="52" x2="80" y2="84"/><line x1="320" y1="52" x2="240" y2="84"/><line x1="320" y1="52" x2="400" y2="84"/><line x1="320" y1="52" x2="560" y2="84"/><line x1="400" y1="122" x2="400" y2="152"/></g>
<g font-size="11">
<rect x="20" y="84" width="120" height="38" rx="8" class="d-mint d-ink" stroke-width="2"/><text x="30" y="108" class="d-text-dark">DAU · flat</text>
<rect x="180" y="84" width="120" height="38" rx="8" class="d-mint d-ink" stroke-width="2"/><text x="190" y="108" class="d-text-dark">Sessions/user · flat</text>
<rect x="340" y="84" width="120" height="38" rx="8" class="d-pink d-ink" stroke-width="3"/><text x="350" y="108" class="d-text-dark" font-weight="700">Views/session −9%</text>
<rect x="500" y="84" width="120" height="38" rx="8" class="d-mint d-ink" stroke-width="2"/><text x="510" y="108" class="d-text-dark">Time/view · flat</text>
<rect x="300" y="152" width="200" height="56" rx="8" class="d-butter d-ink" stroke-width="2"/><text x="312" y="174" class="d-text-dark" font-weight="700">Segment: Android only,</text><text x="312" y="192" class="d-text-dark">new version only → redesign</text>
</g>
<text x="20" y="230" class="d-text" font-size="11">Decompose → find the moving branch → segment it → match to a change.</text>
</svg>
<figcaption>Decomposition narrows the search fast; segmentation points to the cause.</figcaption>
</figure>

## Step by step

Practising execution questions this week:

1. **Pick 3 “measure success” and 3 “metric dropped” questions** from Interview Prep.
2. **For measure-success:** write goal → journey → primary → supporting → guardrails → measurement.
3. **For RCA:** write your opening structure and the decomposition for each product.
4. **Run mocks** where your partner holds a hidden “answer” and reveals data only when asked.
5. **Time yourself** (15–20 minutes).
6. **Log** each mock with scores.

## Common mistakes

1. **Vanity metrics** as success measures (downloads, page views).
2. **One metric only**, no guardrails.
3. **Jumping to causes** in RCA without checking data validity.
4. **Asking for data aimlessly** instead of following a decomposition.
5. **No action plan** at the end.
6. **Ignoring attribution** (how you know the feature caused the change).

## How it shows up in interviews

> [!INTERVIEW]
> **“How would you measure the success of Google Pay’s ‘Split bill’ feature?”**
> Outline: goal (easy settling among friends; acquisition through requests) → journey (create split → requests sent → paid) → primary: % of split requests fully paid within 48 hours → supporting: splits created per active user, request acceptance rate, new users acquired via split requests → guardrails: payment failure rate, request spam reports.

> [!INTERVIEW]
> **“Uber Eats-style orders dropped 15% in one city yesterday. Walk me through it.”**
> Outline: clarify → data check → decompose (users × conversion × frequency; supply side: restaurants online, riders available) → segment (zone, time, platform) → internal (pricing, app release, outage) → external (rain, festival, strike, cricket final) → hypotheses → action.

## Practice exercise

**Task (30 minutes):** (1) Define success metrics for **Zepto’s “scheduled delivery for tomorrow morning”** feature. (2) Outline your RCA approach for “**Zomato restaurant partner app: menu updates by restaurants dropped 30% this week**”.

```answer Reveal a model answer
**(1) Scheduled delivery success**
- Goal: recover late-night demand when instant delivery isn’t possible; serve planners.
- Journey: see option → choose slot → pay → delivered on time.
- Primary: scheduled orders delivered on time per week (or share of late-night sessions converting to scheduled orders).
- Supporting: option visibility rate; slot selection → payment conversion; repeat scheduled orders.
- Guardrails: on-time rate for morning slots ≥ 95%; next-morning instant orders not cannibalised beyond X%; cancellation rate.
- Measurement: A/B test showing the option to 50% of late-night sessions.

**(2) RCA: menu updates −30%**
- Clarify: count of menu edits per active restaurant? sudden or gradual? since when?
- Data check: was the `menu_updated` event changed or moved server-side? partial data?
- Decompose: updates = active restaurants × % updating × updates per updating restaurant.
- Segment: city, restaurant size, app version, web vs. app.
- Internal: new menu editor release? bulk-upload tool broken? login issues? policy change requiring approval for edits?
- External: festival week (menus fixed), regional strike, a holiday.
- Hypotheses ranked with tests (e.g., new editor bug in app version 5.2 for Android → check error logs and version split).
- Action: fix/rollback, communicate to restaurants, monitor.
```

## Quiz

```quiz
Q: What should come first when asked to measure a feature’s success?
- [ ] A list of every possible metric :: Unfocused: without a goal, metrics can’t be prioritised.
- [x] Clarifying the feature’s goal for users and the business :: Correct. Metrics follow goals.
- [ ] Choosing an A/B testing tool :: Too early: tools come after defining what to measure.
- [ ] The guardrails :: Guardrails come after the primary metric.

Q: Which is the best primary metric for a “reorder” button?
- [ ] Number of button impressions :: Exposure, not value.
- [x] Share of returning users who place a reorder within 7 days :: Correct. Reflects the value delivered.
- [ ] App downloads :: Unrelated to the feature.
- [ ] Time spent on the home screen :: Could rise for bad reasons.

Q: In RCA, total watch time = DAU × sessions/user × views/session × time/view. Only views/session dropped. What next?
- [ ] Investigate DAU :: DAU was flat.
- [x] Segment views/session by platform, version and entry point to find where it fell :: Correct. Segmentation points to the cause.
- [ ] Declare a competitor caused it :: No evidence yet.
- [ ] Stop the analysis :: You’ve only narrowed it down.

Q: Why add guardrails to a success metric set?
- [ ] To have more numbers :: Not the goal.
- [x] To catch harmful side effects, like cannibalising other orders or reducing discovery :: Correct. Wins shouldn’t hide hidden losses.
- [ ] Interviewers ignore them :: They often probe guardrails.
- [ ] To replace the primary metric :: They complement it.

Q: How should you handle data in an interview RCA?
- [ ] Assume no data exists :: Interviewers usually have data to share.
- [x] Ask targeted questions following your decomposition and use answers to narrow quickly :: Correct. Structured questions find the cause fast.
- [ ] Ask every possible question at once :: Unfocused: it shows no hypothesis-driven thinking.
- [ ] Refuse to proceed without full data :: Unrealistic: PMs reason with partial data all the time.

Q: How do you show a feature caused a metric change?
- [ ] Compare this month with last month only :: Confounded by other changes.
- [x] Use an A/B test or a controlled comparison :: Correct. Randomisation isolates the feature’s effect.
- [ ] Ask users if it helped :: Useful context, but not causal proof.
- [ ] Assume it did :: Not evidence.
```

## Key takeaways

- **Measure success:** goal → journey → **primary metric** → supporting metrics → **guardrails** → attribution (A/B).
- **RCA:** clarify → data check → **decompose** → **segment** → internal → external → hypotheses → action.
- Ask **targeted data questions** guided by your decomposition.
- Avoid **vanity metrics**; always include **guardrails**.
- End every RCA with an **action and communication plan**.
