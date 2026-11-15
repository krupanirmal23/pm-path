---
id: w4-launch-gtm
title: Launch plans and go-to-market basics
week: 4
estimatedMinutes: 14
tags: [execution, launch, gtm]
---

## Why this matters for a PM

A great feature nobody finds is a failed feature. **Launching** is about getting the right users to discover, try and succeed with what you built, safely, and measuring whether it worked. PMs own the launch plan even when marketing runs the campaigns. Your deliverable this week includes a 1-page launch plan.

## Core concepts

### Go-to-market (GTM)

**Go-to-market (GTM)** is the plan for how a product or feature reaches its users: who it’s for, what you’ll say, which channels you’ll use, how you’ll price it (if relevant), and how you’ll support it. For big launches, a **product marketing manager (PMM)** usually leads GTM; for small features, the PM often does it.

The core GTM questions:
1. **Audience:** who exactly is this for? Which segment first?
2. **Message:** what’s the single benefit, in the user’s words? (Your positioning, made concrete.)
3. **Channels:** how will they hear about it? In-app, push, email, WhatsApp, social media, sales team, partners, press.
4. **Timing:** when, and in what sequence?
5. **Enablement:** do support, sales and ops know how it works and how to answer questions?
6. **Success metrics:** how will you know the launch worked?

### Launch tiers

Not every launch deserves a campaign. Many companies use **tiers**:
- **Tier 1 (major):** new product or big feature affecting many users; full campaign, press, all channels. Example: Swiggy launching a new service.
- **Tier 2 (medium):** notable feature for a segment; in-app announcement, email, blog/social post.
- **Tier 3 (minor):** improvements and fixes; release notes, maybe an in-app tooltip.

Choosing the tier saves effort and avoids announcement fatigue.

### Rollout strategies

Releasing to everyone at once is risky. Safer approaches:
- **Internal release (dogfooding):** employees use it first. (“Eating your own dog food” means using your own product.)
- **Beta:** a small group of opted-in or selected users try it and give feedback.
- **Staged (phased) rollout:** release to 1% → 10% → 50% → 100% of users, checking metrics and errors at each step. Both app stores support staged rollouts for mobile apps.
- **Feature flags:** turn features on for specific users or percentages without new app releases; instantly turn off if something breaks (a **kill switch**).
- **Geographic rollout:** launch in one city first (very common in India: Bengaluru first, then other metros).
- **A/B test launch:** release to a random half and compare outcomes (Week 6).

### Launch readiness checklist

Before launch, check:
- **Product:** acceptance criteria met; QA passed; works on target devices and networks.
- **Data:** tracking events firing correctly; dashboard ready; baseline recorded.
- **Reliability:** monitoring and alerts set; rollback plan or kill switch ready.
- **Support:** help articles and FAQ written; support team trained; escalation path clear.
- **Legal/compliance:** terms, privacy, regulatory checks done (especially in fintech).
- **Communication:** messages written and approved; internal announcement sent.
- **Go/no-go meeting:** the team reviews the checklist and decides.

### After launch

- **Watch metrics daily** for the first week: adoption, errors, support tickets, guardrails.
- **Collect qualitative feedback**: reviews, support tickets, quick interviews.
- **Launch review (after 2–4 weeks):** did it hit the goal? What did we learn? What next: iterate, scale, or roll back?
- **Share results** with the team and stakeholders.

### Adoption funnel for a feature

Think of a launch as a funnel: **aware → tried → succeeded → repeated**. If adoption is low, find which step is leaking: Do people not know it exists (awareness)? Do they try but fail (usability)? Do they succeed once but not return (value)?

## Worked example

**1-page launch plan: “Auto monthly settle-up” (P1).**

- **Goal:** % of groups settled within 5 days of the summary: 30% → 50% within one quarter.
- **Tier:** 2 (important for existing users, not a new product).
- **Audience:** existing groups with 3+ members and at least one unsettled balance older than 30 days (~3,000 groups).
- **Message:** “No more awkward money chats. On the 1st, we’ll send your flat one neutral summary. Settle in one tap.”
- **Rollout:**
  - Week 1: internal team + 20 friendly beta groups.
  - Week 2: 10% of eligible groups (feature flag); watch settle rate, errors, opt-outs.
  - Week 3: 50%, then 100% if guardrails hold.
