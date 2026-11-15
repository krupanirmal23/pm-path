---
id: w13-design-framework
title: The product design framework
week: 13
estimatedMinutes: 17
tags: [interviews, product-sense, design]
---

## Why this matters for a PM

“Design a product for X” is the most common product sense question in PM interviews: “Design an app for elderly people to manage medicines”, “Design a feature for Zomato to reduce food waste”, “Design a product for first-time investors.” Interviewers aren’t judging your idea; they’re judging how you think: understanding users, choosing a focus, generating options, making trade-offs and defining success. A reliable structure lets you think clearly under pressure.

## Core concepts

### What interviewers assess

1. **Structured thinking:** a clear, logical path.
2. **User empathy:** real, specific users and pain points.
3. **Prioritisation:** choosing a segment and a problem, with reasons.
4. **Creativity:** several distinct solutions, at least one non-obvious.
5. **Product judgement:** trade-offs, risks, MVP thinking.
6. **Metrics:** how you’d measure success.
7. **Communication:** thinking aloud, checking in, time management.

### A structure that works (the CIRCLES-style flow)

Many candidates use a variant of the well-known **CIRCLES** framework (Comprehend, Identify customers, Report needs, Cut through prioritisation, List solutions, Evaluate trade-offs, Summarise). A practical version:

1. **Clarify (2–3 min):** restate the prompt; ask 2–4 questions about goal, scope, constraints and context. “Is this a new standalone app or a feature in an existing product? Any geography? Is the goal engagement, revenue, or social impact?” If the interviewer says “your call”, state assumptions and move on.
2. **Goal / mission (1 min):** what success means for the company and users. “For Zomato, reducing food waste could strengthen brand trust and restaurant margins.”
3. **Users / segments (3–4 min):** list 3–4 segments; pick one with explicit reasoning (size, pain, alignment with the goal, underserved).
4. **Pain points / needs (4–5 min):** for the chosen segment, walk through their journey and list 3–5 pain points; prioritise 1–2 (frequency × severity × goal fit).
5. **Solutions (6–8 min):** brainstorm 3–4 distinct solutions (include one bold, one simple). Briefly describe each.
6. **Prioritise and detail (5 min):** evaluate solutions (impact vs. effort, risks); pick one; describe the MVP and the key user flow or screen.
7. **Metrics (3 min):** North Star/primary metric for the feature, 2–3 supporting metrics, 1–2 guardrails.
8. **Risks and next steps (2 min):** biggest risks (four risks) and how you’d test them; v2 ideas.
9. **Summarise (1 min):** user, problem, solution, metric in four sentences.

Total: ~35–40 minutes. Adjust if the interviewer wants to go deep somewhere.

### Choosing a segment well

Good segment choices are **specific and behavioural**: “working parents who order groceries late at night”, not “millennials”. Explain the choice:
- **Size:** many users?
- **Pain intensity:** how bad is the problem?
- **Business alignment:** does solving it serve the goal?
- **Underserved:** do current solutions fail them?

### Generating solutions that aren’t obvious

Push beyond the first idea:
- **Different levels:** a small feature, a new flow, a new service, a partnership, an operational change.
- **Different technologies:** a simple UI fix, notifications, AI, offline/operational solutions.
- **Steal from analogous domains:** what do other industries do?
- **Remove instead of add:** can you delete a step?
- Include **one AI-powered** option where it genuinely fits (expected in many interviews now), but justify why AI beats simpler options.

### Communicating while you think

- **Signpost:** “I’ll clarify, choose a user, find pain points, brainstorm, prioritise, then define metrics.”
- **Think aloud** and **check in** at transitions: “Does this segment work for you, or should I explore another?”
- **Use the whiteboard/paper** to list segments, pains and solutions; it shows structure.
- **Be decisive:** pick and justify; don’t hedge forever.

### Common variants

- **Design X for Y** (a product for a group).
- **Design a feature for an existing product** (stay within the product’s strategy).
- **Design something for an unusual user** (“a fridge for the blind”, “an ATM for children”) tests empathy and creativity.
- **Design an AI feature** (Week 14 AI PM cases).

## Worked example

**Prompt:** “Design a product to help elderly people in India manage their medicines.”

