---
id: w1-problem-solution
title: Problem vs. solution thinking
week: 1
estimatedMinutes: 13
tags: [foundations, discovery, mindset]
---

## Why this matters for a PM

Most requests a PM receives arrive as solutions: “Add a chat feature.” “We need a dashboard.” “Build what competitor X has.” If you build requests as given, you’ll ship a lot and change little. The PM’s job is to find the problem behind the request, then pick the best solution. This is also half of your Week 1 checkpoint.

## Core concepts

### Problems and solutions

- A **problem** describes a user, a situation and a struggle. It says nothing about what to build. “Customers ordering late at night don’t know their favourite restaurant is closed until checkout.”
- A **solution** describes something to build or change. “Show restaurant hours on the menu.” “Add a chat feature.”

A quick test: **if the sentence contains a feature, it’s a solution.**

| Sounds like | It is | The likely problem behind it |
|---|---|---|
| “Add a chat feature” | Solution | Users can’t get quick answers about their order |
| “Build a dashboard for sellers” | Solution | Sellers can’t tell which products are selling, so they restock the wrong things |
| “We need dark mode” | Solution | Users find the app hard on the eyes at night (or it’s a hygiene expectation) |
| “Users can’t tell if their refund has started” | Problem | — |

### Why “build a chat feature” is a solution, not a problem

Your checkpoint question. Here is a clear answer:

“Build a chat feature” names *what to build*. It doesn’t say *who* is struggling, *when*, or *why*. Chat might solve several different problems: customers needing order help, buyers wanting to ask sellers questions, or friends coordinating a group order. Each problem has better or cheaper solutions. Order help might be solved by clearer tracking and an FAQ. Buyer questions might be solved by better product descriptions and photos. Starting with chat locks you into one expensive answer (real-time messaging, moderation, support staff) before you know the question. A PM first asks: “What problem would chat solve, for whom, and how do we know it’s real?”

### The problem space and the solution space

- The **problem space** is everything about users: their goals, struggles, context and current workarounds. You explore it with interviews and data.
- The **solution space** is everything you could build. You explore it with brainstorming, sketches and prototypes.

Good PMs spend real time in the problem space before moving to solutions, and they keep several solutions in play before choosing one.

### The “5 whys”

A simple way to dig from a solution to a problem is to ask “why?” several times. It’s called the **5 whys** (you don’t need exactly five).

Request: “Add chat with the delivery partner.”
1. Why? Customers want to talk to the delivery partner.
2. Why? To tell them how to find the building.
3. Why? The partner often calls to ask for directions.
4. Why? The address pin is often wrong or the building is hard to find.
5. Why? Address entry doesn’t capture landmarks or gate details, and pins are placed loosely.

The real problem: *delivery partners can’t find the exact entrance*. Possible solutions: better address capture with landmarks and gate photos, a “confirm your pin” step, or saved delivery instructions. Chat is one option, and not obviously the best.

### Good problem statements

A useful format (you’ll practise it more in Week 2):

> **[User]** needs a way to **[do something]** because **[reason / struggle]**, which today leads to **[consequence]**.

Example: “First-time investors on Groww need a way to choose a mutual fund without understanding jargon, because they fear picking the wrong one, which today leads to 60% of them leaving the fund page without investing.”

## Worked example

**Situation:** The CEO of a quick-commerce app says: “Blinkit has a ‘Print store’ feature. We need one too.”

**Solution-first PM:** Writes a PRD for printing documents, estimates 3 months, ships it.

**Problem-first PM:**
1. Asks what problem the CEO is worried about. Answer: “We’re losing share in college areas.”
2. Looks at data: in college areas, orders per user are lower and churn is higher than in office areas.
3. Talks to 8 students. Their top struggles: running out of stationery and snacks during exams at night, minimum order values that are too high for a single item, and printing assignments (mentioned by 3 of 8).
4. Defines the problem: “Students in hostels need small, urgent items late at night, but our ₹199 minimum order makes single-item orders impossible, so they walk to a shop or skip it.”
5. Considers solutions: lower minimum order in college areas at night, a “student essentials” collection, printing.
6. Picks the cheapest test with the biggest likely impact: a lower minimum order value in two college areas for 3 weeks.

