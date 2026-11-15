---
id: w6-ab-design
title: "A/B test design: sample size, power, significance, duration"
week: 6
estimatedMinutes: 18
tags: [experimentation, ab-testing, statistics]
---

## Why this matters for a PM

A/B tests are how product teams separate real effects from noise. But a badly designed test gives confident wrong answers. You don’t need to be a statistician; you need to understand four ideas (significance, power, minimum detectable effect, sample size) well enough to design a test, use a calculator and read results. Your P2 experiment plan needs a sample size and duration.

## Core concepts

### What an A/B test is

An **A/B test** (also called a **split test** or **randomised controlled experiment**) randomly divides users into groups:
- **Control (A):** the current experience.
- **Treatment / variant (B):** the new experience.

Because assignment is **random**, the groups are similar in every way except the change. So if the metric differs more than chance would explain, the change likely caused it. This is why A/B tests beat before/after comparisons, which are confused by seasonality, campaigns and other changes.

### Randomisation unit

Usually you randomise **users** (each user always sees the same version). Sometimes sessions, devices or even cities (when users interact, like in marketplaces). Pick the unit that avoids users seeing both versions.

### The core statistical ideas, in plain English

**1. Noise.** Metrics bounce around naturally. If 10% of users convert in A and 10.4% in B, is that real or luck?

**2. Statistical significance and the p-value.**
- The **p-value** is the probability of seeing a difference at least this big **if the change actually had no effect** (if the null hypothesis were true).
- A small p-value (commonly below **0.05**) means the result would be surprising under “no effect”, so we call it **statistically significant**.
- The threshold 0.05 is called **alpha (α)**, the **significance level**. It’s the false-positive rate you accept: with α = 0.05, if a change truly does nothing, you’ll still wrongly declare a win about 5% of the time.
- A p-value is **not** “the probability the change works”. A common misunderstanding.

**3. Confidence interval.** A range of plausible values for the true effect. “+0.6 percentage points, 95% CI [+0.1, +1.1]” means the data are consistent with a true lift anywhere in that range. If the interval excludes zero, the result is significant at α = 0.05. Intervals are more informative than a yes/no.

**4. Statistical power.**
- **Power** is the probability your test detects an effect **if a real effect of a given size exists**. Commonly set at **80%**.
- Low power means you’ll often miss real improvements (a **false negative**), and declare “no effect” wrongly.

**5. Minimum detectable effect (MDE).**
- The **smallest effect you care about detecting**, decided before the test. Usually stated as an absolute change (“+1 percentage point”) or relative change (“+5% relative”).
- Smaller MDEs need much bigger samples. Halving the MDE roughly **quadruples** the sample size.
- Choose the MDE based on business value: what lift is worth shipping and maintaining?

**6. Baseline rate.** The current value of the metric (e.g., 20% checkout conversion). Needed to calculate sample size.

### Sample size

Given **baseline rate, MDE, α and power**, you can calculate the users needed **per group**. A common approximation for conversion rates (two groups, two-sided test):

> n per group ≈ (z₁₋α/₂ + z₁₋β)² × [p₁(1−p₁) + p₂(1−p₂)] ÷ (p₂ − p₁)²

where p₁ is the baseline, p₂ = baseline + MDE, and for α = 0.05 and 80% power the z-values sum to about 1.96 + 0.84 = 2.80 (squared ≈ 7.85).

**Example:** baseline 20%, MDE +2 points (to 22%):
- p₁(1−p₁) = 0.16; p₂(1−p₂) = 0.1716; sum ≈ 0.3316
- (p₂−p₁)² = 0.0004
- n ≈ 7.85 × 0.3316 ÷ 0.0004 ≈ **6,500 users per group**, ~13,000 total.

You don’t need to memorise this: the **A/B calculator in the Toolkit** does it. But knowing the shape helps: **rarer baselines and smaller MDEs need more users.**

### Duration

**Duration = total sample needed ÷ eligible users per day** (users who actually reach the tested experience). Then:
- **Round up to full weeks** (at least 1–2 full weeks) to cover weekday/weekend patterns.
- **Don’t stop early** because results look good (see pitfalls next lesson).
- Avoid unusual periods (festivals, big sales) unless you’re testing for them.

Example: 13,000 users needed; 1,500 eligible users per day reach checkout → ~9 days → run **14 days** (two full weeks).

### Choosing metrics for the test

- **Primary metric:** the one that decides ship/no-ship (from your hypothesis).
- **Secondary metrics:** help explain the result.
- **Guardrails:** must not degrade beyond a threshold.

### Reading results

- **Significant positive** with guardrails OK → ship (consider the confidence interval: is even the low end worth it?).
- **Not significant** → you didn’t find evidence of an effect at least as big as your MDE. It doesn’t prove “no effect”. Check it was adequately powered.
- **Significant negative** → don’t ship; learn why.
- **Check sample ratio:** if you planned 50/50 and got 52/48 with large numbers, something may be broken in assignment (a **sample ratio mismatch**, SRM). Investigate before trusting results.

