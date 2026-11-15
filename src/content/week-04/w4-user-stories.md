---
id: w4-user-stories
title: User stories and acceptance criteria
week: 4
estimatedMinutes: 14
tags: [execution, agile, user-stories]
---

## Why this matters for a PM

User stories are the unit of work most engineering teams pull into sprints. Write them well and the team builds the right thing the first time. Write them badly and you get back-and-forth, rework and bugs. Your Week 4 deliverable needs 12–15 stories with Given/When/Then acceptance criteria.

## Core concepts

### What a user story is

A **user story** is a short description of a piece of functionality from the user’s point of view. The classic format:

> **As a** [type of user], **I want** [some goal or action], **so that** [benefit].

Example: “As a flatmate who owes money, I want to settle my balance with one tap, so that I don’t have to calculate or chase anyone.”

The story is a **placeholder for a conversation**, not a full specification. The details come from talking with the team and are captured in acceptance criteria.

### Why the format helps

- **As a…** forces you to name the user (and reminds the team who they’re building for).
- **I want…** describes behaviour, not implementation.
- **So that…** explains value, so engineers can propose better ways to achieve it.

### Acceptance criteria

**Acceptance criteria (AC)** are the conditions a story must meet to be considered done. They make the story testable. A popular format is **Given / When / Then**, borrowed from **behaviour-driven development (BDD)**:

> **Given** [a starting situation], **when** [the user does something], **then** [the expected result].

Example for the settle-up story:
- **Given** I owe ₹420 in my flat group, **when** I tap “Settle ₹420”, **then** my UPI app opens with ₹420 and the payee pre-filled.
- **Given** my UPI payment succeeded, **when** I return to the app, **then** my balance shows ₹0 within 60 seconds and the group sees “Krupa settled ₹420”.
- **Given** my payment is pending, **when** I return to the app, **then** I see “Payment pending” and the Settle button is disabled for 10 minutes.
- **Given** I owe nothing, **when** I open the summary, **then** no Settle button is shown.

Good AC:
- Cover the **happy path** (everything works) *and* key **edge cases and errors**.
- Are **specific and testable**: a tester could check each one as pass/fail.
- Describe **behaviour**, not UI pixels or code.
- Usually 3–7 per story. More than ~8 often means the story is too big.

### INVEST: what makes a good story

The **INVEST** checklist:
- **I**ndependent: can be built without waiting on other stories, as much as possible.
- **N**egotiable: details can be discussed; it’s not a contract.
- **V**aluable: delivers value to a user or the business.
- **E**stimable: the team understands it well enough to estimate.
- **S**mall: fits comfortably within a sprint (usually a few days of work).
- **T**estable: has clear acceptance criteria.

### Epics, stories and tasks

- An **epic** is a large body of work that groups related stories, for example “Auto monthly settle-up”.
- A **story** is a user-facing slice of the epic.
- A **task** (or sub-task) is technical work needed to complete a story (“create settlement API endpoint”). Engineers usually create tasks.

### Splitting big stories

Big stories are risky. Common ways to split:
- **By workflow step:** view summary → settle → see confirmation.
- **By rule or variation:** equal split first, then custom split.
- **By data type or channel:** UPI first, cash later.
- **By happy path vs. edge cases:** basic success first, then pending/failure handling (but ship error handling before launch).
- **By user type:** person who owes vs. person who is owed.

**Vertical slicing** means each story cuts through all layers (screen, logic, data) to deliver something usable, instead of “build the database” then “build the UI”.

### Definition of Done

Besides story-specific AC, teams agree on a **Definition of Done (DoD)**: checks every story must pass, such as code reviewed, tests written, works on agreed devices, tracking events firing, accessibility labels added, and documentation updated.

## Worked example

**Epic: Auto monthly settle-up (P1).** A sample of stories:

1. **As a group member, I want to receive a monthly summary on the 1st, so that I know where I stand without anyone asking.**
   - Given my group has a non-zero balance, when it’s the 1st at 10:00, then I receive a push notification “Your flat’s monthly summary is ready”.
   - Given my group balance is zero, when it’s the 1st, then no summary is sent.
   - Given I tap the notification, when the app opens, then I land on the summary screen.
2. **As a member who owes money, I want to see exactly what I owe and why, so that I trust the amount.**
   - Given I owe money, when I open the summary, then I see my net amount and the top 5 expenses that make it up.
   - Given there are more than 5 expenses, when I tap “See all”, then I see the full list sorted by date.
