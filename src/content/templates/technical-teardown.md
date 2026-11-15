---
title: Technical teardown
category: Build
week: 7
summary: Explains how a real feature works under the hood: components, data flow, APIs and the trade-offs behind them. P3 deliverable.
---
## When to use
To show technical depth without being an engineer, for the P3 project, or before working with a platform team.

## How to fill it
1. Choose a feature you can observe (network tab, public API docs, engineering blogs).
2. Draw the **architecture**: client, API, services, data stores, third parties.
3. Walk through **one request** step by step.
4. Name at least 3 **trade-offs** and what the team gave up.
5. Clearly mark guesses as “likely” versus confirmed sources.

<!-- template -->
# Technical teardown: {product} — {feature}

## 1. What the user sees
{one paragraph + screenshot}

## 2. Architecture
{diagram: client → API gateway → services → databases → third parties}

## 3. One request, step by step
1. {client action}
2. {API call: method, endpoint, payload}
3. {service logic}
4. {data read/write}
5. {response and UI update}

## 4. Data model (likely)
| Entity | Key fields | Notes |
|---|---|---|

## 5. Trade-offs
| Decision | Benefit | Cost |
|---|---|---|

## 6. Failure modes
- {what breaks and how the product handles it}

## 7. If I were the PM
{one improvement and the technical work it needs}

**Sources:** {docs, blogs, observation}

<!-- example -->
# Technical teardown: Zomato — live order tracking

## 1. What the user sees
After ordering, a map shows the delivery partner moving, with an ETA that updates every few seconds and status changes (“Food is being prepared”, “Picked up”).

## 2. Architecture
Customer app ↔ API gateway ↔ Order service · Tracking service · ETA service. Delivery partner app → Location ingestion → message queue → Tracking service → cache (latest location per order). Maps provider for routes and tiles.

## 3. One request, step by step
1. Customer opens the tracking screen.
2. App opens a WebSocket (or polls `GET /orders/{id}/tracking` every few seconds).
3. Tracking service reads the partner’s latest location from cache (not the main database, to stay fast).
4. ETA service combines distance, live traffic and the restaurant’s prep time model.
5. Server pushes `{lat, lng, eta_min, status}`; the app animates the marker between points.

## 4. Data model (likely)
| Entity | Key fields | Notes |
|---|---|---|
| Order | id, user_id, restaurant_id, status, created_at | Source of truth |
| PartnerLocation | partner_id, lat, lng, ts | High write volume; kept in cache/stream |
| EtaEstimate | order_id, eta_min, model_version | Recomputed often |

## 5. Trade-offs
| Decision | Benefit | Cost |
|---|---|---|
| Location every ~5 s, not every second | Saves partner battery and data | Marker jumps; app must smooth it |
| Cache for latest location | Very fast reads at peak | Small risk of stale data |
| ETA shown as a single number | Simple for users | Hides uncertainty; misses hurt trust |

## 6. Failure modes
- Partner loses network: show last known location and “Updating…”, keep ETA from model.
- ETA model is wrong at peak: widen to a range (“25–30 min”).

## 7. If I were the PM
Show an ETA range during rain or peak hours. Needs the ETA service to return a confidence interval and an A/B test on complaint rate.

**Sources:** observation of the app, public engineering blog posts on real-time systems, general architecture patterns. Data model is inferred.