## Worked example

**P2 experiment plan: “Location before account creation.”**

- **Hypothesis:** asking for location first increases 7-day activation for serviceable sign-ups from 27% to 30%.
- **Randomisation:** new users at first app open, 50/50 by device ID.
- **Primary metric:** 7-day activation (first order within 7 days) among new users.
- **Baseline:** 27%. **MDE:** +3 points absolute (to 30%). α = 0.05 (two-sided), power = 80%.
- **Sample size:** p₁(1−p₁) = 0.27 × 0.73 = 0.1971; p₂(1−p₂) = 0.30 × 0.70 = 0.21; sum = 0.4071; (0.03)² = 0.0009 → n ≈ 7.85 × 0.4071 ÷ 0.0009 ≈ **3,550 per group**, ~7,100 total.
- **Traffic:** ~900 new users/day → ~8 days → but the metric needs a **7-day window after each sign-up**, so: enrol for **14 days** (two full weeks), then wait 7 more days for the last users’ outcomes. Read results on day 21.
- **Guardrails:** completed sign-ups not down > 5%; first-order AOV not down > 3%; crash-free sessions ≥ 99.5%.
- **Decision rules:** ship if activation lift is significant and guardrails hold; if flat, investigate other hypotheses; if sign-ups fall > 5%, revert.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 260" role="img" aria-labelledby="ab-t ab-d">
<title id="ab-t">Sample size drivers</title>
<desc id="ab-d">A random split sends users to control and variant. A side panel shows that smaller minimum detectable effects, lower baselines, higher power and stricter significance all increase required sample size.</desc>
<defs><marker id="ab-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="20" y="95" width="110" height="60" rx="10" class="d-surface d-ink" stroke-width="2"/>
<text x="34" y="122" class="d-text" font-weight="700" font-size="12">New users</text>
<text x="34" y="140" class="d-text" font-size="11">random split</text>
<rect x="170" y="40" width="140" height="60" rx="10" class="d-sky d-ink" stroke-width="2"/>
<text x="184" y="66" class="d-text-dark" font-weight="700" font-size="12">A · control</text>
<text x="184" y="86" class="d-text-dark" font-size="11">27% activate</text>
<rect x="170" y="150" width="140" height="60" rx="10" class="d-mint d-ink" stroke-width="2"/>
<text x="184" y="176" class="d-text-dark" font-weight="700" font-size="12">B · variant</text>
<text x="184" y="196" class="d-text-dark" font-size="11">30% activate?</text>
<line x1="132" y1="115" x2="166" y2="75" class="d-ink" stroke-width="2" marker-end="url(#ab-a)"/>
<line x1="132" y1="135" x2="166" y2="175" class="d-ink" stroke-width="2" marker-end="url(#ab-a)"/>
<rect x="350" y="20" width="270" height="220" rx="10" class="d-butter d-ink" stroke-width="2"/>
<text x="366" y="46" class="d-text-dark" font-weight="700">Needs MORE users when…</text>
<text x="366" y="76" class="d-text-dark" font-size="12">• MDE is smaller (½ MDE ≈ 4× users)</text>
<text x="366" y="104" class="d-text-dark" font-size="12">• Baseline rate is rare (e.g., 2%)</text>
<text x="366" y="132" class="d-text-dark" font-size="12">• Power is higher (90% vs 80%)</text>
<text x="366" y="160" class="d-text-dark" font-size="12">• Alpha is stricter (0.01 vs 0.05)</text>
<text x="366" y="196" class="d-text-dark" font-size="12">Duration = sample ÷ eligible users/day,</text>
<text x="366" y="216" class="d-text-dark" font-size="12">rounded up to full weeks</text>
</svg>
<figcaption>Use the Toolkit’s A/B calculator for exact numbers; know these directions by heart.</figcaption>
</figure>

## Step by step

Designing your P2 experiment:

1. **Write the hypothesis** (previous lesson).
2. **Choose the randomisation unit** and who is eligible.
3. **Pick the primary metric** and find its **baseline**.
4. **Choose the MDE** based on business value.
5. **Set α (0.05) and power (80%)** unless there’s a reason to change.
6. **Calculate sample size per group** with the Toolkit calculator.
7. **Calculate duration** from eligible daily traffic; round up to full weeks; add the metric’s measurement window.
8. **List guardrails** with thresholds.
9. **Write decision rules** for each outcome.
10. **Plan QA**: check both versions work, tracking fires, and the split is 50/50 on day 1 (SRM check).

## Common mistakes

