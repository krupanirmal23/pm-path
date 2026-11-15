---
id: w6-ab-pitfalls
title: "A/B pitfalls: peeking, novelty effects, when not to test"
week: 6
estimatedMinutes: 15
tags: [experimentation, ab-testing, statistics]
---

## Why this matters for a PM

A/B tests feel scientific, which makes their mistakes dangerous: a flawed test produces a confident, wrong answer that everyone trusts. Most experiment failures come from a handful of predictable traps. Knowing them helps you run honest tests, question others’ results, and recognise when testing is the wrong tool altogether.

## Core concepts

### 1. Peeking (stopping early)

**Peeking** means checking results repeatedly during a test and stopping as soon as they look significant. Because metrics fluctuate, a test will often cross the significance line by chance at some point, even when there’s no real effect. If you stop the first time it crosses, your real false-positive rate can be several times higher than the 5% you think you’re accepting.

**Fixes:**
- Calculate the sample size and duration **before** starting, and only make the decision at the end.
- It’s fine to **monitor guardrails** during the test (to stop harmful changes), just don’t declare wins early.
- If you need to check early, use methods designed for it (**sequential testing**, which many modern tools offer), and follow their rules.

### 2. Novelty and primacy effects

- **Novelty effect:** users interact with something just because it’s new; the lift fades after days or weeks. A shiny new button gets clicks in week 1 and is ignored by week 4.
- **Primacy effect (change aversion):** existing users initially perform worse with a change because they’re used to the old way; performance recovers as they adapt.

**Fixes:** run long enough (2+ weeks); look at the effect **over time** (does it decay or grow?); compare **new users** (who have no habits) with existing users.

### 3. Multiple comparisons

Testing many metrics, segments or variants at α = 0.05 means some will look significant by chance. With 20 independent comparisons and no real effects, you’d expect about one false “win”.

**Fixes:** choose **one primary metric** in advance; treat segment findings as hypotheses for a new test; use corrections when comparing many variants (tools often apply them); be sceptical of a surprising win in one small segment.

### 4. Sample ratio mismatch (SRM)

If the actual split differs significantly from the planned one (e.g., 50/50 planned, 52/48 observed with large numbers), something is wrong: a bug in assignment, users dropping out of one variant (e.g., the variant crashes), or tracking differences. **Results with SRM shouldn’t be trusted** until fixed.

### 5. Underpowered tests

Running a test with too few users means you’ll likely see “no significant difference” even if a meaningful effect exists. Teams then wrongly conclude “it doesn’t work”. Calculate power first; if you can’t reach the needed sample, consider a bigger MDE, a more sensitive metric, or not testing.

### 6. Network effects and interference

A/B tests assume one user’s experience doesn’t affect another’s. In **marketplaces** and **social products**, that breaks:
- If variant users on a delivery app get priority delivery partners, control users get slower deliveries: both groups are affected.
- If variant sellers get better ranking, control sellers lose sales.

**Fixes:** randomise by larger units (cities, time periods, clusters), or use switchback tests (alternate the treatment over time in a region). This is advanced; the key PM skill is noticing when interference is likely.

### 7. Wrong metric or short-term bias

Optimising short-term clicks can hurt long-term outcomes. Aggressive notifications lift today’s opens and raise long-term uninstalls. Use guardrails and, for important changes, **holdout groups**: keep a small group (e.g., 5%) without the change for months to measure long-term effects.

### 8. Implementation bugs

The variant loads slower, breaks on certain devices, or tracking differs between variants. Always **QA both variants** and check guardrails like crash rate and load time.

### When NOT to A/B test

A/B testing isn’t always appropriate:
- **Not enough traffic** to reach a meaningful sample in a reasonable time (common for B2B products and early startups).
- **Obvious fixes and bugs**: if checkout crashes on Android 10, fix it; don’t test.
- **Legal, safety or ethical requirements**: you don’t A/B test compliance or withhold safety features.
- **Big strategic bets** with long-term effects that a 2-week test can’t capture (a new pricing model, a brand change). Use other evidence, phased rollouts and long holdouts.
- **When you’d ship regardless**: if no result would change your decision, don’t waste time.
- **Changes that can’t be isolated**: infrastructure migrations, tightly coupled multi-feature launches.
- **Ethically questionable tests**: exposing some users to worse prices or deceptive designs.

Alternatives: usability tests, prototypes, fake doors, staged rollouts with before/after monitoring, qualitative research, or quasi-experiments (comparing similar cities).

