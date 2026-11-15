---
id: w6-dashboards
title: Dashboards
week: 6
estimatedMinutes: 13
tags: [analytics, dashboards, data-viz]
---

## Why this matters for a PM

A dashboard is how a team sees the health of its product every day. A good one answers “Are we OK? Where should we look?” in 30 seconds. A bad one has 40 charts that nobody reads. PMs usually design their team’s dashboards, and your P2 deliverable includes one built in Mixpanel, PostHog or Amplitude.

## Core concepts

### What a dashboard is for

A **dashboard** is a collection of charts and numbers that monitors key metrics over time. Different dashboards serve different purposes:

- **Health / monitoring dashboard:** daily check of the North Star, inputs and guardrails. Answers “Is anything broken or unusual?”
- **Feature dashboard:** tracks adoption and success of one feature after launch.
- **Funnel / diagnostic dashboard:** helps investigate where users drop off.
- **Executive dashboard:** a few high-level metrics and trends for leadership.

One dashboard can’t do everything. Decide its audience and question first.

### The layout that works

Readers scan top-left to bottom-right. A good structure:

1. **Top row: the headline numbers.** North Star and 2–4 inputs, each with the current value, the change vs. the previous period, and a small trend line.
2. **Second row: trends.** Line charts of the key metrics over time (daily or weekly), with a comparison period.
3. **Third row: breakdowns.** Funnel and segment splits (platform, city, new vs. returning).
4. **Bottom: guardrails and diagnostics.** Errors, cancellations, payment failures, support tickets.

Keep it to **6–12 charts**. If someone needs more, link to a diagnostic dashboard.

### Choosing the right chart

| Question | Chart |
|---|---|
| How is it changing over time? | Line chart |
| How do categories compare? | Bar chart (horizontal if labels are long) |
| Where do people drop off? | Funnel chart |
| Do users come back? | Retention curve or cohort table |
| What’s the current value vs. target? | Big number (KPI tile) with comparison |
| What makes up the total? | Stacked bar (avoid pie charts with many slices) |

### Comparisons make numbers meaningful

“Orders: 12,400” means nothing alone. Add:
- **vs. previous period** (yesterday, last week): “+3.2% WoW” (week over week).
- **vs. same period last year** (for seasonal businesses), or same day last week (to handle weekly patterns: Fridays always beat Tuesdays in food delivery).
- **vs. target**: “82% of weekly goal”.

### Definitions and trust

Every chart should have a clear, documented definition: what’s counted, filters, time zone, and data source. If two dashboards show different “active users”, people stop trusting both. Add a short description to each chart and link to the tracking plan.

### Common chart traps

- **Truncated y-axis** that makes small changes look dramatic. Start bar charts at zero; be careful with line charts.
- **Too many lines** on one chart (more than 4–5 becomes spaghetti).
- **Mixed time grains** (daily next to monthly) without labels.
- **Cumulative charts** that always go up and hide slowdowns.
- **Averages hiding distribution**: average delivery time can stay at 32 minutes while the share of very late orders doubles. Show percentiles (p50, p90) too.
- **Incomplete periods**: today’s partial data looks like a crash. Exclude or label the current incomplete day.

### Alerts

For critical metrics, dashboards aren’t enough; nobody watches them all day. Set **alerts**: automatic notifications when a metric crosses a threshold or deviates from its normal range (e.g., payment failure rate > 3% for 15 minutes).

## Worked example

**Health dashboard for a quick-commerce app (Zepto-like), audience: the product team, checked every morning.**

Row 1, KPI tiles (yesterday vs. same day last week):
- Orders delivered: 182,400 (+4.1%)
- Active ordering households (weekly): 1.21M (+1.8%)
- On-time delivery rate: 91.2% (−1.6 pts) ⚠️
- Orders with a missing item: 3.4% (+0.3 pts)

Row 2, trends (last 8 weeks, daily): orders; on-time rate; average order value.

Row 3, breakdowns: checkout funnel (app open → cart → checkout → paid) by platform; orders by city (top 8); new vs. returning orders.