1. **No sample size calculation**, then stopping when results “look” significant.
2. **MDE chosen to fit available traffic** rather than business value, or MDE too small to ever detect.
3. **Before/after comparisons** instead of randomised tests.
4. **Runs shorter than a week**, missing weekly patterns.
5. **Interpreting p-values as the probability the change works.**
6. **Ignoring sample ratio mismatch**, a sign of broken assignment.

## How it shows up in interviews

> [!INTERVIEW]
> **“How would you design an A/B test for [change]?”**
> Outline: hypothesis → unit and eligibility → primary metric, baseline, MDE → α and power → sample size and duration → guardrails → decision rules → QA and SRM check.

> [!INTERVIEW]
> **“What does a p-value of 0.03 mean?”**
> Outline: if there were no real effect, there’d be a 3% chance of seeing a difference at least this large → below 0.05, so significant at that level → it does not mean a 97% chance the variant is better → look at the confidence interval and practical significance.

## Practice exercise

**Task (30 minutes, use the Toolkit’s A/B calculator to check):** Swiggy tests a new “Reorder” card on the home screen. Baseline: 12% of returning users place a reorder within 7 days. MDE: +1.5 points (to 13.5%). α = 0.05, power 80%. 20,000 eligible returning users open the app per day. Calculate sample size per group, total, and duration. Then list 2 guardrails.

```answer Reveal a model answer
- p₁ = 0.12 → p₁(1−p₁) = 0.1056
- p₂ = 0.135 → p₂(1−p₂) = 0.116775
- Sum ≈ 0.2224; (p₂−p₁)² = 0.000225
- n ≈ 7.85 × 0.2224 ÷ 0.000225 ≈ **7,760 per group** → ~15,500 total.

**Duration:** 15,500 ÷ 20,000 per day ≈ 0.8 days, but run at least **7 full days** (ideally 14) to capture weekly patterns, then allow the 7-day outcome window for the last enrolled users. The calculator may give a slightly different number (it uses exact formulas), which is fine.

**Guardrails:** orders from new-to-user restaurants (discovery) not down more than 5%; app home screen load time p95 not up more than 100 ms.
```

## Quiz

```quiz
Q: What does randomisation achieve in an A/B test?
- [ ] It makes the test faster :: Not its purpose.
- [x] It makes groups comparable, so differences can be attributed to the change :: Correct. Random assignment balances everything except the change itself.
- [ ] It guarantees a positive result :: It guarantees nothing about the result.
- [ ] It removes the need for sample size :: You still need enough users.

Q: What’s the correct interpretation of p = 0.04?
- [ ] There’s a 96% chance the variant is better :: A common but wrong interpretation.
- [x] If there were no real effect, a difference this large would occur about 4% of the time :: Correct. The p-value describes the data under “no effect”, not the chance the variant works.
- [ ] The effect is 4% :: The p-value isn’t the effect size.
- [ ] 4% of users saw the variant :: Unrelated: the p-value says nothing about how many users saw the variant.

Q: What is statistical power?
- [ ] The size of the effect :: That’s effect size.
- [x] The probability of detecting a real effect of a given size if it exists :: Correct. With 80% power, a real effect of your MDE is detected 4 times out of 5.
- [ ] The probability of a false positive :: That’s alpha.
- [ ] The number of users in the test :: Sample size affects power but isn’t power.

Q: You halve your minimum detectable effect. Roughly what happens to the sample size?
- [ ] It halves :: The opposite direction.
- [ ] It doubles :: Underestimates the effect.
- [x] It roughly quadruples :: Correct. Sample size scales with 1/MDE².
- [ ] It stays the same :: MDE strongly affects sample size.

Q: Why run tests for at least one full week?
- [ ] Statistics require 7 days :: Not a formula requirement.
- [x] To capture weekday and weekend behaviour differences :: Correct. Partial weeks over- or under-represent certain days and can bias results.
- [ ] Because tools can’t stop earlier :: Tools can stop anytime; full weeks are about behaviour patterns.
- [ ] To get a bigger p-value :: Not a goal: you never aim for a particular p-value.

Q: You planned a 50/50 split but see 53,000 vs. 47,000 users. What should you do?
- [ ] Ignore it; close enough :: With large numbers, this is a significant imbalance.
- [x] Investigate a possible sample ratio mismatch before trusting results :: Correct. Assignment or tracking may be broken.
- [ ] Declare the bigger group the winner :: Group size isn’t an outcome.
- [ ] Double the test length :: Doesn’t fix broken assignment.
```

## Key takeaways

- A/B tests use **random assignment** so differences can be attributed to the change.
- **p-value**: how surprising the data would be if there were no effect; **α = 0.05** is the usual false-positive tolerance.
- **Power (80%)** is the chance of detecting a real effect of your **MDE**; smaller MDEs need far more users.
- **Sample size** depends on **baseline, MDE, α and power**; **duration** = sample ÷ eligible daily users, rounded up to **full weeks**.
- Read results with **confidence intervals**, **guardrails**, pre-set **decision rules**, and an **SRM check**.
