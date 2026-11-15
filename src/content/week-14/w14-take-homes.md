---
id: w14-take-homes
title: Take-home assignments
week: 14
estimatedMinutes: 13
tags: [interviews, assignments]
---

## Why this matters for a PM

Many Indian startups and some larger companies use **take-home assignments**: “Write a PRD for X”, “Analyse this dataset and recommend actions”, “Propose a strategy for Y”, or “Design an AI feature and its evaluation plan”. They’re your chance to show real work quality without interview pressure, and often the deciding round for career switchers. Doing them well is about scoping, clarity and judgement, not length.

## Core concepts

### Common formats

1. **Product design / PRD:** design a feature and write a spec (2–5 pages or a deck).
2. **Product improvement / teardown:** analyse an existing product and propose improvements.
3. **Data analysis:** a CSV or SQL dataset; find insights and recommend actions.
4. **Strategy:** market entry, growth plan, competitive response.
5. **AI-specific:** design an AI feature, eval plan, prompt and outputs, cost analysis.
6. **Presentation follow-up:** present your take-home to a panel and answer questions (very common).

### What evaluators look for

- **Understanding the problem** and asking smart questions (or stating assumptions).
- **Structure and clarity:** easy to skim; key recommendation upfront.
- **Prioritisation:** focus on the most important things; explicit trade-offs.
- **Evidence:** data, research, reasoning (even lightweight: reviews, quick user chats).
- **Metrics and risks.**
- **Realism:** feasible scope, awareness of constraints.
- **Craft:** clean visuals, no typos, good formatting.

### How to approach a take-home

1. **Read carefully** and note deliverables, format, page/slide limits and deadline.
2. **Ask 2–3 clarifying questions** by email if allowed (shows initiative). Otherwise, list assumptions in the document.
3. **Time-box:** most expect 4–8 hours of effort. Spending 30 hours signals poor prioritisation (and may be unfair to you).
4. **Do light research:** use the product, read 30 reviews, look at competitors, maybe talk to 3 users. Mention it (“Based on 3 quick conversations and 40 reviews…”).
5. **Lead with the answer:** an executive summary on page 1 (problem, recommendation, expected impact, key risks).
6. **Structure the body** with the frameworks you know (problem → users → options → recommendation → metrics → rollout → risks).
7. **Show thinking, not just conclusions:** options considered and why rejected.
8. **Include visuals:** a flow diagram, wireframe sketch, chart, prioritisation table.
9. **Be concise:** respect page limits; use appendices for detail.
10. **Proofread** and check every number.

### Data take-homes specifically

- **Start by understanding the data:** columns, time range, missing values, odd values.
- **State the questions you’re answering.**
- **Analyse** with SQL/Sheets: segments, trends, funnels, cohorts.
- **Separate observations from interpretations.**
- **Recommend actions** with expected impact and how to test them.
- **Note limitations** (data quality, correlation vs. causation).
- **Share queries/notebook** in an appendix.

### AI take-homes specifically

- **Justify AI** vs. baseline.
- **Show prompts and sample outputs** (tested on a few real examples).
- **Eval plan** with criteria and a small labelled sample.
- **Cost and latency estimate.**
- **Risks and guardrails.**
Your P4 artefacts are templates for this.

### Presenting your take-home

- **10–15 minutes** for the main story: problem, recommendation, why, metrics, risks.
- **Anticipate questions:** “Why not option B?”, “What if engineering says it takes 6 months?”, “How would you measure it?”
- **Be open to critique:** defend reasoning, but update when the panel offers new information.

### Fairness and boundaries

Very long unpaid assignments that look like real consulting work for the company are a red flag. It’s reasonable to ask about expected time, and to keep your work at that level.

## Worked example

**Assignment:** “Our quick-commerce app sees 22% of carts abandoned at checkout. Propose a solution (max 4 pages).”

