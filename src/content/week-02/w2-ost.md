---
id: w2-ost
title: Opportunity solution trees
week: 2
estimatedMinutes: 14
tags: [discovery, frameworks, prioritization]
---

## Why this matters for a PM

Research produces dozens of problems and ideas. Without structure, teams jump at whichever idea is loudest. An **opportunity solution tree (OST)** connects one business outcome to the user problems that could move it, to the solutions that address each problem, to the tests that would prove them. It makes your thinking visible and keeps you honest about *why* you’re building anything. It’s part of your P1 discovery report.

## Core concepts

### The four levels of the tree

1. **Outcome (the root):** the measurable result you want, from the outcomes lesson. “Increase the share of flatmate groups who settle up every month without disputes from 30% to 50%.” One outcome per tree.
2. **Opportunities:** user needs, pain points or desires that, if addressed, would move the outcome. These come from research. Write them from the user’s point of view: “I avoid asking friends for small amounts.” Opportunities are problems, *not* solutions.
3. **Solutions:** ideas that address a specific opportunity. “Auto-settle small amounts monthly”, “shared wallet for groceries”.
4. **Experiments (assumption tests):** small tests that check whether a solution will work. “Fake-door test of ‘auto-settle’ with 50 users.”

The structure forces a clear chain: *this experiment tests this solution, which addresses this opportunity, which should move this outcome.*

### Opportunities can nest

Big opportunities break into smaller, more specific ones. “Settling up causes social discomfort” might break into:
- “I don’t want to be the one who asks.”
- “Small amounts feel petty to chase.”
- “It’s unclear who owes what for shared items.”

Smaller opportunities are easier to solve. A good rule: keep breaking down until an opportunity is specific enough that you can imagine several solutions for it.

### Compare and choose, don’t just list

The tree is a decision tool:
- **Choose one target opportunity** at a time, based on how many users it affects, how painful it is, and how much it would move the outcome.
- **Generate at least three solutions** for that opportunity, so you’re comparing rather than confirming.
- **Identify the riskiest assumption** behind each solution (use the four risks) and test those first.

This approach, called **continuous discovery**, was popularised by Teresa Torres: a team keeps talking to users weekly and keeps updating its tree.

### What an OST is not

- Not a roadmap with dates.
- Not a feature list. If your opportunities read like features (“add reminders”), you’ve skipped a level.
- Not static. It changes every week as you learn.

## Worked example

**Product: an expense-sharing app for flatmates (P1 example).**

**Outcome:** % of flatmate groups who settle up monthly without disputes: 30% → 50% in one quarter.

**Opportunities (from affinity themes):**
- O1. “I’d rather lose money than argue with friends.” (5 of 6)
  - O1a. “I don’t want to be the one who asks.”
  - O1b. “Small amounts feel petty to chase.”
- O2. “Logging every expense is a chore.” (4 of 6)
  - O2a. “Expenses are spread across UPI, cards and cash.”
  - O2b. “I forget the amount by the time I sit down to log it.”
- O3. “Random small purchases cause fights.” (4 of 6)

**Target opportunity:** O1a, because it explains why existing tools fail even when tracking works: someone still has to ask.

**Solutions for O1a:**
- S1. Automatic monthly settlement: the app sends neutral, system-generated requests on the 1st, so no person “asks”.
- S2. Shared pool: each flatmate auto-transfers a fixed amount monthly into a shared UPI-linked pool for groceries.
- S3. “Settle with one tap” summary posted to the flat’s WhatsApp group by a bot.

**Riskiest assumptions and experiments:**
- S1: Value: “Users will accept system-generated requests as neutral.” → Test: send 10 flat groups a mock “Monthly summary from FlatBot” message manually and interview them after.
- S2: Viability/feasibility: “Users trust a shared pool with real money.” → Test: survey 20 people on a concrete pool offer with real amounts; check regulatory constraints.
- S3: Usability: “Groups will tap through from WhatsApp.” → Test: a WhatsApp message with a link to a simple page; measure tap-through.

