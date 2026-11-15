---
id: w10-hitl
title: Human-in-the-loop
week: 10
estimatedMinutes: 13
tags: [ai, safety, operations]
---

## Why this matters for a PM

Most successful AI products in high-stakes areas don’t replace humans; they **work with** them. **Human-in-the-loop (HITL)** design decides where people review, approve, correct or take over from AI. Done well, it gives you AI’s speed with human judgement where it matters, and it generates the labelled data you need to improve. Done badly, it either rubber-stamps errors or makes the AI pointless.

## Core concepts

### What human-in-the-loop means

**Human-in-the-loop** is a system design where humans are part of the process: approving, correcting or handling AI outputs, especially when stakes are high or confidence is low.

Related terms:
- **Human-on-the-loop:** AI acts on its own, while humans monitor and can intervene (e.g., review samples, stop the system).
- **Human-out-of-the-loop:** fully automated, no human involvement (only for low-stakes, well-tested tasks).

### Where humans fit

1. **Before the AI acts (approval):** AI drafts or proposes; a human approves. Example: AI drafts a reply to a customer; an agent clicks Send.
2. **After the AI acts (review/audit):** AI acts; humans review samples or flagged cases. Example: AI categorises tickets; a QA team reviews 5% weekly.
3. **On escalation (handoff):** AI handles easy cases and escalates hard or risky ones. Example: refund requests above ₹500 go to a person.
4. **For labelling and feedback:** humans label outputs (good/bad, correct category) to build eval sets and improve prompts or models.

### Deciding the level of human involvement

Consider:
- **Stakes:** cost of a wrong output (money, safety, legal, reputation).
- **Reversibility:** can errors be undone easily?
- **Confidence:** how reliable is the AI on this type of case (from evals)?
- **Volume:** can humans keep up? Reviewing 100% of a million daily items isn’t realistic.
- **Regulation:** some decisions legally require human involvement or explanation.

A simple matrix:

| | Low stakes | High stakes |
|---|---|---|
| **High AI reliability** | Automate; sample audits | AI proposes; quick human approval or strong checks |
| **Low AI reliability** | AI drafts; user edits | Human decides; AI assists (summaries, suggestions) |

### Confidence-based routing

Route cases by **confidence** or **risk signals**:
- Model or classifier confidence below a threshold → human.
- Validation rules fail → human.
- Amount above ₹X, new customer, flagged keywords (“fraud”, “legal”, “self-harm”) → human.
- Everything else → automated, with sampling.

LLM “confidence” isn’t always reliable on its own; combine it with rules and risk signals, and check with evals.

### Designing the human’s job well

HITL fails if the human’s experience is poor:
- **Automation bias:** people tend to accept AI suggestions without checking, especially when the AI is usually right. Counter it with highlighting uncertain parts, requiring active confirmation of key facts, and occasionally inserting known test cases.
- **Context:** show reviewers the AI output *and* the evidence (source documents, order data, the customer’s message).
- **Efficiency:** keyboard shortcuts, one-click approve/edit/reject, reasons for rejection.
- **Feedback capture:** every edit or rejection is a label. Store it with a reason category.
- **Workload:** measure review time and queue sizes; tune thresholds so humans aren’t overwhelmed.

### The improvement flywheel

HITL creates a **data flywheel**: humans correct AI → corrections become labelled data → you improve prompts, retrieval or models → AI handles more cases → humans focus on harder ones. Track the **automation rate** over time, alongside quality.

## Worked example

**Feature:** AI-assisted KYC document review at a fintech (illustrative). The AI extracts name, date of birth and PAN number from uploaded documents and checks them against the application.

**Design:**
- **Automated:** documents where extracted fields exactly match the application, image quality is good, and no risk flags → auto-approved, with 2% random human audit.
- **Human approval:** any mismatch (name spelling variations, date format confusion), low image quality, or extraction confidence below threshold → human reviewer sees the document image, extracted fields highlighted, and the specific mismatch.
- **Human only:** documents flagged by fraud rules (tampering signals, duplicate documents) → specialist team; AI provides a summary only.

**Reviewer UI:** document image side by side with extracted fields; mismatches highlighted; buttons “Approve”, “Correct field”, “Reject (reason)”; known test cases inserted weekly to measure reviewer accuracy.

