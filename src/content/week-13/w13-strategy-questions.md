---
id: w13-strategy-questions
title: Strategy questions
week: 13
estimatedMinutes: 15
tags: [interviews, strategy]
---

## Why this matters for a PM

Strategy questions test whether you can think beyond features: markets, competition, business models and long-term bets. “Should Zomato enter quick commerce?” “How should PhonePe compete with Google Pay?” “Should CRED build a credit card?” They’re common in PM loops, especially for growth-stage and big tech companies, and they reuse everything from Week 3.

## Core concepts

### Common types of strategy questions

1. **Market entry:** “Should X enter market/product Y?”
2. **Competitive response:** “Competitor launched Z. What should we do?”
3. **Growth strategy:** “How would you grow X in tier 2 cities / 10x users?”
4. **Business model / monetisation:** “How should X make money from feature Y?”
5. **Build / buy / partner:** “Should X build or acquire capability Y?”
6. **Prioritisation at company level:** “Which of these three bets should X make next year?”

### A structure

1. **Clarify (1–2 min):** goal behind the question (growth, profit, defence), time horizon, constraints.
2. **Company context (2–3 min):** mission, current strengths (assets, moats), business model, lifecycle stage, current challenges.
3. **Market and customer (3–4 min):** who are the customers, their needs, market size and growth (rough estimate), trends.
4. **Competition (2–3 min):** key players, their positions, where the white space is.
5. **Options (3–4 min):** 2–4 strategic options (including “don’t do it” and partnership).
6. **Evaluate (4–5 min):** criteria: market attractiveness, fit with strengths/moats, economics (unit economics, investment), risks, competitive response, timing.
7. **Recommend (2 min):** a clear decision with reasons.
8. **Plan and metrics (2–3 min):** first steps (pilot city, MVP), success metrics, kill criteria.

### Frameworks to borrow (lightly)

- **3Cs:** Company, Customers, Competitors.
- **SWOT** (with evidence).
- **Porter’s Five Forces** (competitive intensity: rivals, new entrants, substitutes, buyer power, supplier power).
- **Ansoff matrix:** existing/new products × existing/new markets → market penetration, product development, market development, diversification (riskiest).
- **Unit economics:** contribution margin per order/user, CAC vs. LTV.
Use them as checklists, not as scripts; interviewers dislike forced frameworks.

### Making a recommendation

Strategy answers often fail by refusing to choose. A strong recommendation:
- **Decides** (“Yes, enter, but start with X”; or “No, partner instead”).
- **Explains the key reason** (fit with strengths, economics).
- **Names the biggest risk** and how you’d de-risk it (a pilot with clear success/kill criteria).
- **States metrics** to monitor.

### India-specific considerations

- **Price sensitivity** and low ARPU in many segments.
- **Tier 2/3 differences:** language, trust, payments (COD), logistics density.
- **Regulation:** RBI (payments, lending), SEBI (investments), IRDAI (insurance), data protection.
- **Distribution:** WhatsApp, assisted commerce, kirana networks, offline partners.
- **Competitive intensity** and well-funded rivals.

## Worked example

**Prompt:** “Should Zerodha launch a credit card?”

1. **Clarify:** goal? (Assume: grow revenue and deepen relationships with existing users, without hurting brand trust.) Horizon: 2–3 years.
2. **Company context:** India’s largest broker by active clients; brand built on trust, low cost and investor education; strong with investors and traders; mature core business; regulatory scrutiny of broking; revenue concentrated in trading.
3. **Customers and market:** credit cards are concentrated among higher-income urban users; Zerodha’s base skews young, urban, financially literate, many with good credit. Card market is large but crowded (banks, co-branded cards, fintech partnerships).
4. **Competition:** banks dominate issuance; fintechs partner with banks for co-branded cards; competitors differentiate on rewards, design, ecosystem. White space: a card aligned with long-term investing (e.g., rewards invested automatically).
5. **Options:**
   - A: Don’t launch; focus on core and adjacent investing products.
   - B: Co-branded card with a bank partner (bank issues, Zerodha brands and integrates).
   - C: Pursue own issuing capability (heavy licensing and capital requirements).
   - D: “Invest your rewards” partnership with existing card issuers (no card launch).
6. **Evaluate:**
   - Fit: credit cards encourage spending; Zerodha’s brand emphasises prudent financial behaviour → potential brand tension. A card framed around “rewards invested in index funds” could fit.
   - Economics: card revenue (interchange, fees, interest) shared with bank in B; acquisition cost low (existing base); credit risk mostly on the bank.
   - Risk: brand dilution if users get into debt; regulatory complexity; operational distraction.
   - C is too heavy; A is safe but misses diversification; D tests demand cheaply.
