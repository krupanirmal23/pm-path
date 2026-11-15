---
id: w9-hallucination
title: Why models hallucinate
week: 9
estimatedMinutes: 15
tags: [ai, llm, reliability]
---

## Why this matters for a PM

LLMs sometimes produce fluent, confident answers that are simply wrong: invented facts, fake citations, wrong numbers. This is called **hallucination**, and it’s the single biggest trust risk in AI products. Your Week 9 checkpoint asks you to explain to a non-technical friend why the AI can be confidently wrong and what the UX does about it.

## Core concepts

### What a hallucination is

A **hallucination** is an output that is not supported by facts or by the information given to the model, but is presented as if it were true. Examples:
- Inventing a refund policy that doesn’t exist.
- Citing a court case, research paper or URL that doesn’t exist.
- Getting a number wrong in a summary (“₹4.5 lakh” instead of “₹45,000”).
- Answering a question about a product feature confidently when the feature doesn’t exist.

### Why it happens (in plain words)

1. **The model predicts plausible text, not verified truth.** It was trained to produce the most likely next tokens given patterns in its training data. “Likely-sounding” and “true” usually overlap, but not always. There’s no built-in fact-checker.
2. **Fluency isn’t a confidence signal.** The model writes in the same smooth, confident style whether it’s right or wrong. Humans tend to trust fluent text, which makes errors more dangerous.
3. **Gaps in knowledge.** If the answer wasn’t well represented in training data (rare facts, local details, recent events after the knowledge cutoff, your company’s private policies), the model may fill the gap with a plausible guess.
4. **Pressure to answer.** Models are trained to be helpful; without explicit permission to say “I don’t know”, they often produce *an* answer.
5. **Ambiguous or leading prompts.** “Why did Zerodha launch a credit card in 2019?” presupposes a false fact; the model may go along with it.
6. **Long or messy context.** Important details buried in long inputs may be missed or mixed up.
7. **Arithmetic and exact recall.** LLMs are weaker at precise calculation, counting and exact quoting than at language patterns.

### Types worth distinguishing

- **Factual hallucination:** wrong facts about the world.
- **Faithfulness (grounding) failure:** the answer contradicts or goes beyond the provided source documents (critical in RAG products).
- **Instruction failure:** the model ignores a rule (“only answer about orders”) and makes something up.
- **Fabricated references:** fake links, citations, quotes.

### Reducing hallucinations: product and technical levers

No method removes them completely, so think in layers:

**1. Ground the model in real data**
- Provide the relevant facts in the context (product data, policies, order details) via **retrieval (RAG)** or tools (Week 10).
- Instruct the model to answer **only from the provided information** and to say when it can’t find the answer.

**2. Prompt design**
- Allow and encourage “I don’t know” / “I couldn’t find that in your order details.”
- Ask for **quotes or references** to the source text for key claims.
- Use low temperature for factual tasks.
- Break complex tasks into steps.

**3. Use tools for what LLMs are bad at**
- Calculations → a calculator or code.
- Live data (prices, order status, balances) → API calls, not memory.
- Exact policy text → retrieve and quote, don’t paraphrase from memory.

**4. Check outputs**
- **Validation rules:** check numbers, formats and allowed values in code before showing them.
- **Evals:** test the system on a set of tricky questions before launch and after every change (Week 10).
- **Human review** for high-stakes outputs.

**5. UX that protects users**
- **Citations / source links** so users can verify.
- **Editable suggestions** instead of automatic actions (users stay in control).
- **Clear labelling** that it’s AI-generated and may be wrong, especially for advice.
- **Confirmation steps** before consequential actions (refunds, payments, sending messages).
- **Feedback buttons** (👍/👎, “Report a problem”) to catch failures.
- **Graceful fallback**: “I’m not sure. Here’s how to reach a human.”
- **Scope limits**: don’t let an order-help bot answer medical or legal questions.

### Risk-based thinking

How much hallucination you can tolerate depends on the stakes:
- **Low stakes:** brainstorming names, drafting a casual message → occasional errors are fine; users edit.
- **Medium stakes:** summarising a support ticket for an agent → errors waste time; a human reviews.
- **High stakes:** financial, medical, legal advice; money movement → strict grounding, verification, human approval, or don’t use generative AI for the final decision.

## Worked example

**Feature:** an AI help assistant for a food delivery app answering “Where is my refund?”

