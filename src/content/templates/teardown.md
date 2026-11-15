---
title: Product teardown
category: Discover
week: 1
summary: A structured look at an existing product: who it serves, how it makes money, what works, what doesn’t and what you would change.
---
## When to use
To build product sense, prepare for an interview with a company, or start a portfolio piece. Pick one **feature or flow**, not the whole app.

## How to fill it
1. Use the product yourself for at least 30 minutes and take screenshots.
2. Name a specific user and their job-to-be-done before judging anything.
3. Separate observations (“the button is below the fold”) from opinions (“it should move”).
4. End with **one** prioritised recommendation and how you would measure it.

<!-- template -->
# Teardown: {Product} — {feature/flow}

## 1. Snapshot
- **What it is:** {one line}
- **Target users:** {segment}
- **Business model:** {how it makes money}
- **Key competitors:** {2–3}

## 2. User and job-to-be-done
When {situation}, {user} wants to {motivation} so they can {outcome}.

## 3. Flow walkthrough
| Step | What I saw (screenshot) | What works | Friction |
|---|---|---|---|
| 1 | | | |

## 4. Why it is built this way
{business, technical or regulatory reasons behind the design}

## 5. Metrics the team probably watches
- North Star: {metric}
- Inputs: {metrics}

## 6. Opportunities
| Idea | User impact | Business impact | Effort |
|---|---|---|---|

## 7. My recommendation
**Change:** {one thing} · **Why:** {evidence} · **Measure:** {metric and target} · **Risk:** {what could go wrong}

<!-- example -->
# Teardown: Swiggy Instamart — reordering groceries

## 1. Snapshot
- **What it is:** 10–20 minute grocery delivery inside the Swiggy app.
- **Target users:** Urban households and working professionals in metro cities.
- **Business model:** Margin on goods, delivery and small-cart fees, brand advertising.
- **Key competitors:** Blinkit, Zepto, BigBasket Now.

## 2. User and job-to-be-done
When I run out of daily staples on a weekday evening, I (a busy professional) want to restock the same items in under a minute so I can get back to cooking.

## 3. Flow walkthrough
| Step | What I saw | What works | Friction |
|---|---|---|---|
| 1 | Home shows “Buy again” row | Recognises habits | Only 6 items visible; must scroll sideways |
| 2 | Tap item → added | Fast, one tap | No quantity memory (always 1) |
| 3 | Cart shows “Add ₹49 more for free delivery” | Clear nudge | Pushes impulse items |
| 4 | Pay with saved UPI | 2 taps | None |

## 4. Why it is built this way
The small-cart fee raises average order value, which matters because delivery cost per order is roughly fixed. Horizontal rows save vertical space for promoted items.

## 5. Metrics the team probably watches
- North Star: weekly orders per active customer.
- Inputs: repeat rate, average order value, delivery time, basket-building time.

## 6. Opportunities
| Idea | User impact | Business impact | Effort |
|---|---|---|---|
| “Reorder last basket” with quantities | High | Higher repeat rate | Low |
| Smart restock reminders | Medium | More orders | Medium |
| Shared household list | Medium | Larger baskets | High |

## 7. My recommendation
**Change:** Add “Reorder my usual” that remembers quantities. **Why:** 4 of 5 friends I watched rebuilt the same basket item by item, taking ~90 seconds. **Measure:** time to checkout for repeat users (target −40%) and repeat rate (+3 pts). **Risk:** fewer impulse add-ons, so watch average order value as a guardrail.
