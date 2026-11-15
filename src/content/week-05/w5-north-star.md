---
id: w5-north-star
title: North Star and input metrics
week: 5
estimatedMinutes: 15
tags: [metrics, north-star, strategy]
---

## Why this matters for a PM

Teams that track 40 numbers end up optimising none. A **North Star metric** gives the whole company one number that captures the value users get, and **input metrics** tell each team which levers move it. Choosing it well is one of the most common PM interview questions, and your Week 5 checkpoint asks you to explain why your North Star isn’t a vanity metric.

## Core concepts

### What a metric is

A **metric** is a number you track over time to understand how something is performing. “Daily active users”, “orders per user per month”, “checkout conversion rate”. Good metrics are clearly defined: exactly what is counted, over what period, for which users.

### The North Star metric

A **North Star metric (NSM)** is the single metric that best captures the **core value** your product delivers to users, and that, if it grows sustainably, signals long-term business success.

A good North Star:
1. **Reflects value delivered to users**, not just activity. People getting their job done.
2. **Leads to revenue** over time (it’s a leading indicator of business success).
3. **Is measurable and understandable** by everyone in the company.
4. **Can be influenced** by teams through their work.
5. **Isn’t easily gamed** without real value.

Examples (illustrative):
- Food delivery (Swiggy/Zomato): **orders delivered on time per week** (or weekly ordering customers).
- Payments app (PhonePe): **successful transactions per month** (or monthly transacting users).
- Brokerage (Zerodha): **active investors / traders per month**, or trades placed.
- Messaging (WhatsApp): **messages sent per day**.
- B2B SaaS (Razorpay Payment Links): **payment volume processed for merchants** or **merchants receiving payments weekly**.
- Learning app: **weekly learners completing a lesson**.

### Vanity metrics

A **vanity metric** looks impressive but doesn’t reflect value or guide decisions. Examples:
- **Total downloads / total registered users**: only ever go up; say nothing about use.
- **Page views**: can rise because the product is confusing (people click around).
- **Time spent**: may rise because a task got harder.
- **Social media followers**.

Test: “If this number doubled, would users and the business definitely be better off?” and “Would this number change what we do?” If not, it’s probably vanity.

### Input metrics

The North Star is an **output** of many factors. **Input metrics** (also called drivers or levers) are the factors teams can directly influence that move the North Star. They often follow a simple formula.

Example for “orders delivered on time per week”:
> Weekly on-time orders = **Weekly active customers** × **Orders per active customer** × **On-time delivery rate**

Each input can be broken down further:
- Weekly active customers = new customers activated + returning customers retained + resurrected customers (came back after a break).
- Orders per active customer ← restaurant selection, discovery, offers, reorder features.
- On-time rate ← delivery partner supply, kitchen prep time, route accuracy.

Teams own inputs: the growth team owns new customers; the discovery team owns orders per customer; logistics owns on-time rate.

### Counter-metrics and guardrails

Pushing a North Star hard can cause damage elsewhere. **Guardrail metrics** protect against that: cancellation rate, refunds, customer complaints, cost per order, delivery partner earnings. You’ll go deeper in the leading/lagging lesson.

### Choosing a North Star: a process

1. **Name the core value**: what job do users hire you for? (Week 2.)
2. **Name the moment value is delivered**: an order arrives; a payment succeeds; a lesson is completed.
3. **Turn it into a count with a time window**: per week or per month, matched to natural usage frequency. Food: weekly. Payments: monthly. Tax filing: yearly.
4. **Add quality conditions** if needed: “on time”, “successful”, “with at least X”.
5. **Check it against the five criteria** and the vanity test.
6. **Break it into inputs** that teams can own.

### Frequency matters

Pick a time window that matches how often users naturally get value. Daily active users makes sense for messaging, not for a travel booking app used twice a year. A **weekly** metric for food delivery, **monthly** for bill payments.

## Worked example

**P1 example: flatmate expense app.**

- **Core job:** “Settle up shared expenses without awkwardness.”
- **Value moment:** a group settles its balance fully.
- **Candidate North Stars:**
  - Total sign-ups → vanity: doesn’t mean anyone settled.
  - Expenses logged per week → activity, but logging more is a chore, not value; could rise if the product is clumsy.
  - **Groups fully settled each month** → reflects the real job; leads to retention and word of mouth.
- **Chosen NSM:** *Number of flat groups that fully settle their monthly balance (within 7 days of month end).*