1. **Clarify:** New product or feature in an existing app? (Assume a new app, possibly with a family companion.) Goal? (Assume improving adherence, i.e., taking the right medicine at the right time, with a sustainable business later.) Constraints? (Varying smartphone comfort; many use Android; multiple languages.)
2. **Goal:** help elderly people take medicines correctly and give families peace of mind.
3. **Segments:**
   - Tech-comfortable seniors living alone.
   - Seniors with low smartphone comfort living with family.
   - Seniors living alone with family in another city (adult children in Bengaluru, parents in a smaller town).
   - Caregivers (paid attendants).
   **Choose:** seniors living alone with family in another city: high pain (no one to remind or notice missed doses), high anxiety for children, a clear payer (the adult child).
4. **Pain points (journey: get prescription → buy → organise → take → refill → report to doctor):**
   - Forgetting doses or double-dosing.
   - Confusing similar-looking pills and changed prescriptions.
   - Running out before refilling.
   - Children not knowing if doses were taken.
   - Small text on labels; English-only instructions.
   **Prioritise:** missed/double doses + family visibility (most frequent and most anxiety-causing).
5. **Solutions:**
   - A: A simple reminder app with large buttons, voice reminders in the senior’s language, and “Taken” confirmation shared with the child.
   - B: A smart pill box (hardware) that lights up and logs openings.
   - C: Pharmacy partnership delivering pre-sorted daily packets (morning/night) with refill automation.
   - D: AI: photograph the prescription to auto-create the schedule (with pharmacist/family verification), plus a weekly voice check-in call.
6. **Prioritise:** A + D-lite for MVP: works on existing phones, cheap to test; prescription photo → draft schedule that the child confirms (human-in-the-loop for safety). C is a strong v2 (business model). B is expensive to start.
   **MVP flow:** child sets up the parent’s schedule (photo of prescription → AI draft → child edits and confirms) → parent gets a full-screen, voice reminder in Kannada/Hindi with one big “Taken” button → if no tap in 30 minutes, a second reminder; if still none, child gets a notification → weekly summary to the child.
