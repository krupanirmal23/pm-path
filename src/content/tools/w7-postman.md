---
id: w7-postman
title: "Postman: call two public APIs"
week: 7
estimatedMinutes: 10
tags: [tool, postman, api]
---

## What it is

**Postman** is a tool for sending HTTP requests to APIs and seeing the responses, without writing code. You can save requests into **collections**, use **variables** and **environments**, and share collections with others.

## Why PMs use it

PMs use Postman to explore partner APIs before committing to them, reproduce bugs (“the API returns null for this restaurant”), check what data an endpoint really returns, and understand integration effort. A shared Postman collection is a concrete artefact for your P3 technical teardown.

## Account setup (free plan)

1. Go to postman.com → **Sign up for free** (Google sign-in works).
2. Use the **web app** in your browser, or download the desktop app. (For calling public APIs, the web app works; it may ask you to install the lightweight “Postman Agent” for some requests.)
3. The free plan is enough for personal collections.

## Walkthrough: build the P3 collection

You’ll call two free public APIs. Good options that don’t need sign-up keys (check they’re still available; if not, pick any free public API):
- An **Indian PIN code lookup API** (search “India post pincode API”).
- A **public holidays API** (e.g., one that returns holidays by country code `IN` and year).
- A **weather API** with a free no-key endpoint, or a free key.

### 1. Create a workspace and collection
1. Click **Workspaces → Create Workspace** → name it “P3 Technical teardown”, visibility **Personal**.
2. Click **New → Collection** → name it “P3 – public APIs”.
3. In the collection’s **Overview**, write a one-line description of what it demonstrates.

### 2. Make your first GET request
1. Inside the collection, click **Add a request**. Name it “PIN lookup – 560001”.
2. Method: **GET**. URL: the PIN API’s endpoint with `560001` (Bengaluru GPO area).
3. Click **Send**.
4. Look at: the **status code** (top right, e.g., `200 OK`), the **time** (latency in ms), the **size**, and the **body** (JSON). Click **Pretty** to format it.
5. Try an invalid PIN (e.g., `000000`) as a second request. What does the API return? Status 200 with an error field, or a 4xx? Note it: this is exactly the error-handling detail PMs need.

### 3. Use query parameters
1. Add a request to the holidays API: e.g., `GET …/PublicHolidays/2025/IN` (exact format depends on the API you choose).
2. If the API uses query parameters, open the **Params** tab and add them as key/value rows; Postman builds the URL for you.

### 4. Add variables
1. Click the collection → **Variables** tab. Add `base_url_pin` and `base_url_holidays` with the API base URLs.
2. Replace the start of each request URL with `{{base_url_pin}}`, `{{base_url_holidays}}`.
3. If an API needs a key, store it as a variable `api_key` (type **secret**) and reference it in headers as `{{api_key}}`. Never paste real keys into shared descriptions.

### 5. Add a simple test (optional but impressive)
1. Open a request → **Scripts** (or **Tests**) tab → add:
```javascript
pm.test("Status is 200", () => pm.response.to.have.status(200));
pm.test("Responds within 1500ms", () => pm.expect(pm.response.responseTime).to.be.below(1500));
```
2. Send again and check the **Test Results** tab.

### 6. Document each request
1. In each request’s **Docs** pane (the document icon on the right), write: purpose, key response fields, units, and error behaviour you observed.
2. Example: “Returns post offices for a PIN. `District` and `State` used to autofill address. Invalid PIN → status 200 with `Status: "Error"` and empty list → UI must handle.”

### 7. Share
1. Collection **⋯ → Export** → Collection v2.1 (JSON). Save it and add it to your P3 GitHub repo (with no secrets).
2. Or **Share → Via link** with view access (requires your workspace to allow it).
3. Screenshot a request with its response for your P3 write-up.

## Tips

- **Read the status code before the body.**
- **Watch the response time**; it’s real latency from your network.
- **Use the Console** (bottom bar) to see the exact request sent, including headers.
- **Save examples**: after a good response, click **Save Response → Save as example**; it documents the API for others.
- **Never commit or share secret keys**; use variables and placeholders.