**Risky version:** the model answers from general knowledge. A user asks, “When will I get my refund?” The model replies, “Refunds are processed within 24 hours.” The actual policy is 5–7 working days for card refunds. The user complains when the refund doesn’t arrive in 24 hours. Trust damaged; support load increases.

**Safer version:**
1. The app calls the **orders API** for the user’s refund status and the **policy database** for the correct timeline by payment method.
2. These facts go into the context with an instruction: “Answer only from the order and policy data below. If the data doesn’t answer the question, say you can’t confirm and offer to connect to support. Never promise dates not in the data.”
3. The answer includes the source: “Your refund of ₹348 to your card was initiated on 12 June. Card refunds take 5–7 working days (Refund policy, section 3).”
4. A **code check** verifies the amount in the answer matches the API data.
5. **UX:** “Was this helpful?” buttons, and a visible “Talk to support” option.
6. **Evals:** 100 test questions including tricky ones (“Can I get my refund in cash?”, a cancelled order with no payment) checked before every prompt change.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 250" role="img" aria-labelledby="hl-t hl-d">
<title id="hl-t">Layers of defence against hallucination</title>
<desc id="hl-d">Concentric layers from the inside out: grounding with real data, prompt rules, tools, output checks, and protective UX around the user.</desc>
<rect x="20" y="20" width="600" height="210" rx="16" class="d-pink d-ink" stroke-width="2"/>
<rect x="60" y="50" width="520" height="160" rx="14" class="d-peach d-ink" stroke-width="2"/>
<rect x="100" y="78" width="440" height="112" rx="12" class="d-butter d-ink" stroke-width="2"/>
<rect x="140" y="104" width="360" height="66" rx="10" class="d-sky d-ink" stroke-width="2"/>
<rect x="190" y="122" width="260" height="34" rx="8" class="d-mint d-ink" stroke-width="2"/>
<text x="210" y="144" class="d-text-dark" font-size="12" font-weight="700">Ground in real data (RAG, APIs)</text>
<text x="150" y="118" class="d-text-dark" font-size="11">Prompt rules: “only from sources; say I don’t know”</text>
<text x="110" y="94" class="d-text-dark" font-size="11">Tools for maths, live data · code checks · evals</text>
<text x="70" y="66" class="d-text-dark" font-size="11">Human review for high stakes</text>
<text x="30" y="38" class="d-text-dark" font-size="11">UX: citations · editable · confirm actions · feedback · fallback to human</text>
</svg>
<figcaption>No single fix stops hallucinations. Stack layers, with more layers for higher stakes.</figcaption>
</figure>

## Step by step

Designing an AI feature with hallucination in mind:

1. **Rate the stakes** (low/medium/high) of a wrong answer for users and the business.
2. **List facts the feature needs** and where the truth lives (APIs, databases, documents).
3. **Ground**: provide those facts in context rather than relying on model memory.
4. **Write prompt rules**: answer from sources only, admit uncertainty, cite sources, stay in scope.
5. **Move precise work to tools**: calculations, lookups, dates.
6. **Add output checks** in code for critical fields.
7. **Design protective UX**: citations, editing, confirmations, feedback, human fallback.
8. **Build an eval set** of normal and tricky questions; measure hallucination rate before launch.
9. **Monitor after launch**: user feedback, flagged answers, sampled reviews.

## Common mistakes

1. **Trusting fluent answers.** Confidence in tone isn’t accuracy.
2. **Using the model as a database** for facts that change (prices, policies, stock).
3. **No “I don’t know” path**, forcing the model to guess.
4. **Letting AI take irreversible actions** without confirmation.
5. **Asking the model to do maths** instead of using code.
6. **No measurement**: “it looked fine in a few tries” isn’t evidence.

## How it shows up in interviews

> [!INTERVIEW]
> **“Why do LLMs hallucinate, and what would you do about it in your product?”**
> Outline: predicts plausible text rather than verified facts; fluent regardless of correctness; gaps after cutoff or in private data; pressure to answer → layers: grounding (RAG/APIs), prompt rules (cite, say I don’t know), tools for exact work, output checks, evals, protective UX (citations, edits, confirmations, feedback, human fallback) → scale effort with stakes.

> [!INTERVIEW]
> **“Users don’t trust our AI assistant. What do you do?”** (also a Week 14 AI PM case)
> Outline: find out why (wrong answers? opaque? over-confident?) with data and interviews → measure accuracy with evals → fix grounding and scope → add citations, uncertainty and control → communicate limits → track trust signals (feedback, repeat usage).

## Practice exercise

