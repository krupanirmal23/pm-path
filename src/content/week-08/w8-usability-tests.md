---
id: w8-usability-tests
title: Running usability tests
week: 8
estimatedMinutes: 16
tags: [ux, research, usability-testing]
---

## Why this matters for a PM

A **usability test** is the most direct way to find out whether people can actually use what you’ve designed. Watching five people try your prototype will reveal most major problems before engineers write code. It’s cheap, fast and humbling. Your Week 8 deliverable is a usability report from 5 tests, and your checkpoint is that 4 of 5 testers complete the main task on version 2 without help.

## Core concepts

### What a usability test is

In a usability test, a **participant** (a real or representative user) tries to complete **realistic tasks** with a product or prototype while a **facilitator** observes, asks them to think aloud, and takes notes. You measure whether they succeed, how long it takes, where they struggle and why.

It tests **usability risk** (can they use it?), not value risk (do they want it?). Combine both by asking a few value questions at the end, carefully.

### Why five users?

Research by usability experts (popularised by Jakob Nielsen) showed that testing with about **5 users** reveals most of the major usability problems in a design, because the same big problems show up repeatedly. It’s better to run **several small rounds** (5 users → fix → 5 users) than one big round. If you have very different user groups, test ~5 from each.

### Moderated vs. unmoderated

- **Moderated:** a facilitator is present (in person or on a video call) and can ask follow-up questions. Richer insight; takes your time.
- **Unmoderated:** participants complete tasks alone using a tool (like Maze) that records clicks, paths and time. Faster and scalable; you can’t ask “why?” in the moment.

For your P1, run moderated tests on Google Meet (or in person), and optionally an unmoderated round in Maze.

### Writing good tasks

A **task** is a realistic goal, written as a scenario, without giving away the answer.
- Bad: “Click ‘Settle up’ and pay with UPI.” (Tells them where to click.)
- Good: “It’s the 1st of the month. Your flatmate says you owe money for groceries. Find out how much you owe and pay it.”

Tips:
- Use the user’s words, not your UI labels.
- Give enough context (scenario, motivation).
- Have a clear **success criterion** for each task (what counts as completed).
- 3–5 tasks per session; the most important task first or second.

### Think-aloud protocol

Ask participants to **think aloud**: say what they’re looking at, thinking and trying to do. “I’m looking for… I expected this to… I’m not sure what this means…” It reveals the *why* behind actions. Practise with a warm-up task (“think aloud while you find today’s weather in your phone”).

### The facilitator’s rules

1. **Don’t help.** If they’re stuck, ask “What would you do if I weren’t here?” or “What are you looking for?” Only step in after a set time (e.g., 2–3 minutes), and mark the task as “completed with help”.
2. **Don’t lead.** Avoid “Did you see the button at the bottom?”
3. **Stay neutral.** Don’t say “Great!” when they succeed; it biases behaviour.
4. **Reflect questions back.** If they ask “Should I tap this?”, reply “What do you think it would do?”
5. **Reassure them** at the start: “We’re testing the design, not you. You can’t do anything wrong.”

### What to measure

- **Task success:** completed without help / with help / failed.
- **Time on task** (rough, for moderated tests).
- **Errors:** wrong taps, dead ends, misunderstandings.
- **Severity of each issue** (0–4, as in heuristic evaluation).
- **Ease rating** after each task: “How easy was that, 1 (very hard) to 5 (very easy)?” (A **Single Ease Question**, SEQ, often uses a 7-point scale; either is fine if consistent.)
- **Quotes**: exact words that capture confusion or delight.

### The test session structure (30–45 minutes)

1. **Intro (3 min):** thanks, purpose, consent to record, “testing the design not you”, think-aloud instructions.
2. **Background questions (3–5 min):** relevant habits (“How do you usually split expenses?”).
3. **Tasks (20–25 min):** one at a time; observe; ease rating after each.
4. **Debrief (5 min):** overall impressions, what was hardest, anything confusing; optional value questions.
5. **Thanks.**

### Analysing results

1. **Make a grid**: tasks × participants, with success outcome per cell.
2. **List every issue** observed, with how many participants hit it and severity.
3. **Prioritise**: frequency × severity (an issue hitting 4 of 5 people with severity 4 comes first).
4. **Recommend fixes** for the top issues; create **version 2**.
5. **Retest** v2 with 5 new participants (your checkpoint).

### The usability report

A short report includes: goals, method (participants, tasks), results grid, top issues with evidence (quotes, screenshots) and severity, recommendations, v1 vs. v2 comparison.

## Worked example

