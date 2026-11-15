---
id: w7-rest-json
title: REST APIs and JSON
week: 7
estimatedMinutes: 14
tags: [technical, api, json]
---

## Why this matters for a PM

APIs are how software talks to other software: your app to your servers, your product to payment gateways, maps, SMS providers and partners. Many products (Razorpay, Twilio, Google Maps) *are* APIs. PMs read API responses, discuss endpoints with engineers, write API requirements, and evaluate partner APIs. This week you’ll call two public APIs in Postman.

## Core concepts

### What an API is

An **API (Application Programming Interface)** is a defined way for one piece of software to request data or actions from another. Think of a restaurant menu: you don’t go into the kitchen; you order from a list of options in a fixed format, and the kitchen returns what you asked for. The API is the menu plus the ordering rules.

### REST

**REST** (Representational State Transfer) is the most common style for web APIs. A REST API:
- Organises data as **resources** (users, orders, restaurants), each with a URL.
- Uses **HTTP methods** to act on them (GET, POST, PUT/PATCH, DELETE).
- Is **stateless** (each request carries what it needs, including authentication).
- Usually returns **JSON**.

### Endpoints

An **endpoint** is a specific URL + method combination:

| Method | Endpoint | Meaning |
|---|---|---|
| GET | `/v1/restaurants?city=Pune` | List restaurants in Pune |
| GET | `/v1/restaurants/42` | Get restaurant 42 |
| POST | `/v1/orders` | Create an order |
| GET | `/v1/orders/9001` | Get order 9001 |
| PATCH | `/v1/orders/9001` | Update part of order 9001 (e.g., delivery instructions) |
| DELETE | `/v1/users/me/cards/7` | Delete saved card 7 |

Conventions: plural nouns for collections (`/orders`), IDs for single items (`/orders/9001`), nested paths for relationships (`/restaurants/42/menu`), and a **version** in the path (`/v1/`) so the API can change without breaking old apps.

### JSON

**JSON (JavaScript Object Notation)** is a text format for structured data, easy for both humans and machines to read.

```json
{
  "order_id": 9001,
  "status": "out_for_delivery",
  "restaurant": { "id": 42, "name": "Udupi Upahar" },
  "items": [
    { "name": "Masala Dosa", "qty": 2, "price": 90 },
    { "name": "Filter Coffee", "qty": 1, "price": 40 }
  ],
  "total": 220,
  "eta_minutes": 12,
  "coupon": null,
  "is_scheduled": false
}
```

JSON building blocks:
- **Object** `{ }`: key–value pairs. Keys are text in double quotes.
- **Array** `[ ]`: an ordered list.
- **Values**: text (`"out_for_delivery"`), numbers (`220`), booleans (`true`/`false`), `null` (no value), objects and arrays (nesting).

PMs read JSON constantly: in API docs, in Postman, in browser DevTools, in bug reports.

### Request bodies and query parameters

- **Query parameters** (in the URL after `?`) usually filter or paginate reads: `?city=Pune&cuisine=south_indian&page=2`.
- **Request bodies** (JSON) carry data for creating or updating: the cart, the address.

### Pagination

APIs rarely return thousands of items at once. They **paginate**: return a page (e.g., 20 items) plus a way to get the next page (a page number or a **cursor**). Infinite scroll in apps is pagination in action.

### Rate limits

Public APIs limit how many requests you can make per minute or day (**rate limits**) to prevent abuse and control cost. Exceeding them returns `429 Too Many Requests`. PMs care because partner API limits can cap your product’s growth or cost money.

### Webhooks

A **webhook** is the reverse of a normal API call: instead of you asking “has the payment completed?” repeatedly (**polling**), the other system calls *your* URL when something happens (“payment.captured”). Payment gateways like Razorpay use webhooks to notify merchants. Webhooks need retries and verification (signatures) to be reliable and secure.

### Other API styles (just recognise them)

- **GraphQL:** the client asks for exactly the fields it needs in one request. Popular for complex apps.
- **gRPC:** fast, binary communication, mostly between internal services.
- **SDKs:** libraries that wrap an API for a specific language or platform so developers don’t write raw HTTP calls.

## Worked example

**Using a payment gateway API (Razorpay-style, simplified) to accept an order payment:**