## Worked example

**Scenario:** A team tests a new Swiggy home feed. On day 3, conversion is +4% with p = 0.02. The PM wants to ship.

**Questions a strong PM asks:**
1. **Peeking:** the plan said 14 days. Day 3 is too early; early results fluctuate. Keep running.
2. **Novelty:** the feed looks very different. Is the effect from curiosity? Plot daily lift: day 1 +7%, day 2 +5%, day 3 +4% → decaying. Look at new users separately.
3. **Multiple comparisons:** the team also says “+12% for Pune iOS users!” That’s one of 30 segments; treat it as a hypothesis, not a finding.
4. **SRM:** split is 50.2/49.8 with 400k users: fine.
5. **Guardrails:** home load time p95 is +180 ms in the variant. Threshold was +100 ms. Investigate.

**Day 14 result:** lift settled at +1.1% (CI −0.2% to +2.4%), not significant; load time still worse. Decision: don’t ship as is; fix performance, keep the two most-used new modules, and re-test.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 250" role="img" aria-labelledby="pk-t pk-d">
<title id="pk-t">Peeking and novelty</title>
<desc id="pk-d">A chart of measured lift over the days of a test. Early days swing above the significance line and later settle near a small effect, showing why early stopping misleads.</desc>
<line x1="60" y1="200" x2="610" y2="200" class="d-ink" stroke-width="2"/>
<line x1="60" y1="200" x2="60" y2="20" class="d-ink" stroke-width="2"/>
<line x1="60" y1="80" x2="610" y2="80" class="d-ink" stroke-width="1.5" stroke-dasharray="6 5"/>
<text x="470" y="72" class="d-text" font-size="11">“significant” threshold</text>
<line x1="60" y1="160" x2="610" y2="160" class="d-ink" stroke-width="1" stroke-dasharray="2 4"/>
<text x="470" y="152" class="d-text" font-size="11">true small effect</text>
<polyline points="80,40 120,70 160,60 200,110 240,95 280,130 320,140 360,150 400,155 440,160 480,158 520,162 560,160 600,161" fill="none" style="stroke: var(--c-pink)" stroke-width="5"/>
<polyline points="80,40 120,70 160,60 200,110 240,95 280,130 320,140 360,150 400,155 440,160 480,158 520,162 560,160 600,161" fill="none" class="d-ink" stroke-width="1"/>
<circle cx="160" cy="60" r="7" class="d-butter d-ink" stroke-width="2"/>
<text x="172" y="50" class="d-text" font-size="11" font-weight="700">Day 3: “ship it!”</text>
<text x="290" y="228" class="d-text" font-size="12">Days into the test →</text>
<text x="22" y="140" class="d-text" font-size="12" transform="rotate(-90 22 140)">Measured lift</text>
</svg>
<figcaption>Early lifts swing wildly and novelty fades. Decide at the planned end, not the first exciting peak.</figcaption>
</figure>

## Step by step

A pre-launch experiment checklist:

1. **Is testing the right tool?** (traffic, reversibility, ethics, decision impact)
2. **Sample size and duration** calculated and written down.
3. **One primary metric**, guardrails with thresholds, decision rules.
4. **Interference risk** considered (marketplace, social, shared resources).
5. **QA both variants** on key devices; tracking verified.
6. **Day-1 SRM check.**
7. **Monitor guardrails** daily; don’t act on the primary metric early.
8. **At the end:** read the confidence interval, check novelty (lift over time) and segments (as hypotheses).
9. **Consider a long-term holdout** for big changes.
10. **Write up results** (win, loss or flat) and share them; flat results are learning too.

## Common mistakes

1. **Stopping at the first significant result.**
2. **Shipping on a novelty spike.**
3. **Cherry-picking a winning segment** after the primary metric was flat.
4. **Ignoring SRM.**
5. **Running underpowered tests** and concluding “no effect”.
6. **Testing things that shouldn’t be tested** (obvious bugs, compliance, unethical variants).

## How it shows up in interviews

> [!INTERVIEW]
> **“Your test shows +5% on day 2. The VP wants to ship. What do you say?”**
> Outline: explain peeking risk → planned duration and sample → novelty effect check → guardrails status → propose waiting until the planned end (offer interim guardrail updates) → if urgent, discuss sequential testing.

> [!INTERVIEW]
> **“When would you not run an A/B test?”**
> Outline: low traffic, obvious bugs, legal/ethical constraints, long-term strategic changes, network interference without proper design, when results wouldn’t change the decision → alternatives (usability tests, staged rollouts, holdouts, quasi-experiments).