**Why it’s not vanity:** it only rises when groups actually get the job done. Doubling it means twice as many flats avoiding awkward money conversations. It also predicts retention: groups that settle stay.

**Inputs:**
> Groups settled = Active groups × % of groups with a summary opened × % of opened summaries fully settled

- Active groups ← invites and onboarding (growth).
- Summary opened ← timing and notification quality (engagement).
- Fully settled ← one-tap UPI, clarity of amounts, trust (core product).

**Guardrails:** group leave rate; notification opt-out rate; payment failure rate.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 260" role="img" aria-labelledby="ns-t ns-d">
<title id="ns-t">North Star and input metrics</title>
<desc id="ns-d">A North Star metric at the top, three input metrics feeding into it with multiplication signs, and guardrail metrics at the side.</desc>
<g class="d-ink" stroke-width="2"><line x1="320" y1="70" x2="120" y2="120"/><line x1="320" y1="70" x2="320" y2="120"/><line x1="320" y1="70" x2="520" y2="120"/></g>
<rect x="170" y="14" width="300" height="56" rx="10" class="d-butter d-ink" stroke-width="3"/>
<text x="190" y="38" class="d-text-dark" font-weight="700">★ North Star</text>
<text x="190" y="58" class="d-text-dark" font-size="12">Groups fully settled per month</text>
<rect x="30" y="120" width="180" height="60" rx="10" class="d-sky d-ink" stroke-width="2"/>
<text x="44" y="144" class="d-text-dark" font-weight="700" font-size="12">Active groups</text>
<text x="44" y="164" class="d-text-dark" font-size="11">Owner: growth</text>
<text x="218" y="155" class="d-text" font-size="20" font-weight="700">×</text>
<rect x="230" y="120" width="180" height="60" rx="10" class="d-sky d-ink" stroke-width="2"/>
<text x="244" y="144" class="d-text-dark" font-weight="700" font-size="12">% summaries opened</text>
<text x="244" y="164" class="d-text-dark" font-size="11">Owner: engagement</text>
<text x="418" y="155" class="d-text" font-size="20" font-weight="700">×</text>
<rect x="430" y="120" width="180" height="60" rx="10" class="d-sky d-ink" stroke-width="2"/>
<text x="444" y="144" class="d-text-dark" font-weight="700" font-size="12">% opened → settled</text>
<text x="444" y="164" class="d-text-dark" font-size="11">Owner: core product</text>
<rect x="130" y="205" width="380" height="44" rx="10" class="d-pink d-ink" stroke-width="2"/>
<text x="146" y="232" class="d-text-dark" font-size="12">Guardrails: group leave rate · opt-outs · payment failures</text>
</svg>
<figcaption>The North Star captures value; inputs are the levers teams own; guardrails stop harmful shortcuts.</figcaption>
</figure>

## Step by step

Choosing your P1 North Star (your deliverable):

1. **Write the core job** in one line.
2. **Describe the value moment** in one line.
3. **Draft 3 candidate metrics**, including one you suspect is vanity.
4. **Pick a time window** matching natural usage frequency.
5. **Score each candidate** on the five criteria (value, leads to revenue, understandable, influenceable, hard to game).
6. **Choose one** and write the one-line “why it’s not vanity”.
7. **Write the input formula** (2–4 multiplied or added factors).
8. **Add 2–3 guardrails.**
9. **Define each metric precisely**: what counts, time window, filters (e.g., “groups with 2+ active members”).

## Common mistakes

1. **Choosing revenue as the North Star.** Revenue is a lagging result; it doesn’t tell teams what user value to create.
2. **Choosing activity instead of value.** Page views, time spent and logins can rise for bad reasons.
3. **Wrong time window.** Daily metrics for weekly products create noisy, misleading signals.
4. **Too many North Stars.** One per product; inputs carry the detail.
5. **No precise definition.** Teams calculate it differently and argue about numbers.
6. **No guardrails.** Teams push the North Star in harmful ways.

## How it shows up in interviews

> [!INTERVIEW]
> **“What should be the North Star metric for Swiggy Instamart?”**
> Outline: core job (get essentials fast) → value moment (complete, on-time delivery) → candidates (orders, GMV, weekly ordering households) → pick e.g. “weekly orders delivered complete and on time” → why not vanity → inputs (active households × orders per household × complete-and-on-time rate) → guardrails (cost per order, cancellations, partner earnings).

