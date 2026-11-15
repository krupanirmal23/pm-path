---
id: w1-outcomes-outputs
title: Outcomes vs. outputs
week: 1
estimatedMinutes: 12
tags: [foundations, metrics, mindset]
---

## Why this matters for a PM

Teams love counting what they ship. Users and businesses only care about what changes. A PM who talks in outcomes sounds senior; a PM who talks in outputs sounds like a ticket manager. This one idea will shape your resume bullets, your PRDs and your interview answers.

## Core concepts

### Three words, three levels

- **Output:** the thing the team makes. A feature, a screen, a report, an email campaign. Outputs are *what we ship*.
- **Outcome:** a change in user behaviour that creates value. More users completing checkout. Fewer people calling support. Users ordering again within a week. Outcomes are *what changes because we shipped*.
- **Impact:** the long-term business result that outcomes add up to. Revenue, profit, market share, lower costs. Impact is *why the business cares*.

A simple chain:

> We ship **outputs** → which change user **behaviour** (outcomes) → which drive business **results** (impact).

Example from Swiggy:
- Output: a “reorder your last meal” button on the home screen.
- Outcome: more users place a repeat order within 7 days.
- Impact: higher order frequency, so more revenue per user.

### Why outputs are tempting

Outputs are easy to see, easy to count and fully in the team’s control. “We shipped 14 features this quarter” sounds productive. Outcomes are harder: they depend on users, take time to show up, and might not happen at all. That uncertainty is uncomfortable, so teams slide back to counting outputs. This trap has a name: the **build trap**, where a company measures success by how much it ships rather than by what changes.

### Why outcomes are better

1. **They keep you honest.** If the outcome doesn’t move, the feature didn’t work, however polished it is.
2. **They give the team freedom.** “Increase repeat orders by 10%” lets engineers and designers suggest better solutions than the one you first imagined.
3. **They make priorities obvious.** Ideas that won’t move the outcome drop down the list.
4. **They make better stories.** Interviewers and recruiters want “increased X by Y%”, not “built feature Z”.

### Good outcome statements

A strong outcome is:
- **About behaviour**, not about the product. “Users complete KYC” not “KYC page is live”.
- **Measurable.** You can put a number on it.
- **Within the team’s influence.** The team can actually move it in a few weeks or months. “Increase company revenue” is too far away; “increase the share of new users who place a second order within 14 days” is within reach.
- **Time-bound.** “By the end of Q2.”

A useful template: **“Increase/decrease [behaviour] for [user group] from [X] to [Y] by [date].”**

### Leading and lagging, in one line

Some outcomes show up fast (more people click “reorder” today). Others take months (users stay for a year). Fast-moving signals are called **leading indicators**; slow ones are **lagging indicators**. You’ll go deep on this in Week 5. For now: pick outcomes you can see move within your planning cycle.

## Worked example

**Company: Groww (investment app). Team: onboarding.**

**Output-based roadmap (what not to do):**
- Q1: Redesign the sign-up screens.
- Q1: Add video KYC.
- Q1: Launch a welcome email series.
- Success = all three shipped by March 31.

**Outcome-based roadmap (what to do):**
- Goal: Increase the share of new sign-ups who make their first investment within 7 days, from 18% to 25%, by March 31.
- Why: users who invest in the first week are far more likely to still be investing after a year (a lagging impact on revenue).
- Bets to test: faster KYC (video KYC), a guided “first ₹500 SIP” flow, and reminders for users who stop midway.
- Success = the 7-day first-investment rate hits 25%. If video KYC ships but the rate doesn’t move, the team tries something else rather than celebrating.