**P1 usability test: “Settle monthly balance” prototype v1, 5 participants (flatmates, 22–30, Bengaluru).**

**Tasks:**
1. “It’s the 1st. Find out how much you owe your flatmates this month.”
2. “Pay what you owe.”
3. “You think the groceries amount is wrong. Tell your flatmates.”

**Results (v1):**

| Task | P1 | P2 | P3 | P4 | P5 | Success |
|---|---|---|---|---|---|---|
| 1. Find amount | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 |
| 2. Pay | ✓ | help | ✓ | ✗ | help | 2/5 unaided |
| 3. Dispute | ✗ | ✗ | help | ✗ | ✓ | 1/5 unaided |

**Top issues:**
1. **“Settle” button scrolled out of view below the expense list** (4/5 searched for it; severity 3). Quote: “Okay… how do I actually pay?”
2. **Dispute option hidden in a ⋯ menu on each expense** (4/5 couldn’t find it; severity 3). Quote: “I’d just message them on WhatsApp.”
3. **After paying, unclear whether the balance updated** (3/5; severity 2).

**v2 changes:** sticky “Settle ₹420” button; “Something wrong?” link visible under the expense list and on each expense; explicit “Paid ✓ Balance updated” state.

**v2 results (5 new participants):** Task 2: 5/5 unaided; Task 3: 4/5 unaided. **Checkpoint passed: 4 of 5 completed the main task (pay) without help, in fact 5 of 5.**

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 230" role="img" aria-labelledby="ut-t ut-d">
<title id="ut-t">Usability testing loop</title>
<desc id="ut-d">A loop: prototype version one, test with five users, find issues, fix, prototype version two, test with five new users.</desc>
<defs><marker id="ut-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="20" y="85" width="110" height="60" rx="10" class="d-lavender d-ink" stroke-width="2"/><text x="36" y="112" class="d-text-dark" font-weight="700" font-size="12">Prototype v1</text><text x="36" y="130" class="d-text-dark" font-size="11">clickable</text>
<rect x="170" y="85" width="110" height="60" rx="10" class="d-sky d-ink" stroke-width="2"/><text x="186" y="112" class="d-text-dark" font-weight="700" font-size="12">Test 5 users</text><text x="186" y="130" class="d-text-dark" font-size="11">think aloud</text>
<rect x="320" y="85" width="110" height="60" rx="10" class="d-pink d-ink" stroke-width="2"/><text x="336" y="112" class="d-text-dark" font-weight="700" font-size="12">Issues</text><text x="336" y="130" class="d-text-dark" font-size="11">freq × severity</text>
<rect x="470" y="85" width="150" height="60" rx="10" class="d-mint d-ink" stroke-width="2"/><text x="486" y="112" class="d-text-dark" font-weight="700" font-size="12">Fix → v2</text><text x="486" y="130" class="d-text-dark" font-size="11">retest 5 new users</text>
<g class="d-ink" stroke-width="2"><line x1="132" y1="115" x2="166" y2="115" marker-end="url(#ut-a)"/><line x1="282" y1="115" x2="316" y2="115" marker-end="url(#ut-a)"/><line x1="432" y1="115" x2="466" y2="115" marker-end="url(#ut-a)"/></g>
<path d="M545 147 C 545 210 225 210 225 150" fill="none" class="d-ink" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#ut-a)"/>
<text x="300" y="215" class="d-text" font-size="12">small rounds, repeated, beat one big study</text>
</svg>
<figcaption>Five users per round, fix the biggest issues, retest. Checkpoint: 4 of 5 succeed unaided on v2.</figcaption>
</figure>

## Step by step

Running your 5 P1 tests:

1. **Define goals**: what do you need to learn?
2. **Recruit 5 participants** who match your persona (reuse your Week 2 screener list; new people are better than your interviewees).
3. **Write 3–4 scenario tasks** with success criteria. Pilot with a friend.
4. **Prepare the prototype link** (Figma) and test it on a phone (share screen) or laptop.
5. **Prepare a notes grid**: tasks × participants, issues column, quotes column.
6. **Run sessions** (30–45 minutes each): intro, background, tasks with think-aloud, ease rating, debrief.
7. **Analyse within 24 hours**: success grid, issues with frequency and severity, quotes.
8. **Create v2** fixing the top 3–5 issues.
9. **Retest v2** with 5 new participants; compare results.
10. **Write the usability report** (template in PM Path).

## Common mistakes

