---
id: w3-moscow-impact-effort
title: MoSCoW and impact vs. effort
week: 3
estimatedMinutes: 12
tags: [prioritization, frameworks, moscow]
---

## Why this matters for a PM

RICE is great for ranking a long list carefully. But often you need something faster: deciding what goes into a release with a fixed deadline, or sorting 20 ideas in a 30-minute workshop. **MoSCoW** and the **impact vs. effort 2x2** are the quick tools for those moments. You’ll use the 2x2 in Miro this week.

## Core concepts

### MoSCoW

**MoSCoW** sorts requirements for a specific release or time box into four buckets:

- **Must have:** without it, the release fails or is unusable, illegal or unsafe. If you’re unsure whether something is a Must, ask: “Would we delay the launch if this weren’t ready?” If no, it’s not a Must.
- **Should have:** important and valuable, but the release still works without it. There may be a painful workaround.
- **Could have:** nice to have; small impact; included only if time allows.
- **Won’t have (this time):** explicitly out of scope for this release. Listing these prevents scope creep and sets expectations.

(The lowercase “o”s are just there to make the word pronounceable.)

**A healthy split:** roughly 60% Must (by effort), 20% Should, 20% Could. If almost everything is a Must, you have no flexibility when estimates slip, and they will.

**When to use MoSCoW:** fixed-deadline releases (a festive sale launch, a regulatory date), scoping an MVP, agreeing scope with stakeholders.

**Limitations:** it doesn’t tell you the order within a bucket, and without discipline everything becomes a Must.

### Impact vs. effort 2x2

Plot ideas on a simple grid:
- **Vertical axis: impact** on your goal (low → high).
- **Horizontal axis: effort** (low → high).

The four quadrants:
1. **Quick wins (high impact, low effort):** do these first.
2. **Big bets (high impact, high effort):** plan them carefully; break into smaller pieces; de-risk first.
3. **Fill-ins (low impact, low effort):** do when there’s spare capacity, or batch them.
4. **Money pits / time sinks (low impact, high effort):** avoid.

**Why it’s useful:** it’s visual and fast. A team can sort 20 sticky notes in 15 minutes and immediately see quick wins and traps.

**Limitations:** “impact” and “effort” are rough; it ignores confidence and reach (RICE handles these); and people cluster everything in the middle. Force decisions by asking “is this *really* higher impact than that?”.

### Choosing the right tool

| Situation | Best tool |
|---|---|
| Ranking 10–30 ideas for a roadmap, with data | RICE |
| Deciding what kind of value a feature adds | Kano |
| Fixed deadline, scoping a release | MoSCoW |
| Quick team workshop to sort ideas visually | Impact vs. effort 2x2 |
| Explaining sequencing to leadership | Now / Next / Later roadmap (later lesson) |

Many PMs combine them: a 2x2 workshop to shortlist, RICE to rank the shortlist, MoSCoW to scope the first release.

## Worked example

**Context: Swiggy wants a “Diwali gifting” feature live 3 weeks before Diwali (fixed date). The team has 6 weeks of capacity.**

**MoSCoW for the launch:**
- **Must:** browse a gifting collection (sweets, dry fruits, hampers); send to a different address; gift message; schedule delivery date; payment works with existing methods.
- **Should:** track multiple gift orders on one screen; GST invoice for corporate buyers.
- **Could:** animated gift card; video message; suggest gifts based on past orders.
- **Won’t (this time):** bulk upload of 500 addresses for corporates; international delivery; gift wrapping customisation.

The team estimates Musts at ~4 weeks, Shoulds at ~1 week, Coulds at ~2 weeks. They commit to Musts + Shoulds, and try one Could if things go well.

