---
id: w11-tradeoffs
title: "Cost / latency / accuracy trade-offs"
week: 11
estimatedMinutes: 14
tags: [ai, trade-offs, decisions]
---

## Why this matters for a PM

Every AI design choice moves three dials at once: **accuracy** (quality), **latency** (speed) and **cost**. A bigger model raises accuracy but slows things down and costs more. An extra checking step improves safety but adds time and tokens. There’s no universally right setting; the right one depends on the user’s task and the stakes. Making these trade-offs explicit, with numbers, is a core AI PM skill and a favourite interview topic.

## Core concepts

### The three dials

- **Accuracy/quality:** eval pass rate, faithfulness, task success, safety.
- **Latency:** TTFT and total time at p95.
- **Cost:** cost per request and per user.

Most levers improve one dial at the expense of another:

| Lever | Accuracy | Latency | Cost |
|---|---|---|---|
| Larger model | ↑ | ↓ (slower) | ↓ (pricier) |
| More retrieved context | ↑ (often) | ↓ | ↓ |
| Extra judge / guardrail step | ↑ (safety) | ↓ | ↓ |
| Reasoning/“thinking” mode | ↑ (hard tasks) | ↓↓ | ↓↓ |
| Smaller model | ↓ | ↑ | ↑ |
| Caching answers | ≈ (stale risk) | ↑↑ | ↑↑ |
| Routing/cascades | ≈ | ↑ (most requests) | ↑ |
| Shorter outputs | ≈ / ↓ (detail) | ↑ | ↑ |

(↑ = better on that dial, ↓ = worse.)

### Decide by the job, not by the technology

Questions that settle most trade-offs:
1. **What does a wrong answer cost the user and the business?** High stakes → prioritise accuracy (and human review), accept latency and cost.
2. **Is the user waiting?** Interactive → prioritise latency (streaming, faster models). Background → spend time on accuracy.
3. **How often is it used, and what’s each use worth?** High-volume, low-value → prioritise cost.
4. **Where does quality plateau?** Often a mid-size model gets 95% of the large model’s quality at a fraction of the cost.

### Make trade-offs measurable: the comparison table

For each candidate configuration, measure on the same eval set:

| Config | Eval pass | p95 latency | Cost / 1k requests |
|---|---|---|---|
| A: large model, 8 chunks | 91% | 6.2 s | ₹420 |
| B: mid model, 5 chunks | 88% | 2.4 s | ₹95 |
| C: mid + re-ranker | 90% | 2.9 s | ₹110 |
| D: small + cascade to large (15%) | 87% | 1.6 s (most) | ₹70 |

Then pick against explicit thresholds: “Pass rate ≥ 88%, p95 ≤ 3 s, cost ≤ ₹150/1k” → **C** wins.

### Thresholds and the “good enough” bar

Set **minimum acceptable** accuracy (from user research and stakes), **maximum** latency and cost. Choose the cheapest/fastest option that meets the accuracy bar. Improvements above the bar matter only if users notice them or they reduce risk.

### Segment the trade-off

Different users or requests can get different settings:
- Premium users or high-value requests → stronger model.
- Simple intents (order status) → small model or no LLM.
- Risky topics (refunds, account changes) → extra checks and human approval.

### Revisit regularly

New models shift the frontier: next quarter’s mid-size model may match today’s large model. Keep your eval set and comparison table, and re-run when options change.

### Communicating trade-offs

Present options with numbers, a recommendation and what you’re giving up: “Option C costs 15% more than B but cuts wrong policy answers by a third. Given refunds are our top complaint, I recommend C.” Avoid “AI magic” language; leaders respond to explicit trade-offs.

## Worked example

**Feature:** AI explanation of loan offers in a fintech app (stakes: users may make financial decisions).

**Candidate configs (measured on 80-example eval set with a validated faithfulness judge):**