**Metrics:**
- Automation rate (target: 70% → 80% over a quarter).
- Error rate of auto-approved cases (from audits): must stay below 0.5% (guardrail).
- Reviewer time per case; queue backlog.
- Corrections by field (feeds prompt/model improvements).

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 260" role="img" aria-labelledby="hitl-t hitl-d">
<title id="hitl-t">Confidence-based routing with human review</title>
<desc id="hitl-d">AI processes a case; low-risk high-confidence cases are automated with sample audits, uncertain cases go to human approval, high-risk cases go to specialists; human corrections feed back into improvements.</desc>
<defs><marker id="hl2-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="15" y="100" width="100" height="56" rx="10" class="d-lavender d-ink" stroke-width="2"/><text x="30" y="125" class="d-text-dark" font-weight="700">AI step</text><text x="30" y="143" class="d-text-dark" font-size="10">extract + check</text>
<rect x="150" y="100" width="110" height="56" rx="10" class="d-butter d-ink" stroke-width="2"/><text x="162" y="125" class="d-text-dark" font-weight="700">Route</text><text x="162" y="143" class="d-text-dark" font-size="10">confidence + risk</text>
<rect x="300" y="20" width="190" height="50" rx="10" class="d-mint d-ink" stroke-width="2"/><text x="312" y="42" class="d-text-dark" font-weight="700" font-size="11">Automate</text><text x="312" y="58" class="d-text-dark" font-size="10">+ 2% random audit</text>
<rect x="300" y="103" width="190" height="50" rx="10" class="d-sky d-ink" stroke-width="2"/><text x="312" y="125" class="d-text-dark" font-weight="700" font-size="11">Human approves</text><text x="312" y="141" class="d-text-dark" font-size="10">evidence shown, edits logged</text>
<rect x="300" y="186" width="190" height="50" rx="10" class="d-pink d-ink" stroke-width="2"/><text x="312" y="208" class="d-text-dark" font-weight="700" font-size="11">Specialist only</text><text x="312" y="224" class="d-text-dark" font-size="10">high risk; AI summarises</text>
<rect x="525" y="90" width="100" height="80" rx="10" class="d-peach d-ink" stroke-width="2"/><text x="535" y="118" class="d-text-dark" font-weight="700" font-size="11">Labels →</text><text x="535" y="136" class="d-text-dark" font-size="10">improve prompts,</text><text x="535" y="152" class="d-text-dark" font-size="10">retrieval, models</text>
<g class="d-ink" stroke-width="2"><line x1="117" y1="128" x2="146" y2="128" marker-end="url(#hl2-a)"/><line x1="262" y1="115" x2="296" y2="48" marker-end="url(#hl2-a)"/><line x1="262" y1="128" x2="296" y2="128" marker-end="url(#hl2-a)"/><line x1="262" y1="141" x2="296" y2="208" marker-end="url(#hl2-a)"/><line x1="492" y1="128" x2="521" y2="128" marker-end="url(#hl2-a)"/></g>
<path d="M575 172 C 575 250 65 250 65 160" fill="none" class="d-ink" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#hl2-a)"/>
<text x="250" y="254" class="d-text" font-size="11">flywheel: corrections improve the AI</text>
</svg>
<figcaption>Automate the safe majority, put humans where stakes or uncertainty are high, and learn from every correction.</figcaption>
</figure>

## Step by step

Designing HITL for P4:

1. **Map outputs by stakes and reversibility.**
2. **Use eval results** to see where the AI is reliable and where it isn’t.
3. **Choose the involvement level** per case type (automate, approve, escalate, human-only).
4. **Define routing rules** (confidence thresholds, risk flags, amount limits).
5. **Design the reviewer experience**: evidence, highlights, quick actions, reasons.
6. **Plan against automation bias**: active confirmation of key facts, test cases.
7. **Capture corrections as labels** with reason categories.
8. **Set metrics**: automation rate, error rate in automated cases, review time, backlog.
9. **Review thresholds monthly** as quality improves.

## Common mistakes

