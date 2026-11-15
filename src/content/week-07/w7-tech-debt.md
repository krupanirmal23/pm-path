---
id: w7-tech-debt
title: Technical debt
week: 7
estimatedMinutes: 13
tags: [technical, prioritization, engineering]
---

## Why this matters for a PM

Every engineering team carries **technical debt**, and the PM decides (with the engineering lead) how much time goes to paying it down versus building new features. Ignore it and the team slows to a crawl, bugs multiply and outages follow. Overdo it and nothing ships. Interviewers often ask, “How do you balance tech debt with feature work?”

## Core concepts

### What technical debt is

**Technical debt** is the future cost created by shortcuts or outdated decisions in code and systems. Like financial debt, it lets you move faster now, but you pay **interest** later: slower development, more bugs, harder changes.

Examples:
- Code copied in five places instead of shared, so every change must be made five times.
- No automated tests, so engineers fear changing anything.
- An old library with known security issues.
- A database design that worked for 10,000 users but not 10 million.
- Hard-coded rules (“only Bengaluru and Mumbai”) instead of configuration.
- Old feature flags never cleaned up, adding confusing code paths.
- Manual deployment steps that cause mistakes.

### Not all debt is bad

Debt can be a smart choice:
- **Deliberate, prudent debt:** “We’ll hard-code this for the launch city and generalise after we validate demand.” Taken knowingly, with a plan.
- **Accidental debt:** decisions that looked fine then, but the product outgrew them.
- **Reckless debt:** sloppy work with no plan to fix it.

The goal isn’t zero debt; it’s **managed debt**: knowing what you owe and paying down what hurts most.

### Symptoms PMs can notice

- Estimates for “simple” changes keep growing.
- The same kind of bug keeps coming back.
- Engineers say “we can’t touch that part” or “nobody understands that code”.
- Incidents and outages are frequent.
- Onboarding new engineers takes a long time.
- Releases are slow and risky; rollbacks are common.
- Velocity has dropped without a clear reason.

### The interest rate idea

Prioritise debt by its **interest**: how much it slows you down or risks harm *now and soon*.
- **High interest:** debt in areas you change often, or that causes incidents or security risk. Pay down first.
- **Low interest:** debt in stable code nobody touches. Can wait, maybe forever.

### How teams handle it

Common approaches:
1. **A fixed capacity share:** e.g., 15–25% of each sprint for debt and platform health. Predictable and easy to protect.
2. **“Boy scout rule”:** leave code better than you found it; improve nearby code as part of feature work.
3. **Dedicated debt sprints or “fix-it weeks”:** periodic focus on cleanup (useful but shouldn’t be the only method).
4. **Bundle with features:** when building in an area, include the refactoring needed to make it healthy (“this feature + making the pricing module configurable”).
5. **Big rewrites:** rarely. They’re risky and often take far longer than planned. Prefer incremental replacement (the “strangler” approach: gradually route traffic from old to new).

### How PMs make debt visible

Engineers sometimes struggle to get debt prioritised because it’s described technically. A PM can help translate it into **business impact**:
- “Refactoring the checkout service reduces checkout incidents (3 last quarter, each costing ~₹15 lakh in lost orders) and cuts new payment-method integration time from 6 weeks to 2.”
- “Upgrading the payments SDK is required for a new RBI rule effective next quarter.”
- “Automated tests for the order flow would let us release weekly instead of every 3 weeks.”

Keep a **tech debt register**: a list of debt items with description, area, impact, rough effort and owner. Review it in planning.

### Related terms

- **Refactoring:** restructuring code without changing what it does, to make it cleaner and easier to change.
- **Legacy system:** an old system still in use, often hard to change.
- **Platform work:** investments that make many future features easier (shared components, infrastructure, tooling).
- **Code coverage:** % of code exercised by automated tests (a rough health signal).

## Worked example

**Situation:** At a food delivery company, the checkout team’s velocity has dropped 35% over two quarters. The engineering lead says the coupon system is “a mess”. Marketing keeps asking for new coupon types.

