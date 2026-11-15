---
id: w2-jtbd
title: Jobs to Be Done
week: 2
estimatedMinutes: 15
tags: [discovery, jtbd, frameworks]
---

## Why this matters for a PM

Jobs to Be Done (JTBD) is one of the most useful lenses in product work: it explains *why* people choose a product, and who your real competitors are. It turns fuzzy research into crisp statements a team can design for. Your P1 discovery report needs at least three JTBD statements.

## Core concepts

### The core idea

People don’t buy products; they **hire** them to make progress in a specific situation. When the product doesn’t help, they **fire** it and hire something else.

The **job** is the progress someone is trying to make in a given circumstance. It is stable over time even as solutions change. People have needed to “get from home to the office on time without stress” for a century. The solutions changed: bus, scooter, Ola, metro, Rapido.

### Three layers of a job

1. **Functional:** the practical task. “Get dinner on the table.”
2. **Emotional:** how they want to feel. “Feel like I’m taking care of myself, not living on junk.”
3. **Social:** how they want to be seen. “Look like I have my life together when friends visit.”

Products that serve all three layers win loyalty. Zerodha’s functional job is “execute trades cheaply”; its emotional job for many users is “feel like a serious, smart investor”; and the social job might be “be someone who invests sensibly, not someone who gambles”.

### The job statement

A standard format:

> **When** [situation], **I want to** [motivation], **so I can** [expected outcome].

- **Situation:** the trigger and context. Be specific about time, place, constraints.
- **Motivation:** what they’re trying to do, in their words, with no product named.
- **Outcome:** the result that tells them it worked.

Example: “**When** I get home after 9 p.m. too tired to cook, **I want to** get a filling, familiar meal with no decisions, **so I can** relax and sleep on time.”

Rules for a good job statement:
- **No product or feature** in it. “I want to use Swiggy” is not a job.
- **Specific situation.** “When I’m hungry” is too broad. The situation creates the need.
- **In the user’s language**, taken from interview quotes where possible.

### Forces of progress

Why do people switch from one solution to another, or fail to? JTBD describes four forces:

- **Push of the situation:** frustration with today’s way. (“Splitting bills on WhatsApp always ends in arguments.”)
- **Pull of the new solution:** the attraction of something better. (“An app that just does the maths sounds nice.”)
- **Anxiety of the new:** worries about switching. (“Will my flatmates bother to install it?”)
- **Habit of the present:** comfort with the current way. (“We’ve always done WhatsApp; it’s fine.”)

Switching happens only when **push + pull > anxiety + habit**. Many good products fail because they increase pull but ignore anxiety and habit. This is why “nobody updated Splitwise after the first week”: the habit of WhatsApp won.

### Your real competition

JTBD reveals **non-obvious competitors**. For the job “unwind after a long day”, Netflix competes with sleep, Instagram, a walk, and a phone call with family, not just with Hotstar. For “get groceries tonight”, Zepto competes with the kirana store downstairs, not just with Blinkit. Ask: “What did people *hire* for this job before your product existed?”

### JTBD in interviews

To uncover jobs, use the **switch interview** technique: talk to someone who recently started using a solution (or stopped). Reconstruct the timeline:
1. **First thought:** “When did you first think you needed something different?”
2. **Passive looking:** “What did you notice or try casually?”
3. **Active looking:** “When did you start seriously comparing options? What did you compare?”
4. **Deciding:** “What made you choose that one? What almost stopped you?”
5. **Using:** “How has it gone since? What surprised you?”

## Worked example

**Product: Zerodha Coin / Groww mutual funds. Research: 6 interviews with first-time investors.**

Quotes from interviews:
- “My dad kept asking if I’d started investing. I felt behind.”
- “I just wanted something safe that beats the FD.”
- “I picked the one with the most stars because I had no idea.”
- “I stopped the SIP when the market fell. I panicked.”

**Job statements:**
1. “When I get my first stable salary and feel pressure that I should be investing, I want to start with something safe and simple, so I can feel responsible without spending weeks learning.” (Functional + emotional + social: parental pressure.)
2. “When I have to choose between dozens of similar funds, I want a clear signal of which is ‘good enough’, so I can stop worrying that I picked wrong.”
3. “When the market drops and my portfolio shows red, I want reassurance that this is normal, so I can avoid panic-selling.”

**Forces for job 1:**
- Push: family pressure, money sitting idle in savings.
- Pull: “start with ₹500”, simple app.
- Anxiety: fear of losing money, jargon.
- Habit: FDs and savings accounts feel safe.

