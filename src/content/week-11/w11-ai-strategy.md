---
id: w11-ai-strategy
title: AI product strategy
week: 11
estimatedMinutes: 17
tags: [ai, strategy, business]
---

## Why this matters for a PM

When every company can call the same powerful models through an API, “we use AI” isn’t a strategy. AI PMs must answer harder questions: where does value actually sit? what makes our AI product hard to copy? should we build or buy? how do we price features whose costs scale with usage? These questions come up in strategy interviews and in every serious AI roadmap discussion.

## Core concepts

### The AI value chain: where value sits

Think of AI products as layers:
1. **Compute / infrastructure:** chips, data centres, cloud.
2. **Foundation models:** the large models (built by a few well-funded labs).
3. **Model access and tooling:** APIs, hosting, vector databases, eval and observability tools.
4. **Applications:** products that solve a specific user problem using models (your layer as most PMs).

Value at the application layer comes from **solving a real problem better than alternatives**, not from the model itself, because competitors can usually access similar models.

### Moats in AI products

A **moat** is a lasting advantage. For AI applications, the strongest moats usually aren’t the model:

1. **Proprietary data:** data others can’t get: your users’ interactions, domain-specific datasets, labelled examples, outcomes (which suggestions were accepted). It improves retrieval, evals and possibly fine-tuning.
2. **Workflow integration:** being embedded in how users already work (inside the app they use daily, connected to their systems). Switching becomes painful.
3. **Distribution:** existing users and channels. A large consumer app adding AI reaches millions instantly; a startup must earn each user.
4. **Data flywheel:** more usage → more feedback and labels → better quality → more usage (Week 10 HITL).
5. **Trust and brand:** especially in money, health and education; users stay with AI they trust.
6. **Domain expertise and evals:** deep understanding of what “good” means in your domain, encoded in eval sets and guardrails; hard to copy quickly.
7. **Network effects:** where users benefit from other users (marketplaces, shared knowledge).

Weak moats: “we have a clever prompt”, “we use the newest model”, “we were first”. These are copied in weeks.

### Build vs. buy (and partner)

Decisions appear at many levels:

| Decision | Buy / use existing | Build |
|---|---|---|
| Foundation model | Use APIs (almost always for most companies) | Only for very large firms with unique needs |
| Fine-tuned model | Prompting + RAG first | When evals show a clear gain, enough data, and cost/latency benefits |
| RAG / vector search | Managed services | When scale, privacy or cost demands it |
| Evals, tracing | Tools (Langfuse, Promptfoo) | Custom when needs are unusual |
| End-user AI feature | Third-party plugin/widget | When it’s core to your differentiation |

Questions to decide:
- **Is it core to our differentiation?** Build what makes you different; buy commodity parts.
- **Do we have the talent and data?**
- **Time to market** vs. long-term cost.
- **Control, privacy and compliance needs** (data residency, regulated data).
- **Vendor risk:** lock-in, price changes, provider outages, model deprecations. Keep an abstraction layer so you can switch models.

### Pricing AI features

AI introduces **variable cost per use**, unlike most software. Pricing options:
1. **Included in existing plans** (bundled): AI as a retention or differentiation feature. Works if cost per user is low relative to plan price.
2. **Premium tier / add-on:** AI features in a higher plan (common in B2B SaaS).
3. **Usage-based:** pay per use, credits or tokens (aligns price with cost; can create anxiety for users).
4. **Hybrid:** a monthly allowance included, extra usage paid.
5. **Outcome-based:** charge per successful outcome (e.g., per resolved support ticket). Aligns with value but needs reliable measurement.

Pricing principles:
- **Price on value**, not cost, but make sure **margin holds for heavy users** (cost per user lesson).
- **Protect against abuse** with fair-use limits.
- **Test willingness to pay** (Week 2 discovery techniques, fake doors, pricing experiments).
- **Indian market realities:** high price sensitivity in consumer apps; freemium with limits is common; B2B buyers compare against the cost of human effort.

### AI strategy questions for a product

- **Where does AI create the most value** in our users’ journeys? (Not “where can we add AI?”)
- **Which problems become newly solvable** because AI handles messy inputs or language?
- **What’s our unfair advantage** (data, distribution, workflow, trust)?
- **What happens when models get 10x cheaper and better?** (They tend to.) Does our product get better, or does the model provider make us redundant? Strategies that benefit from better models are more durable.
- **What’s the risk if a big platform adds this feature for free?**

### Thin wrappers vs. deep products

A **thin wrapper** is a product that mostly passes user input to a model with a prompt and shows the output. Easy to build; easy to copy; vulnerable when the model provider adds the same feature. **Deep products** combine AI with proprietary data, workflow integration, domain evals, guardrails and UX, delivering a complete outcome.