**Result:** Printing might still be worth doing later, but now it’s one option among several, judged against a real problem.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 230" role="img" aria-labelledby="ps-t ps-d">
<title id="ps-t">From request to problem to solutions</title>
<desc id="ps-d">A request is traced down to a problem using “why?” questions, and the problem opens up several possible solutions.</desc>
<defs><marker id="ps-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="20" y="80" width="150" height="70" rx="10" class="d-pink d-ink" stroke-width="2"/>
<text x="34" y="108" class="d-text-dark" font-weight="700">Request</text>
<text x="34" y="128" class="d-text-dark" font-size="12">“Add chat”</text>
<rect x="240" y="80" width="170" height="70" rx="10" class="d-butter d-ink" stroke-width="2"/>
<text x="254" y="108" class="d-text-dark" font-weight="700">Real problem</text>
<text x="254" y="128" class="d-text-dark" font-size="12">Riders can’t find</text>
<text x="254" y="143" class="d-text-dark" font-size="12">the entrance</text>
<line x1="172" y1="115" x2="236" y2="115" class="d-ink" stroke-width="3" marker-end="url(#ps-a)"/>
<text x="180" y="105" class="d-text" font-size="11">why? ×5</text>
<rect x="480" y="15" width="145" height="50" rx="10" class="d-mint d-ink" stroke-width="2"/>
<text x="492" y="45" class="d-text-dark" font-size="12">Landmark + gate photo</text>
<rect x="480" y="90" width="145" height="50" rx="10" class="d-mint d-ink" stroke-width="2"/>
<text x="492" y="120" class="d-text-dark" font-size="12">“Confirm your pin” step</text>
<rect x="480" y="165" width="145" height="50" rx="10" class="d-surface d-ink" stroke-width="2"/>
<text x="492" y="195" class="d-text" font-size="12">Chat (one option)</text>
<line x1="412" y1="105" x2="476" y2="45" class="d-ink" stroke-width="2" marker-end="url(#ps-a)"/>
<line x1="412" y1="115" x2="476" y2="115" class="d-ink" stroke-width="2" marker-end="url(#ps-a)"/>
<line x1="412" y1="125" x2="476" y2="188" class="d-ink" stroke-width="2" marker-end="url(#ps-a)"/>
</svg>
<figcaption>Go down to the problem, then back up to several solutions. The original request becomes just one option.</figcaption>
</figure>

## Step by step

When someone brings you a solution:

1. **Thank them and write it down.** Don’t argue. The request contains useful signal.
2. **Ask “what problem would this solve?”** and “who has that problem?”
3. **Ask for evidence.** “How do we know?” Support tickets, data, user quotes, lost deals.
4. **Use the 5 whys** to get to the root struggle.
5. **Write a problem statement** using the user / need / because / consequence format. Check it contains no feature.
6. **Size it.** How many users have this problem, how often, and how painful is it?
7. **Generate at least three solutions**, including the original request and one very cheap option.
8. **Pick the best one to test**, using the four risks from the earlier lesson.
9. **Go back to the requester** and show the problem you found and the option you chose. They usually feel heard, even if you chose differently.

## Common mistakes

1. **Rejecting solution requests outright.** People bring solutions because they’ve seen a real pain. Dig, don’t dismiss.
2. **Hiding a solution inside a problem statement.** “Users need a chat feature to get help” still names chat.
3. **Stopping at the first “why”.** The first answer is usually a symptom.
4. **Only generating one solution.** If you have one option, you have no decision.
5. **Spending forever in the problem space.** Discovery is time-boxed. When the problem is clear enough, test a solution.

## How it shows up in interviews

> [!INTERVIEW]
> **“Your CEO wants a chat feature. What do you do?”**
> Outline: welcome the idea → ask what problem it solves and for whom → gather evidence (tickets, data, interviews) → define the problem → generate options (chat is one) → test the cheapest valuable option → report back. Mention cost and risk of chat (moderation, real-time infra, support load).

> [!INTERVIEW]
> **“Design a feature for X.”** (any product design question)
> Outline: never jump to the feature. Spend the first third of the answer on users, their problems and which problem to focus on. Interviewers grade this heavily.

## Practice exercise

**Task (25 minutes):** Turn each request into a problem statement, then list three solutions (one must be the original request, one must be very cheap).

1. “Add a wishlist to the Swiggy Instamart app.”
2. “Build an AI chatbot for Zerodha support.”
3. “Add Hindi language support to Meesho’s seller app.”