| Config | Faithfulness | Helpfulness | p95 total | Cost / user / month |
|---|---|---|---|---|
| A: small model | 84% | 3.6/5 | 1.8 s | ₹0.40 |
| B: mid model | 92% | 4.2/5 | 3.0 s | ₹1.20 |
| C: mid + faithfulness judge (block & regenerate) | 98% | 4.2/5 | 4.4 s | ₹1.70 |
| D: large model + judge | 99% | 4.5/5 | 8.5 s | ₹6.10 |

**Thresholds (set with compliance and research):** faithfulness ≥ 97% (wrong loan terms are unacceptable), p95 ≤ 5 s (users read the explanation while deciding), cost ≤ ₹3/user/month.

**Decision:** **C**. It meets the faithfulness bar; D is marginally better but too slow and 3.6x the cost. Mitigate C’s latency with streaming the summary while the judge checks the detailed section, and show the loan terms table (from data, not AI) immediately.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 260" role="img" aria-labelledby="tt-t tt-d">
<title id="tt-t">Choosing a configuration against thresholds</title>
<desc id="tt-d">A scatter chart of configurations by cost on the x axis and accuracy on the y axis; a horizontal line marks the accuracy bar and a vertical line the cost cap; the chosen configuration sits in the acceptable zone at the lowest cost.</desc>
<line x1="70" y1="220" x2="610" y2="220" class="d-ink" stroke-width="2"/>
<line x1="70" y1="220" x2="70" y2="20" class="d-ink" stroke-width="2"/>
<text x="290" y="248" class="d-text" font-size="12">Cost per user →</text>
<text x="25" y="150" class="d-text" font-size="12" transform="rotate(-90 25 150)">Accuracy →</text>
<rect x="72" y="22" width="368" height="78" class="d-mint" opacity="0.6"/>
<line x1="70" y1="100" x2="610" y2="100" class="d-ink" stroke-width="2" stroke-dasharray="6 4"/>
<text x="470" y="95" class="d-text" font-size="11">accuracy bar (97%)</text>
<line x1="440" y1="20" x2="440" y2="220" class="d-ink" stroke-width="2" stroke-dasharray="6 4"/>
<text x="446" y="210" class="d-text" font-size="11">cost cap</text>
<circle cx="110" cy="180" r="12" class="d-surface d-ink" stroke-width="2"/><text x="104" y="185" class="d-text" font-size="11" font-weight="700">A</text>
<circle cx="190" cy="125" r="12" class="d-surface d-ink" stroke-width="2"/><text x="184" y="130" class="d-text" font-size="11" font-weight="700">B</text>
<circle cx="240" cy="62" r="14" class="d-butter d-ink" stroke-width="3"/><text x="234" y="67" class="d-text-dark" font-size="11" font-weight="700">C</text>
<circle cx="560" cy="45" r="12" class="d-surface d-ink" stroke-width="2"/><text x="554" y="50" class="d-text" font-size="11" font-weight="700">D</text>
<text x="262" y="56" class="d-text" font-size="11" font-weight="700">chosen: meets bar, cheapest</text>
<text x="80" y="38" class="d-text-dark" font-size="11">acceptable zone (also check latency)</text>
</svg>
<figcaption>Set the bars first, then pick the cheapest, fastest option that clears them.</figcaption>
</figure>

## Step by step

Making the P4 trade-off decision:

1. **Set thresholds** for accuracy (from stakes), latency (from interaction type) and cost (from unit economics).
2. **List 3–4 candidate configurations** (model, context size, checks, routing).
3. **Run each on the same eval set**; record accuracy, p95 latency and cost.
4. **Build the comparison table.**
5. **Eliminate options** that miss any threshold.
6. **Choose the cheapest/fastest** remaining option; consider segment-specific settings.
7. **Write the recommendation** with what you give up and how you’ll mitigate it.
8. **Schedule a re-evaluation** when new models or prices appear.

## Common mistakes

1. **Optimising one dial only** (e.g., “best model always”).
2. **No explicit thresholds**, so debates never end.
3. **Comparing configs on different test sets.**
4. **Ignoring segmentation**: one setting for every request.
5. **Chasing accuracy improvements users won’t notice.**
6. **Presenting trade-offs without numbers.**

