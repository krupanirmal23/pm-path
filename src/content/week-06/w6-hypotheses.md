---
id: w6-hypotheses
title: Writing hypotheses
week: 6
estimatedMinutes: 12
tags: [experimentation, hypotheses, analytics]
---

## Why this matters for a PM

Every feature is a bet. A **hypothesis** turns a vague hope (“this will improve things”) into a specific, testable claim you can be right or wrong about. Teams that write hypotheses learn faster, argue less and kill bad ideas sooner. Your P2 experiment plan starts with one.

## Core concepts

### What a product hypothesis is

A **hypothesis** is a falsifiable statement about cause and effect: if we make this change, for these users, this measurable outcome will change by roughly this much, because of this reason. **Falsifiable** means a real result could prove it wrong.

A standard template:

> **We believe that** [change] **for** [users] **will** [measurable outcome] **because** [reason based on evidence]. **We’ll know we’re right when** [metric] **changes by** [amount] **within** [time], **without** [guardrail getting worse].

Example: “We believe that **showing the all-in price from the first cart item** for **new users** will **increase checkout completion** because **14 of 50 reviews and 4 of 6 interviewees said surprise fees made them abandon**. We’ll know we’re right when **checkout completion rises from 62% to 66%** within **2 weeks**, without **average order value falling more than 2%**.”

### The parts and why they matter

- **Change:** specific enough to build and test. Not “improve pricing UX”.
- **Users:** who sees it. Effects often differ by segment.
- **Outcome metric:** one primary metric, ideally close to the change (sensitive) and connected to the North Star.
- **Reason (because):** the evidence and the mechanism. If you can’t explain *why* it would work, you’ll learn little either way.
- **Expected size:** a rough minimum effect worth detecting. This feeds sample size (next lesson).
- **Time:** how long the test runs.
- **Guardrails:** what must not get worse.

### Null and alternative hypotheses (statistics version)

In A/B testing you’ll also see:
- **Null hypothesis (H0):** the change has no effect; any difference is random noise.
- **Alternative hypothesis (H1):** the change has an effect.

An experiment collects evidence to decide whether you can **reject the null**. You never “prove” the alternative with certainty; you show the data would be very unlikely if there were no effect. Next lesson explains how.

### Good vs. weak hypotheses

| Weak | Why | Strong |
|---|---|---|
| “The new home screen will be better.” | No metric, no users, no reason | “Moving ‘Reorder’ to the top for users with 3+ past orders will increase 7-day repeat orders from 22% to 25%, because these users search for the same restaurants repeatedly.” |
| “Users will love dark mode.” | Not measurable; no business link | “Offering dark mode won’t move a core metric; we’ll ship it as a hygiene feature without an experiment.” (Sometimes the honest answer is “don’t test”.) |
| “AI recommendations will increase engagement.” | Vague metric; could be gamed | “Personalised top-5 dishes for returning users will increase add-to-cart rate from home from 18% to 20%, without reducing restaurant diversity.” |

### Riskiest assumption first

Every hypothesis rests on assumptions: users notice the change; they understand it; it addresses the real cause; the effect is big enough to matter. List them and test the riskiest cheaply first (a prototype, a fake door, a survey) before running a full A/B test.

### Learning from both outcomes

Write in advance what you’ll do if the result is positive, negative or flat. If you can’t think of a different action for different results, the test may not be worth running.

## Worked example

**Context (P2):** The activation diagnosis suggests new users from Google sign-in often aren’t in serviceable areas.

**Hypothesis:** We believe that **asking for the delivery location before account creation** for **all new users** will **increase 7-day activation** because **38% of recent Google sign-ins entered non-serviceable pin codes and never ordered**; asking earlier sets expectations and focuses effort on users we can serve. We’ll know we’re right when **7-day activation among serviceable sign-ups** rises from **27% to 30%** within **3 weeks**, without **total completed sign-ups falling more than 5%** or **first-order value falling**.