Notice how the outcome version also tells the team **when to stop**: if the guided flow alone gets the rate to 25%, the email series can wait.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 200" role="img" aria-labelledby="oo-t oo-d">
<title id="oo-t">Output to outcome to impact</title>
<desc id="oo-d">Three boxes in a row connected by arrows: output (what we ship), outcome (what users do differently), impact (what the business gains).</desc>
<defs><marker id="oo-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="20" y="40" width="170" height="120" rx="10" class="d-surface d-ink" stroke-width="2"/>
<text x="36" y="70" class="d-text" font-weight="700" font-size="16">Output</text>
<text x="36" y="94" class="d-text" font-size="12">What we ship</text>
<text x="36" y="124" class="d-text" font-size="12">“Reorder” button</text>
<rect x="235" y="40" width="170" height="120" rx="10" class="d-butter d-ink" stroke-width="2"/>
<text x="251" y="70" class="d-text-dark" font-weight="700" font-size="16">Outcome</text>
<text x="251" y="94" class="d-text-dark" font-size="12">What users do differently</text>
<text x="251" y="124" class="d-text-dark" font-size="12">More repeat orders</text>
<text x="251" y="142" class="d-text-dark" font-size="12">within 7 days</text>
<rect x="450" y="40" width="170" height="120" rx="10" class="d-mint d-ink" stroke-width="2"/>
<text x="466" y="70" class="d-text-dark" font-weight="700" font-size="16">Impact</text>
<text x="466" y="94" class="d-text-dark" font-size="12">What the business gains</text>
<text x="466" y="124" class="d-text-dark" font-size="12">Revenue per user ↑</text>
<line x1="192" y1="100" x2="230" y2="100" class="d-ink" stroke-width="3" marker-end="url(#oo-a)"/>
<line x1="407" y1="100" x2="445" y2="100" class="d-ink" stroke-width="3" marker-end="url(#oo-a)"/>
<text x="200" y="190" class="d-text" font-size="12">PMs are judged in the middle box: did behaviour change?</text>
</svg>
<figcaption>Outputs are the means. Outcomes are the goal you set. Impact is what the outcomes add up to.</figcaption>
</figure>

## Step by step

How to turn an output into an outcome:

1. **Write down the output.** “Add a ‘save for later’ button on the cart.”
2. **Ask “so that what?”** “So that users don’t lose items they’re not ready to buy.”
3. **Ask “so that what?” again** until you reach a behaviour change you can measure. “So that more users come back and buy those items later.”
4. **Turn it into a metric.** “% of saved items purchased within 14 days.”
5. **Find the baseline.** What is it today? If the feature doesn’t exist, use a nearby number, such as how often users re-add removed items.
6. **Set a target and a date.** “From 0 to 15% of saved items purchased within 14 days, measured 6 weeks after launch.”
7. **Add a guardrail.** A **guardrail metric** is a number that must not get worse. “Overall checkout conversion must not drop.”
8. **List other outputs that could reach the same outcome.** This keeps you open to better ideas.

## Common mistakes

1. **Writing a disguised output.** “Launch the new search experience to 100% of users” is still an output.
2. **Picking an outcome the team can’t influence.** “Increase company revenue by 20%” is impact; a single team can’t own it alone.
3. **Not setting a baseline.** “Increase activation” means nothing without knowing today’s number.
4. **Declaring victory at launch.** The outcome shows up weeks later. Schedule the check before you ship.
5. **Ignoring guardrails.** You can raise sign-ups by removing all verification, and wreck fraud rates in the process.

## How it shows up in interviews

> [!INTERVIEW]
> **“Tell me about a product you built. How did you measure success?”**
> Outline: the user problem → the outcome metric you chose and why → baseline and target → what you shipped (briefly) → what happened to the metric → what you learned. Spend more time on the outcome than the feature.

> [!INTERVIEW]
> **“Your team shipped everything on the roadmap, but the key metric didn’t move. What do you do?”**
> Outline: check measurement first (is tracking correct? enough time passed?) → look at who did and didn’t change behaviour → talk to users → decide to iterate, try a different bet, or stop. Show that shipping isn’t the finish line.

## Practice exercise

**Task (20 minutes):** Rewrite these five outputs as outcome statements using the template “Increase/decrease [behaviour] for [user group] from [X] to [Y] by [date]”. Make up reasonable baselines. Add one guardrail for each.

1. Launch dark mode in the Zerodha Kite app.
2. Add a “track your refund” page in Meesho.
3. Build a referral programme for Zepto.
4. Add UPI Lite to PhonePe.
5. Send WhatsApp reminders for incomplete Ola bookings.

