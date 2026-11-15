---
id: w11-cost
title: Cost per user and per request
week: 11
estimatedMinutes: 15
tags: [ai, cost, unit-economics]
---

## Why this matters for a PM

Traditional software is cheap to run per extra user. AI features aren’t: every request costs money in tokens, and heavy users can cost far more than light ones. AI PMs must know the **cost per request** and **cost per user**, compare them with the value each user brings, and keep them under control as usage grows. Your P4 deliverable includes cost per user, and “costs tripled” is a classic AI PM interview case.

## Core concepts

### The basic formula

**Cost per request** = (input tokens × input price + output tokens × output price) ÷ 1,000,000
(when prices are quoted per million tokens), plus any other per-request costs: embeddings, vector database queries, tool/API calls, guardrail model calls.

**Cost per user per month** = cost per request × requests per user per month.

**Total monthly cost** = cost per user per month × active users (or sum across user segments).

Convert to rupees with an exchange rate (keep it editable; it changes). PM Path’s **AI Cost Calculator** does all of this with example prices you can edit.

### What drives cost

1. **Model choice:** large models can cost 10–50x more per token than small ones.
2. **Input size:** long system prompts, big retrieved context, long conversation history re-sent every turn.
3. **Output size:** long answers; output tokens are usually pricier.
4. **Number of calls per task:** workflows and agents make several calls (classify, retrieve, draft, judge, retry).
5. **Usage intensity:** requests per user; power users can be 10–20x the median.
6. **Hidden extras:** evals in production (judge calls), guardrail checks, embeddings for new content, retries on errors.

### Distribution matters more than averages

Usage is usually **skewed**: a small share of users makes most requests. If the median user makes 10 requests a month but the top 5% make 400, your average hides a cost risk. Look at percentiles of requests per user and cost per user (p50, p90, p99). Design **limits** for the heavy tail.

### Unit economics: cost vs. value

Ask: **what is each user (or each request) worth?**
- If a free feature costs ₹15 per user per month and lifts retention enough to add ₹40 of margin per user, it pays off.
- If a subscription is ₹199/month and AI costs ₹120 for a heavy user, margins vanish for that segment.

Compare AI cost per user with:
- **Revenue per user** (ARPU) or **margin per user**.
- **Value created** (time saved, support tickets avoided, conversion lift).
- **Alternative cost** (e.g., a human agent handling the same task: if a support contact costs ₹40 and AI resolves it for ₹1, that’s strong value).

### Levers to reduce cost

- **Smaller models / routing / cascades** (Week 9).
- **Shorter prompts:** trim system prompts and examples; remove redundant instructions.
- **Less context:** retrieve fewer, better chunks; summarise long conversation history.
- **Shorter outputs:** set max tokens; ask for concise formats.
- **Prompt caching:** many providers discount repeated prompt prefixes (e.g., a long fixed system prompt).
- **Response caching:** reuse answers for identical or very similar common questions.
- **Batch processing** for non-urgent work, often at a discount.
- **Fewer calls per task:** merge steps, cap agent loops and retries.
- **Usage limits:** fair-use caps, rate limits per user, paid tiers for heavy use.
- **Precompute** (generate summaries once, not on every view).

### Cost monitoring

- Track **tokens and cost per request** in traces (Langfuse).
- Dashboards: total daily cost, cost per active user, cost by feature and model, p95 cost per conversation.
- **Alerts:** daily cost above a threshold; sudden jumps in tokens per request (often a bug, like history growing endlessly).
- **Budgets** per feature, reviewed monthly.

### Prices change

Model prices have dropped quickly over time, and new cheaper models appear often. Always label prices with the date and source, keep the calculator inputs editable, and re-check regularly.

## Worked example

**P4-style product:** an AI study helper for Class 12 students that explains questions in English or Hindi. Free plan; a ₹99/month plan for unlimited use.

**Assumptions (example prices, check current pricing):** model input $0.30/M tokens, output $2.50/M tokens; ₹85/$.
- System prompt 600 tokens; question + context 400 tokens; history (avg) 500 tokens → input 1,500 tokens.
- Output: 400 tokens (explanations are long; Hindi adds more).
- **Cost per request:** input 1,500 × 0.30/1M = $0.00045; output 400 × 2.50/1M = $0.001 → **$0.00145 ≈ ₹0.12**.

**Usage distribution:**
- Free users: median 15 requests/month → ₹1.8/user/month; p95 60 → ₹7.4.
- Paid users: median 120 → ₹14.8; p99 1,200 → ₹148 (more than the ₹99 price!).