Row 4, guardrails: payment failure rate; cancellation rate; app crash-free sessions; support tickets per 1,000 orders.

**Using it:** The on-time tile is down 1.6 points. The city breakdown shows it’s concentrated in Bengaluru; the trend shows it started Tuesday. That points the team to a local cause (rain, a dark store issue, rider supply), not a product bug. Total time to spot it: under a minute.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 290" role="img" aria-labelledby="db-t db-d">
<title id="db-t">Dashboard layout</title>
<desc id="db-d">A wireframe dashboard: four KPI tiles on top, two trend charts in the middle, funnel and segment charts below, guardrails at the bottom.</desc>
<rect x="10" y="10" width="620" height="270" rx="10" class="d-surface d-ink" stroke-width="2"/>
<g class="d-ink" stroke-width="2">
<rect x="25" y="25" width="140" height="55" rx="8" class="d-butter"/><rect x="175" y="25" width="140" height="55" rx="8" class="d-butter"/><rect x="325" y="25" width="140" height="55" rx="8" class="d-butter"/><rect x="475" y="25" width="140" height="55" rx="8" class="d-pink"/>
<rect x="25" y="92" width="290" height="80" rx="8" class="d-sky"/><rect x="325" y="92" width="290" height="80" rx="8" class="d-sky"/>
<rect x="25" y="184" width="290" height="50" rx="8" class="d-lavender"/><rect x="325" y="184" width="290" height="50" rx="8" class="d-lavender"/>
<rect x="25" y="244" width="590" height="26" rx="8" class="d-mint"/>
</g>
<text x="37" y="48" class="d-text-dark" font-size="11" font-weight="700">North Star</text><text x="37" y="68" class="d-text-dark" font-size="11">182k ▲4.1%</text>
<text x="187" y="48" class="d-text-dark" font-size="11" font-weight="700">Input 1</text>
<text x="337" y="48" class="d-text-dark" font-size="11" font-weight="700">Input 2</text>
<text x="487" y="48" class="d-text-dark" font-size="11" font-weight="700">On-time ▼1.6</text>
<polyline points="40,160 80,140 120,150 160,125 200,130 240,112 290,118" fill="none" class="d-ink" stroke-width="2"/>
<polyline points="340,120 380,125 420,118 460,130 500,128 540,145 590,150" fill="none" class="d-ink" stroke-width="2"/>
<text x="37" y="212" class="d-text-dark" font-size="11" font-weight="700">Funnel by platform</text>
<text x="337" y="212" class="d-text-dark" font-size="11" font-weight="700">Orders by city</text>
<text x="37" y="262" class="d-text-dark" font-size="11" font-weight="700">Guardrails: payment failures · cancellations · crashes · tickets</text>
</svg>
<figcaption>Headline numbers → trends → breakdowns → guardrails. Six to twelve charts, each with a comparison.</figcaption>
</figure>

## Step by step

Building your P2 dashboard:

1. **Name the audience and question** in the dashboard description.
2. **Pick 3–5 headline metrics** (North Star, inputs, one key guardrail).
3. **Add comparisons** (vs. last week or same day last week).
4. **Add 2–3 trend charts** with consistent time grain.
5. **Add a funnel** for the key flow and **1–2 segment breakdowns**.
6. **Add guardrails** at the bottom.
7. **Write a definition** under each chart.
8. **Check for traps**: y-axis, incomplete periods, averages vs. percentiles.
9. **Set one alert** on the most critical guardrail (if the tool allows on the free plan).
10. **Screenshot it** and write 3 bullets: what it shows today and what you’d investigate.

## Common mistakes

1. **No clear audience**, so the dashboard tries to serve everyone and serves no one.
2. **Too many charts.** Nobody reads chart 27.
3. **Numbers without comparisons.**
4. **Undefined metrics** that differ from other dashboards.
5. **Vanity metrics on top** (total sign-ups ever).
6. **Relying on someone looking** instead of setting alerts.

