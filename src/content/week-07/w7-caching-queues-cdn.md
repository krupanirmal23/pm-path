---
id: w7-caching-queues-cdn
title: Caching, queues and CDNs
week: 7
estimatedMinutes: 14
tags: [technical, architecture, performance]
---

## Why this matters for a PM

Three building blocks explain most of how fast, reliable apps stay fast and reliable at scale: **caches** (remember answers), **queues** (do work later, in order) and **CDNs** (serve files from nearby). When a sale crashes an app, or images load slowly in tier 3 cities, or a notification arrives late, one of these is usually involved. Knowing them helps you make good speed-versus-freshness decisions.

## Core concepts

### Caching

A **cache** is a fast, temporary store of data that’s expensive or slow to get. Instead of asking the database every time, the system checks the cache first.

- **Cache hit:** the data is in the cache → fast response.
- **Cache miss:** not in the cache → fetch from the source (slower), then store it in the cache for next time.
- **TTL (time to live):** how long cached data stays before it expires. Short TTL = fresher data, more load. Long TTL = faster and cheaper, staler.
- **Cache invalidation:** removing or updating cached data when the source changes. Famously hard to get right.

Where caches live:
- **On the device** (app cache, browser cache): previously loaded images, the last-seen menu.
- **On servers** (in-memory stores like Redis): popular restaurant lists, user sessions, computed results.
- **At the edge** (CDN; see below).

**PM questions:** How stale can this be? What happens when the price changes but the cache shows the old price? (Answer: show cached data for browsing, but always confirm prices from the source at checkout.)

### Queues and asynchronous processing

A **message queue** holds tasks (messages) to be processed later by **workers**. The sender puts a message in the queue and moves on; workers take messages off and process them, often in parallel. Examples: RabbitMQ, Amazon SQS, Kafka (Kafka is technically an event-streaming platform, used similarly).

**Synchronous** work happens while the user waits (“confirm payment”). **Asynchronous** work happens in the background (“send the receipt email”, “update loyalty points”, “notify the restaurant”, “resize uploaded images”).

Why queues matter:
- **Speed for users:** the app responds immediately; slow tasks happen afterwards.
- **Absorbing spikes:** during a flash sale, orders queue up instead of crashing services; workers process them as fast as possible.
- **Reliability:** if a worker fails, the message stays in the queue and is retried.
- **Decoupling:** services don’t need to be online at the same time.

Trade-offs: work isn’t instant (there’s **queue lag**); messages can be processed twice (so tasks should be idempotent); ordering can get tricky; failed messages need a **dead-letter queue** (a place for messages that keep failing, for investigation).

**Event-driven systems:** many services publish **events** (“order_placed”) to a stream; other services **subscribe** and react (notifications, analytics, loyalty, fraud checks). This is how one action triggers many follow-ups without the order service knowing about all of them.

### CDNs

A **CDN (content delivery network)** is a network of servers spread across many cities (“edge locations”) that store copies of static files (images, videos, app JavaScript, CSS) close to users. Examples: Cloudflare, Akamai, Amazon CloudFront.

Why it matters:
- **Faster loads:** a user in Guwahati downloads images from a nearby edge server instead of a data centre in Mumbai or Singapore.
- **Less load on origin servers.**
- **Resilience** during traffic spikes.

PMs care because image-heavy products (e-commerce, food menus, social feeds) depend on CDNs for speed, especially on slow networks. Also: image **size and format** (WebP/AVIF, compressed, right resolution) matter as much as the CDN.

### Putting it together

A typical “open restaurant page” request: images come from the CDN; the menu comes from a server cache (refreshed every few minutes); live availability and prices come from the database/service; analytics events are sent asynchronously through a queue.

## Worked example

**Scenario: Big Billion Days–style flash sale on an e-commerce app at midnight.**

Without these building blocks: millions of users hit the product page at once; every request queries the database; the database slows; requests time out; the app shows errors; orders are lost.

With them:
- **CDN** serves product images and app assets from edge locations.
- **Cache** stores product details and sale prices (pre-warmed before midnight, so the first requests are hits, not misses).
- **Inventory** stays in the database with careful locking, because stock must be accurate (no overselling).
- **Queue** accepts “place order” requests and processes them in order; the user sees “Order received, confirming…” and a confirmation within seconds.
- **Async tasks** (emails, invoices, loyalty points, analytics) happen later via queues.
- **Rate limiting / virtual waiting room** lets users in gradually if traffic exceeds capacity.

