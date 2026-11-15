---
id: w2-affinity-mapping
title: Affinity mapping and synthesis
week: 2
estimatedMinutes: 14
tags: [discovery, synthesis, research]
---

## Why this matters for a PM

After five interviews you’ll have hours of transcripts and pages of notes. Raw notes don’t persuade anyone. **Synthesis** turns them into a few clear, evidence-backed insights that a team can act on. Your Week 2 checkpoint, “every insight is backed by at least 2 quotes”, is a synthesis test.

## Core concepts

### Research data, findings, insights

Three levels, often confused:

- **Data (observations):** what a participant said or did, captured verbatim. “I rounded it off; I probably lost ₹600.”
- **Finding (pattern):** something that shows up across several participants. “4 of 6 participants accept small losses rather than argue about money.”
- **Insight:** the *why* behind the pattern, and what it means for the product. “People value the friendship more than exact fairness, so any tool that forces exact accounting creates the conflict they’re trying to avoid. A good solution should make fairness effortless and invisible.”

A strong insight is **surprising** (not obvious before research), **explains** behaviour, and **implies action**.

### What affinity mapping is

**Affinity mapping** (also called **affinity diagramming**) is a simple way to find patterns: you write each observation on its own sticky note, then group notes that seem related, bottom-up, without starting from categories. Once groups form, you name them. The names become your themes.

Why bottom-up matters: if you start with categories (“pricing”, “usability”), you’ll force notes into your existing assumptions. Letting groups emerge reveals what users actually care about.

### The process in brief

1. **Extract**: one observation per sticky note, with a participant code (P1, P2…). Quotes in quotation marks.
2. **Cluster**: move notes that feel related next to each other. Don’t name groups yet.
3. **Name**: once a cluster has 3+ notes from 2+ people, give it a name that reads like a sentence from the user’s point of view (“I avoid money conversations with friends”), not a label (“Communication”).
4. **Group the groups**: cluster themes into 3–5 higher-level themes.
5. **Count and check**: how many participants contributed to each theme? Themes from one person are anecdotes.
6. **Write insights**: for each top theme, write the pattern, the why, and the implication, plus 2+ supporting quotes.

### Sticky-note quality

Good notes are:
- **One idea each.**
- **Self-contained**: understandable without the transcript. “P3: Pays cook in cash, never records it” beats “P3: cash thing”.
- **Tagged** with the participant code, so you can count how many people mention something.
- **Colour-coded by type** if helpful: quotes (yellow), behaviours (blue), pains (pink), workarounds (green).

Expect 30–60 notes per interview hour.

### Avoiding synthesis bias

- **Confirmation bias:** noticing only notes that support your idea. Counter it by looking for a theme that *contradicts* your hypothesis.
- **Recency bias:** overweighting the last interview. Counter it by synthesising all interviews together.
- **Loudest voice:** one articulate participant dominates. Counter it by counting distinct participants per theme.
- **Synthesising alone:** if possible, sort notes with one other person; disagreements reveal assumptions.

### From themes to the discovery report

Your P1 report needs **top 3 themes with quotes**. Each theme section:
- **Theme headline** (a user-voice sentence)
- **How many participants** (e.g., 5 of 6)
- **2–4 verbatim quotes** from different participants
- **Insight** (why it happens)
- **Implication** (what it means for the product)

## Worked example

**P1 research: 6 interviews on shared household expenses.** After extraction, 180 sticky notes. Clusters that emerged:

**Theme A: “I’d rather lose a little money than argue with friends.”** (5 of 6)
- P1: “We just round it off. I probably lose ₹600 a month.”
- P4: “Asking for ₹230 feels petty.”
- P6: “If I push, it becomes a thing in the flat.”
- *Insight:* Social cost of asking > financial loss. Tools that make users *ask* for money increase the very discomfort they avoid.
- *Implication:* Settling up should feel automatic and neutral, not like one person chasing another.

**Theme B: “Logging every expense is a chore nobody keeps up.”** (4 of 6)
- P2: “Splitwise lasted one week.”
- P3: “The cook is cash; groceries are three different apps.”
- P5: “I forget to add it, then I can’t remember the amount.”
- *Insight:* Expenses are scattered across payment methods, and manual entry fails within days.
- *Implication:* Capture must be near-zero effort (e.g., from UPI history or recurring templates).

**Theme C: “Recurring bills are predictable; random ones cause fights.”** (4 of 6)
- P1: “Rent and Wi-Fi are fine. It’s the random Zepto orders.”
- P6: “Who bought the toilet paper? That’s where it goes wrong.”
- *Insight:* Fixed bills are already handled by simple rules; conflict lives in small, irregular, shared purchases.
- *Implication:* Focus P1 on small shared purchases, not rent.

