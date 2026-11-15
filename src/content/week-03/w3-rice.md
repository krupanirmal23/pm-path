---
id: w3-rice
title: RICE prioritization
week: 3
estimatedMinutes: 14
tags: [prioritization, frameworks, rice]
---

## Why this matters for a PM

You will always have more ideas than capacity. **RICE** is a simple scoring method that forces you to estimate reach, impact, confidence and effort for every idea, so you compare them on the same scale instead of by gut or seniority. It’s used widely, asked about in interviews, and the backbone of your P1 roadmap this week.

## Core concepts

### The formula

**RICE score = (Reach × Impact × Confidence) ÷ Effort**

- **Reach:** how many people the idea will affect in a set time period. Use a real number: “users per quarter”. Example: 8,000 users per quarter see the checkout page.
- **Impact:** how much it will move the goal for each person reached. Use a fixed scale:
  - 3 = massive
  - 2 = high
  - 1 = medium
  - 0.5 = low
  - 0.25 = minimal
- **Confidence:** how sure you are about your reach and impact estimates, as a percentage:
  - 100% = high (strong data and research)
  - 80% = medium (some evidence)
  - 50% = low (mostly a guess)
  - Below 50%: treat it as a “moonshot” and consider testing before scoring.
- **Effort:** total work needed from everyone (product, design, engineering), in **person-months** (or person-weeks). A **person-month** is one person working for a month. Two engineers for two weeks plus a designer for one week ≈ 1.25 person-months.

Higher score = more value per unit of effort.

### A worked calculation

Idea: “Show all-in price from the first item in the cart.”
- Reach: 20,000 users per quarter reach the cart.
- Impact: 2 (high), because research says hidden fees are the top complaint.
- Confidence: 80% (strong review evidence, no experiment yet).
- Effort: 1 person-month.

RICE = (20,000 × 2 × 0.8) ÷ 1 = **32,000**.

Idea: “Redesign the whole home screen.”
- Reach: 60,000 per quarter.
- Impact: 1 (medium; unclear).
- Confidence: 50%.
- Effort: 6 person-months.

RICE = (60,000 × 1 × 0.5) ÷ 6 = **5,000**.

The cart fix wins clearly, even though the home screen reaches three times more people.

### Why each factor matters

- **Reach** stops you overvaluing ideas that only help a tiny group.
- **Impact** stops you overvaluing ideas that reach many people but change little.
- **Confidence** discounts exciting ideas with no evidence, and rewards research.
- **Effort** makes cheap wins visible.

### Using RICE well

- **Define the goal first.** Impact means “impact on *this* goal”. Change the goal and impact scores change.
- **Use the same time period for reach** across all ideas.
- **Get effort from engineers and designers**, not from your own guess.
- **Use ranges honestly.** If unsure, lower confidence rather than inflating impact.
- **Treat the score as a conversation starter**, not a verdict. If the ranking feels wrong, find out which estimate is off.

### Limitations

- **False precision.** Scores look exact but rest on estimates.
- **Ignores dependencies.** Idea B may require idea A first.
- **Ignores strategy.** A low-scoring idea might be essential for a strategic bet (e.g., entering a new market).
- **Struggles with must-dos.** Legal, security and reliability work may not score well but must happen. Handle them separately (a “keep the lights on” budget).
- **Can be gamed.** People inflate impact for their favourite ideas. Ask for evidence behind each number.

## Worked example

**P1 (flatmate expense app). Goal: increase groups settling monthly without disputes. 10 ideas scored by the team (illustrative).**

| Idea | Reach (groups/qtr) | Impact | Confidence | Effort (person-months) | RICE |
|---|---|---|---|---|---|
| Auto monthly settle-up summary | 3,000 | 3 | 80% | 2 | 3,600 |
| Import shared UPI payments | 3,000 | 2 | 50% | 4 | 750 |
| Recurring bills templates (rent, Wi-Fi) | 2,500 | 1 | 80% | 1 | 2,000 |
| WhatsApp settle-up link | 3,000 | 2 | 80% | 1 | 4,800 |
| Cash expense quick-add widget | 1,500 | 1 | 80% | 0.5 | 2,400 |
| Shared grocery pool wallet | 3,000 | 2 | 50% | 6 | 500 |
| Dark mode | 3,000 | 0.25 | 100% | 0.5 | 1,500 |
| Expense categories and charts | 1,000 | 0.5 | 80% | 1.5 | 267 |
| Friendly reminder nudges | 2,000 | 1 | 50% | 0.5 | 2,000 |
| Multi-currency support | 100 | 1 | 80% | 2 | 40 |

