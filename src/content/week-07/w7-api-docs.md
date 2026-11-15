---
id: w7-api-docs
title: Reading API docs
week: 7
estimatedMinutes: 14
tags: [technical, api, documentation]
---

## Why this matters for a PM

PMs evaluate partner APIs (payments, maps, SMS, KYC, LLMs), scope integrations, and sometimes own developer-facing products. Reading API documentation quickly tells you what’s possible, what it costs, what can go wrong and how long integration might take, before engineers spend a week finding out. It also prepares you for this week’s Postman exercise and for AI APIs in Weeks 9–11.

## Core concepts

### What API docs usually contain

Most good API documentation has the same sections. Learn to find them fast:

1. **Overview / getting started:** what the API does, key concepts, a quick-start example.
2. **Authentication:** how to identify yourself: **API keys** (a secret string sent in a header), **OAuth tokens**, or key + secret pairs. Notes on test vs. live keys.
3. **Base URL and environments:** e.g., `https://api.example.com/v1`, plus a **sandbox/test** environment where nothing real happens (no real money moves).
4. **Endpoints / API reference:** each endpoint’s method, path, parameters, request body, response body and examples.
5. **Errors:** error codes and formats, e.g., `{ "error": { "code": "BAD_REQUEST_ERROR", "description": "amount is required" } }`.
6. **Rate limits:** how many requests you can make, and what happens when you exceed them.
7. **Webhooks:** which events they send, payload formats, retries, how to verify signatures.
8. **Pagination, filtering, sorting:** how to get large lists.
9. **SDKs and libraries:** official code packages for languages and platforms.
10. **Versioning and changelog:** how changes are introduced and deprecated.
11. **Pricing and limits:** sometimes in docs, sometimes on a separate page.
12. **Status page and support:** uptime history, incident updates.

### Reading an endpoint reference

A typical entry looks like this:

> **POST /v1/payment_links**
> Create a payment link.
> **Body parameters**
> - `amount` *integer, required*: amount in paise.
> - `currency` *string, optional, default "INR"*.
> - `description` *string, optional, max 2048 chars*.
> - `customer` *object, optional*: `name`, `email`, `contact`.
> - `expire_by` *integer, optional*: Unix timestamp.
> **Response 200**: `{ "id": "plink_123", "short_url": "https://…", "status": "created" }`
> **Errors**: `400` invalid amount; `401` invalid key.

What to notice:
- **Required vs. optional** parameters.
- **Types and units** (integer paise; Unix timestamp = seconds since 1 January 1970 UTC).
- **Limits** (max length, allowed values).
- **Defaults** (currency defaults to INR).
- **Example requests and responses**; copy these into Postman to try.

### Evaluating an API as a PM

When comparing partners (e.g., two SMS providers or two KYC vendors), use a checklist:

| Area | Questions |
|---|---|
| Capability | Does it do exactly what we need? What’s missing? |
| Reliability | Uptime history on the status page? SLA? Latency? |
| Limits | Rate limits enough for our peak? Quotas? |
| Cost | Price per call/transaction; volume discounts; hidden fees? |
| Integration effort | Clear docs? SDKs for our platforms? Sandbox? Examples? |
| Errors and edge cases | Clear error codes? Retries? Idempotency support? |
| Webhooks | Available events? Retry policy? Signature verification? |
| Security and compliance | Data storage location (important for Indian regulations), certifications, privacy terms |
| Support and stability | Versioning policy, deprecation notice, support response time |

### Quick estimation of integration effort

You can roughly gauge complexity from the docs:
- **Simple:** one or two endpoints, API key auth, synchronous responses (e.g., fetch a quote).
- **Medium:** multiple endpoints, webhooks, pagination, retries (e.g., payment links).
- **Complex:** OAuth flows, multi-step state machines, compliance requirements, reconciliation (e.g., full payment gateway with refunds, disputes and settlements).

### Security habits

- **Never put secret keys in client apps or public repos.** Secret keys belong on servers.
- Use **test keys** in sandbox; keep live keys restricted.
- **Rotate** keys if exposed.
- When you share examples (in PRDs, Postman collections), replace keys with placeholders like `{{API_KEY}}`.

## Worked example

**Task:** Your team wants to add “estimated delivery time” to a quick-commerce checkout using a maps routing API. You read the docs.

**What you find (illustrative):**
- Endpoint: `GET /v1/route?origin=lat,lng&destination=lat,lng&mode=two_wheeler`
- Auth: API key in header `X-Api-Key`.
- Response: `{ "distance_m": 2840, "duration_s": 612, "traffic_duration_s": 790 }`
- Rate limit: 50 requests per second; 429 on excess.
- Pricing: ₹0.40 per request after 10,000 free requests a month.
- Latency: typical 150–300 ms.

