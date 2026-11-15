---
id: w7-client-server
title: Client–server and HTTP
week: 7
estimatedMinutes: 15
tags: [technical, http, architecture]
---

## Why this matters for a PM

Every app you use is a conversation between a **client** (your phone or browser) and **servers** (computers in a data centre). If you understand that conversation, you can follow engineering discussions, ask sharper questions about speed and failures, and explain features like UPI payments end to end, which is exactly your Week 7 checkpoint.

## Core concepts

### Clients and servers

- A **client** is the software the user interacts with: a mobile app (Android/iOS), a website in a browser, or a desktop app. It shows the interface and sends requests.
- A **server** is a computer (usually many) that receives requests, runs business logic, reads and writes data, and sends responses. Servers live in data centres or the cloud (AWS, Google Cloud, Azure).
- The **backend** is everything on the server side: application code, databases, queues, other services. The **frontend** is the client side.

The basic pattern: **the client asks, the server answers.** When you open Swiggy, the app asks the server “What restaurants deliver to this location?”, and the server responds with a list.

### The internet in one paragraph

Clients and servers communicate over the internet using agreed rules called **protocols**. Every device has an **IP address** (like a phone number for computers). Humans use **domain names** (swiggy.com), and the **DNS** (Domain Name System) translates names into IP addresses, like a phone book. Data travels in small chunks called **packets** across many networks to reach the destination.

### HTTP: the language of the web

**HTTP** (HyperText Transfer Protocol) is the protocol clients and servers use to exchange requests and responses. **HTTPS** is HTTP with encryption (via TLS), so others can’t read or tamper with data in transit. Almost all apps use HTTPS today; payments and personal data must.

### An HTTP request has:
1. A **method** (what you want to do):
   - `GET`: read data (get the menu).
   - `POST`: create something (place an order).
   - `PUT` / `PATCH`: update something (change delivery address).
   - `DELETE`: remove something (delete a saved card).
2. A **URL** (where): `https://api.example.com/v1/restaurants?city=Bengaluru`
   - Path: `/v1/restaurants`; **query parameters** after `?`: `city=Bengaluru`.
3. **Headers** (extra information): authentication token, content type, app version, language.
4. A **body** (optional, for POST/PUT): the data you’re sending, usually in JSON (next lesson).

### An HTTP response has:
1. A **status code** (how it went):
   - **2xx success:** `200 OK`, `201 Created`.
   - **3xx redirection:** `301 Moved Permanently`, `304 Not Modified`.
   - **4xx client error** (the request was wrong): `400 Bad Request`, `401 Unauthorized` (not logged in), `403 Forbidden` (logged in but not allowed), `404 Not Found`, `429 Too Many Requests` (rate limited).
   - **5xx server error** (the server failed): `500 Internal Server Error`, `502 Bad Gateway`, `503 Service Unavailable`, `504 Gateway Timeout`.
2. **Headers**: content type, caching rules.
3. A **body**: the data (e.g., the restaurant list).

Why PMs care: error dashboards are often split by status code. A spike in 5xx means our servers are failing; a spike in 4xx may mean a client bug (e.g., the new app version sends bad requests) or an expired-login issue.

### Stateless and sessions

HTTP is **stateless**: each request is independent; the server doesn’t automatically remember previous requests. To know who you are, the client sends a **token** or **cookie** with every request (see the Authentication lesson).

### Timeouts and retries

Networks fail, especially on Indian mobile networks in lifts, metros and rural areas. Clients set **timeouts** (stop waiting after N seconds) and may **retry**. Retrying a “place order” request is dangerous: you could create two orders. Good systems use **idempotency keys** (a unique ID per action so the server processes it only once even if it’s sent twice). This matters a lot for payments.

### Multiple servers and services

Real systems use many servers behind a **load balancer** (which spreads requests across servers), and split functionality into **services** (a menu service, an order service, a payment service). The client usually talks to an **API gateway**, which routes requests to the right service. You’ll see this in your architecture diagram.

## Worked example

**What happens when you tap “Place order” on Swiggy (simplified):**

1. The app builds an HTTPS `POST /v1/orders` request with headers (auth token, app version, an idempotency key) and a JSON body (restaurant, items, address, payment method, coupon).
2. DNS resolves `api.swiggy.com` to an IP address (often cached already).
3. The request travels over the mobile network to Swiggy’s **load balancer**, which picks a healthy server running the **API gateway**.
4. The gateway checks the token (are you logged in?) and routes the request to the **order service**.
5. The order service validates the cart with the **menu service** (are items still available? prices correct?), calculates fees and discounts, and creates a pending order in the **database**.
6. For online payment, it calls the **payment service**, which talks to a payment gateway (e.g., Razorpay/PayU) and returns a payment link or intent to the app.
7. The server responds `201 Created` with the order ID and payment details.
8. After payment confirmation, the order service notifies the restaurant (via the restaurant app) and the delivery system.

