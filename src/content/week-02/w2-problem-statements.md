---
id: w2-problem-statements
title: Problem statements and “How might we”
week: 2
estimatedMinutes: 13
tags: [discovery, problem-framing, ideation]
---

## Why this matters for a PM

A sharp problem statement is the hinge between research and building. It tells everyone, in two sentences, who is struggling, with what, and why it matters, so engineers, designers and leaders can align. “How might we” questions then turn that problem into a launchpad for ideas. Your P1 discovery report ends with a problem statement and three HMW questions.

## Core concepts

### What a problem statement does

A **problem statement** is a short description of a user problem worth solving. It should:
- Name a **specific user** (from your personas or segments).
- Describe the **situation** and **struggle**.
- Explain the **impact**: what it costs the user and the business.
- Be **backed by evidence** (research counts, quotes, data).
- Contain **no solution**.

### Two useful formats

**Format 1 (user-centred):**
> [User] needs a way to [need] because [insight], which today leads to [consequence].

**Format 2 (more detailed, often used in PRDs):**
> **Who:** [user/segment]
> **Problem:** [struggle in a specific situation]
> **Evidence:** [research and data]
> **Impact:** [cost to user; cost to business]
> **Why now:** [why this matters at this moment]

Example (format 1): “Flatmates in Bengaluru who share small, irregular household purchases need a way to settle up without anyone having to ask, because asking friends for small amounts feels petty and risks tension, which today leads to people silently absorbing ₹300–₹800 a month and to arguments that existing apps fail to prevent.”

### Testing your problem statement

Check it against these questions:
1. **Is the user specific?** “Users” is not specific.
2. **Is there a situation?** When does this happen?
3. **Is there no solution in it?** No feature words.
4. **Is it backed by evidence?** Could you point to quotes and counts?
5. **Is the impact clear?** Why should anyone care?
6. **Is it the right size?** Too broad (“people struggle with money”) gives no direction; too narrow (“the button is grey”) leaves no room for ideas.

### “How might we” questions

A **How might we (HMW)** question reframes a problem as an opportunity for ideas. Each word does a job:
- **How:** assumes there are answers to find.
- **Might:** says ideas can be tentative; we’re exploring.
- **We:** makes it a shared team effort.

Example: “How might we make settling up feel automatic, so no flatmate has to be the one who asks?”

### Getting the size of an HMW right

- **Too broad:** “How might we improve money management?” Infinite answers, no focus.
- **Too narrow:** “How might we add a reminder button to the settle-up screen?” This is a solution in disguise.
- **Right size:** “How might we make settling up feel neutral, rather than one friend chasing another?” Specific need, many possible solutions.

### HMW techniques

Generate several HMWs from one problem by changing the angle:
- **Remove the pain:** “HMW remove the need to ask at all?”
- **Flip it:** “HMW make asking feel friendly instead of awkward?”
- **Amplify the good:** “HMW celebrate groups who settle on time?”
- **Change the context:** “HMW handle shared purchases at the moment of buying instead of at month-end?”
- **Focus on a sub-part:** “HMW make small amounts feel worth settling?”

## Worked example

**Product: Meesho seller app. Research: 8 seller interviews, return data.**

**Draft 1 (bad):** “Sellers need a better returns dashboard.” → contains a solution, no evidence, no situation.

**Draft 2 (better):** “Sellers are confused about returns.” → no solution, but vague user and no impact.

**Final:**
> **Who:** Small home-based resellers with fewer than 100 listings, mostly in tier 2–3 cities, who use the app in Hindi or regional languages.
> **Problem:** When an order is returned and money is deducted, they can’t tell why or whether they’ll lose money on the product, so they can’t decide whether to keep selling it.
> **Evidence:** 6 of 8 sellers interviewed described a return they didn’t understand (“Return aaya, paisa kaata, pata nahi kyun”). Return-related support tickets are the #2 category for small sellers.
> **Impact:** Sellers stop listing products after a confusing return; support costs rise; good products disappear from the catalogue.
> **Why now:** We’re expanding to 3 new regional languages, which will add many sellers like this.