**Impact vs. effort workshop (goal: increase festive gifting orders):**
- Quick wins: gifting collection banner on home; gift message field.
- Big bets: scheduled delivery across cities; corporate bulk gifting.
- Fill-ins: gift-themed animation.
- Money pits: video messages (high effort for storage and moderation, low expected impact).

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 300" role="img" aria-labelledby="ie-t ie-d">
<title id="ie-t">Impact versus effort 2x2</title>
<desc id="ie-d">Four quadrants: quick wins (high impact, low effort), big bets (high impact, high effort), fill-ins (low impact, low effort), money pits (low impact, high effort).</desc>
<rect x="80" y="20" width="260" height="125" class="d-mint d-ink" stroke-width="2"/>
<rect x="340" y="20" width="260" height="125" class="d-sky d-ink" stroke-width="2"/>
<rect x="80" y="145" width="260" height="125" class="d-butter d-ink" stroke-width="2"/>
<rect x="340" y="145" width="260" height="125" class="d-pink d-ink" stroke-width="2"/>
<text x="96" y="50" class="d-text-dark" font-weight="700" font-size="16">Quick wins</text>
<text x="96" y="72" class="d-text-dark" font-size="12">Do first</text>
<text x="356" y="50" class="d-text-dark" font-weight="700" font-size="16">Big bets</text>
<text x="356" y="72" class="d-text-dark" font-size="12">Plan, de-risk, slice</text>
<text x="96" y="175" class="d-text-dark" font-weight="700" font-size="16">Fill-ins</text>
<text x="96" y="197" class="d-text-dark" font-size="12">If spare capacity</text>
<text x="356" y="175" class="d-text-dark" font-weight="700" font-size="16">Money pits</text>
<text x="356" y="197" class="d-text-dark" font-size="12">Avoid</text>
<text x="280" y="292" class="d-text" font-size="12">Effort →</text>
<text x="40" y="170" class="d-text" font-size="12" transform="rotate(-90 40 170)">Impact →</text>
</svg>
<figcaption>Fast and visual. Use it to shortlist; use RICE to rank the shortlist.</figcaption>
</figure>

## Step by step

**Running a 30-minute 2x2 session for P1:**
1. **State the goal** at the top of the Miro board.
2. **Put each idea on a sticky** (one sentence each).
3. **Place effort first**: ask an engineer (or technical friend) to place notes left to right, relative to each other.
4. **Then place impact**: you and a designer (or friend) move notes up or down, based on research.
5. **Challenge the middle**: anything near the centre must move to a side.
6. **Circle quick wins and big bets.**
7. **Write next steps**: quick wins → Now; big bets → plan a de-risking test; money pits → Won’t.

**Scoping a release with MoSCoW:**
1. List every requirement for the release.
2. Ask the “would we delay launch?” question for each to identify Musts.
3. Sort the rest into Should / Could.
4. Write an explicit Won’t list and share it with stakeholders.
5. Check the effort split (~60/20/20). If Musts exceed ~60%, cut or simplify.

## Common mistakes

1. **Everything is a Must.** Then nothing can flex when estimates slip.
2. **No Won’t list.** Scope creeps back in through “quick” requests.
3. **PM places effort alone.** Effort must come from the people doing the work.
4. **Everything in the middle of the 2x2.** Force relative choices.
5. **Treating the 2x2 as final.** It’s a shortlist tool; follow up with RICE or tests.
6. **Using MoSCoW for long-term roadmaps.** It’s best for a specific release or time box.

## How it shows up in interviews

> [!INTERVIEW]
> **“You have a fixed launch date and the team says it can’t finish everything. What do you do?”**
> Outline: list requirements → MoSCoW with the “would we delay?” test → protect Musts → cut or simplify Shoulds/Coulds → explicitly communicate the Won’t list → consider phased release → keep quality and guardrails intact.

> [!INTERVIEW]
> **“How do you handle a stakeholder who says everything is a must-have?”**
> Outline: agree on the goal → ask “would we delay the launch for this?” for each item → show the effort maths (all Musts = no buffer) → offer trade-offs (“if this is in, what comes out?”) → document the decision.

## Practice exercise

**Task (25 minutes):** You’re launching **UPI payments in a small e-commerce app** in 4 weeks for a festival sale. Sort these 10 requirements with MoSCoW and explain your Musts.