7. **Metrics:** primary: % of scheduled doses confirmed on time (adherence). Supporting: reminders acknowledged within 30 minutes; refills ordered before running out; child weekly active. Guardrails: notification fatigue (opt-outs), schedule errors reported (safety).
8. **Risks:** usability for low-tech seniors (test with 5 seniors); AI misreading prescriptions (child must confirm; never auto-schedule); privacy (health data, DPDP consent). Next: pharmacy partnership for refills.
9. **Summary:** “For seniors living alone with family elsewhere, I’d build a voice-first medicine reminder that confirms doses and alerts their children when doses are missed, with AI-assisted setup from a prescription photo. Success is on-time dose confirmation, protected by safety checks and low notification fatigue.”

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 230" role="img" aria-labelledby="df-t df-d">
<title id="df-t">Product design interview flow</title>
<desc id="df-d">Nine steps in sequence with rough timings: clarify, goal, users, pain points, solutions, prioritise, metrics, risks, summary.</desc>
<defs><marker id="df-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<g font-size="10">
<rect x="10" y="30" width="105" height="56" rx="8" class="d-lavender d-ink" stroke-width="2"/><text x="20" y="54" class="d-text-dark" font-weight="700">1 Clarify</text><text x="20" y="72" class="d-text-dark">2–3 min</text>
<rect x="135" y="30" width="105" height="56" rx="8" class="d-lavender d-ink" stroke-width="2"/><text x="145" y="54" class="d-text-dark" font-weight="700">2 Goal</text><text x="145" y="72" class="d-text-dark">1 min</text>
<rect x="260" y="30" width="105" height="56" rx="8" class="d-sky d-ink" stroke-width="2"/><text x="270" y="54" class="d-text-dark" font-weight="700">3 Users → pick</text><text x="270" y="72" class="d-text-dark">3–4 min</text>
<rect x="385" y="30" width="105" height="56" rx="8" class="d-sky d-ink" stroke-width="2"/><text x="395" y="54" class="d-text-dark" font-weight="700">4 Pains → pick</text><text x="395" y="72" class="d-text-dark">4–5 min</text>
<rect x="510" y="30" width="115" height="56" rx="8" class="d-mint d-ink" stroke-width="2"/><text x="520" y="54" class="d-text-dark" font-weight="700">5 Solutions (3–4)</text><text x="520" y="72" class="d-text-dark">6–8 min</text>
<rect x="385" y="130" width="105" height="56" rx="8" class="d-mint d-ink" stroke-width="2"/><text x="395" y="154" class="d-text-dark" font-weight="700">6 Prioritise + MVP</text><text x="395" y="172" class="d-text-dark">5 min</text>
<rect x="260" y="130" width="105" height="56" rx="8" class="d-butter d-ink" stroke-width="2"/><text x="270" y="154" class="d-text-dark" font-weight="700">7 Metrics</text><text x="270" y="172" class="d-text-dark">3 min</text>
<rect x="135" y="130" width="105" height="56" rx="8" class="d-peach d-ink" stroke-width="2"/><text x="145" y="154" class="d-text-dark" font-weight="700">8 Risks + next</text><text x="145" y="172" class="d-text-dark">2 min</text>
<rect x="10" y="130" width="105" height="56" rx="8" class="d-pink d-ink" stroke-width="2"/><text x="20" y="154" class="d-text-dark" font-weight="700">9 Summarise</text><text x="20" y="172" class="d-text-dark">1 min</text>
</g>
<g class="d-ink" stroke-width="2"><line x1="117" y1="58" x2="131" y2="58" marker-end="url(#df-a)"/><line x1="242" y1="58" x2="256" y2="58" marker-end="url(#df-a)"/><line x1="367" y1="58" x2="381" y2="58" marker-end="url(#df-a)"/><line x1="492" y1="58" x2="506" y2="58" marker-end="url(#df-a)"/><line x1="567" y1="88" x2="492" y2="140" marker-end="url(#df-a)"/><line x1="383" y1="158" x2="369" y2="158" marker-end="url(#df-a)"/><line x1="258" y1="158" x2="244" y2="158" marker-end="url(#df-a)"/><line x1="133" y1="158" x2="119" y2="158" marker-end="url(#df-a)"/></g>
<text x="140" y="218" class="d-text" font-size="11">Spend most time on users, pains and solutions; always pick and justify.</text>
</svg>
<figcaption>A repeatable path for any “design X for Y” question, about 35–40 minutes.</figcaption>
</figure>

## Step by step

Practising product design answers (deliverable: 5 recorded answers):

1. **Pick a prompt** from Interview Prep (product design category).
2. **Set a 35-minute timer** in Mock Interview mode.
3. **Say the structure aloud** first (signposting).
4. **Clarify, then state assumptions.**
5. **List 3–4 segments; pick one with reasons.**
6. **Walk the journey; list and prioritise pains.**
7. **Brainstorm 3–4 distinct solutions**; include one bold and one simple.
8. **Choose and detail the MVP**, with a flow.
9. **Define metrics and guardrails.**
10. **Risks, next steps, summary.**
11. **Record on Loom**, self-score with the rubric, and redo the weakest section.

## Common mistakes

1. **Jumping to solutions** in the first minute.
2. **Vague segments** (“young people”).
3. **Listing pains without prioritising.**
4. **One solution only**, or many shallow ones.
5. **No metrics**, or vanity metrics.
6. **Not checking in**, so the interviewer can’t steer you.

## How it shows up in interviews

> [!INTERVIEW]
> **“Design a product to help people in Bengaluru commute better.”**
> Outline: clarify (city, mode, goal) → segments (daily office commuters by metro+last-mile, two-wheeler riders, women commuting late, students) → pick one → journey pains → 3–4 solutions (multimodal planner with live last-mile availability, office shuttle pooling, safe-route features) → MVP → metrics (on-time arrival, trips planned, repeat use) → risks.

> [!INTERVIEW]
> **“Design a feature for Swiggy to reduce food waste.”**
> Outline: stay within Swiggy’s goals → segments (restaurants with surplus, price-sensitive users, NGOs) → pains → solutions (end-of-day surplus deals, portion-size guidance, donation pickups) → choose one → metrics (surplus meals sold, restaurant margin, guardrail: cannibalisation of full-price orders).

## Practice exercise

**Task (40 minutes):** Answer “Design an app to help first-time voters in India” using the 9 steps. Write bullet notes for each step; then record a 30-minute spoken version.

