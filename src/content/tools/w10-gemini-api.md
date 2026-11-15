---
id: w10-gemini-api
title: "Gemini API free tier: power your prototype"
week: 10
estimatedMinutes: 10
tags: [tool, gemini, api]
---

## What it is

The **Gemini API** lets software call Google’s Gemini models with an API key. It has a **free tier** with rate limits, accessed through the key you created in **Google AI Studio** (Week 9). You can call it from code, from Postman, or from no-code tools like n8n and Make.

## Why PMs use it

Your P4 prototype needs a real model behind it. The API lets your workflow (n8n/Make) or app (Week 11) send prompts and receive outputs automatically, using the system prompt and JSON schema you designed in AI Studio. Understanding the request shape also helps you talk to engineers and estimate costs.

## Account setup (free plan)

1. Open aistudio.google.com → **Get API key** (create one if you haven’t).
2. Store the key privately (password manager). **Never** put it in a public repo, a screenshot, or client-side code you publish.
3. Check the current **free-tier rate limits** and **data terms** in AI Studio/docs. Free-tier data may be used to improve Google’s products; don’t send sensitive personal data. For real users later, consider a paid tier with appropriate terms.

## Walkthrough: make your first API calls

### 1. Get the code from AI Studio
1. Open your saved P4 prompt in AI Studio.
2. Click **Get code** and choose **cURL** (or REST). You’ll see the endpoint, your model name, the system instruction, the user content, and generation settings (temperature, response schema).

### 2. Call it from Postman (no code)
1. In Postman, create a request: **POST** to the endpoint shown in AI Studio’s code (it includes the model name and `:generateContent`).
2. **Headers:** `Content-Type: application/json`, and the API key header or query parameter exactly as AI Studio’s code shows (store the key as a Postman **secret variable** `{{GEMINI_KEY}}`).
3. **Body (raw JSON):** paste the JSON body from AI Studio’s code. It contains `system_instruction`, `contents` (the user message) and `generationConfig` (temperature, max tokens, and optionally a response schema for JSON output).
4. Click **Send**. Read the response: the generated text sits inside `candidates[0].content.parts[0].text`. Note the `usageMetadata` (token counts): perfect for cost estimates.

### 3. Run your golden set through the API
1. In Postman, replace the user message with a **variable** `{{input}}`.
2. Create a CSV with a column `input` containing your 50 golden examples.
3. Use the **Collection Runner** (Run collection → select the CSV as data) to send all 50 requests. Add a small delay between requests to stay within rate limits.
4. Export results, paste outputs into the PM Path **Eval Labeler** (Toolkit → Evals) to label pass/fail.

(If you prefer, n8n can do the same loop visually; see the n8n guide.)

### 4. Track tokens and cost
1. For 5 typical requests, record `promptTokenCount` and `candidatesTokenCount` from `usageMetadata`.
2. Put averages into the **AI Cost Calculator** with the model’s current listed price (or an example price clearly labelled) to estimate cost per user.

### 5. Handle errors
- `400`: malformed request (check JSON).
- `401/403`: key problem.
- `429`: rate limit hit → slow down, add retries with waiting.
- `5xx`: provider issue → retry later; plan a fallback in your app.

## Tips

- **Pin the model version** shown in AI Studio for consistent results across your eval runs.
- **Use structured output** (response schema) so your workflow can parse results reliably.
- **Keep temperature low** for evals so runs are comparable.
- **Log prompt version + model** with each run (Langfuse guide).
- **Rotate your key** if you think it leaked; delete the old one in AI Studio.