**PM analysis:**
- **Capability:** gives travel time (13 minutes with traffic), but not store picking time. ETA = picking time (from our data) + travel time.
- **Rate limit:** at peak, 120 checkouts per second → exceeds 50/s. Options: cache routes by store–area pairs (most customers near a store share routes), or negotiate higher limits.
- **Cost:** 3 million checkouts/month × ₹0.40 = ₹12 lakh/month without caching. With caching at 90% hit rate: ~₹1.2 lakh. Big difference → caching is a requirement.
- **Units:** `duration_s` is seconds → convert to minutes and round up for display.
- **Failure:** if the API fails or times out (set a 500 ms timeout), show a range from historical averages (“12–18 min”).

You’ve now written half the PRD’s technical requirements from 20 minutes of reading.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 240" role="img" aria-labelledby="ad-t ad-d">
<title id="ad-t">Anatomy of API docs</title>
<desc id="ad-d">A documentation page outline with sections for auth, base URL, endpoints, errors, rate limits, webhooks, pricing and changelog, with the most important for PMs highlighted.</desc>
<rect x="20" y="15" width="600" height="210" rx="12" class="d-surface d-ink" stroke-width="2"/>
<rect x="20" y="15" width="150" height="210" rx="12" class="d-lavender d-ink" stroke-width="2"/>
<text x="36" y="44" class="d-text-dark" font-weight="700">Docs sidebar</text>
<g font-size="11">
<text x="36" y="70" class="d-text-dark">Getting started</text>
<text x="36" y="90" class="d-text-dark">Authentication ★</text>
<text x="36" y="110" class="d-text-dark">API reference ★</text>
<text x="36" y="130" class="d-text-dark">Errors ★</text>
<text x="36" y="150" class="d-text-dark">Rate limits ★</text>
<text x="36" y="170" class="d-text-dark">Webhooks</text>
<text x="36" y="190" class="d-text-dark">Pricing ★</text>
<text x="36" y="210" class="d-text-dark">Changelog</text>
</g>
<rect x="190" y="35" width="410" height="40" rx="8" class="d-butter d-ink" stroke-width="2"/>
<text x="204" y="60" class="d-text-dark" font-size="12" font-weight="700">POST /v1/payment_links</text>
<rect x="190" y="85" width="200" height="120" rx="8" class="d-sky d-ink" stroke-width="2"/>
<text x="204" y="108" class="d-text-dark" font-size="11" font-weight="700">Parameters</text>
<text x="204" y="128" class="d-text-dark" font-size="10">amount · integer · required</text>
<text x="204" y="146" class="d-text-dark" font-size="10">currency · string · "INR"</text>
<text x="204" y="164" class="d-text-dark" font-size="10">expire_by · unix time</text>
<rect x="400" y="85" width="200" height="120" rx="8" class="d-mint d-ink" stroke-width="2"/>
<text x="414" y="108" class="d-text-dark" font-size="11" font-weight="700">Example response</text>
<text x="414" y="128" class="d-text-dark" font-size="10">{ "id": "plink_123",</text>
<text x="414" y="146" class="d-text-dark" font-size="10">  "status": "created" }</text>
<text x="414" y="174" class="d-text-dark" font-size="10">Errors: 400, 401, 429</text>
</svg>
<figcaption>★ = read these first as a PM: auth, reference, errors, limits and pricing tell you feasibility and cost.</figcaption>
</figure>

## Step by step

A 30-minute API doc review:

1. **Read the overview** and write one sentence on what the API does.
2. **Find authentication** and note key types (test/live) and where keys must live (server only?).
3. **Find the 2–3 endpoints** your feature needs; note required parameters, units, and response fields.
4. **Read errors** and list the ones your UX must handle.
5. **Check rate limits** against your expected peak.
6. **Check pricing** and estimate monthly cost at your volume.
7. **Check webhooks** (if async), retries and signature verification.
8. **Check the status page** and SLA.
9. **Try it in Postman** using the sandbox (tool guide).
10. **Write a short summary**: fit, gaps, risks, cost, effort estimate, open questions for the vendor.

## Common mistakes

1. **Assuming capability from marketing pages**; the API reference is the truth.
2. **Ignoring rate limits and pricing** until launch.
3. **Missing units and time formats** (paise, seconds, Unix timestamps, UTC).
4. **Exposing secret keys** in apps, screenshots or public repos.
5. **Skipping error handling** in the PRD.
6. **Not checking version deprecation policies**, leading to surprise breaking changes.

