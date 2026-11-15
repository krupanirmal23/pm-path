---
id: w10-workflows-agents
title: Workflows vs. autonomous agents
week: 10
estimatedMinutes: 14
tags: [ai, agents, architecture]
---

## Why this matters for a PM

“Let’s build an agent” is today’s “let’s build an app”. But many AI features work better as **workflows**: predictable sequences of steps where the LLM does specific jobs. Choosing between a workflow and an autonomous agent affects reliability, cost, speed, testability and safety. It’s one of the most important architecture decisions AI PMs influence.

## Core concepts

### Definitions

- **Workflow:** a system where **you** define the steps and their order in code (or a no-code tool), and LLMs perform specific steps. The path is predictable: classify → retrieve → draft → check → send.
- **Autonomous agent:** a system where **the LLM decides** which steps to take, in what order, and when it’s done, using tools in a loop.

Both can use LLMs, tools and retrieval. The difference is **who controls the flow**: your code (workflow) or the model (agent).

### Common workflow patterns

1. **Prompt chaining:** a fixed sequence of LLM calls, each using the previous output. Example: extract details from a complaint → classify → draft reply.
2. **Routing:** an LLM (or rules) classifies the input and sends it down the right path. Example: refund question → refund flow; delivery question → tracking flow; other → human.
3. **Parallelisation:** run several LLM calls at once and combine results. Example: check a draft for tone, accuracy and policy compliance in parallel.
4. **Evaluator–optimiser (generate and check):** one step generates, another checks against criteria; loop a limited number of times if checks fail.
5. **Orchestrator–workers:** a coordinator breaks a task into subtasks for worker calls (closer to an agent, but with structure).

### Comparing the two

| | Workflow | Autonomous agent |
|---|---|---|
| Control | Predefined steps | Model decides steps |
| Predictability | High | Lower |
| Testability | Easy: test each step | Harder: many possible paths |
| Cost and latency | Lower, predictable | Higher, variable |
| Flexibility | Handles known task shapes | Handles open-ended tasks |
| Debugging | Clear where it failed | Requires detailed traces |
| Best for | Well-understood, repeatable processes | Open-ended problems with unknown steps |

### A useful rule of thumb

**Start with the simplest thing that works:** a single well-prompted LLM call with good context. If that’s not enough, add a **workflow**. Use an **autonomous agent** only when the steps genuinely can’t be known in advance and the value justifies the extra cost, risk and engineering.

Signs you need an agent:
- The number and type of steps vary a lot by request.
- The task requires exploring (searching, trying, adjusting) before knowing what to do.
- A human expert would need to “figure it out” rather than follow a checklist.

Signs a workflow is better:
- You can draw the process as a flowchart.
- The same 3–6 steps happen almost every time.
- Errors are costly and predictability matters.

### Hybrid designs

Many good products combine both:
- A **workflow** handles 80% of common cases predictably.
- An **agent** handles the long tail, with tighter controls and human review.
- Or a workflow where one step is an agentic research step with a step limit.

### No-code workflow tools

Tools like **n8n**, **Make** and **Zapier** let you build AI workflows visually: triggers (a form submission, a message), steps (LLM calls, API calls, conditions), and actions (send email, update a sheet). They’re great for prototypes and internal tools, and for your P4 prototype (see the n8n guide). Many also support basic agent nodes.

## Worked example

**Feature:** handling customer emails for an online seller on Meesho (illustrative).

**Agent approach (first idea):** “An agent reads each email and figures out what to do using any of 8 tools.”
- Testing shows: inconsistent behaviour; sometimes checks inventory for no reason; sometimes drafts replies without checking order status; average 6 LLM calls per email; hard to debug.

**Workflow approach (better):**
1. **Classify** the email (LLM, small model): order_status / return_request / product_question / complaint / other.
2. **Route** by category:
   - *order_status:* call orders API → LLM drafts reply with status.
   - *return_request:* check return policy (rules) → if eligible, create return (API) → LLM drafts confirmation; else LLM drafts a polite explanation.
   - *product_question:* RAG over product listings → LLM drafts answer with citations.
   - *complaint / other:* LLM summarises → human queue.
3. **Check** each draft (LLM evaluator + rules: no promises of dates not in data, no personal data, tone OK).
4. **Send** automatically for order_status and product_question if checks pass; human approval for returns and complaints.

