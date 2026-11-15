---
id: w1-product-lifecycle
title: The product lifecycle
week: 1
estimatedMinutes: 13
tags: [foundations, strategy, lifecycle]
---

## Why this matters for a PM

The right move for a product depends on where it is in its life. Adding features to a product nobody has adopted yet is wasteful. Running bold experiments on a mature product that pays everyone’s salary is risky. Knowing the stage tells you what to focus on, which metrics matter and how much risk to take.

## Core concepts

### The four classic stages

The **product lifecycle** describes how a product’s usage and revenue change over time. It has four classic stages.

**1. Introduction.** The product is new. Few people know about it. Usage is low and growth is uncertain. The main question is: *Do people actually want this?* The team is looking for **product–market fit (PMF)**, the point where a clear group of users wants the product so much that they keep using it and tell others.

**2. Growth.** PMF is found. Usage rises quickly, often through word of mouth. Competitors notice and copy. The main question becomes: *How do we grow fast without breaking things?* Teams invest in scaling the systems, improving onboarding and reaching new user groups.

**3. Maturity.** Growth slows because most of the target market already uses the product. Competition is intense. The main question: *How do we keep users, earn more from each one, and run efficiently?* Work shifts to retention, pricing, small improvements and cost savings.

**4. Decline.** Usage falls. Maybe user needs changed, or a better alternative arrived. The main question: *Do we reinvent it, keep it running cheaply, or shut it down?* Hard decisions live here.

### Before introduction: the zero-to-one phase

Software PMs also talk about a stage before introduction, often called **zero to one**. The product doesn’t exist yet. The team is exploring a problem, building a **minimum viable product (MVP)**, which is the smallest version that can test whether the idea works with real users. Most of the work is discovery and fast learning.

### What changes at each stage

| Stage | Main goal | Key metrics | Typical PM work | Risk appetite |
|---|---|---|---|---|
| Zero to one / Introduction | Find PMF | Retention of early users, qualitative love | Interviews, MVPs, fast iteration | Very high |
| Growth | Scale what works | New users, activation rate, growth rate | Onboarding, referral loops, performance, new segments | High |
| Maturity | Defend and monetise | Retention, revenue per user, margins | Optimisation, pricing, A/B tests, cost reduction | Medium to low |
| Decline | Decide the future | Churn, cost to serve | Migration, sunsetting, pivots | Depends on the bet |

Three terms in that table:
- **Activation rate:** the share of new users who reach the first moment of real value, for example placing their first order.
- **Retention:** the share of users who keep coming back after a set time, for example 30 days.
- **Churn:** the share of users who stop using the product in a period. It’s the opposite of retention.

### Lifecycles exist at every level

A company, a product and a single feature each have their own lifecycle. Swiggy as a company is mature in food delivery, but Swiggy Instamart (quick commerce) was in growth, and a brand-new Instamart feature might be in introduction. A PM should know the stage of the thing they own, not just the company.

### The S-curve and the “next curve”

Plot users over time and a successful product usually forms an **S-curve**: slow start, steep middle, flat top. Smart companies start the *next* S-curve before the current one flattens. Zomato started Blinkit (quick commerce) while food delivery was maturing. Paytm moved from wallet to payments to financial services. The PM lesson: in maturity, someone should be exploring what’s next.

## Worked example

**Product: Zerodha Kite (stock trading app)**

- **Introduction (around 2015):** Zerodha offered flat-fee trading when most brokers charged a percentage. Early users were active traders who were cost-conscious and tech-savvy. The key question was whether these traders would switch from big brokers. Metric that mattered: do the early users keep trading through Kite month after month?
- **Growth (around 2017–2021):** Word of mouth, the Varsity learning content and a surge in young first-time investors drove fast growth. The PM focus moved to fast, simple account opening, app stability on high-traffic market days, and features for new investors.
- **Maturity (today):** Zerodha is one of the largest brokers in India. Competitors like Groww and Upstox have copied flat pricing. The focus shifts to reliability, keeping active traders, careful new products (like mutual funds via Coin), and keeping costs low.

**What a PM should *not* do at maturity:** launch an untested redesign of the order screen during market hours. A small mistake here affects millions of trades. At maturity, change carefully and test well.

