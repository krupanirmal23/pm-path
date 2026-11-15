---
id: w9-choosing-model
title: "Choosing a model: quality, speed, cost"
week: 9
estimatedMinutes: 15
tags: [ai, llm, trade-offs]
---

## Why this matters for a PM

There are dozens of models, and new ones launch every few months. Picking the biggest, “smartest” model for everything is a classic mistake: it can make your feature slow and expensive without users noticing better answers. Picking the cheapest can make it unreliable. Model choice is a product decision about **quality, speed and cost**, and AI PMs are expected to make it with evidence.

## Core concepts

### The three-way trade-off

1. **Quality:** how well the model does *your* task: accuracy, following instructions, reasoning, language support, tone.
2. **Speed (latency):** time to first token and output speed. Users notice delays above a second or two in interactive features.
3. **Cost:** price per million input and output tokens, times your volume.

Generally, larger, more capable models are slower and more expensive; smaller models are faster and cheaper but weaker at complex reasoning. Providers usually offer **model families** with tiers (a large flagship, a mid-size, a small fast model), so you can choose per task.

### Other selection factors

- **Context window:** big enough for your inputs?
- **Language support:** quality in Hindi, Tamil, Bengali and code-mixed “Hinglish”, if your users need it.
- **Modalities:** text only, or images, audio, documents?
- **Structured output and tool use:** can it reliably return JSON or call functions (Week 10)?
- **Safety behaviour:** refusals, content filtering, how it handles risky requests.
- **Reliability and rate limits:** provider uptime, throughput limits at your scale.
- **Data privacy and compliance:** data retention, whether inputs are used for training, data residency (where data is processed), enterprise agreements.
- **Open vs. closed models:**
  - **Closed (proprietary) models** via API: usually the strongest quality, no infrastructure to manage, but you depend on the provider and send data to them.
  - **Open-weight models** (whose weights are published, e.g., Llama-family, Mistral-family, and others): you can host them yourself or via third-party hosts; more control over data and cost at scale, more engineering work; quality varies.
- **Vendor lock-in and portability:** can you switch providers if prices or quality change? Designing a thin abstraction layer helps.

### Benchmarks vs. your own evals

Public **benchmarks** (standard test sets for reasoning, coding, knowledge) and leaderboards are useful for shortlisting, but they rarely match your exact task. A model that tops a reasoning benchmark may be worse at your Hinglish customer support. The only reliable way to choose: **run your own evaluation** on 30–100 real examples of your task (Week 10).

### Matching model to task

| Task | Typical choice |
|---|---|
| Classify a support ticket into 10 categories | Small, fast model; low temperature |
| Extract fields from an invoice into JSON | Small/mid model with structured output |
| Summarise a long call transcript | Mid model with large context |
| Complex reasoning, multi-step planning, tricky edge cases | Large model |
| Real-time voice or chat with users | Fast model (latency matters most) |
| Batch overnight analysis of thousands of documents | Cheaper model or **batch** pricing (many providers discount non-urgent jobs) |

### Routing and cascades

You don’t have to use one model for everything:
- **Routing:** send easy requests to a small model and hard ones to a large model (decided by rules or a classifier).
- **Cascade:** try a small model first; if confidence is low or validation fails, escalate to a larger one.
- **Different models per step:** a small model to classify intent, a large model only for complex answers.

### Cost levers beyond model choice

- Shorter prompts and less retrieved context.
- **Prompt caching** (some providers discount repeated identical prompt prefixes).
- Limiting output length.
- **Batch processing** for non-urgent work.
- Caching answers to common questions.

### Prices change fast

Model prices often drop significantly over time and new models appear frequently. Re-evaluate every few months. Never hard-code assumptions about a provider being cheapest; keep your evaluation set ready to compare.

## Worked example

**Feature:** auto-categorising and summarising customer support tickets for Meesho sellers (Hindi, English and Hinglish), 300,000 tickets/month. Output: category (one of 12) + a 2-line summary for the agent.

**Evaluation (illustrative):** 100 real tickets labelled by experienced agents. Three candidates tested with the same prompt.

| Model tier | Category accuracy | Summary quality (1–5, human-rated) | p95 latency | Est. cost / month |
|---|---|---|---|---|
| Large flagship | 94% | 4.6 | 4.2 s | ₹3.2 lakh |
| Mid-size | 92% | 4.4 | 1.8 s | ₹80,000 |
| Small, fast | 85% | 3.6 | 0.7 s | ₹15,000 |

