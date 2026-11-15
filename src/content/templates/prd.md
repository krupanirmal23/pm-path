---
title: PRD (Product Requirements Document)
category: Build
week: 4
summary: One page that tells engineering, design and business what to build, for whom, why, and how you will know it worked.
---
## When to use
Before engineering starts estimating a feature. Keep it to 1–3 pages. If a section does not apply, write “N/A because…” rather than deleting it, so reviewers know you thought about it.

## How to fill it
1. Write the **problem** before the solution. If you cannot state it in two sentences with evidence, go back to discovery.
2. Make **success metrics** measurable with a baseline and target.
3. Write **requirements as user stories** with acceptance criteria an engineer could test.
4. List **non-goals** to stop scope creep.
5. Keep **open questions** honest; they are a sign of maturity, not weakness.

<!-- template -->
# PRD: {Feature name}

**Owner:** {your name} · **Status:** Draft / In review / Approved · **Last updated:** {date}

## 1. Problem
- **Who:** {user segment}
- **Problem:** {what is painful today, in their words}
- **Evidence:** {interviews, data, tickets}
- **Why now:** {what changed}

## 2. Goals and success metrics
| Metric | Baseline | Target | Timeframe |
|---|---|---|---|
| Primary: {metric} | {x} | {y} | {weeks} |
| Guardrail: {metric} | {x} | must not exceed {y} | |

## 3. Non-goals
- {what this release will not do, and why}

## 4. Users and use cases
- {persona}: {scenario}

## 5. Requirements
| # | User story | Acceptance criteria | Priority |
|---|---|---|---|
| R1 | As a {user}, I want {action} so that {outcome} | Given… when… then… | Must |

## 6. Design
{link to Figma / screenshots; key flows}

## 7. Edge cases and error states
- {empty state, offline, failed payment, permissions…}

## 8. Analytics
{events to track; link to tracking plan}

## 9. Launch plan
{rollout %, beta group, comms, support readiness}

## 10. Risks and open questions
- {question} — owner: {name}, due: {date}

<!-- example -->
# PRD: Monthly settle-up summary

**Owner:** Krupa · **Status:** In review · **Last updated:** 22 Sep

## 1. Problem
- **Who:** Working professionals aged 22–30 sharing a flat in Bengaluru with 2–4 flatmates.
- **Problem:** At month end nobody knows who owes whom. Settling takes several WhatsApp messages and someone always feels awkward asking. “I’d rather lose ₹500 than chase my friend for it.”
- **Evidence:** 9 of 12 interviewees settle late or never; 7 mentioned awkwardness. App data: only 31% of groups record a settlement each month.
- **Why now:** UPI intent links make one-tap payment possible without leaving the app.

## 2. Goals and success metrics
| Metric | Baseline | Target | Timeframe |
|---|---|---|---|
| Primary: % groups fully settled per month | 31% | 45% | 8 weeks after launch |
| Guardrail: notification opt-out rate | 2.1% | must not exceed 3% | |
| Guardrail: group leave rate | 1.4% | must not exceed 1.6% | |

## 3. Non-goals
- No automatic payment collection (regulatory and trust risk).
- No splitting by item for this release.

## 4. Users and use cases
- **Riya (organiser):** wants everyone settled without being the “bad guy”.
- **Arjun (forgetful payer):** wants to pay quickly when reminded, with the exact amount.

## 5. Requirements
| # | User story | Acceptance criteria | Priority |
|---|---|---|---|
| R1 | As a flatmate, I want a summary on the 1st showing my net balance so that I know what to pay | Given a group with expenses, when the 1st arrives at 10:00 IST, then each member gets a push with their net amount | Must |
| R2 | As a payer, I want to settle in one tap so that I don’t type amounts | Tapping “Pay ₹X” opens a UPI app with payee and amount pre-filled | Must |
| R3 | As an organiser, I want to see who has settled | Summary shows a tick next to each settled member | Should |
| R4 | As a member, I want to snooze the reminder | “Remind me in 3 days” reschedules once | Could |

## 6. Design
Figma: “Settle-up v2”. Key flow: push → summary → Pay → UPI app → back to “Settled ✓”.

## 7. Edge cases and error states
- Net balance ₹0: show “You’re all square” and no Pay button.
- UPI app not installed: show UPI ID to copy.
- Payment pending > 10 min: show “Pending, we’ll update you” and don’t allow a second payment.

## 8. Analytics
`summary_viewed`, `pay_tapped`, `payment_confirmed`, `reminder_snoozed` (see tracking plan).

## 9. Launch plan
10% of groups for 2 weeks (A/B), then 50%, then 100% if guardrails hold. Support FAQ ready before 10%.

## 10. Risks and open questions
- Will reminders feel naggy? — Krupa, test in usability round by 30 Sep.
- Do we confirm payment automatically or ask the payee? — Eng lead, by 25 Sep.