**Task (25 minutes):** Your checkpoint rehearsal. Write a 150–200 word explanation for a non-technical friend: why an AI can be confidently wrong, and three things a good app does to protect them. Then test it: read it aloud to someone and ask them to explain it back.

```answer Reveal a model answer
“Think of an AI chatbot as an extremely well-read autocomplete. It has read a huge amount of text and learned which words usually follow which. When you ask a question, it doesn’t look up a verified fact like Google might; it writes the most likely-sounding answer, word by word. Most of the time that’s right, because likely-sounding and true usually overlap. But when it doesn’t know, for example a recent event or a company’s private policy, it can still produce something that sounds perfectly confident. It writes in the same smooth tone whether it’s right or wrong, so you can’t tell from the style.

Good apps protect you in three ways. First, they give the AI the real facts, like your actual order details, and tell it to answer only from those. Second, they show where the answer came from, with a source or link you can check. Third, they keep you in control: important actions like refunds or payments need your confirmation, and there’s always a way to reach a human or flag a wrong answer.”
```

## Quiz

```quiz
Q: What is the core reason LLMs can be confidently wrong?
- [ ] They are programmed to lie :: They aren’t designed to deceive; errors come from how they generate text.
- [x] They generate plausible-sounding text based on patterns, without a built-in fact-checker, and sound fluent either way :: Correct. Fluency isn’t a confidence signal.
- [ ] They only use the internet :: Most generate from learned patterns unless connected to tools.
- [ ] Their context window is always too small :: Window size isn’t the core cause.

Q: Which is the best way to stop a support bot inventing refund policies?
- [ ] Ask the model to be careful :: Helpful but weak on its own.
- [x] Provide the actual policy and order data in the context and instruct it to answer only from that :: Correct. Grounding is the strongest lever.
- [ ] Increase temperature :: Higher temperature increases variation and risk.
- [ ] Use a longer system prompt with jokes :: Unrelated to accuracy.

Q: A model gives a wrong total when adding 17 order amounts. What’s the best fix?
- [ ] Ask it to try harder :: Unreliable for exact arithmetic.
- [x] Do the calculation in code (a tool) and give the model the result :: Correct. Use tools for precise work.
- [ ] Use a bigger font :: UI changes don’t fix maths.
- [ ] Add more examples of addition :: May help slightly but isn’t reliable.

Q: What is a faithfulness (grounding) failure?
- [ ] The model refuses to answer :: That’s a refusal, not a faithfulness failure.
- [x] The answer contradicts or goes beyond the source documents it was given :: Correct. Critical to measure in RAG systems.
- [ ] The app crashes :: That’s a software bug.
- [ ] The model answers in Hindi :: Language choice isn’t faithfulness.

Q: Which UX pattern best helps users catch hallucinations?
- [ ] Hiding that the answer is AI-generated :: Reduces users’ ability to judge reliability.
- [x] Showing citations or source links for key claims :: Correct. Users can verify what matters.
- [ ] Making answers longer :: Length doesn’t improve accuracy.
- [ ] Removing feedback buttons :: Feedback helps catch failures.

Q: For which feature is hallucination risk most dangerous?
- [ ] Suggesting names for a WhatsApp group :: Low stakes; users can ignore bad ideas.
- [ ] Drafting a casual birthday message :: Low stakes; users edit before sending.
- [x] Advising users on how much tax they owe :: Correct. Wrong answers cause real financial harm, so strict grounding and review are needed.
- [ ] Brainstorming blog topics :: Low stakes: a bad idea is simply ignored.

Q: Why should a prompt explicitly allow “I don’t know”?
- [ ] To make the model lazy :: The goal is honesty, not laziness.
- [x] Without permission to admit uncertainty, models tend to guess to be helpful :: Correct. An explicit “I don’t know” path reduces guessing.
- [ ] It reduces token cost dramatically :: Not the main reason.
- [ ] It improves speed :: Not the main reason.
```

## Key takeaways

- **Hallucinations** are fluent but unsupported outputs: invented facts, wrong numbers, fake citations.
- They happen because LLMs **predict plausible text**, sound **equally confident** when wrong, and **guess** to fill gaps.
- Defend in **layers**: grounding (RAG/APIs), prompt rules, tools for exact work, output checks, evals, protective UX.
- **Protective UX**: citations, editable suggestions, confirmations, feedback, human fallback, clear scope.
- **Scale safeguards with stakes**; for high-stakes decisions, require verification or human review.
