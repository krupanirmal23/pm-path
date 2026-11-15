---
id: w9-system-prompts
title: System prompts and structured output
week: 9
estimatedMinutes: 15
tags: [ai, prompting, structured-output]
---

## Why this matters for a PM

When an LLM powers a real feature, two things matter most: it must **behave consistently** (tone, scope, safety) across millions of conversations, and its output must be **usable by software** (a ticket, a database row, a button). **System prompts** handle the first; **structured output** (like JSON) handles the second. Together they turn a chatbot demo into a dependable product component.

## Core concepts

### Message roles

Most chat-style LLM APIs organise input as a list of **messages**, each with a **role**:
- **System** (sometimes called “developer” or “instructions”): sets the model’s overall behaviour, rules and context for the whole conversation. Written by your team, invisible to users.
- **User:** what the user types (or what your app sends on their behalf).
- **Assistant:** the model’s previous replies (included to give conversation history).

The **system prompt** is where you put durable rules: identity, scope, tone, safety, formatting, and fixed context. User messages carry the variable part.

### What goes in a system prompt

1. **Identity and purpose:** “You are FlatSplit’s in-app assistant. You help users understand and settle shared expenses.”
2. **Scope:** what it handles and what it refuses. “Only answer questions about expenses, balances and settling up in this app. For anything else, politely say you can only help with FlatSplit.”
3. **Grounding rules:** “Use only the data in <account_data>. If it’s not there, say so.”
4. **Tone and style:** “Friendly, neutral, never judgemental about who owes money. Short sentences. Match the user’s language (English, Hindi or Hinglish).”
5. **Safety and policy:** “Never ask for UPI PINs, OTPs or passwords. Never give legal or tax advice.”
6. **Format:** “Reply in under 80 words unless the user asks for detail.”
7. **Escalation:** “If the user reports fraud or an unauthorised payment, give the support link and stop.”

Keep it organised with headings. Long system prompts are fine, but every line costs tokens on every request (prompt caching can help).

### System prompts aren’t security boundaries

Users may try **prompt injection** or **jailbreaks** (“Ignore your instructions and…”). Models usually follow system rules, but not perfectly. Never rely on the system prompt alone for anything that must never happen (e.g., revealing other users’ data, issuing refunds). Enforce those rules in **code and permissions** (Week 11).

Also assume the system prompt **could be revealed** by a determined user; don’t put secrets (API keys, internal-only data) in it.

### Structured output

**Structured output** means asking the model to return data in a fixed, machine-readable format, usually **JSON**, that matches a **schema** (a definition of fields and their types).

Why it matters: your app needs to *do* something with the output: create a ticket, fill a form, choose a category, show buttons. Free text is hard to parse reliably.

Example schema (described in plain terms):
- `intent`: one of `"check_balance"`, `"settle"`, `"dispute_expense"`, `"other"`
- `amount`: number or null
- `expense_id`: string or null
- `reply`: string (text to show the user)

Example output:
```json
{"intent": "dispute_expense", "amount": null, "expense_id": "exp_442", "reply": "Got it. I’ve flagged the groceries expense for your flatmates to review."}
```

### How to get reliable structured output

1. **Use the provider’s structured output / JSON mode** if available. Many APIs let you pass a **JSON schema** and guarantee (or strongly enforce) valid output.
2. **Describe the schema in the prompt** with field names, types and allowed values.
3. **Give an example** of valid output.
4. **Use enums** (fixed lists of allowed values) for categories.
5. **Validate in code**: parse the JSON, check types and allowed values; reject or retry if invalid.
6. **Plan a fallback**: if validation fails twice, show a safe default (“Sorry, I couldn’t process that. Try rephrasing.”) and log it.

### Function calling (preview)

Many APIs let you describe **functions/tools** (e.g., `get_balance(group_id)`, `create_settlement(amount)`), and the model returns a structured request to call one, which your code executes. This is structured output for actions. Week 10 covers it with agents.

### Versioning and testing system prompts

Treat system prompts like code:
- **Store them in version control**, not just in someone’s notes.
- **Version them** (v1, v2…) and log which version produced which output.
- **Test every change** against your eval set before release.
- **Roll out gradually** (feature flags) and monitor feedback.

## Worked example

**Feature (P4-style):** an AI expense parser in a flatmate app. Users type messages like “paid 1260 for groceries, split with rohan and priya except the cheese which was mine (340)”. The app must create correct expense entries.

**System prompt (excerpt):**
```
You convert natural-language expense messages into structured expenses for FlatSplit.

RULES
- Amounts are in Indian rupees. Interpret "1.2k" as 1200.
- Only use names from <group_members>. If a name doesn’t match, set "needs_clarification": true.
- Never invent amounts. If the split is unclear, ask a clarifying question instead.
- Output must match the JSON schema exactly.

OUTPUT SCHEMA
{
  "expenses": [ { "description": string, "amount": number, "paid_by": string, "split_between": [string], "split_type": "equal" | "custom", "custom_shares": object|null } ],
  "needs_clarification": boolean,
  "question": string|null
}
```