> [!INTERVIEW]
> **“Is daily active users a good metric for LinkedIn?”**
> Outline: depends on the job → DAU can be inflated by notifications → value moments (connections made, jobs applied, content that gets meaningful engagement) → propose a better metric and inputs.

## Practice exercise

**Task (30 minutes):** Choose a North Star for **CRED** and **Zerodha Kite**. For each: core job, value moment, 3 candidates (one vanity), your choice with a “why not vanity” line, an input formula, and 2 guardrails.

```answer Reveal a model answer (illustrative)
**CRED**
- Core job: pay my bills on time effortlessly and feel rewarded for being financially responsible.
- Value moment: a bill paid on time through CRED.
- Candidates: total members (vanity); monthly app opens (activity); **monthly members paying at least one bill on time through CRED**.
- Choice: monthly members paying ≥1 bill on time. Not vanity: it only rises when members actually complete the core job; it predicts loyalty and cross-sell.
- Inputs: active members × % with a bill due that month × % of due bills paid on time via CRED.
- Guardrails: payment failure rate; reward cost per payment.

**Zerodha Kite**
- Core job: place trades and investments reliably at low cost.
- Value moment: an order placed and executed successfully.
- Candidates: total accounts (vanity); app sessions (activity); **monthly active investors/traders with at least one executed order**.
- Choice: monthly active traders/investors with ≥1 executed order. Not vanity: reflects real use of the core job; drives brokerage and retention.
- Inputs: funded accounts × % active in month × orders per active user (or simply track active rate and order frequency).
- Guardrails: order failure rate during market hours; complaints/regulatory escalations.
```

## Quiz

```quiz
Q: Which is the best North Star for a food delivery app?
- [ ] Total app downloads :: Vanity: only goes up and says nothing about value.
- [ ] Monthly revenue :: Important, but lagging and doesn’t guide teams on user value.
- [x] Orders delivered on time per week :: Correct. Reflects value delivered, leads to revenue, and teams can influence it.
- [ ] Average session length :: Could rise because finding food got harder.

Q: What makes a metric a “vanity metric”?
- [ ] It’s hard to calculate :: Difficulty isn’t the issue.
- [x] It looks good but doesn’t reflect value or change decisions :: Correct. Vanity metrics feel good but don’t tell you what to do next.
- [ ] It’s shared with investors :: Investors may see real metrics too.
- [ ] It’s measured weekly :: Frequency doesn’t make a metric vanity.

Q: Why should the North Star’s time window match natural usage frequency?
- [ ] To make charts look smoother :: A side effect.
- [x] Because a mismatched window gives misleading signals (e.g., daily metrics for a monthly-use product) :: Correct. A monthly bill-payer looks “inactive” on 29 days of a daily metric.
- [ ] Because investors prefer monthly numbers :: Not the reason.
- [ ] It doesn’t matter :: It matters a lot.

Q: Weekly orders = active customers × orders per customer × on-time rate. What are the three factors called?
- [ ] Guardrails :: Guardrails protect against harm; these drive the North Star.
- [x] Input metrics :: Correct. Teams own and move them.
- [ ] Vanity metrics :: Not vanity; they’re actionable.
- [ ] Lagging metrics :: Inputs are usually leading.

Q: A team boosts its North Star by sending 5 push notifications a day. Opt-outs triple. What was missing?
- [ ] A better North Star :: Possibly, but the immediate gap is protection.
- [x] A guardrail metric like notification opt-out rate :: Correct. Guardrails catch harmful shortcuts.
- [ ] More notifications :: That made it worse.
- [ ] A vanity metric :: Not helpful here.

Q: Why is revenue usually not chosen as a product North Star?
- [ ] Revenue is unimportant :: It’s very important.
- [x] It’s a lagging result that doesn’t tell teams what user value to create :: Correct. The North Star should lead to revenue.
- [ ] Revenue can’t be measured :: Revenue is easy to measure; it’s just too lagging to guide teams.
- [ ] Only finance can see it :: Not the reason.
```

## Key takeaways

- A **North Star** captures the **core value users get**, leads to revenue, and can be influenced by teams.
- **Vanity metrics** look good but don’t reflect value or change decisions.
- Match the **time window** to natural usage frequency.
- Break the North Star into **input metrics** that teams own, often as a formula.
- Protect it with **guardrails**, and define every metric **precisely**.

*Go deeper (optional):* Amplitude’s free “North Star Playbook”.