**Page 1 (executive summary):**
- **Problem:** 22% checkout abandonment; analysis of public reviews and a small user survey suggests surprise fees and slot unavailability are top reasons.
- **Recommendation:** show an all-in total from the first cart item, with a clear “add ₹X for free delivery” prompt, and surface the next available slot on the cart page.
- **Expected impact:** reduce abandonment by 3–5 points (assumption-based estimate), measured via A/B test.
- **Key risks:** lower average order value if fewer users pad carts; mitigated by smart add-on suggestions.

**Page 2:** problem analysis (funnel assumptions, top 3 reasons with evidence: 40 reviews tagged, 12 survey responses), user segments most affected (new users, small baskets).
**Page 3:** options considered (fee transparency, fee waiver for first orders, slot visibility, saved carts) in a comparison table with impact/effort/risk; recommendation and wireframe sketch.
**Page 4:** metrics (primary: checkout completion; guardrails: AOV, contribution margin per order), experiment design (sample size estimate), rollout plan, open questions and assumptions.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 220" role="img" aria-labelledby="th-t th-d">
<title id="th-t">Take-home document structure</title>
<desc id="th-d">Four pages: executive summary first, then problem analysis, options and recommendation, metrics and rollout, with an appendix.</desc>
<g class="d-ink" stroke-width="2">
<rect x="20" y="20" width="120" height="160" rx="6" class="d-butter"/><rect x="160" y="20" width="120" height="160" rx="6" class="d-sky"/><rect x="300" y="20" width="120" height="160" rx="6" class="d-mint"/><rect x="440" y="20" width="120" height="160" rx="6" class="d-lavender"/><rect x="575" y="40" width="50" height="120" rx="6" class="d-surface"/>
</g>
<g font-size="11" class="d-text-dark">
<text x="30" y="44" font-weight="700">1 Exec summary</text><text x="30" y="66">problem</text><text x="30" y="82">recommendation</text><text x="30" y="98">impact</text><text x="30" y="114">risks</text>
<text x="170" y="44" font-weight="700">2 Problem</text><text x="170" y="66">evidence</text><text x="170" y="82">segments</text><text x="170" y="98">assumptions</text>
<text x="310" y="44" font-weight="700">3 Options</text><text x="310" y="66">comparison table</text><text x="310" y="82">recommendation</text><text x="310" y="98">wireframe</text>
<text x="450" y="44" font-weight="700">4 Measure</text><text x="450" y="66">metrics</text><text x="450" y="82">experiment</text><text x="450" y="98">rollout</text><text x="450" y="114">open questions</text>
</g>
<text x="578" y="104" class="d-text" font-size="10">App.</text>
<text x="30" y="205" class="d-text" font-size="12">Answer first. Show options and trade-offs. Respect limits. Proofread.</text>
</svg>
<figcaption>Evaluators skim page 1 first; make it the whole story in brief.</figcaption>
</figure>

## Step by step

Your take-home playbook:

1. **Parse the brief** (deliverables, limits, deadline, format).
2. **Send clarifying questions** if allowed; otherwise list assumptions.
3. **Budget time** (e.g., 1h research, 2h analysis/options, 2h writing, 1h visuals, 30m proofreading).
4. **Research lightly** but genuinely.
5. **Draft the executive summary first**; refine at the end.
6. **Write the body** with clear headings and visuals.
7. **Add metrics, experiment plan, rollout, risks.**
8. **Cut** to the limit; move extras to an appendix.
9. **Proofread**; check numbers; ask a friend to skim page 1.
10. **Prepare a 10-minute presentation** and likely questions.

## Common mistakes

1. **Burying the recommendation** on page 5.
2. **Over-scoping** (solving everything) instead of prioritising.
3. **No evidence**, only opinions.
4. **Ignoring page limits.**
5. **No metrics or risks.**
6. **Spending 30+ hours** on a 6-hour assignment.

## How it shows up in interviews

> [!INTERVIEW]
> **Take-home presentation Q&A:** “Why did you pick this over option B?” Answer with your criteria and evidence; acknowledge what would change your mind. “How would you reduce scope if engineering had 3 weeks?” Show an MVP cut.

