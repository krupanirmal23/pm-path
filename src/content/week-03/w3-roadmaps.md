---
id: w3-roadmaps
title: Now / Next / Later roadmaps
week: 3
estimatedMinutes: 13
tags: [roadmaps, strategy, communication]
---

## Why this matters for a PM

A roadmap is how you communicate priorities to everyone: your team, leadership, sales, support and sometimes customers. A bad roadmap promises dates for features nobody has validated. A good one shows what you’re working on, why, and what comes next, while staying honest about uncertainty. Your P1 deliverable this week is a RICE-prioritised Now / Next / Later roadmap.

## Core concepts

### What a roadmap is, and isn’t

A **product roadmap** is a high-level plan that shows the direction of a product over time and how the work connects to goals. It is:
- A **communication tool** for alignment.
- A **statement of priorities** and intent.

It is not:
- A **release plan** or project schedule with every task.
- A **promise** of exact features on exact dates (at least not beyond the next few weeks).
- A **backlog** (the detailed list of work items).

### Timeline roadmaps and their problems

Many companies use **timeline roadmaps**: features placed on a calendar (Jan: X, Feb: Y). The problems:
- Dates months out are guesses, but people treat them as commitments.
- They encourage output thinking: success = shipping features on time.
- They hide learning: if discovery shows feature Y is a bad idea, cancelling it looks like failure.

### The Now / Next / Later format

**Now / Next / Later** groups work by time horizon and certainty instead of dates:

- **Now (this month or quarter):** work in progress or about to start. High confidence, well defined, committed. Detailed.
- **Next (roughly next quarter):** validated problems and likely solutions; still being shaped. Medium confidence.
- **Later (beyond):** important problems and opportunities you intend to explore. Low confidence; may change completely. Described as problems, not features.

Detail decreases from left to right, and so does certainty. This is honest about how product work actually happens.

### Outcome-oriented roadmaps

Strong roadmaps organise items under **goals or problems**, not just features:

| | Now | Next | Later |
|---|---|---|---|
| **Goal: groups settle monthly without disputes** | Auto monthly summary; WhatsApp settle-up link | Import shared UPI payments | Shared grocery pool (explore) |
| **Goal: reduce logging effort** | Cash quick-add widget | Recurring bill templates | Receipt scanning (explore) |

Each item links back to an outcome, so if an item doesn’t move its goal, the team can swap it without losing direction.

### What to put on each item

- **Name** (short) and the **problem/opportunity** it addresses.
- **Goal/OKR** it supports.
- **Confidence** (high/medium/low) or status (in discovery, in delivery).
- For Now items: rough size and owner.
- Avoid exact dates beyond Now. If leadership needs dates, give **ranges** (“likely Q2”) and explain what could change them.

### Different audiences, different views

- **Team:** detailed Now, with links to PRDs and tickets.
- **Leadership:** outcomes, progress on OKRs, major bets and risks.
- **Sales/support:** what’s coming that affects customers, with safe language (“exploring”, “planned”) and no promises on Later items.
- **Customers (if public):** themes and problems you’re working on; never firm dates for Later.

### Keeping it alive

Review the roadmap at least **monthly**, and after major learning. Move items between columns as evidence changes. Communicate changes proactively, with reasons. A roadmap that never changes means the team isn’t learning.

## Worked example

**Product: Zerodha Kite (illustrative). Strategy: keep active traders and grow new investors safely.**

| Goal | Now | Next | Later |
|---|---|---|---|
| Reliability during peak market hours | Faster order placement under load (in delivery); status banner during exchange issues | Offline order queue for poor connectivity | Multi-region failover (explore) |
| Help new investors stay invested | Plain-language explainers for first-time order screen | “First market dip” guidance | Goal-based portfolios (explore) |
| Reduce support load | Self-serve account changes | Contextual help on top 10 ticket topics | AI support assistant (explore, with strict guardrails) |