1. Pay with any UPI app via intent/QR
2. Show payment success/failure clearly
3. Refund to UPI for cancelled orders
4. Save preferred UPI app
5. UPI AutoPay for subscriptions
6. Retry a failed payment without re-entering the cart
7. Cashback offers on UPI
8. Payment analytics dashboard for the finance team
9. Handle “pending” payments with automatic status checks
10. Dark-mode payment screen

```answer Reveal a model answer
**Must:** 1 (core function), 2 (users must know if they paid), 3 (cancellations happen; refunds are legally and ethically required), 9 (pending states are common with UPI; without status checks you get double payments and angry users).
*Test:* we would delay the launch if any of these weren’t ready.

**Should:** 6 (retry flow: big conversion impact, but users can go back to the cart as a workaround); 8 (finance needs reconciliation, but can use the payment gateway’s dashboard at first).

**Could:** 4 (save preferred app), 7 (cashback offers, if marketing provides budget).

**Won’t (this time):** 5 (AutoPay: separate project), 10 (dark mode: indifferent for this launch).
```

## Quiz

```quiz
Q: What’s the best test for whether a requirement is a “Must have”?
- [ ] The CEO asked for it :: Seniority doesn’t define necessity.
- [x] Would we delay the launch if it weren’t ready? :: Correct. If not, it isn’t a Must.
- [ ] It has the highest RICE score :: RICE measures value per effort, not launch necessity.
- [ ] Users mentioned it once :: One mention doesn’t make it essential.

Q: Why is the “Won’t have” list important?
- [ ] It makes the document longer :: Not the purpose.
- [x] It sets clear expectations and prevents scope creep :: Correct. Saying no explicitly is part of scoping.
- [ ] It lists features that will never be built :: “Won’t” usually means “not this time”.
- [ ] It’s optional in MoSCoW :: Teams that skip it see scope creep.

Q: An idea is high impact and low effort. Which quadrant is it?
- [x] Quick win :: Correct. Do these first.
- [ ] Big bet :: Big bets are high impact and high effort.
- [ ] Fill-in :: Fill-ins are low impact and low effort.
- [ ] Money pit :: Money pits are low impact and high effort.

Q: What should you do with a “big bet” (high impact, high effort)?
- [ ] Build it immediately in full :: High effort means high risk; de-risk first.
- [x] Plan carefully, test the riskiest assumptions, and break it into smaller slices :: Correct. High impact justifies the effort, but high effort means risk, so de-risk and slice before committing fully.
- [ ] Avoid it entirely :: High impact makes it worth pursuing carefully.
- [ ] Move it to “Could have” :: Category depends on the release, not the 2x2 alone.

Q: Roughly what share of effort should Musts take in a MoSCoW-scoped release?
- [ ] 100% :: Leaves no buffer when estimates slip.
- [x] Around 60% :: Correct. This leaves room to drop Shoulds and Coulds if needed.
- [ ] 10% :: Too little; the release wouldn’t achieve its purpose.
- [ ] It doesn’t matter :: The split protects the deadline.

Q: When is MoSCoW a better choice than RICE?
- [ ] Ranking 30 ideas for a yearly roadmap :: RICE is better for detailed ranking.
- [x] Scoping a release with a fixed deadline :: Correct. MoSCoW decides what’s in and out for a time box.
- [ ] Understanding what delights users :: That’s what the Kano model is for, not MoSCoW.
- [ ] Estimating market size :: Neither tool does that.
```

## Key takeaways

- **MoSCoW** scopes a specific release: **Must, Should, Could, Won’t (this time)**.
- Test Musts with **“would we delay the launch?”** and keep them to **~60% of effort**.
- The **impact vs. effort 2x2** quickly finds **quick wins** and **money pits**.
- Effort estimates come from **the people doing the work**.
- Combine tools: **2x2 to shortlist, RICE to rank, MoSCoW to scope**.
