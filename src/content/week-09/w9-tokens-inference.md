---
id: w9-tokens-inference
title: "Tokens, context windows, training vs. inference"
week: 9
estimatedMinutes: 16
tags: [ai, llm, fundamentals]
---

## Why this matters for a PM

Every AI product decision, from cost to speed to quality, traces back to a few basic ideas: **tokens**, **context windows**, and the difference between **training** a model and **using** it (inference). AI PMs who understand these can estimate costs, explain limitations, and talk credibly with ML engineers. They’re also the foundation for everything in Weeks 9–11.

## Core concepts

### What a large language model is

A **large language model (LLM)** is an AI model trained on huge amounts of text to predict what text should come next. Given some input text, it generates output text, one small piece at a time. Examples: Anthropic’s Claude, OpenAI’s GPT models, Google’s Gemini, Meta’s Llama, and many open models.

“Large” refers to the number of **parameters**: the internal numbers (often billions) the model adjusts during training. You don’t need to understand the maths; think of parameters as the model’s learned “knowledge and patterns”, compressed into numbers.

### Tokens

LLMs don’t read words or letters directly. They read **tokens**: chunks of text the model’s **tokenizer** splits text into. A token might be a whole common word (“the”), part of a word (“Bengal” + “uru”), a number chunk, or punctuation.

Rough rules of thumb for English:
- **1 token ≈ 4 characters ≈ ¾ of a word.**
- **100 tokens ≈ 75 words.**
- **1,000 words ≈ 1,300–1,500 tokens.**

Indian languages and code often use **more tokens per word** than English, because tokenizers are usually trained mostly on English. A Hindi sentence can take 2–4 times as many tokens as its English translation, depending on the model. This matters for cost and context limits in Indian products.

**Why PMs care about tokens:**
- **Cost:** AI APIs charge per token, separately for **input tokens** (what you send) and **output tokens** (what the model generates). Output tokens usually cost more.
- **Speed:** generating each output token takes time; longer answers are slower.
- **Limits:** every model has a maximum number of tokens it can handle at once (the context window).

### Context window

The **context window** is the maximum number of tokens a model can consider in one request, including your instructions, any documents, the conversation history, and its own answer. Modern models range from tens of thousands to over a million tokens.

Think of it as the model’s **working memory for one request**. Anything outside the window is invisible to the model. Implications:
- **Long conversations:** older messages may need to be dropped or summarised to fit.
- **Large documents:** a 500-page manual may not fit; you’ll need to retrieve only relevant parts (RAG, Week 10).
- **Cost:** sending a huge context with every request is expensive, even if the window allows it.
- **Quality:** models can pay less attention to information buried in the middle of very long contexts. More context isn’t automatically better.

### The model has no memory between requests

By default, an LLM API is **stateless**: each request is independent. A chatbot seems to “remember” because the app sends the conversation history back with every new message. Product “memory” features store information and re-insert relevant pieces into the context.

### Training vs. inference

**Training** is how a model learns. It happens before you use it:
1. **Pre-training:** the model reads an enormous amount of text and learns to predict the next token. This takes huge computing resources (weeks to months on thousands of specialised chips) and costs tens to hundreds of millions of dollars for frontier models. Result: a model with broad knowledge and language ability.
2. **Post-training (fine-tuning and alignment):** the model is further trained to follow instructions, be helpful, refuse harmful requests, and behave well, using curated examples and human feedback. Techniques include supervised fine-tuning and reinforcement learning from human feedback (RLHF).

**Inference** is *using* the trained model: sending input and getting output. Every time a user asks your AI feature something, that’s an inference request. Inference costs money per token and takes time.

Key implications:
- **Training data has a cut-off date.** The model doesn’t know about events after its **knowledge cutoff** unless you provide that information in the context (e.g., via search or RAG).
- **The model doesn’t learn from your users’ conversations in real time.** Using a model doesn’t change its weights. (Providers may, under their policies, use some data for future training; enterprise APIs typically don’t by default. Check terms.)
- **Most product teams never train a foundation model.** They use existing models via APIs and customise behaviour with **prompts**, **retrieval** (RAG), and sometimes **fine-tuning** (training an existing model further on their own examples).

### How generation works (simplified)

At each step, the model calculates probabilities for every possible next token and picks one. Then it adds that token to the text and repeats. Settings that affect this:
- **Temperature:** controls randomness. Low (e.g., 0–0.3) = more predictable, consistent answers (good for extraction, classification). Higher (e.g., 0.7–1.0) = more varied, creative output (good for brainstorming).
- **Max output tokens:** a cap on answer length (controls cost and time).

### Latency basics

Two numbers matter for user experience:
- **Time to first token (TTFT):** how long until the first words appear.
- **Output speed (tokens per second):** how fast the rest arrives.

**Streaming** shows tokens as they’re generated, so users see progress immediately even if the full answer takes 10 seconds (Week 9 AI UX lesson).

## Worked example