**How it’s used:**
- In the leadership review: “We’re on track for reliability; new investor work moved ‘first dip’ guidance to Next after research showed panic during drops is the #1 reason for stopping SIPs.”
- With support: “Self-serve account changes ship this month; contextual help is planned next quarter; the AI assistant is only being explored.”

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 260" role="img" aria-labelledby="nnl-t nnl-d">
<title id="nnl-t">Now Next Later roadmap</title>
<desc id="nnl-d">Three columns. Now has detailed, high-confidence items. Next has fewer, medium-confidence items. Later has broad problems with low confidence.</desc>
<rect x="20" y="20" width="190" height="220" rx="10" class="d-mint d-ink" stroke-width="2"/>
<rect x="225" y="20" width="190" height="220" rx="10" class="d-sky d-ink" stroke-width="2"/>
<rect x="430" y="20" width="190" height="220" rx="10" class="d-lavender d-ink" stroke-width="2"/>
<text x="36" y="48" class="d-text-dark" font-weight="700" font-size="16">Now</text>
<text x="36" y="66" class="d-text-dark" font-size="11">High confidence · committed</text>
<text x="241" y="48" class="d-text-dark" font-weight="700" font-size="16">Next</text>
<text x="241" y="66" class="d-text-dark" font-size="11">Medium confidence · shaping</text>
<text x="446" y="48" class="d-text-dark" font-weight="700" font-size="16">Later</text>
<text x="446" y="66" class="d-text-dark" font-size="11">Low confidence · exploring</text>
<g class="d-ink" stroke-width="1.5">
<rect x="36" y="80" width="158" height="30" rx="6" class="d-surface"/><rect x="36" y="118" width="158" height="30" rx="6" class="d-surface"/><rect x="36" y="156" width="158" height="30" rx="6" class="d-surface"/><rect x="36" y="194" width="158" height="30" rx="6" class="d-surface"/>
<rect x="241" y="80" width="158" height="44" rx="6" class="d-surface"/><rect x="241" y="134" width="158" height="44" rx="6" class="d-surface"/>
<rect x="446" y="80" width="158" height="70" rx="6" class="d-surface" stroke-dasharray="5 4"/>
</g>
<text x="46" y="100" class="d-text" font-size="11">Auto monthly summary</text>
<text x="46" y="138" class="d-text" font-size="11">WhatsApp settle link</text>
<text x="46" y="176" class="d-text" font-size="11">Cash quick-add</text>
<text x="46" y="214" class="d-text" font-size="11">Bug: balance rounding</text>
<text x="251" y="106" class="d-text" font-size="11">Import UPI payments</text>
<text x="251" y="160" class="d-text" font-size="11">Recurring templates</text>
<text x="456" y="112" class="d-text" font-size="11">Problem: random</text>
<text x="456" y="128" class="d-text" font-size="11">purchases cause fights</text>
</svg>
<figcaption>Detail and certainty fall from left to right. Later items are problems, not promises.</figcaption>
</figure>

## Step by step

Building your P1 roadmap from your RICE scores:

1. **List your goals** (from your strategy and OKRs), 1–3 rows.
2. **Take your RICE-ranked ideas** and assign each to a goal.
3. **Place items in Now** if they’re top-ranked, well understood and you’d start them first. Limit Now to what a small team could do in ~6 weeks.
4. **Place items in Next** if they’re valuable but need more discovery or depend on Now items.
5. **Place items in Later** as problems or opportunities, not features, especially low-confidence ideas.
6. **Add confidence and the reason** for each Now item (link to RICE score or research).
7. **Write “not on the roadmap”**: 2–3 ideas you deliberately excluded and why (from your “won’t do” list).
8. **Prepare the checkpoint defence**: why #1 and #2 are in Now, and why #6 waits (dependency, low confidence, low impact or off-strategy).
9. **Publish it** in Notion (or Miro) with the strategy doc.

## Common mistakes

1. **Dates on everything.** You’ll be held to guesses.
2. **Feature lists with no goals.** Nobody knows why items are there.
3. **Overloaded Now.** If Now has 15 items for a team of 5, it’s not a plan.
4. **Later items described as features.** It creates premature commitments.
5. **Never updating it.** A static roadmap signals no learning.
6. **One version for all audiences.** Sales needs different detail and language than engineers.

## How it shows up in interviews