**Results (illustrative):** 2–3 LLM calls per email; 90% of emails handled predictably; each step testable; failures traceable to a step. The “other” category (10%) could later get an agent with research tools and human review.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 270" role="img" aria-labelledby="wa-t wa-d">
<title id="wa-t">Workflow versus agent</title>
<desc id="wa-d">On the left, a fixed workflow: classify, route to one of three paths, check, send. On the right, an agent loop where the model chooses tools repeatedly.</desc>
<defs><marker id="wa-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<text x="20" y="22" class="d-text" font-weight="700">Workflow: you define the path</text>
<g font-size="10">
<rect x="20" y="40" width="80" height="34" rx="8" class="d-lavender d-ink" stroke-width="2"/><text x="30" y="61" class="d-text-dark">Classify</text>
<rect x="130" y="30" width="90" height="26" rx="6" class="d-sky d-ink" stroke-width="2"/><text x="138" y="47" class="d-text-dark">Status path</text>
<rect x="130" y="62" width="90" height="26" rx="6" class="d-sky d-ink" stroke-width="2"/><text x="138" y="79" class="d-text-dark">Return path</text>
<rect x="130" y="94" width="90" height="26" rx="6" class="d-sky d-ink" stroke-width="2"/><text x="138" y="111" class="d-text-dark">Q&amp;A (RAG)</text>
<rect x="240" y="62" width="60" height="26" rx="6" class="d-butter d-ink" stroke-width="2"/><text x="248" y="79" class="d-text-dark">Check</text>
<rect x="240" y="100" width="60" height="26" rx="6" class="d-mint d-ink" stroke-width="2"/><text x="250" y="117" class="d-text-dark">Send</text>
</g>
<g class="d-ink" stroke-width="1.5"><line x1="102" y1="52" x2="127" y2="43" marker-end="url(#wa-a)"/><line x1="102" y1="57" x2="127" y2="75" marker-end="url(#wa-a)"/><line x1="102" y1="62" x2="127" y2="105" marker-end="url(#wa-a)"/><line x1="222" y1="75" x2="237" y2="75" marker-end="url(#wa-a)"/><line x1="270" y1="90" x2="270" y2="97" marker-end="url(#wa-a)"/></g>
<text x="20" y="160" class="d-text" font-size="11">✓ predictable · cheap · testable per step</text>
<line x1="320" y1="20" x2="320" y2="250" class="d-ink" stroke-width="1.5" stroke-dasharray="5 5"/>
<text x="340" y="22" class="d-text" font-weight="700">Agent: the model chooses</text>
<circle cx="470" cy="110" r="55" class="d-peach d-ink" stroke-width="2"/>
<text x="440" y="106" class="d-text-dark" font-size="11" font-weight="700">LLM loop</text>
<text x="436" y="122" class="d-text-dark" font-size="10">plan → act → observe</text>
<g font-size="10">
<rect x="555" y="40" width="70" height="24" rx="6" class="d-surface d-ink" stroke-width="1.5"/><text x="562" y="56" class="d-text">tool A</text>
<rect x="555" y="98" width="70" height="24" rx="6" class="d-surface d-ink" stroke-width="1.5"/><text x="562" y="114" class="d-text">tool B</text>
<rect x="555" y="156" width="70" height="24" rx="6" class="d-surface d-ink" stroke-width="1.5"/><text x="562" y="172" class="d-text">tool C</text>
</g>
<g class="d-ink" stroke-width="1.5"><line x1="522" y1="90" x2="552" y2="55"/><line x1="526" y1="110" x2="552" y2="110"/><line x1="522" y1="130" x2="552" y2="165"/></g>
<text x="340" y="200" class="d-text" font-size="11">✓ flexible for open-ended tasks</text>
<text x="340" y="218" class="d-text" font-size="11">✗ variable cost, harder to test and debug</text>
</svg>
<figcaption>Start simple. Use workflows when you can draw the flowchart; agents when you genuinely can’t.</figcaption>
</figure>

## Step by step

Choosing an architecture for P4:

1. **Write the task** and list 10 real example inputs.
2. **Try a single LLM call** with good context. Does it meet your quality bar on the examples?
3. **If not, draw the process** a human expert would follow. If it’s a consistent flowchart → **workflow**.
4. **Pick patterns**: chaining, routing, parallel checks, generate-and-check.
5. **Use an agent only** for the parts where steps vary unpredictably; add step limits and approvals.
6. **Prototype** in n8n or Make (guide).
7. **Test each step** and the end-to-end flow on your example set.
8. **Document** the architecture in your P4 spec, with why you chose it.

