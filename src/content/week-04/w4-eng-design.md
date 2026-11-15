---
id: w4-eng-design
title: Working with engineering and design
week: 4
estimatedMinutes: 14
tags: [execution, collaboration, stakeholders]
---

## Why this matters for a PM

A PM ships nothing alone. The **product trio** (PM, design lead, engineering lead) is the core unit that decides what gets built and how well. PMs who earn the trust of engineers and designers get better ideas, honest estimates and faster delivery. PMs who don’t get compliance at best. Every PM interview loop has a question about this.

## Core concepts

### The product trio

- **PM:** owns the problem, outcome and priorities. Brings user and business context.
- **Designer:** owns the user experience: flows, interaction, visual design, usability.
- **Engineering lead (tech lead):** owns the technical approach, feasibility, quality and delivery.

Strong teams do discovery **together**: all three attend some user interviews, look at data together, and sketch solutions together. This cuts handoffs and gives each person the context to make good decisions alone.

### What engineers need from a PM

- **The why.** Context on the user problem and goal, not just a list of features.
- **Clear priorities.** What matters most, and what can be cut if time runs short.
- **Fast decisions.** Waiting days for a PM answer stalls a sprint.
- **Stable scope within a sprint.** Constant changes destroy focus.
- **Respect for technical work.** Time for refactoring, reliability and technical debt (Week 7).
- **Involvement early.** Engineers often see simpler, cheaper solutions if they hear the problem before the solution is decided.

### What designers need from a PM

- **The problem and constraints**, not a sketched solution to make pretty.
- **Access to users and research.**
- **Time to explore** multiple options before converging.
- **Clear success criteria** to judge designs against.
- **Backing in reviews**: the PM supports good design decisions with evidence.

### What the PM needs from them

- Honest estimates and early warnings about risk.
- Ideas, not just execution.
- Pushback when something is a bad idea, with reasons.
- Shared ownership of outcomes, not just outputs.

### Building trust

Trust is built through small, repeated behaviours:
- **Do what you say** you’ll do, on time (answers, decisions, reviews).
- **Share credit publicly**, take blame privately.
- **Admit what you don’t know**, especially about technology. Ask questions.
- **Protect the team** from chaos: unclear requests, constant interruptions, unrealistic dates.
- **Show results**: share metrics and user feedback after launches so the team sees their impact.

### Handling disagreement

Disagreement is healthy. Useful habits:
- **Separate the problem from the solution.** Agree on the problem first; many disagreements are actually about different understandings of the goal.
- **Use evidence**: data, research, prototypes, quick tests.
- **Let the owner decide** in their area: the designer on visual detail, the engineer on technical approach, the PM on priority and scope. Each explains reasoning.
- **Escalate together**, not around people. If you can’t agree, go to your managers jointly with a shared summary of options.

### Rituals that help

- **Kickoff**: at the start of a project, align on problem, goals, constraints and roles.
- **Design reviews (critiques)**: designs are shared early and often; feedback focuses on goals, not taste.
- **Tech design review**: engineers present the technical approach; PM asks about trade-offs, risks and timelines.
- **Refinement**: together, turn designs and requirements into stories.
- **Demo days and launch reviews**: celebrate and learn.

### Talking to engineers when you’re not technical

You don’t need to code. You need to ask good questions:
- “What’s the simplest version that would let us learn whether this works?”
- “What makes this hard? Where is the uncertainty?”
- “What are the trade-offs between options A and B?”
- “What could break, and how would we know?”
- “Is there anything we’re building that we’ll regret in six months?”

## Worked example

**Situation:** At Groww, you’re building a fund comparison feature. The designer has created a rich, interactive chart comparing 5 funds over 10 years. The tech lead says it will take 6 weeks because the historical data API is slow and charts on low-end Android phones lag. You have a goal to launch in 3 weeks to support a marketing campaign.

**Poor PM response:** “Marketing needs it in 3 weeks. Can you just work faster?” → Team feels unheard; quality drops; trust erodes.

**Better PM response:**
1. **Re-anchor on the problem:** “Our users want to know which of 2–3 funds is better for them. Research says they mostly compare returns and risk, and rarely look beyond 5 years.”
2. **Ask about drivers:** “What makes it 6 weeks? Which part is hardest?” → The 10-year data and 5-fund comparison drive most of the effort.
3. **Explore options together:**
   - A: Compare up to 3 funds, 1/3/5-year returns as a simple table plus one simple chart: 2.5 weeks.
   - B: Full design: 6 weeks.
   - C: A with precomputed data cached daily: 2 weeks, with less fresh data (updated once a day).
4. **Decide:** Ship C for the campaign; plan B’s best parts as a follow-up if usage justifies it.
5. **Give credit:** In the launch note, you credit the tech lead’s caching idea and the designer’s simplified table.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 250" role="img" aria-labelledby="trio-t trio-d">
<title id="trio-t">The product trio</title>
<desc id="trio-d">Three overlapping circles: PM owns problem and priority, design owns experience, engineering owns technical approach. The overlap is shared discovery and decisions.</desc>
<circle cx="250" cy="105" r="85" class="d-lavender d-ink" stroke-width="2" fill-opacity="0.85"/>
<circle cx="390" cy="105" r="85" class="d-pink d-ink" stroke-width="2" fill-opacity="0.85"/>
<circle cx="320" cy="170" r="85" class="d-sky d-ink" stroke-width="2" fill-opacity="0.85"/>
<text x="185" y="80" class="d-text-dark" font-weight="700">PM</text>
<text x="175" y="98" class="d-text-dark" font-size="11">problem · why</text>
<text x="175" y="114" class="d-text-dark" font-size="11">priority · outcome</text>
<text x="410" y="80" class="d-text-dark" font-weight="700">Design</text>
<text x="410" y="98" class="d-text-dark" font-size="11">experience</text>
<text x="410" y="114" class="d-text-dark" font-size="11">usability</text>
<text x="285" y="225" class="d-text-dark" font-weight="700">Engineering</text>
<text x="275" y="242" class="d-text-dark" font-size="11">approach · quality</text>
<rect x="282" y="120" width="76" height="28" rx="6" class="d-butter d-ink" stroke-width="2"/>
<text x="290" y="139" class="d-text-dark" font-size="11" font-weight="700">Discovery</text>
</svg>
<figcaption>Each owns a domain; together they own discovery and the outcome.</figcaption>
</figure>