**Product implications:** Reduce anxiety (plain-language risk labels, “what happens if the market drops?” explainer before the first SIP). Job 3 suggests a feature that shows context during drops, timed to the moment of panic.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 250" role="img" aria-labelledby="jt-t jt-d">
<title id="jt-t">The four forces of progress</title>
<desc id="jt-d">Push and pull arrows point toward switching to the new solution; anxiety and habit arrows point back toward staying.</desc>
<defs><marker id="jt-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="20" y="95" width="140" height="60" rx="10" class="d-surface d-ink" stroke-width="2"/>
<text x="38" y="122" class="d-text" font-weight="700">Today’s way</text>
<text x="38" y="141" class="d-text" font-size="11">WhatsApp + rounding</text>
<rect x="480" y="95" width="140" height="60" rx="10" class="d-mint d-ink" stroke-width="2"/>
<text x="498" y="122" class="d-text-dark" font-weight="700">New solution</text>
<text x="498" y="141" class="d-text-dark" font-size="11">Expense app</text>
<rect x="180" y="20" width="130" height="50" rx="10" class="d-pink d-ink" stroke-width="2"/>
<text x="192" y="42" class="d-text-dark" font-weight="700">Push</text><text x="192" y="60" class="d-text-dark" font-size="11">“We argue monthly”</text>
<rect x="330" y="20" width="130" height="50" rx="10" class="d-sky d-ink" stroke-width="2"/>
<text x="342" y="42" class="d-text-dark" font-weight="700">Pull</text><text x="342" y="60" class="d-text-dark" font-size="11">“Auto maths!”</text>
<line x1="245" y1="72" x2="470" y2="110" class="d-ink" stroke-width="3" marker-end="url(#jt-a)"/>
<line x1="395" y1="72" x2="475" y2="100" class="d-ink" stroke-width="3" marker-end="url(#jt-a)"/>
<rect x="180" y="180" width="130" height="50" rx="10" class="d-butter d-ink" stroke-width="2"/>
<text x="192" y="202" class="d-text-dark" font-weight="700">Habit</text><text x="192" y="220" class="d-text-dark" font-size="11">“WhatsApp is fine”</text>
<rect x="330" y="180" width="130" height="50" rx="10" class="d-peach d-ink" stroke-width="2"/>
<text x="342" y="202" class="d-text-dark" font-weight="700">Anxiety</text><text x="342" y="220" class="d-text-dark" font-size="11">“Will they log it?”</text>
<line x1="245" y1="178" x2="165" y2="145" class="d-ink" stroke-width="3" marker-end="url(#jt-a)"/>
<line x1="395" y1="178" x2="165" y2="150" class="d-ink" stroke-width="3" marker-end="url(#jt-a)"/>
<text x="210" y="130" class="d-text" font-size="12">Switch only if push + pull &gt; habit + anxiety</text>
</svg>
<figcaption>Most products focus on pull. Winning products also reduce anxiety and habit.</figcaption>
</figure>

## Step by step

Writing JTBD statements from your interviews:

1. **Collect story moments.** From each interview, pull out the moments where something triggered action (“when I got my first salary…”, “when the bill arrived…”).
2. **Group similar situations** across interviews.
3. **For each group, write a draft statement** using When / I want to / So I can, using users’ words.
4. **Check the rules:** no product, specific situation, real outcome.
5. **Add emotional and social layers** if the quotes support them.
6. **Map the four forces** for your most important job.
7. **Back each statement with at least two quotes** from different people.
8. **List current “hires”** for each job, including non-obvious competitors.
9. **Pick one job to focus P1 on**, based on frequency, pain and how badly current solutions serve it.

## Common mistakes

1. **Putting a product in the job.** “When I want to order food, I want to use an app…” is a solution, not a job.
2. **Situations that are too broad.** “When I’m hungry” applies to everyone always; it guides nothing.
3. **Writing jobs from imagination.** Jobs must come from research, backed by quotes.
4. **Only describing the functional job.** Emotional and social layers often decide the choice.
5. **Ignoring anxiety and habit.** Most switching fails on these forces, not on lack of features.
6. **Too many jobs.** Five vague jobs are worse than two sharp ones.

## How it shows up in interviews

> [!INTERVIEW]
> **“Who are Netflix’s competitors in India?”**
> Outline: use the job (“unwind after a long day” / “entertain the family on the weekend”) → list obvious competitors (Hotstar, Prime) and non-obvious ones (YouTube, Instagram Reels, cricket on TV, sleep, going out) → explain which ones matter most for which job and segment → implication for strategy.