## How it shows up in interviews

> [!INTERVIEW]
> **“How do you decide between a more accurate but slower model and a faster one?”**
> Outline: stakes of errors → whether users wait → usage volume and value → set thresholds → measure both on the same evals → choose the cheapest/fastest meeting the bar → mitigate with UX (streaming) and routing → revisit.

> [!INTERVIEW]
> **“Leadership wants the best AI model everywhere. What’s your view?”**
> Outline: explain the three dials with an example table → show where quality plateaus → propose routing and thresholds → quantify savings and latency gains → keep the best model for high-stakes or complex cases.

## Practice exercise

**Task (20 minutes):** For an **AI-generated weekly spending summary** in a payments app (sent by notification on Sunday morning), set thresholds and choose between: A) large model, 97% accuracy, 12 s, ₹2.4/user/month; B) mid model, 95%, 4 s, ₹0.6; C) small model + code-calculated numbers, 94%, 1 s, ₹0.15. Explain your choice.

```answer Reveal a model answer
**Context:** generated in the background on Saturday night and delivered Sunday; nobody waits → latency barely matters. Numbers must be exact, but those can be computed in code; the LLM only writes friendly text around them. Volume is high (every user weekly), value per summary is modest → cost matters.

**Thresholds:** accuracy ≥ 94% on wording/insight quality with **all numbers computed in code** (100% numeric correctness by design); cost ≤ ₹0.50/user/month; latency ≤ a few minutes per batch (irrelevant to users).

**Choice:** **C** (small model + code-calculated numbers). It meets the quality bar, numeric accuracy is guaranteed by code, and it’s 4x cheaper than B. Use batch processing for further discounts. Re-evaluate B if users rate insight quality poorly.
```

## Quiz

```quiz
Q: Adding an LLM judge step to block unsafe answers usually affects the dials how?
- [ ] Improves all three :: It adds time and cost.
- [x] Improves safety/accuracy but increases latency and cost :: Correct. Every extra call adds time and tokens.
- [ ] Reduces cost :: It adds an extra model call.
- [ ] Has no effect :: It changes all three dials.

Q: What’s the best way to choose between configurations?
- [ ] Pick the one engineers like :: Preference isn’t evidence.
- [x] Set thresholds, measure all options on the same eval set, and pick the cheapest/fastest that clears the bars :: Correct. Explicit bars end endless debate.
- [ ] Always pick the most accurate :: Ignores latency and cost.
- [ ] Always pick the cheapest :: Ignores quality.

Q: For a background task users don’t wait for, which dial matters least?
- [ ] Accuracy :: Still matters.
- [ ] Cost :: Often matters a lot at scale.
- [x] Latency :: Correct. Users aren’t waiting, so you can spend time on quality.
- [ ] Safety :: Always matters.

Q: What does segmenting the trade-off mean?
- [ ] Using one setting for everyone :: The opposite.
- [x] Using different models or checks for different request types or users :: Correct. E.g., small model for simple intents, extra checks for risky topics.
- [ ] Splitting the eval set randomly :: Not the meaning.
- [ ] Asking users to choose the model :: Occasionally offered, but not the core idea.

Q: A large model scores 92% and a mid model 91% on your evals; the large one is 4x the cost and 2x slower. What’s sensible?
- [ ] Choose the large model; 1 point matters most :: One point may be noise and users may not notice.
- [x] Prefer the mid model unless the 1-point gap is in high-stakes failures; check category-level results :: Correct. Look at where the difference lies before paying for it.
- [ ] Choose neither :: Both may be acceptable.
- [ ] Average them :: Not a decision.
```

## Key takeaways

- AI choices move **accuracy, latency and cost** together; most levers trade one for another.
- Let the **job decide**: stakes, whether users wait, volume and value per use.
- **Set thresholds**, measure options on the **same eval set**, choose the **cheapest/fastest that clears the bar**.
- **Segment** settings by request type and risk.
- Present trade-offs with **numbers and a recommendation**, and revisit as models change.