**Ranking:** WhatsApp settle-up link (4,800) → auto monthly summary (3,600) → cash quick-add (2,400) → recurring templates / reminders (2,000)…

**Discussion:** The auto monthly summary is the core strategic bet and the WhatsApp link depends on it, so the PM sequences them together in “Now”. UPI import scores lower because of low confidence; the PM proposes a one-week spike to raise confidence before rescoring. Multi-currency is clearly “later or never”.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 170" role="img" aria-labelledby="rice-t rice-d">
<title id="rice-t">The RICE formula</title>
<desc id="rice-d">Reach times impact times confidence, divided by effort.</desc>
<rect x="20" y="40" width="120" height="70" rx="10" class="d-sky d-ink" stroke-width="2"/>
<text x="36" y="68" class="d-text-dark" font-weight="700" font-size="18">Reach</text>
<text x="36" y="92" class="d-text-dark" font-size="11">people / quarter</text>
<text x="150" y="84" class="d-text" font-size="26" font-weight="700">×</text>
<rect x="175" y="40" width="120" height="70" rx="10" class="d-lavender d-ink" stroke-width="2"/>
<text x="191" y="68" class="d-text-dark" font-weight="700" font-size="18">Impact</text>
<text x="191" y="92" class="d-text-dark" font-size="11">3 / 2 / 1 / .5 / .25</text>
<text x="305" y="84" class="d-text" font-size="26" font-weight="700">×</text>
<rect x="330" y="40" width="130" height="70" rx="10" class="d-mint d-ink" stroke-width="2"/>
<text x="344" y="68" class="d-text-dark" font-weight="700" font-size="18">Confidence</text>
<text x="344" y="92" class="d-text-dark" font-size="11">100 / 80 / 50 %</text>
<text x="470" y="84" class="d-text" font-size="26" font-weight="700">÷</text>
<rect x="495" y="40" width="125" height="70" rx="10" class="d-peach d-ink" stroke-width="2"/>
<text x="511" y="68" class="d-text-dark" font-weight="700" font-size="18">Effort</text>
<text x="511" y="92" class="d-text-dark" font-size="11">person-months</text>
<text x="140" y="150" class="d-text" font-size="13">Value per unit of effort. Higher = do sooner.</text>
</svg>
<figcaption>Use the built-in RICE Calculator in the Toolkit to score and sort ideas instantly.</figcaption>
</figure>

## Step by step

1. **State the goal** the ideas are scored against.
2. **List 10–15 ideas**, each in one clear sentence (link to the opportunity it addresses).
3. **Estimate reach** for the same time period using real data or research-based estimates. Write your source.
4. **Score impact** on the 3/2/1/0.5/0.25 scale, with one line of reasoning.
5. **Set confidence** honestly based on evidence quality.
6. **Get effort estimates** from an engineer (or a technical friend for P1), in person-months.
7. **Calculate and sort** (use the RICE Calculator or Google Sheets with formulas).
8. **Sanity-check the top 5**: dependencies? strategic must-haves? surprising results?
9. **Adjust the sequence** where needed and **write down why** you deviated from the score.
10. **Put the result into Now / Next / Later** (see the roadmaps lesson).

## Common mistakes

1. **Scoring without a goal.** Impact is meaningless without “impact on what?”.
2. **Inflating impact** for pet ideas. Ask for the evidence.
3. **Mixing time periods** for reach (some per month, some per year).
4. **PM-only effort estimates.** Engineers must estimate effort.
5. **Treating the score as final.** Use it to structure discussion.
6. **Forgetting must-dos.** Handle compliance and reliability outside RICE.

## How it shows up in interviews

> [!INTERVIEW]
> **“How do you prioritise features?”**
> Outline: start with the goal → gather ideas tied to opportunities → score with a framework like RICE (explain the four factors) → sanity-check for dependencies and strategy → sequence into Now/Next/Later → communicate trade-offs. Mention limitations to show maturity.

> [!INTERVIEW]
> **“You have three features and capacity for one. Walk me through your decision.”**
> Outline: clarify the goal → estimate reach, impact, confidence, effort for each (say numbers out loud) → compare → consider risks and dependencies → decide and explain what you’d tell the stakeholders of the two you didn’t pick.

## Practice exercise