1. **Your server creates an order with the gateway:**
   `POST /v1/orders` with body `{ "amount": 22000, "currency": "INR", "receipt": "order_9001" }` (amounts are often in **paise**, the smallest unit, to avoid decimals: ₹220 = 22000 paise).
   Response: `{ "id": "order_ABC123", "status": "created", "amount": 22000 }`.
2. **The app opens the checkout** with `order_ABC123`; the user pays by UPI.
3. **The gateway sends a webhook** to your server: `payment.captured` with the payment ID and order ID, plus a signature.
4. **Your server verifies the signature**, marks your order as paid, and tells the restaurant to start cooking.
5. **If the webhook is delayed**, your server can also call `GET /v1/payments/{id}` to check status (a fallback).

**PM questions this raises:** What happens if the webhook never arrives? (Polling fallback + timeout + refund policy.) What if the user closes the app mid-payment? (Order stays pending; status check on reopen.) Are amounts in rupees or paise? (A classic bug source: a 100x error.)

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 230" role="img" aria-labelledby="api-t api-d">
<title id="api-t">API request and webhook</title>
<desc id="api-d">Your server calls a payment gateway API to create an order; later the gateway calls your server back with a webhook when payment is captured.</desc>
<defs><marker id="api-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="30" y="60" width="170" height="110" rx="12" class="d-lavender d-ink" stroke-width="2"/>
<text x="46" y="90" class="d-text-dark" font-weight="700">Your server</text>
<text x="46" y="112" class="d-text-dark" font-size="11">order service</text>
<rect x="440" y="60" width="170" height="110" rx="12" class="d-sky d-ink" stroke-width="2"/>
<text x="456" y="90" class="d-text-dark" font-weight="700">Payment gateway</text>
<text x="456" y="112" class="d-text-dark" font-size="11">REST API</text>
<line x1="202" y1="85" x2="436" y2="85" class="d-ink" stroke-width="2" marker-end="url(#api-a)"/>
<text x="220" y="76" class="d-text" font-size="11">1. POST /v1/orders {amount: 22000}</text>
<line x1="436" y1="110" x2="202" y2="110" class="d-ink" stroke-width="2" marker-end="url(#api-a)"/>
<text x="220" y="126" class="d-text" font-size="11">2. 200 OK {id: "order_ABC123"}</text>
<line x1="436" y1="155" x2="202" y2="155" class="d-ink" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#api-a)"/>
<text x="220" y="148" class="d-text" font-size="11">3. Webhook: payment.captured (later)</text>
<text x="110" y="210" class="d-text" font-size="12">You call them (request); they call you back (webhook).</text>
</svg>
<figcaption>Requests pull data on demand; webhooks push events when they happen.</figcaption>
</figure>

## Step by step

Reading any API response like a PM:

1. **Check the status code** first (2xx? 4xx? 5xx?).
2. **Find the top-level keys** in the JSON: what object is this?
3. **Identify IDs** and how they link to other resources.
4. **Check units and formats**: paise vs. rupees, timestamps (UTC or IST?), enums like `"status"`.
5. **Look for nulls and empty arrays**: what does the app show then?
6. **Check pagination**: is there a next page?
7. **Ask what’s missing** for your feature: would you need another endpoint or field?
8. **Write requirements** in API terms when needed: “The order endpoint must return `eta_minutes` and update it every 30 seconds.”

## Common mistakes

1. **Unit confusion** (paise vs. rupees, seconds vs. milliseconds).
2. **Time zone confusion**: servers often use UTC; India is UTC+5:30.
3. **Assuming every field is always present**; handle nulls.
4. **Ignoring rate limits and costs** of partner APIs when planning growth.
5. **Polling too often** instead of using webhooks or sensible intervals.
6. **Breaking changes without versioning**, which crash older app versions still in use.

## How it shows up in interviews

> [!INTERVIEW]
> **“Explain an API to a non-technical person.”**
> Outline: restaurant menu analogy → you request from a fixed list in a fixed format → the kitchen (system) returns what you asked for → example: a food app asks Google Maps for travel time.