**Diagnosis with data:**
- Each new coupon type takes 3–4 weeks (was 1 week a year ago).
- 6 of the last 10 checkout incidents involved coupon logic.
- Coupon rules are hard-coded in three services, with copy-pasted logic.

**Options:**
1. Keep adding coupons as is: fast for the next one, slower and riskier forever.
2. Big rewrite of the whole checkout: 3–4 months, risky.
3. **Incremental:** build a configurable coupon rules engine (6 weeks), migrate existing coupons gradually, add tests.

**PM decision and pitch:** Choose option 3. Frame it as: “After 6 weeks, marketing can launch most new coupon types in 2 days via configuration, and we expect coupon-related incidents to fall by at least half.” Agree with marketing to pause new coupon types for 6 weeks, except one high-priority campaign built on the new engine as its first use case. Track: time to launch a new coupon, coupon incidents, checkout velocity.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 240" role="img" aria-labelledby="td2-t td2-d">
<title id="td2-t">Feature speed with and without debt paydown</title>
<desc id="td2-d">Two lines over time: a team ignoring debt starts fast then slows down; a team investing a steady share in debt starts slightly slower but stays fast.</desc>
<line x1="60" y1="200" x2="610" y2="200" class="d-ink" stroke-width="2"/>
<line x1="60" y1="200" x2="60" y2="20" class="d-ink" stroke-width="2"/>
<text x="300" y="228" class="d-text" font-size="12">Time →</text>
<text x="22" y="160" class="d-text" font-size="12" transform="rotate(-90 22 160)">Feature delivery speed</text>
<path d="M60 50 C 200 55 300 90 400 130 S 550 175 600 185" fill="none" style="stroke: var(--c-pink)" stroke-width="6"/>
<path d="M60 50 C 200 55 300 90 400 130 S 550 175 600 185" fill="none" class="d-ink" stroke-width="1"/>
<path d="M60 70 C 200 72 350 70 600 66" fill="none" style="stroke: var(--c-mint)" stroke-width="6"/>
<path d="M60 70 C 200 72 350 70 600 66" fill="none" class="d-ink" stroke-width="1"/>
<text x="420" y="58" class="d-text" font-size="12" font-weight="700">15–25% on debt: steady</text>
<text x="420" y="168" class="d-text" font-size="12" font-weight="700">Ignoring debt: slowing</text>
</svg>
<figcaption>Debt is interest on past shortcuts. A steady investment keeps the team fast over time.</figcaption>
</figure>

## Step by step

Managing tech debt as a PM:

1. **Ask engineers** to list the top debt items and how they hurt (speed, incidents, security, cost).
2. **Quantify impact** where possible: incidents, hours lost, delayed features, risk.
3. **Estimate effort** and **interest** (how often the area changes, how risky it is).
4. **Keep a debt register** and review it monthly.
5. **Agree on a capacity share** (e.g., 20%) and protect it in sprint planning.
6. **Bundle refactoring** with features in the same area.
7. **Translate debt into business outcomes** when pitching to leadership.
8. **Measure the payoff**: cycle time, incident count, time to ship similar features.

## Common mistakes

1. **Treating debt as engineering’s problem only.**
2. **Never allocating time**, then facing a crisis.
3. **Approving big rewrites** without incremental milestones.
4. **Prioritising debt nobody touches** over debt in hot areas.
5. **Describing debt only technically** to stakeholders.
6. **Taking deliberate shortcuts without writing them down** and planning the payback.

## How it shows up in interviews

> [!INTERVIEW]
> **“How do you prioritise technical debt against new features?”**
> Outline: understand the debt with engineering → quantify impact (speed, incidents, risk) → prioritise by interest → reserve a capacity share → bundle with features → translate to business impact for stakeholders → measure results.