**Task (25 minutes):** Score these four ideas for Swiggy Instamart with the goal “increase weekly repeat orders”. Reach is per quarter. Show your calculation and ranking, then say what might change your mind.

1. “Buy again” list on the home screen. Reach 400,000; you think high impact; good data from similar features; 1.5 person-months.
2. Recipe-based shopping (add all ingredients for a dish). Reach 100,000; medium impact; little evidence; 5 person-months.
3. Scheduled weekly basket. Reach 150,000; high impact for those who use it; some survey evidence; 4 person-months.
4. Faster search autocomplete. Reach 500,000; low impact; strong data; 1 person-month.

```answer Reveal a model answer
1. Buy again: (400,000 × 2 × 0.8) ÷ 1.5 = **426,667**
2. Recipes: (100,000 × 1 × 0.5) ÷ 5 = **10,000**
3. Scheduled basket: (150,000 × 2 × 0.8) ÷ 4 = **60,000** (some evidence: 80%; if you consider surveys weak, 50% → 37,500)
4. Autocomplete: (500,000 × 0.5 × 1.0) ÷ 1 = **250,000**

**Ranking:** Buy again → Autocomplete → Scheduled basket → Recipes.

**What could change my mind:** if “Buy again” already exists in a less visible place (reach of the improvement is smaller); if scheduled baskets are a strategic bet to lock in households (strategy may justify doing it earlier); if recipes drive higher basket size, which matters for profitability (a different goal would change impact).
```

## Quiz

```quiz
Q: What does the “C” in RICE stand for and do?
- [ ] Cost: the money needed :: Cost is captured in Effort, not C.
- [x] Confidence: discounts the score based on how strong your evidence is :: Correct. It rewards research and penalises guesses.
- [ ] Customers: the number of customers :: That’s Reach.
- [ ] Complexity: technical difficulty :: Complexity is part of Effort.

Q: Idea A: reach 10,000, impact 2, confidence 80%, effort 2. What’s its RICE score?
- [ ] 16,000 :: That’s before dividing by effort.
- [x] 8,000 :: Correct. (10,000 × 2 × 0.8) ÷ 2 = 8,000.
- [ ] 20,000 :: Ignores confidence and effort.
- [ ] 4,000 :: Divides by effort twice.

Q: Why must effort estimates come from engineers and designers?
- [ ] PMs aren’t allowed to estimate :: There’s no rule; it’s about accuracy.
- [x] They do the work and understand the real complexity, so estimates are more accurate and owned by the team :: Correct. People doing the work see hidden complexity, and estimates they own are ones they’ll stand behind.
- [ ] RICE requires it by definition :: It doesn’t, but good practice does.
- [ ] Engineers prefer high estimates :: Not the reason.

Q: A compliance change required by RBI scores low on RICE. What should you do?
- [ ] Skip it because the score is low :: Legal requirements aren’t optional.
- [x] Handle it outside RICE as a must-do, with reserved capacity :: Correct. Frameworks don’t cover non-negotiables well.
- [ ] Inflate its impact so it ranks high :: Gaming the score undermines trust in the method.
- [ ] Ask users to vote on it :: Users can’t waive regulations.

Q: Which is a known limitation of RICE?
- [ ] It ignores how many people are affected :: Reach covers that.
- [x] It doesn’t capture dependencies or strategic importance well :: Correct. Sanity-check the ranking for these.
- [ ] It can’t compare more than three ideas :: It can compare any number.
- [ ] It requires an A/B test for each idea :: It doesn’t; RICE uses estimates, though tests can raise confidence.

Q: Your scores rank a small UI tweak above the core strategic bet. What’s the best response?
- [ ] Always follow the score :: Scores are inputs, not verdicts.
- [ ] Ignore RICE entirely :: The score is still useful information.
- [x] Check the estimates, then sequence with judgment and document why you deviated :: Correct. Transparency keeps the process trustworthy.
- [ ] Delete the strategic bet :: Strategy may justify doing it earlier.
```

## Key takeaways

- **RICE = (Reach × Impact × Confidence) ÷ Effort**: value per unit of effort.
- Score against **one clear goal**, use a **consistent reach period**, and get **effort from the team**.
- **Confidence** rewards evidence and discounts guesses; use spikes or tests to raise it.
- The score **starts the conversation**: check dependencies, strategy and must-dos.
- Document any deviation from the ranking so decisions stay **transparent**.

*Go deeper (optional):* Intercom’s original blog post introducing RICE.