**Feature:** an AI assistant inside a Groww-like app that explains a mutual fund in simple language.

**Per request (estimate):**
- System instructions: ~400 tokens.
- Fund factsheet data inserted into context: ~1,200 tokens.
- User question: ~30 tokens.
- Conversation history (avg.): ~400 tokens.
- **Input total ≈ 2,030 tokens.** Output answer: ~250 tokens.

**Cost (using example prices, not real ones):** suppose input costs $0.50 per million tokens and output $1.50 per million.
- Input: 2,030 × 0.50 / 1,000,000 = $0.001015
- Output: 250 × 1.50 / 1,000,000 = $0.000375
- **Per request ≈ $0.0014** (about ₹0.12 at ₹85/$).
- If 200,000 users ask 3 questions a month: 600,000 requests × $0.0014 ≈ **$840 / month** (≈ ₹71,000).

**Implications:**
- The factsheet is the biggest cost driver → send only relevant sections.
- Hindi answers may use 2–3x more output tokens → budget for that.
- The model’s knowledge cutoff means it doesn’t know today’s NAV (net asset value) → always provide current data in the context.

You can run these numbers in the **AI Cost Calculator** in the Toolkit.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 250" role="img" aria-labelledby="tk-t tk-d">
<title id="tk-t">Context window and tokens</title>
<desc id="tk-d">A long bar representing the context window filled with system prompt, retrieved documents, conversation history, user question and model answer. Tokens and price labels are shown.</desc>
<rect x="20" y="40" width="600" height="60" rx="10" class="d-surface d-ink" stroke-width="2"/>
<rect x="22" y="42" width="90" height="56" class="d-lavender"/>
<rect x="112" y="42" width="230" height="56" class="d-sky"/>
<rect x="342" y="42" width="90" height="56" class="d-butter"/>
<rect x="432" y="42" width="30" height="56" class="d-peach"/>
<rect x="462" y="42" width="70" height="56" class="d-mint"/>
<text x="28" y="74" class="d-text-dark" font-size="11">System</text>
<text x="160" y="74" class="d-text-dark" font-size="11">Retrieved documents</text>
<text x="350" y="74" class="d-text-dark" font-size="11">History</text>
<text x="434" y="74" class="d-text-dark" font-size="10">Q</text>
<text x="470" y="74" class="d-text-dark" font-size="11">Answer</text>
<text x="545" y="74" class="d-text" font-size="11">free space</text>
<text x="20" y="28" class="d-text" font-size="12" font-weight="700">Context window (max tokens per request)</text>
<line x1="22" y1="115" x2="460" y2="115" class="d-ink" stroke-width="2"/>
<text x="180" y="132" class="d-text" font-size="11">input tokens (billed)</text>
<line x1="462" y1="115" x2="532" y2="115" class="d-ink" stroke-width="3"/>
<text x="452" y="132" class="d-text" font-size="11">output tokens (billed, pricier)</text>
<rect x="20" y="160" width="600" height="70" rx="10" class="d-butter d-ink" stroke-width="2"/>
<text x="36" y="186" class="d-text-dark" font-size="12" font-weight="700">“Bengaluru” → “Beng” + “aluru” (example split)</text>
<text x="36" y="208" class="d-text-dark" font-size="11">~4 characters per token in English; Indian languages often need more tokens per word.</text>
</svg>
<figcaption>Everything the model sees and writes in one request must fit in the context window, and every token costs money and time.</figcaption>
</figure>

## Step by step

Estimating tokens and cost for an AI feature:

1. **List what goes into each request**: system prompt, retrieved data, history, user input.
2. **Estimate tokens** for each (words × 1.3 for English; more for Indian languages; test with a tokenizer tool if available).
3. **Estimate output length** in tokens.
4. **Multiply by prices** per million tokens (input and output separately).
5. **Multiply by requests per user per month** and **number of users**.
6. **Check against the context window**: does the largest realistic request fit with room to spare?
7. **Find the biggest cost driver** and ways to shrink it (shorter prompts, retrieve less, summarise history, smaller model).
8. **Note knowledge cutoff implications**: what must be provided fresh in context?

## Common mistakes

1. **Assuming the model remembers past conversations** without the app re-sending them.
2. **Ignoring output tokens**, which are often pricier and slower.
3. **Forgetting Indian-language token inflation** in cost estimates.
4. **Stuffing the whole context window** “because it fits”: costly and can reduce quality.
5. **Expecting the model to know recent facts** after its cutoff.
6. **Thinking users’ chats train the model instantly.** They don’t change the model in real time.

## How it shows up in interviews

> [!INTERVIEW]
> **“Explain how an LLM works to a non-technical stakeholder.”**
> Outline: trained on huge amounts of text to predict the next word-piece (token) → after training, it generates answers one token at a time based on patterns → it doesn’t look things up unless we give it information → it has a limited working memory (context window) → each use costs a little money per token.