**Assumptions:**
1. Users will share location before creating an account (usability/value: medium risk).
2. Non-serviceable users are the main cause of the drop (evidence: strong).
3. Earlier location doesn’t scare away serviceable users (medium risk).

**Pre-registered decisions:**
- Positive (≥ +2 pts with guardrails OK): ship to all.
- Flat: keep investigating other hypotheses (OTP issue, coupon change).
- Negative (sign-ups fall > 5%): revert; try a lighter version (show serviceability as a banner after sign-up).

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 210" role="img" aria-labelledby="hy-t hy-d">
<title id="hy-t">Anatomy of a hypothesis</title>
<desc id="hy-d">A sentence broken into coloured parts: change, users, outcome, because, target, time and guardrail.</desc>
<g class="d-ink" stroke-width="2">
<rect x="15" y="30" width="140" height="56" rx="8" class="d-lavender"/><rect x="165" y="30" width="120" height="56" rx="8" class="d-sky"/><rect x="295" y="30" width="150" height="56" rx="8" class="d-mint"/><rect x="455" y="30" width="170" height="56" rx="8" class="d-butter"/>
<rect x="15" y="110" width="200" height="56" rx="8" class="d-peach"/><rect x="225" y="110" width="140" height="56" rx="8" class="d-sky"/><rect x="375" y="110" width="250" height="56" rx="8" class="d-pink"/>
</g>
<text x="27" y="53" class="d-text-dark" font-size="11" font-weight="700">We believe that…</text><text x="27" y="72" class="d-text-dark" font-size="11">[specific change]</text>
<text x="177" y="53" class="d-text-dark" font-size="11" font-weight="700">for…</text><text x="177" y="72" class="d-text-dark" font-size="11">[users]</text>
<text x="307" y="53" class="d-text-dark" font-size="11" font-weight="700">will…</text><text x="307" y="72" class="d-text-dark" font-size="11">[outcome metric]</text>
<text x="467" y="53" class="d-text-dark" font-size="11" font-weight="700">because…</text><text x="467" y="72" class="d-text-dark" font-size="11">[evidence + mechanism]</text>
<text x="27" y="133" class="d-text-dark" font-size="11" font-weight="700">We’ll know when…</text><text x="27" y="152" class="d-text-dark" font-size="11">[metric: X → Y]</text>
<text x="237" y="133" class="d-text-dark" font-size="11" font-weight="700">within…</text><text x="237" y="152" class="d-text-dark" font-size="11">[time]</text>
<text x="387" y="133" class="d-text-dark" font-size="11" font-weight="700">without…</text><text x="387" y="152" class="d-text-dark" font-size="11">[guardrail getting worse]</text>
<text x="120" y="196" class="d-text" font-size="12">If a real result can’t prove it wrong, it isn’t a hypothesis.</text>
</svg>
<figcaption>Seven parts. The “because” is the one most people skip, and the one that makes results teach you something.</figcaption>
</figure>

## Step by step

1. **Start from evidence**: research quotes, data, a diagnosis.
2. **State the change** specifically enough to build.
3. **Name the users** exposed.
4. **Pick one primary metric** sensitive to the change; add 1–3 guardrails.
5. **Write the because**: evidence + mechanism.
6. **Estimate the minimum effect worth detecting** (e.g., +2 percentage points).
7. **Set the time frame** (to be confirmed with the sample size calculator).
8. **List assumptions** and test the riskiest cheaply if possible.
9. **Pre-register decisions** for positive, flat and negative outcomes.

## Common mistakes

1. **Unfalsifiable statements** (“users will like it”).
2. **No mechanism**: when it fails, you don’t know why.
3. **Too many metrics**, then picking whichever moved (“metric fishing”).
4. **Testing several changes at once** in one variant, so you can’t tell which mattered.
5. **No guardrails.**
6. **Deciding what the result means after seeing it.** Decide in advance.

## How it shows up in interviews

> [!INTERVIEW]
> **“How would you test whether a new onboarding flow works?”**
> Outline: hypothesis in template form → primary metric (activation) → guardrails → A/B test design (next lesson) → pre-registered decisions → what you’d learn from each outcome.

