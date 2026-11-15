---
id: w11-latency
title: Latency budgets
week: 11
estimatedMinutes: 14
tags: [ai, latency, performance]
---

## Why this matters for a PM

AI features are often slow: a big model with long context can take 5–20 seconds, and agents can take minutes. Users notice, abandon and lose trust. A **latency budget** sets how much time each part of an AI request may take so the experience feels fast enough. It’s a PM decision because it trades off against quality and cost.

## Core concepts

### Where AI latency comes from

For a typical RAG feature, one request might include:
1. **Network** from phone to server: 50–300 ms (more on weak mobile networks).
2. **Pre-processing:** auth, input checks, moderation: 20–200 ms.
3. **Retrieval:** embed the question + vector search + re-rank: 100–600 ms.
4. **LLM time to first token (TTFT):** 300 ms – several seconds, depending on model size, input length and provider load.
5. **LLM generation:** output tokens ÷ tokens per second (e.g., 300 tokens at 60 tokens/s = 5 s).
6. **Post-processing:** validation, guardrails, judge checks: 50 ms – 2 s.
7. **Network back + rendering.**

Plus **tool calls** (each API call adds time) and **multiple LLM calls** in workflows or agents.

### Two kinds of perceived speed

- **Time to first visible response:** how soon the user sees *something meaningful* (streamed text, a step indicator, partial results).
- **Time to complete:** how long until the task is fully done.

Streaming and progress indicators improve the first; architecture and model choice improve the second.

### Latency budgets

A **latency budget** is a target total time (at a percentile, usually p95) split across steps. Example for a chat answer:
- Target: **first token visible within 1.5 s (p95)**, full answer within 6 s.
- Budget: network 300 ms · checks 100 ms · retrieval 400 ms · LLM TTFT 700 ms → first token ≈ 1.5 s.
- Generation: limit answers to ~250 tokens at ≥ 60 tokens/s → ~4 s more.

Budgets make trade-offs concrete: “Adding a re-ranker costs 300 ms; we must save it somewhere else.”

### How fast is fast enough?

It depends on the interaction:
- **Inline suggestions, autocomplete, classification in a flow:** under ~500 ms ideally.
- **Chat answers:** first token within 1–2 s; full answer in a few seconds is acceptable if streaming.
- **Generating a document or report:** 10–60 s acceptable with progress and a clear expectation.
- **Background tasks** (agents researching, batch processing): minutes are fine if the user is notified when done.

### Levers to reduce latency

- **Smaller/faster models** for steps that don’t need large ones.
- **Shorter inputs** (less context, shorter prompts) → faster TTFT.
- **Shorter outputs** (concise formats, max tokens).
- **Streaming** for text.
- **Parallelise** independent steps (retrieve while classifying; run guardrail checks in parallel).
- **Cache** frequent results and retrieval.
- **Precompute** (summaries generated in advance).
- **Fewer sequential LLM calls** (merge steps, cap agent loops).
- **Async + notify** for long tasks (“We’ll notify you when your report is ready”).
- **Regional infrastructure** closer to users (India-region hosting can cut network time).
- **Speculative UI:** show likely results early (e.g., cached answer) and refine.

### Trade-offs

Latency, quality and cost pull against each other (next lesson). A bigger model may be more accurate but slower; an extra judge step improves safety but adds time; more retrieved chunks improve recall but increase TTFT. The budget forces explicit choices.

### Measuring latency

- Track **TTFT, total time, and per-step durations** in traces, at **p50 and p95**.
- Segment by **model, feature, network type and region**.
- Alert on p95 breaches.

## Worked example

**Feature:** an in-app AI assistant for Swiggy-style order help.

**v1 measured (p95):** network 400 ms · moderation 300 ms · intent classification (LLM) 900 ms · order API 350 ms · retrieval 600 ms · main LLM TTFT 1,800 ms → **first token at 4.35 s**; full answer at 9 s (450 tokens).

Users abandoned 18% of conversations before the first token appeared.

**Budget:** first token ≤ 2 s (p95); answer ≤ 6 s.

