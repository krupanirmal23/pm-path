---
id: w3-tradeoffs
title: Trade-offs and saying no
week: 3
estimatedMinutes: 13
tags: [prioritization, stakeholders, communication]
---

## Why this matters for a PM

Every yes is a no to something else. PMs say no far more often than yes: to stakeholders, to users, to leadership, even to their own ideas. Doing it well, with reasons and respect, builds trust. Doing it badly makes enemies or creates a bloated product. Interviewers test this constantly with “How would you handle a stakeholder who…?”

## Core concepts

### What a trade-off is

A **trade-off** is a choice where gaining one thing means giving up another. In product work, common trade-offs include:
- **Speed vs. quality:** ship sooner with fewer features or polish, or later with more.
- **Scope vs. time:** do more, or finish sooner. (With fixed people, you can’t have both.)
- **Short-term vs. long-term:** a quick revenue win vs. building a lasting advantage.
- **One segment vs. another:** beginners vs. experts, buyers vs. sellers.
- **User experience vs. business goals:** fewer ads vs. more revenue.
- **Growth vs. guardrails:** more sign-ups vs. more fraud.

The first step is naming the trade-off clearly. Hidden trade-offs cause the worst arguments.

### The iron triangle

Projects are constrained by **scope, time and resources (people/budget)**, with **quality** in the middle. If one is fixed, the others must flex. A fixed date and fixed people mean scope must flex. Pretending all are fixed leads to cutting quality silently, which is the worst option.

### Opportunity cost

**Opportunity cost** is the value of the best alternative you give up. If the team spends 6 weeks on a dashboard for one big client, the opportunity cost is whatever else those 6 weeks could have done, for example a checkout fix worth 2% more conversions for everyone. Making opportunity cost visible is the most persuasive way to say no.

### How to say no well

A useful structure:

1. **Acknowledge and understand.** “I can see why this matters: your top client is frustrated.” Ask questions to find the underlying problem (Week 1: problem vs. solution).
2. **Share the decision criteria.** “This quarter we’re focused on new-user activation; that’s how we’re choosing.”
3. **Show the trade-off.** “If we take this on, we’d delay the KYC fix, which affects 40,000 users a month.”
4. **Offer alternatives.** A smaller version, a workaround, a later date, or a different team. “Could we export this data manually for the client this month while we plan a proper solution for Q3?”
5. **Decide and document.** Write it down, with the reason. Revisit if new evidence arrives.

The goal: “No, *and here’s why, and here’s what we can do*”, never just “No”.

### Disagree and commit

Sometimes the decision goes against you. **Disagree and commit** means voicing your disagreement clearly with evidence, then fully supporting the decision once it’s made. It keeps teams fast and avoids passive resistance. Equally, when you decide, invite disagreement before committing.

### Reversible vs. irreversible decisions

Some decisions are easy to undo (a button label, a small experiment): make them fast. Others are hard to undo (pricing changes, data deletion, a public API, major brand moves): slow down, gather evidence, involve more people. This distinction (sometimes called “one-way” vs. “two-way” doors) helps you decide how much time a trade-off deserves.

### Tools that make trade-offs easier

- **Clear goals and strategy** (earlier lessons): saying no to things off-strategy is easier.
- **Prioritisation frameworks** (RICE, Kano, MoSCoW): shared, transparent criteria.
- **A public roadmap with Now/Next/Later**: shows where requests landed.
- **A decision log**: a simple doc recording decisions, options, reasons and owners.

## Worked example

**Situation:** You’re the PM for Razorpay’s merchant dashboard. The sales head says: “Our biggest enterprise prospect will sign only if we build custom reports for them by next month.” Your team is committed to fixing payout delays that affect 30% of small merchants.

**How you handle it:**
1. **Understand:** You meet the sales head and, if possible, the prospect. The real need: their finance team reconciles payouts in a specific Excel format every Friday.
2. **Criteria:** Company strategy this half: improve reliability and trust for all merchants; payout delays are the top reason for churn.
3. **Trade-off:** Custom reports would take 5 engineer-weeks, delaying the payout fix by a month. Payout delays cost an estimated ₹X in churned volume each month.
4. **Alternatives:** (a) A one-time manual export in their format, prepared by the solutions team weekly, until a general “custom export” feature is planned for Q3. (b) Use the existing API so their team can build the report. (c) A general CSV export with configurable columns that helps all large merchants: 2 engineer-weeks, scheduled after the payout fix.
5. **Decision:** Offer (a) now + (c) next quarter. Document it. Sales closes the deal with the workaround and a committed date.

Nobody got everything; everybody understood why.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 230" role="img" aria-labelledby="to-t to-d">
<title id="to-t">The iron triangle</title>
<desc id="to-d">A triangle with scope, time and resources at the corners and quality in the middle.</desc>
<polygon points="320,20 560,200 80,200" class="d-sky d-ink" stroke-width="3"/>
<circle cx="320" cy="140" r="38" class="d-butter d-ink" stroke-width="2"/>
<text x="296" y="145" class="d-text-dark" font-weight="700">Quality</text>
<rect x="270" y="4" width="100" height="30" rx="8" class="d-surface d-ink" stroke-width="2"/>
<text x="296" y="25" class="d-text" font-weight="700">Scope</text>
<rect x="30" y="196" width="100" height="30" rx="8" class="d-surface d-ink" stroke-width="2"/>
<text x="62" y="217" class="d-text" font-weight="700">Time</text>
<rect x="500" y="196" width="120" height="30" rx="8" class="d-surface d-ink" stroke-width="2"/>
<text x="514" y="217" class="d-text" font-weight="700">Resources</text>
</svg>
<figcaption>Fix any two corners and the third must flex. If none can flex, quality quietly breaks.</figcaption>
</figure>

