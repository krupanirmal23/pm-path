---
id: w9-ai-ux
title: AI UX patterns
week: 9
estimatedMinutes: 16
tags: [ai, ux, design]
---

## Why this matters for a PM

AI features behave differently from normal software: they’re **probabilistic** (outputs vary), sometimes **wrong**, often **slow**, and users don’t know what they can ask. Good AI UX sets expectations, keeps users in control, shows its work, and recovers gracefully. Poor AI UX makes even a great model feel untrustworthy. These patterns are central to your P4 spec and checkpoint.

## Core concepts

### 1. Streaming

**Streaming** shows the answer word by word as the model generates it, instead of waiting for the whole response.
- Why: long answers can take 5–20 seconds. Seeing text appear within a second feels responsive (time to first token matters more than total time).
- When not to: when output must be validated before showing (e.g., JSON for an action, or content needing a safety check). Then show a clear progress state instead (“Checking your order…”).

### 2. Citations and sources

Show **where information came from**: links, quoted snippets, document names, “Based on your order #8812”.
- Why: users can verify; trust increases; hallucinations are easier to spot.
- Pattern: inline numbered references [1] with a sources panel; or “Source: Refund policy, section 3” under the answer.
- Make citations **real and clickable**; fake citations destroy trust instantly.

### 3. Editable suggestions (human in the loop)

Present AI output as a **draft or suggestion** the user can review and edit before it takes effect.
- Examples: AI-drafted reply to a customer (agent edits, then sends); parsed expense entries (user confirms amounts); auto-filled form fields highlighted for review.
- Why: keeps users in control, catches errors, and builds trust gradually.
- The more consequential the action, the more explicit the confirmation should be.

### 4. Feedback mechanisms

Let users tell you when AI output is good or bad:
- **Explicit:** 👍/👎, “Report a problem”, a short reason (“Wrong information / Not helpful / Offensive”).
- **Implicit:** did they copy the answer, accept the suggestion, edit it heavily, retry, or abandon?
- Why: feeds your evals, monitoring and improvement. Make it one tap; ask for a reason only after 👎.

### 5. Graceful failure and fallbacks

AI will fail: timeouts, refusals, low confidence, errors. Design for it:
- **Clear messages:** “I couldn’t find that in your order history.” not “Error.”
- **Fallback paths:** a normal UI flow, a search result, a FAQ link, or a human (“Talk to support”).
- **Admit uncertainty:** “I’m not sure; here’s what I found” beats a confident wrong answer.
- **Retry and rephrase** options.

### 6. Setting expectations (onboarding and affordances)

Users don’t know what an AI feature can do (“What can I ask?”). Help them:
- **Example prompts / suggestion chips:** “Why was I charged a fee?”, “Split last month’s groceries”.
- **Clear scope statements:** “I can help with orders and refunds.”
- **Label AI-generated content** where it matters (“AI summary”, “Suggested by AI”).
- **Explain limitations** briefly and honestly.

### 7. Progressive disclosure of AI

Start with AI **assisting** inside familiar UI rather than replacing it with a blank chat box: smart defaults, suggested replies, auto-filled fields, summaries above long content. Chat isn’t always the best interface; often a button (“Summarise”, “Suggest reply”) is clearer.

### 8. Control and reversibility

- **Undo** for AI actions.
- **Settings** to turn AI features off or adjust them.
- **Confirmation** before irreversible actions (payments, sending messages, deleting data).
- **Preview** of what will happen (“This will create 2 expenses totalling ₹1,260”).

### 9. Latency design

- Stream text; show **skeletons** or **step indicators** for multi-step tasks (“Searching your orders → Checking refund policy → Writing answer”).
- Run AI **in the background** where possible (pre-generate summaries).
- Set and communicate realistic time expectations for long tasks.

### 10. Trust calibration

The goal isn’t maximum trust; it’s **calibrated trust**: users trust the AI as much as it deserves. Over-trust leads to harm when it’s wrong; under-trust means nobody uses it. Patterns that calibrate: citations, confidence indicators (used carefully), consistent behaviour, honest uncertainty, and track records (“Suggestions accepted by 92% of agents”).

## Worked example

**P4 feature:** “AI expense parser” in a flatmate app (users type or speak an expense; AI creates entries).