3. **As a member who owes money, I want to settle with one tap via UPI, so that settling takes seconds.** (AC as above.)
4. **As a member who is owed money, I want to see who has settled, so that I don’t need to follow up.**
   - Given a member settles, when I view the summary, then their row shows “Settled ✓” with the date.
5. **As a member, I want to mute summaries, so that I’m not bothered if my flat doesn’t need them.**
   - Given I mute summaries, when the 1st arrives, then I don’t receive a notification but the summary is still available in the app.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 230" role="img" aria-labelledby="us-t us-d">
<title id="us-t">Epic, stories and tasks</title>
<desc id="us-d">An epic at the top breaks into three user stories, each with acceptance criteria, and one story breaks into technical tasks.</desc>
<g class="d-ink" stroke-width="2"><line x1="320" y1="58" x2="115" y2="90"/><line x1="320" y1="58" x2="320" y2="90"/><line x1="320" y1="58" x2="525" y2="90"/><line x1="320" y1="150" x2="250" y2="180"/><line x1="320" y1="150" x2="390" y2="180"/></g>
<rect x="190" y="14" width="260" height="44" rx="10" class="d-lavender d-ink" stroke-width="2"/>
<text x="206" y="42" class="d-text-dark" font-weight="700">Epic: Auto monthly settle-up</text>
<rect x="30" y="90" width="170" height="60" rx="10" class="d-sky d-ink" stroke-width="2"/>
<text x="42" y="114" class="d-text-dark" font-weight="700" font-size="12">Story: get summary</text>
<text x="42" y="134" class="d-text-dark" font-size="11">3 Given/When/Then</text>
<rect x="235" y="90" width="170" height="60" rx="10" class="d-sky d-ink" stroke-width="2"/>
<text x="247" y="114" class="d-text-dark" font-weight="700" font-size="12">Story: settle via UPI</text>
<text x="247" y="134" class="d-text-dark" font-size="11">4 Given/When/Then</text>
<rect x="440" y="90" width="170" height="60" rx="10" class="d-sky d-ink" stroke-width="2"/>
<text x="452" y="114" class="d-text-dark" font-weight="700" font-size="12">Story: see who settled</text>
<text x="452" y="134" class="d-text-dark" font-size="11">2 Given/When/Then</text>
<rect x="180" y="180" width="140" height="40" rx="8" class="d-surface d-ink" stroke-width="2"/>
<text x="192" y="205" class="d-text" font-size="11">Task: UPI intent link</text>
<rect x="330" y="180" width="160" height="40" rx="8" class="d-surface d-ink" stroke-width="2"/>
<text x="342" y="205" class="d-text" font-size="11">Task: payment status poll</text>
</svg>
<figcaption>PMs own epics and stories (with acceptance criteria); engineers usually own tasks.</figcaption>
</figure>

## Step by step

Writing 12–15 stories for your P1 backlog:

1. **Start from the PRD requirements** (R1, R2…). Each requirement becomes one or more stories.
2. **Map the user flow** (Miro or paper). Each step usually produces at least one story.
3. **Write each story** in As a / I want / so that form. Use a real persona.
4. **Write 3–7 acceptance criteria** in Given / When / Then. Cover happy path, edge cases and errors.
5. **Run INVEST** on each story. Too big? Split it vertically.
6. **Group stories under epics** (2–3 epics for P1 is typical).
7. **Order the backlog** by priority (Musts first) and dependencies.
8. **Review with a developer**: can they estimate each one? What’s unclear? Update the AC.
9. **Add the stories to Jira** (see the tool guide).

## Common mistakes

1. **Technical tasks disguised as stories.** “As a developer, I want a database table…” isn’t user value. Make it a task under a story.
2. **No “so that”.** Without the why, engineers can’t suggest better solutions.
3. **Vague AC.** “Works correctly” can’t be tested.
4. **Only the happy path.** Errors and edge cases cause most bugs.
5. **Stories too big for a sprint.** Split them.
6. **Horizontal slices.** “Build all APIs” then “build all screens” delays usable value and feedback.

## How it shows up in interviews

> [!INTERVIEW]
> **“Write user stories for a feature that lets Swiggy users tip delivery partners.”**
> Outline: identify users (customer, delivery partner) → 3–5 stories with As/I want/so that → 3–4 Given/When/Then AC for the main one, including edge cases (tip after delivery, failed payment, refund if order cancelled) → note how you’d split and prioritise.