**Decisions:**
- Free tier: cap at 30 explanations/month (keeps cost ≤ ₹3.7/user).
- Paid tier: “unlimited” becomes **fair use of 600/month**; beyond that, slower responses with a smaller model.
- Reduce cost: cache the 600-token system prompt (provider prompt caching), summarise history after 3 turns, route simple factual questions to a smaller model.
- **New cost per request:** ~₹0.07. Paid heavy user at 1,200 requests: ~₹84 (now below ₹99, with routing for overflow).

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 250" role="img" aria-labelledby="co-t co-d">
<title id="co-t">From tokens to cost per user</title>
<desc id="co-d">Input and output tokens multiplied by prices give cost per request; multiplied by requests per user gives cost per user; compared with value per user. A skewed distribution shows heavy users costing far more.</desc>
<defs><marker id="co-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<g font-size="11">
<rect x="15" y="20" width="130" height="60" rx="10" class="d-lavender d-ink" stroke-width="2"/><text x="27" y="44" class="d-text-dark" font-weight="700">Tokens × price</text><text x="27" y="62" class="d-text-dark">in + out (+ extras)</text>
<rect x="175" y="20" width="130" height="60" rx="10" class="d-sky d-ink" stroke-width="2"/><text x="187" y="44" class="d-text-dark" font-weight="700">Cost / request</text><text x="187" y="62" class="d-text-dark">≈ ₹0.12</text>
<rect x="335" y="20" width="130" height="60" rx="10" class="d-butter d-ink" stroke-width="2"/><text x="347" y="44" class="d-text-dark" font-weight="700">× requests/user</text><text x="347" y="62" class="d-text-dark">per month</text>
<rect x="495" y="20" width="130" height="60" rx="10" class="d-mint d-ink" stroke-width="2"/><text x="507" y="44" class="d-text-dark" font-weight="700">Cost / user</text><text x="507" y="62" class="d-text-dark">vs. value / user</text>
</g>
<g class="d-ink" stroke-width="2"><line x1="147" y1="50" x2="171" y2="50" marker-end="url(#co-a)"/><line x1="307" y1="50" x2="331" y2="50" marker-end="url(#co-a)"/><line x1="467" y1="50" x2="491" y2="50" marker-end="url(#co-a)"/></g>
<text x="20" y="118" class="d-text" font-weight="700" font-size="12">Requests per user (skewed)</text>
<g class="d-ink" stroke-width="1.5">
<rect x="30" y="200" width="40" height="30" class="d-sky"/><rect x="80" y="185" width="40" height="45" class="d-sky"/><rect x="130" y="175" width="40" height="55" class="d-sky"/><rect x="180" y="170" width="40" height="60" class="d-sky"/><rect x="230" y="160" width="40" height="70" class="d-sky"/><rect x="280" y="150" width="40" height="80" class="d-sky"/><rect x="330" y="132" width="40" height="98" class="d-butter"/><rect x="380" y="128" width="40" height="102" class="d-pink"/>
</g>
<line x1="20" y1="231" x2="440" y2="231" class="d-ink" stroke-width="2"/>
<text x="330" y="125" class="d-text" font-size="10">p95</text><text x="380" y="122" class="d-text" font-size="10">p99</text>
<rect x="460" y="130" width="165" height="100" rx="10" class="d-surface d-ink" stroke-width="2"/>
<text x="472" y="152" class="d-text" font-weight="700" font-size="11">Heavy tail = risk</text>
<text x="472" y="172" class="d-text" font-size="10">caps · fair use · paid tiers</text>
<text x="472" y="190" class="d-text" font-size="10">routing · caching</text>
<text x="472" y="208" class="d-text" font-size="10">shorter context</text>
</svg>
<figcaption>Average cost hides the heavy tail. Design for p95/p99 users, not just the median.</figcaption>
</figure>

## Step by step

Calculating P4 cost per user (deliverable):

1. **Measure real token usage** for 10–20 typical requests (from API usage metadata or Langfuse).
2. **List all calls per task** (main call, judge, embeddings, retries) and their tokens.
3. **Enter prices** (dated, sourced) and the exchange rate into the AI Cost Calculator.
4. **Estimate requests per user per month** from your usage data (median, p90, p99).
5. **Calculate cost per user** for each percentile and the total for your user base.
6. **Compare with value** (revenue, time saved, support avoided).
7. **Pick 2–3 levers** to reduce cost; recalculate.
8. **Set limits and alerts** for heavy users and cost spikes.
9. **Write the cost section** of your P4 case study with before/after numbers.

## Common mistakes

1. **Only counting the main model call**, ignoring judges, embeddings and retries.
2. **Using averages** and ignoring heavy users.
3. **Forgetting conversation history growth**, which makes later turns expensive.
4. **Unlimited plans** with no fair-use protection.
5. **Hard-coding prices** that quickly go out of date.
6. **Optimising cost without re-running evals**, silently hurting quality.

## How it shows up in interviews