**Failure points a PM should know:** network drop after the request is sent (did the order get created? idempotency key prevents a duplicate on retry); menu service slow (timeout → error message); payment gateway down (fallback methods, clear messaging); restaurant offline (auto-cancel and refund rules).

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 250" role="img" aria-labelledby="cs1-t cs1-d">
<title id="cs1-t">Client to server request flow</title>
<desc id="cs1-d">A phone sends an HTTPS request through the internet to a load balancer, then to an API gateway, then to services and a database, and the response returns.</desc>
<defs><marker id="cs1-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="15" y="80" width="90" height="90" rx="14" class="d-lavender d-ink" stroke-width="2"/>
<text x="30" y="118" class="d-text-dark" font-weight="700" font-size="12">Client</text>
<text x="30" y="136" class="d-text-dark" font-size="11">app / browser</text>
<rect x="130" y="100" width="90" height="50" rx="25" class="d-surface d-ink" stroke-width="2"/>
<text x="145" y="130" class="d-text" font-size="11">Internet</text>
<rect x="245" y="95" width="100" height="60" rx="10" class="d-sky d-ink" stroke-width="2"/>
<text x="255" y="120" class="d-text-dark" font-size="11" font-weight="700">Load balancer</text>
<text x="255" y="138" class="d-text-dark" font-size="10">spreads traffic</text>
<rect x="370" y="95" width="100" height="60" rx="10" class="d-sky d-ink" stroke-width="2"/>
<text x="380" y="120" class="d-text-dark" font-size="11" font-weight="700">API gateway</text>
<text x="380" y="138" class="d-text-dark" font-size="10">auth + routing</text>
<rect x="500" y="25" width="120" height="44" rx="10" class="d-mint d-ink" stroke-width="2"/><text x="512" y="52" class="d-text-dark" font-size="11">Order service</text>
<rect x="500" y="103" width="120" height="44" rx="10" class="d-mint d-ink" stroke-width="2"/><text x="512" y="130" class="d-text-dark" font-size="11">Menu service</text>
<rect x="500" y="181" width="120" height="44" rx="10" class="d-mint d-ink" stroke-width="2"/><text x="512" y="208" class="d-text-dark" font-size="11">Payment service</text>
<g class="d-ink" stroke-width="2"><line x1="107" y1="125" x2="126" y2="125" marker-end="url(#cs1-a)"/><line x1="222" y1="125" x2="241" y2="125" marker-end="url(#cs1-a)"/><line x1="347" y1="125" x2="366" y2="125" marker-end="url(#cs1-a)"/><line x1="472" y1="115" x2="496" y2="50" marker-end="url(#cs1-a)"/><line x1="472" y1="125" x2="496" y2="125" marker-end="url(#cs1-a)"/><line x1="472" y1="135" x2="496" y2="200" marker-end="url(#cs1-a)"/></g>
<text x="120" y="200" class="d-text" font-size="11">POST /v1/orders → 201 Created {order_id}</text>
<text x="120" y="218" class="d-text" font-size="11">Each hop can be slow or fail: plan timeouts, retries, idempotency.</text>
</svg>
<figcaption>The client asks; layers of servers route, check and answer. Most product failures happen at one of these hops.</figcaption>
</figure>

## Step by step

Explaining any feature’s request flow (useful for P3 and interviews):

1. **Name the user action** (“tap Pay”).
2. **Identify the client request**: method, endpoint (guess a reasonable name), key data sent.
3. **Trace the server path**: gateway → which services → which databases → which external partners.
4. **Name the response** and status code on success.
5. **List failure points** at each hop and what the user should see.
6. **Note retries and idempotency** for actions that change state (orders, payments).
7. **Mention speed**: which steps add the most latency? (Week 7, latency lesson.)
8. **Draw it** in Excalidraw with labelled arrows.

## Common mistakes

1. **Thinking the app “has” the data.** Most data lives on servers; the app requests it.
2. **Confusing 4xx and 5xx.** 4xx = request problem (often client or user); 5xx = server problem.
3. **Ignoring network failure** on mobile. Design for slow and dropped connections.
4. **Retrying state-changing actions blindly** without idempotency, causing duplicate orders or charges.
5. **Assuming one server.** Real systems have many services, each a possible point of failure.
6. **Using GET to change data.** GET should be safe to repeat; changes use POST/PUT/PATCH/DELETE.