The PM picks S1’s test first: cheapest, and it directly tests the core insight.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 300" role="img" aria-labelledby="ost-t ost-d">
<title id="ost-t">Opportunity solution tree</title>
<desc id="ost-d">An outcome at the top branches into three opportunities; one opportunity branches into three solutions, each with an experiment below.</desc>
<g class="d-ink" stroke-width="2" fill="none">
<line x1="320" y1="62" x2="110" y2="100"/><line x1="320" y1="62" x2="320" y2="100"/><line x1="320" y1="62" x2="530" y2="100"/>
<line x1="320" y1="146" x2="160" y2="180"/><line x1="320" y1="146" x2="320" y2="180"/><line x1="320" y1="146" x2="480" y2="180"/>
<line x1="160" y1="222" x2="160" y2="246"/><line x1="320" y1="222" x2="320" y2="246"/><line x1="480" y1="222" x2="480" y2="246"/>
</g>
<rect x="190" y="14" width="260" height="48" rx="10" class="d-mint d-ink" stroke-width="2"/>
<text x="206" y="35" class="d-text-dark" font-weight="700" font-size="12">Outcome: groups settling monthly</text>
<text x="206" y="52" class="d-text-dark" font-size="11">30% → 50% this quarter</text>
<rect x="30" y="100" width="160" height="46" rx="10" class="d-surface d-ink" stroke-width="2"/>
<text x="42" y="128" class="d-text" font-size="11">O2: Logging is a chore</text>
<rect x="240" y="100" width="160" height="46" rx="10" class="d-butter d-ink" stroke-width="3"/>
<text x="250" y="120" class="d-text-dark" font-size="11" font-weight="700">O1a: I don’t want to</text>
<text x="250" y="136" class="d-text-dark" font-size="11" font-weight="700">be the one who asks</text>
<rect x="450" y="100" width="160" height="46" rx="10" class="d-surface d-ink" stroke-width="2"/>
<text x="462" y="128" class="d-text" font-size="11">O3: Random buys = fights</text>
<rect x="95" y="180" width="130" height="42" rx="10" class="d-sky d-ink" stroke-width="2"/>
<text x="105" y="205" class="d-text-dark" font-size="11">S1: Auto settlement</text>
<rect x="255" y="180" width="130" height="42" rx="10" class="d-sky d-ink" stroke-width="2"/>
<text x="265" y="205" class="d-text-dark" font-size="11">S2: Shared pool</text>
<rect x="415" y="180" width="130" height="42" rx="10" class="d-sky d-ink" stroke-width="2"/>
<text x="425" y="205" class="d-text-dark" font-size="11">S3: WhatsApp bot</text>
<rect x="95" y="246" width="130" height="40" rx="10" class="d-lavender d-ink" stroke-width="2"/>
<text x="105" y="270" class="d-text-dark" font-size="10">Test: mock message</text>
<rect x="255" y="246" width="130" height="40" rx="10" class="d-lavender d-ink" stroke-width="2"/>
<text x="265" y="270" class="d-text-dark" font-size="10">Test: pool survey</text>
<rect x="415" y="246" width="130" height="40" rx="10" class="d-lavender d-ink" stroke-width="2"/>
<text x="425" y="270" class="d-text-dark" font-size="10">Test: link tap-through</text>
</svg>
<figcaption>One outcome → opportunities from research → several solutions for the target opportunity → a test for each.</figcaption>
</figure>

## Step by step

1. **Write the outcome** at the top: measurable, with a baseline and target.
2. **Add opportunities** from your affinity themes, worded as user needs or pains. Check: no features.
3. **Break big opportunities into smaller ones** until each is specific.
4. **Score opportunities** quickly: how many users (from your research counts), how painful, how much they’d move the outcome. Pick one target.
5. **Brainstorm 3+ solutions** for the target opportunity. Include one “boring” option and one bold one.
6. **For each solution, list assumptions** across value, usability, feasibility and viability. Star the riskiest.
7. **Design a small test** for each starred assumption, with a success threshold set in advance.
8. **Draw it in Miro** (see the tool guide), and keep it updated weekly.
9. **In your report**, explain why you chose the target opportunity and the first test.

## Common mistakes

1. **Opportunities written as solutions.** “Add reminders” belongs on the solution level.
2. **One solution per opportunity.** You’re confirming, not comparing.
3. **Multiple outcomes in one tree.** Keep one outcome so trade-offs are clear.
4. **Opportunities with no research behind them.** Every opportunity should trace back to evidence.
5. **Skipping experiments.** Without tests, the tree is just a nicer-looking wish list.
6. **Building the tree once.** It’s a living document that changes as you learn.

## How it shows up in interviews

> [!INTERVIEW]
> **“How do you decide what to build next?”**
> Outline: start from the outcome → opportunities from research and data → pick the target opportunity (size, pain, impact) → compare several solutions → test the riskiest assumptions cheaply → build what survives. Mention the OST as how you keep it visible.

