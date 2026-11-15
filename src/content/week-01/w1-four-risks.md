---
id: w1-four-risks
title: The four product risks
week: 1
estimatedMinutes: 14
tags: [foundations, discovery, risk]
---

## Why this matters for a PM

Most new features fail. They either don’t get used, confuse people, can’t be built well, or don’t make sense for the business. The four product risks give you a checklist to catch these problems *before* the team spends months building. It’s also your Week 1 checkpoint: you must explain all four in two minutes.

## Core concepts

A **risk** is something that could make your effort wasted. Before building, a PM asks four questions. Each one is a risk.

### 1. Value risk: will people want it?

**Value risk** is the chance that users won’t choose to use or pay for the thing, even if it works perfectly. This is the most common reason products fail.

- Question: *Will customers use this, or buy it, instead of what they do today?*
- Owned mainly by: the PM.
- How to reduce it: user interviews about past behaviour, fake-door tests (a button that measures interest before the feature exists), landing pages, pre-orders, small pilots.

Example: A food app adds a “meal plan subscription” for the week. Users say it sounds nice. But when offered, very few sign up, because they decide what to eat on the day. The feature had high value risk.

### 2. Usability risk: can people figure out how to use it?

**Usability risk** is the chance that users want it but can’t work out how to use it, or find it too much effort.

- Question: *Can our target users figure out how to get value from this, quickly?*
- Owned mainly by: the designer, with the PM.
- How to reduce it: prototypes, usability tests with 5 users, watching people try the flow without help.

Example: A brokerage adds a powerful options strategy builder. Traders want it, but the screen has 14 inputs and confusing labels. Most users quit halfway. The value was there; the usability wasn’t.

### 3. Feasibility risk: can we build it?

**Feasibility risk** is the chance the team can’t build it with the time, skills, technology and data available, or can’t make it work well enough (fast, reliable, accurate).

- Question: *Can our engineers build and run this, with what we have?*
- Owned mainly by: the engineering lead.
- How to reduce it: technical spikes (a short time-boxed investigation), prototypes, talking to engineers early, checking data availability.

Example: A grocery app wants “delivery in exactly 10 minutes, guaranteed”. Possible in dense parts of Bengaluru with dark stores nearby. Not feasible in areas where the nearest store is 6 km away through traffic.

### 4. Viability risk: does it work for the business?

**Viability risk** is the chance that the solution doesn’t work for the rest of the business: it loses money, breaks a legal rule, hurts the brand, or can’t be sold or supported.

- Question: *Does this work for our business: finance, legal, sales, support, partners, brand?*
- Owned mainly by: the PM, with stakeholders.
- How to reduce it: rough unit economics (cost and revenue per order or user), early talks with legal/compliance, finance and support.

Example: A fintech wants to let users invest with zero KYC (identity checks) to reduce friction. Users would love it and it’s easy to build. But it breaks SEBI and RBI rules. Not viable.

### Why all four, and why early

A product succeeds only if all four are true at once. Teams often check only feasibility (“can we build it?”) because engineers ask that question naturally. Value and viability risks are easier to ignore and more expensive to discover late.

Two more terms you will hear:

- **Discovery:** the work of reducing these risks before building. You’ll learn it properly in Week 2.
- **Delivery:** the work of building and shipping the product once risks are low enough.

Good teams do discovery and delivery in parallel: while engineers build this month’s work, the PM and designer de-risk next month’s ideas.

## Worked example

**Idea: “CRED adds a ‘split rent with flatmates’ feature.”** CRED users already pay rent with credit cards through the app. The idea: let one flatmate pay the full rent and automatically collect shares from the others.

| Risk | Key question | Evidence to gather | What we found (hypothetical) |
|---|---|---|---|
| Value | Will flatmates use this instead of UPI requests or Splitwise? | Interview 8 renters about the last time they split rent; fake-door button | 6 of 8 already use UPI requests and find it “fine”. Interest comes mainly from people who want credit card rewards on the full amount. |
| Usability | Can they set up a recurring split in under a minute? | Clickable prototype tested with 5 users | 4 of 5 confused by “who pays the platform fee”. |
| Feasibility | Can we collect from non-CRED users? | Ask payments engineers | Yes via UPI collect requests, but reminders to non-users are limited. |
| Viability | Is it legal and profitable? | Check card network rules, compliance and fee economics | Card networks restrict rent payments in some cases; the fee model may get worse if rules tighten. |

