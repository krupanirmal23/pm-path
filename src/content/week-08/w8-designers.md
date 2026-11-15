---
id: w8-designers
title: Working with designers
week: 8
estimatedMinutes: 13
tags: [ux, collaboration, stakeholders]
---

## Why this matters for a PM

Designers turn problems into experiences people can use and love. The PM–designer relationship can be the most creative partnership in a product team, or a frustrating tug-of-war over pixels and deadlines. PMs who involve designers early, give them real problems (not solutions to decorate), and protect time for exploration get much better products. Interviewers often probe this with “Tell me about a disagreement with a designer.”

## Core concepts

### What product designers do

**Product designers** (also called UX/UI designers) own the user experience: understanding users, defining flows and information architecture, creating wireframes and prototypes, visual design, interaction details, usability testing, and design quality. Larger teams split roles:
- **UX researcher:** plans and runs research studies.
- **Interaction designer:** flows, behaviour, states.
- **Visual/UI designer:** layout, typography, colour, iconography.
- **Content designer / UX writer:** the words in the product: labels, errors, onboarding.

In most Indian startups, one product designer covers most of these.

### The double diamond

The **double diamond** is a common model of the design process:
1. **Discover** (diverge): research the problem broadly.
2. **Define** (converge): agree on the specific problem to solve.
3. **Develop** (diverge): explore many possible solutions.
4. **Deliver** (converge): refine, test and ship the best one.

PMs often want to jump from “define” straight to “deliver”. Protecting the **develop** stage (exploring options) is where a lot of design value comes from.

### What designers need from PMs

- **A clear problem and goal**, with evidence and success metrics, not a sketched solution.
- **Constraints up front**: timeline, technical limits, legal requirements, business rules (“refunds take 5–7 days”).
- **Access to users and data.**
- **Time to explore** before converging.
- **Decisions made quickly** when trade-offs arise.
- **Air cover in reviews**: support decisions backed by evidence, even when a senior leader prefers something else.
- **Credit** for their work.

### What PMs need from designers

- Multiple options with trade-offs, not one “final” design.
- Early, rough work (so feedback can shape it).
- Designs for all **states** (empty, loading, error, edge cases).
- Collaboration with engineers on feasibility.
- Participation in testing and learning after launch.

### Design reviews and critiques

A **design critique** is a session where designs are reviewed against goals. Good critiques:
- **Start with context**: the problem, user, goals, constraints and the stage (early exploration or final polish).
- **Focus on goals, not taste**: “Does this help a first-time user understand their balance?” rather than “I prefer blue.”
- **Ask questions before suggesting**: “What led you to put the action here?”
- **Separate levels**: flow/structure issues first, then content, then visuals.
- **End with clear next steps.**

A useful feedback formula: **“I notice [observation]. I’m concerned that [user impact]. What if we [suggestion], or how might we [question]?”**

### Handoff and collaboration with engineering

**Design handoff** is when designs are ready for development. Good handoffs include:
- Final screens for all states and breakpoints (screen sizes).
- Specs: spacing, typography, colours (usually inspectable in Figma’s Dev Mode).
- Interaction notes (animations, transitions, gestures).
- Assets (icons, images) exported properly.
- Copy finalised, with translations if needed.
- Links to the PRD and stories.

Better than a one-time handoff: **continuous collaboration**, where engineers see designs early and designers stay involved during development to answer questions and review the build (**design QA**).

### Healthy disagreement

- **Agree on the problem and goal first**; most disagreements are really about goals.
- **Use evidence**: research, data, usability tests, heuristics.
- **Test options** when the debate is genuine: a quick usability test settles many arguments.
- **Respect ownership**: designers own the experience craft; PMs own priorities and scope; final calls on trade-offs are made together.
- **Disagree and commit** once decided.

## Worked example

**Situation:** You’re the PM for Zepto’s “scheduled orders” feature. The designer proposes a calendar-based scheduling flow with 30-minute slots across 7 days. Engineering says it’s complex. You have 4 weeks.