7. **Recommend:** start with **D**, then **B** if demand is proven: “Test demand by letting users auto-invest card rewards from partner cards. If 5%+ of active investors opt in within 6 months and engagement is strong, launch a co-branded ‘invest-first’ card with a bank partner, with features that discourage revolving debt (e.g., default full-payment autopay).”
8. **Metrics:** opt-in rate among active investors; rewards invested per user; card activation and full-payment rate (guardrail: share revolving debt); impact on core retention. Kill criterion: low opt-in or brand sentiment drop.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 230" role="img" aria-labelledby="sq-t sq-d">
<title id="sq-t">Strategy answer structure</title>
<desc id="sq-d">Context, customers and competition feed into options, which are evaluated against criteria, leading to a recommendation with a pilot, metrics and kill criteria.</desc>
<defs><marker id="sq-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<g font-size="11">
<rect x="15" y="20" width="140" height="40" rx="8" class="d-lavender d-ink" stroke-width="2"/><text x="27" y="45" class="d-text-dark" font-weight="700">Company context</text>
<rect x="15" y="70" width="140" height="40" rx="8" class="d-lavender d-ink" stroke-width="2"/><text x="27" y="95" class="d-text-dark" font-weight="700">Customers + market</text>
<rect x="15" y="120" width="140" height="40" rx="8" class="d-lavender d-ink" stroke-width="2"/><text x="27" y="145" class="d-text-dark" font-weight="700">Competition</text>
<rect x="200" y="55" width="130" height="70" rx="8" class="d-sky d-ink" stroke-width="2"/><text x="212" y="80" class="d-text-dark" font-weight="700">2–4 options</text><text x="212" y="100" class="d-text-dark" font-size="10">incl. “don’t” + partner</text>
<rect x="370" y="40" width="130" height="100" rx="8" class="d-butter d-ink" stroke-width="2"/><text x="382" y="62" class="d-text-dark" font-weight="700">Evaluate</text><text x="382" y="82" class="d-text-dark" font-size="10">fit with moats</text><text x="382" y="98" class="d-text-dark" font-size="10">economics</text><text x="382" y="114" class="d-text-dark" font-size="10">risk + response</text><text x="382" y="130" class="d-text-dark" font-size="10">timing</text>
<rect x="530" y="40" width="100" height="100" rx="8" class="d-mint d-ink" stroke-width="3"/><text x="540" y="64" class="d-text-dark" font-weight="700">Decide</text><text x="540" y="84" class="d-text-dark" font-size="10">pilot</text><text x="540" y="100" class="d-text-dark" font-size="10">metrics</text><text x="540" y="116" class="d-text-dark" font-size="10">kill criteria</text>
</g>
<g class="d-ink" stroke-width="2"><line x1="157" y1="40" x2="196" y2="75" marker-end="url(#sq-a)"/><line x1="157" y1="90" x2="196" y2="90" marker-end="url(#sq-a)"/><line x1="157" y1="140" x2="196" y2="105" marker-end="url(#sq-a)"/><line x1="332" y1="90" x2="366" y2="90" marker-end="url(#sq-a)"/><line x1="502" y1="90" x2="526" y2="90" marker-end="url(#sq-a)"/></g>
<text x="120" y="205" class="d-text" font-size="12">Always end with a clear recommendation, a de-risking pilot and kill criteria.</text>
</svg>
<figcaption>Context → options → evaluation → a decision you can defend.</figcaption>
</figure>

## Step by step

Preparing 3 strategy answers (deliverable):

1. **Pick 3 prompts** from Interview Prep (strategy category).
2. **Write a 2-minute company context** for each (strengths, model, challenges).
3. **Rough-size the market** (Estimation lesson).
4. **Map competitors** quickly.
5. **List options** including “no” and “partner”.
6. **Evaluate** against 4–5 criteria.
7. **Recommend** with pilot, metrics and kill criteria.
8. **Record a 20-minute answer**; self-score; refine.

## Common mistakes

1. **No recommendation** (“it depends”) at the end.
2. **Ignoring the company’s strengths and brand.**
3. **Reciting frameworks** mechanically.
4. **Forgetting economics** (unit economics, investment, payback).
5. **Ignoring regulation** in fintech, health, insurance.
6. **No de-risking plan.**

## How it shows up in interviews

