---
id: w3-okrs
title: OKRs
week: 3
estimatedMinutes: 13
tags: [strategy, goals, okrs]
---

## Why this matters for a PM

Most tech companies in Bengaluru set goals with **OKRs**. You’ll be asked to write them, defend them and report on them every quarter. Good OKRs align a team around outcomes; bad ones turn into a task list with numbers. Your P1 strategy doc needs 1–2 OKRs.

## Core concepts

### What OKRs are

**OKR** stands for **Objectives and Key Results**.
- An **Objective** is a qualitative, inspiring statement of what you want to achieve this period. It answers: *Where do we want to go?*
- **Key Results** are 2–4 measurable outcomes that prove you got there. They answer: *How will we know?*

Format: “**Objective:** [inspiring direction]. **KR1:** [metric] from [X] to [Y]. **KR2:** … ”

Example:
> **Objective:** Make first-time investing feel safe for new Groww users.
> - **KR1:** Increase new users who complete their first SIP within 7 days from 18% to 25%.
> - **KR2:** Increase 90-day SIP continuation for new investors from 45% to 55%.
> - **KR3:** Reduce “I’m scared of losing money” as the top reason in drop-off surveys from 41% to 30%.

### Objectives: rules of thumb

- **Qualitative and motivating.** People should want to work on it.
- **Clear direction**, not a vague slogan. “Be awesome” fails; “Make first-time investing feel safe” works.
- **Achievable within the period** with real effort.
- **3–5 objectives max** per team per quarter; ideally 1–3.

### Key results: rules of thumb

- **Measurable, with a baseline and a target.**
- **Outcomes, not tasks.** “Launch video KYC” is a task (an **initiative**). KRs measure what changes.
- **2–4 per objective.** Enough to capture the objective, not so many that focus disappears.
- **Balanced:** pair a growth KR with a quality or guardrail KR so you don’t game one.
- **Owned and trackable weekly** where possible.

### Initiatives: where tasks belong

**Initiatives** are the projects you’ll do to move the KRs: “Launch video KYC”, “Redesign the fund picker”. They sit *under* the KRs. If the initiatives ship and the KRs don’t move, you try different initiatives. That’s the point.

### Committed vs. aspirational OKRs

- **Committed OKRs**: you expect to hit 100%. Used for must-do targets (e.g., uptime, compliance).
- **Aspirational (stretch) OKRs**: ambitious; hitting 60–70% is considered good. They encourage bold thinking.

Make it clear which type each OKR is, or teams will feel like failures when they hit 70% of a stretch goal.

### Scoring

At the end of the quarter, score each KR from 0.0 to 1.0 based on progress from baseline to target. If KR1 moved from 18% to 23% against a target of 25%: (23−18)/(25−18) = 5/7 ≈ 0.7. Then reflect: what worked, what didn’t, what you learned. OKRs are for learning and focus, not for performance reviews; when they’re tied to bonuses, people set easy targets.

### OKRs and strategy

OKRs translate strategy into the next quarter. The objective should clearly serve a strategic choice. If your strategy says “win first-time sellers in tier 2–3 cities,” a good objective is “Make listing the first 10 products effortless for new regional-language sellers.”

## Worked example

**Team: Zomato restaurant partner app (illustrative). Strategy: help small restaurants grow online orders profitably.**

**Bad OKR:**
> Objective: Improve the partner app.
> - KR1: Launch a new menu editor.
> - KR2: Add 3 new analytics charts.
> - KR3: Fix 50 bugs.
Problems: vague objective; all KRs are tasks; nothing measures whether restaurants are better off.

**Good OKR:**
> **Objective:** Help new restaurant partners get their first 100 orders faster.
> - **KR1:** Reduce median time from sign-up to going live from 9 days to 4 days.
> - **KR2:** Increase new partners reaching 100 orders within 30 days of going live from 22% to 35%.
> - **KR3 (guardrail):** Keep new-partner order cancellation rate at or below 4%.
>
> **Initiatives (not KRs):** self-serve menu upload from a photo; a “first 30 days” checklist; a starter offer playbook.

