---
id: w7-scalability-latency
title: Scalability and latency
week: 7
estimatedMinutes: 14
tags: [technical, performance, architecture]
---

## Why this matters for a PM

Speed is a feature. Slow apps lose users, especially on Indian mobile networks, and a product that works for 10,000 users can collapse at 1 million. **Latency** (how long things take) and **scalability** (handling more load) shape user experience, cost and reliability. PMs set performance requirements, prioritise performance work, and make trade-offs when engineers say “we need to rebuild this to scale”.

## Core concepts

### Latency

**Latency** is the time between a request and its response. It’s measured in **milliseconds (ms)**. User perception, roughly:
- **< 100 ms:** feels instant.
- **100 ms – 1 s:** noticeable but smooth.
- **1 – 3 s:** users feel the wait; attention starts to wander.
- **> 3 s:** many users give up, especially on landing pages and checkout.

Where latency comes from:
- **Network:** distance and connection quality (4G vs. weak signal vs. Wi-Fi). Each round trip between phone and server costs time.
- **Server processing:** business logic, calls to other services.
- **Databases:** slow queries, missing indexes.
- **Third parties:** payment gateways, maps APIs, SMS providers.
- **Client rendering:** heavy screens, large images, slow low-end phones.

### Percentiles, not averages

Averages hide bad experiences. Use **percentiles**:
- **p50 (median):** half of requests are faster than this.
- **p90 / p95 / p99:** 90/95/99% are faster; the remaining are slower. The slow tail often hits users on weak networks or older phones.

Example: average checkout API time is 400 ms, but p99 is 6 seconds. One in 100 payments waits 6+ seconds. At a million payments a day, that’s 10,000 frustrated users.

### Throughput and load

- **Throughput:** how many requests a system handles per second (RPS or QPS: requests/queries per second).
- **Load:** the current demand. As load approaches capacity, latency rises sharply and errors appear.

### Scalability

**Scalability** is the ability to handle more users, data or traffic by adding resources, without a big drop in performance.

- **Vertical scaling (scale up):** a bigger machine (more CPU, memory). Simple but has limits and gets expensive.
- **Horizontal scaling (scale out):** more machines sharing the load behind a load balancer. The standard approach for web services; requires services to be **stateless** (any server can handle any request).
- **Auto-scaling:** cloud systems add or remove servers automatically based on load. Useful for daily peaks (lunch and dinner for food apps) and events.
- **Database scaling:** harder. Techniques include **read replicas** (copies that handle reads), **sharding** (splitting data across databases, e.g., by user ID or city) and caching.

### Bottlenecks

A **bottleneck** is the slowest part that limits the whole system. Adding servers doesn’t help if the database or a third-party API is the bottleneck. Finding it requires monitoring and load testing.

### Reliability terms PMs hear

- **Availability / uptime:** % of time the service works. “99.9% availability” allows about **43 minutes of downtime per month**; 99.99% allows about **4.3 minutes**. Each extra “nine” is much harder and costlier.
- **SLA / SLO / SLI:**
  - **SLI (service level indicator):** a measured metric, e.g., p95 latency of the checkout API.
  - **SLO (service level objective):** the internal target, e.g., p95 < 500 ms over 30 days.
  - **SLA (service level agreement):** a contractual promise to customers, often with penalties (common in B2B, like payment gateways).
- **Graceful degradation:** when part of the system fails, keep the core working (if recommendations fail, still show the menu).
- **Load testing:** simulating heavy traffic before real peaks.

### Performance budgets

A **performance budget** is a limit you agree on, e.g., “Home screen interactive in under 2 s on a mid-range Android on 4G”, “App download size under 30 MB”, “p95 checkout API under 800 ms”. Budgets turn speed into a requirement instead of a hope.

## Worked example

**Problem:** Meesho’s product listing page is slow in tier 3 cities. Conversion there is lower.