**HMW questions:**
1. HMW help sellers understand any return in under 30 seconds, in their own language?
2. HMW show sellers whether a product is still profitable after returns, before they decide to keep listing it?
3. HMW reduce avoidable returns caused by unclear listings, so sellers face fewer surprises?

Each HMW opens a different solution space: explanation, profitability insight, and prevention.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 210" role="img" aria-labelledby="hmw-t hmw-d">
<title id="hmw-t">Sizing a How might we question</title>
<desc id="hmw-d">Three boxes from too broad to right size to too narrow, with examples.</desc>
<rect x="20" y="40" width="190" height="130" rx="10" class="d-pink d-ink" stroke-width="2"/>
<text x="34" y="66" class="d-text-dark" font-weight="700">Too broad</text>
<text x="34" y="92" class="d-text-dark" font-size="11">HMW improve money</text>
<text x="34" y="108" class="d-text-dark" font-size="11">management?</text>
<text x="34" y="140" class="d-text-dark" font-size="11">→ no direction</text>
<rect x="225" y="25" width="190" height="160" rx="10" class="d-mint d-ink" stroke-width="3"/>
<text x="239" y="52" class="d-text-dark" font-weight="700">Right size</text>
<text x="239" y="78" class="d-text-dark" font-size="11">HMW make settling up feel</text>
<text x="239" y="94" class="d-text-dark" font-size="11">neutral, so no friend has</text>
<text x="239" y="110" class="d-text-dark" font-size="11">to be the one who asks?</text>
<text x="239" y="150" class="d-text-dark" font-size="11">→ focused, many solutions</text>
<rect x="430" y="40" width="190" height="130" rx="10" class="d-butter d-ink" stroke-width="2"/>
<text x="444" y="66" class="d-text-dark" font-weight="700">Too narrow</text>
<text x="444" y="92" class="d-text-dark" font-size="11">HMW add a reminder button</text>
<text x="444" y="108" class="d-text-dark" font-size="11">to the settle screen?</text>
<text x="444" y="140" class="d-text-dark" font-size="11">→ a solution in disguise</text>
</svg>
<figcaption>A good HMW names a specific need but leaves room for many different solutions.</figcaption>
</figure>

## Step by step

1. **Start from your top theme** from affinity mapping and its insight.
2. **Pick the primary user** from your personas.
3. **Draft a problem statement** in format 1. Read it aloud. Remove any feature words.
4. **Expand to format 2**: add evidence (counts and two quotes), impact on user and business, and why now.
5. **Run the six checks** (specific user, situation, no solution, evidence, impact, right size).
6. **Write 6–8 HMW questions** using the angles: remove, flip, amplify, change context, sub-part.
7. **Size-check each HMW**: cross out the too broad and too narrow ones.
8. **Pick the best three**: each should open a *different* solution space.
9. **Put the problem statement and HMWs** at the end of your P1 discovery report, and connect them to your opportunity tree.

## Common mistakes

1. **Hiding a solution.** “Users need an AI assistant to…” is a solution.
2. **Generic users.** “Customers” or “people” tells the team nothing.
3. **No evidence.** A problem statement without quotes and numbers is a guess.
4. **Ignoring business impact.** Leaders fund problems that matter to the business too.
5. **HMWs that are all the same idea reworded.** Use different angles.
6. **Treating the statement as final.** Update it when new evidence arrives.

## How it shows up in interviews

> [!INTERVIEW]
> **“What problem are you solving?”** (asked in nearly every product design question)
> Outline: name the user, situation and struggle in one or two sentences → why it matters (user + business) → how you’d know it’s real. Then move to solutions. Interviewers mark you down for skipping this.

> [!INTERVIEW]
> **“Design a product to help elderly people use UPI.”**
> Outline: segment (e.g., first-time smartphone users over 60) → problem statement (fear of sending money to the wrong person, can’t read small text, rely on children) → 2–3 HMWs (HMW make every payment feel safe to confirm? HMW let a family member help without taking over?) → solutions → metric.

## Practice exercise

**Task (25 minutes):** Turn this research summary into (a) a format-2 problem statement and (b) five HMW questions using different angles. Mark which three you’d keep.