## Worked example

**Company:** a Bengaluru B2B SaaS startup selling customer support software to Indian D2C brands, considering an AI agent that resolves customer queries.

**Strategy analysis:**
- **Value:** support teams handle many repetitive queries (order status, returns) in English, Hindi and Hinglish on WhatsApp. AI that resolves 40–60% of these cuts costs and response time.
- **Moat:**
  - Workflow integration: already connected to brands’ order systems, WhatsApp and help desks → AI can take real actions (check order, start return).
  - Proprietary data: years of resolved tickets (with consent and anonymisation) → better evals and retrieval for Indian D2C contexts.
  - Distribution: 600 existing brand customers.
- **Build vs. buy:** buy foundation models via APIs (with a routing layer across two providers); build the integration, Indic-language evals, guardrails and analytics in-house (core differentiation); buy tracing tools.
- **Risk:** big platforms adding generic AI support bots. Defence: deep integrations, India-specific language quality, outcome guarantees.
- **Pricing:** hybrid: plans include 1,000 AI resolutions/month; extra at ₹6 per resolved conversation (outcome-based), compared with ~₹30–50 for a human-handled ticket. Margin check: AI cost per resolution ~₹1.2 at current prices.
- **Metrics:** resolution rate without human, CSAT for AI-resolved conversations, cost per resolution, net revenue retention of customers using AI.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 260" role="img" aria-labelledby="as-t as-d">
<title id="as-t">AI value chain and moats</title>
<desc id="as-d">A stack of four layers: compute, foundation models, tooling and applications. Beside the application layer, moats are listed: proprietary data, workflow integration, distribution, data flywheel, trust and domain evals.</desc>
<g class="d-ink" stroke-width="2">
<rect x="20" y="190" width="300" height="44" rx="8" class="d-surface"/>
<rect x="20" y="140" width="300" height="44" rx="8" class="d-lavender"/>
<rect x="20" y="90" width="300" height="44" rx="8" class="d-sky"/>
<rect x="20" y="40" width="300" height="44" rx="8" class="d-mint"/>
</g>
<text x="36" y="217" class="d-text" font-size="12" font-weight="700">Compute / infrastructure</text>
<text x="36" y="167" class="d-text-dark" font-size="12" font-weight="700">Foundation models (few labs)</text>
<text x="36" y="117" class="d-text-dark" font-size="12" font-weight="700">Access + tooling (APIs, RAG, evals)</text>
<text x="36" y="67" class="d-text-dark" font-size="12" font-weight="700">Applications ← most PMs work here</text>
<rect x="350" y="20" width="270" height="214" rx="12" class="d-butter d-ink" stroke-width="2"/>
<text x="366" y="46" class="d-text-dark" font-weight="700">Durable moats for applications</text>
<g class="d-text-dark" font-size="11">
<text x="366" y="72">• Proprietary data + outcomes</text>
<text x="366" y="94">• Workflow integration (switching cost)</text>
<text x="366" y="116">• Distribution (existing users)</text>
<text x="366" y="138">• Data flywheel from feedback</text>
<text x="366" y="160">• Trust in high-stakes domains</text>
<text x="366" y="182">• Domain evals + guardrails</text>
<text x="366" y="214" font-weight="700">Weak: clever prompts, “newest model”</text>
</g>
</svg>
<figcaption>Everyone can rent the same models. Durable advantage comes from data, workflow, distribution and trust.</figcaption>
</figure>

## Step by step

Writing the strategy section of your P4 case study:

1. **State the user value** in one sentence (problem, outcome, metric).
2. **Explain why AI** (vs. a form or rule), from Week 9.
3. **Identify your potential moats** (even small ones: your user community, your domain eval set, integration into a WhatsApp group).
4. **Make build vs. buy choices** explicit (model via API, tools, what you built yourself).
5. **Model cost per user** and a plausible **pricing** approach.
6. **Name the risks**: platform copying, model price changes, provider dependence; and your responses.
7. **Ask the “10x better models” question**: how does P4 benefit?
8. **Write 3 strategic next steps** if P4 were a real company.

## Common mistakes

1. **“We use AI” as the strategy.**
2. **Building a thin wrapper** with no data, workflow or trust advantage.
3. **Training your own foundation model** without a compelling reason.
4. **Pricing without modelling heavy-user costs.**
5. **Single-provider lock-in** with no fallback.
6. **Ignoring what big platforms will ship next.**

## How it shows up in interviews