**A poor PM response:** “Just put a dropdown for tomorrow morning. Make it look nice.” (Prescribes the solution; ignores the designer’s reasoning.)

**A strong PM response:**
1. **Re-anchor on the problem:** research shows 80% of scheduling intent is “tomorrow morning” from late-night shoppers.
2. **Ask about the designer’s reasoning:** they designed for future flexibility (“we’ll need multi-day later”).
3. **Share constraints:** 4 weeks; slot capacity only exists for next-morning slots in v1 (operations).
4. **Explore together:** the designer produces 3 options: A) full calendar; B) a simple “Deliver tomorrow at: 7–8, 8–9, 9–10” chooser; C) B now, designed so it can expand to a calendar later.
5. **Quick test:** 5 users try B and C prototypes; both work; C feels familiar.
6. **Decision:** ship C. The designer documents the future multi-day pattern in the design system.
7. **Credit:** in the launch update, you thank the designer for the extensible pattern.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 220" role="img" aria-labelledby="dd-t dd-d">
<title id="dd-t">The double diamond</title>
<desc id="dd-d">Two diamonds side by side: discover and define for the problem, develop and deliver for the solution.</desc>
<polygon points="20,110 165,30 310,110 165,190" class="d-lavender d-ink" stroke-width="2"/>
<polygon points="330,110 475,30 620,110 475,190" class="d-mint d-ink" stroke-width="2"/>
<line x1="165" y1="30" x2="165" y2="190" class="d-ink" stroke-width="1" stroke-dasharray="4 4"/>
<line x1="475" y1="30" x2="475" y2="190" class="d-ink" stroke-width="1" stroke-dasharray="4 4"/>
<text x="70" y="105" class="d-text-dark" font-weight="700" font-size="13">Discover</text><text x="70" y="122" class="d-text-dark" font-size="10">diverge</text>
<text x="190" y="105" class="d-text-dark" font-weight="700" font-size="13">Define</text><text x="190" y="122" class="d-text-dark" font-size="10">converge</text>
<text x="380" y="105" class="d-text-dark" font-weight="700" font-size="13">Develop</text><text x="380" y="122" class="d-text-dark" font-size="10">diverge</text>
<text x="500" y="105" class="d-text-dark" font-weight="700" font-size="13">Deliver</text><text x="500" y="122" class="d-text-dark" font-size="10">converge</text>
<text x="105" y="212" class="d-text" font-size="12">Right problem</text>
<text x="420" y="212" class="d-text" font-size="12">Right solution</text>
</svg>
<figcaption>Protect the “develop” stage: exploring options is where much of design’s value appears.</figcaption>
</figure>

## Step by step

Working with a designer on a P1-style feature:

1. **Write a design brief** (1 page): problem, users, evidence, goals and metrics, constraints, timeline, open questions.
2. **Kickoff together** with engineering; walk through research.
3. **Agree on stages and fidelity**: exploration (lo-fi) by date X, direction review, then mid-fi for testing.
4. **Review early and often** using the critique formula.
5. **Test** the leading options with users; decide with evidence.
6. **Finalise states and copy** together.
7. **Plan the handoff** and design QA during development.
8. **Share results after launch** with the designer.

## Common mistakes

1. **Bringing solutions instead of problems.**
2. **Asking for “pixel-perfect” too early.**
3. **Feedback based on personal taste.**
4. **Skipping the exploration stage** due to deadlines without discussing trade-offs.
5. **Involving designers after the PRD is final.**
6. **Forgetting design QA**, so the built product drifts from the design.

## How it shows up in interviews

> [!INTERVIEW]
> **“Tell me about a time you disagreed with a designer.”**
> Outline (STAR): context and the disagreement → how you re-anchored on the problem and goal → evidence and options you explored together → how you tested or decided → outcome → relationship and what you learned.

