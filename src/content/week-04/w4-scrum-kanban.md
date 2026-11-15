---
id: w4-scrum-kanban
title: Scrum and kanban
week: 4
estimatedMinutes: 14
tags: [execution, agile, process]
---

## Why this matters for a PM

Almost every tech team in India works in some flavour of **agile**, usually Scrum or kanban. You’ll join sprint planning on day one. Knowing the vocabulary, the ceremonies and the PM’s role in each lets you contribute immediately instead of nodding along. Interviewers also ask, “How do you work with an agile team?”

## Core concepts

### Agile in one paragraph

**Agile** is a way of building software in small, frequent increments, getting feedback early, and adapting, rather than planning everything up front and delivering once at the end (the older “waterfall” approach). The core ideas: deliver working software often, collaborate closely with users and the team, and respond to change.

### Scrum

**Scrum** is the most common agile framework. Work happens in fixed-length **sprints**, usually 2 weeks.

**Roles:**
- **Product owner (PO):** owns and orders the **product backlog**; clarifies what to build and why. In most product companies, the PM plays this role.
- **Scrum master:** helps the team follow the process, removes blockers, runs ceremonies. Sometimes an engineering manager or a rotating team member does this.
- **Developers:** everyone who builds: engineers, designers, QA. They decide *how* to do the work and how much fits in a sprint.

**Artefacts:**
- **Product backlog:** the ordered list of everything that might be built.
- **Sprint backlog:** the items the team commits to in this sprint, plus the plan to deliver them.
- **Increment:** the working product at the end of the sprint.

**Ceremonies (events):**
1. **Sprint planning** (start of sprint, 1–2 hours): pick the sprint goal and the stories to deliver. PM brings a prioritised, refined backlog and explains the why.
2. **Daily stand-up** (daily, 15 minutes): each person shares progress, plans and blockers. PM listens, unblocks, answers questions. It’s not a status report to the PM.
3. **Backlog refinement / grooming** (mid-sprint, 1 hour): clarify and estimate upcoming stories. PM explains stories; engineers ask questions, split stories and estimate.
4. **Sprint review / demo** (end of sprint): show what was built to stakeholders and gather feedback. PM connects it back to goals.
5. **Retrospective** (end of sprint): the team reflects on *how* they worked. What went well, what didn’t, what to change. PM participates as a team member.

**Sprint goal:** one sentence describing what the sprint achieves, e.g., “Users can receive and view the monthly summary.” It keeps focus when trade-offs come up mid-sprint.

### Kanban

**Kanban** is a flow-based method: no fixed sprints. Work items move across a board as they progress.

- **Board columns:** e.g., To do → In progress → In review → Testing → Done.
- **WIP limits:** a **work-in-progress (WIP) limit** caps how many items can sit in a column at once (e.g., max 3 in “In progress”). This forces the team to finish work before starting more, reducing multitasking and bottlenecks.
- **Pull system:** people pull the next item when they have capacity, from the top of the ordered “To do” column.
- **Metrics:** **cycle time** (how long an item takes from start to done) and **throughput** (items finished per week).

Kanban suits work that arrives unpredictably: support escalations, operations, bug fixing, platform teams handling requests.

### Scrum vs. kanban

| | Scrum | Kanban |
|---|---|---|
| Cadence | Fixed sprints (1–4 weeks) | Continuous flow |
| Planning | Every sprint | As needed; refill “To do” |
| Roles | PO, scrum master, developers | No required roles |
| Change mid-cycle | Discouraged (protect the sprint) | Welcome (reorder anytime) |
| Key metrics | Velocity, sprint goal success | Cycle time, throughput |
| Best for | Product feature development with planned work | Unpredictable, interrupt-driven work |

Many teams use a hybrid (“Scrumban”): sprints for planning rhythm plus a kanban board with WIP limits.

### Velocity

**Velocity** is how many **story points** (a relative size estimate; next lesson) a team completes per sprint, averaged over several sprints. It helps forecast how much fits in future sprints. It’s a planning tool for the team, not a productivity score. Comparing velocity across teams is meaningless because each team sizes differently.

## Worked example

**A 2-week sprint for the P1 settle-up epic (team: 3 engineers, 1 designer, 1 QA, you as PM).**