**End-of-quarter score:** KR1: 9 → 5 days (target 4): (9−5)/(9−4) = 0.8. KR2: 22% → 30% (target 35%): 8/13 ≈ 0.6. KR3: 3.8% (held): 1.0. Learning: the menu-from-photo upload drove KR1; the checklist didn’t move KR2 much, so next quarter the team tests a dedicated onboarding manager for high-potential restaurants.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 240" role="img" aria-labelledby="okr-t okr-d">
<title id="okr-t">OKR structure</title>
<desc id="okr-d">An objective on top, three key results beneath it, and initiatives beneath the key results.</desc>
<g class="d-ink" stroke-width="2"><line x1="320" y1="62" x2="115" y2="92"/><line x1="320" y1="62" x2="320" y2="92"/><line x1="320" y1="62" x2="525" y2="92"/><line x1="115" y1="146" x2="115" y2="176"/><line x1="320" y1="146" x2="320" y2="176"/></g>
<rect x="150" y="14" width="340" height="48" rx="10" class="d-lavender d-ink" stroke-width="2"/>
<text x="166" y="35" class="d-text-dark" font-weight="700" font-size="12">Objective (qualitative, inspiring)</text>
<text x="166" y="52" class="d-text-dark" font-size="11">Help new partners get their first 100 orders faster</text>
<rect x="30" y="92" width="170" height="54" rx="10" class="d-mint d-ink" stroke-width="2"/>
<text x="42" y="114" class="d-text-dark" font-weight="700" font-size="11">KR1 (outcome)</text>
<text x="42" y="132" class="d-text-dark" font-size="11">Time to live: 9 → 4 days</text>
<rect x="235" y="92" width="170" height="54" rx="10" class="d-mint d-ink" stroke-width="2"/>
<text x="247" y="114" class="d-text-dark" font-weight="700" font-size="11">KR2 (outcome)</text>
<text x="247" y="132" class="d-text-dark" font-size="11">100 orders in 30d: 22→35%</text>
<rect x="440" y="92" width="170" height="54" rx="10" class="d-pink d-ink" stroke-width="2"/>
<text x="452" y="114" class="d-text-dark" font-weight="700" font-size="11">KR3 (guardrail)</text>
<text x="452" y="132" class="d-text-dark" font-size="11">Cancellations ≤ 4%</text>
<rect x="30" y="176" width="170" height="48" rx="10" class="d-surface d-ink" stroke-width="2"/>
<text x="42" y="204" class="d-text" font-size="11">Initiative: menu from photo</text>
<rect x="235" y="176" width="170" height="48" rx="10" class="d-surface d-ink" stroke-width="2"/>
<text x="247" y="204" class="d-text" font-size="11">Initiative: 30-day checklist</text>
</svg>
<figcaption>Objectives give direction; key results measure outcomes; initiatives are the bets underneath.</figcaption>
</figure>

## Step by step

Writing OKRs for P1:

1. **Start from strategy.** Which strategic choice does this quarter serve?
2. **Write the objective** in one sentence: qualitative, motivating, specific to your user.
3. **Ask “how would we know we achieved it?”** List 5–6 candidate measures.
4. **Keep 2–3 outcome KRs** and add 1 guardrail.
5. **Add baselines and targets.** If you don’t have a baseline, make the first KR “establish the baseline” *and* say so honestly, or use a proxy from research.
6. **Label each OKR** committed or aspirational.
7. **List initiatives** under the KRs, separately.
8. **Sanity check:** could the team hit every KR while users are worse off? If yes, fix the KRs or add a guardrail.

## Common mistakes

1. **Tasks as KRs.** “Launch X” belongs in initiatives.
2. **Too many OKRs.** Eight objectives means no focus.
3. **No baseline.** “Increase retention to 40%” is meaningless if you don’t know it’s 38% or 12% today.
4. **Gameable KRs with no guardrail.** “Increase sign-ups” can be hit by removing verification.
5. **Treating OKRs as fixed contracts.** If you learn the KR is wrong mid-quarter, adjust it openly.
6. **Linking OKRs to bonuses.** People sandbag and set easy targets.

## How it shows up in interviews

> [!INTERVIEW]
> **“Write OKRs for [product] for next quarter.”**
> Outline: link to a strategic priority → one objective → 2–3 outcome KRs with baseline and target → one guardrail → 2–3 initiatives below → say whether it’s committed or stretch.