**A contradicting note** (kept on purpose): P2 enjoys tracking every rupee and uses a spreadsheet. This suggests a small “meticulous” segment exists; not the primary focus, but worth noting.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 240" role="img" aria-labelledby="am-t am-d">
<title id="am-t">Affinity map: from scattered notes to themes</title>
<desc id="am-d">On the left, scattered sticky notes. On the right, notes grouped under three named themes.</desc>
<defs><marker id="am-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<g class="d-ink" stroke-width="1.5">
<rect x="30" y="30" width="40" height="30" class="d-butter"/><rect x="90" y="50" width="40" height="30" class="d-pink"/><rect x="45" y="90" width="40" height="30" class="d-sky"/><rect x="120" y="100" width="40" height="30" class="d-butter"/><rect x="30" y="150" width="40" height="30" class="d-pink"/><rect x="100" y="160" width="40" height="30" class="d-mint"/><rect x="160" y="40" width="40" height="30" class="d-sky"/><rect x="170" y="140" width="40" height="30" class="d-butter"/><rect x="60" y="195" width="40" height="30" class="d-mint"/>
</g>
<text x="60" y="20" class="d-text" font-size="12" font-weight="700">180 raw notes</text>
<line x1="225" y1="120" x2="285" y2="120" class="d-ink" stroke-width="3" marker-end="url(#am-a)"/>
<text x="228" y="108" class="d-text" font-size="11">cluster</text>
<rect x="300" y="20" width="320" height="60" rx="10" class="d-lavender d-ink" stroke-width="2"/>
<text x="314" y="45" class="d-text-dark" font-weight="700" font-size="12">A. “I’d rather lose money than argue”</text>
<text x="314" y="65" class="d-text-dark" font-size="11">5 of 6 participants · 23 notes</text>
<rect x="300" y="90" width="320" height="60" rx="10" class="d-lavender d-ink" stroke-width="2"/>
<text x="314" y="115" class="d-text-dark" font-weight="700" font-size="12">B. “Logging every expense is a chore”</text>
<text x="314" y="135" class="d-text-dark" font-size="11">4 of 6 participants · 19 notes</text>
<rect x="300" y="160" width="320" height="60" rx="10" class="d-lavender d-ink" stroke-width="2"/>
<text x="314" y="185" class="d-text-dark" font-weight="700" font-size="12">C. “Random small buys cause fights”</text>
<text x="314" y="205" class="d-text-dark" font-size="11">4 of 6 participants · 14 notes</text>
</svg>
<figcaption>Let clusters emerge from the notes; name them in the user’s voice; count participants, not notes.</figcaption>
</figure>

## Step by step

A two-hour synthesis session for 5–6 interviews:

1. **Prepare (20 min).** Re-read each summary. Skim transcripts and copy key quotes and behaviours into a doc, one line each, with participant codes.
2. **Make stickies (20 min).** Paste lines into Miro sticky notes (Miro can create stickies from pasted lines; see the tool guide).
3. **Silent clustering (30 min).** Drag notes into groups by feel. Don’t name anything yet. Put “odd ones” in a parking area.
4. **Name clusters (15 min).** Write a user-voice headline for each cluster with 3+ notes from 2+ people.
5. **Merge into 3–5 themes (10 min).**
6. **Count (5 min).** For each theme, how many of your participants contributed?
7. **Write insights (20 min).** Pattern → why → implication, with 2–4 quotes.
8. **Look for contradictions (5 min).** Note at least one finding that challenges your expectations.
9. **Rank themes** by frequency × pain × relevance to P1. The top 3 go in your report.

## Common mistakes

1. **Starting with categories.** Top-down buckets reproduce your assumptions.
2. **Labels instead of insights.** “Pricing” says nothing. “I don’t trust the final price until checkout” says a lot.
3. **Counting notes, not people.** One chatty participant can create 15 notes on one topic.
4. **Insights with no quotes.** Without evidence, it’s your opinion.
5. **Stopping at findings.** “People forget to log expenses” is a finding; the insight explains why and what to do.
6. **Discarding contradictions.** The note that doesn’t fit often hides the most valuable learning.

## How it shows up in interviews

> [!INTERVIEW]
> **“You’ve done 10 user interviews. How do you turn them into decisions?”**
> Outline: extract observations with participant codes → affinity map bottom-up → name themes in user voice → count participants → write insights (pattern, why, implication) with quotes → rank by frequency × pain × strategic fit → turn the top insight into a problem statement and opportunities.

> [!INTERVIEW]
> **“What’s the difference between a finding and an insight?”**
> Outline: finding = pattern of what happens; insight = why it happens and what it implies. Give one example of each from your P1 research.

## Practice exercise

**Task (30 minutes):** Here are 16 notes from 4 interviews about using quick-commerce apps. Group them into 3 themes, name each in the user’s voice, count participants, and write one insight with an implication for the strongest theme.