- **Monday, sprint planning (90 min):** You present the sprint goal: “Users can receive the monthly summary and see what they owe.” The team reviews the top 6 refined stories, asks questions, and commits to 5 based on recent velocity (~24 points). Story 6 (“mute summaries”) stays in the backlog.
- **Daily stand-ups (15 min):** Day 4: an engineer is blocked because the notification provider requires a template approval. You contact the provider and get it approved in a day.
- **Wednesday of week 2, refinement (60 min):** You walk through next sprint’s stories (UPI settle-up). Engineers split “settle via UPI” into happy path and pending-state handling; QA adds two edge cases to the acceptance criteria.
- **Friday of week 2, sprint review (45 min):** The team demos the summary to the support lead and a designer from another team. Feedback: show the date range of the summary. You add a story to the backlog.
- **Retrospective (45 min):** Went well: clear AC. Didn’t go well: late design changes. Action: designs for next sprint must be reviewed by engineers in refinement before planning.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 230" role="img" aria-labelledby="sc-t sc-d">
<title id="sc-t">The Scrum sprint cycle</title>
<desc id="sc-d">A loop: backlog refinement feeds sprint planning, then a two-week sprint with daily stand-ups, ending in a review and a retrospective, then back to planning.</desc>
<defs><marker id="sc-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="20" y="85" width="120" height="60" rx="10" class="d-lavender d-ink" stroke-width="2"/>
<text x="32" y="110" class="d-text-dark" font-weight="700" font-size="12">Product</text>
<text x="32" y="128" class="d-text-dark" font-weight="700" font-size="12">backlog</text>
<rect x="170" y="85" width="120" height="60" rx="10" class="d-sky d-ink" stroke-width="2"/>
<text x="182" y="110" class="d-text-dark" font-weight="700" font-size="12">Sprint</text>
<text x="182" y="128" class="d-text-dark" font-weight="700" font-size="12">planning</text>
<circle cx="390" cy="115" r="62" class="d-butter d-ink" stroke-width="2"/>
<text x="350" y="108" class="d-text-dark" font-weight="700" font-size="12">2-week sprint</text>
<text x="352" y="128" class="d-text-dark" font-size="11">daily stand-ups</text>
<rect x="490" y="30" width="130" height="50" rx="10" class="d-mint d-ink" stroke-width="2"/>
<text x="502" y="60" class="d-text-dark" font-weight="700" font-size="12">Review / demo</text>
<rect x="490" y="150" width="130" height="50" rx="10" class="d-peach d-ink" stroke-width="2"/>
<text x="502" y="180" class="d-text-dark" font-weight="700" font-size="12">Retrospective</text>
<line x1="142" y1="115" x2="166" y2="115" class="d-ink" stroke-width="2" marker-end="url(#sc-a)"/>
<line x1="292" y1="115" x2="324" y2="115" class="d-ink" stroke-width="2" marker-end="url(#sc-a)"/>
<line x1="440" y1="80" x2="486" y2="58" class="d-ink" stroke-width="2" marker-end="url(#sc-a)"/>
<line x1="555" y1="82" x2="555" y2="146" class="d-ink" stroke-width="2" marker-end="url(#sc-a)"/>
<path d="M490 190 C 300 230 120 220 80 150" fill="none" class="d-ink" stroke-width="2" marker-end="url(#sc-a)"/>
<text x="230" y="222" class="d-text" font-size="11">refinement keeps the backlog ready</text>
</svg>
<figcaption>The PM keeps the backlog refined and ordered, sets the why for each sprint, and connects demos back to goals.</figcaption>
</figure>

## Step by step

The PM’s rhythm in a 2-week Scrum team:

1. **Before planning:** top of backlog refined (clear stories with AC, designs linked, estimates done), ordered by priority, with a proposed sprint goal.
2. **Sprint planning:** explain the goal and why it matters; let the team decide how much fits; agree what’s in and out.
3. **During the sprint:** attend stand-ups, unblock quickly, answer questions within hours, protect the sprint from new requests (put them in the backlog).
4. **Mid-sprint refinement:** prepare the next sprint’s stories; involve engineers and design early.
5. **Sprint review:** demo working software to stakeholders; capture feedback as backlog items; show progress on metrics.
6. **Retrospective:** be a team member; own action items you can fix (e.g., earlier design reviews).
7. **Every sprint:** update the PRD and roadmap with decisions and progress.

## Common mistakes

1. **Treating stand-up as a status meeting for the PM.** It’s for the team to coordinate.
2. **Changing sprint scope mid-sprint** for every new request. It destroys focus and trust.
3. **Arriving at planning with an unrefined backlog.** Planning turns into a 3-hour design session.
4. **Using velocity as a performance target.** Teams inflate estimates; the number becomes meaningless.
5. **Skipping retrospectives.** The team stops improving.
6. **Doing “agile” with no feedback.** Shipping every 2 weeks means little if no one checks results with users.