**Decision:**
- Agents read summaries in a queue; 2 s latency is fine. The mid-size model is 2 points less accurate than the flagship but 4x cheaper.
- Errors cluster in 2 categories (“payment settlement” vs. “return deduction”), with Hinglish phrasing. Adding 6 examples of those to the prompt raises the mid-size model to 94%.
- **Choice:** mid-size model with improved prompt. Add a **cascade**: if the model’s category isn’t in the allowed list or the summary fails validation, retry with the large model (~3% of tickets).
- **Re-evaluate quarterly** as prices and models change.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 260" role="img" aria-labelledby="cm-t cm-d">
<title id="cm-t">Quality, speed, cost triangle</title>
<desc id="cm-d">A triangle with quality, speed and cost at the corners. Small, mid and large models are placed inside, and a router sends easy requests to small models and hard ones to large models.</desc>
<polygon points="200,25 360,230 40,230" class="d-sky d-ink" stroke-width="2"/>
<text x="168" y="20" class="d-text" font-weight="700">Quality</text>
<text x="10" y="250" class="d-text" font-weight="700">Low cost</text>
<text x="330" y="250" class="d-text" font-weight="700">Speed</text>
<circle cx="200" cy="80" r="20" class="d-lavender d-ink" stroke-width="2"/><text x="186" y="85" class="d-text-dark" font-size="10" font-weight="700">L</text>
<circle cx="200" cy="155" r="20" class="d-butter d-ink" stroke-width="2"/><text x="186" y="160" class="d-text-dark" font-size="10" font-weight="700">M</text>
<circle cx="250" cy="205" r="20" class="d-mint d-ink" stroke-width="2"/><text x="238" y="210" class="d-text-dark" font-size="10" font-weight="700">S</text>
<defs><marker id="cm-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="430" y="105" width="90" height="50" rx="10" class="d-surface d-ink" stroke-width="2"/>
<text x="446" y="135" class="d-text" font-weight="700" font-size="12">Router</text>
<rect x="545" y="40" width="80" height="40" rx="8" class="d-lavender d-ink" stroke-width="2"/><text x="555" y="65" class="d-text-dark" font-size="11">Large · hard</text>
<rect x="545" y="180" width="80" height="40" rx="8" class="d-mint d-ink" stroke-width="2"/><text x="555" y="205" class="d-text-dark" font-size="11">Small · easy</text>
<line x1="522" y1="120" x2="542" y2="70" class="d-ink" stroke-width="2" marker-end="url(#cm-a)"/>
<line x1="522" y1="142" x2="542" y2="192" class="d-ink" stroke-width="2" marker-end="url(#cm-a)"/>
<text x="400" y="240" class="d-text" font-size="11">Route by difficulty to balance all three</text>
</svg>
<figcaption>Pick per task, measure on your own examples, and route when one size doesn’t fit all.</figcaption>
</figure>

## Step by step

Choosing a model for your P4 feature:

1. **Define the task** precisely (inputs, outputs, quality bar).
2. **Set constraints**: max latency (p95), budget per user per month, languages, privacy needs.
3. **Shortlist 3 models** across tiers (and providers), using docs and benchmarks for a first filter.
4. **Build a small eval set**: 30–50 real or realistic examples with expected outputs or a rubric.
5. **Run all candidates** with the same prompt; record quality, latency and token usage.
6. **Calculate cost** at your expected volume (AI Cost Calculator).
7. **Choose** the cheapest/fastest model that meets the quality bar; consider routing or cascades.
8. **Document** the decision and re-run the eval when models or prices change.

## Common mistakes

1. **Defaulting to the biggest model** for everything.
2. **Choosing from leaderboards** without testing your task.
3. **Ignoring latency** for interactive features.
4. **Forgetting language quality** for Indian users.
5. **Ignoring data and privacy terms** for sensitive data.
6. **Locking into one provider** with no way to switch.

## How it shows up in interviews

> [!INTERVIEW]
> **“How would you choose which LLM to use for a feature?”**
> Outline: define task and quality bar → constraints (latency, cost, language, privacy) → shortlist → evaluate on your own examples → compare quality/speed/cost → choose the smallest that meets the bar → routing/cascade → monitor and re-evaluate.

