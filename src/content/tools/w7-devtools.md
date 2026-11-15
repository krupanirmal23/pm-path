---
id: w7-devtools
title: "Chrome DevTools: watch real network requests"
week: 7
estimatedMinutes: 9
tags: [tool, devtools, debugging]
---

## What it is

**Chrome DevTools** is a set of developer tools built into the Chrome browser. The **Network** tab shows every request a web page makes: API calls, images, scripts, with their status codes, sizes and timings.

## Why PMs use it

DevTools lets you see how real products work under the hood: which APIs a page calls, how big the responses are, what slows the page down, and what error a broken feature returns. It’s also the fastest way to write a precise bug report (“the `/cart` API returns 500 when the coupon field is empty”).

## Account setup (free plan)

No account needed. Use Google Chrome (or Microsoft Edge, which has the same tools) on a laptop or desktop.

## Walkthrough: inspect a real product

Pick a public website for a product you’re studying, such as a food delivery or e-commerce website (use the logged-out experience; don’t inspect pages with your personal data while recording or sharing screenshots).

### 1. Open DevTools
1. Open the site in Chrome.
2. Press **F12**, or **Ctrl + Shift + I** (Windows) / **Cmd + Option + I** (Mac), or right-click → **Inspect**.
3. Click the **Network** tab.

### 2. Record a page load
1. Tick **Preserve log** (keeps requests across page navigations) and **Disable cache** (to see a fresh load).
2. Reload the page (**Ctrl/Cmd + R**).
3. Watch requests appear. At the bottom you’ll see totals: number of requests, data transferred, and **Load** time.

### 3. Filter to API calls
1. Click the **Fetch/XHR** filter. These are the API requests the page makes for data (as opposed to images or scripts).
2. Click one request. Look at:
   - **Headers:** the request URL, method (GET/POST), status code, and request/response headers.
   - **Payload:** query parameters or request body sent.
   - **Preview/Response:** the JSON returned (Preview shows it as a collapsible tree).
   - **Timing:** how long each phase took (waiting for the server is “Waiting for server response”, often called TTFB, time to first byte).

### 4. Simulate a slow network
1. In the Network tab, find the throttling dropdown (it says **No throttling**).
2. Choose **Slow 4G** or **3G**. Reload.
3. Notice how long the page takes and what appears first. This is how many users in smaller towns experience the product.
4. Switch back to **No throttling** afterwards.

### 5. Find the heaviest resources
1. Clear filters (click **All**). Click the **Size** column header to sort.
2. Note the 3 largest files. Are they images? Scripts? Write down sizes. Large images are often the easiest performance win.

### 6. Capture evidence for P3
1. For your P3 feature (e.g., live order tracking), find any related API call pattern on a web version or a similar public demo. Note: endpoint path, method, polling interval (repeated requests every few seconds?) or a WebSocket connection (filter **WS**).
2. Take screenshots of the Network tab with the request list and one response preview. Blur anything personal.
3. Write 3 observations: e.g., “The tracking page polls a status endpoint every 10 seconds”, “Images are served from a CDN domain”, “The main page makes 140 requests and transfers 3.2 MB”.

## Tips

- **Right-click a request → Copy → Copy as cURL** to reproduce it in Postman (Import → Raw text). Remove cookies and tokens before sharing.
- **Status codes in red** are errors; check them first when something looks broken.
- **The Console tab** shows JavaScript errors, useful for bug reports.
- **Lighthouse tab** runs a performance and accessibility audit of the page.
- **Respect terms of service**: observe, don’t scrape or abuse APIs.
