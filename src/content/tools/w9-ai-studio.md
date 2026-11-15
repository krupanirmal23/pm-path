---
id: w9-ai-studio
title: "Google AI Studio: system prompts, JSON output and a free API key"
week: 9
estimatedMinutes: 11
tags: [tool, ai-studio, gemini, api]
---

## What it is

**Google AI Studio** (aistudio.google.com) is a free web tool for experimenting with Google’s Gemini models. You can write system instructions, adjust settings like temperature, request structured (JSON) output, and get a **free-tier API key** to call Gemini from code or no-code tools.

## Why PMs use it

AI Studio lets you prototype the actual behaviour of your AI feature, closer to how it will run in production than a consumer chat app. You can test system prompts and JSON schemas, see token counts, and then reuse the same settings via the API in your P4 prototype (Weeks 10–11). The optional “run live” button in PM Path’s Prompt Lab can also use this key.

## Account setup (free plan)

1. Go to aistudio.google.com and sign in with your Google account.
2. Accept the terms. The free tier has rate limits (requests per minute/day) and is subject to Google’s terms for free usage, including how data may be used to improve products. **Don’t send sensitive personal data on the free tier.** Check the current terms and limits on the site.
3. **Get an API key:** click **Get API key** → **Create API key**. Copy it and store it somewhere private (a password manager). Never share it publicly or put it in client-side code you publish.

## Walkthrough: prototype your P4 behaviour

### 1. Create a new prompt
1. Click **Create new prompt** (or **New chat**).
2. Choose a model from the model picker (start with a fast, inexpensive “Flash”-type model; try a larger one for comparison).

### 2. Write the system instructions
1. Open the **System instructions** panel.
2. Paste your P4 system prompt (identity, scope, grounding, tone, safety, format) from the System prompts lesson.
3. Keep it organised with headings.

### 3. Adjust settings
1. **Temperature:** set low (0–0.3) for extraction/classification; moderate (0.7) for creative drafts.
2. **Max output tokens:** set a reasonable cap for your feature.
3. Note the **token count** shown for your prompt; use it in the AI Cost Calculator.

### 4. Test with your inputs
1. Type user messages from your 10-prompt test set.
2. Compare outputs with your expected answers. Use **Run** again to see variation between runs.
3. Try adversarial inputs (“Ignore your instructions…”) and out-of-scope questions.

### 5. Turn on structured output
1. In the settings panel, look for **Structured output** (or “JSON mode”) and enable it.
2. Define the schema in the editor (fields, types, and enums), e.g., `issue_type` as an enum, `order_id` as string, `summary` as string.
3. Run again and confirm every output is valid JSON matching the schema. Test messy inputs.

### 6. Save and export
1. **Save** the prompt with a version name (e.g., “P4 parser v3 – Flash – temp 0.2”).
2. Click **Get code** to see how the same request looks via the API (in Python, JavaScript or cURL). You don’t need to run it now, but notice the structure: model name, system instruction, contents, generation config, response schema.
3. Copy the final system prompt and schema into your Notion prompt library with test results.

### 7. (Optional) Try the key in PM Path
1. In PM Path **Settings**, paste your API key (stored only in this browser).
2. Open **Toolkit → Prompt Lab** and click “Run live” on an example prompt.
3. Remember: the Prompt Lab works fully without a key; this is just for experimentation.

## Tips

- **Version everything**: model, temperature, prompt version and date.
- **Watch rate limits**: if you hit “quota exceeded”, wait a minute or reduce requests.
- **Test the same inputs** after every change (your mini eval set).
- **Keep keys secret**: if a key leaks, delete it in AI Studio and create a new one.
- **Free tier ≠ production**: for real users with sensitive data, use paid tiers with appropriate data terms.