> [!INTERVIEW]
> **“How do you work with engineers on requirements?”**
> Outline: write the why clearly → stories as conversation starters → refine AC together in backlog grooming → invite engineers into discovery → keep the PRD and tickets in sync.

## Practice exercise

**Task (30 minutes):** Write 4 user stories for **“PhonePe: split a restaurant bill with friends”**. For the most important one, write 5 acceptance criteria in Given/When/Then, including at least 2 edge cases. Then show how you’d split one story that’s too big.

```answer Reveal a model answer
**Stories**
1. As the person who paid the bill, I want to split the amount among friends from my contacts, so that each gets a request for their share.
2. As a friend receiving a split request, I want to pay my share in one tap, so that settling takes seconds.
3. As the person who paid, I want to see who has paid and who hasn’t, so that I don’t have to keep track myself.
4. As the person who paid, I want to send a gentle reminder to those who haven’t paid, so that I don’t have to message them personally.

**AC for story 1**
- Given I paid ₹1,800 and select 3 friends, when I choose “Split equally”, then each of the 4 of us is assigned ₹450 and 3 requests are sent.
- Given the amount doesn’t divide evenly (₹1,000 among 3), when I split equally, then shares are ₹333.33, ₹333.33 and ₹333.34.
- Given a selected friend isn’t on PhonePe, when I send the split, then they receive an SMS with a UPI payment link.
- Given I enter custom amounts, when the total doesn’t match the bill, then I see “Amounts don’t add up to ₹1,800” and can’t send.
- Given I have no internet, when I tap Send, then I see an error and my split is saved as a draft.

**Splitting a too-big story:** “As a payer, I want to split bills equally, by percentage, or by items, with reminders and receipts” → split into: (a) split equally; (b) split by custom amounts; (c) split by items from a receipt photo (later); (d) reminders (separate story).
```

## Quiz

```quiz
Q: Which is a well-formed user story?
- [ ] Build a settlement API :: That’s a technical task.
- [x] As a flatmate who owes money, I want to settle with one tap, so that I don’t have to chase or calculate :: Correct. User, goal and benefit.
- [ ] Settle button should be blue :: A design detail, not a story.
- [ ] As a developer, I want a database :: Not user-facing value.

Q: What does Given / When / Then describe?
- [ ] Sprint start, middle and end :: Not related to sprint timing.
- [x] A starting situation, a user action, and the expected result :: Correct. It makes acceptance criteria testable.
- [ ] The user, the goal and the benefit :: That’s the story format.
- [ ] Priority levels :: Unrelated: Given/When/Then describes behaviour, not priority.

Q: Which INVEST letter is broken by a story that takes 4 weeks to build?
- [ ] Independent :: Possibly, but size is the clearest issue.
- [ ] Valuable :: It may still be valuable.
- [x] Small :: Correct. Stories should fit comfortably within a sprint.
- [ ] Testable :: It may still be testable.

Q: What is vertical slicing?
- [ ] Building all screens first, then all backend work :: That’s horizontal slicing.
- [x] Splitting work so each piece cuts through all layers and delivers something usable :: Correct. Each slice can be demoed and tested by users, so feedback comes early.
- [ ] Dividing a team into front-end and back-end :: That’s team structure, not slicing work.
- [ ] Writing stories for each phone size :: Not what it means.

Q: Which acceptance criterion is best?
- [ ] The feature works well :: Not testable.
- [ ] The code is clean :: That’s part of the Definition of Done, not story behaviour.
- [x] Given the payment is pending, when I return to the app, then I see “Payment pending” and can’t pay again for 10 minutes :: Correct. Specific, testable, covers an edge case.
- [ ] Use a loading spinner :: A design detail without context.

Q: What is a Definition of Done?
- [ ] The final acceptance criterion of each story :: AC are story-specific.
- [x] A shared checklist every story must meet, like code review, tests, tracking and accessibility :: Correct. It keeps quality consistent across all stories without repeating it in each one.
- [ ] The launch date :: Unrelated: Definition of Done is about quality checks, not dates.
- [ ] The PM’s approval only :: It covers quality checks, not just approval.
```

## Key takeaways

- A user story is **As a… I want… so that…**: a placeholder for a conversation.
- **Acceptance criteria** in **Given / When / Then** make stories testable; cover **edge cases and errors**.
- Check stories with **INVEST**; split big ones **vertically**.
- **Epics** group stories; **tasks** are engineers’ technical steps.
- A team-wide **Definition of Done** keeps quality consistent.
