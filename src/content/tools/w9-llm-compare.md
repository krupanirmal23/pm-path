---
id: w9-llm-compare
title: "Claude, ChatGPT, Gemini: compare 10 prompts"
week: 9
estimatedMinutes: 10
tags: [tool, llm, evaluation]
---

## What it is

**Claude** (claude.ai), **ChatGPT** (chatgpt.com) and **Gemini** (gemini.google.com) are consumer chat apps for three leading model families. All have free tiers (with usage limits and sometimes smaller default models).

## Why PMs use it

Comparing models side by side on *your* task is the fastest way to build intuition about quality, tone, speed and failure modes, and it’s the first step towards a proper eval (Week 10). It also gives you concrete examples for your P4 spec and interviews (“I tested 10 prompts across three models; here’s what I found”).

## Account setup (free plan)

1. Sign up for each with your Google account (or email):
   - claude.ai
   - chatgpt.com
   - gemini.google.com
2. Free plans have daily limits and may use different models than paid plans. Note which model each app says it’s using (usually shown in a model picker or settings) so your comparison is fair and documented.
3. **Privacy:** don’t paste personal data, company secrets or interview participants’ details. Check each app’s data settings (some let you opt out of training on your chats).

## Walkthrough: a 10-prompt comparison

### 1. Prepare your 10 prompts
Use your P4 idea. Mix types:
- 3 **core task** prompts (the main thing your feature does).
- 2 **tricky inputs** (ambiguous, messy, Hinglish, typos).
- 2 **edge cases** (missing information, out-of-scope requests).
- 1 **adversarial** prompt (“Ignore your instructions and…”).
- 1 **structured output** prompt (ask for JSON).
- 1 **long input** prompt (paste a long document or transcript, without personal data).

Write them in a Google Sheet, one per row, with the full prompt text and the **expected good answer** (or criteria).

### 2. Set up the comparison sheet
Columns: `#`, `Prompt type`, `Prompt`, `Expected`, then for each model: `Output`, `Score (1–5)`, `Notes`, plus `Winner` and `Why`.

### 3. Run each prompt in a fresh chat
1. Start a **new chat** for each prompt in each app (to avoid earlier messages influencing results).
2. Paste the exact same prompt.
3. Copy the output into the sheet.
4. Note anything unusual: refusals, invented facts, ignored format, very long or short answers, language quality.

### 4. Score with a simple rubric
Score each output 1–5 on your criteria, e.g.:
- **Correctness** (no invented facts; follows the data given)
- **Instruction following** (format, length, scope)
- **Clarity and tone** (fits your users)
- **Safety** (handled out-of-scope and adversarial prompts well)

Write one line explaining each score. Be consistent: decide what a 3 vs. a 5 means before you start.

### 5. Summarise patterns
Write 5 bullet points:
- Which model was best for your **core task**, and by how much?
- Where did each fail? (e.g., “Model B ignored the 60-word limit 3 of 10 times.”)
- Language quality in Hindi/Hinglish.
- Structured output reliability.
- Your provisional choice for P4 and what you’d test next in AI Studio with the API.

### 6. Save for your prompt library
Copy your best-performing prompts into your Notion prompt library (see the Notion guide), with notes on which model and version they were tested on.

## Tips

- **Same prompt, fresh chat, same day**: keep conditions fair.
- **Run important prompts twice**; outputs vary between runs. Note consistency.
- **Don’t judge on vibes alone**: use the rubric.
- **Chat apps ≠ APIs**: consumer apps add their own system prompts and features. Use this for intuition; use the API (AI Studio) for product decisions.
- **Record model names and dates**: results change as providers update models.