**AI UX design:**
- **Entry point:** a text box with placeholder “e.g., paid 1260 for groceries, split with Rohan and Priya” and 3 example chips. (Expectations.)
- **Processing state:** “Reading your expense…” with a subtle animation (≤ 2 s typical). No streaming, because output is structured and must be validated.
- **Result as a draft:** a preview card “Groceries ₹920 split 3 ways · Cheese ₹340 (yours)” with editable fields. (Editable suggestion + preview.)
- **Confirmation:** “Add 2 expenses” button; nothing is saved until confirmed. (Control.)
- **Uncertainty:** if a name isn’t recognised: “Who is ‘Ronny’? [Rohan] [Someone else]”. (Graceful clarification.)
- **Failure:** “I couldn’t understand that. Try ‘paid ₹500 for Wi-Fi, split with everyone’” + link to the manual form. (Fallback.)
- **Feedback:** after saving, a small “Was this right? 👍 👎”; edits are logged as implicit feedback. (Feedback.)
- **Label:** a small “AI” tag on parsed entries until confirmed.

**Metrics:** % of AI drafts accepted without edits; % edited; % abandoned; 👎 rate; time to add an expense vs. manual form.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 270" role="img" aria-labelledby="aux-t aux-d">
<title id="aux-t">AI suggestion card with UX patterns</title>
<desc id="aux-d">A phone screen showing an AI draft card with an AI label, editable fields, a source note, confirm and edit buttons, and feedback thumbs, each annotated with its pattern.</desc>
<rect x="190" y="10" width="260" height="250" rx="24" class="d-surface d-ink" stroke-width="3"/>
<rect x="205" y="40" width="230" height="160" rx="12" class="d-butter d-ink" stroke-width="2"/>
<rect x="215" y="50" width="34" height="18" rx="9" class="d-lavender d-ink" stroke-width="1.5"/><text x="221" y="63" class="d-text-dark" font-size="10" font-weight="700">AI</text>
<text x="258" y="63" class="d-text-dark" font-size="11" font-weight="700">Draft: 2 expenses</text>
<rect x="215" y="76" width="210" height="24" rx="6" class="d-surface d-ink" stroke-width="1.5"/><text x="222" y="92" class="d-text" font-size="10">Groceries · ₹920 · split 3 ✎</text>
<rect x="215" y="106" width="210" height="24" rx="6" class="d-surface d-ink" stroke-width="1.5"/><text x="222" y="122" class="d-text" font-size="10">Cheese · ₹340 · you ✎</text>
<text x="215" y="146" class="d-text-dark" font-size="9">From your message: “paid 1260…”</text>
<rect x="215" y="158" width="110" height="30" rx="8" class="d-mint d-ink" stroke-width="2"/><text x="226" y="178" class="d-text-dark" font-size="10" font-weight="700">Add 2 expenses</text>
<rect x="333" y="158" width="92" height="30" rx="8" class="d-surface d-ink" stroke-width="2"/><text x="352" y="178" class="d-text" font-size="10">Edit</text>
<text x="290" y="228" class="d-text" font-size="14">👍  👎</text>
<g class="d-ink" stroke-width="1.2"><line x1="205" y1="59" x2="150" y2="40"/><line x1="425" y1="88" x2="480" y2="70"/><line x1="215" y1="143" x2="150" y2="140"/><line x1="270" y1="188" x2="150" y2="210"/><line x1="330" y1="224" x2="480" y2="225"/></g>
<text x="20" y="44" class="d-text" font-size="11" font-weight="700">Label AI content</text>
<text x="485" y="74" class="d-text" font-size="11" font-weight="700">Editable fields</text>
<text x="20" y="144" class="d-text" font-size="11" font-weight="700">Show the source</text>
<text x="20" y="214" class="d-text" font-size="11" font-weight="700">Confirm before acting</text>
<text x="485" y="229" class="d-text" font-size="11" font-weight="700">One-tap feedback</text>
</svg>
<figcaption>Draft → review → confirm, with sources, labels and feedback: users stay in control and trust stays calibrated.</figcaption>
</figure>

## Step by step

Designing the UX for your P4 AI feature:

1. **Rate the stakes** of a wrong output; decide the level of human control (auto, suggest, require confirmation).
2. **Choose the interface**: chat, inline button, auto-fill, background summary. Prefer the simplest.
3. **Set expectations**: scope statement and 3 example prompts.
4. **Design waiting states**: streaming for text; step indicators for multi-step tasks.
5. **Show sources** when facts are involved.
6. **Present outputs as editable drafts** for anything consequential; add a preview and confirmation.
7. **Design failure states**: low confidence, no data, refusal, timeout; each with a fallback.
8. **Add feedback**: explicit (👍/👎 + reasons) and implicit signals to log.
9. **Label AI content** where users need to know.
10. **Define UX metrics**: acceptance, edit rate, abandonment, 👎 rate, time saved.

## Common mistakes

1. **A blank chat box** with no guidance (“What can I even ask?”).
2. **Auto-executing consequential actions** without confirmation.
3. **No failure design**, leading to generic errors or confident nonsense.
4. **Fake or unclickable citations.**
5. **Streaming outputs that should be validated first.**
6. **Hiding that content is AI-generated** when users would make different decisions knowing it.