## How it shows up in interviews

> [!INTERVIEW]
> **“What’s the PM’s role in Scrum?”**
> Outline: usually plays product owner → owns and orders the backlog → brings the why and the sprint goal → refines stories with the team → unblocks and decides quickly → demos and connects to outcomes → protects the team’s focus.

> [!INTERVIEW]
> **“A stakeholder wants something urgent added mid-sprint. What do you do?”**
> Outline: assess real urgency (outage/legal vs. nice to have) → if truly urgent, swap with something of similar size, agreed with the team → otherwise add to the backlog for next sprint → communicate the trade-off clearly.

## Practice exercise

**Task (20 minutes):** For each team below, choose Scrum or kanban and give two reasons. Then write a sprint goal for the Scrum ones.

1. A team building Groww’s new mutual fund comparison feature.
2. A team handling escalated payment failures for Razorpay merchants.
3. A team building Swiggy’s Diwali gifting launch.
4. An internal tools team receiving ad-hoc requests from operations.

```answer Reveal a model answer
1. **Scrum.** Planned feature work with a clear scope; benefits from regular demos and planning. Sprint goal: “Users can compare up to 3 funds side by side on returns and expense ratio.”
2. **Kanban.** Work arrives unpredictably and must be handled quickly; WIP limits and cycle time matter more than sprint plans.
3. **Scrum** (with a fixed deadline). Defined scope, a hard date, and regular reviews with marketing. Sprint goal: “Users can browse the gifting collection and send a gift to another address.”
4. **Kanban** (or Scrumban). Requests are ad hoc and vary in size; a pull system with WIP limits prevents overload. A light weekly planning check can help prioritise.
```

## Quiz

```quiz
Q: In Scrum, who decides how much work fits into a sprint?
- [ ] The PM :: The PM prioritises; the team decides capacity.
- [x] The developers (the team doing the work) :: Correct. They forecast what they can deliver.
- [ ] The CEO :: Not part of Scrum.
- [ ] The scrum master alone :: The scrum master facilitates; they don’t decide capacity.

Q: What’s the purpose of a WIP limit in kanban?
- [ ] To limit the number of team members :: Not related.
- [x] To cap work in progress so the team finishes items before starting new ones :: Correct. It reduces multitasking and bottlenecks.
- [ ] To limit the number of bugs :: Not directly.
- [ ] To set sprint length :: Kanban doesn’t use sprints.

Q: Which ceremony focuses on improving how the team works?
- [ ] Sprint review :: Reviews focus on the product increment and feedback.
- [ ] Sprint planning :: Planning focuses on what to build next.
- [x] Retrospective :: Correct. It’s about the team’s process.
- [ ] Daily stand-up :: Stand-ups coordinate daily work.

Q: Why is comparing velocity across teams a bad idea?
- [ ] Velocity is secret :: It’s not secret.
- [x] Each team sizes story points differently, so the numbers aren’t comparable :: Correct.
- [ ] Velocity is always the same :: It varies by team and over time.
- [ ] Velocity measures quality :: It measures completed estimated work, not quality.

Q: Which team is the best fit for kanban?
- [ ] A team building a planned new feature with a launch date :: Scrum usually suits this better.
- [x] A team handling unpredictable support escalations :: Correct. Flow-based work suits kanban.
- [ ] A team running a 3-month research project :: Possibly, but escalations are the clearest fit.
- [ ] Any team with more than 10 people :: Team size isn’t the deciding factor.

Q: What should a PM do with a new non-urgent request mid-sprint?
- [ ] Add it to the current sprint immediately :: Disrupts focus and commitments.
- [x] Add it to the product backlog and prioritise it for a future sprint :: Correct.
- [ ] Ignore it :: Always capture and respond.
- [ ] Ask the team to work weekends :: Not sustainable or fair.
```

## Key takeaways

- **Agile** = small increments, frequent feedback, adapting to change.
- **Scrum**: fixed sprints, PO/scrum master/developers, and five events: **planning, stand-up, refinement, review, retro**.
- **Kanban**: continuous flow, **WIP limits**, measured by **cycle time** and **throughput**.
- The PM brings a **refined, ordered backlog** and the **why**; the team decides **how much** and **how**.
- **Velocity** is a team planning tool, never a cross-team performance score.

*Go deeper (optional):* the Scrum Guide (scrumguides.org) is short and free.
