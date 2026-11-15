---
title: Usability test report
category: Design
week: 8
summary: Records tasks, success rates, issues by severity and the changes you made after testing a prototype.
---
## When to use
After testing a prototype with 5+ people (P1 Week 8). Five users find most major problems.

## How to fill it
1. Write **tasks** as realistic goals, not instructions (“You owe your flatmate for groceries. Pay them.”, not “Tap Pay”).
2. Record success, time and quotes for each participant.
3. Rate issues: **Critical** (blocks task), **Major** (slows or confuses), **Minor** (cosmetic).
4. Link each fix to the issue it solves, then retest.

<!-- template -->
# Usability test: {prototype}

**Goal:** {what you want to learn} · **Participants:** {n, who} · **Method:** {moderated/remote, think-aloud}

## Tasks
1. {task}

## Results
| Task | Success (n/5) | Avg time | Notes |
|---|---|---|---|

## Issues
| # | Issue | Severity | Seen by | Quote | Fix |
|---|---|---|---|---|---|

## What worked
- {…}

## Changes for v2
- {change} → solves #{issue}

## Retest result
{did v2 fix it?}

<!-- example -->
# Usability test: FlatSplit settle-up prototype

**Goal:** Can flatmates understand their balance and pay in under 30 seconds? · **Participants:** 5 working professionals sharing flats · **Method:** moderated, think-aloud, Figma prototype on their phones

## Tasks
1. It’s the 1st of the month and you got a notification. Find out how much you owe.
2. Pay what you owe.
3. Check whether Rohan has paid you back.

## Results
| Task | Success (n/5) | Avg time | Notes |
|---|---|---|---|
| 1. Find balance | 5/5 | 6 s | Big net number was clear |
| 2. Pay | 4/5 | 21 s | One person tapped the breakdown first |
| 3. Check Rohan | 2/5 | 48 s | Tick icons not noticed |

## Issues
| # | Issue | Severity | Seen by | Quote | Fix |
|---|---|---|---|---|---|
| 1 | Settled ticks too small to notice | Major | 3/5 | “Where would I see that?” | Add “Paid / Not yet” labels |
| 2 | “Net” confused people | Minor | 2/5 | “Net of what?” | Say “You owe ₹1,240” |
| 3 | Breakdown looks tappable as the pay action | Major | 1/5 | “I thought this pays” | Make Pay a full-width primary button |

## What worked
- One big number at the top. Everyone found it instantly.
- UPI hand-off felt familiar and safe.

## Changes for v2
- Text labels “Paid / Not yet” per member → solves #1
- Plain-language balance → solves #2
- Full-width Pay button, breakdown collapsed → solves #3

## Retest result
v2 with 3 new participants: task 3 success 3/3, average 12 s.
