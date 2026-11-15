---
id: w1-teardown
title: How to do a product teardown
week: 1
estimatedMinutes: 15
tags: [foundations, teardown, portfolio]
---

## Why this matters for a PM

A **product teardown** is a structured analysis of an existing product: who it serves, how it works and where it falls short. It is the fastest way to build product sense, it is this week’s deliverable (Swiggy, CRED and Zerodha Kite), and published teardowns are strong portfolio pieces that recruiters actually read.

## Core concepts

### What a teardown is, and isn’t

A teardown is **not** a review (“I like the colours”) or a feature list. It’s an argument: *this product serves these users for this job, this is how the key flow works, here’s where it breaks, here’s one fix and how we’d know it worked.*

### The six parts of a teardown

This is the structure you’ll use for all three deliverable teardowns.

**1. Who it’s for (target user).** Be specific. Not “everyone who orders food” but “urban working professionals, 22–35, ordering dinner on weekdays after 8 p.m.” Name a primary user and, if relevant, a second side of the market. Two-sided products, called **marketplaces**, serve two groups (Swiggy serves customers *and* restaurants *and* delivery partners).

**2. The core job.** What is the user trying to get done? Write it as a **job statement**: “When [situation], I want to [motivation], so I can [outcome].” Example: “When I’m tired after work, I want a hot meal I trust to arrive quickly, so I can relax without cooking.” You’ll learn this Jobs to Be Done format properly in Week 2.

**3. The key flow.** The main path a user takes to get the job done, step by step. For Swiggy: open app → browse or search → pick restaurant → add items → apply offer → pay → track → receive. Screenshot each step. Note how many taps it takes and where users might hesitate.

**4. Three problems.** Real friction points, ideally backed by evidence: app store reviews, your own use, friends’ complaints, Reddit threads. A good problem is specific: “Delivery fee, packaging fee, platform fee and GST appear separately only at checkout, so the final price feels 25% higher than expected.” A weak problem is vague: “Checkout is confusing.”

**5. One fix.** Pick the most important problem and propose one change. Explain why it would help, what it might cost and what could go wrong (use the four risks).

**6. The metric the fix should move.** One primary metric, ideally an outcome from the outcomes lesson, plus one guardrail. Example: “Checkout conversion (cart → paid order) up from X% to Y%; guardrail: average order value doesn’t fall.”

### Good habits that make teardowns stand out

- **Use evidence.** Quote 3–5 real app store reviews. Note your own timings (“took 47 seconds to find the coupon field”).
- **Show the business model.** How does the product make money? Commissions, fees, subscriptions, ads, interest? A fix that hurts revenue needs to say so.
- **Respect the team.** Assume there were good reasons for today’s design. Say “I suspect this is because…” before criticising.
- **Prioritise.** Explain why you chose your one fix over the other two problems.
- **Be visual.** Annotated screenshots and a simple flow diagram beat paragraphs.

### Where to find evidence

- **Google Play / App Store reviews:** sort by “most recent” and filter by 1–2 stars for problems, 5 stars for what people love.
- **Reddit (r/bangalore, r/IndiaInvestments, r/developersIndia), X, LinkedIn posts:** real complaints in users’ own words.
- **Your own usage:** time yourself on the key flow. Count taps.
- **Friends:** ask 3 people “When did you last use it? What annoyed you?”

## Worked example

**A short teardown: Zepto (quick-commerce grocery)**

*Who it’s for:* Urban households and young professionals in metros who need groceries or daily essentials quickly, often unplanned, in quantities too small to justify a supermarket trip.

*Core job:* “When I realise I’m missing something for tonight’s dinner, I want it at my door within minutes, so I can carry on with my evening without going out.”

*Key flow:* Open app (location auto-detected) → search “paneer” → add to cart → see “add ₹62 more for free delivery” → add more items → pay with UPI → track (10–15 min) → receive. About 8–10 taps for a single item.

*Three problems:*
1. **Small-order fees feel punishing.** Single urgent items trigger delivery and handling fees that can approach the item’s price. Reviews: “₹30 fee for ₹40 curd?”
2. **Substitutions are unclear.** When an item is out of stock after ordering, users learn at the door or get a refund later, without being asked about alternatives.
3. **Search returns many look-alike products.** Searching “milk” shows a dozen variants; the one you usually buy isn’t first.

*Chosen fix (problem 3):* Personalise search ranking so the exact items you’ve bought before appear first, marked “You bought this”. Why this one: it affects nearly every session for repeat users, it’s cheap to build because purchase history already exists, and it speeds up the core job. Problem 1 is a business-model trade-off that needs pricing work; problem 2 needs operations changes.

*Risks:* Value: low risk (repeat buying is common). Usability: low. Feasibility: low–medium (ranking changes need testing). Viability: might reduce discovery of new, higher-margin items, so watch basket diversity.