## Step by step

Kicking off P1’s feature with an (imagined or real) trio:

1. **Share the problem before the solution.** Send the discovery report and PRD TL;DR before the kickoff.
2. **Run a 45-minute kickoff**: problem, goals, non-goals, constraints, timeline, roles, open questions.
3. **Invite engineers and the designer to one user interview** or to watch a recording.
4. **Hold a sketching session**: everyone sketches 2–3 solutions; discuss trade-offs.
5. **Ask for a tech approach** and design options with estimates.
6. **Decide scope together** using the trade-off conversation.
7. **Agree on communication**: response times, where decisions are logged, how to raise risks.
8. **After launch, share results** and thank people specifically.

## Common mistakes

1. **Handing over finished solutions.** Engineers and designers become order-takers.
2. **Pretending to know technology.** Ask questions instead.
3. **Designing in the PRD.** Pixel-level instructions disrespect the designer’s role.
4. **Slow answers.** A blocked team waiting for the PM is expensive.
5. **Going around people.** Escalating without the person knowing destroys trust.
6. **Ignoring technical debt.** It slows everything later (Week 7).

## How it shows up in interviews

> [!INTERVIEW]
> **“Tell me about a conflict with an engineer or designer and how you resolved it.”**
> Outline (STAR): the disagreement → how you separated problem from solution → evidence you used → the options you explored together → the decision and who made it → the result and the relationship afterwards.

> [!INTERVIEW]
> **“How do you work with engineers if you’re not technical?”**
> Outline: involve them early → share the why → ask about drivers, risks and trade-offs → respect their ownership of the how → learn enough technical fluency to follow (APIs, data, architecture) → protect their focus.

## Practice exercise

**Task (25 minutes):** Your designer wants to delay launch by 2 weeks to polish animations. Your engineering lead says the feature is ready. Marketing has a campaign in 10 days. Write (a) the questions you’d ask each person and (b) three options with trade-offs and your recommendation.

```answer Reveal a model answer
**Questions**
- Designer: What user problem do the animations solve? Is there evidence (usability test) that the current version confuses users? Which parts matter most? Can any be done in 3–4 days?
- Engineering lead: Are the animations risky for performance on low-end phones? Can we ship polish later without disruption (e.g., behind a flag)?
- Marketing: Which part of the experience does the campaign showcase? How firm is the date?

**Options**
1. Launch on time without animations; ship polish in the next sprint. Trade-off: slightly less delightful first impression; no campaign risk.
2. Delay 2 weeks. Trade-off: miss or move the campaign; more polish.
3. Launch on time with the 1–2 animations that clarify the flow (e.g., confirmation of success), defer purely decorative ones. Trade-off: 3–4 days of extra work; needs quick prioritisation.

**Recommendation:** Option 3 if any animation affects understanding (usability), otherwise option 1. Agree with the designer on what “polish” ships next sprint, and put it on the roadmap so it doesn’t disappear.
```

## Quiz

```quiz
Q: Who typically owns the technical approach in a product team?
- [ ] The PM :: The PM owns problem and priority, not technical approach.
- [x] The engineering lead and engineers :: Correct.
- [ ] The designer :: Designers own the experience.
- [ ] The CEO :: Not typically.

Q: What’s the best time to involve engineers in a new feature?
- [ ] After the PRD and designs are finished :: Too late to benefit from their ideas.
- [x] Early, when the problem is being understood :: Correct. They often find simpler solutions.
- [ ] Only during sprint planning :: Too late for shaping the solution.
- [ ] Only when there’s a bug :: Far too late.

Q: The designer and engineer disagree about a visual detail. Who should decide?
- [ ] The PM, always :: The PM owns priority, not visual detail.
- [x] The designer, explaining their reasoning, unless it creates a real technical or scope problem :: Correct. Let owners decide in their domain.
- [ ] Whoever is more senior :: Seniority isn’t the right rule.
- [ ] A vote of the whole company :: Not practical.

Q: Which behaviour builds trust with engineers fastest?
- [ ] Changing priorities often to show flexibility :: Constant changes erode trust.
- [x] Giving fast, clear decisions and explaining the why :: Correct.
- [ ] Telling them how to code features :: Undermines their ownership.
- [ ] Taking credit for launches :: Damages trust.

Q: You disagree with your tech lead and can’t resolve it. What’s the best next step?
- [ ] Go to their manager without telling them :: Going around people destroys trust.
- [x] Write up the options together and escalate jointly :: Correct.
- [ ] Do it your way anyway :: Damages the relationship.
- [ ] Drop the topic forever :: Unresolved issues return later.
```

## Key takeaways

- The **product trio** (PM, design, engineering) shares discovery and owns outcomes together.
- Give **the why, clear priorities, fast decisions and stable scope**; involve people **early**.
- Let each person **own their domain**; explain reasoning, use evidence.
- Build trust through **reliability, credit-sharing and protecting focus**.
- Ask engineers about **drivers, risks and trade-offs** rather than pretending to know.