> [!INTERVIEW]
> **“Our AI feature costs tripled last month. What do you do?”**
> Outline: decompose cost = users × requests/user × tokens/request × price (+ extra calls) → find which factor changed (usage spike? longer prompts? history bug? model switch? new feature calling more steps?) → segment by feature, user cohort, model → fix the cause → apply levers (routing, caching, context trimming, limits) → protect quality with evals → add cost alerts and budgets.

> [!INTERVIEW]
> **“Should we offer unlimited AI usage in our paid plan?”**
> Outline: model the usage distribution → heavy-user cost vs. price → fair-use limits, tiers or degraded mode beyond a threshold → communicate clearly → monitor margins per segment.

## Practice exercise

**Task (25 minutes, use the AI Cost Calculator):** A support assistant uses input 2,000 tokens and output 300 tokens per request, with a judge call (input 1,500, output 50) on 20% of requests. Example prices: main model input $0.40/M, output $1.60/M; judge model input $0.10/M, output $0.40/M; ₹85/$. Users make a median 4 and p95 25 requests/month; 200,000 users. Calculate cost per request, median and p95 cost per user, and the monthly total (assume the average is 6 requests/user). Then suggest 2 levers.

```answer Reveal a model answer
**Main call:** 2,000 × 0.40/1M = $0.0008; 300 × 1.60/1M = $0.00048 → $0.00128.
**Judge (20%):** (1,500 × 0.10 + 50 × 0.40)/1M = $0.00017 → × 0.2 = $0.000034.
**Cost per request ≈ $0.001314 ≈ ₹0.112.**

**Per user per month:** median 4 → ₹0.45; p95 25 → ₹2.8.
**Total:** 200,000 × 6 × ₹0.112 ≈ **₹1.34 lakh/month** (≈ $1,580).

**Levers:** (1) Trim the 2,000-token input: shorter system prompt + fewer retrieved chunks (e.g., to 1,200 tokens) cuts main input cost by 40%. (2) Cache answers for the top 50 common questions (if 30% of requests are repeats, cost falls ~30%). Re-run evals after each change.
```

## Quiz

```quiz
Q: What’s the formula for cost per user per month?
- [ ] Total users × price per token :: Missing requests and token counts.
- [x] Cost per request × requests per user per month :: Correct. Cost per request comes from tokens × prices plus extras.
- [ ] Revenue ÷ users :: That’s revenue per user.
- [ ] Output tokens only × price :: Ignores input tokens and other calls.

Q: Why look at p95/p99 usage, not just the average?
- [ ] Averages are always wrong :: They’re useful but incomplete.
- [x] Heavy users can cost many times the average and break your margins :: Correct. Design limits and tiers around the heavy tail.
- [ ] Percentiles are cheaper to compute :: Not the reason.
- [ ] Regulators require it :: Not generally.

Q: Later turns in a chat cost more than earlier ones. Why?
- [ ] Models charge more at night :: Unrelated: pricing doesn’t vary by time of day here.
- [x] The growing conversation history is re-sent as input tokens each turn :: Correct. Summarise or trim history.
- [ ] Output tokens get pricier over time :: Prices don’t change mid-chat.
- [ ] The model gets tired :: Not how models work.

Q: Which is a cost lever that doesn’t require changing the model?
- [ ] Switching to a larger model :: That’s a model change and usually increases cost.
- [x] Caching answers to common repeated questions :: Correct. Reuse saves calls entirely.
- [ ] Raising temperature :: Doesn’t reduce cost.
- [ ] Removing max token limits :: Usually increases cost.

Q: An AI feature costs ₹2 per user per month and reduces support contacts that cost ₹40 each by one per 10 users. Is it worth it?
- [ ] No, any cost is bad :: Cost must be compared with value.
- [x] Yes: it saves about ₹4 per user per month in support versus ₹2 cost :: Correct. One contact per 10 users = ₹4 saved per user.
- [ ] Impossible to tell :: The numbers given are enough for a first estimate.
- [ ] Only if it costs nothing :: Unrealistic standard.

Q: What should you do after a cost optimisation like switching to a smaller model?
- [ ] Nothing; cheaper is always fine :: Quality may drop.
- [x] Re-run your evals to make sure quality still meets the bar :: Correct. Savings that break quality aren’t savings.
- [ ] Remove monitoring :: You still need monitoring.
- [ ] Increase prices for users :: Not a necessary step.
```

## Key takeaways

- **Cost per request** = tokens × prices + extra calls; **cost per user** = cost per request × requests per user.
- Main drivers: **model, input size, output size, calls per task, usage intensity**.
- Plan for the **heavy tail** (p95/p99) with limits, fair use and tiers.
- Compare cost with **value per user**: revenue, retention, time saved, support avoided.
- Use **routing, trimming, caching, batching and limits**, then **re-run evals** and set **cost alerts**.
