---
id: w4-prd
title: PRD structure
week: 4
estimatedMinutes: 16
tags: [execution, prd, writing]
---

## Why this matters for a PM

The **PRD** is the PM’s most recognisable artefact. It turns research and strategy into something a team can build. A good PRD answers the questions engineers and designers will ask before they ask them. Your Week 4 checkpoint is literally a PRD quality test: a developer reviewing it should raise fewer than five open questions.

## Core concepts

### What a PRD is

A **PRD (product requirements document)** describes a feature or product to be built: the problem, who it’s for, what success looks like, what it must do, and what’s out of scope. It’s the shared source of truth for product, design, engineering, QA (quality assurance, the testing function), data, and go-to-market teams.

Modern PRDs are **living documents**: short at first, filled in as discovery progresses, and updated as decisions are made. They describe the **what** and **why**, and leave the **how** to designers and engineers, while capturing constraints.

### The sections of a strong PRD

1. **Title, owner, status, last updated.** Status: Draft / In review / Approved / In development / Launched.
2. **TL;DR (summary).** 3–4 sentences: problem, solution direction, goal metric.
3. **Problem.** The problem statement from Week 2, with evidence (quotes, data).
4. **Goals and success metrics.** Primary metric with baseline and target; secondary metrics; **guardrails**.
5. **Non-goals.** What this project explicitly won’t do. Prevents scope creep.
6. **Users and use cases.** Primary persona and their job; key scenarios.
7. **Requirements.** What the product must do, grouped and prioritised (Must / Should / Could). Often written as user stories with acceptance criteria (next lesson). Include:
   - **Functional requirements**: behaviour (“User can split a bill equally among selected flatmates”).
   - **Non-functional requirements**: qualities like performance (“Summary loads in under 2 seconds on 4G”), reliability, security, accessibility, localisation.
8. **User experience.** Links to flows, wireframes or prototypes. Key states: empty, loading, error, success.
9. **Edge cases.** Unusual situations: no internet, payment pending, user leaves the group mid-month, zero expenses, very large amounts.
10. **Analytics / tracking.** Events to log so success can be measured (Week 6 goes deeper).
11. **Dependencies.** Other teams, APIs, partners, legal approvals.
12. **Risks and mitigations.** Using the four risks.
13. **Launch plan / rollout.** Phases, feature flags, who’s told when (lesson 6 this week).
14. **Open questions.** Things not yet decided, with owners and due dates.
15. **Appendix.** Research, competitor notes, decision log.

### Writing well

- **Be specific.** “Fast” → “under 2 seconds at the 90th percentile on 4G”. The **90th percentile (p90)** means 90% of requests are at least this fast.
- **Use numbers and examples.** “Split ₹1,200 among 3 flatmates → ₹400 each; for ₹1,000 among 3 → ₹333.33, ₹333.33, ₹333.34 (the last person gets the extra paisa).”
- **Write for skimming.** Headings, bullets, tables. Most readers read the TL;DR and the requirements.
- **Separate decided from undecided.** Put open questions in one place.
- **Include what you won’t do.** Non-goals save weeks of debate.

### PRD vs. other documents

- **One-pager / brief:** an early, short version used to get buy-in before full discovery.
- **PRD:** the full spec for building.
- **Design spec:** designer-owned detail of screens and interactions.
- **Tech spec / design doc:** engineer-owned detail of architecture and implementation.

## Worked example

**PRD excerpt: “Auto monthly settle-up” for a flatmate expense app (P1).**