**PM investigation with engineering:**
1. **Measure by segment:** p50 page load 1.8 s overall, but p90 is 7.5 s for users on 2G/3G-like speeds and low-end phones, concentrated in smaller towns.
2. **Break down latency:** 60% is image download (large product photos), 25% is the listing API (slow database query with filters), 15% is client rendering.
3. **Options:**
   - Serve smaller, compressed images (WebP, sized to the phone), load below-the-fold images lazily → big win, moderate effort.
   - Add an index and cache popular listings → API p95 from 1.2 s to 300 ms.
   - Show a lightweight skeleton screen immediately (perceived speed).
4. **Performance budget:** listing page usable in < 3 s at p90 on a ₹8,000 phone on 3G.
5. **Measure impact:** A/B test the image optimisation; primary metric listing → product view rate in tier 3; guardrail image quality complaints.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 250" role="img" aria-labelledby="sl-t sl-d">
<title id="sl-t">Latency grows sharply near capacity</title>
<desc id="sl-d">A chart where latency stays low as load increases, then rises steeply as load approaches system capacity.</desc>
<line x1="60" y1="210" x2="610" y2="210" class="d-ink" stroke-width="2"/>
<line x1="60" y1="210" x2="60" y2="20" class="d-ink" stroke-width="2"/>
<text x="280" y="238" class="d-text" font-size="12">Load (requests per second) →</text>
<text x="22" y="150" class="d-text" font-size="12" transform="rotate(-90 22 150)">Latency (p95)</text>
<path d="M60 190 C 250 188 380 180 450 160 C 500 140 530 90 560 30" fill="none" style="stroke: var(--c-pink)" stroke-width="6"/>
<path d="M60 190 C 250 188 380 180 450 160 C 500 140 530 90 560 30" fill="none" class="d-ink" stroke-width="1.5"/>
<line x1="540" y1="20" x2="540" y2="210" class="d-ink" stroke-width="1.5" stroke-dasharray="6 4"/>
<text x="470" y="40" class="d-text" font-size="11" font-weight="700">capacity</text>
<rect x="100" y="60" width="270" height="70" rx="10" class="d-butter d-ink" stroke-width="2"/>
<text x="114" y="86" class="d-text-dark" font-size="12" font-weight="700">Scale out before the knee:</text>
<text x="114" y="106" class="d-text-dark" font-size="11">more servers, caching, queues,</text>
<text x="114" y="122" class="d-text-dark" font-size="11">fix the bottleneck (often the DB)</text>
</svg>
<figcaption>Systems feel fine until they suddenly don’t. Plan capacity for peaks, not averages.</figcaption>
</figure>

## Step by step

Adding performance thinking to a PRD:

1. **Name the critical user moments** (app open, search, checkout, payment).
2. **Set a performance budget** for each, at a percentile, on a realistic device and network (e.g., p90, mid-range Android, 4G).
3. **Estimate peak load** (e.g., Friday 8–9 p.m., festival sales) and growth over 12 months.
4. **Ask engineers** where the bottlenecks might be and what load testing is planned.
5. **Define graceful degradation**: what still works if X fails?
6. **Add monitoring**: latency percentiles, error rates, saturation (CPU/DB), with alerts.
7. **Segment performance metrics** by device, network and city when reviewing.
8. **Prioritise performance work** using its effect on conversion and retention.

## Common mistakes

1. **Using averages** instead of percentiles.
2. **Testing on fast office Wi-Fi and flagship phones** only.
3. **Treating performance as engineering’s problem** rather than a product requirement.
4. **Planning capacity for average traffic**, not peaks.
5. **Ignoring third-party latency** (payment gateways, maps, SMS).
6. **Promising 99.99% availability** without understanding the cost.

## How it shows up in interviews

> [!INTERVIEW]
> **“The app feels slow. How would you approach it as a PM?”**
> Outline: define “slow” with data (which screen, which percentile, which segment) → break down latency (network, server, DB, third party, client) → prioritise by impact on conversion → quick wins (images, caching, skeletons) vs. deeper work → set budgets and monitoring.