```answer Reveal a model answer outline
1. **Clarify:** non-partisan civic information app? (Assume yes; goal: help first-time voters register and vote confidently; no political persuasion.)
2. **Goal:** increase informed participation among first-time voters.
3. **Segments:** college students living away from home (registered in hometown); young working migrants in cities; first-time voters in rural areas; students with disabilities. **Pick:** young working migrants and students living away from home (confusion about where/how to vote, high drop-off).
4. **Pains:** don’t know if they’re registered or where; unclear process to shift constituency; don’t know polling date/booth; logistics of travelling home; little neutral info about candidates. **Prioritise:** registration status + booth/date logistics.
5. **Solutions:** (A) “Am I ready to vote?” checklist with registration status lookup via official sources and reminders; (B) booth finder with travel planning and calendar integration; (C) campus/office voter registration drives toolkit; (D) AI assistant answering process questions grounded strictly in official Election Commission information, in Indian languages.
6. **Prioritise:** A + B as MVP (core blockers, low risk); D later with strict grounding and neutrality guardrails. Flow: enter details → status → steps to register or shift → booth and date → reminders.
7. **Metrics:** % of users who complete the readiness checklist; reminder-to-vote-day engagement; self-reported voting (survey). Guardrails: accuracy complaints; any partisan content incidents (must be zero).
8. **Risks:** data accuracy (link to official sources); trust/neutrality; privacy of voter details. Next: accessibility features for voters with disabilities.
9. **Summary:** one-sentence recap of user, problem, solution, metric.
```

## Quiz

```quiz
Q: What’s the first thing to do when given a product design prompt?
- [ ] Propose your best feature idea immediately :: Skips understanding the problem and users.
- [x] Clarify the goal, scope and constraints, or state assumptions :: Correct. It frames everything that follows.
- [ ] Draw the final screen :: Too early: you don’t yet know the user or problem.
- [ ] List all metrics :: Metrics come after you know the solution.

Q: Which segment choice is strongest?
- [ ] Millennials :: Too broad and demographic.
- [x] Seniors living alone whose children live in another city :: Correct. Specific situation, clear pain, clear payer.
- [ ] Everyone who takes medicine :: Too broad to design for.
- [ ] People with phones :: Not a meaningful segment.

Q: Why brainstorm 3–4 distinct solutions before choosing?
- [ ] To fill time :: Not the purpose.
- [x] To show creativity and make the final choice a real trade-off decision :: Correct. Comparing options demonstrates judgement.
- [ ] Interviewers require exactly four :: No fixed number.
- [ ] Because you’ll build all of them :: You choose one for the MVP.

Q: What makes a good metric for a medicine reminder app?
- [ ] App downloads :: Vanity; doesn’t show doses taken.
- [x] Percentage of scheduled doses confirmed on time :: Correct. Reflects the core value.
- [ ] Time spent in the app :: More time may mean confusion.
- [ ] Number of screens :: Not a user outcome.

Q: Why check in with the interviewer during the answer?
- [ ] To ask for the answer :: You’re expected to drive.
- [x] It lets them steer you towards what they want to evaluate and shows collaboration :: Correct. You get hints and show you work well with others.
- [ ] To use up time :: Not the reason.
- [ ] It’s required after every sentence :: Check in at transitions, not constantly.

Q: How should you include an AI solution in a design answer?
- [ ] Always lead with AI because it’s trendy :: AI must fit the problem.
- [x] Include it when it genuinely beats simpler options, and explain safeguards :: Correct. Justified AI shows judgement; forced AI shows hype.
- [ ] Never mention AI :: It’s often expected and can be the best option.
- [ ] Only mention AI in the summary :: Treat it as a real option with trade-offs.
```

## Key takeaways

- Interviewers judge **thinking**: structure, empathy, prioritisation, creativity, judgement, metrics, communication.
- Flow: **clarify → goal → users (pick) → pains (pick) → solutions (3–4) → prioritise + MVP → metrics → risks → summary**.
- Choose **specific, behavioural segments** with explicit reasons.
- Generate **distinct** solutions (include a bold and a simple one; AI only where it fits).
- **Signpost, think aloud, check in, and be decisive**; practise with a timer and recordings.