**PM decisions involved:** What message do users see while an order is queued? How long can confirmation take before users get anxious (and retry, creating duplicates)? Is showing slightly stale “only 3 left!” stock acceptable? (Usually: show approximate stock; confirm at checkout.)

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 260" role="img" aria-labelledby="cq-t cq-d">
<title id="cq-t">Cache, queue and CDN in one request</title>
<desc id="cq-d">The app gets images from a CDN, checks a cache before the database, and puts slow follow-up tasks on a queue processed by workers.</desc>
<defs><marker id="cq-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="15" y="100" width="90" height="60" rx="12" class="d-lavender d-ink" stroke-width="2"/><text x="40" y="135" class="d-text-dark" font-weight="700">App</text>
<rect x="160" y="15" width="130" height="50" rx="10" class="d-peach d-ink" stroke-width="2"/><text x="172" y="38" class="d-text-dark" font-size="12" font-weight="700">CDN edge</text><text x="172" y="54" class="d-text-dark" font-size="10">images, JS (nearby city)</text>
<rect x="160" y="105" width="130" height="50" rx="10" class="d-sky d-ink" stroke-width="2"/><text x="172" y="135" class="d-text-dark" font-size="12" font-weight="700">API server</text>
<rect x="340" y="80" width="120" height="44" rx="10" class="d-butter d-ink" stroke-width="2"/><text x="352" y="100" class="d-text-dark" font-size="12" font-weight="700">Cache</text><text x="352" y="115" class="d-text-dark" font-size="10">hit = fast</text>
<rect x="500" y="80" width="120" height="44" rx="10" class="d-mint d-ink" stroke-width="2"/><text x="512" y="107" class="d-text-dark" font-size="12" font-weight="700">Database</text>
<rect x="340" y="175" width="120" height="44" rx="10" class="d-pink d-ink" stroke-width="2"/><text x="352" y="195" class="d-text-dark" font-size="12" font-weight="700">Queue</text><text x="352" y="210" class="d-text-dark" font-size="10">do later</text>
<rect x="500" y="175" width="120" height="44" rx="10" class="d-surface d-ink" stroke-width="2"/><text x="512" y="195" class="d-text" font-size="12" font-weight="700">Workers</text><text x="512" y="210" class="d-text" font-size="10">email, points…</text>
<g class="d-ink" stroke-width="2"><line x1="107" y1="115" x2="156" y2="45" marker-end="url(#cq-a)"/><line x1="107" y1="130" x2="156" y2="130" marker-end="url(#cq-a)"/><line x1="292" y1="122" x2="336" y2="105" marker-end="url(#cq-a)"/><line x1="462" y1="102" x2="496" y2="102" marker-end="url(#cq-a)"/><line x1="292" y1="140" x2="336" y2="192" marker-end="url(#cq-a)"/><line x1="462" y1="197" x2="496" y2="197" marker-end="url(#cq-a)"/></g>
<text x="466" y="96" class="d-text" font-size="9">miss</text>
</svg>
<figcaption>CDN for static files, cache before the database, queue for work that doesn’t need to happen while the user waits.</figcaption>
</figure>

## Step by step

Using these concepts when specifying a feature:

1. **Mark each piece of data** as static (CDN), frequently read and slow to compute (cache), or must-be-exact (source of truth).
2. **Set freshness tolerances** (“menu prices can be 5 minutes stale for browsing; must be exact at checkout”).
3. **Mark each action** as synchronous (user waits) or asynchronous (background).
4. **Design the waiting states** for async work (“Confirming your order…”, progress, notifications).
5. **Plan for spikes**: expected peak traffic, pre-warming caches, queues, waiting rooms.
6. **Ask about failure**: what if the cache is down (fallback to DB)? What if the queue backs up (delays, alerts)?
7. **Add monitoring metrics**: cache hit rate, queue lag, CDN error rates, image load time.

## Common mistakes

1. **Caching data that must be exact** (balances, stock at checkout) without checks.
2. **No invalidation plan**, so users see old prices or menus for hours.
3. **Making users wait for background tasks** (sending an email before showing “Order placed”).
4. **Ignoring queue lag** in user expectations (“Points added instantly” when they take 10 minutes).
5. **Forgetting image weight**; a CDN can’t fix 3 MB images on 3G.
6. **No plan for spikes** before big sales or launches.