## How it shows up in interviews

> [!INTERVIEW]
> **“What happens when you type a URL into a browser and press Enter?”**
> Outline: DNS lookup → connection (TCP + TLS for HTTPS) → HTTP GET request → server processing → response with HTML/CSS/JS → browser renders, then fetches more resources (images, APIs). Keep it at PM depth.

> [!INTERVIEW]
> **“Users report duplicate charges after a network glitch. What happened and how would you fix it?”**
> Outline: the client timed out and retried a payment request; the server processed both → fix with idempotency keys, server-side duplicate detection, clear pending states in the UI, automatic refunds for duplicates, and monitoring.

## Practice exercise

**Task (25 minutes):** For **booking a cab on Ola**, write the request flow: user action, 3–4 HTTP requests the app likely makes (method + endpoint + key data), the services involved, the success response, and 4 failure points with what the user should see.

```answer Reveal a model answer
**Action:** user sets pickup and drop, chooses Mini, taps “Book”.

**Requests (illustrative names):**
1. `GET /v1/fare-estimate?pickup=…&drop=…&category=mini` → fare range, ETA.
2. `POST /v1/rides` with body {pickup, drop, category, payment_method, idempotency_key} → `201 Created` {ride_id, status: "searching"}.
3. `GET /v1/rides/{ride_id}` repeated every few seconds (or a live connection) → status changes: searching → driver_assigned → arriving.
4. `POST /v1/rides/{ride_id}/cancel` if the user cancels.

**Services:** API gateway; pricing service; ride/booking service; matching (dispatch) service; driver location service; payment service; notification service.

**Failure points:**
- Pricing service slow → show “Fetching fare…” with a retry, don’t block the screen.
- Network drops after tapping Book → on reconnect, check existing ride with the idempotency key; never create two bookings.
- No drivers found → clear message and options (wait, change category, schedule).
- Driver cancels after acceptance → automatic re-matching with priority and an apology message.
```

## Quiz

```quiz
Q: Which HTTP method should be used to place a new order?
- [ ] GET :: GET is for reading data and should be safe to repeat; it shouldn’t create orders.
- [x] POST :: Correct. POST creates a new resource, like an order.
- [ ] DELETE :: DELETE removes resources, the opposite of what’s needed.
- [ ] HEAD :: HEAD fetches only headers, not used for creating data.

Q: A spike in 503 errors most likely means:
- [ ] Users are entering wrong passwords :: That would usually show as 401 errors.
- [x] Servers are overloaded or unavailable :: Correct. 5xx codes indicate server-side failures; 503 means service unavailable.
- [ ] The app sends malformed requests :: That would be 400-type client errors.
- [ ] Pages were moved permanently :: That’s a 301 redirect.

Q: What does DNS do?
- [ ] Encrypts traffic between client and server :: That’s TLS, used in HTTPS.
- [x] Translates domain names like swiggy.com into IP addresses :: Correct. It works like a phone book.
- [ ] Stores the app’s database :: Databases are separate systems.
- [ ] Balances traffic across servers :: That’s a load balancer.

Q: Why are idempotency keys important for payments?
- [ ] They make payments faster :: Speed isn’t their purpose.
- [x] They ensure a retried request is processed only once, preventing duplicate charges :: Correct. The server recognises the repeated key and returns the original result.
- [ ] They encrypt card numbers :: Encryption is handled by TLS and tokenisation.
- [ ] They’re required for GET requests :: They matter for state-changing requests, not reads.

Q: What does “HTTP is stateless” mean?
- [ ] Servers never store any data :: Servers store lots of data in databases.
- [x] Each request is independent, so the client must identify itself (e.g., with a token) every time :: Correct. That’s why tokens are attached to every API call.
- [ ] HTTP only works in one country :: Unrelated to geography.
- [ ] Requests can’t include headers :: Requests routinely include headers.

Q: A 401 response means:
- [ ] The server crashed :: That would be a 5xx error.
- [ ] The resource doesn’t exist :: That would be 404 Not Found, not 401.
- [x] The request isn’t authenticated (e.g., missing or expired login token) :: Correct. The client should refresh the token or ask the user to log in.
- [ ] The request succeeded :: Success is 2xx.
```

## Key takeaways

- **Clients** (apps, browsers) send requests; **servers** process them and respond.
- An HTTP request = **method + URL + headers + body**; a response = **status code + headers + body**.
- **2xx success, 4xx client errors, 5xx server errors**: know the common codes.
- HTTP is **stateless**; clients send **tokens** to identify users.
- Design for **network failure**: timeouts, careful retries and **idempotency keys** for orders and payments.