**Changes:**
1. Replace LLM intent classification with a small fast classifier (or rules for top intents): 900 → 150 ms.
2. Run moderation, order API and retrieval **in parallel**: max(300, 350, 600) = 600 ms instead of 1,250 ms.
3. Cut retrieved chunks from 8 to 4 and trim the system prompt: TTFT 1,800 → 900 ms.
4. Limit answers to ~200 tokens with a “More details” option.

**v2 measured (p95):** 400 + 150 + 600 + 900 = **2.05 s first token**; full answer ~5 s. Abandonment fell to 7%. Eval pass rate unchanged (checked).

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 250" role="img" aria-labelledby="lb-t lb-d">
<title id="lb-t">Latency budget before and after</title>
<desc id="lb-d">Two horizontal bars split into steps. The first, sequential, reaches the first token at 4.35 seconds. The second, with parallel steps and a faster classifier, reaches it at about 2 seconds.</desc>
<text x="20" y="28" class="d-text" font-weight="700" font-size="12">v1 (sequential) → first token 4.35 s</text>
<g class="d-ink" stroke-width="1.5">
<rect x="20" y="38" width="48" height="34" class="d-surface"/><rect x="68" y="38" width="36" height="34" class="d-lavender"/><rect x="104" y="38" width="108" height="34" class="d-pink"/><rect x="212" y="38" width="42" height="34" class="d-sky"/><rect x="254" y="38" width="72" height="34" class="d-sky"/><rect x="326" y="38" width="216" height="34" class="d-butter"/>
</g>
<g font-size="10" class="d-text-dark"><text x="24" y="59">net</text><text x="70" y="59">mod</text><text x="110" y="59">LLM classify</text><text x="214" y="59">API</text><text x="258" y="59">retrieve</text><text x="380" y="59">main LLM TTFT</text></g>
<text x="20" y="118" class="d-text" font-weight="700" font-size="12">v2 (parallel + faster) → first token ≈ 2.05 s</text>
<g class="d-ink" stroke-width="1.5">
<rect x="20" y="128" width="48" height="34" class="d-surface"/><rect x="68" y="128" width="18" height="34" class="d-mint"/>
<rect x="86" y="128" width="72" height="12" class="d-sky"/><rect x="86" y="140" width="42" height="10" class="d-sky"/><rect x="86" y="150" width="36" height="12" class="d-lavender"/>
<rect x="158" y="128" width="108" height="34" class="d-butter"/>
</g>
<g font-size="10" class="d-text-dark"><text x="24" y="149">net</text><text x="164" y="149">main LLM TTFT</text></g>
<text x="90" y="178" class="d-text" font-size="10">retrieve ∥ API ∥ moderation</text>
<line x1="242" y1="200" x2="242" y2="215" class="d-ink" stroke-width="2"/>
<line x1="20" y1="210" x2="542" y2="210" class="d-ink" stroke-width="1"/>
<text x="20" y="232" class="d-text" font-size="11">0 s</text><text x="235" y="232" class="d-text" font-size="11">2 s budget</text><text x="520" y="232" class="d-text" font-size="11">4.5 s</text>
</svg>
<figcaption>Parallelise independent steps, use fast models for simple steps, and trim context to hit the budget.</figcaption>
</figure>

## Step by step

Setting a latency budget for P4:

1. **Classify the interaction** (inline, chat, document, background) and pick targets for first visible response and completion at p95.
2. **Map every step** of a request (from traces).
3. **Measure each step** at p50 and p95.
4. **Allocate the budget** across steps.
5. **Find the biggest offenders** and apply levers (faster model, parallel steps, shorter context/output, caching).
6. **Design perceived-speed UX**: streaming, step indicators, async notifications.
7. **Re-run evals** to check quality didn’t drop.
8. **Set alerts** for p95 breaches.

## Common mistakes

1. **Measuring averages** instead of p95.
2. **Sequential steps** that could run in parallel.
3. **Using a large model for simple steps** like classification.
4. **Huge context** “just in case”.
5. **No streaming or progress**, so users stare at a blank screen.
6. **Testing only on fast Wi-Fi** in Bengaluru offices.

## How it shows up in interviews