## How it shows up in interviews

> [!INTERVIEW]
> **“How would you prepare an app for a 10x traffic spike during a sale?”**
> Outline: CDN for static assets → pre-warm caches → queue order placement and background tasks → protect inventory consistency → rate limiting / waiting room → load testing beforehand → monitoring and a war room → user messaging for delays.

> [!INTERVIEW]
> **“Users complain they see old prices in the app. What might be happening?”**
> Outline: caching with a long TTL or failed invalidation → check where prices are cached (device, server, CDN) → shorten TTL or invalidate on price change → always confirm price at checkout → show “prices updated” messaging.

## Practice exercise

**Task (20 minutes):** For **Zomato’s restaurant page**, classify these as CDN, cache, source-of-truth (database) or async (queue), and give a freshness tolerance for each: restaurant photos; menu items and prices; item availability (sold out); restaurant rating; “recently ordered by friends”; order confirmation email; delivery ETA estimate.

```answer Reveal a model answer
- **Restaurant photos → CDN.** Freshness: hours to days.
- **Menu items and prices → server cache** for browsing (refresh every few minutes, invalidate on change), **confirmed from the source at checkout.**
- **Item availability (sold out) → near real time** from the source or a short-TTL cache (≤ 1 minute); restaurants toggle items often during peak.
- **Restaurant rating → cache** (updated a few times a day); slight staleness is fine.
- **“Recently ordered by friends” → precomputed + cached**, refreshed hourly; also privacy-sensitive.
- **Order confirmation email → async via queue**; within a minute is fine.
- **Delivery ETA estimate → computed live** by the ETA service (with a short cache for repeated views), because it depends on current rider supply and traffic.
```

## Quiz

```quiz
Q: What happens on a cache miss?
- [ ] The app crashes :: A miss is normal and handled.
- [x] The system fetches data from the source and usually stores it in the cache :: Correct. The next request for the same data becomes a fast hit.
- [ ] The cache returns stale data :: That’s possible on a hit with old data, not a miss.
- [ ] The CDN deletes the file :: Unrelated: a cache miss is about server-side caching, not CDN deletion.

Q: Which task is best done asynchronously via a queue?
- [ ] Verifying the UPI PIN :: The user must wait for this result.
- [x] Sending the order receipt email :: Correct. It doesn’t need to delay the confirmation screen.
- [ ] Showing the payment result :: The user needs this immediately.
- [ ] Checking login credentials :: Needed before proceeding.

Q: What does a CDN mainly do?
- [ ] Stores user passwords :: Not its purpose.
- [x] Serves static files from servers close to users, making loads faster :: Correct. Shorter distance means lower latency for images and scripts.
- [ ] Runs SQL queries :: Databases do that.
- [ ] Sends push notifications :: Separate services do that.

Q: What’s the main trade-off of a long cache TTL?
- [ ] Data is always fresher :: Longer TTL means staler data.
- [x] Faster and cheaper, but data can be more out of date :: Correct. TTL is a freshness-versus-speed dial.
- [ ] It makes the database slower :: It usually reduces database load.
- [ ] It increases image quality :: Unrelated: TTL controls freshness, not quality.

Q: Why do queues help during traffic spikes?
- [ ] They make every task instant :: Queued work happens later.
- [x] They absorb bursts so services process work at a steady pace instead of crashing :: Correct. Work waits in line instead of overwhelming services.
- [ ] They delete extra requests :: They store them for processing.
- [ ] They replace the database :: They complement it.

Q: Which should NOT rely only on a cached value?
- [ ] Restaurant photos :: Fine to cache.
- [ ] Popular dishes list :: Fine to cache.
- [x] The final price charged at checkout :: Correct. Confirm from the source of truth.
- [ ] App icons :: Fine to cache.
```

## Key takeaways

- **Caches** remember answers for speed; manage **TTL** and **invalidation**, and never trust them for exact money values.
- **Queues** let slow work happen **asynchronously**, absorb **spikes** and retry failures; expect **lag**.
- **CDNs** serve static files from **nearby edge servers**; combine with **light images** for slow networks.
- Decide **freshness tolerances** and **sync vs. async** as product decisions.
- Prepare for **spikes** with CDNs, pre-warmed caches, queues and clear waiting states.
