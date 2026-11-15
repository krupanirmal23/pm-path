---
title: AI feature spec
category: AI
week: 9
summary: A PRD extension for AI features: why AI, model behaviour, quality bar, evals, failure handling, cost and safety.
---
## When to use
For any feature where a model generates or decides something (P4). Use alongside a normal PRD.

## How to fill it
1. Prove **why AI** beats a form or rule.
2. Describe **good vs bad output** with concrete examples.
3. Set a measurable **quality bar** and how you will evaluate it (link your eval sheet).
4. Plan for **failure**: what the user sees when the model is wrong or slow.
5. Estimate **cost per user** with the AI Cost Calculator.

<!-- template -->
# AI feature spec: {feature}

## 1. User problem and why AI
- Problem: {…}
- Why not a rule or form: {…}

## 2. Behaviour
- Input: {what the model receives}
- Output: {format, length, tone}
- Must: {…} · Must not: {…}

## 3. Examples
| Input | Good output | Bad output (and why) |
|---|---|---|

## 4. Model and prompt approach
{model choice, prompt structure, retrieval, temperature}

## 5. Quality bar and evals
| Criterion | Target | How measured |
|---|---|---|

## 6. Failure handling
- Low confidence → {…}
- Timeout → {…}
- Harmful or off-topic input → {…}

## 7. Cost and latency
- Tokens per request: {in/out} · Cost per request: {₹} · Per user per month: {₹}
- Latency target: {p95}

## 8. Safety, privacy, human control
{what data is sent, retention, user can edit/undo}

## 9. Launch and monitoring
{beta size, metrics, feedback loop}

<!-- example -->
# AI feature spec: natural-language expense entry (FlatSplit AI)

## 1. User problem and why AI
- Problem: logging expenses in a form takes ~40 seconds and people stop after month two.
- Why not a rule or form: messages are free text, often Hinglish (“dedh hazaar ka dinner, Rohan aur Priya ke saath”), with exceptions (“except the cheese”). Rules can’t cover this variety.

## 2. Behaviour
- Input: one message + the group’s member names.
- Output: JSON list of expenses (description, amount, paid_by, split_between) or a clarification question.
- Must: only use names in the group; ask when unsure. Must not: invent amounts or people; save without user confirmation.

## 3. Examples
| Input | Good output | Bad output (and why) |
|---|---|---|
| “paid 1260 groceries split with rohan priya” | 1260, paid by me, split 3 ways | Split 2 ways (forgot the payer) |
| “dedh hazaar dinner” | 1500, asks “Who was at dinner?” | 1000 (misread Hindi number) |
| “gave Sam 200” (no Sam in group) | Asks who Sam is | Creates new member “Sam” |

## 4. Model and prompt approach
A fast, low-cost model; system prompt with rules, number words and 6 few-shot examples; JSON schema output; temperature 0.

## 5. Quality bar and evals
| Criterion | Target | How measured |
|---|---|---|
| Correct amount | ≥ 97% | 50-example eval set, exact match |
| Correct split | ≥ 92% | Eval set, human label |
| Asks when ambiguous | ≥ 90% of ambiguous cases | 10 ambiguous examples |
| Invalid JSON | 0% | Schema validator |

## 6. Failure handling
- Low confidence or missing info → show a question, never guess.
- Timeout (> 4 s) → fall back to the normal form with the text pre-filled in description.
- Off-topic input → “I can only add expenses. Try ‘paid 500 for Wi-Fi’.”

## 7. Cost and latency
- ~450 input / 80 output tokens · ≈ ₹0.02 per request · ≈ ₹1.2 per active user per month (60 entries). Example prices; check current pricing.
- Latency target: p95 under 2.5 s.

## 8. Safety, privacy, human control
Only the message and first names are sent; no phone numbers. User reviews the parsed card and taps Save. Logs kept 30 days for evals, then deleted.

## 9. Launch and monitoring
Beta with 20 users. Track edit rate after parsing (proxy for errors), thumbs up/down, and weekly re-run of the eval set.