**What a PM *should* do:** protect reliability, improve retention for new investors who drift away after a few months, and quietly explore the next curve.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 280" role="img" aria-labelledby="plc-t plc-d">
<title id="plc-t">The product lifecycle S-curve</title>
<desc id="plc-d">A curve that rises slowly in introduction, steeply in growth, flattens in maturity and falls in decline.</desc>
<line x1="50" y1="240" x2="610" y2="240" class="d-ink" stroke-width="2"/>
<line x1="50" y1="240" x2="50" y2="20" class="d-ink" stroke-width="2"/>
<rect x="52" y="30" width="120" height="208" class="d-lavender" opacity="0.6"/>
<rect x="172" y="30" width="150" height="208" class="d-sky" opacity="0.6"/>
<rect x="322" y="30" width="170" height="208" class="d-mint" opacity="0.6"/>
<rect x="492" y="30" width="116" height="208" class="d-peach" opacity="0.6"/>
<path d="M55 232 C120 228 150 220 180 200 C230 160 260 90 320 70 C380 52 450 50 490 60 C540 75 570 110 605 150" fill="none" class="d-ink" stroke-width="4"/>
<text x="62" y="50" class="d-text-dark" font-weight="700">Introduction</text>
<text x="190" y="50" class="d-text-dark" font-weight="700">Growth</text>
<text x="340" y="50" class="d-text-dark" font-weight="700">Maturity</text>
<text x="505" y="50" class="d-text-dark" font-weight="700">Decline</text>
<text x="62" y="225" class="d-text-dark" font-size="11">Find PMF</text>
<text x="190" y="225" class="d-text-dark" font-size="11">Scale what works</text>
<text x="340" y="225" class="d-text-dark" font-size="11">Retain and monetise</text>
<text x="505" y="225" class="d-text-dark" font-size="11">Reinvent or sunset</text>
<text x="20" y="130" class="d-text" font-size="11" transform="rotate(-90 20 130)">Users / revenue</text>
<text x="300" y="265" class="d-text" font-size="11">Time</text>
</svg>
<figcaption>Each stage asks a different question, so the PM’s priorities and metrics change.</figcaption>
</figure>

## Step by step

How to diagnose the stage of a product and decide what to focus on:

1. **Look at the growth curve.** Is usage flat and small (introduction), rising fast (growth), flat and large (maturity) or falling (decline)? If you don’t have data, use proxies: app store rank trends, news, hiring, Google Trends.
2. **Check retention.** If early users don’t come back, you haven’t found PMF yet, whatever the growth looks like. Paid marketing can fake growth for a while; it can’t fake retention.
3. **Map the competition.** Few competitors suggests introduction or early growth. Many look-alike competitors suggests maturity.
4. **Name the stage’s main question.** Write it down: “Our main question is ___.”
5. **Pick metrics that answer it.** Introduction: retention of early users. Growth: activation and growth rate. Maturity: retention, revenue per user, cost. Decline: churn and cost to serve.
6. **Set your risk appetite.** Early stages can take big swings. Mature products need careful testing and rollouts.
7. **Check the next curve.** In maturity, ask who is exploring what’s next.

## Common mistakes

1. **Scaling before PMF.** Spending heavily on marketing when early users don’t stick just buys churn. Fix retention first.
2. **Using one metric for every stage.** Chasing new sign-ups at maturity ignores that most of the value is in keeping existing users.
3. **Treating the company’s stage as the feature’s stage.** A new feature inside a mature app still needs discovery and an MVP.
4. **Taking big risks with core flows at maturity.** Redesigning a payment flow without testing can cost millions of rupees in a day.
5. **Ignoring decline signals.** Falling engagement among young users is often the first sign. Teams that wait until revenue drops act too late.

## How it shows up in interviews

> [!INTERVIEW]
> **“What would you prioritise if you were the PM for Paytm’s wallet today?”**
> Outline: name the stage (mature to declining, since UPI changed how people pay) → main question (keep valuable users, find a role next to UPI) → metrics (active wallet users, transactions per user, cost) → 2–3 bets (e.g., wallet for small, frequent payments; move users into other Paytm products) → what you would *not* do (pour money into wallet sign-ups).

> [!INTERVIEW]
> **“How do you know if a product has product–market fit?”**
> Outline: retention curve flattens instead of falling to zero → users would be very disappointed if it disappeared → organic growth through word of mouth → users pull features from you rather than you pushing. Give an Indian example.

## Practice exercise

**Task (35 minutes):** Pick three products: one you think is in **growth**, one in **maturity** and one in **decline**. For example: Zepto, Swiggy food delivery and Paytm wallet. For each, write:

1. The evidence for the stage (2–3 points).
2. The main question for that stage.
3. Two metrics you’d watch.
4. One thing the PM should do and one thing they should avoid.

