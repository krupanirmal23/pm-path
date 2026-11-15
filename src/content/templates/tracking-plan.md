---
title: Tracking plan
category: Measure
week: 5
summary: A spec of every analytics event and property, so data is consistent and answers your questions.
---
## When to use
Before a feature ships, alongside the PRD. Engineers implement from it and analysts query from it. This is part of the P2 deliverable.

## How to fill it
1. Start from the **questions** you need to answer, then decide events.
2. Name events `object_action` in snake_case, past tense or noun_verb consistently (e.g. `summary_viewed`).
3. Put variations in **properties**, not new events (`platform: android`, not `summary_viewed_android`).
4. Mark where each event fires (client or server). Server events are more reliable for money.

<!-- template -->
# Tracking plan: {feature}

**Questions this answers:**
1. {question}

| Event | Fires when | Properties (type) | Source | Question # |
|---|---|---|---|---|
| | | | client/server | |

**User properties:** {persistent attributes}
**Naming rules:** object_action, snake_case
**QA checklist:** events fire once · properties non-null · test users excluded

<!-- example -->
# Tracking plan: monthly settle-up summary

**Questions this answers:**
1. What % of members open the summary, and how fast?
2. Where do people drop between opening and paying?
3. Does snoozing lead to payment later?
4. Do reminders cause opt-outs?

| Event | Fires when | Properties (type) | Source | Question # |
|---|---|---|---|---|
| `summary_sent` | Summary push is sent | group_id (str), member_id (str), net_amount (int, paise) | server | 1 |
| `summary_viewed` | Summary screen renders | group_id, member_id, entry (push/in_app), minutes_since_sent (int) | client | 1 |
| `pay_tapped` | User taps “Pay ₹X” | group_id, amount (int), upi_app (str) | client | 2 |
| `payment_confirmed` | UPI callback says success | group_id, amount, latency_s (int) | server | 2 |
| `payment_failed` | UPI callback says failure | group_id, reason (str) | server | 2 |
| `reminder_snoozed` | User taps “Remind me in 3 days” | group_id, member_id | client | 3 |
| `notifications_disabled` | User turns off push | screen (str) | client | 4 |

**User properties:** city, signup_date, groups_count, platform
**Naming rules:** object_action, snake_case; amounts in paise as integers
**QA checklist:** events fire once · properties non-null · test users excluded · timestamps in UTC
