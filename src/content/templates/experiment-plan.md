---
title: Experiment (A/B test) plan
category: Measure
week: 6
summary: Defines hypothesis, metrics, sample size and decision rules before an A/B test starts.
---
## When to use
Before launching any A/B test. Writing decision rules up front prevents “peeking” and cherry-picking. Use the **A/B Test Calculator** in the Toolkit for sample size.

## How to fill it
1. Hypothesis format: “If we {change}, then {metric} will {direction} because {reason}.”
2. One **primary** metric. Secondary and guardrails are for context.
3. Set the **minimum detectable effect** (MDE) to the smallest change worth shipping.
4. Fix the **duration** in full weeks to cover weekday/weekend cycles.
5. Write what you will do for each outcome: win, lose, flat.

<!-- template -->
# Experiment: {name}

**Hypothesis:** If we {change}, then {metric} will {increase/decrease} because {reason}.

| Item | Value |
|---|---|
| Unit of randomisation | {user/group/session} |
| Variants | Control: {…} · Treatment: {…} |
| Traffic split | {50/50} |
| Primary metric | {metric, definition} |
| Baseline | {x%} |
| MDE | {relative or absolute} |
| Significance / power | 5% / 80% |
| Sample size per variant | {n} |
| Duration | {n full weeks} |
| Secondary metrics | |
| Guardrails | |

**Decision rules**
- Win: {…} → ship
- Flat: {…} → {…}
- Lose / guardrail breach: {…} → roll back

**Risks:** {novelty effect, network effects, SRM}

<!-- example -->
# Experiment: monthly settle-up summary

**Hypothesis:** If we send each member an app-generated summary with a one-tap UPI button on the 1st, then the % of groups fully settled will increase because the reminder no longer has to come from a friend.

| Item | Value |
|---|---|
| Unit of randomisation | Group (members of one flat must see the same thing) |
| Variants | Control: no summary · Treatment: summary push + screen |
| Traffic split | 50/50 of eligible groups |
| Primary metric | % of groups fully settled in the month |
| Baseline | 31% |
| MDE | +5 points absolute (to 36%) |
| Significance / power | 5% / 80% |
| Sample size per variant | ~1,400 groups |
| Duration | 1 full monthly cycle (summary is monthly), read on day 10 |
| Secondary metrics | Time to settle; summary open rate |
| Guardrails | Notification opt-out ≤ 3%; group leave rate ≤ 1.6% |

**Decision rules**
- Win: primary up ≥ 5 pts, p < 0.05, guardrails hold → roll out to 100%.
- Flat: change < 5 pts → check funnel (open vs pay); iterate on copy and run again.
- Lose / guardrail breach: opt-out > 3% → roll back, test a softer “nudge” version.

**Risks:** Randomising by group, not user, means fewer units; we have ~3,000 eligible groups, which is just enough. Check sample ratio mismatch on day 1.
