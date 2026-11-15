---
id: w13-favourite-product
title: Favourite product
week: 13
estimatedMinutes: 13
tags: [interviews, product-sense]
---

## Why this matters for a PM

“What’s your favourite product and why?” sounds like small talk, but it’s a product sense test. Interviewers learn whether you notice design decisions, understand users and business models, and can think critically about products you love. A prepared, well-structured answer is easy marks; a vague “I love Instagram because it’s fun” loses them.

## Core concepts

### What interviewers listen for

1. **Depth over breadth:** specific design choices, not general praise.
2. **User understanding:** who it’s for and what job it does.
3. **Why it works:** mechanisms (design, business model, network effects, trust).
4. **Critical thinking:** even favourites have flaws; you can improve them.
5. **Passion with reasoning:** genuine interest, explained.

### Choosing your product

Pick a product that:
- You **use regularly** and know deeply.
- Is **interesting** (a well-designed niche product often beats “Google Maps” or “WhatsApp”, which many candidates choose; but a common product with a fresh insight works too).
- **Relates to the role** where possible (fintech role → a payments or investing product; AI role → an AI product).
- Lets you discuss **design decisions and trade-offs**.

Prepare **2–3 favourites** so you can pick one that fits the company and avoid choosing the interviewer’s own product unless you’re very well prepared.

### A structure (5–7 minutes)

1. **Name and one-line what it is.**
2. **Who it’s for and the job it does** (JTBD).
3. **Why it’s great: 2–3 specific reasons**, each tied to a user need and a design decision. Examples: removing a step that competitors require; a default that fits Indian users; a business model that aligns incentives; trust built through a specific feature.
4. **How it makes money**, and whether that aligns with users.
5. **One thing you’d improve:** problem (with evidence), solution, metric.
6. **Close:** what it taught you about building products.

### Making “why it’s great” specific

Weak: “UPI apps are convenient.”
Strong: “Google Pay’s payee-verification screen shows the bank-registered name before you enter your PIN. It prevents the most expensive user error, sending money to the wrong person, at the exact moment it can still be stopped. That’s error prevention at the right point in the flow.”

Use the frameworks you’ve learned as lenses: JTBD, the four risks, Kano (delighters vs. basics), usability heuristics, laws of UX, network effects, business model alignment.

### Follow-up questions to prepare for

- “Who are its competitors, and why does it win?”
- “What metric would you use as its North Star?”
- “If you were the PM, what would you build next?”
- “What would you change about its business model?”
- “How would you grow it in tier 2 cities?”
Prepare short answers for each.

## Worked example

**Product: Zerodha Kite (for a fintech PM role).**

1. **What it is:** a stock trading app from India’s largest broker by active clients.
2. **Who and job:** active traders who want fast, reliable execution, and long-term investors who want low-cost, no-nonsense investing. Job: “When I decide to buy or sell, I want my order executed instantly and reliably at low cost, so I can act on my decision without friction or surprises.”
3. **Why it’s great:**
   - **Reliability as the product:** a clean, fast order window with keyboard shortcuts for traders. In trading, a one-second delay can cost money; Kite treats speed and stability as the core feature rather than adding flashy extras.
   - **Trust through restraint:** no aggressive push notifications to trade more and an emphasis on education (Varsity). Fewer dark patterns builds long-term trust, which is rare in trading apps.
   - **Business model alignment:** low flat fees for active trading and free equity delivery (as historically positioned) made it attractive to long-term investors and aligned with “invest sensibly” messaging.
4. **Money:** brokerage on intraday/F&O, account charges, interest on balances and adjacent products; reliant on active traders, which creates tension with “don’t over-trade” messaging, an interesting trade-off.
5. **Improve:** new investors find order types confusing (common in reviews and forums). I’d add a beginner order mode with plain-language labels and defaults, measured by first-order success rate and 90-day retention for new investors, with experienced users unaffected.
6. **Close:** “Kite taught me that sometimes the best product decision is what you *don’t* build, and that trust compounds.”

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 200" role="img" aria-labelledby="fp-t fp-d">
<title id="fp-t">Favourite product answer structure</title>
<desc id="fp-d">Six blocks: what it is, who and job, why it’s great with specific reasons, business model, one improvement, what it taught you.</desc>
<g font-size="11">
<rect x="10" y="30" width="95" height="70" rx="8" class="d-lavender d-ink" stroke-width="2"/><text x="20" y="58" class="d-text-dark" font-weight="700">What it is</text><text x="20" y="76" class="d-text-dark" font-size="10">one line</text>
<rect x="115" y="30" width="95" height="70" rx="8" class="d-lavender d-ink" stroke-width="2"/><text x="125" y="58" class="d-text-dark" font-weight="700">User + job</text><text x="125" y="76" class="d-text-dark" font-size="10">JTBD</text>
<rect x="220" y="20" width="140" height="90" rx="8" class="d-mint d-ink" stroke-width="3"/><text x="230" y="48" class="d-text-dark" font-weight="700">Why it’s great</text><text x="230" y="68" class="d-text-dark" font-size="10">2–3 specific design</text><text x="230" y="82" class="d-text-dark" font-size="10">decisions + mechanisms</text>
<rect x="370" y="30" width="80" height="70" rx="8" class="d-sky d-ink" stroke-width="2"/><text x="380" y="58" class="d-text-dark" font-weight="700">Money</text><text x="380" y="76" class="d-text-dark" font-size="10">aligned?</text>
<rect x="460" y="30" width="90" height="70" rx="8" class="d-pink d-ink" stroke-width="2"/><text x="470" y="58" class="d-text-dark" font-weight="700">Improve</text><text x="470" y="76" class="d-text-dark" font-size="10">+ metric</text>
<rect x="560" y="30" width="70" height="70" rx="8" class="d-butter d-ink" stroke-width="2"/><text x="568" y="58" class="d-text-dark" font-weight="700">Lesson</text>
</g>
<text x="140" y="150" class="d-text" font-size="12">Spend the most time on specific “why it works” mechanisms.</text>
</svg>
<figcaption>Show you see design decisions, user jobs and business models, and can still critique what you love.</figcaption>
</figure>