> [!INTERVIEW]
> **“Design a product for first-time investors.”**
> Outline: define the user → job statements across functional, emotional, social → forces of progress (anxiety is huge) → pick the job to focus on → solutions that reduce anxiety → metric (e.g., % still investing after 6 months).

## Practice exercise

**Task (25 minutes):** Using these interview quotes about weekday dinners, write two JTBD statements and map the four forces for one of them.

- “By the time I log off at 8:30, I can’t even think about cooking.”
- “I end up ordering the same paneer biryani because I know it’s fine.”
- “I feel guilty that I’ve eaten outside food five days in a row.”
- “I tried those meal-kit things but chopping still took 30 minutes.”
- “My cook comes only in the morning, so dinner is leftovers or Swiggy.”
- “When my parents call and ask what I ate, I lie a little.”

```answer Reveal a model answer
**Job 1:** “When I finish work late and I’m mentally drained, I want a dinner I don’t have to think about, so I can eat something reliable and switch off.”
**Job 2:** “When I’ve eaten outside food several days in a row, I want a healthier home-style meal without the effort of cooking, so I can stop feeling guilty and honestly tell my parents I’m eating well.” (Functional + emotional + social.)

**Forces for Job 2:**
- Push: guilt about outside food; parents asking; tiredness.
- Pull: idea of home-style meals delivered or ready in minutes.
- Anxiety: “Will it taste good?”, “Will it be expensive?”, “Meal kits still took 30 minutes.”
- Habit: the reliable paneer biryani order; leftovers from the morning cook.

**Implication:** a solution must be as low-effort as the habitual order (one tap, no chopping) and feel genuinely home-style. Competitors include tiffin services, the morning cook cooking extra, and the familiar Swiggy order.
```

## Quiz

```quiz
Q: Which is a well-formed job statement?
- [ ] When I open Swiggy, I want to see offers, so I can save money :: It names a product and starts from inside the solution.
- [ ] I want a better food delivery app :: No situation, names a solution category.
- [x] When I get home late and too tired to cook, I want a familiar meal with no decisions, so I can relax and sleep on time :: Correct. Specific situation, motivation and outcome, with no product.
- [ ] When I’m hungry, I want food :: Too broad to guide any decision.

Q: According to the forces of progress, when does a person switch to a new solution?
- [ ] When the new solution has more features :: Features add pull, but anxiety and habit can still win.
- [x] When push and pull outweigh anxiety and habit :: Correct. All four forces matter.
- [ ] When the new solution is cheaper :: Price is one factor; it doesn’t guarantee switching.
- [ ] When they see an advertisement :: Ads can add pull but rarely overcome strong habit alone.

Q: For the job “get groceries tonight”, which is a non-obvious competitor to Zepto?
- [ ] Blinkit :: An obvious, direct competitor.
- [ ] Swiggy Instamart :: An obvious, direct competitor.
- [x] The kirana store downstairs :: Correct. It’s hired for the same job but isn’t an app.
- [ ] Amazon Fresh :: Another online grocery option; fairly obvious.

Q: A user says, “I want my friends to see I invest smartly.” Which layer of the job is this?
- [ ] Functional :: Functional is the practical task, like executing a trade.
- [ ] Emotional :: Emotional is about how they feel themselves.
- [x] Social :: Correct. It’s about how they want to be seen by others.
- [ ] Financial :: Not one of the three JTBD layers.

Q: Why did many people stop using an expense app after a week, according to the forces model?
- [ ] The app had too few features :: The interviews pointed to effort and habit, not missing features.
- [x] The habit of the old way and the effort of logging every expense outweighed the pull :: Correct. Habit and anxiety (effort) beat pull.
- [ ] The app was too cheap :: Price wasn’t the issue.
- [ ] Users didn’t have smartphones :: Not supported by the research.

Q: What is the main benefit of a switch interview?
- [ ] It helps sell the new product :: Interviews aren’t for selling.
- [x] It reconstructs the timeline of a real decision, revealing triggers, alternatives and anxieties :: Correct. It shows the forces in action.
- [ ] It gives statistically significant results :: Interviews are qualitative.
- [ ] It replaces the need for data :: Interviews and data work together.
```

## Key takeaways

- People **hire** products to make **progress** in a specific **situation**; the job outlasts any solution.
- Write jobs as **When… I want to… so I can…**, with **no product** and a **specific situation**.
- Jobs have **functional, emotional and social** layers.
- Switching happens only when **push + pull > anxiety + habit**; reduce anxiety and habit, not just add pull.
- JTBD reveals **non-obvious competitors**: whatever people hired for the job before you.

*Go deeper (optional):* Clayton Christensen’s *Competing Against Luck*, and Bob Moesta’s work on switch interviews.