> [!INTERVIEW]
> **“How would you estimate the cost of an AI feature?”**
> Outline: tokens per request (input + output) → price per million tokens for the chosen model → requests per user per month → users → total; then identify cost drivers and levers (prompt length, retrieval size, model choice, caching).

## Practice exercise

**Task (25 minutes):** Estimate the monthly cost of an AI “order issue resolver” chatbot for a food app. Assumptions: system prompt 500 words; order details 300 words; average 4 user turns per conversation, 25 words each; average answer 80 words per turn; conversation history re-sent each turn; 50,000 conversations a month. Example prices: input $0.40 per million tokens, output $1.60 per million tokens; ₹85/$. Show your token maths.

```answer Reveal a model answer
**Convert words to tokens (×1.3):** system 650; order details 390; user turn 33; answer 104.

**Per conversation (4 turns, history re-sent each turn):**
- Fixed context each turn: 650 + 390 = 1,040 tokens.
- Turn 1 input: 1,040 + 33 = 1,073. Output: 104.
- Turn 2 input: 1,040 + (33 + 104) + 33 = 1,210. Output: 104.
- Turn 3 input: 1,040 + 2×137 + 33 = 1,347. Output: 104.
- Turn 4 input: 1,040 + 3×137 + 33 = 1,484. Output: 104.
- **Input total ≈ 5,114 tokens; output total = 416 tokens.**

**Cost per conversation:** input 5,114 × 0.40 / 1,000,000 = $0.00205; output 416 × 1.60 / 1,000,000 = $0.00067 → **≈ $0.0027** (≈ ₹0.23).

**Monthly:** 50,000 × $0.0027 ≈ **$136** (≈ ₹11,600).

**Biggest driver:** the fixed context re-sent every turn (system prompt + order details ≈ 80% of input). Levers: shorten the system prompt, include only relevant order fields, use prompt caching if the provider supports it, or a cheaper model for simple turns.
```

## Quiz

```quiz
Q: Roughly how many tokens are 1,000 English words?
- [ ] About 250 :: That would be four words per token; it’s the other way round.
- [ ] About 750 :: That reverses the ratio; 750 words ≈ 1,000 tokens.
- [x] About 1,300–1,500 :: Correct. One token is roughly three-quarters of a word in English.
- [ ] About 10,000 :: Far too high for ordinary English text.

Q: What is the context window?
- [ ] The app screen where the chat appears :: That’s UI, not a model property.
- [x] The maximum number of tokens a model can consider in one request, including its answer :: Correct. It’s the model’s working memory per request.
- [ ] The time the model takes to respond :: That’s latency.
- [ ] The dates covered by training data :: That relates to the knowledge cutoff.

Q: Why does a chatbot seem to remember earlier messages?
- [ ] The model updates its weights after each message :: Using a model doesn’t change its weights.
- [x] The app re-sends the conversation history in each new request :: Correct. The API itself is stateless.
- [ ] Tokens store memories permanently :: Tokens are just text pieces.
- [ ] Training happens during every chat :: Training is separate from inference.

Q: What’s the difference between training and inference?
- [ ] They’re the same process :: They’re very different in cost and purpose.
- [x] Training builds the model’s abilities beforehand; inference is using the trained model to generate outputs :: Correct. Product teams mostly pay for inference, per token.
- [ ] Inference is cheaper than nothing :: Inference costs money per token.
- [ ] Training happens on the user’s phone :: Foundation model training happens on large clusters.

Q: A user asks about yesterday’s news and the model gives an outdated answer. Why?
- [ ] The model is broken :: It’s behaving as designed.
- [x] Its training data has a knowledge cutoff; recent facts must be supplied in the context :: Correct. Use search or retrieval for fresh information.
- [ ] The context window is too large :: Window size doesn’t add new knowledge.
- [ ] Temperature is too low :: Temperature affects randomness, not knowledge.

Q: Which setting makes outputs more consistent and predictable?
- [ ] High temperature :: That increases randomness.
- [x] Low temperature :: Correct. Useful for extraction and classification tasks.
- [ ] More output tokens :: That only allows longer answers.
- [ ] A bigger context window :: Doesn’t control randomness.

Q: Why might a Hindi version of an AI feature cost more than English?
- [ ] Hindi answers are always longer in meaning :: Not necessarily.
- [x] Tokenizers often split Indian-language text into more tokens per word :: Correct. More tokens means higher cost and latency.
- [ ] Providers charge extra for Hindi :: Pricing is per token, not per language.
- [ ] Hindi can’t be processed by LLMs :: Modern LLMs handle Hindi.
```

## Key takeaways

- LLMs generate text **one token at a time**; **1 token ≈ ¾ English word**, and Indian languages often use **more tokens**.
- You pay per **input and output token**; output is usually pricier and slower.
- The **context window** is per-request working memory; the API is **stateless**, so apps re-send history.
- **Training** builds the model (expensive, done by providers); **inference** is using it (per-request cost).
- Models have a **knowledge cutoff**; provide fresh facts in the context, and use **temperature** to trade consistency for creativity.
