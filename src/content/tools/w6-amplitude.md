---
id: w6-amplitude
title: "Amplitude: rebuild your charts in a second tool"
week: 6
estimatedMinutes: 8
tags: [tool, amplitude, analytics]
---

## What it is

**Amplitude** is a widely used product analytics platform, similar in purpose to Mixpanel: event-based charts, funnels, retention, cohorts and dashboards. It has a free **Starter** plan and offers a demo environment for exploring.

## Why PMs use it

Many large Indian consumer and SaaS companies use Amplitude. Rebuilding the same analyses in a second tool proves the concepts are yours, not tool-specific button-clicking, and lets you honestly say you’ve used both on your resume.

## Account setup (free plan)

1. Go to amplitude.com → **Get started** / **Sign up free**.
2. Sign up with Google. Choose the free plan.
3. Look for a **demo** or **sample data** project in onboarding (Amplitude typically offers an example dataset for exploring). If none is available, Amplitude’s documentation provides ways to load sample data; otherwise use your Mixpanel/PostHog work and focus this session on learning Amplitude’s chart types.

## Walkthrough: three charts in Amplitude

### 1. Segmentation chart (trend)
1. Click **Create** → **Chart** → **Segmentation**.
2. Pick an event (e.g., a purchase-type event). Choose **Uniques** (unique users).
3. Set the time range to the last 30 days, daily.
4. Add a **segment** (e.g., platform = iOS vs. Android) or a **group-by** property.
5. Save as “Daily purchasers by platform”.

### 2. Funnel analysis
1. **Create → Chart → Funnel Analysis**.
2. Add the same 3–5 steps you used in Mixpanel.
3. Set the conversion window. Compare the numbers with your Mixpanel funnel; note any differences and why (window, counting method, data).
4. Use **Breakdown by** to find the weakest segment.

### 3. Retention analysis
1. **Create → Chart → Retention Analysis**.
2. Start event: sign-up or first purchase. Return event: any purchase.
3. Choose **N-day** or **unbounded** (Amplitude may call these “Return on” and “Return on or after”).
4. Switch between the two and notice how the curve changes. Write one line on which you’d use for a food-ordering product and why.

### 4. Add to a dashboard
1. Click **Create → Dashboard**, name it “P2 – practice”.
2. Add the three charts. Add a text block with definitions.
3. Screenshot for your P2 case study (label it “demo data”).

## Tips

- **Uniques vs. event totals** is the most common source of confusion; always check which you’re seeing.
- **Learn the vocabulary**: Amplitude calls breakdowns “segments” or “group by”; Mixpanel calls them “breakdowns”.
- **Use the chart description field** to record definitions.
- **Notice defaults**: time zone and conversion window defaults differ between tools.
- **Keep it short**: one focused session is enough; the goal is fluency, not mastery of every feature.