> [!INTERVIEW]
> **“Your team hit all its initiatives but missed its key results. What happened?”**
> Outline: initiatives were bets that didn’t work, or measurement/time lag → analyse why (data, users) → keep the KRs, change the initiatives → mention this is OKRs working as intended: they expose ineffective work.

## Practice exercise

**Task (25 minutes):** Rewrite this bad OKR into a good one, and add initiatives and a guardrail.

> Objective: Improve PhonePe’s bill payments.
> KR1: Launch new electricity bill UI.
> KR2: Add 20 new billers.
> KR3: Send more reminder notifications.

```answer Reveal a model answer
**Objective:** Make paying monthly bills on PhonePe effortless and on-time. (Aspirational)

- **KR1:** Increase users paying 2+ different bill types on PhonePe each month from 12% to 18%.
- **KR2:** Increase bills paid before the due date (of reminders sent) from 55% to 70%.
- **KR3:** Reduce bill payment failures from 3.2% to 2.0%.
- **Guardrail:** Notification opt-out rate stays below 1.5% per month.

**Initiatives:**
- Redesigned electricity bill flow with auto-fetched amounts.
- Add the 20 most-requested billers (based on search terms with no results).
- Smarter reminders timed to each user’s usual payment day.
```

## Quiz

```quiz
Q: Which is a well-formed key result?
- [ ] Launch the new onboarding flow :: That’s an initiative (a task).
- [x] Increase new users completing onboarding within 24 hours from 40% to 55% :: Correct. Measurable outcome with baseline and target.
- [ ] Make onboarding better :: Not measurable.
- [ ] Have 10 meetings with design :: An activity, not an outcome.

Q: Where should “Build video KYC” go in an OKR set?
- [ ] As the objective :: Objectives describe direction, not projects.
- [ ] As a key result :: KRs measure outcomes; this is a task.
- [x] As an initiative under the relevant key result :: Correct. It’s a bet to move a KR.
- [ ] Nowhere; OKRs don’t include projects :: Initiatives are commonly listed alongside OKRs.

Q: A KR moved from 20% to 26% against a target of 30%. What’s the score?
- [ ] 0.26 :: That’s the raw value, not progress toward the target.
- [x] 0.6 :: Correct. (26 − 20) / (30 − 20) = 6/10 = 0.6.
- [ ] 0.87 :: That’s 26/30, which ignores the baseline.
- [ ] 1.0 :: The target wasn’t reached.

Q: Why add a guardrail KR?
- [ ] To have more KRs :: More isn’t better.
- [x] To stop the team from hitting a target in a way that harms users or the business :: Correct. It prevents gaming.
- [ ] Because guardrails are always committed OKRs :: Not necessarily.
- [ ] To impress leadership :: Not the purpose.

Q: For an aspirational (stretch) OKR, what score is usually considered good?
- [ ] 0.1–0.3 :: Too low; something likely went wrong.
- [x] 0.6–0.7 :: Correct. Stretch goals are set so that hitting most of them is a success.
- [ ] Exactly 1.0 every time :: If you always hit 1.0, the goals weren’t stretching.
- [ ] Above 1.5 :: Scores above 1.0 suggest the target was too easy.

Q: Why is linking OKRs directly to bonuses risky?
- [ ] It makes OKRs harder to write :: Not the main risk.
- [x] People set safe, easy targets to protect their pay, killing ambition and honesty :: Correct. OKRs work best as a focus and learning tool.
- [ ] Bonuses are illegal in India :: They’re not.
- [ ] It makes OKRs public :: Not the issue.
```

## Key takeaways

- **Objective** = qualitative direction; **Key results** = 2–4 measurable outcomes with **baseline and target**.
- **Tasks are initiatives**, not KRs; if initiatives ship and KRs don’t move, change the initiatives.
- Add a **guardrail** so targets can’t be gamed.
- Mark OKRs **committed or aspirational**; 0.6–0.7 is good for stretch goals.
- OKRs translate **strategy into the next quarter**; keep them few and focused.

*Go deeper (optional):* John Doerr’s *Measure What Matters*, and Google’s re:Work guide on OKRs.