## Common mistakes

1. **Building an agent for a flowchart-shaped problem.**
2. **One giant prompt doing everything** when chaining would be clearer.
3. **No checks between steps.**
4. **Unbounded loops** in generate-and-check patterns.
5. **Ignoring cost per task** for multi-call systems.
6. **No routing fallback** for inputs that don’t fit any path.

## How it shows up in interviews

> [!INTERVIEW]
> **“Would you use an agent or a workflow for [task]?”**
> Outline: describe the task’s variability → can you draw the flowchart? → workflow for predictable, repeatable processes (cheaper, testable) → agent for open-ended tasks with unknown steps (with limits and approvals) → often hybrid → explain trade-offs in reliability, cost and latency.

> [!INTERVIEW]
> **“How would you make a multi-step AI system reliable?”**
> Outline: simplest architecture that works → clear steps with validation between them → structured outputs → evaluator steps → limits and fallbacks → per-step and end-to-end evals → tracing for debugging.

## Practice exercise

**Task (25 minutes):** For each task, choose single call, workflow (name the pattern) or agent, and justify in 2 lines.
1. Translating product titles from English to Hindi for 10,000 listings.
2. Answering “What’s my refund status?” in a support chat.
3. Researching competitors’ pricing across 15 websites and writing a comparison.
4. Reviewing a draft marketing message for compliance with 12 rules.
5. Handling free-form IT helpdesk requests in a 5,000-person company.

```answer Reveal a model answer
1. **Single call per item (batch).** Same simple task repeated; no branching needed; add rule checks for length.
2. **Workflow (routing + tool call).** Detect intent → call refund API → draft answer from data. Predictable and testable.
3. **Agent (bounded).** Steps vary per website (navigate, find pricing pages, handle formats); use step limits and a human to review the final comparison.
4. **Workflow (parallelisation or generate-and-check).** Check the 12 rules in parallel (some by code, some by LLM), then combine; deterministic structure.
5. **Hybrid.** Routing workflow for common requests (password reset, access requests, laptop issues); an agent with read-only tools for unusual requests; human approval for any access changes.
```

## Quiz

```quiz
Q: What’s the main difference between a workflow and an autonomous agent?
- [ ] Workflows don’t use LLMs :: Workflows often use LLMs for specific steps.
- [x] In a workflow, your code defines the steps; in an agent, the model decides the steps :: Correct. The question is who controls the flow.
- [ ] Agents can’t use tools :: Agents rely heavily on tools.
- [ ] Workflows are always slower :: They’re often faster and cheaper.

Q: When is a workflow usually the better choice?
- [ ] When the task is open-ended and unpredictable :: That suits an agent better.
- [x] When you can draw the process as a consistent flowchart :: Correct. Predictable steps favour workflows.
- [ ] When you want variable costs :: Predictable cost is a workflow advantage.
- [ ] When debugging doesn’t matter :: Debugging always matters.

Q: What is routing in an LLM workflow?
- [ ] Sending network packets :: Not in this context.
- [x] Classifying an input and sending it down the appropriate path :: Correct. Each path can then be simple and testable.
- [ ] Choosing a cheaper cloud region :: Unrelated: routing here means directing inputs to paths.
- [ ] Repeating the same prompt :: That’s not routing.

Q: What’s the risk of an unbounded generate-and-check loop?
- [ ] It always improves quality :: Not guaranteed.
- [x] It can loop many times, wasting cost and time; set a maximum number of attempts :: Correct. Always cap retries.
- [ ] It deletes data :: Not inherently.
- [ ] It removes the need for evaluation :: Evaluation is still needed.

Q: What’s a good first step before building any multi-step system?
- [ ] Build a full autonomous agent :: Often unnecessary complexity.
- [x] Try a single well-prompted LLM call with good context on real examples :: Correct. Start simple.
- [ ] Buy the most expensive model :: Doesn’t address architecture.
- [ ] Skip testing to save time :: Testing is essential.
```

## Key takeaways

- **Workflows**: you define the steps; **agents**: the model decides.
- Workflow patterns: **chaining, routing, parallelisation, generate-and-check, orchestrator–workers**.
- Workflows are **predictable, cheaper and testable**; agents are **flexible but costlier and riskier**.
- **Start with a single call**, then a workflow, and use agents only for genuinely open-ended parts.
- **Hybrid** designs often win: workflows for the common cases, bounded agents for the long tail.