**Decision:** Value is weak for the general “split” job, and viability carries regulatory risk. The PM narrows the idea: “Help users who pay full rent on a card collect shares easily”, a smaller segment with a clear reward motive. Test value with a fake door shown only to existing rent payers before building anything.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 300" role="img" aria-labelledby="fr-t fr-d">
<title id="fr-t">The four product risks</title>
<desc id="fr-d">Four boxes: value, usability, feasibility and viability, each with its question and owner. Success sits in the middle.</desc>
<rect x="20" y="20" width="290" height="120" rx="10" class="d-lavender d-ink" stroke-width="2"/>
<text x="36" y="48" class="d-text-dark" font-weight="700" font-size="16">Value</text>
<text x="36" y="72" class="d-text-dark">Will they use it or buy it?</text>
<text x="36" y="96" class="d-text-dark" font-size="12">Owner: PM</text>
<text x="36" y="118" class="d-text-dark" font-size="12">Test: interviews, fake doors</text>
<rect x="330" y="20" width="290" height="120" rx="10" class="d-pink d-ink" stroke-width="2"/>
<text x="346" y="48" class="d-text-dark" font-weight="700" font-size="16">Usability</text>
<text x="346" y="72" class="d-text-dark">Can they figure it out?</text>
<text x="346" y="96" class="d-text-dark" font-size="12">Owner: designer + PM</text>
<text x="346" y="118" class="d-text-dark" font-size="12">Test: prototype with 5 users</text>
<rect x="20" y="160" width="290" height="120" rx="10" class="d-sky d-ink" stroke-width="2"/>
<text x="36" y="188" class="d-text-dark" font-weight="700" font-size="16">Feasibility</text>
<text x="36" y="212" class="d-text-dark">Can we build and run it?</text>
<text x="36" y="236" class="d-text-dark" font-size="12">Owner: engineering lead</text>
<text x="36" y="258" class="d-text-dark" font-size="12">Test: spikes, early eng review</text>
<rect x="330" y="160" width="290" height="120" rx="10" class="d-mint d-ink" stroke-width="2"/>
<text x="346" y="188" class="d-text-dark" font-weight="700" font-size="16">Viability</text>
<text x="346" y="212" class="d-text-dark">Does it work for the business?</text>
<text x="346" y="236" class="d-text-dark" font-size="12">Owner: PM + stakeholders</text>
<text x="346" y="258" class="d-text-dark" font-size="12">Test: unit economics, legal check</text>
<circle cx="320" cy="150" r="34" class="d-butter d-ink" stroke-width="2"/>
<text x="296" y="155" class="d-text-dark" font-weight="700">Success</text>
</svg>
<figcaption>A product succeeds only when all four risks are low at the same time.</figcaption>
</figure>

## Step by step

How to run a quick four-risk check on any idea (about 30 minutes):

1. **Write the idea as a sentence:** who it’s for, what it does, why.
2. **For each risk, write the riskiest assumption.** For value: “Users will switch from X.” For usability: “Users understand Y without help.” For feasibility: “We can get data Z.” For viability: “Each order earns more than it costs.”
3. **Rate each assumption** as high, medium or low risk, based on how much evidence you have.
4. **Pick the highest risk** and choose the cheapest test that would change your mind. Interviews and fake doors for value. A paper prototype for usability. A one-day spike for feasibility. A spreadsheet and a 15-minute chat with legal or finance for viability.
5. **Decide in advance** what result means go, change or stop. Example: “If fewer than 5% click the fake-door button in a week, we stop.”
6. **Run the test, then update your ratings.** Repeat until all four are low enough to commit engineering time.

## Common mistakes

1. **Only asking “can we build it?”** Feasibility is the easiest risk to see and rarely the reason products fail.
2. **Trusting what users say they’d do.** “I’d definitely use that!” is weak evidence. Past behaviour and real actions (clicks, sign-ups, payments) are strong evidence.
3. **Testing usability before value.** A beautifully usable feature nobody wants is still a failure.
4. **Forgetting non-obvious stakeholders.** Support teams, legal, finance and partners like restaurants or banks can each kill an idea late.
5. **Doing the check once.** Risks change as you learn. Revisit the four risks whenever the scope changes.

## How it shows up in interviews

> [!INTERVIEW]
> **“Explain the four product risks.”** (Your Week 1 checkpoint, in 2 minutes.)
> Outline: one sentence per risk with its question → who owns it → one example each, ideally from one product → close with “value and viability are the ones teams most often skip”.

> [!INTERVIEW]
> **“We want to add a chat feature to our app. What do you think?”**
> Outline: don’t answer yes or no. Reframe: what user problem would chat solve? Then walk through the four risks: value (do users need to talk to each other or to support?), usability, feasibility (moderation, real-time systems), viability (support costs, abuse, legal). Propose the cheapest test for the biggest risk.