```answer Reveal model answers
**1. Instamart wishlist**
- Problem: Regular grocery shoppers need a quick way to rebuy the items they buy every week, because searching for 15 items one by one takes several minutes, which today leads to smaller baskets and abandoned sessions.
- Solutions: wishlist (original); “Buy again” list auto-built from past orders (cheap: data already exists); a scheduled weekly basket.

**2. Zerodha AI chatbot**
- Problem: Traders need fast answers to account and order questions during market hours, because a wrong or late answer can cost money, which today leads to long support queues and repeat tickets on the same topics.
- Solutions: AI chatbot (original); better in-app contextual help on the top 20 ticket topics (cheap); proactive status banners during known issues (e.g., exchange outage).

**3. Meesho Hindi seller app**
- Problem: Small sellers in tier 2–3 towns need to list and manage products confidently, because English labels cause mistakes in pricing and shipping settings, which today leads to listing errors and sellers dropping off after the first week.
- Solutions: full Hindi support (original); icons + short Hindi tooltips on the 10 most error-prone fields (cheap); video walkthroughs in Hindi on first login.
```

## Quiz

```quiz
Q: Which sentence is a problem statement, not a solution?
- [ ] We need to add a loyalty programme :: Names a solution: a loyalty programme.
- [ ] Build a recommendation carousel on the home screen :: Names a solution: a carousel.
- [x] Repeat customers can’t quickly find dishes they liked before, so they spend 4+ minutes browsing before ordering :: Correct. It names a user, a struggle and a consequence, and no feature.
- [ ] Launch AI-powered search :: Names a solution: AI search.

Q: Why is “build a chat feature” a solution rather than a problem?
- [ ] Because chat is a bad idea :: Chat might be a good idea. The issue is that it’s a “what”, not a “why”.
- [x] Because it names what to build without saying who struggles, when, or why :: Correct. Without the problem, you can’t judge whether chat is the best answer.
- [ ] Because it’s too technical :: Technical difficulty isn’t what makes something a solution.
- [ ] Because competitors already have chat :: What competitors have doesn’t change whether it’s a problem or a solution.

Q: A sales leader insists, “We need a CSV export, or we’ll lose the deal.” What should a PM do first?
- [ ] Refuse, because it’s a solution request :: Dismissing it loses useful signal.
- [ ] Build it immediately to save the deal :: Maybe later, but first understand what the customer needs.
- [x] Ask what the customer will do with the export, to find the underlying job :: Correct. They might need a monthly report for their finance team, which could be solved several ways.
- [ ] Ask engineering for an estimate :: Estimating before understanding the need may waste effort.

Q: What is the purpose of the “5 whys”?
- [ ] To make the requester justify their idea five times :: It’s a thinking tool, not an interrogation.
- [x] To dig past symptoms to the root cause of a problem :: Correct. Each “why” moves closer to the underlying struggle.
- [ ] To generate five different solutions :: It moves toward the problem, not toward solutions.
- [ ] To decide which of five features to build :: That’s prioritization, a different step.

Q: Why should you generate at least three solutions before choosing?
- [ ] Because managers expect three options :: That may be true, but it’s not the real reason.
- [x] Because with only one option you have no decision, and a cheaper or better option is often hidden :: Correct. Comparing options reveals trade-offs.
- [ ] Because you should build all three :: You’ll usually build one, at least first.
- [ ] Because three is the maximum the team can handle :: There’s no such rule.

Q: Which is a hidden solution inside a “problem” statement?
- [ ] Sellers don’t know which products are trending, so they restock slow sellers :: This is a real problem.
- [x] Users need a dashboard to see their spending :: Correct. “Dashboard” is a solution. The problem is something like “users can’t tell where their money goes each month”.
- [ ] New users drop off at KYC because the document upload fails on low-end phones :: This is a real problem.
- [ ] Riders wait 8 minutes on average at restaurants for orders that aren’t ready :: This is a real problem.
```

## Key takeaways

- A **problem** names a user, a situation and a struggle. A **solution** names something to build.
- If the sentence contains a **feature**, it’s a solution.
- Treat requests as **signals**: dig with “what problem?”, “who?”, “how do we know?” and the **5 whys**.
- Always generate **several solutions**, including a cheap one, before choosing.
- “Build a chat feature” is a solution; find the **problem behind it** first.

*Go deeper (optional):* search “problem space vs solution space Dan Olsen” for the classic framing.