> [!INTERVIEW]
> **“Users say our AI assistant is too slow. What do you do?”**
> Outline: measure (TTFT, total, p95, per step, by segment) → find the biggest contributors → levers (faster/smaller model for some steps, parallelise, trim context/output, cache, precompute) → perceived speed (streaming, progress) → check quality with evals → set a budget and alerts.

> [!INTERVIEW]
> **“How would you set latency targets for an AI feature?”**
> Outline: depends on interaction type → define first-response and completion targets at p95 → split into a per-step budget → trade off with quality and cost → monitor.

## Practice exercise

**Task (20 minutes):** An AI “explain this bill” feature: network 300 ms; OCR of bill image 1,200 ms; retrieval of tariff rules 500 ms; LLM TTFT 1,500 ms; generation 350 tokens at 50 tokens/s; safety check after generation 800 ms (non-streamed output). Calculate the total p95-like time. Set a budget (it’s a “read and understand” task) and propose 3 changes.

```answer Reveal a model answer
**Current:** 300 + 1,200 + 500 + 1,500 + (350 ÷ 50 = 7,000) + 800 = **11.3 s**, with nothing shown until the end (because of the post-generation safety check).

**Budget:** first useful content within 3 s; full explanation within 7 s (p95).

**Changes:**
1. **Stream the explanation** and run the safety check on chunks as they stream (or use a fast input/output classifier in parallel), so text appears after ~3.5 s.
2. **Shorter output:** a 150-token summary first (amount, due date, top 2 charges) with “Explain more” on demand → generation 3 s instead of 7 s.
3. **Run OCR and tariff retrieval in parallel** where possible (retrieve by the user’s known provider while OCR runs) → saves ~500 ms. Also show “Reading your bill…” step indicators during OCR.
```

## Quiz

```quiz
Q: What does time to first token (TTFT) measure?
- [ ] Total time to finish the answer :: That’s total latency.
- [x] How long until the model produces its first output token :: Correct. It drives how fast streaming feels.
- [ ] The time to train a model :: Unrelated: TTFT is about serving a single request.
- [ ] Network speed only :: TTFT is mostly model-side.

Q: Which change usually cuts TTFT the most?
- [ ] Making the output longer :: Affects generation time, not TTFT.
- [x] Reducing input context size or using a faster model :: Correct. TTFT grows with input length and model size.
- [ ] Changing the button colour :: Unrelated: visuals don’t change model response time.
- [ ] Adding more retrieved chunks :: Increases input and TTFT.

Q: Retrieval (600 ms), an order API call (350 ms) and moderation (300 ms) don’t depend on each other. How long do they take in parallel?
- [ ] 1,250 ms :: That’s sequential.
- [x] About 600 ms, the slowest one :: Correct. Parallel steps take as long as the longest.
- [ ] 300 ms :: That’s the fastest one.
- [ ] 50 ms :: Not realistic.

Q: What’s an acceptable approach for a task that takes 3 minutes, like an agent researching competitors?
- [ ] Show a spinner for 3 minutes :: Poor experience; users leave.
- [x] Run it in the background and notify the user when it’s ready, with progress if possible :: Correct. Users can carry on while long work completes.
- [ ] Refuse to build it :: Long tasks can be valuable if designed well.
- [ ] Make it synchronous and hope :: Risky and frustrating.

Q: Why set latency budgets at p95 rather than the average?
- [ ] p95 is always lower :: It’s usually higher.
- [x] Averages hide the slow experiences that a meaningful share of users suffer :: Correct. Budgets should protect the slow tail.
- [ ] Averages can’t be measured :: They can be measured; they’re just misleading on their own.
- [ ] Providers only report p95 :: Not true: you measure percentiles yourself from traces.
```

## Key takeaways

- AI latency comes from **network, checks, retrieval, TTFT, generation, post-processing and tool calls**.
- Separate **time to first visible response** from **time to complete**.
- A **latency budget** (at p95) splits the target across steps and forces trade-offs.
- Levers: **faster models for simple steps, parallelism, shorter context and output, caching, precomputing, async**.
- Use **streaming and progress**, re-run **evals** after speed changes, and **alert** on p95.