*Metric:* Time from app open to first add-to-cart for repeat users, down from ~40s to ~25s. Guardrail: average order value and number of distinct items per order don’t fall.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 170" role="img" aria-labelledby="td-t td-d">
<title id="td-t">The six parts of a teardown</title>
<desc id="td-d">Six connected boxes in sequence: user, job, flow, problems, fix, metric.</desc>
<defs><marker id="td-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<g font-weight="700">
<rect x="10" y="50" width="88" height="64" rx="10" class="d-lavender d-ink" stroke-width="2"/><text x="24" y="80" class="d-text-dark">1. User</text><text x="24" y="98" class="d-text-dark" font-size="10" font-weight="400">who, exactly</text>
<rect x="115" y="50" width="88" height="64" rx="10" class="d-lavender d-ink" stroke-width="2"/><text x="129" y="80" class="d-text-dark">2. Job</text><text x="129" y="98" class="d-text-dark" font-size="10" font-weight="400">when / want / so</text>
<rect x="220" y="50" width="88" height="64" rx="10" class="d-sky d-ink" stroke-width="2"/><text x="234" y="80" class="d-text-dark">3. Flow</text><text x="234" y="98" class="d-text-dark" font-size="10" font-weight="400">steps + taps</text>
<rect x="325" y="50" width="98" height="64" rx="10" class="d-pink d-ink" stroke-width="2"/><text x="337" y="80" class="d-text-dark">4. Problems</text><text x="337" y="98" class="d-text-dark" font-size="10" font-weight="400">3, with evidence</text>
<rect x="440" y="50" width="88" height="64" rx="10" class="d-mint d-ink" stroke-width="2"/><text x="454" y="80" class="d-text-dark">5. Fix</text><text x="454" y="98" class="d-text-dark" font-size="10" font-weight="400">1, with risks</text>
<rect x="545" y="50" width="88" height="64" rx="10" class="d-butter d-ink" stroke-width="2"/><text x="557" y="80" class="d-text-dark">6. Metric</text><text x="557" y="98" class="d-text-dark" font-size="10" font-weight="400">+ guardrail</text>
</g>
<line x1="99" y1="82" x2="112" y2="82" class="d-ink" stroke-width="2" marker-end="url(#td-a)"/>
<line x1="204" y1="82" x2="217" y2="82" class="d-ink" stroke-width="2" marker-end="url(#td-a)"/>
<line x1="309" y1="82" x2="322" y2="82" class="d-ink" stroke-width="2" marker-end="url(#td-a)"/>
<line x1="424" y1="82" x2="437" y2="82" class="d-ink" stroke-width="2" marker-end="url(#td-a)"/>
<line x1="529" y1="82" x2="542" y2="82" class="d-ink" stroke-width="2" marker-end="url(#td-a)"/>
<text x="150" y="150" class="d-text" font-size="12">Understand (1–3) → Diagnose (4) → Propose and measure (5–6)</text>
</svg>
<figcaption>Use this exact structure for the Swiggy, CRED and Zerodha Kite teardowns.</figcaption>
</figure>

## Step by step

A teardown in about 3 hours:

1. **Use the product for real (30 min).** Complete the core job at least twice. Screenshot every step of the key flow.
2. **Mine reviews (30 min).** Read 50 recent Play Store reviews. Tag each one with a theme (fees, delivery, app bugs, support…). Count the tags. The top themes are your problem candidates.
3. **Define user and job (15 min).** Write one target user description and one job statement.
4. **Map the key flow (20 min).** Number the steps, paste screenshots, note taps and moments of doubt. Draw it in Miro (see this week’s tool guide).
5. **Write three problems (20 min).** Each with evidence (review quotes, counts, your timings).
6. **Choose and design one fix (30 min).** Explain why this problem, sketch the change, run a quick four-risk check.
7. **Pick the metric and guardrail (10 min).**
8. **Add the business model (10 min).** How does the product earn money, and does your fix help or hurt that?
9. **Edit and publish (20 min).** Cut anything that isn’t evidence or reasoning. Publish in Notion and share a short LinkedIn post with your key insight.

## Common mistakes

1. **Listing features instead of analysing.** “It has dark mode and a referral programme” isn’t a teardown.
2. **Opinions without evidence.** “The UI is cluttered” is weak. “Users need 5 taps to find the coupon field; 14 of 50 reviews mention coupons” is strong.
3. **Too many fixes.** Five half-thought fixes look worse than one well-reasoned fix.
4. **Ignoring the business.** Suggesting “remove all fees” ignores how the company stays alive.
5. **Vague metrics.** “Improve engagement” doesn’t count. Name the behaviour.
6. **Being harsh about the team.** Assume constraints you can’t see. Recruiters notice tone.

## How it shows up in interviews