## How it shows up in interviews

> [!INTERVIEW]
> **“What would you put on a dashboard for [product]?”**
> Outline: audience and purpose → North Star + inputs as headline tiles with comparisons → trends → funnel and segment breakdowns → guardrails → alerts. Mention keeping it to ~10 charts and defining metrics.

> [!INTERVIEW]
> **“Average delivery time is stable, but complaints about late deliveries doubled. How?”**
> Outline: averages hide distribution → check p90/p95 and % orders over 45 min → segment by city/time → maybe a subset got much worse while others got faster.

## Practice exercise

**Task (25 minutes):** Design (on paper or in Miro) a dashboard for **PhonePe’s bill payments team**. List the audience, the 4 KPI tiles with comparisons, 3 trend charts, 2 breakdowns, 3 guardrails and 1 alert with a threshold.

```answer Reveal a model answer
- **Audience:** bill payments product team, daily stand-up check.
- **KPI tiles (vs. same day last week):** successful bill payments; monthly bill-paying users (MTD); bill payment success rate; % of reminders converted to payments.
- **Trends (daily, 8 weeks):** successful payments; success rate; average bill amount.
- **Breakdowns:** payments by biller category (electricity, mobile, broadband, credit card); funnel (biller selected → amount fetched → payment initiated → success) by platform.
- **Guardrails:** payment failure rate by error code; refund/dispute rate; support tickets per 1,000 payments.
- **Alert:** if success rate for any top-10 biller drops below 95% for 15 minutes, notify the on-call engineer and PM in Slack.
```

## Quiz

```quiz
Q: What should a dashboard’s top row usually show?
- [ ] Every event tracked :: Far too much.
- [x] The few headline metrics (North Star and key inputs) with comparisons :: Correct. Readers should know “are we OK?” within seconds.
- [ ] A pie chart of all cities :: Not a headline view.
- [ ] Raw event logs :: Not suitable for a dashboard.

Q: Why compare today with the same day last week rather than yesterday?
- [ ] It’s always more accurate :: Not always; it depends on patterns.
- [x] It removes weekly patterns, like Fridays being busier than Tuesdays :: Correct. Comparing like-for-like days avoids false alarms from normal weekly rhythm.
- [ ] Yesterday’s data is never available :: It usually is.
- [ ] Analytics tools require it :: Tools don’t require it; comparing like-for-like days is about accuracy.

Q: Average delivery time is flat, but late-delivery complaints doubled. What should you add to the dashboard?
- [ ] More averages :: Averages hide the problem.
- [x] Percentiles (p90) and % of orders over a lateness threshold :: Correct. Distribution reveals what averages hide.
- [ ] Total orders ever :: Unrelated: a cumulative total hides the distribution problem.
- [ ] A pie chart of complaints :: Not the best first step.

Q: Which chart best shows where users drop off in checkout?
- [ ] Pie chart :: Not for sequential steps.
- [x] Funnel chart :: Correct. It shows each step and the drop between them in sequence.
- [ ] Scatter plot :: Not for steps.
- [ ] Cumulative line chart :: Hides step drop-off.

Q: Today’s orders on the dashboard look 60% lower than yesterday at 11 a.m. What’s the likely issue?
- [ ] A huge outage :: Possible, but check the obvious first.
- [x] Today is an incomplete period being compared with a full day :: Correct. Label or exclude incomplete periods.
- [ ] The tracking plan is wrong :: Less likely than the partial-day effect.
- [ ] Users stopped ordering forever :: Unlikely: a partial day explains the gap far better.
```

## Key takeaways

- Start with **audience and question**; one dashboard can’t serve every purpose.
- Layout: **headline KPIs → trends → breakdowns → guardrails**, 6–12 charts.
- Every number needs a **comparison** (previous period, same day last week, target).
- **Define every metric**; watch for axis tricks, averages hiding distribution and **incomplete periods**.
- Use **alerts** for critical guardrails; dashboards alone don’t catch problems in time.