## How it shows up in interviews

> [!INTERVIEW]
> **“How would you choose between two SMS/OTP providers?”**
> Outline: requirements (delivery rate and speed by operator, DLT compliance in India, WhatsApp/voice fallback) → test both in sandbox and with small live traffic → compare reliability, latency, cost, rate limits, support, docs quality → consider using both with failover.

> [!INTERVIEW]
> **“You’re the PM for a developer API. How do you know your docs are good?”**
> Outline: time to first successful call, integration completion rate, support tickets per integration, doc page search failures, developer surveys → improve quick starts, examples and error messages.

## Practice exercise

**Task (35 minutes):** Pick one free public API (e.g., a weather API, a public holidays API, or a PIN-code lookup API for India). Read its docs and write a one-page evaluation using the checklist table: capability, auth, 2 endpoints you’d use, rate limits, cost, errors, and one risk. Then make 2 calls in Postman (tool guide).

```answer Reveal a model answer (illustrative, for an Indian PIN-code lookup API)
- **What it does:** returns post office names, district and state for a 6-digit Indian PIN code.
- **Auth:** none for the public endpoint (a risk: no SLA, may change without notice).
- **Endpoints:** `GET /pincode/{pin}` → list of post offices with district/state; `GET /postoffice/{name}` → PIN codes for a branch name.
- **Rate limits:** not documented → must assume low limits; cache results (PIN data rarely changes).
- **Cost:** free.
- **Errors:** returns a status field like "Error" with an empty list for invalid PINs; must handle network failures and empty results.
- **Fit:** good for auto-filling city/state in an address form.
- **Risk:** no uptime guarantee or support; for a production checkout, store a local copy of PIN data (updated monthly) and use the API only as a fallback.
```

## Quiz

```quiz
Q: Where should secret API keys live?
- [ ] Inside the mobile app code :: Apps can be decompiled; secrets would leak.
- [x] On your servers, never in client apps or public repositories :: Correct. Servers keep secrets away from anyone who can inspect the app or the code.
- [ ] In the app’s release notes :: Public; never do this.
- [ ] In a public GitHub README :: Anyone could use your key.

Q: Why use a sandbox environment?
- [ ] It’s faster than production :: Speed isn’t the purpose.
- [x] To test integrations safely without real money or real side effects :: Correct. Sandboxes let you try every path, including failures, safely.
- [ ] It has no rate limits ever :: Sandboxes often have limits too.
- [ ] It replaces production :: You still need production for real users.

Q: A parameter `expire_by` is a Unix timestamp. What does that mean?
- [ ] A date like 15/08/2025 :: That’s a formatted date, not a Unix timestamp.
- [x] The number of seconds since 1 January 1970 UTC :: Correct. Convert it to IST (+5:30) before showing it to users.
- [ ] Minutes until expiry :: That would be a duration, not a timestamp.
- [ ] A random ID :: Unrelated: a timestamp encodes time, not an identifier.

Q: Your peak is 120 requests/second; the API allows 50/second. What’s a good PM response?
- [ ] Ignore it; the API will cope :: You’ll get 429 errors at peak.
- [x] Plan caching or batching and/or negotiate higher limits before launch :: Correct. Solve the limit before users hit 429 errors at peak.
- [ ] Launch and see what happens :: Risky for a user-facing feature.
- [ ] Remove the feature :: Usually there are better options.

Q: Which section of API docs best helps you design error messages?
- [ ] The overview :: Too general: it explains purpose, not specific error codes.
- [x] The errors section listing codes and formats :: Correct. Each error code maps to a message or fallback in your UX.
- [ ] The changelog :: Useful, but not for error UX.
- [ ] The logo page :: Unrelated: branding pages don’t describe behaviour.

Q: An API charges ₹0.40 per call and you expect 3 million calls a month. What’s the cost before free tiers and caching?
- [ ] ₹1.2 lakh :: That’s with 90% caching.
- [x] ₹12 lakh :: Correct. 3,000,000 × ₹0.40 = ₹12,00,000.
- [ ] ₹1.2 crore :: Ten times too high.
- [ ] ₹40,000 :: Far too low: that would be about 100,000 calls, not 3 million.
```

## Key takeaways

- API docs follow a pattern: **overview, auth, reference, errors, rate limits, webhooks, pricing, changelog**.
- For each endpoint, note **required parameters, types, units, defaults and example responses**.
- Evaluate partners on **capability, reliability, limits, cost, effort, security and support**.
- Do the **maths early** (peak rate vs. limits; monthly cost) and plan **caching and failures**.
- **Never expose secret keys**; use **sandboxes** and placeholders.
