---
id: w13-estimation
title: Estimation and market sizing
week: 13
estimatedMinutes: 16
tags: [interviews, estimation, market-sizing]
---

## Why this matters for a PM

“How many food delivery orders happen in Bengaluru per day?” or “Estimate the market size for a pet insurance product in India.” Estimation questions test structured reasoning with incomplete information, comfort with numbers and sanity-checking. Real PMs size opportunities constantly to decide what’s worth building. A clear method turns a scary question into an easy one. The built-in Estimation Scratchpad helps you practise.

## Core concepts

### What interviewers assess

- **Structure:** breaking the problem into logical parts.
- **Reasonable assumptions:** stated clearly, with a short justification.
- **Maths:** simple, correct arithmetic with round numbers.
- **Sanity checks:** does the answer make sense compared with something known?
- **Communication:** thinking aloud, writing it down.

They don’t expect the exact real number.

### Two main approaches

**1. Top-down:** start from a large known population and narrow it down with percentages.
> Bengaluru population → households → % who order food online → orders per week → daily orders.

**2. Bottom-up:** start from units of supply or capacity and build up.
> Number of restaurants on delivery apps in Bengaluru → average orders per restaurant per day → total daily orders.

Using both and comparing them is a powerful sanity check.

### Market sizing terms

- **TAM (Total Addressable Market):** total revenue opportunity if everyone who could use the product did.
- **SAM (Serviceable Available Market):** the part of TAM your product can realistically serve (your segment, geography, channel).
- **SOM (Serviceable Obtainable Market):** the share of SAM you can realistically capture in a time frame.

Market size in revenue = number of customers × purchase frequency × price.

### Useful Indian reference numbers (approximate; state them as assumptions)

Interviewers accept reasonable round numbers. Commonly used approximations:
- India population: ~1.4 billion.
- Bengaluru metro population: ~1.3–1.4 crore (13–14 million).
- Average household size in Indian cities: ~4 people.
- Smartphone users in India: several hundred million (often approximated as 600–700 million).
- Working-age share of urban population: roughly 60–65%.
Round generously and say so. Precision isn’t the goal; logic is.

### Indian number units

- 1 lakh = 100,000; 10 lakh = 1 million.
- 1 crore = 10 million = 100 lakh.
- 100 crore = 1 billion.
Be fluent converting between them; many interviewers in India use both systems.

### The step-by-step method

1. **Clarify:** what exactly are we estimating? (Orders or revenue? Per day or year? Which geography? All platforms?)
2. **Choose an approach** (top-down, bottom-up or both) and say why.
3. **Write the formula** before numbers: Daily orders = households × % ordering × orders per household per week ÷ 7.
4. **Segment** where behaviour differs a lot (e.g., heavy, medium, light users; income bands; urban vs. rural).
5. **Make assumptions** one by one, with a short reason each.
6. **Calculate** with round numbers; write each step.
7. **Sanity-check** with a different approach or a known reference.
8. **State the answer** with a range and the most uncertain assumption.
9. **Mention how you’d validate** with real data.

### Segmentation improves accuracy

Instead of one average, split populations: e.g., food delivery users split into heavy (4+ orders/week), medium (1–3/week), light (1–3/month). The weighted result is more realistic and shows sophistication.

## Worked example

**Question:** “Estimate the number of food delivery orders in Bengaluru per day.”

**Clarify:** all platforms combined, restaurant food delivery (not groceries), a typical weekday.

**Top-down:**
- Population ~1.3 crore → ~32 lakh households (÷ 4).
- % households that order food online at least occasionally: assume 40% (urban, tech-heavy city) → ~13 lakh households.
- Segment ordering frequency:
  - Heavy (20% of ordering households): 4 orders/week → 2.6 lakh × 4 = 10.4 lakh/week.
  - Medium (40%): 1.5/week → 5.2 lakh × 1.5 = 7.8 lakh/week.
  - Light (40%): 0.5/week → 5.2 lakh × 0.5 = 2.6 lakh/week.
  - Total ≈ 20.8 lakh orders/week. Plus single professionals in PGs/hostels not captured as households: add ~20% → ~25 lakh/week.