> **TL;DR:** Flatmates avoid asking each other for money, so balances pile up and cause tension. On the 1st of each month, we’ll send every group a neutral, system-generated summary with a one-tap UPI settle-up link. Goal: increase groups settling within 5 days of month-end from 30% to 50% in one quarter.
>
> **Problem:** 5 of 6 interviewees said they’d rather lose money than ask friends (“Asking for ₹230 feels petty”). In the beta, 70% of groups had balances older than 30 days.
>
> **Goals:** Primary: % of groups fully settled within 5 days of the summary (30% → 50%). Secondary: summary open rate ≥ 60%. Guardrail: group leave rate doesn’t increase; notification opt-outs < 2%.
>
> **Non-goals:** No partial settlements in v1. No reminders before the 1st. No support for multiple currencies.
>
> **Requirements (Must):**
> - R1. On the 1st at 10:00 local time, each group with a non-zero balance receives a summary.
> - R2. The summary shows each member’s net amount (owes / is owed) and the top 5 expenses.
> - R3. Each member who owes money gets a “Settle ₹X” button that opens their UPI app with the amount and payee pre-filled.
> - R4. When a UPI payment is confirmed, balances update within 60 seconds for all members.
> - R5. The message tone is neutral and comes from the app, not a person.
>
> **Non-functional:** Summary generation for all groups completes within 30 minutes; works on Android 9+ and iOS 15+; amounts shown in ₹ with two decimals; screen-reader labels on buttons.
>
> **Edge cases:** A member left mid-month (show their final balance, still allow settlement); payment pending for 10 minutes (show “pending”, re-check status, don’t allow double payment); balances under ₹10 (show but don’t nag); group has only one active member (skip).
>
> **Open questions:** (1) Should the payee be one person or each creditor individually? Owner: PM, due Thu. (2) Do we need RBI-related disclosures for collect requests? Owner: legal, due next Mon.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 270" role="img" aria-labelledby="prd-t prd-d">
<title id="prd-t">PRD anatomy</title>
<desc id="prd-d">A document outline grouped into why (problem, goals, non-goals), what (users, requirements, UX, edge cases), and how we’ll ship (tracking, dependencies, risks, launch, open questions).</desc>
<rect x="20" y="20" width="190" height="230" rx="10" class="d-lavender d-ink" stroke-width="2"/>
<text x="36" y="48" class="d-text-dark" font-weight="700" font-size="16">Why</text>
<text x="36" y="78" class="d-text-dark" font-size="12">• TL;DR</text>
<text x="36" y="100" class="d-text-dark" font-size="12">• Problem + evidence</text>
<text x="36" y="122" class="d-text-dark" font-size="12">• Goals + metrics</text>
<text x="36" y="144" class="d-text-dark" font-size="12">• Guardrails</text>
<text x="36" y="166" class="d-text-dark" font-size="12">• Non-goals</text>
<rect x="225" y="20" width="190" height="230" rx="10" class="d-sky d-ink" stroke-width="2"/>
<text x="241" y="48" class="d-text-dark" font-weight="700" font-size="16">What</text>
<text x="241" y="78" class="d-text-dark" font-size="12">• Users + use cases</text>
<text x="241" y="100" class="d-text-dark" font-size="12">• Requirements (M/S/C)</text>
<text x="241" y="122" class="d-text-dark" font-size="12">• Non-functional</text>
<text x="241" y="144" class="d-text-dark" font-size="12">• UX + states</text>
<text x="241" y="166" class="d-text-dark" font-size="12">• Edge cases</text>
<rect x="430" y="20" width="190" height="230" rx="10" class="d-mint d-ink" stroke-width="2"/>
<text x="446" y="48" class="d-text-dark" font-weight="700" font-size="16">How we ship</text>
<text x="446" y="78" class="d-text-dark" font-size="12">• Tracking events</text>
<text x="446" y="100" class="d-text-dark" font-size="12">• Dependencies</text>
<text x="446" y="122" class="d-text-dark" font-size="12">• Risks + mitigations</text>
<text x="446" y="144" class="d-text-dark" font-size="12">• Rollout plan</text>
<text x="446" y="166" class="d-text-dark" font-size="12">• Open questions</text>
</svg>
<figcaption>Engineers read “What” closely; leaders read “Why”; everyone needs “How we ship”.</figcaption>
</figure>

## Step by step

Writing the P1 PRD (aim for 2–3 days, in drafts):

1. **Pick the top feature** from your Now column.
2. **Write the TL;DR first.** If you can’t, you’re not ready.
3. **Paste the problem statement and evidence** from your discovery report.
4. **Define goals**: primary metric (baseline → target), secondary, guardrails.
5. **Write non-goals**: at least 3.
6. **Draft requirements** as numbered items (R1, R2…) and user stories with acceptance criteria (next lesson). Mark Must/Should/Could.
7. **Add non-functional requirements**: speed, devices, accessibility, security, languages.
8. **Brainstorm edge cases**: “What if the user is offline? The amount is zero? Two people act at once? The payment is pending?”
9. **List tracking events** needed to measure the goal.
10. **List dependencies, risks and open questions** with owners and dates.
11. **Review with a developer** (your checkpoint). Count their questions. Answer each in the PRD.

## Common mistakes

1. **Solution with no problem.** Engineers can’t make good trade-offs without the why.
2. **Vague requirements.** “Should be easy to use” can’t be built or tested.
3. **No edge cases.** Engineers find them during development and the timeline slips.
4. **Designing the UI in words.** Describe behaviour and constraints; link to designs for the visuals.
5. **No success metrics.** Nobody knows if the launch worked.
6. **A frozen document.** Decisions made in Slack never reach the PRD, so it becomes wrong.

## How it shows up in interviews

> [!INTERVIEW]
> **“What goes into a good PRD?”**
> Outline: problem with evidence → goals, metrics and guardrails → non-goals → users and use cases → requirements (functional + non-functional) → UX and edge cases → tracking → dependencies, risks, rollout → open questions. Emphasise “why before what” and specificity.