## Step by step

Preparing your favourite product answers:

1. **Shortlist 3 products** (one fintech/payments, one consumer, one AI or B2B).
2. **For each, write the 6-part structure** in bullets.
3. **Find 3 specific design decisions** per product (screens, defaults, removed steps); screenshot them.
4. **Check the business model** (public info).
5. **Mine reviews** for one real problem to improve.
6. **Prepare follow-ups**: competitors, North Star, next feature, growth idea.
7. **Record a 6-minute version** of each; refine.
8. **Map which product fits which company type.**

## Common mistakes

1. **Generic praise** (“it’s easy to use”, “great UI”).
2. **Choosing a product you don’t know deeply.**
3. **No critique**, which suggests a lack of critical thinking.
4. **Ignoring the business model.**
5. **Talking for 15 minutes** without structure.
6. **Choosing the interviewer’s product carelessly** and getting facts wrong.

## How it shows up in interviews

> [!INTERVIEW]
> **“What’s your favourite product?”** followed by **“How would you improve it?”** and **“What should its North Star be?”**. Prepare all three for each favourite.

> [!INTERVIEW]
> **“What’s a product you think is badly designed?”**
> Outline: the reverse: user and job → where it fails (heuristics, laws of UX) → why it might be that way (constraints) → your fix → metric. Stay respectful.

## Practice exercise

**Task (35 minutes):** Write the full 6-part answer for one of your favourites, including 3 specific design decisions and one improvement with a metric. Then answer the follow-up “What should its North Star metric be?” in 3 lines.

```answer Reveal a model answer (CRED, illustrative)
1. **What:** a credit card bill payment and rewards app for creditworthy users.
2. **User + job:** urban professionals with credit cards: “When my card bill is due, I want to pay it on time without hassle, and feel rewarded for being responsible.”
3. **Why it’s great:** (a) **Membership gate** (credit score threshold) turns a mundane task into a status signal, a social job most finance apps ignore; (b) **Bill detection and reminders** reduce missed payments by surfacing due dates automatically; (c) **Distinctive, playful design** makes a boring task feel premium, a Kano “delighter” that builds brand love.
4. **Money:** monetisation through partner offers, credit products and payments; the premium user base is attractive to partners. Tension: rewards can feel less valuable over time.
5. **Improve:** rewards are often hard to understand and redeem (common complaint). Make rewards transparent: show “value in ₹” upfront and personalise offers to actual spending. Metric: % of members redeeming a reward monthly; guardrail: reward cost per member.
6. **Lesson:** emotional and social jobs can differentiate even the most functional products.

**North Star:** monthly members who pay at least one bill on time through CRED: reflects the core job, drives retention and cross-sell, and can’t be gamed by vanity engagement.
```

## Quiz

```quiz
Q: What makes a favourite-product answer strong?
- [ ] Choosing the most popular app :: Popularity isn’t the point; insight is.
- [x] Explaining specific design decisions and why they work for a defined user and job :: Correct. Specifics prove you notice how products work.
- [ ] Listing every feature :: Breadth without insight.
- [ ] Only praising the product :: Critique shows critical thinking.

Q: Which “why it’s great” point is most specific?
- [ ] It’s really convenient :: Generic: it doesn’t say what makes it convenient or for whom.
- [x] It shows the payee’s verified name before the PIN step, preventing wrong transfers at the last moment they can be stopped :: Correct. A concrete decision tied to a user risk.
- [ ] Everyone uses it :: Popularity, not design insight.
- [ ] The colours are nice :: Superficial: visuals alone don’t explain why a product works.

Q: Why include the business model?
- [ ] Interviewers only care about revenue :: Not only, but it matters.
- [x] It shows you understand how the product sustains itself and whether incentives align with users :: Correct. Business models shape every product decision.
- [ ] It replaces the user discussion :: Users still come first.
- [ ] It isn’t relevant :: It’s a core part of product thinking.

Q: Why prepare 2–3 favourite products?
- [ ] To list them all in one answer :: Pick one per answer.
- [x] So you can choose the one most relevant to the company and role :: Correct. Relevance makes the answer more persuasive.
- [ ] Because one is never enough time :: Not the reason.
- [ ] To avoid follow-up questions :: Follow-ups will still come.

Q: What should you prepare beyond the main answer?
- [ ] Nothing; it’s a warm-up question :: Follow-ups are common.
- [x] Follow-ups like competitors, North Star metric and what to build next :: Correct. Interviewers almost always dig deeper.
- [ ] The company’s stock price :: Rarely relevant.
- [ ] A list of unrelated products :: Not useful: depth on one product matters more.
```

## Key takeaways

- “Favourite product” is a **product sense** test, not small talk.
- Structure: **what → user and job → why it’s great (specific mechanisms) → money → one improvement → lesson**.
- Use frameworks as lenses: **JTBD, heuristics, Kano, laws of UX, business model alignment**.
- Always include a **thoughtful critique** with a metric.
- Prepare **2–3 favourites** and their **follow-ups**; match the product to the company.
