---
id: w11-posthog
title: "PostHog free: usage analytics for P4"
week: 11
estimatedMinutes: 10
tags: [tool, posthog, analytics]
---

## What it is

**PostHog** is an open-source product analytics platform with event tracking, funnels, retention, dashboards, session replay, feature flags, experiments and surveys. Its cloud free tier includes a generous monthly allowance of events and recordings (check current limits).

## Why PMs use it

Your P4 checkpoint needs “20+ users and one data-driven change”. PostHog gives you the usage dashboard to prove adoption, find drop-offs, and measure the before/after effect of your change. It also has feature flags to roll that change out safely.

## Account setup (free plan)

1. Go to posthog.com → **Get started – free** → choose a cloud region (EU or US).
2. Create a project “P4”. Copy the **project API key** (a public key; safe in the front end) and the host URL.
3. **Privacy:** configure PostHog to avoid capturing personal data: mask text inputs in session replays, don’t send names/phone numbers as properties, and use your internal user ID.

## Walkthrough: instrument and build the P4 dashboard

### 1. Install
1. If you built with Lovable/Bolt, ask it: “Add PostHog analytics with this key and host; identify users by Supabase user id; mask all inputs in session replay.”
2. Or add PostHog’s JavaScript snippet/SDK following its quick start.

### 2. Track your key events (from your tracking plan)
Examples for an AI expense app:
- `group_created`, `member_joined`
- `expense_message_submitted` (props: `language`, `length`)
- `expense_draft_shown` (props: `latency_ms`, `prompt_version`)
- `expense_draft_accepted`, `expense_draft_edited`, `expense_draft_discarded`
- `ai_feedback_given` (props: `rating`)
- `settle_clicked`

Identify users with `posthog.identify(userId)` after login; set person properties like `city` only if needed.

### 3. Verify events
1. Use your app; open **Activity / Events** in PostHog and confirm events arrive with properties.
2. Fix naming or missing properties now.

### 4. Build insights
1. **Trend:** daily active users (unique users with any event) and weekly active users.
2. **Funnel:** `expense_message_submitted → expense_draft_shown → expense_draft_accepted`, with a breakdown by `language`.
3. **Retention:** first event `group_created` → returning event `expense_message_submitted`, weekly.
4. **AI quality:** % of drafts accepted without edits; 👍 rate (trend over time with `prompt_version` breakdown).
5. **Latency:** average/percentile of `latency_ms` (using property math).

### 5. Create the dashboard
1. **Dashboards → New dashboard → “P4 usage”**. Add the insights above.
2. Add a text card: dates, number of users, metric definitions.
3. Screenshot weekly for your case study.

### 6. Measure your data-driven change
1. Suppose the funnel shows Hinglish inputs get accepted less often. You improve the prompt (v3).
2. Option A: **feature flag** `prompt_v3` for 50% of users (PostHog flags), compare acceptance by flag.
3. Option B (small user base): before/after comparison of acceptance rate over equal periods, noting the limitations.
4. Record: “Draft acceptance for Hinglish inputs rose from 52% to 71% after prompt v3 (n = 140 drafts).”

## Tips

- **Small numbers warning**: with 20–50 users, show counts alongside percentages and avoid over-claiming significance.
- **Mask inputs** in session replay; expense messages may contain names.
- **Filter out your own test accounts** (create a cohort “internal” and exclude it).
- **Use annotations** on charts to mark releases (“prompt v3 shipped”).
- **Export charts** for your P4 case study and LinkedIn posts.