- Daily ≈ 25 lakh ÷ 7 ≈ **3.5 lakh orders/day**.

**Bottom-up sanity check:**
- Restaurants active on delivery apps in Bengaluru: assume ~40,000.
- Average delivery orders per restaurant per day: many small ones get 5–10; popular ones 100+; assume an average of ~10.
- 40,000 × 10 = **4 lakh/day**.

**Answer:** roughly **3.5–4 lakh food delivery orders per day** in Bengaluru, with the % of ordering households and average restaurant volume as the most uncertain assumptions. To validate: platform-reported city volumes, restaurant partner data, or app download/usage panels.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 260" role="img" aria-labelledby="es-t es-d">
<title id="es-t">Top-down and bottom-up estimation</title>
<desc id="es-d">On the left, a top-down tree from population to households to ordering households to segmented frequency to daily orders. On the right, a bottom-up calculation from restaurants times orders per restaurant. Both converge on a range.</desc>
<text x="20" y="22" class="d-text" font-weight="700" font-size="12">Top-down</text>
<g font-size="11">
<rect x="20" y="32" width="250" height="30" rx="6" class="d-lavender d-ink" stroke-width="1.5"/><text x="30" y="52" class="d-text-dark">Population 1.3 crore ÷ 4 → 32 lakh HH</text>
<rect x="40" y="70" width="230" height="30" rx="6" class="d-lavender d-ink" stroke-width="1.5"/><text x="50" y="90" class="d-text-dark">× 40% order online → 13 lakh</text>
<rect x="60" y="108" width="210" height="44" rx="6" class="d-sky d-ink" stroke-width="1.5"/><text x="70" y="126" class="d-text-dark">Segment: heavy / medium / light</text><text x="70" y="142" class="d-text-dark">≈ 25 lakh orders / week</text>
<rect x="80" y="160" width="190" height="30" rx="6" class="d-mint d-ink" stroke-width="1.5"/><text x="90" y="180" class="d-text-dark">÷ 7 → ~3.5 lakh / day</text>
</g>
<text x="360" y="22" class="d-text" font-weight="700" font-size="12">Bottom-up check</text>
<g font-size="11">
<rect x="360" y="32" width="260" height="30" rx="6" class="d-peach d-ink" stroke-width="1.5"/><text x="370" y="52" class="d-text-dark">~40,000 active restaurants</text>
<rect x="360" y="70" width="260" height="30" rx="6" class="d-peach d-ink" stroke-width="1.5"/><text x="370" y="90" class="d-text-dark">× ~10 orders / restaurant / day</text>
<rect x="360" y="108" width="260" height="30" rx="6" class="d-mint d-ink" stroke-width="1.5"/><text x="370" y="128" class="d-text-dark">≈ 4 lakh / day</text>
</g>
<rect x="160" y="210" width="320" height="40" rx="10" class="d-butter d-ink" stroke-width="2"/>
<text x="176" y="235" class="d-text-dark" font-weight="700" font-size="12">Answer: ~3.5–4 lakh orders/day (range + key uncertainty)</text>
</svg>
<figcaption>Two independent routes that land close together give you confidence in the range.</figcaption>
</figure>

## Step by step

Practising estimation (deliverable: 3 recorded answers):

1. **Open the Estimation Scratchpad** in the Toolkit and start the timer (target 10–12 minutes per question).
2. **Clarify** the question (unit, time, geography).
3. **Write the formula** first.
4. **Segment** where behaviour varies.
5. **Assume** with reasons; round numbers.
6. **Calculate** step by step.
7. **Sanity-check** with another approach.
8. **Give a range** and name the most uncertain assumption.
9. **Record on Loom**; review for clarity and arithmetic slips.

## Common mistakes

1. **Starting with numbers** before a structure.
2. **Unstated assumptions** that the interviewer can’t follow.
3. **Over-precision** (“3,47,812 orders”).
4. **No segmentation**, leading to unrealistic averages.
5. **No sanity check.**
6. **Arithmetic errors** from rushing; write steps down.

## How it shows up in interviews