- **Channels:** in-app banner the week before the 1st; push notification on the 1st; short LinkedIn/Instagram post; help article.
- **Enablement:** FAQ for support (“Why did I get this?”, “How do I mute it?”, “My payment is pending”); escalation for payment issues.
- **Readiness:** tracking events (summary_sent, summary_opened, settle_clicked, settle_succeeded), dashboard, kill switch, UPI provider tested.
- **Success metrics:** primary settle rate; summary open rate ≥ 60%; guardrails: opt-outs < 2%, group leave rate unchanged, payment failure < 3%.
- **Launch review:** 4 weeks after 100% rollout.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 200" role="img" aria-labelledby="lr-t lr-d">
<title id="lr-t">Staged rollout</title>
<desc id="lr-d">A sequence of rollout steps: internal, beta, 10 percent, 50 percent, 100 percent, with metric checks between steps.</desc>
<defs><marker id="lr-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="15" y="70" width="100" height="56" rx="10" class="d-surface d-ink" stroke-width="2"/><text x="28" y="103" class="d-text" font-weight="700" font-size="12">Internal</text>
<rect x="140" y="70" width="100" height="56" rx="10" class="d-lavender d-ink" stroke-width="2"/><text x="160" y="103" class="d-text-dark" font-weight="700" font-size="12">Beta</text>
<rect x="265" y="70" width="100" height="56" rx="10" class="d-sky d-ink" stroke-width="2"/><text x="292" y="103" class="d-text-dark" font-weight="700" font-size="12">10%</text>
<rect x="390" y="70" width="100" height="56" rx="10" class="d-butter d-ink" stroke-width="2"/><text x="417" y="103" class="d-text-dark" font-weight="700" font-size="12">50%</text>
<rect x="515" y="70" width="110" height="56" rx="10" class="d-mint d-ink" stroke-width="2"/><text x="545" y="103" class="d-text-dark" font-weight="700" font-size="12">100%</text>
<g class="d-ink" stroke-width="2"><line x1="117" y1="98" x2="136" y2="98" marker-end="url(#lr-a)"/><line x1="242" y1="98" x2="261" y2="98" marker-end="url(#lr-a)"/><line x1="367" y1="98" x2="386" y2="98" marker-end="url(#lr-a)"/><line x1="492" y1="98" x2="511" y2="98" marker-end="url(#lr-a)"/></g>
<text x="120" y="155" class="d-text" font-size="12">Between steps: check errors, guardrails, support tickets. Kill switch ready.</text>
</svg>
<figcaption>Expand only when metrics and guardrails hold at the current step.</figcaption>
</figure>

## Step by step

Writing your 1-page P1 launch plan:

1. **Goal and metric** (from the PRD).
2. **Tier** and a one-line justification.
3. **Audience**: the first segment and its approximate size.
4. **Message**: one sentence of benefit in user language; one supporting line.
5. **Rollout**: stages with dates and the metric checks between them.
6. **Channels**: list each with timing.
7. **Enablement**: FAQ topics and who needs training.
8. **Readiness checklist**: product, data, reliability, support, legal, comms.
9. **Risks and mitigations**: what could go wrong at launch and how you’d respond.
10. **Post-launch**: what you’ll watch daily, and when the launch review happens.

## Common mistakes

1. **Big-bang launches** to 100% with no flag or rollback.
2. **No tracking at launch**, so you can’t tell if it worked.
3. **Support finds out from users.** Enable support before launch.
4. **Message about features, not benefits.** “Now with auto-settlement API” vs. “No more awkward money chats.”
5. **Launching everything as Tier 1.** Users tune out.
6. **No launch review.** The team moves on without learning.

## How it shows up in interviews

> [!INTERVIEW]
> **“How would you launch [feature]?”**
> Outline: goal and metric → audience and first segment → message → rollout plan (flag, staged, city) → channels → enablement → readiness checklist → post-launch monitoring and review. Mention guardrails and a kill switch.

> [!INTERVIEW]
> **“You launched a feature and adoption is only 2%. What do you do?”**
> Outline: break the adoption funnel (aware → tried → succeeded → repeated) → find the leaking step with data → interview a few users at that step → fix discoverability, usability or value accordingly → set a target and re-measure.