> [!INTERVIEW]
> **“Should Swiggy launch a ride-hailing service?”**
> Outline: goal (growth/diversification) → strengths (logistics, rider fleet, user base, payments) → market (crowded: Ola, Uber, Rapido) → options (no; partner; bike taxi pilot leveraging delivery fleet; B2B logistics instead) → evaluate (fit, economics, competition, regulation, distraction) → recommend with pilot city and kill criteria.

> [!INTERVIEW]
> **“A competitor cut prices by 30%. How do you respond?”**
> Outline: understand why (funding, desperation, test?) → impact on our segments (which users are price-sensitive?) → options (match, targeted offers, differentiate on value, ignore) → economics → recommend → monitor churn by segment.

## Practice exercise

**Task (30 minutes):** Answer “Should PhonePe build a quick-commerce service?” in notes form using the 8 steps, ending with a recommendation, pilot and kill criteria.

```answer Reveal a model answer outline
- **Clarify:** goal: grow engagement and monetisation of a massive payments user base.
- **Context:** strengths: huge UPI user base, merchant network (kiranas), payments trust; weaknesses: no logistics or dark-store operations; monetisation pressure.
- **Market:** quick commerce growing fast in metros but capital-intensive (dark stores, riders); tier 2 adoption uncertain.
- **Competition:** Blinkit, Zepto, Instamart, others with scale and operational expertise.
- **Options:** (A) don’t enter; (B) build own quick commerce (dark stores) → very capital-heavy; (C) kirana-powered fast delivery via its merchant network (asset-light); (D) partner/integrate existing quick-commerce players in the app for payments and offers.
- **Evaluate:** B poor fit and high cost; C fits the merchant network strength but operational complexity (inventory visibility, delivery); D low cost, monetises traffic, limited differentiation.
- **Recommend:** start with **D** (partnerships for monetisation) and **pilot C** in two neighbourhoods with kiranas already using PhonePe for business, testing digital catalogues and local delivery.
- **Metrics:** pilot orders per kirana per day, delivery time, repeat rate, merchant margin, contribution margin per order. **Kill criteria:** contribution margin negative after 3 months with no clear path; repeat rate under a threshold.
```

## Quiz

```quiz
Q: What should every strategy answer end with?
- [ ] A list of frameworks used :: Frameworks are tools, not conclusions.
- [x] A clear recommendation with a de-risking plan, metrics and kill criteria :: Correct. Decisions with safeguards show leadership.
- [ ] “It depends” :: Avoids the decision being tested.
- [ ] A new question for the interviewer :: Fine at the end of the interview, not as the answer.

Q: Why include “don’t do it” as an option?
- [ ] To seem negative :: Not the goal.
- [x] It forces a fair comparison; sometimes focusing on the core is the best strategy :: Correct. Saying no is a real strategic option.
- [ ] Interviewers always prefer “no” :: They prefer well-reasoned answers either way.
- [ ] It saves time :: Not the reason.

Q: Which Ansoff quadrant is usually riskiest?
- [ ] Market penetration (existing product, existing market) :: Lowest risk: you know both the product and the market.
- [ ] Product development (new product, existing market) :: Moderate risk.
- [ ] Market development (existing product, new market) :: Moderate risk.
- [x] Diversification (new product, new market) :: Correct. Two unknowns at once.

Q: In an Indian fintech strategy question, what must you consider?
- [ ] Only the UI design :: Too narrow for strategy.
- [x] Regulation (e.g., RBI, SEBI), trust and unit economics :: Correct. These often decide fintech strategy in India.
- [ ] Only competitors’ logos :: Not strategic.
- [ ] Nothing beyond growth :: Regulation and economics matter.

Q: What’s a good way to de-risk a big strategic bet?
- [ ] Launch nationwide immediately :: Maximises risk.
- [x] Pilot in a limited market with clear success and kill criteria :: Correct. You learn cheaply before committing fully.
- [ ] Wait several years :: May miss the opportunity.
- [ ] Copy a competitor exactly :: Doesn’t address your situation.
```

## Key takeaways

- Strategy types: **market entry, competitive response, growth, monetisation, build/buy/partner, company prioritisation**.
- Structure: **clarify → context → customers/market → competition → options → evaluate → recommend → plan/metrics**.
- Borrow **3Cs, SWOT, Five Forces, Ansoff, unit economics** as checklists, not scripts.
- Consider **India-specific** factors: price sensitivity, tier 2/3, regulation, distribution.
- Always **decide**, with a **pilot, metrics and kill criteria**.