## Practice exercise

**Task (25 minutes):** For each situation, say whether you’d A/B test, and why (or what you’d do instead):
1. Razorpay wants to change its pricing for all small merchants.
2. Zomato wants to test a new restaurant ranking that gives new restaurants more visibility.
3. A B2B SaaS tool with 300 customers wants to test a new onboarding email.
4. CRED wants to test two versions of a reward animation.
5. The Groww app crashes on one Android version during KYC.

```answer Reveal a model answer
1. **Mostly no (not a simple A/B).** Pricing affects trust and fairness (merchants compare notes), and long-term revenue effects exceed a short test. Use research, a careful pilot with new merchants or a region, long-term tracking, and clear communication.
2. **Yes, but carefully designed.** Ranking changes cause interference (restaurants compete for the same customers). Randomise by city or use switchback tests; guardrails on order volume for established restaurants and customer satisfaction.
3. **No full A/B.** 300 customers is too few to reach significance on most outcomes. Use qualitative feedback, a before/after with careful notes, or test with a much larger effect metric (like open rates) only as a rough signal.
4. **Yes.** High traffic, easy to randomise, low risk. But beware novelty; run 2+ weeks and measure downstream metrics (payments completed), not just animation views.
5. **No.** It’s a bug. Fix it, monitor KYC completion on that version, and add the device to QA.
```

## Quiz

```quiz
Q: Why is peeking at results and stopping early a problem?
- [ ] It slows down the test :: The opposite: it ends tests early.
- [x] Random fluctuations often cross the significance line at some point, inflating false positives :: Correct. Repeated checks give chance many opportunities to look like a win.
- [ ] Tools don’t allow it :: Most tools allow it, which is why it’s a trap.
- [ ] It makes p-values bigger :: Not the issue.

Q: A new feature’s lift is +8% on day 1 and +1% by day 14. What’s the likely explanation?
- [ ] The test broke on day 14 :: Possible, but a decaying lift is classic novelty.
- [x] Novelty effect: users tried it because it was new, then interest faded :: Correct. A lift that decays day by day is the classic novelty signature.
- [ ] Primacy effect :: Primacy shows lower early performance that improves.
- [ ] Sample ratio mismatch :: SRM is about group sizes, not decay.

Q: The primary metric was flat, but one of 25 segments shows a significant win. What should you do?
- [ ] Ship to that segment immediately :: Likely a chance finding from multiple comparisons.
- [x] Treat it as a hypothesis and test it in a new, focused experiment :: Correct. With many segments, some win by chance; a new test confirms or rejects it.
- [ ] Report the experiment as a success :: Misleading: the primary metric didn’t move, so it wasn’t a success.
- [ ] Ignore it completely :: It can be a useful lead.

Q: Which situation is LEAST suitable for an A/B test?
- [ ] Testing two checkout button labels on a high-traffic app :: Suitable: high traffic, low risk and easy to randomise.
- [x] Fixing a crash that blocks payments on one Android version :: Correct. Just fix the bug.
- [ ] Testing a new onboarding screen order :: Suitable with enough traffic.
- [ ] Testing notification timing :: Suitable with guardrails.

Q: Why are marketplace experiments tricky?
- [ ] Marketplaces have no users :: They have many.
- [x] Treatment and control users share supply (drivers, sellers), so one group’s change affects the other :: Correct. That’s interference.
- [ ] Marketplaces can’t track events :: They can track events fine; interference is the real challenge.
- [ ] Regulations ban them :: Not generally.

Q: What is a holdout group used for?
- [ ] Testing the variant faster :: Not its purpose.
- [x] Measuring long-term effects by keeping a small group without the change for months :: Correct. Holdouts reveal effects that a 2-week test can’t see.
- [ ] Storing backup data :: Unrelated: a holdout group is about users, not data backups.
- [ ] Increasing sample size :: It reduces exposed users slightly.
```

## Key takeaways

- **Don’t peek and stop early**; decide at the planned sample size (or use proper sequential methods).
- Watch for **novelty and primacy effects**; look at lift **over time** and at **new users**.
- **One primary metric**; treat segment wins as **new hypotheses**.
- Check for **SRM**, **underpowering**, **interference** and **implementation bugs**.
- Know **when not to test**: low traffic, obvious fixes, ethics/compliance, long-term strategic bets, or when results won’t change the decision.