## How it shows up in interviews

> [!INTERVIEW]
> **“Design an AI feature for [product].”**
> Outline: user and problem → why AI beats a rule or form → interface choice (often not chat) → AI UX patterns: expectations, streaming/progress, sources, editable drafts, confirmations, failure fallbacks, feedback → metrics (acceptance, edit rate, time saved, 👎 rate) → risks.

> [!INTERVIEW]
> **“How would you build user trust in an AI assistant?”**
> Outline: calibrated trust as the goal → accuracy first (grounding, evals) → transparency (sources, labels, uncertainty) → control (drafts, undo, confirm) → consistency → feedback loop and visible improvement.

## Practice exercise

**Task (30 minutes):** Design the AI UX for **“AI-written replies for Meesho sellers responding to buyer questions”**. Cover: interface, expectations, waiting state, how the draft is presented, control, failure, feedback, labelling and 3 metrics.

```answer Reveal a model answer
- **Interface:** in the buyer-question screen, a “Suggest reply” button (not a separate chat). Reply drafts appear in the reply box.
- **Expectations:** first-time tooltip: “AI drafts a reply using your product details. Always check before sending.”
- **Waiting:** stream the draft into the reply box (text only), or show “Writing a reply…” for up to 3 s.
- **Draft presentation:** editable text with highlighted facts pulled from the listing (size chart, material, delivery time) and a “Based on: product listing” note.
- **Control:** nothing is sent automatically; seller taps “Send”. Buttons: “Shorter”, “In Hindi”, “More polite”.
- **Failure:** if the listing lacks the answer (e.g., “is this washable?” with no care info): “Your listing doesn’t say. Add care instructions?” + manual reply.
- **Feedback:** 👍/👎 on the draft; log edit distance between draft and sent message.
- **Labelling:** buyers see a normal seller reply (the seller reviewed and sent it); internally, drafts are tagged as AI-assisted.
- **Metrics:** % drafts sent with minor/no edits; median seller response time; buyer question → order conversion; 👎 rate.
```

## Quiz

```quiz
Q: Why stream AI text responses?
- [ ] Streaming makes the model more accurate :: Accuracy is unchanged.
- [x] Users see progress within a second instead of waiting for the full answer :: Correct. Time to first token shapes perceived speed.
- [ ] Streaming is cheaper :: Token cost is the same.
- [ ] It removes the need for validation :: Validation may require waiting for the full output.

Q: When should you avoid streaming and show a progress state instead?
- [ ] For long text answers :: Streaming helps there.
- [x] When the output must be validated before showing, such as JSON that triggers an action :: Correct. Show a progress state, validate, then display or act.
- [ ] For every response :: Streaming is useful for many text responses.
- [ ] Never :: Some cases need validation first.

Q: What does an “editable suggestion” pattern achieve?
- [ ] It hides AI from users :: It actually makes AI output visible and reviewable.
- [x] Keeps the user in control by letting them review and change AI output before it takes effect :: Correct. Errors get caught and trust builds gradually.
- [ ] Makes the AI faster :: Not its purpose.
- [ ] Removes the need for feedback :: Edits are themselves valuable feedback.

Q: What’s the goal of trust calibration?
- [ ] Maximum trust in the AI always :: Over-trust causes harm when it’s wrong.
- [x] Users trust the AI as much as it deserves, no more and no less :: Correct. Calibrated trust avoids both blind reliance and non-use.
- [ ] Minimum trust so users double-check everything :: Under-trust means the feature isn’t used.
- [ ] Trust only matters for chatbots :: It matters for every AI feature.

Q: A user asks an order-help bot something it can’t answer. What’s the best response?
- [ ] Make up a likely answer :: Risks a confident hallucination.
- [x] Say it couldn’t find the answer and offer a fallback like support or a relevant help page :: Correct. Graceful failure.
- [ ] Show “Error 500” :: Unhelpful and alarming.
- [ ] Ignore the question :: Leaves the user stuck.

Q: Which is a good implicit feedback signal?
- [ ] The number of servers running :: Not a user signal.
- [x] How heavily users edit an AI draft before sending it :: Correct. Heavy edits suggest poor drafts.
- [ ] The app’s download size :: Unrelated: app size says nothing about answer quality.
- [ ] The time of day :: Context, not quality feedback.
```

## Key takeaways

- AI is **probabilistic, sometimes wrong and often slow**: design for that.
- Core patterns: **streaming/progress, citations, editable drafts, confirmations, graceful fallbacks, feedback, clear labels, example prompts**.
- Prefer the **simplest interface** (a button or auto-fill) over a blank chat box.
- Match the **level of human control** to the stakes of a wrong output.
- Aim for **calibrated trust**, and measure acceptance, edits, abandonment and 👎 rate.