1. **Rubber-stamp reviews**: humans approve everything because the AI is usually right.
2. **Reviewing 100% forever**, which doesn’t scale and adds little value for safe cases.
3. **No evidence shown to reviewers**, forcing them to search elsewhere.
4. **Not capturing corrections**, losing the improvement flywheel.
5. **Thresholds set once and never tuned.**
6. **Relying on LLM self-reported confidence alone.**

## How it shows up in interviews

> [!INTERVIEW]
> **“How would you decide what to automate with AI and what to keep human?”**
> Outline: stakes × reliability matrix → reversibility and regulation → confidence and risk-based routing → design the human role (approval, audit, escalation) → measure automation rate and error rate → expand automation as evals improve.

> [!INTERVIEW]
> **“Reviewers approve 99.8% of AI suggestions. Is that good?”**
> Outline: maybe, or automation bias → test with seeded known-wrong cases → check audit error rates → if reliably correct, reduce review to sampling; if not, redesign the review UI and checks.

## Practice exercise

**Task (25 minutes):** Design HITL for **an AI that drafts responses to negative app store reviews for a bank’s app**. Define: what’s automated, what needs approval, what’s human-only, routing rules, reviewer UI, and 3 metrics.

```answer Reveal a model answer
- **Automated:** nothing posted publicly without approval in v1 (public, brand and regulatory risk). AI drafts every reply.
- **Approval (support team):** standard complaints (app slow, login issues, feature requests): AI draft + one-click approve/edit.
- **Human-only (with AI summary):** reviews mentioning fraud, unauthorised transactions, legal threats, account numbers or personal data, discrimination, or regulators.
- **Routing rules:** keyword and classifier flags for high-risk topics; star rating 1 + mentions of money loss → human-only; drafts failing tone/compliance checks → rewrite before review.
- **Reviewer UI:** review text, user’s app version, matched help article, AI draft with any factual claims highlighted; buttons Approve / Edit / Escalate; reason picker on edits.
- **Metrics:** median response time to reviews; % drafts approved without edits; complaint escalations correctly flagged (audit); later, rating trend for responded reviews.
```

## Quiz

```quiz
Q: What does human-in-the-loop mean?
- [ ] Humans train every model from scratch :: Not what HITL refers to.
- [x] Humans are part of the process, approving, correcting or handling AI outputs where needed :: Correct. People step in where stakes or uncertainty are high.
- [ ] AI replaces all human work :: That’s full automation.
- [ ] Users must log in twice :: Unrelated: HITL is about review of AI outputs, not authentication.

Q: Which case most needs human approval before action?
- [ ] Suggesting a playlist name :: Low stakes, easy to change.
- [x] Approving a ₹2 lakh refund flagged as unusual :: Correct. High stakes and risk signals call for human judgement.
- [ ] Sorting emails into folders :: Low stakes and reversible.
- [ ] Generating a draft social post for the user to edit :: The user already reviews it.

Q: What is automation bias?
- [ ] AI favouring certain users :: That’s a fairness issue.
- [x] People accepting AI suggestions without properly checking them :: Correct. Design reviews to counter it.
- [ ] Automating too few tasks :: Not the definition.
- [ ] A type of model training :: Unrelated: automation bias is a human tendency, not a training method.

Q: Why capture reviewers’ corrections?
- [ ] To blame reviewers :: Not the purpose.
- [x] They’re labelled data that improves prompts, retrieval and models over time :: Correct. That’s the flywheel.
- [ ] Regulations ban it :: Generally not.
- [ ] To slow down the process :: Capturing corrections should be lightweight.

Q: Your AI handles low-risk cases with 99% accuracy in evals. What’s a sensible review approach?
- [ ] Review 100% of cases forever :: Wastes effort on safe cases.
- [x] Automate them with random sample audits and monitoring :: Correct. Human-on-the-loop for safe, reliable cases.
- [ ] Never check again :: You still need monitoring for drift.
- [ ] Turn the AI off :: Throws away a reliable system.
```

## Key takeaways

- **HITL** puts humans where **stakes are high, reversibility is low, or AI confidence is weak**.
- Humans can **approve, audit, handle escalations or label** data.
- Use **confidence and risk-based routing**, not LLM self-confidence alone.
- Design reviewers’ work well: **evidence, highlights, quick actions**, and guards against **automation bias**.
- Capture corrections for the **improvement flywheel**; track **automation rate and error rate** together.