> [!INTERVIEW]
> **“Our AI costs tripled. What do you do?”** (a Week 14 AI PM case)
> Outline: break down cost drivers (traffic, tokens per request, model mix) → find the cause (longer prompts? new feature? usage spike? model change?) → levers: smaller model or routing, shorter prompts/context, caching, output limits, batch → protect quality with evals → set cost guardrails and alerts.

## Practice exercise

**Task (25 minutes):** For each P4-style feature, pick a model tier (small/mid/large) and explain the trade-off in 2–3 lines:
1. A Hinglish WhatsApp bot answering “what’s my order status?” from order data.
2. Generating a weekly personalised investment summary for 50,000 users, sent by email.
3. An AI tutor explaining complex SQL errors step by step.
4. Detecting whether a seller’s product title contains banned words.

```answer Reveal a model answer
1. **Small/mid, fast.** The answer comes from order data (grounded), so heavy reasoning isn’t needed; latency matters in chat; must handle Hinglish well, so test 2–3 models on real messages.
2. **Mid (or large) with batch pricing.** Not real-time, so use cheaper batch processing overnight; quality and accuracy matter (financial content), so verify numbers in code.
3. **Large (or strong mid).** Explaining varied errors needs reasoning; volume is likely modest; users wait a few seconds willingly. Consider routing simple syntax errors to a smaller model.
4. **Small model or no LLM at all.** A rules list or a simple classifier may be cheaper, faster and more reliable; use a small model only for fuzzy cases (misspellings, transliterations).
```

## Quiz

```quiz
Q: What’s the best way to choose between three models for your task?
- [ ] Pick the one at the top of a public leaderboard :: Leaderboards rarely match your exact task.
- [x] Run all three on your own set of real examples and compare quality, latency and cost :: Correct. Your own eval reflects your users, language and task.
- [ ] Pick the newest one :: Newer isn’t always better for your task.
- [ ] Pick the most expensive :: Price isn’t a proxy for fit.

Q: Which task usually suits a small, fast model?
- [ ] Complex multi-step legal reasoning :: Needs a stronger model.
- [x] Classifying tickets into a fixed set of categories :: Correct. Simple, well-defined tasks often work with small models.
- [ ] Writing a detailed strategy memo :: Needs stronger reasoning and writing.
- [ ] Debugging unfamiliar complex code :: Usually needs a larger model.

Q: What is a model cascade?
- [ ] Using one model forever :: The opposite of a cascade.
- [x] Trying a cheaper model first and escalating to a stronger one when needed :: Correct. Most requests stay cheap; hard ones get the stronger model.
- [ ] Training a model in stages :: That’s training, not serving.
- [ ] Sending requests to all models at once :: That’s an ensemble, a different pattern.

Q: Why might an open-weight model be attractive?
- [ ] It’s always the highest quality :: Quality varies; often closed models lead.
- [x] More control over data and hosting, and potentially lower cost at large scale :: Correct, at the price of more engineering work.
- [ ] It never needs evaluation :: Every model needs evaluation.
- [ ] It removes all safety concerns :: Safety still needs work.

Q: Your feature is a real-time chat. Model A is 3% more accurate but has 5-second p95 latency; Model B has 1.2 seconds. What should you consider?
- [ ] Always pick the more accurate one :: Latency strongly affects chat experience.
- [x] Whether the accuracy gap matters to users more than the delay, and whether prompt changes close the gap for Model B :: Correct. Weigh both, and try to get the best of each.
- [ ] Always pick the faster one :: Accuracy might matter more in high-stakes cases.
- [ ] Ignore latency in chat :: Users notice multi-second delays.

Q: Why re-run your model evaluation every few months?
- [ ] Because evals expire legally :: No legal requirement.
- [x] Models and prices change quickly; a better or cheaper option may now meet your quality bar :: Correct. A ready eval set makes switching decisions quick.
- [ ] To use up the budget :: Not a good reason.
- [ ] Because tokens change size every month :: Tokenizers don’t change monthly.
```

## Key takeaways

- Model choice balances **quality, speed and cost**; bigger isn’t automatically better.
- Also weigh **context size, language support, structured output, safety, reliability and data terms**.
- Use benchmarks to shortlist, but **decide with your own evals** on real examples.
- Use **routing and cascades** to give each request the cheapest model that’s good enough.
- **Re-evaluate regularly**; prices and models change fast.