- P1: “I check all three apps for the same item.”
- P1: “Fees show up only at the end.”
- P1: “If the item is missing, I find out at the door.”
- P2: “I always add stuff to cross the free delivery limit.”
- P2: “Blinkit was ₹12 cheaper for the same curd.”
- P2: “The substitute was a totally different brand.”
- P3: “Handling fee, delivery fee, small cart fee… what?”
- P3: “I don’t compare, I just open the one that’s fastest.”
- P3: “They refunded but I still needed the milk.”
- P4: “I open Zepto and Instamart side by side.”
- P4: “I end up spending ₹150 more than I planned to save ₹30 delivery.”
- P4: “Out-of-stock after ordering is the worst.”
- P1: “Speed matters more than ₹10.”
- P3: “I feel tricked by the final amount.”
- P4: “I wish it just said the total upfront.”
- P2: “Late-night orders often miss one item.”

```answer Reveal a model answer
**Theme 1: “I don’t trust the price until the very end.”** (P1, P2, P3, P4: 4 of 4)
Notes: fees only at the end (P1); add stuff to cross the limit (P2); handling/delivery/small cart fee (P3); feel tricked (P3); spend ₹150 more to save ₹30 (P4); wish it said the total upfront (P4).

**Theme 2: “I lose the thing I needed when items go missing.”** (P1, P2, P3, P4: 4 of 4)
Notes: find out at the door (P1); substitute was a different brand (P2); late-night orders miss an item (P2); refund but still needed milk (P3); out-of-stock after ordering is the worst (P4).

**Theme 3: “I compare apps, unless speed decides for me.”** (P1, P2, P3, P4: 4 of 4, split behaviour)
Notes: check all three (P1); Blinkit ₹12 cheaper (P2); open the fastest (P3); side by side (P4); speed beats ₹10 (P1).

**Insight (Theme 1):** Users don’t mind paying fees as much as they mind discovering them late. Fragmented, late fees make them feel tricked and push them into padding the cart, which feels like manipulation. Trust in the final total is a reason to stay loyal to one app instead of comparing.
**Implication:** Show an all-in estimated total from the first item, with a clear “add ₹X to remove the ₹Y fee” prompt. Success metric: fewer checkout abandonments and less multi-app comparison (measured via survey or reduced session drop-off at payment).
```

## Quiz

```quiz
Q: Which is an insight rather than a finding?
- [ ] 4 of 6 participants forgot to log expenses :: That’s a finding: a pattern of what happens.
- [x] People forget to log because expenses are scattered across payment methods, so any tool relying on manual entry will fail within days :: Correct. It explains why and implies what to do.
- [ ] P3 pays the cook in cash :: That’s a single observation.
- [ ] Expense tracking :: That’s a label, not even a finding.

Q: Why build affinity groups bottom-up instead of starting with categories?
- [ ] It’s faster :: Not necessarily.
- [x] Pre-set categories push notes into your existing assumptions; bottom-up lets real patterns emerge :: Correct. That’s the main purpose of affinity mapping.
- [ ] Categories are not allowed in research :: There’s no such rule; they just bias the outcome when used first.
- [ ] It produces more themes :: The number of themes isn’t the goal.

Q: A theme has 14 notes, all from one participant. What should you conclude?
- [ ] It’s the strongest theme :: Many notes from one person isn’t a pattern.
- [x] It’s an anecdote until other participants support it :: Correct. Count distinct people, not notes.
- [ ] Delete it immediately :: Keep it as a possible lead; just don’t present it as a pattern.
- [ ] It proves the problem is universal :: One person can’t prove that.

Q: Which theme name is best?
- [ ] Payments :: A bare label.
- [ ] Usability issues :: Vague and generic.
- [x] “I don’t trust the total until checkout” :: Correct. User-voice, specific and meaningful.
- [ ] Miscellaneous :: A parking spot, not a theme.

Q: How should you handle a note that contradicts your main hypothesis?
- [ ] Remove it to keep the story clean :: That’s confirmation bias.
- [x] Keep it and explore it; it may reveal a segment or a flaw in your thinking :: Correct. Contradictions are valuable.
- [ ] Ask the participant to change their answer :: Never do this: it corrupts the evidence. Participants’ words are the data.
- [ ] Count it as supporting evidence anyway :: That misrepresents the data.

Q: What should each theme in your discovery report include?
- [ ] Only your interpretation :: Without evidence, it’s opinion.
- [x] A user-voice headline, participant count, 2+ quotes, an insight and an implication :: Correct. That’s the full chain from evidence to action.
- [ ] A screenshot of the Miro board only :: The board alone doesn’t communicate the insight.
- [ ] The full transcripts :: Too long; link them instead.
```

## Key takeaways

- **Data → finding → insight**: what was said, what repeats, and **why it matters**.
- **Affinity mapping** clusters one-idea sticky notes **bottom-up**, then names themes in the **user’s voice**.
- Count **participants, not notes**; a theme needs 2+ people to be a pattern.
- Every insight needs **2+ verbatim quotes** and an **implication** for the product.
- Look for and keep **contradicting evidence**; it guards against confirmation bias.
