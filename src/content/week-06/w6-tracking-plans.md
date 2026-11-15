---
id: w6-tracking-plans
title: Event tracking plans
week: 6
estimatedMinutes: 14
tags: [analytics, tracking, instrumentation]
---

## Why this matters for a PM

You can only analyse what you track. Teams that launch without a clear tracking plan end up with missing data, inconsistent event names and dashboards nobody trusts. A **tracking plan** is the PM’s contract with engineering about what gets measured. It’s the first part of your P2 deliverable.

## Core concepts

### Events, properties and users

Product analytics tools (Mixpanel, Amplitude, PostHog, GA4) are built on three ideas:

- **Event:** something a user does (or the system does) at a point in time. `order_placed`, `search_performed`, `payment_failed`.
- **Event properties:** details about that event. For `order_placed`: `order_value`, `payment_method`, `restaurant_id`, `item_count`, `coupon_used`.
- **User properties:** facts about the user that change rarely: `city`, `signup_date`, `platform`, `acquisition_channel`, `is_premium`.

**Instrumentation** is the engineering work of adding code that sends these events to the analytics tool.

### What a tracking plan contains

A **tracking plan** is a spreadsheet (or doc) listing every event to be tracked. For each event:

| Column | Meaning | Example |
|---|---|---|
| Event name | Consistent, readable name | `checkout_started` |
| Trigger | Exactly when it fires | When the user taps “Proceed to pay” and the payment screen loads |
| Properties | Name, type, example values | `cart_value` (number, 450), `item_count` (int, 3), `coupon_applied` (bool) |
| Platform | Where it fires | Android, iOS, web |
| Source | Client (app) or server | Server for payments (more reliable) |
| Question it answers | Why we track it | Checkout funnel conversion |
| Owner / status | Who implements; planned / live / verified | Eng: Rahul; live |

### Naming conventions

Pick one convention and stick to it. A popular pattern is **object_action** in snake_case, past tense: `order_placed`, `cart_item_added`, `summary_opened`, `settlement_completed`. Benefits: events group naturally by object and are easy to search.

Avoid:
- Vague names: `click`, `button_tap`, `event1`.
- Including values in names: `clicked_upi_button` and `clicked_card_button` should be one event `payment_method_selected` with a property `method`.
- Inconsistent tense or case: `OrderPlaced`, `order-place`, `placed_order`.

### Client-side vs. server-side events

- **Client-side** events are sent from the app or browser. Easy to add; capture UI interactions. But they can be blocked by ad blockers, lost when the network drops, or duplicated.
- **Server-side** events are sent by your backend. More reliable for business-critical events: payments, orders, subscriptions. Use them as the **source of truth** for money and core outcomes.

A common pattern: track `payment_attempted` client-side (UI) and `payment_succeeded` server-side (truth).

### Track for questions, not for everything

Start from the questions you need to answer:
1. Your **North Star and inputs** (Week 5).
2. The **funnel** steps for your key flows.
3. **Guardrails** (errors, cancellations, opt-outs).
4. The **specific feature success metrics** in the PRD.

“Track everything” creates noise, cost and privacy risk. Tracking too little leaves you blind. A focused plan of 15–30 events covers most early products.

### Privacy and data hygiene

- **Don’t track personal data** you don’t need: no phone numbers, emails, full names, exact addresses or payment details in analytics events. Use internal user IDs.
- Get **consent** where required and respect opt-outs. India’s DPDP Act (Week 11) requires a lawful basis and clear notice for personal data.
- Document **data retention** (how long you keep it).

### Verifying events

After implementation, **QA the tracking**: perform the action on a test device, then check the event arrives with the right properties in the tool’s live view. Mark it “verified” in the plan. Unverified tracking is the main reason dashboards are wrong.

## Worked example

**P2 case: a food app wants to diagnose activation. Tracking plan excerpt.**

| Event | Trigger | Key properties | Source | Question |
|---|---|---|---|---|
| `app_opened` | App comes to foreground | `platform`, `app_version`, `is_first_open` | Client | Activity, version issues |
| `signup_completed` | OTP verified and profile saved | `method` (phone/google), `referral_code_used` | Server | Acquisition → sign-up |
| `location_set` | User confirms delivery address | `method` (gps/manual), `serviceable` (bool) | Client | Are new users in serviceable areas? |
| `restaurant_viewed` | Restaurant menu loads | `restaurant_id`, `cuisine`, `position_in_list`, `source` (search/home) | Client | Discovery |
| `cart_item_added` | Item added to cart | `restaurant_id`, `item_price`, `cart_value` | Client | Intent |
| `checkout_started` | Payment screen loads | `cart_value`, `item_count`, `coupon_applied` | Client | Checkout funnel |
| `payment_failed` | Gateway returns failure | `method`, `error_code` | Server | Payment issues |
| `order_placed` | Order confirmed by backend | `order_id`, `order_value`, `payment_method`, `is_first_order` | Server | Activation (first order) |