> [!INTERVIEW]
> **“Estimate the annual market for a pet insurance product in India.”**
> Outline: clarify (urban India, dogs and cats, annual premium revenue) → households in target cities → % with pets → % of pet owners who’d buy insurance (by income segment) → average annual premium → TAM/SAM/SOM → sanity check vs. comparable insurance penetration → range + uncertainty.

> [!INTERVIEW]
> **“How many UPI transactions happen in India per day?”**
> Outline: active UPI users × transactions per user per day (segment heavy/medium/light) → compare with any known public statistic you remember (say it’s from memory) → range.

## Practice exercise

**Task (15 minutes each, use the Scratchpad):**
1. How many two-wheeler taxi (bike taxi) rides happen in Bengaluru per day?
2. Estimate the annual revenue opportunity for an AI resume-review subscription for Indian college students (TAM/SAM/SOM).

```answer Reveal a model answer (question 1)
**Clarify:** all bike-taxi platforms, typical weekday, Bengaluru.

**Top-down:** population ~1.3 crore; working/studying commuters ~60% → ~78 lakh; share using bike taxis at least occasionally ~15% → ~11.7 lakh users. Segment: frequent (daily commuters, 25%): 1.5 rides/day → ~4.4 lakh; occasional (75%): 0.2 rides/day → ~1.75 lakh. **Total ≈ 6 lakh rides/day.**

**Bottom-up:** active bike-taxi captains ~1 lakh; average rides per captain per day ~8 (some part-time) → **8 lakh rides/day**.

**Answer:** roughly **5–8 lakh rides/day**; most uncertain: share of commuters using bike taxis and active captain count. Validate with platform-reported ride volumes or traffic survey data.
```

## Quiz

```quiz
Q: What do interviewers mainly evaluate in estimation questions?
- [ ] Whether you know the exact real number :: They don’t expect the exact number.
- [x] Your structure, stated assumptions, arithmetic and sanity checks :: Correct. The reasoning is the answer.
- [ ] How fast you can say a number :: Speed without logic doesn’t help.
- [ ] Your memory of statistics :: Helpful, but logic matters more.

Q: How many lakh are in one crore?
- [ ] 10 :: That’s 10 lakh = 1 million.
- [x] 100 :: Correct. 1 crore = 100 lakh = 10 million.
- [ ] 1,000 :: Too many: 1,000 lakh would be 10 crore.
- [ ] 1 :: Not correct: one lakh is only one-hundredth of a crore.

Q: What is SAM?
- [ ] The total market if everyone bought :: That’s TAM, the widest definition.
- [x] The part of the total market your product can realistically serve :: Correct. It narrows TAM to your segment, geography and channel.
- [ ] The share you’ll capture this year :: That’s SOM, the obtainable share.
- [ ] A type of survey :: Unrelated: SAM is a market-sizing term.

Q: Why segment users in an estimate?
- [ ] To make the answer longer :: Not the goal.
- [x] Because behaviour varies a lot between groups, so segment averages are more realistic :: Correct. Weighted segments beat one blunt average.
- [ ] Interviewers require exactly three segments :: No such rule.
- [ ] It removes the need for assumptions :: You still assume per segment.

Q: Your top-down estimate is 3 lakh/day and your bottom-up is 30 lakh/day. What should you do?
- [ ] Average them and move on :: A 10x gap means an assumption is wrong.
- [x] Re-examine the assumptions behind each; one is likely off by an order of magnitude :: Correct. Big gaps reveal a broken assumption.
- [ ] Pick the bigger number :: No justification.
- [ ] Give up :: Diagnose the gap instead.

Q: How should you present the final answer?
- [ ] As a precise number like 3,47,812 :: False precision.
- [x] As a rounded range with the most uncertain assumption named :: Correct. It’s honest and shows judgement.
- [ ] Without any explanation :: Explanation is the point.
- [ ] As “it depends” :: Commit to an estimate.
```

## Key takeaways

- Estimation tests **structure, assumptions, arithmetic and sanity checks**, not the exact number.
- Use **top-down** and **bottom-up**, and compare them.
- **Write the formula first**, **segment** where behaviour differs, **round** numbers.
- Know **TAM/SAM/SOM** and **lakh/crore** conversions.
- Finish with a **range**, the **most uncertain assumption**, and how you’d **validate**.
