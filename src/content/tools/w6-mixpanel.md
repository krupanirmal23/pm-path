---
id: w6-mixpanel
title: "Mixpanel (demo data) or PostHog: explore product analytics"
week: 6
estimatedMinutes: 10
tags: [tool, mixpanel, posthog, analytics]
---

## What it is

**Mixpanel** and **PostHog** are product analytics tools: they collect events from apps and websites and let you build funnels, retention charts, cohorts and dashboards without writing SQL. Both have free plans. Mixpanel offers **demo/sample data** so you can practise without your own product.

## Why PMs use it

Product analytics tools are where most PMs look at user behaviour daily. Interviewers often ask, “Which analytics tools have you used?” Hands-on practice with real charts (funnels, retention, segmentation) makes your P2 case and your answers credible.

## Account setup (free plan)

**Mixpanel**
1. Go to mixpanel.com → **Get started free**; sign up with Google.
2. When asked to set up a project, look for the option to **explore with demo/sample data** (Mixpanel provides a sample project for learning; the exact wording changes, so look for “demo”, “sample data” or a pre-built example project). If it isn’t offered, create a project and use the **“Send test data”/sample data** option in the onboarding.
3. The free plan includes a generous monthly event allowance and core reports (Insights, Funnels, Retention, Flows).

**PostHog (alternative)**
1. Go to posthog.com → **Get started – free**; sign up.
2. PostHog’s free tier includes product analytics, session replay and feature flags up to monthly limits.
3. You can send events from a simple web page or use its demo environment if available. You’ll use PostHog properly for P4 in Week 11.

## Walkthrough: build P2 analyses on demo data

### 1. Explore the events
1. Open the **Events** (or **Live view / Activity**) page to see recent events and their properties.
2. Note 8–10 event names and 5 properties. Compare them with your tracking plan’s naming.

### 2. Build a funnel
1. Go to **Funnels** → **Create**.
2. Add 3–5 steps in order (for an e-commerce-style demo: view product → add to cart → checkout → purchase).
3. Set the **conversion window** (e.g., 1 day or 7 days): users must complete all steps within this time.
4. Click **Breakdown** and choose a property such as platform, country or device. Find the segment with the worst conversion.
5. Save the report.

### 3. Build a retention chart
1. Go to **Retention**.
2. Set the **start event** (e.g., sign-up or first purchase) and the **return event** (e.g., any purchase).
3. Choose weekly intervals. Look at the curve: does it flatten?
4. Compare two cohorts using **breakdown** (e.g., by acquisition source).

### 4. Create a behavioural cohort
1. Go to **Cohorts** (Users → Cohorts in some layouts) → **Create cohort**.
2. Define it: “Did *purchase* at least 2 times in the first 7 days after sign-up”.
3. Use it as a filter in the retention report to compare retention of this cohort vs. everyone.

### 5. Build the P2 dashboard
1. Create a **Board** (Mixpanel) or **Dashboard** (PostHog).
2. Add: KPI-style Insights (e.g., daily purchasers with week-over-week comparison), a trend line, the funnel, the retention chart, and one breakdown (platform or country).
3. Add a text card at the top: audience, question, metric definitions.
4. Take screenshots for your P2 write-up.

### 6. Practise “diagnose the drop”
1. In Insights, chart a key event daily for the last 30 days.
2. Look for a dip; then add a breakdown (platform, country, app version) to see if it’s concentrated.
3. Write 3 lines on what you’d investigate. Then practise on the built-in **Funnel & Retention Explorer** in PM Path’s Toolkit, which has guided drop exercises.

## Tips

- **Conversion windows matter**: a 1-hour window and a 7-day window give very different funnel numbers.
- **Unique vs. total**: make sure funnels count unique users.
- **Name and describe** every saved report; future-you (and reviewers) will thank you.
- **Don’t screenshot personal data** from real projects.
- **Compare tools**: note one thing Mixpanel did better and one thing PostHog (or Amplitude) did better; good interview material.