## Step by step

When a request competes with current priorities:

1. **Log it** in your backlog or request tracker, with who asked and why.
2. **Find the problem behind it** with questions.
3. **Size it**: rough reach, impact, effort (RICE-style).
4. **Compare it** to the current top priority using the same criteria.
5. **Name the trade-off and opportunity cost** in one sentence.
6. **Prepare 2–3 alternatives** (smaller, later, workaround, other owner).
7. **Talk to the requester first**, before announcing anything. No surprises.
8. **Decide** (with your manager if it’s significant) and **document** in a decision log.
9. **Close the loop**: tell the requester what happened and when you’ll revisit.

## Common mistakes

1. **Saying yes to everything** to avoid conflict. The product becomes a pile of half-finished features.
2. **Saying no with no reason.** It feels arbitrary and damages relationships.
3. **Hiding trade-offs.** Agreeing to scope and date and then cutting quality quietly.
4. **Treating every decision as irreversible.** Small decisions should be fast.
5. **Forgetting to close the loop.** People forgive a no; they don’t forgive silence.
6. **Using frameworks as a shield.** “RICE says no” without explaining the reasoning feels bureaucratic.

## How it shows up in interviews

> [!INTERVIEW]
> **“Your CEO asks for a feature you think is a bad idea. What do you do?”**
> Outline: understand the problem behind it → bring data and research → show the trade-off and opportunity cost → propose a cheaper test → if they still decide yes, disagree and commit, and measure results honestly.

> [!INTERVIEW]
> **“Tell me about a time you had to say no.”**
> Outline (STAR): situation and stakes → why you said no (criteria, data) → how you said it (alternatives offered) → outcome → relationship afterwards. From your Palo Alto experience, a customer feature request you redirected is a good candidate.

## Practice exercise

**Task (25 minutes):** Write a short message (under 180 words) saying no to this request, using the five-step structure.

*Request (from the marketing head at Zepto):* “We need a full in-app loyalty programme with points, tiers and badges before the IPL season starts in 5 weeks.” *Your team is committed to fixing a substitution problem that makes 6% of orders arrive with a missing item.*

```answer Reveal a model answer
Hi Priya, thanks for raising this. I agree IPL is a big moment for repeat orders, and loyalty can help.

This quarter our goal is order reliability: 6% of orders currently arrive with a missing item, and those users are 2x more likely to stop ordering. The substitution fix is 4 weeks of work for the team.

A full points-and-tiers programme is roughly 8–10 weeks, so doing it before IPL would mean pausing the missing-item fix, and we’d be rewarding users with an experience that still fails 1 in 17 orders.

Two options for IPL:
1. A match-day offer (e.g., free delivery on match evenings for repeat users), which uses our existing offers system and needs ~3 days.
2. Start a 2-week loyalty discovery sprint with your team now, so we can build a programme properly next quarter.

Happy to discuss. Could we meet Thursday to choose?
```

## Quiz

```quiz
Q: What is opportunity cost?
- [ ] The cost of a failed opportunity :: Not quite: it’s the value of the alternative you gave up, not the cost of failure.
- [x] The value of the best alternative you give up when you choose something :: Correct. It makes trade-offs concrete.
- [ ] The money spent on a project :: That’s direct cost.
- [ ] The cost of missing a market trend :: Too narrow: opportunity cost applies to every choice, not just trends.

Q: Date and team size are fixed, and the work is bigger than expected. What should flex?
- [ ] Quality, quietly :: The worst option; it damages users and trust.
- [x] Scope :: Correct. With time and resources fixed, cut or simplify scope openly.
- [ ] Nothing; work harder :: Unsustainable and usually fails.
- [ ] The goal :: The goal may stay; scope is the normal lever.

Q: Which “no” is best?
- [ ] “No, we’re busy.” :: No reason or alternative.
- [ ] “RICE says no.” :: Hides behind a tool without explaining.
- [x] “I see why it matters. Our focus this quarter is X; this would delay Y, which affects 40k users. Could we do a manual workaround now and revisit in Q3?” :: Correct. Acknowledges, explains criteria and trade-off, offers alternatives.
- [ ] Ignore the request :: Silence damages trust.

Q: What does “disagree and commit” mean?
- [ ] Pretend to agree, then do what you want :: That’s passive resistance.
- [x] Voice disagreement with evidence, then fully support the decision once made :: Correct. It keeps teams aligned and fast.
- [ ] Refuse to work on decisions you disagree with :: That breaks team trust.
- [ ] Always agree with leadership :: Disagreement is expected before deciding.

Q: Which decision deserves the most care because it’s hard to reverse?
- [ ] Changing a button label :: Easy to undo.
- [ ] Running a one-week A/B test :: Easy to stop.
- [x] Changing pricing for all existing customers :: Correct. Hard to undo and affects trust.
- [ ] Reordering the backlog :: Easy to change.
```

## Key takeaways

- Every yes is a no to something else: **name the trade-off** and its **opportunity cost**.
- With **scope, time and resources**, fix two and flex the third; never let **quality** silently absorb the pressure.
- Say no with **acknowledgement, criteria, trade-off, alternatives and documentation**.
- **Disagree and commit** once decisions are made.
- Move fast on **reversible** decisions; slow down on **irreversible** ones.
