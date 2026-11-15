---
id: w4-sprint-planning
title: Sprint planning and estimation
week: 4
estimatedMinutes: 13
tags: [execution, agile, estimation]
---

## Why this matters for a PM

“When will it be ready?” is the question every stakeholder asks. Your answer depends on estimation and planning done with the team. PMs who understand story points, capacity and uncertainty give honest, reliable answers, and stop the team from over-committing. Your Jira deliverable this week includes planning 2 sprints.

## Core concepts

### Why estimation is hard

Software work is mostly new: if it were identical to past work, it would already be reused. So estimates carry uncertainty. The goal of estimation is not a perfect prediction; it’s **shared understanding** and a **good-enough forecast** to make decisions.

### Story points

**Story points** are a relative measure of the size of a story: effort, complexity and uncertainty combined. Teams compare stories to each other rather than estimating hours.

- Teams often use a **Fibonacci-like scale**: 1, 2, 3, 5, 8, 13. The growing gaps reflect growing uncertainty: the difference between 1 and 2 is clear; between 8 and 9 isn’t.
- A **reference story** anchors the scale: “Showing the balance on the summary screen is a 2.” Others are sized relative to it.
- Anything above 8 (sometimes 13) is too big for a sprint and should be **split**.

Why not hours? People are bad at absolute time estimates, interruptions vary, and a senior and a junior engineer take different hours for the same story. Relative size is more stable across people.

### Planning poker

**Planning poker** is a common estimation technique:
1. The PM reads a story and its acceptance criteria.
2. The team asks questions.
3. Everyone privately picks a card (1, 2, 3, 5, 8, 13, ?).
4. Cards are revealed at once.
5. If estimates differ a lot (a 2 and an 8), the highest and lowest explain their reasoning. Often someone knows about hidden complexity, or someone has a simpler idea.
6. Re-vote until the team roughly agrees.

The conversation is more valuable than the number: it surfaces risks and misunderstandings before work starts.

### T-shirt sizing

For rough, early estimates (roadmap items, epics), teams use **T-shirt sizes**: XS, S, M, L, XL. Quick and good enough for prioritisation. Later, epics are broken into stories with story points.

### Capacity and velocity

- **Velocity** (from the last lesson): average points completed per sprint over the last 3–5 sprints. Example: 22, 26, 24, 20 → ~23.
- **Capacity**: who’s actually available this sprint. If one of four engineers is on leave for a week, capacity drops by ~1/8 for a 2-week sprint.
- **Planned load**: aim for roughly **80% of velocity** after capacity adjustments, leaving room for bugs, support and surprises.

Example: velocity 24, one engineer out for half the sprint (team of 4) → capacity ~21 → plan ~17–18 points of new work.

### Forecasting a release

If an epic totals ~60 points and the team delivers ~20 per sprint, it will take about 3 sprints (6 weeks). Communicate a **range** to reflect uncertainty: “likely 3 sprints, possibly 4 if the UPI integration is harder than expected.” Update the forecast every sprint as you learn.

### The cone of uncertainty

Early in a project, estimates can be off by 2–4x. As discovery and design progress, uncertainty narrows. This is called the **cone of uncertainty**. Implication: commit to dates only when the work is well understood; give ranges before that.

### Running sprint planning well

A good sprint planning meeting has:
1. **A proposed sprint goal** from the PM.
2. **A refined, estimated, ordered backlog** (done in refinement, not now).
3. **Capacity check** (holidays, on-call, other commitments).
4. **Commitment by the team** to stories that fit ~80% of capacity and serve the goal.
5. **A task breakdown** by engineers for the first few stories.

## Worked example

**Team velocity:** last four sprints 21, 25, 23, 19 → average **22**.
**This sprint:** one of four engineers is on leave 5 of 10 days → capacity ≈ 22 × (3.5/4) ≈ **19**. Plan ~80% → **15–16 points** of new work, leaving room for bugs.

**Ordered backlog (refined):**

| # | Story | Points |
|---|---|---|
| 1 | Receive monthly summary notification | 3 |
| 2 | View net balance and top 5 expenses | 5 |
| 3 | See full expense list | 2 |
| 4 | Settle via UPI (happy path) | 5 |
| 5 | Handle pending/failed UPI payment | 5 |
| 6 | Mute summaries | 2 |

**Sprint goal:** “Users can receive the monthly summary and see exactly what they owe.”

**Commitment:** stories 1–3 (10 points) + story 4 (5 points) = **15 points**. Story 5 is tied to story 4, so the team debates: shipping UPI settle without pending/failure handling is risky. Decision: commit to 1–4 but keep story 4 behind a **feature flag** (a switch to turn a feature on/off without a new release) until story 5 ships next sprint.

**Forecast for the epic** (~35 points left after this sprint): ~2 more sprints → launch in ~4–6 weeks, depending on UPI provider testing.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 220" role="img" aria-labelledby="cone-t cone-d">
<title id="cone-t">Cone of uncertainty</title>
<desc id="cone-d">A cone that is wide at the idea stage and narrows through discovery, design and building, showing estimates becoming more accurate over time.</desc>
<polygon points="60,20 600,100 600,120 60,200" class="d-sky d-ink" stroke-width="2"/>
<line x1="60" y1="110" x2="600" y2="110" class="d-ink" stroke-width="2" stroke-dasharray="6 4"/>
<text x="70" y="15" class="d-text" font-size="11">4x</text>
<text x="70" y="214" class="d-text" font-size="11">0.25x</text>
<g class="d-ink" stroke-width="1"><line x1="160" y1="30" x2="160" y2="190"/><line x1="300" y1="55" x2="300" y2="165"/><line x1="440" y1="78" x2="440" y2="142"/></g>
<text x="100" y="110" class="d-text-dark" font-size="11" font-weight="700">Idea</text>
<text x="190" y="104" class="d-text-dark" font-size="11" font-weight="700">Discovery</text>
<text x="330" y="104" class="d-text-dark" font-size="11" font-weight="700">Design + refined</text>
<text x="470" y="104" class="d-text-dark" font-size="11" font-weight="700">Building</text>
</svg>
<figcaption>Early estimates can be off by 4x either way. Give ranges early; commit once the work is understood.</figcaption>
</figure>