> [!INTERVIEW]
> **“Tell me about a time you killed an idea.”**
> Outline: the idea and the assumption behind it → the test you ran and the threshold → the result → the decision → what you built instead. Shows evidence-based discipline.

## Practice exercise

**Task (35 minutes):** Build an OST for this outcome: *“Increase the share of new Groww users who are still investing 90 days after their first SIP from 45% to 60%.”* Include 3 opportunities (one broken into 2 sub-opportunities), 3 solutions for your target opportunity, and one experiment per solution.

```answer Reveal a model answer
**Outcome:** 90-day SIP continuation: 45% → 60%.

**Opportunities**
- O1. “I panic when my investment shows red.”
  - O1a. “I don’t know if a drop is normal.”
  - O1b. “I check the app too often and see every dip.”
- O2. “My SIP failed because my account didn’t have money that day.”
- O3. “I forget why I started; it feels like money disappearing.”

**Target:** O1a. Early drops are common for new investors and the panic moment is when they stop.

**Solutions**
- S1. Contextual explainer on the portfolio screen when value is below invested amount: “Normal for funds like this; X% of 3-year periods ended positive.”
- S2. A 3-message “first market dip” guide sent the first time a user’s portfolio falls 5%.
- S3. Default portfolio view shows long-term progress toward a goal instead of daily change.

**Experiments**
- S1: Show a static explainer to 10% of new users with negative returns; measure SIP pause rate vs. control over 30 days (threshold: 20% fewer pauses).
- S2: Manually email the guide to 200 users in a dip; measure open rate and pause rate (threshold: 15% fewer pauses).
- S3: Prototype test with 6 new investors: do they feel calmer and still understand their returns? (threshold: 5 of 6.)
```

## Quiz

```quiz
Q: What belongs at the root of an opportunity solution tree?
- [ ] The feature you most want to build :: Features belong on the solution level.
- [x] One measurable outcome :: Correct. Everything below it must connect back to moving that outcome.
- [ ] A list of user personas :: Personas inform opportunities but aren’t the root.
- [ ] The company mission :: Too broad to guide a team’s tree.

Q: Which is correctly written as an opportunity?
- [ ] Add push notifications for reminders :: That’s a solution.
- [x] “I forget to log expenses until I can’t remember the amount” :: Correct. A user need or pain, with no solution in it.
- [ ] Build a shared wallet :: That’s a solution.
- [ ] Increase retention by 10% :: That’s an outcome.

Q: Why generate at least three solutions for the target opportunity?
- [ ] Because you will build all three :: Usually you’ll test and build only the best one.
- [x] To compare options instead of confirming your first idea :: Correct. Comparison reveals trade-offs and better ideas.
- [ ] Because trees must be symmetrical :: There’s no such rule.
- [ ] Because stakeholders like long lists :: Not the reason.

Q: What should an experiment on the tree test?
- [ ] Whether the team likes the solution :: Team preference isn’t evidence.
- [x] The riskiest assumption behind a solution, with a success threshold set in advance :: Correct. Cheap tests on risky assumptions are the point.
- [ ] The entire finished feature :: That’s building, not testing.
- [ ] The outcome directly :: Experiments test solutions; outcomes are measured over time.

Q: How often should an OST be updated?
- [ ] Never, once it’s drawn :: It should change as you learn.
- [ ] Once a year :: Too slow for active discovery.
- [x] Continuously, as new research and test results come in (often weekly) :: Correct. It’s a living document.
- [ ] Only when leadership asks :: Updates should follow learning, not requests.

Q: An opportunity is too big to solve directly. What should you do?
- [ ] Pick a different outcome :: The outcome may be fine.
- [x] Break it into smaller, more specific sub-opportunities :: Correct. Smaller opportunities are easier to solve and compare.
- [ ] Write one big solution for it :: Big opportunities usually need breaking down first.
- [ ] Delete it :: It may be the most important area.
```

## Key takeaways

- An OST links **one outcome → opportunities → solutions → experiments**.
- **Opportunities** are user needs and pains from research, never features.
- Pick **one target opportunity**, then compare **at least three solutions**.
- Test the **riskiest assumption** of each solution with a **pre-set threshold**.
- Keep the tree **alive**: update it as you learn.

*Go deeper (optional):* Teresa Torres’s book *Continuous Discovery Habits*.