## Practice exercise

**Task (25 minutes):** Run a four-risk check on this idea: *“Zomato lets users split a group order so each friend pays for their own items.”*

For each risk, write the riskiest assumption, rate it (high/medium/low) and propose the cheapest test. Then say which risk you would test first and why.

```answer Reveal a model answer
**Value (high):** Assumption: groups who order together want to pay separately inside Zomato rather than one person paying and collecting by UPI later. Test: interview 8 people about their last group order; add a fake “Split payment” button on group carts and measure taps.

**Usability (medium):** Assumption: each friend can join the cart and pay their share from their own phone without confusion. Test: clickable prototype with 5 users, task “order with two friends and pay separately”.

**Feasibility (medium):** Assumption: we can hold an order until every friend pays, and handle partial failures (one friend’s payment fails). Test: one-day engineering spike on payment holds and timeouts.

**Viability (medium):** Assumption: multiple payments per order don’t add costs that wipe out margin, and restaurants are fine with a slight delay before the order is confirmed. Test: finance estimate of extra payment gateway fees; short call with 3 restaurant partners.

**Test first:** Value. If people are happy with one person paying and getting reimbursed by UPI, the rest doesn’t matter. The fake-door test is cheap and gives behaviour data, not opinions.
```

## Quiz

```quiz
Q: Users love a new feature in interviews, it’s easy to use and easy to build, but each use costs the company ₹40 and earns ₹10. Which risk is this?
- [ ] Value risk :: Users want it, so value looks fine.
- [ ] Usability risk :: It’s easy to use, so usability is fine.
- [ ] Feasibility risk :: It’s easy to build, so feasibility is fine.
- [x] Viability risk :: Correct. It doesn’t work for the business because it loses money on every use.

Q: Which is the strongest evidence that value risk is low?
- [ ] 90% of survey respondents said they would use it :: Stated intent is weak evidence. People are optimistic about future behaviour.
- [x] 12% of users who saw a fake-door button tapped it and joined a waitlist :: Correct. Real behaviour, even a small action, beats opinions.
- [ ] The CEO thinks it’s a great idea :: Senior opinions are not user evidence.
- [ ] A competitor has a similar feature :: Competitors may have built it for other reasons, and it may not work for them either.

Q: Who usually owns feasibility risk?
- [ ] The PM :: The PM cares about it, but engineers are best placed to judge it.
- [x] The engineering lead :: Correct. Engineers judge whether it can be built and run well.
- [ ] The marketing team :: Marketing doesn’t usually assess technical feasibility.
- [ ] Customers :: Customers can tell you what they want, not whether it can be built.

Q: A team tests the usability of a new feature with 5 users before checking whether anyone wants it. What’s the problem?
- [ ] Five users is too few for a usability test :: Five users is actually a common, useful number for usability tests.
- [x] They might perfect the usability of something nobody needs :: Correct. Test value first; usability effort is wasted if value is missing.
- [ ] Usability tests should be done after launch :: Usability tests are most useful before launch, on prototypes.
- [ ] Nothing, this is the right order :: The usual best order is value first, then usability.

Q: What is a “technical spike”?
- [ ] A sudden increase in server traffic :: That’s a traffic spike, a different meaning.
- [x] A short, time-boxed investigation to answer a feasibility question :: Correct. For example, one day to check whether an API can return results fast enough.
- [ ] A bug that crashes the app :: That’s an incident or a bug.
- [ ] A feature released to all users at once :: That’s a full release, not a spike.

Q: Why do teams most often skip value and viability checks?
- [ ] Because they are illegal to test :: They aren’t. Fake doors and unit economics are common and legal.
- [x] Because engineers naturally raise feasibility, while value and viability need a PM to push for them :: Correct. The PM has to deliberately ask “will they want it?” and “does it work for the business?”.
- [ ] Because they are always low risk :: They are often the highest risks.
- [ ] Because they can only be tested after launch :: Both can be tested cheaply before building.
```

## Key takeaways

- Every idea carries four risks: **value, usability, feasibility, viability**.
- **Value** (will they want it?) is the most common reason products fail.
- Test the **biggest risk first** with the **cheapest test** that could change your mind.
- **Behaviour beats opinions**: fake doors, prototypes and real usage trump “I’d use it”.
- Engineers raise feasibility naturally; the **PM must push value and viability**.

*Go deeper (optional):* Marty Cagan’s writing on “the four big risks” at svpg.com.