> [!INTERVIEW]
> **“Your engineering lead wants to spend a quarter rewriting a system. What do you do?”**
> Outline: understand the pain and goals → ask for evidence → explore incremental alternatives → define milestones and measurable outcomes → plan what features pause and communicate it → agree on checkpoints to stop or continue.

## Practice exercise

**Task (20 minutes):** Your engineering lead lists three debt items. Rank them and write a one-paragraph pitch for the top one to your business head.

1. The notification service has no retries; ~2% of order updates never reach users. Area changes rarely.
2. The search module uses an old library with a known security vulnerability. Area changes monthly.
3. The admin dashboard code is messy and slow to change; ops requests 1–2 changes a quarter.

```answer Reveal a model answer
**Ranking:** (2) security vulnerability: high risk, area changes often → first. (1) notification retries: real user harm (2% of order updates lost) → second; fix is likely small. (3) admin dashboard: low interest (few changes) → later, bundle with the next ops request.

**Pitch for (2):** “Our search runs on an old library with a publicly known security vulnerability. If exploited, attackers could access internal data or take search down during peak hours, which handles 60% of our orders. Upgrading takes about 2 engineer-weeks this sprint. It also removes a blocker for the improved autocomplete planned for next quarter. I’d like to move one feature story to next sprint to make room.”
```

## Quiz

```quiz
Q: What is technical debt?
- [ ] Money owed to cloud providers :: That’s a financial bill, not technical debt.
- [x] The future cost of shortcuts or outdated decisions in code and systems :: Correct. You pay “interest” as slower work and more bugs.
- [ ] Bugs reported by users :: Bugs can be a symptom, but debt is broader.
- [ ] The number of engineers on a team :: Unrelated: team size isn’t debt.

Q: Which debt should usually be paid down first?
- [ ] Messy code in a module nobody has touched in two years :: Low interest; it can often wait.
- [x] Debt in a frequently changed area that causes incidents :: Correct. High interest.
- [ ] Debt that’s most fun to fix :: Fun isn’t a prioritisation criterion.
- [ ] The oldest debt :: Age alone doesn’t determine impact.

Q: Why are big rewrites risky?
- [ ] They’re always illegal :: Rewrites aren’t illegal; they’re risky because of time and uncertainty.
- [x] They often take much longer than planned and deliver no value until done :: Correct. Prefer incremental replacement.
- [ ] Engineers dislike them :: Many engineers like rewrites, which is part of the risk.
- [ ] They can’t be tested :: They can, but risk remains high.

Q: How can a PM help get debt prioritised?
- [ ] By avoiding the topic :: That lets debt grow.
- [x] By translating it into business impact like incidents, speed and risk :: Correct. Leaders prioritise what they can connect to outcomes.
- [ ] By asking engineers to work weekends :: Not sustainable.
- [ ] By hiding it from leadership :: Leadership needs visibility.

Q: What is refactoring?
- [ ] Adding new features :: Refactoring doesn’t add features.
- [x] Restructuring code without changing its behaviour, to make it easier to change :: Correct. Users see no difference; engineers move faster.
- [ ] Deleting the database :: Unrelated and dangerous; refactoring keeps behaviour the same.
- [ ] Rewriting the app in a new language :: That’s a rewrite, not refactoring.

Q: Which is an example of deliberate, prudent debt?
- [ ] Skipping tests because nobody cares :: That’s reckless.
- [x] Hard-coding a launch city to test demand, with a documented plan to generalise later :: Correct. A conscious shortcut with a payback plan.
- [ ] Copying code everywhere without noticing :: That’s accidental or reckless.
- [ ] Using a library with a known vulnerability on purpose :: That’s reckless risk.
```

## Key takeaways

- **Technical debt** is the interest you pay later on shortcuts and outdated decisions.
- Some debt is **deliberate and smart**; manage it, don’t aim for zero.
- Prioritise by **interest**: frequently changed, risky or incident-causing areas first.
- Protect a **steady capacity share** (often 15–25%), bundle refactors with features, avoid big-bang rewrites.
- Make debt visible in **business terms** and track the payoff.