## Step by step

Planning two sprints for your P1 backlog in Jira:

1. **Estimate every story** with a technical friend (or by yourself with clear reasoning, labelled as PM estimates). Use 1, 2, 3, 5, 8.
2. **Split anything above 8.**
3. **Assume a velocity** for a small team (e.g., 20 points per 2-week sprint) and note the assumption.
4. **Order the backlog** by priority and dependencies.
5. **Write a sprint goal** for Sprint 1 and Sprint 2.
6. **Fill each sprint to ~80%** of velocity with stories that serve its goal.
7. **Leave lower-priority stories** in the backlog, clearly ordered.
8. **Write the forecast**: total points, sprints needed, range, and key risks.
9. **Create the sprints in Jira** (tool guide) and add the stories.

## Common mistakes

1. **Treating estimates as promises.** They’re forecasts with uncertainty.
2. **PM estimating for the team.** The people doing the work estimate.
3. **Planning to 100% of velocity.** No room for bugs or surprises means missed sprints.
4. **Skipping refinement**, then estimating unclear stories in planning.
5. **Converting points to hours** for performance tracking. It defeats the purpose.
6. **Giving a single date for an unclear project.** Give ranges and update them.

## How it shows up in interviews

> [!INTERVIEW]
> **“Engineering says the feature will take 3 months. Leadership wants it in 1. What do you do?”**
> Outline: understand why leadership needs 1 month → understand the estimate (what drives it, risks) → options: cut scope (MVP), phase it, add people (rarely helps short-term), accept a later date → present trade-offs with a recommendation → agree and communicate.

> [!INTERVIEW]
> **“How do you estimate work?”**
> Outline: team estimates relative size (story points, planning poker) → T-shirt sizes for early items → velocity and capacity for forecasting → ranges, not single dates → update every sprint.

## Practice exercise

**Task (20 minutes):** A team has velocity 30 (average). Next sprint, 1 of 5 engineers is away the whole sprint and there’s a public holiday (1 of 10 days). Calculate the capacity, the planned load at 80%, and pick stories from this backlog to meet the sprint goal “Sellers can list products in bulk from photos”.

Backlog (ordered): Upload up to 20 photos (5) · Auto-detect product category from photo (8) · Edit details for each item (5) · Bulk publish (3) · Price suggestions (8) · Bulk delete (2) · Draft autosave (3)

```answer Reveal a model answer
**Capacity:** 4 of 5 engineers available → 30 × 4/5 = 24. Holiday removes ~1 of 10 days → 24 × 0.9 ≈ **21.6**.
**Planned load (80%):** ≈ **17 points**.

**Pick for the goal:** Upload up to 20 photos (5) + Edit details for each item (5) + Bulk publish (3) + Draft autosave (3) = **16 points**. This delivers an end-to-end flow: upload → edit → publish.

**Leave out:** Auto-detect category (8): valuable, but sellers can pick the category manually in “Edit details” for now; plan it next sprint. Price suggestions (8): not needed for the goal. Bulk delete (2): nice-to-have.
```

## Quiz

```quiz
Q: Why do teams often use a Fibonacci-like scale (1, 2, 3, 5, 8, 13) for story points?
- [ ] It’s easier to add up :: Not the reason.
- [x] Growing gaps reflect growing uncertainty in larger work :: Correct.
- [ ] Fibonacci is required by Scrum :: Scrum doesn’t prescribe estimation methods.
- [ ] It converts directly to hours :: Points deliberately avoid hours.

Q: In planning poker, two engineers vote 2 and 8 for the same story. What should happen?
- [ ] Take the average (5) :: Averaging hides the misunderstanding.
- [x] Both explain their reasoning, then the team re-votes :: Correct. The discussion surfaces hidden complexity or simpler solutions.
- [ ] The PM decides :: The team estimates.
- [ ] Use the higher number :: Without discussion, you lose the learning.

Q: Velocity is 25. One of five engineers is away for the whole sprint. Roughly what should the team plan?
- [ ] 25 points :: Ignores both capacity and buffer.
- [ ] 20 points :: Adjusts capacity but leaves no buffer.
- [x] About 16 points :: Correct. 25 × 4/5 = 20 capacity, × 0.8 buffer ≈ 16.
- [ ] 30 points :: More than ever delivered.

Q: What does the cone of uncertainty suggest?
- [ ] Estimates are always accurate :: The opposite.
- [x] Early estimates are very uncertain and become more accurate as work is understood :: Correct. Give ranges early.
- [ ] Projects should be shorter :: Not what it says.
- [ ] Teams should stop estimating :: Estimates are still useful when treated as forecasts.

Q: What is a feature flag?
- [ ] A bug report label :: Not what it means.
- [x] A switch that turns a feature on or off without releasing new code :: Correct. Useful for shipping incomplete or risky work safely.
- [ ] A marketing banner :: Not related.
- [ ] A Jira priority field :: Not related.
```

## Key takeaways

- Estimates are **forecasts for shared understanding**, not promises.
- **Story points** measure relative size; **planning poker** surfaces hidden complexity.
- Plan to about **80% of capacity-adjusted velocity**.
- Forecast with **ranges** and update every sprint; respect the **cone of uncertainty**.
- The **team estimates**; the PM brings clear, refined, ordered stories and a sprint goal.