> [!INTERVIEW]
> **“You’re the PM for a payments API. What would you measure?”**
> Outline: developer-facing metrics (time to first successful API call, integration completion rate), reliability (success rate, p95 latency, error rates by code, webhook delivery success and delay), adoption (active merchants, volume), and support tickets per integration.

## Practice exercise

**Task (20 minutes):** Read this JSON response and answer the questions.

```json
{
  "rides": [
    {"id": "r1", "status": "completed", "fare_paise": 18450, "driver": {"name": "Ravi", "rating": 4.8}, "started_at": "2025-05-03T03:42:10Z"},
    {"id": "r2", "status": "cancelled", "fare_paise": 0, "driver": null, "started_at": null}
  ],
  "next_cursor": "eyJwYWdlIjoyfQ"
}
```

1. What’s the fare of ride r1 in rupees?
2. What time did ride r1 start in IST?
3. Why might `driver` be null for r2?
4. How would the app get more rides?
5. Write one product requirement you’d raise after seeing this.

```answer Reveal a model answer
1. 18450 paise = **₹184.50**.
2. `03:42:10Z` is UTC (the Z means UTC). IST = UTC + 5:30 → **09:12:10 IST** on 3 May 2025.
3. The ride was cancelled before a driver was assigned (or the cancelled-ride record hides driver details).
4. Call the same endpoint again with the cursor: e.g., `GET /v1/rides?cursor=eyJwYWdlIjoyfQ`, repeating until `next_cursor` is null.
5. Example: “Cancelled rides must include `cancelled_by` (rider/driver/system) and `cancel_reason`, so we can show the right message and analyse driver cancellations.”
```

## Quiz

```quiz
Q: Which endpoint best follows REST conventions for getting order 9001?
- [ ] POST /getOrder?id=9001 :: Uses a verb in the path and POST for a read.
- [x] GET /v1/orders/9001 :: Correct. A GET on a resource URL with the ID.
- [ ] GET /v1/order_9001_details_now :: Unconventional and hard to maintain.
- [ ] DELETE /v1/orders/9001 :: That would delete the order.

Q: In JSON, what does `null` mean?
- [ ] The number zero :: Zero is a number; null means no value.
- [x] No value is present :: Correct. Apps must handle it, e.g., by hiding a field.
- [ ] An error occurred :: Errors are usually shown by status codes and error objects.
- [ ] An empty list :: An empty list is [].

Q: What’s a webhook?
- [ ] A security vulnerability :: Not what it means.
- [x] A call from another system to your URL when an event happens :: Correct. It pushes events instead of making you poll.
- [ ] A type of database :: Unrelated: a webhook is an HTTP callback, not storage.
- [ ] A design tool :: Unrelated: webhooks are a technical integration pattern.

Q: An API returns `429 Too Many Requests`. What happened?
- [ ] The server crashed :: That would be 5xx.
- [x] You exceeded the rate limit :: Correct. Slow down, retry later, or ask for a higher limit.
- [ ] The resource doesn’t exist :: That would be 404 Not Found, not 429.
- [ ] Your login expired :: That’s usually 401.

Q: Why do payment APIs often use amounts in paise?
- [ ] To make numbers look bigger :: Not the reason.
- [x] Whole numbers avoid decimal rounding errors in money calculations :: Correct. ₹184.50 becomes 18450 paise, with no floating-point surprises.
- [ ] RBI requires paise in apps :: Not a general rule for display.
- [ ] Paise are faster to process :: Not meaningfully.

Q: Why put a version like /v1/ in API paths?
- [ ] It improves speed :: Unrelated to speed.
- [x] So the API can evolve without breaking older app versions still in use :: Correct. Old apps keep using /v1 while new ones move to /v2.
- [ ] It’s required by HTTP :: HTTP doesn’t require it.
- [ ] To hide the endpoint :: Not a security measure.
```

## Key takeaways

- An **API** is a defined way for software to request data or actions; **REST** organises it as **resources + HTTP methods**.
- **JSON** = objects `{}`, arrays `[]`, text, numbers, booleans and `null`; PMs read it daily.
- Know **endpoints, query parameters, bodies, pagination, rate limits and versioning**.
- **Webhooks** push events to you; use them (with verification and fallbacks) instead of heavy polling.
- Watch **units and time zones** (paise vs. rupees, UTC vs. IST); they cause real bugs.