> [!INTERVIEW]
> **“What does 99.9% availability mean in practice?”**
> Outline: about 43 minutes of downtime per month → each extra nine is much harder → choose based on business impact (payments vs. a blog) → SLOs and error budgets.

## Practice exercise

**Task (20 minutes):** Write performance requirements for **Zerodha Kite’s order placement** during market open (9:15 a.m.). Include: critical moments, budgets (with percentile, device, network), peak load assumption, graceful degradation and 3 monitoring metrics.

```answer Reveal a model answer
- **Critical moments:** app open to watchlist; order window open; order submit → confirmation; order status updates.
- **Budgets:** order submit → acknowledgement p95 < 300 ms server-side, < 1 s end to end on 4G mid-range Android; order window open < 500 ms p90; watchlist prices update at least every second.
- **Peak load:** 10x normal order rate in the first 5 minutes after 9:15 a.m.; plan for 2x last year’s highest peak.
- **Graceful degradation:** if charts or news fail, order placement and positions must still work; if the main app is degraded, show a status banner and keep the web terminal available.
- **Monitoring:** p95/p99 order API latency; order rejection/error rate by reason; queue lag to the exchange gateway, with alerts on all three at 9:10–9:30 a.m.
```

## Quiz

```quiz
Q: Why use p95 latency instead of the average?
- [ ] p95 is always lower :: It’s usually higher than the average.
- [x] Averages hide slow experiences that affect a meaningful share of users :: Correct. The slow tail is often users on weak networks or older phones.
- [ ] Averages can’t be calculated for latency :: They can, but they mislead.
- [ ] p95 is required by law :: No law requires it; it’s simply a better measure of experience.

Q: What is horizontal scaling?
- [ ] Buying a bigger server :: That’s vertical scaling.
- [x] Adding more servers to share the load :: Correct. It’s the standard way to scale stateless services.
- [ ] Making the app wider on tablets :: Unrelated to systems.
- [ ] Reducing the number of users :: Not scaling: scaling means handling more load, not less.

Q: About how much downtime does 99.9% availability allow per month?
- [ ] 4 minutes :: That’s closer to 99.99%.
- [x] About 43 minutes :: Correct. 0.1% of a 30-day month is about 43 minutes.
- [ ] 7 hours :: That’s closer to 99%.
- [ ] None :: 100% isn’t realistic.

Q: Adding more app servers didn’t improve speed. What’s the likely reason?
- [ ] Servers are always slow :: Not a useful conclusion.
- [x] The bottleneck is elsewhere, such as the database or a third-party API :: Correct. Scale the slowest part, not the parts that are already fine.
- [ ] Users have too much storage :: Unrelated: phone storage doesn’t affect server capacity.
- [ ] The CDN is too fast :: A fast CDN wouldn’t slow things down.

Q: What’s an SLO?
- [ ] A contractual promise with penalties :: That’s an SLA.
- [x] An internal target for a measured service metric, like p95 < 500 ms :: Correct. SLOs guide engineering priorities and alerts.
- [ ] A type of database :: Unrelated: SLO is a reliability target, not a database.
- [ ] A marketing slogan :: Unrelated: SLOs are measurable engineering targets.

Q: Which is a good performance budget?
- [ ] The app should be fast :: Not measurable.
- [x] Home screen interactive within 2 s at p90 on a mid-range Android over 4G :: Correct. Specific percentile, device and network.
- [ ] Faster than competitors :: Not measurable without specifics.
- [ ] Under 2 s on the CEO’s phone :: Not representative.
```

## Key takeaways

- **Latency** is time to respond; measure **percentiles (p90/p95/p99)**, not averages.
- **Scale out** (more servers) for stateless services; databases need replicas, sharding and caching.
- Find the **bottleneck**; latency spikes sharply as load nears **capacity**.
- Know **availability nines**, **SLI/SLO/SLA** and **graceful degradation**.
- Set **performance budgets** on realistic **devices and networks**, and plan for **peaks**.
