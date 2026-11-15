---
id: w10-langfuse
title: "Langfuse free: trace requests end to end"
week: 10
estimatedMinutes: 10
tags: [tool, langfuse, tracing, observability]
---

## What it is

**Langfuse** is an open-source **LLM observability** platform: it records **traces** of each AI request (inputs, outputs, intermediate steps, latency, tokens and cost), lets you attach **scores** (user feedback, eval results), manage **prompt versions**, and build **datasets** from real traces. It has a free cloud tier and can be self-hosted.

## Why PMs use it

When a user says “the AI gave me a wrong answer”, a trace shows exactly what happened: which prompt version ran, what was retrieved, what the model returned and how long each step took. PMs use these tools to debug failures, track cost and latency, and turn real failures into eval cases (the online/offline loop).

## Account setup (free plan)

1. Go to langfuse.com → **Sign up** (cloud). Choose the free tier (check current limits on monthly observations).
2. Create an **organisation** and a **project** (“P4”).
3. In **Settings → API keys**, create a key pair: a **public key** and a **secret key**, plus the **host URL** (cloud region). Store them privately.
4. **Privacy:** don’t send personal data you don’t need. Mask names, phone numbers, UPI IDs before logging.

## Walkthrough: trace your P4 prototype

### Option A: n8n integration
1. Check n8n’s documentation for Langfuse integration (n8n supports sending LLM node traces to Langfuse via environment settings in self-hosted setups, or via an HTTP node posting to Langfuse’s ingestion API).
2. If using HTTP: after your LLM step, add an **HTTP Request** node that posts a trace to Langfuse’s API (endpoint and payload format in Langfuse’s API reference), with basic auth using your public/secret keys.
3. Include: `name` (e.g., “p4-parser”), `input`, `output`, `metadata` (prompt version, model), and token usage if available.

### Option B: a few lines of code (if you or a friend can run Python/JS)
1. Langfuse provides SDKs that wrap model calls, so traces are captured automatically. Follow the quick start for your language: set `LANGFUSE_PUBLIC_KEY`, `LANGFUSE_SECRET_KEY` and `LANGFUSE_HOST` as environment variables, then decorate or wrap your function that calls Gemini.
2. Run your golden set once; traces appear in the dashboard.

### Explore the dashboard
1. **Traces:** click any trace to see its tree of steps (spans): retrieval, LLM call, validation. Check inputs, outputs, latency and token counts for each.
2. **Filters:** filter by name, tags (e.g., `prompt:v2`), latency, or score.
3. **Scores:** add a score to a trace manually (e.g., your pass/fail label) or via API (user 👍/👎 from your app).
4. **Datasets:** select interesting traces (failures, edge cases) → **Add to dataset** → this becomes part of your golden set for future runs.
5. **Prompt management (optional):** store prompt versions in Langfuse and fetch them by name/version in your workflow, so traces automatically record which version ran.

### Weekly review using Langfuse
1. Filter last week’s traces with 👎 or failed validation.
2. Read 20 of them; categorise failures (your error analysis categories).
3. Add 5–10 to your dataset; note the top category for next week’s fix.
4. Check the cost and latency charts for trends.

## Tips

- **Tag everything** with prompt version, model and environment (dev/prod).
- **Mask personal data** before sending; you control what gets logged.
- **Sample** if volume is high; you don’t need every trace on the free tier.
- **Link feedback to traces** using a trace ID so 👎 points straight to the failing request.
- **Screenshot a trace tree** for your P4 case study to show systematic debugging.