```answer Reveal model answers
1. **Kite dark mode:** Increase the share of evening (after 7 p.m.) sessions longer than 3 minutes for active traders from 35% to 40% by end of quarter. Guardrail: crash rate stays below 0.2%. *(Honest note: dark mode may be a “hygiene” feature with no big outcome. Saying so is a good PM answer.)*
2. **Meesho refund tracking:** Decrease “where is my refund?” support tickets per 1,000 returns from 120 to 60 within 8 weeks. Guardrail: refund completion time doesn’t increase.
3. **Zepto referrals:** Increase new users acquired through referrals from 5% to 12% of all new users in Bengaluru by end of Q3, with referred users’ 30-day retention at least equal to non-referred users. Guardrail: referral fraud rate below 1%.
4. **PhonePe UPI Lite:** Increase the share of payments under ₹200 completed in under 3 seconds from 40% to 70% for active users within 3 months. Guardrail: payment failure rate doesn’t increase.
5. **Ola reminders:** Increase the share of abandoned bookings completed within 30 minutes from 8% to 14% in 6 weeks. Guardrail: WhatsApp opt-out rate below 2%.
```

## Quiz

```quiz
Q: Which of these is an outcome?
- [ ] Launch a new onboarding flow :: That’s an output: something the team ships.
- [x] Increase the share of new users who complete their first order within 3 days from 22% to 30% :: Correct. It describes a measurable change in user behaviour.
- [ ] Write 15 user stories for the onboarding epic :: That’s a task, an output.
- [ ] Increase annual revenue by ₹50 crore :: That’s impact: a long-term business result many teams contribute to.

Q: What is the “build trap”?
- [ ] When engineers can’t build a feature :: That’s a feasibility problem.
- [x] When a company measures success by how much it ships instead of what changes :: Correct. Shipping becomes the goal, and results get ignored.
- [ ] When a product is built with the wrong technology :: That’s a technical decision problem, not the build trap.
- [ ] When users can’t find a new feature :: That’s a discoverability or usability issue.

Q: Why is “increase company revenue by 20%” a weak goal for a single feature team?
- [ ] Revenue is not important :: Revenue is very important; it’s just too far from what one team can move.
- [ ] Twenty percent is too low :: The number isn’t the problem.
- [x] It’s impact, influenced by many teams and factors, so it can’t guide this team’s choices :: Correct. Teams need an outcome they can move and measure within their cycle.
- [ ] It doesn’t have a date :: True, but the bigger problem is that it’s out of the team’s reach.

Q: What is a guardrail metric?
- [ ] The main metric you are trying to improve :: That’s the primary or goal metric.
- [x] A metric that must not get worse while you improve the main one :: Correct. For example, checkout conversion shouldn’t drop when you add a new upsell.
- [ ] A metric that measures security incidents only :: Security can be a guardrail, but guardrails cover any metric you protect.
- [ ] A metric you report to investors :: Investors may see it, but that’s not what makes it a guardrail.

Q: A feature launched last week. The outcome metric hasn’t moved yet. What’s the best first step?
- [ ] Declare the feature a failure and remove it :: Too early. Many outcomes take weeks to show up.
- [x] Check that tracking works and that enough time and users have passed through the flow :: Correct. Rule out measurement problems and tiny samples before judging.
- [ ] Ship three more features to help :: Adding more changes makes it harder to learn what worked.
- [ ] Change the metric to one that went up :: Moving the goalposts hides the truth.

Q: Which outcome statement is strongest?
- [ ] Improve user engagement :: Vague. Which behaviour, which users, by how much, by when?
- [ ] Ship the new feed by June :: An output with a date.
- [x] Increase weekly active sellers who list at least one product from 35% to 45% by June 30 :: Correct. Specific behaviour, user group, baseline, target and date.
- [ ] Make sellers happier :: Not measurable as written.
```

## Key takeaways

- **Output** = what you ship. **Outcome** = what users do differently. **Impact** = what the business gains.
- PMs set and are judged on **outcomes**; outputs are just bets to reach them.
- A good outcome is **behavioural, measurable, within reach and time-bound**.
- Always state a **baseline, a target and a guardrail**.
- Shipping is the start of the test, **not the finish line**.

*Go deeper (optional):* Melissa Perri’s book *Escaping the Build Trap*.