> [!INTERVIEW]
> **Take-home assignment: “Write a PRD for feature X.”**
> Outline: keep it to 3–5 pages, lead with a TL;DR, show research assumptions clearly, include metrics and edge cases, and add a short “what I’d validate first” section. Reviewers look for clarity and judgement, not length.

## Practice exercise

**Task (45 minutes):** Write a one-page mini-PRD for **“Schedule a Zepto order for tomorrow morning”**: TL;DR, problem, goals (primary + guardrail), 3 non-goals, 5 Must requirements, 4 edge cases, 2 open questions.

```answer Reveal a model answer
**TL;DR:** Many late-night shoppers add items but abandon because stores are closed or slots are full. Let users schedule delivery for a morning slot (7–10 a.m.). Goal: recover 30% of late-night abandoned carts as scheduled orders.

**Problem:** 60% of carts abandoned after 11 p.m. come from users who see “store closed” at checkout (data). Reviews: “Why let me add items if you’re closed?”

**Goals:** Primary: % of post-11 p.m. abandoned carts converted to scheduled orders: 0 → 30% in 8 weeks. Guardrails: on-time rate for morning slots ≥ 95%; next-morning instant order volume doesn’t fall by more than 5%.

**Non-goals:** Scheduling beyond tomorrow; recurring schedules; choosing a specific delivery partner.

**Must requirements:**
- R1. When the store is closed or instant slots are unavailable, show “Schedule for tomorrow” on the cart.
- R2. User can choose a 1-hour slot between 7 and 10 a.m.; slots show availability.
- R3. Prices and offers are shown as they will be charged; if prices change by morning, the user is charged the lower of the two.
- R4. Payment is collected at scheduling (prepaid only in v1).
- R5. Users can cancel for free until 6 a.m.

**Edge cases:** item goes out of stock overnight (notify by 6 a.m., refund that item, offer a substitute choice); slot overbooked (cap slots by store capacity); user changes address (block for v1; cancel and re-order); payment pending at midnight (hold slot for 15 minutes, then release).

**Open questions:** Do we allow cash on delivery for scheduled orders later? (Owner: PM + finance.) How do we staff morning picking? (Owner: ops lead.)
```

## Quiz

```quiz
Q: What is the main purpose of a PRD?
- [ ] To describe the database schema :: That belongs in a tech spec.
- [x] To give the team a shared understanding of the problem, goals and requirements so they can build the right thing :: Correct. It’s the source of truth for what and why.
- [ ] To replace conversations with engineers :: It supports conversations; it doesn’t replace them.
- [ ] To get legal approval :: Legal may review parts, but that’s not its main purpose.

Q: Which is a well-written requirement?
- [ ] The summary should be fast :: Not measurable.
- [x] The summary loads in under 2 seconds at the 90th percentile on a 4G connection :: Correct. Specific and testable.
- [ ] Make the screen beautiful :: Subjective and untestable.
- [ ] Use React for the summary screen :: That’s an implementation choice for engineers.

Q: Why include non-goals?
- [ ] To list features for next year :: Non-goals aren’t a future roadmap.
- [x] To make clear what’s out of scope and prevent scope creep and debate :: Correct. Non-goals stop the same scope arguments from returning every week.
- [ ] To show the PM is busy :: Not the purpose.
- [ ] Because templates require them :: They’re useful, not just required.

Q: Which is an edge case for a UPI settle-up feature?
- [ ] User taps “Settle” and payment succeeds :: That’s the main (happy) path.
- [x] Payment stays “pending” for 10 minutes :: Correct. An unusual but realistic situation that needs defined behaviour.
- [ ] The summary shows balances :: Core behaviour.
- [ ] The group has three members :: A normal case.

Q: What does “p90 latency under 2 seconds” mean?
- [ ] The average is 2 seconds :: Average and p90 differ.
- [x] 90% of requests complete in 2 seconds or less :: Correct. p90 means 90% of requests are at or below that value; the slowest 10% may be slower.
- [ ] 90 requests per second :: That’s throughput.
- [ ] The slowest request takes 2 seconds :: That would be the maximum (p100).

Q: A developer reviews your PRD and asks 12 questions. What does it tell you?
- [ ] The developer is difficult :: Questions are useful signal.
- [x] The PRD is missing important detail, likely edge cases, requirements or decisions :: Correct. Answer them in the doc.
- [ ] PRDs don’t need to answer developer questions :: They should anticipate most of them.
- [ ] You should skip the review next time :: Reviews catch problems early.
```

## Key takeaways

- A PRD explains **why, what and how we’ll ship**, and leaves implementation to the team.
- Include **problem + evidence, goals + guardrails, non-goals, requirements, edge cases, tracking, risks, open questions**.
- Make requirements **specific and testable**; use numbers and examples.
- Keep it a **living document**: record decisions and answer questions in the doc.
- Test it with a **developer review**; fewer than 5 open questions is a good bar.