**User properties:** `city`, `signup_date`, `platform`, `acquisition_channel`.

With this plan, a PM can build the activation funnel (signup → location set → restaurant viewed → cart → checkout → first order) and segment it by platform, city, channel and app version.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 230" role="img" aria-labelledby="tp-t tp-d">
<title id="tp-t">From user action to dashboard</title>
<desc id="tp-d">A user action in the app triggers an event with properties, which is sent client-side or server-side to the analytics tool and appears in a dashboard.</desc>
<defs><marker id="tp-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="15" y="80" width="120" height="70" rx="10" class="d-surface d-ink" stroke-width="2"/>
<text x="28" y="108" class="d-text" font-weight="700" font-size="12">User taps</text>
<text x="28" y="126" class="d-text" font-size="11">“Place order”</text>
<rect x="165" y="60" width="170" height="110" rx="10" class="d-butter d-ink" stroke-width="2"/>
<text x="178" y="84" class="d-text-dark" font-weight="700" font-size="12">order_placed</text>
<text x="178" y="106" class="d-text-dark" font-size="11">order_value: 450</text>
<text x="178" y="124" class="d-text-dark" font-size="11">payment_method: upi</text>
<text x="178" y="142" class="d-text-dark" font-size="11">is_first_order: true</text>
<text x="178" y="160" class="d-text-dark" font-size="11">user: city, platform…</text>
<rect x="365" y="40" width="120" height="50" rx="10" class="d-sky d-ink" stroke-width="2"/>
<text x="378" y="70" class="d-text-dark" font-size="11" font-weight="700">Client SDK</text>
<rect x="365" y="140" width="120" height="50" rx="10" class="d-mint d-ink" stroke-width="2"/>
<text x="378" y="170" class="d-text-dark" font-size="11" font-weight="700">Server (truth)</text>
<rect x="515" y="80" width="110" height="70" rx="10" class="d-lavender d-ink" stroke-width="2"/>
<text x="528" y="108" class="d-text-dark" font-weight="700" font-size="12">Analytics</text>
<text x="528" y="126" class="d-text-dark" font-size="11">dashboards</text>
<g class="d-ink" stroke-width="2"><line x1="137" y1="115" x2="161" y2="115" marker-end="url(#tp-a)"/><line x1="337" y1="95" x2="361" y2="70" marker-end="url(#tp-a)"/><line x1="337" y1="135" x2="361" y2="160" marker-end="url(#tp-a)"/><line x1="487" y1="65" x2="511" y2="100" marker-end="url(#tp-a)"/><line x1="487" y1="165" x2="511" y2="130" marker-end="url(#tp-a)"/></g>
</svg>
<figcaption>Events carry properties; business-critical events should come from the server.</figcaption>
</figure>

## Step by step

Writing your P2 tracking plan (15+ events):

1. **List the questions** you must answer (North Star, funnel, guardrails, feature metrics).
2. **Map each key flow** step by step and mark where an event is needed.
3. **Name events** using object_action, past tense, snake_case.
4. **Define triggers precisely** (“when the payment screen *loads*”, not “when user goes to pay”).
5. **Add properties** with types and example values; prefer properties over many similar events.
6. **Add user properties.**
7. **Choose client vs. server** for each event; money and orders server-side.
8. **Check privacy**: remove personal data; note consent needs.
9. **Add owner and status** columns; plan a QA step.
10. **Link each event to the question** it answers; delete events with no question.

## Common mistakes

1. **Vague triggers** that engineers interpret differently across platforms.
2. **Duplicate events** with different names on Android vs. iOS.
3. **Values baked into event names** instead of properties.
4. **Tracking personal data** in analytics.
5. **No QA**, so broken events go unnoticed for months.
6. **Tracking added after launch**, losing the baseline you needed.

## How it shows up in interviews