**Model output for the example:**
```json
{
  "expenses": [
    {"description": "Groceries (shared)", "amount": 920, "paid_by": "Krupa", "split_between": ["Krupa", "Rohan", "Priya"], "split_type": "equal", "custom_shares": null},
    {"description": "Cheese (personal)", "amount": 340, "paid_by": "Krupa", "split_between": ["Krupa"], "split_type": "equal", "custom_shares": null}
  ],
  "needs_clarification": false,
  "question": null
}
```

**Code checks:** amounts sum to 1,260 ✔; names exist in the group ✔; amounts positive ✔. If a check fails, the app shows the parsed result for the user to edit before saving (an **editable suggestion**, which keeps the user in control).

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 250" role="img" aria-labelledby="sp-t sp-d">
<title id="sp-t">System prompt, user message and structured output</title>
<desc id="sp-d">A system prompt and a user message go into the model; it returns JSON, which code validates before the app uses it, with a fallback if invalid.</desc>
<defs><marker id="sp-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="15" y="25" width="150" height="80" rx="10" class="d-lavender d-ink" stroke-width="2"/>
<text x="28" y="50" class="d-text-dark" font-weight="700" font-size="12">System prompt</text>
<text x="28" y="70" class="d-text-dark" font-size="10">identity, scope, rules,</text>
<text x="28" y="85" class="d-text-dark" font-size="10">tone, schema</text>
<rect x="15" y="135" width="150" height="70" rx="10" class="d-sky d-ink" stroke-width="2"/>
<text x="28" y="160" class="d-text-dark" font-weight="700" font-size="12">User message</text>
<text x="28" y="180" class="d-text-dark" font-size="10">“paid 1260 for groceries…”</text>
<rect x="210" y="85" width="110" height="70" rx="12" class="d-surface d-ink" stroke-width="2"/>
<text x="240" y="125" class="d-text" font-weight="700">LLM</text>
<rect x="360" y="85" width="120" height="70" rx="10" class="d-butter d-ink" stroke-width="2"/>
<text x="372" y="110" class="d-text-dark" font-weight="700" font-size="12">JSON output</text>
<text x="372" y="130" class="d-text-dark" font-size="10">{ "expenses": [...] }</text>
<rect x="515" y="40" width="110" height="60" rx="10" class="d-mint d-ink" stroke-width="2"/>
<text x="527" y="66" class="d-text-dark" font-weight="700" font-size="11">Valid → app</text>
<text x="527" y="84" class="d-text-dark" font-size="10">save / show</text>
<rect x="515" y="140" width="110" height="60" rx="10" class="d-pink d-ink" stroke-width="2"/>
<text x="527" y="166" class="d-text-dark" font-weight="700" font-size="11">Invalid →</text>
<text x="527" y="184" class="d-text-dark" font-size="10">retry / ask user</text>
<g class="d-ink" stroke-width="2"><line x1="167" y1="65" x2="206" y2="105" marker-end="url(#sp-a)"/><line x1="167" y1="170" x2="206" y2="135" marker-end="url(#sp-a)"/><line x1="322" y1="120" x2="356" y2="120" marker-end="url(#sp-a)"/><line x1="482" y1="110" x2="511" y2="75" marker-end="url(#sp-a)"/><line x1="482" y1="130" x2="511" y2="165" marker-end="url(#sp-a)"/></g>
<text x="400" y="230" class="d-text" font-size="11">code validates schema, totals, allowed names</text>
</svg>
<figcaption>System prompts set durable behaviour; structured output lets software act on the answer, after validation.</figcaption>
</figure>

## Step by step

Designing the system prompt and output for your P4 feature:

1. **Write the identity and purpose** in two sentences.
2. **Define scope**: allowed topics and how to decline others.
3. **Add grounding, safety and escalation rules.**
4. **Set tone and language behaviour.**
5. **Decide the output contract**: free text, JSON, or both (e.g., JSON with a `reply` field).
6. **Write the schema** with types and enums; add an example.
7. **Use the API’s structured output mode** if available (AI Studio guide).
8. **Write validation rules** and a fallback.
9. **Test** with normal, tricky and adversarial inputs (including “ignore your instructions”).
10. **Version and store** the prompt in your prompt library.

## Common mistakes

1. **Relying on the system prompt for security.** Enforce critical rules in code.
2. **Putting secrets in the system prompt.**
3. **Free-text output when software needs data**, leading to fragile parsing.
4. **No validation** of JSON before using it.
5. **Overlong, disorganised system prompts** with contradictory rules.
6. **Changing prompts in production without testing** or versioning.

## How it shows up in interviews