> [!INTERVIEW]
> **“What’s your favourite product, and how would you improve it?”**
> Outline: this is a teardown spoken aloud. User → job → why it’s great (specific design choices) → one problem with evidence → one improvement → metric and guardrail. Keep it to 5–6 minutes. You’ll go deeper in Week 13.

> [!INTERVIEW]
> **“Walk me through a teardown you did.”**
> Outline: why you picked the product → your top insight (one sentence) → the evidence → the fix and its trade-offs → what you’d measure → what you learned about PM work. Bring the link.

## Practice exercise

**Task (60 minutes):** Do a mini-teardown of **Rapido** (bike taxi) or **Ola** using the six parts. Keep each part to 2–4 lines. Use at least 10 Play Store reviews as evidence.

```answer Reveal a model answer (Rapido)
**User:** Daily commuters in Bengaluru, 18–35, travelling 3–12 km alone, price-sensitive and short on time, often to metro stations or offices.

**Job:** “When I need to get across town quickly and cheaply, I want a ride that arrives in minutes and cuts through traffic, so I reach on time without spending ₹300 on a cab.”

**Key flow:** Open app → pickup auto-detected → enter drop → see bike fare → book → captain assigned → track arrival → OTP shared → ride → pay (UPI/cash) → rate. About 6 taps.

**Problems:**
1. Captain cancellations after acceptance during peak hours (very common theme in 1-star reviews).
2. Pickup point confusion: captains call to ask where you are (many reviews mention repeated calls).
3. Fare changes at ride end when the route changes, without explanation.

**Fix (problem 1):** Show a “reliability score” to captains and give priority access to peak-hour bookings for captains with low cancellation rates, while letting riders see “high-reliability captain” on the assigned card. Why: cancellations break the core promise of speed. Risks: viability (captains may push back if earnings drop), feasibility (fair scoring across areas).

**Metric:** Post-acceptance cancellation rate at peak hours, from (estimate) 15% to 10%. Guardrail: captain supply during peak hours doesn’t fall.
```

## Quiz

```quiz
Q: Which is the best description of a product teardown?
- [ ] A list of every feature in a product :: Feature lists don’t analyse anything.
- [ ] A personal review of what you like and dislike :: Opinions without structure and evidence aren’t a teardown.
- [x] A structured analysis of who a product serves, how it works, where it breaks, and one evidence-backed fix :: Correct. It’s an argument backed by evidence.
- [ ] A competitor comparison chart :: That’s competitive analysis, a related but different exercise.

Q: Which problem statement is strongest for a teardown?
- [ ] The app is confusing :: Vague and without evidence.
- [ ] I don’t like the colours :: A personal preference, not a user problem.
- [x] 14 of 50 recent 1–2 star reviews mention surprise fees shown only at checkout :: Correct. Specific, user-focused and backed by evidence.
- [ ] The app should add a chatbot :: That’s a solution, not a problem.

Q: Why should a teardown include the business model?
- [ ] To show you know finance jargon :: Jargon isn’t the goal.
- [x] Because a fix that hurts revenue or margins has a real cost you must acknowledge :: Correct. Good PMs check viability, not just user delight.
- [ ] Because recruiters only care about money :: Recruiters care about thinking quality.
- [ ] It isn’t necessary :: Ignoring the business model is a common teardown mistake.

Q: You found five problems. What should your teardown do?
- [ ] Propose fixes for all five in equal detail :: This spreads you thin and makes prioritisation invisible.
- [x] List the top three, then pick one and explain why it matters most :: Correct. Showing prioritisation is a core PM skill.
- [ ] Mention only the easiest one :: Easiest isn’t the same as most important.
- [ ] Skip problems and describe the flow only :: Diagnosis is the heart of a teardown.

Q: A good metric for a teardown fix is:
- [ ] Improve user experience :: Not measurable.
- [ ] Ship the redesign in Q2 :: An output, not a metric.
- [x] Checkout conversion from cart to paid order, with average order value as a guardrail :: Correct. A clear behavioural metric plus something to protect.
- [ ] Number of new features released :: An output count.

Q: Where is the best place to find evidence of real user problems quickly and for free?
- [x] Recent 1–2 star app store reviews, tagged by theme :: Correct. They’re free, recent and in users’ own words.
- [ ] The company’s press releases :: Press releases highlight positives, not problems.
- [ ] Your own guesses :: Guesses are a starting point, not evidence.
- [ ] Paid market research reports :: Expensive and often too general for a teardown.
```

## Key takeaways

- A teardown is an **argument**: user → job → key flow → problems → one fix → metric.
- **Evidence beats opinion**: review counts, quotes, timings and tap counts.
- Pick **one fix** and explain why it beats the other problems.
- Always consider the **business model** and the **four risks**.
- Publish your teardowns: they’re **portfolio pieces** and practice for “favourite product” questions.