> [!INTERVIEW]
> **“How would you instrument a new checkout flow?”**
> Outline: questions first (conversion, drop-off step, payment failures) → events for each step with triggers → key properties (cart value, method, error code) → server-side for payment outcomes → user properties for segmentation → QA plan → dashboard.

> [!INTERVIEW]
> **“The Android and iOS numbers for the same funnel don’t match. What might be wrong?”**
> Outline: different event names or triggers per platform → client events lost or duplicated → app version differences → time zones → verify with server-side truth and the tracking plan.

## Practice exercise

**Task (35 minutes):** Write a tracking plan of 10 events for **Zerodha Kite’s price alert feature** (set alert, receive alert, act on alert), with triggers, 2–3 properties each, source and the question each answers.

```answer Reveal a model answer
| Event | Trigger | Properties | Source | Question |
|---|---|---|---|---|
| `alert_screen_viewed` | Alert creation screen opens | `entry_point` (watchlist/chart/search) | Client | Where do users start? |
| `alert_created` | Alert saved successfully | `instrument_type`, `condition` (above/below), `channel` (app/whatsapp) | Server | Adoption |
| `alert_creation_failed` | Validation error shown | `error_type` | Client | Usability issues |
| `alert_edited` | User saves changes to an alert | `field_changed` | Server | Do alerts need tuning? |
| `alert_deleted` | User deletes alert | `age_hours`, `was_triggered` | Server | Churn of alerts |
| `alert_triggered` | Price condition met | `instrument_type`, `delay_ms` (from tick to send) | Server | Reliability |
| `alert_delivered` | Channel confirms delivery | `channel`, `delivery_ms` | Server | Delivery health |
| `alert_opened` | User taps the alert notification | `channel`, `minutes_since_trigger` | Client | Engagement |
| `order_started_from_alert` | Order window opens via alert | `instrument_type` | Client | Value of alerts |
| `order_placed_from_alert` | Order confirmed after alert | `order_type`, `minutes_since_alert` | Server | Outcome |

User properties: `trader_segment` (investor/active), `platform`, `account_age_days`.
```

## Quiz

```quiz
Q: What is an event property?
- [ ] A fact about the user that rarely changes :: That’s a user property.
- [x] A detail about a specific event, such as order_value or payment_method :: Correct. Properties let you break down and filter events.
- [ ] The name of the event :: That’s the event name.
- [ ] The analytics tool used :: Not a property.

Q: Which event naming is best?
- [ ] ClickedUPIButton :: Value in the name, inconsistent case.
- [ ] event_17 :: Meaningless: nobody can tell what this event measures.
- [x] payment_method_selected with a property method = upi :: Correct. One event, details in properties.
- [ ] upi :: Too vague: it doesn’t describe an action or an object.

Q: Why track order completion server-side?
- [ ] Server events are cheaper :: Not the main reason.
- [x] They’re more reliable for business-critical outcomes; client events can be blocked, lost or duplicated :: Correct. The server knows for sure whether an order or payment happened.
- [ ] Client events can’t include properties :: They can include properties; reliability is the real difference.
- [ ] Analytics tools only accept server events :: They accept both.

Q: Which should NOT be sent as an analytics event property?
- [ ] cart_value :: A useful, non-personal property for analysing checkout behaviour.
- [ ] payment_method :: Non-personal and useful for comparing payment success.
- [x] The user’s full phone number :: Correct. Personal data doesn’t belong in analytics events.
- [ ] item_count :: Non-personal and useful for basket analysis.

Q: Why define a precise trigger for each event?
- [ ] To make the tracking plan longer :: Not the reason.
- [x] So every platform fires it at the same moment, keeping numbers consistent :: Correct. Precise triggers stop Android and iOS from counting different things under the same name.
- [ ] Because analytics tools require it :: They don’t; consistency does.
- [ ] To reduce app size :: Unrelated: trigger definitions affect data consistency, not app size.

Q: What’s the first step in writing a tracking plan?
- [ ] List every button in the app :: That leads to tracking everything.
- [x] List the questions you need to answer :: Correct. Events should serve questions.
- [ ] Choose an analytics vendor :: Useful, but questions come first.
- [ ] Build the dashboard :: The dashboard depends on events.
```

## Key takeaways

- Analytics = **events + event properties + user properties**.
- A **tracking plan** lists each event’s **name, trigger, properties, source, question and status**.
- Use **object_action** names; put variations in **properties**, not names.
- Track **money and outcomes server-side**; keep **personal data out**.
- Start from **questions**, and **QA** every event before trusting dashboards.