> [!INTERVIEW]
> **“How would you make an LLM feature reliable enough for production?”**
> Outline: clear system prompt (scope, grounding, safety, tone) → structured output with schema → validation and fallbacks in code → critical rules enforced outside the model → eval set and regression tests → versioning and gradual rollout → monitoring and feedback.

> [!INTERVIEW]
> **“A user tricked our bot into saying something off-brand. What do you do?”**
> Outline: reproduce and log it → classify (prompt injection/jailbreak) → strengthen system prompt and input handling → add output filters/moderation → enforce scope in code → add the case to the eval set → monitor for similar attempts.

## Practice exercise

**Task (30 minutes):** Write a system prompt for a **Swiggy-style “What should I eat?” assistant** that suggests dishes from the user’s past orders and nearby restaurants (data provided in context). Include identity, scope, grounding, tone, safety (allergies/health), format, and a JSON output schema with a `reply` and up to 3 `suggestions` (restaurant_id, dish_name, reason).

````answer Reveal a model answer
```
IDENTITY
You are the "What should I eat?" helper inside a food delivery app in India. You suggest dishes the user is likely to enjoy right now.

SCOPE
- Only suggest dishes that appear in <nearby_menu>. Use <past_orders> to understand preferences.
- If asked about anything unrelated to choosing food in this app, say you can only help pick a meal.

GROUNDING
- Never invent restaurants, dishes, prices or offers. Use only the provided data.
- If <nearby_menu> is empty, say no restaurants are available right now.

HEALTH AND SAFETY
- If the user mentions an allergy or dietary need (e.g., peanuts, vegetarian, Jain, gluten), only suggest dishes whose menu data matches, and add: "Please confirm ingredients with the restaurant."
- Never give medical or nutrition advice beyond what the menu says.

TONE AND LANGUAGE
- Warm, brief, no pressure. Reply in the user’s language (English, Hindi or Hinglish).

OUTPUT (JSON only)
{
  "reply": string (max 40 words),
  "suggestions": [
    {"restaurant_id": string, "dish_name": string, "reason": string (max 15 words)}
  ] (0 to 3 items)
}
```
Validation in code: every restaurant_id and dish exists in the provided menu; at most 3 suggestions; allergy-tagged requests only return matching items.
````

## Quiz

```quiz
Q: What belongs in the system prompt rather than the user message?
- [ ] The user’s question :: That’s the user message.
- [x] Durable rules: identity, scope, tone, safety and format :: Correct. They apply to every turn of every conversation.
- [ ] The model’s previous reply :: That’s an assistant message in the history.
- [ ] Random examples each turn :: Fixed examples can go in the system prompt; random ones don’t belong there.

Q: Why shouldn’t you rely only on the system prompt to block risky actions?
- [ ] System prompts are ignored by all models :: Models usually follow them, just not perfectly.
- [x] Prompt injection and jailbreaks can sometimes get around them, so critical rules need enforcement in code :: Correct. Permissions and checks in code are the real safety net.
- [ ] System prompts are too expensive :: Cost isn’t the main concern.
- [ ] Users can edit system prompts directly :: They can’t edit them, but they can try to manipulate behaviour.

Q: Why use structured output like JSON?
- [ ] It makes answers more creative :: Not the purpose.
- [x] Software can reliably read and act on the output :: Correct. Fields and types are predictable, unlike free text.
- [ ] Users prefer reading JSON :: Users usually see a rendered reply, not raw JSON.
- [ ] It removes the need for validation :: You should still validate.

Q: The model returns JSON with a category not in your allowed list. What should your app do?
- [ ] Save it anyway :: Bad data spreads into your systems.
- [x] Reject it, retry or fall back, and log the failure :: Correct. Never let invalid data flow into your systems.
- [ ] Crash the app :: Never acceptable.
- [ ] Show the raw JSON to the user :: Confusing and unhelpful.

Q: What is an enum in a schema?
- [ ] A type of model :: Unrelated: an enum is a schema concept, not a model.
- [x] A fixed list of allowed values for a field :: Correct. Useful for categories and intents.
- [ ] An encrypted number :: Unrelated: enums are lists of allowed values.
- [ ] An error message :: Unrelated: enums define allowed values, not errors.

Q: Which should NEVER be placed in a system prompt?
- [ ] The assistant’s tone guidelines :: Fine to include.
- [ ] The allowed scope of topics :: Fine to include.
- [x] Secret API keys or passwords :: Correct. Assume system prompts could be revealed.
- [ ] Formatting instructions :: Fine to include.
```

## Key takeaways

- **System prompts** set durable behaviour: identity, scope, grounding, tone, safety, format, escalation.
- They’re **not security boundaries**: enforce critical rules in **code**, and never put **secrets** in them.
- **Structured output** (JSON with a schema and enums) lets software act on model output.
- **Validate** every output in code and have **retries and fallbacks**.
- **Version, test and roll out** prompt changes like code.