1. **Leading tasks** that tell users where to click.
2. **Helping too early**, hiding real problems.
3. **Testing with colleagues** who know the product.
4. **Asking “Do you like it?”** instead of watching behaviour.
5. **Testing too late**, when changes are expensive.
6. **No prioritisation**, so the report is a long, unranked list.

## How it shows up in interviews

> [!INTERVIEW]
> **“How would you test a new checkout design before launch?”**
> Outline: clickable prototype → 5 representative users per round → realistic scenario tasks → think-aloud, no help → measure success, time, errors, ease → prioritise by frequency × severity → iterate → then A/B test in production for impact.

> [!INTERVIEW]
> **“What’s the difference between a usability test and an A/B test?”**
> Outline: usability tests are qualitative, small, explain *why* people struggle, done before launch; A/B tests are quantitative, large, measure *whether* a change moves a metric, done in production. Use both.

## Practice exercise

**Task (30 minutes):** Write a usability test plan for **a new “split bill” feature in a payments app**: goals, participant criteria, 4 scenario tasks with success criteria, 3 debrief questions, and how you’ll judge success.

```answer Reveal a model answer
**Goals:** Can users split a bill among friends, understand who has paid, and remind someone, without help?

**Participants:** 5 people aged 20–35 who paid a shared bill for friends in the last month and use UPI weekly; not employees of payment companies.

**Tasks**
1. “You paid ₹1,800 for dinner with three friends. Ask each friend for their share.” Success: requests sent to 3 friends for ₹450 each.
2. “One friend only had a drink. Change their share to ₹200 and split the rest among the others.” Success: custom amounts summing to ₹1,800.
3. “Check who has already paid you back.” Success: correctly names paid/unpaid friends.
4. “A friend hasn’t paid after two days. Remind them.” Success: reminder sent to the right person.

**Debrief:** What was the hardest part? Was anything surprising or unclear? How does this compare with how you usually get money back from friends?

**Success criteria:** ≥ 4 of 5 complete tasks 1 and 3 unaided; average ease ≥ 4/5; no severity-4 issues remaining before build.
```

## Quiz

```quiz
Q: Why is testing with about 5 users often enough for one round?
- [ ] Five is a legal requirement :: There’s no such rule.
- [x] Major usability problems repeat across users, so 5 reveal most of them; then fix and test again :: Correct. Small repeated rounds find more problems per hour spent.
- [ ] Five users give statistical significance :: Usability tests are qualitative, not statistical.
- [ ] More users always confuse the results :: More users can help, but small repeated rounds are more efficient.

Q: Which is the best usability test task?
- [ ] Tap “Settle” and choose UPI :: Leads the user by naming the UI.
- [x] Your flatmate says you owe money for groceries. Find out how much and pay it. :: Correct. Realistic scenario without hints.
- [ ] Do you like the settle screen? :: An opinion question, not a task.
- [ ] Explore the app :: Too vague to measure success.

Q: A participant is stuck and asks, “Should I tap this?” What should you say?
- [ ] Yes, tap it :: That’s helping and invalidates the task.
- [x] What do you think it would do? :: Correct. Reflect the question back.
- [ ] No, the button is at the bottom :: Leading and helping.
- [ ] End the session immediately :: Unnecessary; stay neutral and observe.

Q: How should you prioritise usability issues?
- [ ] By which designer created the screen :: Irrelevant: who designed it doesn’t change user impact.
- [x] By frequency (how many users hit it) and severity :: Correct. Common, severe issues come first.
- [ ] Alphabetically :: Not meaningful.
- [ ] By how easy they are to fix only :: Effort matters for planning, but impact comes first.

Q: What does a usability test mainly reduce?
- [ ] Viability risk :: That’s about the business model.
- [x] Usability risk :: Correct. Whether users can figure out how to use it.
- [ ] Feasibility risk :: That’s about whether engineers can build it.
- [ ] Market risk only :: Not the main focus.

Q: What’s the main difference between moderated and unmoderated tests?
- [ ] Moderated tests have no tasks :: Both use tasks.
- [x] A facilitator is present in moderated tests and can ask follow-up questions :: Correct. That’s why moderated tests explain the “why”.
- [ ] Unmoderated tests use more users always :: Often, but not by definition.
- [ ] Moderated tests are always in person :: They can be remote.
```

## Key takeaways

- A usability test watches **real users** attempt **realistic tasks** while **thinking aloud**.
- **5 users per round** reveals most major issues; run **small, repeated rounds**.
- Write **scenario tasks** without hints; **don’t help or lead**; reflect questions back.
- Measure **success, errors, time, ease ratings**, and capture **quotes**.
- Prioritise by **frequency × severity**, fix, and **retest v2** with new users.