> [!INTERVIEW]
> **“What’s Swiggy’s or Zomato’s AI strategy, or what should it be?”**
> Outline: where AI creates user value (discovery, support, restaurant tools, logistics) → existing moats (distribution, transaction data, restaurant network) → build vs. buy (APIs for LLMs; build data and integrations) → pricing/business model impact (higher conversion, lower support cost, merchant tools as paid add-ons) → risks → metrics.

> [!INTERVIEW]
> **“How would you price an AI feature in our B2B product?”**
> Outline: value delivered (time/cost saved) → cost per use and heavy-user distribution → options (bundle, tier, usage, hybrid, outcome-based) → test willingness to pay → fair-use limits → monitor margins.

## Practice exercise

**Task (35 minutes):** Write a one-page AI strategy for **an AI feature in Zerodha Kite** of your choice. Include: user value, why AI, moats, build vs. buy, pricing (or monetisation), risks, and 3 metrics.

```answer Reveal a model answer (feature: “Explain my portfolio” assistant)
- **User value:** helps investors understand their portfolio’s risk, concentration and costs in plain language, reducing panic decisions and support queries.
- **Why AI:** questions are varied and personal (“why did my portfolio fall more than Nifty?”); explanations must combine the user’s holdings with market context in natural language, in English or Hindi.
- **Moats:** distribution (millions of active investors); trusted brand known for education; proprietary data on holdings and behaviour (used with consent); deep domain content (educational material) for grounding; strict compliance know-how.
- **Build vs. buy:** foundation models via API with a routing layer; build the grounding layer (portfolio data, calculations in code), compliance guardrails (no buy/sell recommendations), Indic-language evals, and the UI in-house.
- **Monetisation:** free for all as a retention and support-deflection feature; cost per active user is low if calculations are done in code and answers are short; cap heavy use.
- **Risks:** regulatory (must not cross into investment advice); hallucinated numbers (compute in code, cite sources); over-reliance by users; provider changes (keep a fallback model).
- **Metrics:** % of investors still active after a market dip (vs. control); support tickets about portfolio questions; faithfulness and compliance pass rates on evals; 👍 rate.
```

## Quiz

```quiz
Q: For most AI applications, where does durable advantage usually come from?
- [ ] Using the newest model :: Competitors can use the same model quickly.
- [x] Proprietary data, workflow integration, distribution and trust :: Correct. These are hard to copy.
- [ ] A clever system prompt :: Prompts are easy to replicate.
- [ ] Being first to launch :: First-mover advantage fades quickly without a moat.

Q: What is a “thin wrapper” AI product?
- [ ] A product with a small app size :: Unrelated: “thin” refers to how little value is added on top of the model.
- [x] A product that mostly passes input to a model with a prompt, adding little else :: Correct. Easy to copy and vulnerable.
- [ ] A product built on open-source models :: Model choice doesn’t define a wrapper.
- [ ] A product with strong integrations :: That’s the opposite.

Q: When does building (rather than buying) a component make the most sense?
- [ ] Always; building gives control :: Building everything is slow and costly.
- [x] When it’s core to your differentiation and you have the talent and data :: Correct. Buy commodity parts.
- [ ] Never; always buy :: Core differentiators are often worth building.
- [ ] When the vendor has a nice logo :: Not a criterion.

Q: Why is pricing AI features different from typical software features?
- [ ] AI features can’t be priced :: They can; the twist is their variable cost per use.
- [x] Each use has a variable cost, so heavy users can erode margins :: Correct. Model cost distributions and set limits.
- [ ] Users won’t pay for AI :: Some will, if it delivers value.
- [ ] AI is always free to run :: It costs money per token.

Q: What’s a durable strategy when models keep getting better and cheaper?
- [ ] Compete on having a slightly better model than the provider :: Hard to sustain.
- [x] Build products that improve as models improve, anchored in your data, workflows and trust :: Correct. Better models then lift your product instead of replacing it.
- [ ] Stop investing in AI :: Misses the opportunity.
- [ ] Lock into one provider forever :: Increases risk.

Q: Which pricing model aligns most directly with customer value?
- [ ] A fixed price regardless of use :: Simple, but may not match value.
- [x] Outcome-based pricing, like charging per resolved ticket :: Correct, if outcomes can be measured reliably.
- [ ] Charging per login :: Weakly linked to value.
- [ ] Charging per token shown on screen :: Aligns with cost, not value.
```

## Key takeaways

- Most PMs work at the **application layer**; value comes from **solving real problems**, not owning models.
- Durable **moats**: **proprietary data, workflow integration, distribution, data flywheels, trust, domain evals**.
- **Build** what differentiates you; **buy** commodity parts; keep the ability to **switch models**.
- **Price** on value, but model **heavy-user costs** and use limits; consider **hybrid or outcome-based** pricing.
- Favour strategies that **get better as models improve**; avoid **thin wrappers**.