> [!INTERVIEW]
> **“Your experiment showed no effect. Was it a waste?”**
> Outline: not if the hypothesis was clear → a flat result rules out a mechanism or effect size → check power (was the sample big enough?) → check implementation (did users actually see it?) → decide next step.

## Practice exercise

**Task (20 minutes):** Rewrite these three weak hypotheses into full, testable ones:
1. “A referral programme will help Zepto grow.”
2. “Better search will improve Meesho.”
3. “Showing ratings more prominently will increase Swiggy orders.”

```answer Reveal model answers
1. **We believe that** giving existing Zepto users ₹100 credit when a referred friend completes their first order **for** active users in Bengaluru **will** increase new-user acquisition through referrals **because** 30% of surveyed users already recommend Zepto to friends verbally. **We’ll know we’re right when** referred first orders rise from 5% to 10% of new users within 6 weeks, **without** referral fraud above 1% or referred-user 30-day retention below non-referred users.

2. **We believe that** adding spelling-tolerant search with Hindi/Hinglish synonyms **for** buyers in tier 2–3 cities **will** increase search-to-product-view rate **because** 22% of searches currently return zero results, mostly misspellings and transliterations. **We’ll know we’re right when** zero-result searches fall from 22% to 10% and search-to-view rate rises from 41% to 46% within 3 weeks, **without** increasing search latency above 300 ms (p95).

3. **We believe that** showing the restaurant rating and number of ratings on the main listing card **for** new users **will** increase restaurant-view-to-cart rate **because** new users lack familiarity and use ratings as a trust signal (5 of 7 interviewees). **We’ll know we’re right when** view-to-cart rate for new users rises from 28% to 30% within 2 weeks, **without** orders concentrating so heavily that new restaurants’ order share falls by more than 10%.
```

## Quiz

```quiz
Q: What makes a statement a testable hypothesis?
- [ ] It’s written by a senior PM :: Seniority doesn’t matter.
- [x] It predicts a measurable outcome that a real result could prove wrong :: Correct. It must be falsifiable.
- [ ] It uses the word “believe” :: The template helps, but falsifiability is the key.
- [ ] It’s based on a competitor’s feature :: Not required.

Q: What’s the null hypothesis in an A/B test?
- [ ] The new version is better :: That’s the alternative.
- [x] The change has no real effect; differences are due to chance :: Correct.
- [ ] The test is broken :: Not what it means.
- [ ] Users didn’t see the change :: Not what it means.

Q: Why include the “because” in a hypothesis?
- [ ] It sounds more convincing :: Not the main reason.
- [x] It states the evidence and mechanism, so results teach you why something did or didn’t work :: Correct.
- [ ] It’s required by analytics tools :: Not required by tools.
- [ ] To blame users :: Hypotheses are about your change and its mechanism, not about assigning blame.

Q: A team tracks 15 metrics and reports the 2 that went up. What’s the problem?
- [ ] Nothing; good news is good :: This is metric fishing.
- [x] With many metrics, some move by chance; the primary metric should be chosen in advance :: Correct.
- [ ] They should track 30 metrics :: More metrics make it worse.
- [ ] They should only report metrics that went down :: Not the point.

Q: Why decide in advance what you’ll do for positive, flat and negative results?
- [ ] To speed up the test :: It doesn’t change speed.
- [x] To avoid rationalising results after the fact and to check the test can actually change a decision :: Correct.
- [ ] Because statistics require it :: It’s good practice, not a formula requirement.
- [ ] To impress stakeholders :: Not the goal.
```

## Key takeaways

- A hypothesis is a **falsifiable** cause-and-effect claim with a **metric, target, time and guardrail**.
- Use the template: **We believe that [change] for [users] will [outcome] because [evidence]…**
- The **because** captures the mechanism; it’s what makes results educational.
- Choose **one primary metric in advance**; avoid metric fishing.
- **Pre-register decisions** for every outcome, and test the **riskiest assumption** cheaply first.