> [!INTERVIEW]
> **“Walk me through how you approached the assignment.”**
> Outline: how you understood the problem, what research you did, how you chose among options, what you’d do with more time.

## Practice exercise

**Task (2–3 hours, optional but recommended):** Do a mock take-home: “Propose an AI feature for a food delivery app to reduce ‘where is my order?’ support contacts. Max 3 pages.” Use the 4-part structure and include a mini eval plan and cost estimate.

```answer Reveal an outline to compare against
**Page 1 – Summary:** problem (WISMO contacts are the #1 support category; assume 25% of contacts); recommendation: proactive AI-written delay explanations grounded in live order/rider data + an in-app assistant for order questions (no free-form chat on other topics); expected impact: 20–30% fewer WISMO contacts; risks: wrong ETAs, over-notification.

**Page 2 – Problem + options:** evidence (reviews mentioning ETA changes, support categories); options: better tracking UI (no AI), proactive delay notifications with templated reasons (rules), AI-written contextual explanations, conversational assistant. Recommend: rules for common delay reasons + AI for messy combinations and user questions, grounded in order data (tools), with templates as fallback.

**Page 3 – Measure + ship:** eval plan: 100 real order scenarios with expected explanations; criteria: factual consistency with order data, clarity, no promises beyond ETA; validated LLM judge; release threshold 95% factual consistency. Cost: ~₹0.05 per message (example pricing) × messages/day. Metrics: WISMO contacts per 1,000 orders; CSAT on delayed orders; guardrails: notification opt-outs, complaints about wrong info. Rollout: one city, A/B, then expand.
```

## Quiz

```quiz
Q: What should page 1 of a take-home contain?
- [ ] Your CV :: Not relevant to the assignment.
- [x] An executive summary: problem, recommendation, expected impact and key risks :: Correct. Evaluators often read page 1 first.
- [ ] Raw data tables :: Belong in the appendix.
- [ ] A long introduction about the company :: Gets to the point too slowly.

Q: The brief says “max 4 pages”. You have 9 pages of ideas. What do you do?
- [ ] Submit 9 pages :: Ignores the constraint and shows weak prioritisation.
- [x] Prioritise the most important content, cut, and move detail to an appendix if allowed :: Correct. Constraints test prioritisation.
- [ ] Use tiny font to fit everything :: Hurts readability.
- [ ] Ask for an extension to 10 pages :: Misses the point of the constraint.

Q: How much evidence should you include?
- [ ] None; opinions are enough :: Weakens credibility.
- [x] Light but genuine evidence like tagged reviews, a short survey or a few user chats, clearly described :: Correct. Honest, proportionate evidence builds credibility.
- [ ] A full market research study :: Usually beyond the expected effort.
- [ ] Made-up survey numbers :: Never fabricate.

Q: In a data take-home, what should you do first?
- [ ] Build a dashboard :: Understand the data first.
- [x] Understand the dataset: columns, time range, missing and odd values :: Correct. Bad data understanding leads to wrong conclusions.
- [ ] Write recommendations :: You need analysis first.
- [ ] Remove all outliers without checking :: May remove real signal.

Q: What’s a reasonable approach to effort?
- [ ] Spend as long as possible to impress :: Signals poor prioritisation and is unsustainable.
- [x] Stay close to the expected time (often 4–8 hours) and prioritise quality on what matters :: Correct. Shows judgement and protects your time.
- [ ] Spend 30 minutes :: Usually too little for quality.
- [ ] Ask someone else to do it :: Dishonest, and it will show in the presentation.
```

## Key takeaways

- Take-homes show **real work quality**: scoping, clarity, judgement and craft.
- **Lead with an executive summary**; structure the body as **problem → options → recommendation → metrics → rollout → risks**.
- Use **light, genuine evidence**; show **options and trade-offs**.
- Respect **page limits and expected time**; proofread every number.
- Prepare to **present and defend** your work, and update when given new information.
