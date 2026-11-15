---
id: w6-growthbook
title: "GrowthBook: feature flags and an experiment"
week: 6
estimatedMinutes: 10
tags: [tool, growthbook, experimentation, feature-flags]
---

## What it is

**GrowthBook** is an open-source platform for **feature flags** and **A/B testing**. A feature flag lets you turn a feature on or off for some users without releasing new code. GrowthBook offers a free cloud plan, and can also be self-hosted.

## Why PMs use it

Modern teams ship behind flags and run experiments through tools like GrowthBook, Statsig, LaunchDarkly or Optimizely. Understanding flags, targeting, rollout percentages and experiment results is everyday PM work, and it makes your P2 experiment plan concrete.

## Account setup (free plan)

1. Go to growthbook.io → **Try for free** / **Sign up** (cloud).
2. Create an organisation and a project (e.g., “P2 practice”).
3. The free cloud plan supports feature flags and experiments for small teams. Check the pricing page for current limits.

## Walkthrough part 1: create a feature flag

### 1. Create the feature
1. Go to **Features** → **Add Feature**.
2. Feature key: `location_first_onboarding`. Type: **Boolean** (on/off). Default value: **off**.
3. Description: “Ask for delivery location before account creation (P2 experiment).”

### 2. Add targeting and a rollout rule
1. Under the feature’s environment (e.g., **production**), click **Add Rule**.
2. Choose **Percentage Rollout**: serve **true** to 10% of users, based on the attribute `id` (user or device id).
3. Optionally add a condition: `is_new_user = true` (attributes are values your app sends to GrowthBook, like country or platform).
4. Save. Notice: you can change the percentage anytime without a new app release. That’s why flags enable staged rollouts and kill switches.

### 3. (Optional) Try it in code
GrowthBook shows SDK code snippets (JavaScript, React, Android, iOS…). You don’t need to integrate it for this exercise; reading the snippet helps you understand what engineers do: the app asks the SDK “is `location_first_onboarding` on for this user?” and shows the right flow.

## Walkthrough part 2: set up an experiment

### 1. Create the experiment
1. On the feature, click **Add Rule** → **A/B Experiment** (or go to **Experiments → Add Experiment**).
2. Name: “Location before account creation”.
3. Variations: **control = false**, **treatment = true**. Split 50/50.
4. Hypothesis: paste your P2 hypothesis.

### 2. Define metrics
1. GrowthBook calculates results from your **data source** (a warehouse like BigQuery, or an analytics tool). Without a connected data source, you can still create metric definitions to learn the setup.
2. Add the **primary metric**: “7-day activation (first order within 7 days)”. Add **guardrails**: sign-up completion, crash rate.
3. Note the settings for **statistics engine** (Bayesian or frequentist) and whether **sequential testing** is enabled; read the tooltip for each. This is where peeking protections live.

### 3. Document the plan
1. In the experiment description, record: baseline, MDE, α, power, sample size and duration (from PM Path’s A/B calculator), and decision rules.
2. Screenshot the feature rule and the experiment setup for your P2 case.

## Tips

- **Flags ≠ experiments**: a flag controls exposure; an experiment adds random assignment plus measurement.
- **Use stable IDs** for assignment so users don’t flip between variants.
- **Clean up old flags**: stale flags become technical debt (Week 7).
- **Kill switch**: every risky launch should have a flag you can turn off in seconds.
- **Read the stats settings** (sequential testing, multiple-comparison corrections) and connect them to the pitfalls lesson.