```answer Reveal a model answer
**Zepto (growth)**
- Evidence: fast expansion to new cities and dark stores, large funding rounds, aggressive marketing, competitors (Blinkit, Instamart) racing too.
- Main question: How do we grow orders in new areas while keeping delivery fast and losses under control?
- Metrics: orders per dark store per day; repeat order rate in month 2 for new users.
- Do: improve first-order activation in new cities. Avoid: expanding the catalogue so fast that items are often out of stock, which breaks the speed promise.

**Swiggy food delivery (maturity)**
- Evidence: well known in all big cities, growth slowed, tough competition with Zomato, focus on profit.
- Main question: How do we keep frequent users and earn more per order efficiently?
- Metrics: monthly order frequency per active user; contribution margin per order.
- Do: improve the loyalty programme and restaurant discovery for regulars. Avoid: risky, untested changes to checkout.

**Paytm wallet (decline)**
- Evidence: UPI made bank-to-bank payments free and instant, reducing the need to load a wallet; regulatory issues also affected trust.
- Main question: Is there a profitable niche for the wallet, or should users be moved to other products?
- Metrics: monthly active wallet users; cost to run the wallet per active user.
- Do: identify the segments that still prefer the wallet and serve them cheaply. Avoid: big acquisition spending on wallet sign-ups.
```

## Quiz

```quiz
Q: A new app has strong download growth from ads, but only 4% of users are still active after 30 days. Which stage is it really in?
- [ ] Growth, because downloads are rising :: Paid ads can create download growth without real demand. Retention tells the truth.
- [x] Still searching for product–market fit :: Correct. Users don’t stick, so PMF isn’t proven, whatever the download chart shows.
- [ ] Maturity, because it has many users :: Maturity means a large, stable base. 4% retention means the base keeps leaking away.
- [ ] Decline, because users are leaving :: Decline describes a product that once had strong usage and is losing it. This product never kept users in the first place.

Q: Which metric is usually most important for a product in the maturity stage?
- [ ] Number of app downloads :: Downloads matter less once most of the market already has the product.
- [x] Retention and revenue per user :: Correct. In maturity, value comes from keeping users and earning more from each efficiently.
- [ ] Number of press articles :: Press coverage isn’t a reliable product metric at any stage.
- [ ] Number of features shipped :: Features shipped is an output, not a result.

Q: What is an MVP?
- [ ] The most valuable product in a company’s portfolio :: That is not what MVP means in product work.
- [ ] A fully featured first release :: An MVP is deliberately small, not full-featured.
- [x] The smallest version that can test whether an idea works with real users :: Correct. It’s a learning tool, not a cut-down final product.
- [ ] A product that has won an award :: No. MVP stands for minimum viable product.

Q: Swiggy is a mature company. Swiggy launches a brand-new feature for booking table reservations. How should the PM treat the new feature?
- [ ] Like a mature product: optimise small details :: The company is mature, but this feature is new and unproven.
- [x] Like an early-stage product: run discovery and test an MVP :: Correct. Every feature has its own lifecycle. A new feature needs to prove demand.
- [ ] Skip discovery because Swiggy already knows its users :: Knowing users for food delivery doesn’t prove they want table booking.
- [ ] Launch to all users immediately to maximise reach :: Without evidence of demand, a big launch adds risk without learning.

Q: What does it mean to start the “next S-curve”?
- [ ] Redesign the logo :: Branding changes don’t create a new growth curve.
- [ ] Cut prices to win back users :: Price cuts can help in the short term but don’t create a new curve.
- [x] Begin a new product or business before the current one stops growing :: Correct. For example, Zomato building Blinkit while food delivery matured.
- [ ] Hire more engineers for the current product :: More people for the same product doesn’t create a new curve.

Q: Which is the riskiest move for a PM of a mature payments app?
- [ ] Running an A/B test on a new help-centre layout :: Low risk, and easy to test.
- [x] Shipping an untested redesign of the payment confirmation screen to all users at once :: Correct. Core flows at scale need careful testing and gradual rollout.
- [ ] Interviewing users about why they churn :: Low risk and high learning.
- [ ] Reducing server costs :: A normal maturity priority if done carefully.
```

## Key takeaways

- Products move through **introduction, growth, maturity and decline**, often preceded by **zero to one**.
- Each stage has a different **main question**, so it needs different **metrics** and **risk appetite**.
- **Retention**, not downloads, tells you whether you’ve found product–market fit.
- Companies, products and features each have **their own lifecycle**.
- In maturity, protect the core and make sure someone is building the **next curve**.

*Go deeper (optional):* search “Andrew Chen growth S-curves” for essays on growth stages.