> [!INTERVIEW]
> **“How do you build a roadmap?”**
> Outline: start from vision and strategy → set goals/OKRs → gather opportunities from research and data → prioritise (RICE etc.) → Now/Next/Later grouped by goal → share with different audiences → review monthly. Mention why you avoid long-term dates.

> [!INTERVIEW]
> **“Leadership wants dates for the next 12 months. How do you respond?”**
> Outline: understand why (planning, sales, investors) → give dates with confidence levels for Now, ranges for Next, themes for Later → explain what would change them → commit to regular updates. Don’t refuse; translate uncertainty.

## Practice exercise

**Task (30 minutes):** Using the Swiggy Instamart RICE exercise from earlier (Buy again, Autocomplete, Scheduled basket, Recipes) plus two more ideas of your own, build a Now / Next / Later roadmap with one or two goal rows. Then write your 3-sentence defence of why #1 and #2 are Now and why the lowest one waits.

```answer Reveal a model answer
**Goal: increase weekly repeat orders**
- **Now:** “Buy again” on home (RICE top); faster search autocomplete.
- **Next:** Scheduled weekly basket (high impact for heavy users; needs ops planning for slot capacity); “Running low?” reminders based on purchase cycles (my idea).
- **Later:** Recipe-based shopping (problem: users don’t know what to cook); household sharing of carts (problem: multiple people in a home order separately) (my idea).

**Not on the roadmap:** loyalty points (off-strategy this quarter; we’re fixing the basics of re-ordering first).

**Defence:** “Buy again” and autocomplete are first because they reach the most repeat users with strong evidence and small effort, together scoring over 10x the next idea. The scheduled basket is next because it needs slot capacity planning with operations. Recipes wait because our confidence is low and the effort is high; we’ll run a small content test first to learn whether recipe intent exists.
```

## Quiz

```quiz
Q: What’s the main advantage of Now / Next / Later over a timeline roadmap?
- [ ] It looks nicer :: Visuals aren’t the main point.
- [x] It’s honest about uncertainty and avoids treating guesses as date commitments :: Correct. Confidence decreases from Now to Later.
- [ ] It removes the need for prioritisation :: You still need to prioritise.
- [ ] It guarantees faster delivery :: It doesn’t change delivery speed.

Q: How should items in the Later column usually be described?
- [ ] As detailed features with dates :: Too much false precision.
- [x] As problems or opportunities to explore :: Correct. This keeps options open.
- [ ] As committed promises to customers :: Later items are low-confidence.
- [ ] They shouldn’t exist :: Later shows direction and intent.

Q: Why group roadmap items under goals?
- [ ] To make the roadmap longer :: Not the purpose.
- [x] So every item connects to an outcome, and items can be swapped if they don’t move the goal :: Correct.
- [ ] Because goals are required by agile :: Not a rule of agile.
- [ ] To hide features from stakeholders :: Not the intent.

Q: Sales wants to tell a client a “Later” item will ship in Q3. What should you say?
- [ ] Yes, promise it :: Later items are uncertain; promising risks broken trust.
- [x] Explain it’s being explored, share the problem you’re investigating, and avoid a date commitment :: Correct.
- [ ] Remove it from the roadmap :: Hiding it doesn’t help.
- [ ] Ignore the request :: Close the loop clearly instead.

Q: How often should a roadmap be reviewed?
- [ ] Once a year :: Too slow; learning happens faster.
- [x] At least monthly and after major learning :: Correct.
- [ ] Never; it’s a commitment :: Roadmaps should adapt.
- [ ] Daily :: Too frequent to be useful for communication.

Q: Your Now column has 15 items for a 5-person team for one month. What’s the problem?
- [ ] Nothing; ambition is good :: Unrealistic plans erode trust.
- [x] It’s overloaded; Now should only hold what the team can realistically do :: Correct.
- [ ] It should have 30 items :: Even more unrealistic.
- [ ] Items should have dates :: Dates don’t fix overload.
```

## Key takeaways

- A roadmap is a **communication tool** for direction and priorities, not a list of promises.
- **Now / Next / Later** shows decreasing **detail and certainty** without fake dates.
- Group items under **goals**, and describe Later items as **problems**.
- Tailor views for **team, leadership, sales and customers**.
- Review it **monthly** and explain changes; a static roadmap signals no learning.