## Practice exercise

**Task (30 minutes):** Write a 1-page launch plan for **“Zerodha Kite: price alerts on WhatsApp”** using the 10-point structure.

```answer Reveal a model answer
1. **Goal:** % of active traders with at least one active alert who act (open Kite) within 10 minutes of an alert: target 35%; adoption: 15% of active traders set an alert within 30 days.
2. **Tier:** 2: valuable for a segment (active traders), not a new product.
3. **Audience:** active traders (5+ trades/month), first in a 5% beta.
4. **Message:** “Never miss your price. Get Kite alerts on WhatsApp, instantly.”
5. **Rollout:** internal (week 1) → 5% opted-in traders (week 2) → 25% (week 3) → 100% (week 4), checking delivery delay and opt-outs at each step.
6. **Channels:** in-app banner on the alerts screen; email to active traders; a short post on X and a Varsity-style explainer.
7. **Enablement:** FAQ: how to opt in/out, why an alert was delayed, privacy of phone numbers; support trained on WhatsApp delivery issues.
8. **Readiness:** WhatsApp Business templates approved; delivery latency monitored (p95 < 30 seconds); consent captured; tracking: alert_set, alert_sent, alert_delivered, app_open_from_alert; kill switch.
9. **Risks:** delayed alerts during volatile markets → show “alerts may be delayed during extreme volatility” and monitor; spam perception → frequency caps.
10. **Post-launch:** daily dashboard for 2 weeks (delivery time, opt-outs, adoption); launch review at week 6.
```

## Quiz

```quiz
Q: What does go-to-market cover?
- [ ] Only the advertising budget :: GTM is much broader.
- [x] Audience, message, channels, timing, enablement and success metrics for reaching users :: Correct. GTM is the full plan for getting the right users to adopt successfully.
- [ ] Only the engineering release :: That’s the technical release, not GTM.
- [ ] Only pricing :: Pricing is one part, sometimes.

Q: What’s the main benefit of a staged rollout?
- [ ] It makes the launch more exciting :: Not the goal.
- [x] Problems surface with a small group before affecting everyone :: Correct. You can pause or roll back early.
- [ ] It avoids testing :: It complements testing.
- [ ] It’s required by the app stores :: Optional, though supported.

Q: Which message is best for a launch announcement?
- [ ] “We’ve integrated a new settlement microservice.” :: Technical, not a user benefit.
- [x] “No more awkward money chats: settle your flat’s expenses in one tap.” :: Correct. Benefit-focused and in user language.
- [ ] “Version 4.2 is here.” :: Says nothing about value.
- [ ] “The best app in India.” :: An unsupported claim.

Q: Adoption of a new feature is low. People try it once but don’t return. Which step is leaking?
- [ ] Awareness :: They know about it; they tried it.
- [ ] Trial :: They did try it.
- [x] Repeat use, suggesting a value problem :: Correct. Investigate whether it actually solves their need.
- [ ] Nothing; one use is enough :: Depends on the feature, but usually repeat use matters.

Q: Why should support be trained before launch?
- [ ] Support teams like training :: Not the reason.
- [x] So they can answer user questions and escalate issues from day one :: Correct. Prepared support turns launch-day confusion into quick answers instead of angry reviews.
- [ ] It’s legally required :: Not generally.
- [ ] To reduce engineering work :: A side effect at most.

Q: What is a kill switch?
- [ ] A button for users to delete their account :: Not what it means.
- [x] A way to turn off a feature instantly if something goes wrong :: Correct. Usually implemented with a feature flag.
- [ ] A security vulnerability :: Not what it means.
- [ ] The final step of a launch :: Not what it means.
```

## Key takeaways

- **GTM** = audience, message, channels, timing, enablement and metrics.
- Match effort to impact with **launch tiers**.
- Release safely: **internal → beta → staged rollout**, with **feature flags** and a **kill switch**.
- Use a **readiness checklist** and a **go/no-go** decision.
- Watch metrics daily after launch and hold a **launch review**; diagnose low adoption with the **aware → tried → succeeded → repeated** funnel.