*Research:* 7 interviews with Ola/Uber riders who commute daily in Bengaluru. 6 of 7 described driver cancellations after waiting 5+ minutes during peak hours. Quotes: “He accepted, then didn’t move for 8 minutes, then cancelled.” “I book two apps at once and cancel one.” “I leave 20 minutes early just in case.” Data (assume): 18% of peak-hour rides are cancelled by drivers after acceptance.

```answer Reveal a model answer
**Problem statement**
- **Who:** Daily commuters in Bengaluru booking rides during morning and evening peak hours.
- **Problem:** After a driver accepts, riders wait several minutes only to have the ride cancelled, leaving them late and forced to rebook in peak demand.
- **Evidence:** 6 of 7 riders described post-acceptance cancellations; 18% of peak-hour rides are cancelled by drivers after acceptance. Quotes: “He accepted, then didn’t move for 8 minutes, then cancelled.” “I leave 20 minutes early just in case.”
- **Impact:** Riders lose time and trust; many double-book across apps (inflating cancellations further); the platform loses rides to competitors.
- **Why now:** Peak-hour demand is rising with office returns.

**HMWs**
1. ✅ HMW give riders confidence, within the first minute, that an accepted driver is actually coming? (remove the uncertainty)
2. ✅ HMW make cancelling after acceptance unattractive for drivers without reducing driver supply? (change incentives)
3. ✅ HMW recover a rider quickly when a cancellation happens, so they lose almost no time? (change the moment)
4. HMW make waiting feel shorter? (flip — weaker: treats the symptom)
5. HMW improve commuting in Bengaluru? (too broad)
```

## Quiz

```quiz
Q: Which is the best problem statement?
- [ ] Users need an AI chatbot for support :: Contains a solution and a vague user.
- [ ] Our support is bad :: No user, situation, evidence or impact.
- [x] First-time investors who see their portfolio drop in the first month don’t know if it’s normal, so 1 in 4 pause their SIP; 5 of 7 interviewees described this panic :: Correct. Specific user, situation, consequence and evidence, with no solution.
- [ ] We should reduce SIP cancellations :: That’s a goal, not a problem statement.

Q: What does the word “might” do in “How might we”?
- [ ] Makes the question sound polite :: Politeness is a side effect, not the purpose.
- [x] Signals that ideas can be tentative, encouraging exploration :: Correct. It lowers the pressure to have the perfect answer.
- [ ] Limits the question to one solution :: It does the opposite.
- [ ] Means the team might not work on it :: Not its purpose.

Q: Which HMW is the right size?
- [ ] HMW make investing better? :: Too broad.
- [ ] HMW add a tooltip to the SIP button? :: Too narrow; a solution in disguise.
- [x] HMW help new investors stay calm during their first market drop? :: Correct. Specific need, many possible solutions.
- [ ] HMW increase revenue? :: A business goal, not a user-centred HMW.

Q: Why should a problem statement include business impact?
- [ ] To make it longer :: Length isn’t the point.
- [x] Because leaders prioritise problems that matter to both users and the business :: Correct. It helps the problem compete for resources.
- [ ] Because users care about revenue :: Users care about their problem, not your revenue.
- [ ] It shouldn’t; only user impact matters :: Ignoring business impact makes prioritisation harder.

Q: You’ve written five HMWs that all lead to “send a reminder”. What should you do?
- [ ] Pick the best-worded one :: You’d still have only one solution space.
- [x] Reframe using different angles (remove the pain, flip it, change context) to open different solution spaces :: Correct. Good HMW sets diverge.
- [ ] Build the reminder :: You haven’t explored alternatives yet.
- [ ] Delete the problem statement :: The problem may be fine; the HMWs need variety.
```

## Key takeaways

- A problem statement names a **specific user, situation, struggle, evidence and impact**, with **no solution**.
- Use the short format for alignment and the **who / problem / evidence / impact / why now** format for PRDs.
- **HMW** questions turn problems into opportunities: “How” (solvable), “might” (explore), “we” (together).
- Size HMWs between **too broad** and **too narrow**; each should allow many solutions.
- Use **different angles** to generate HMWs that open **different solution spaces**.