> [!INTERVIEW]
> **“How do you give feedback on designs?”**
> Outline: understand the stage and goal → observations tied to user impact → questions before suggestions → prioritise structure over visual detail → back with evidence → clear next steps.

## Practice exercise

**Task (20 minutes):** Write a one-page **design brief** for your P1 feature using the structure: problem, users, evidence, goals/metrics, constraints, scope (in/out), timeline, open questions. Then write 3 pieces of feedback using the formula “I notice… I’m concerned that… What if / how might we…” on any screen of an app you use.

```answer Reveal a model answer (feedback examples)
1. “I notice the delivery fee appears only on the final payment screen. I’m concerned that first-time users will feel surprised and abandon the order. How might we show an estimated total earlier in the cart?”
2. “I notice there are three equally prominent buttons on the order confirmation screen. I’m concerned that users won’t see ‘Track order’, which is what most need next. What if ‘Track order’ were the primary action and the others secondary?”
3. “I notice the error message after a failed payment says ‘Something went wrong’. I’m concerned that users won’t know whether money was deducted and will contact support. How might we explain what happened and what to do next?”

**Design brief outline (P1):** Problem (flatmates avoid asking for money; balances pile up) · Users (primary persona) · Evidence (5 of 6 interviews; beta data) · Goals (groups settled within 5 days: 30% → 50%) · Constraints (UPI intent only; 4 weeks; Android first) · In scope (summary, settle, dispute) / Out (partial payments, multi-currency) · Timeline (explore by Wed, test Fri, final next Wed) · Open questions (single payee vs. multiple?).
```

## Quiz

```quiz
Q: What should a PM bring to a designer at the start of a project?
- [ ] A finished screen layout to polish :: That skips design exploration and wastes the designer’s skills.
- [x] A clear problem, users, evidence, goals and constraints :: Correct. That’s what a design brief contains.
- [ ] Only the deadline :: Deadlines matter, but without the problem the designer can’t do good work.
- [ ] A competitor’s screenshots to copy :: Inspiration is fine; copying skips the actual problem.

Q: In the double diamond, what happens in the “develop” stage?
- [ ] Research the problem broadly :: That’s discover.
- [ ] Agree on the problem :: That’s define.
- [x] Explore many possible solutions :: Correct. It’s the second diverging stage.
- [ ] Ship the final product :: That’s deliver.

Q: Which feedback is most useful?
- [ ] I don’t like this shade of green :: Personal taste with no user impact.
- [x] I’m concerned new users won’t notice the fee breakdown before paying; how might we surface it earlier? :: Correct. It ties an observation to user impact and invites solutions.
- [ ] Make everything bigger :: Vague and prescriptive.
- [ ] Copy Swiggy :: Not tied to your users or goals.

Q: What is design QA?
- [ ] Testing the designer’s skills :: Not what it means.
- [x] Reviewing the built product against the designs before release :: Correct. It catches drift between design and implementation.
- [ ] Usability testing with users :: Related, but design QA checks implementation fidelity.
- [ ] A/B testing colours :: Unrelated: design QA checks the build matches the design.

Q: A designer and you disagree on a flow. What’s the best first step?
- [ ] Escalate to your manager :: Try to resolve it together first.
- [x] Re-anchor on the problem and goal, then compare options with evidence :: Correct. Many disagreements are about goals.
- [ ] Override them because you’re the PM :: PMs don’t own design craft decisions alone.
- [ ] Let them do whatever they want :: Collaboration means shared decisions on trade-offs.
```

## Key takeaways

- Designers own the **experience**; PMs own **problem, priorities and scope**; trade-offs are decided **together**.
- Bring a **design brief**: problem, users, evidence, goals, constraints.
- Protect the **explore (develop) stage** of the double diamond.
- Give feedback on **goals and user impact**, not taste: “I notice… I’m concerned… how might we…”
- Collaborate continuously through **handoff and design QA**, and share credit.
