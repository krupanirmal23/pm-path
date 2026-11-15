---
id: w2-user-interviews
title: "User interview technique: past behaviour, not opinions"
week: 2
estimatedMinutes: 15
tags: [discovery, research, interviews]
---

## Why this matters for a PM

User interviews are the cheapest way to reduce value risk, and the easiest to do badly. Ask the wrong way and people will politely tell you what you want to hear. Ask the right way and five conversations can save five months of building the wrong thing. This lesson is the foundation for your P1 discovery report.

## Core concepts

### What a user interview is for

A **user interview** (also called a **discovery interview** or **customer interview**) is a one-on-one conversation to understand how someone currently deals with a problem: what they do, why, what it costs them, and what they’ve tried. It is *not* a sales pitch, a demo or a survey read aloud.

You’re trying to learn three things:
1. **Is the problem real?** Does it happen, how often, and how painful is it?
2. **What do people do today?** Their **workaround**: the current, imperfect way they solve it. A workaround is gold: it proves the problem is real enough that people spend effort on it.
3. **What matters to them?** The goals and constraints behind their choices.

### The golden rule: past behaviour, not opinions

People are bad at predicting what they’ll do and good at remembering what they did. So:

| Avoid (future / opinion) | Ask instead (past behaviour) |
|---|---|
| “Would you use an app that…?” | “Tell me about the last time you…” |
| “How much would you pay for…?” | “What did you spend on this last month?” |
| “Do you like this idea?” | “What have you tried to solve this? What happened?” |
| “Is X a problem for you?” | “Walk me through how you did X last week.” |
| “Would a feature that does Y help?” | “What was the hardest part of that?” |

Why it works: a question about a specific past event forces real memories, with details you can check. A question about the future invites a guess shaped by politeness.

### Leading questions and how to avoid them

A **leading question** pushes the person toward an answer. “Don’t you find it frustrating when delivery is late?” suggests the answer is yes. Neutral version: “How did you feel about the delivery time on your last order?”

Other traps:
- **Double questions:** “How do you pick a restaurant and pay?” Ask one at a time.
- **Yes/no questions:** they end conversations. Start with “how”, “what”, “tell me about”, “walk me through”.
- **Pitching:** the moment you describe your idea, the person starts being nice to you. Save ideas until the very end, or skip them.

### The interview structure (about 30–45 minutes)

1. **Intro (3 min).** Thank them, explain the purpose (“I’m learning how people manage X, there are no right answers”), ask for consent to record or take notes.
2. **Warm-up (5 min).** Easy context questions: their role, routine, how often they do the activity.
3. **The story (15–25 min).** “Tell me about the last time you…” Then dig deeper with follow-ups.
4. **Wrap-up (5 min).** “Is there anything I should have asked but didn’t?” “Who else should I talk to?” Thank them.

### Follow-up questions that unlock depth

The best insights come from follow-ups, not from your script:
- “What happened next?”
- “Why was that important?”
- “What did you do about it?”
- “Can you show me?” (screen share, photos, the actual spreadsheet)
- “How often does that happen?”
- “What did that cost you, in time or money?”
- Silence. Wait 3–4 seconds after they finish. People often add the most honest detail to fill the pause.

### Taking notes

- Capture **verbatim quotes** (their exact words) in quotation marks. You need them for your report: every insight must be backed by at least two quotes.
- Separate **observations** (what they said or did) from **interpretations** (what you think it means). Mark interpretations with “I think…”.
- Record (with permission) so you can listen instead of typing. Use transcripts afterwards (see this week’s tool guide).
- Write a 5-line summary within 15 minutes of each interview while it’s fresh.

### How many interviews?

For one focused problem and one user type, **5–8 interviews** usually reveal the main patterns. When the last two interviews teach you almost nothing new, you’ve reached **saturation**. For several user types, aim for 5 per type.

## Worked example

**P1 topic (example):** Young professionals in Bengaluru managing monthly household expenses with flatmates.

**Bad question:** “Would you use an app that automatically splits bills with flatmates?” Answer: “Yeah, sounds useful!” (Worthless.)

**Good sequence:**
- “Tell me about the last time you settled up shared expenses with your flatmates.”
  → “End of last month. I paid the Wi-Fi, electricity and the cook, and my flatmate paid groceries.”
- “How did you work out who owed what?”
  → “I wrote it in our WhatsApp group. Then we argued about the groceries because he’d bought stuff only he eats.”
- “What happened next?”
  → “Honestly we just rounded it off. I probably lost ₹600. It’s not worth the fight.”
- “How often does that happen?”
  → “Every month. We tried Splitwise once but nobody updated it after the first week.”
- “Why do you think nobody updated it?”
  → “Adding every expense is a chore. Bills come at different times, and the cook is paid in cash.”

**What you learned:** The problem is real (₹600/month lost, monthly arguments). There’s a workaround (WhatsApp + rounding off). An existing tool failed because logging every expense is a chore. That suggests the real opportunity is *effortless capture*, not *splitting maths*. You would never get this from “Would you use…?”

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 220" role="img" aria-labelledby="ui-t ui-d">
<title id="ui-t">Interview structure as a funnel</title>
<desc id="ui-d">Four stacked bands narrowing: intro, warm-up, the story with follow-ups (largest), wrap-up.</desc>
<polygon points="40,20 600,20 570,60 70,60" class="d-lavender d-ink" stroke-width="2"/>
<text x="240" y="45" class="d-text-dark" font-weight="700">Intro + consent · 3 min</text>
<polygon points="70,64 570,64 540,100 100,100" class="d-sky d-ink" stroke-width="2"/>
<text x="250" y="87" class="d-text-dark" font-weight="700">Warm-up context · 5 min</text>
<polygon points="100,104 540,104 490,170 150,170" class="d-butter d-ink" stroke-width="2"/>
<text x="185" y="132" class="d-text-dark" font-weight="700">“Tell me about the last time…” · 20 min</text>
<text x="195" y="154" class="d-text-dark" font-size="12">What happened next? Why? Show me. How often?</text>
<polygon points="150,174 490,174 460,206 180,206" class="d-mint d-ink" stroke-width="2"/>
<text x="230" y="195" class="d-text-dark" font-weight="700">Wrap-up + referrals · 5 min</text>
</svg>
<figcaption>Most of the time goes to one real story, explored with follow-ups.</figcaption>
</figure>

## Step by step

Running your first P1 interview:

1. **Write your learning goals** (3 max). Example: “How do people currently handle X? What’s the most painful part? What have they tried?”
2. **Draft an interview guide**: 2 warm-up questions, 1 story prompt (“Tell me about the last time…”), 6–8 follow-ups, 2 wrap-up questions. Use the Interview guide template in PM Path.
3. **Check every question**: is it about the past? Is it neutral? Is it one question? Rewrite any that fail.
4. **Do a pilot** with a friend. Fix confusing questions.
5. **Schedule 5–8 interviews** (see the next lesson on recruiting). Book 45 minutes, plan for 30.
6. **Run the interview.** Listen more than you talk. Aim for them speaking 80% of the time.
7. **Write a 5-line summary** immediately: who, key story, top 3 quotes, surprises, follow-up ideas.
8. **After every 2–3 interviews**, update your guide. Drop questions that never produce anything useful.

## Common mistakes

1. **Pitching your idea.** Once they know what you want to build, they’ll protect your feelings.
2. **Asking about the future.** “Would you…” and “How much would you pay…” produce fiction.
3. **Talking too much.** If you speak more than 25% of the time, you’re presenting, not interviewing.
4. **Only interviewing friends.** Friends are polite and often not your target user. Use them only for pilots.
5. **Accepting general answers.** “I usually…” hides the truth. Ask for a specific last time.
6. **Not writing quotes down.** Without exact words, your report becomes your opinion.

## How it shows up in interviews

> [!INTERVIEW]
> **“How would you validate that users need this feature?”**
> Outline: start with user interviews about past behaviour (5–8 people in the target segment) → look for workarounds and frequency → back it with data (support tickets, usage) → test with behaviour (fake door, prototype) → define what result would change your mind.

> [!INTERVIEW]
> **“Tell me about a time you talked to customers and it changed your direction.”**
> Outline: STAR story. The assumption you had → what you asked → the surprising answer (quote it) → what you changed → the result. Your Technical Marketing Engineer experience likely has one.

## Practice exercise

**Task (30 minutes):** Rewrite these eight bad questions into good past-behaviour questions. Then write a full 10-question interview guide for this topic: *“How working professionals in Bengaluru decide what to cook or order for dinner on weekdays.”*

1. Would you use a meal-planning app?
2. Don’t you hate deciding what to eat every day?
3. How much would you pay for a weekly meal plan?
4. Do you cook or order more?
5. What features would you want in a food app?
6. Is ordering food expensive for you?
7. Would you like healthier options?
8. How do you choose restaurants and pay for food?

```answer Reveal model answers
**Rewrites**
1. Tell me about how you decided what to eat for dinner yesterday.
2. Walk me through the last evening when deciding what to eat felt hard. What happened?
3. What did you spend on food last week, roughly, and how did that compare to what you expected?
4. Think about last week. Which evenings did you cook and which did you order? What made the difference?
5. What’s the most annoying thing that happened the last time you ordered food?
6. When did you last feel you spent too much on food? What did you do afterwards?
7. Tell me about the last time you tried to eat healthier. How did it go?
8. (Split in two) How did you pick the restaurant on your last order? … And how did you pay?

**Interview guide**
- Warm-up: What does a typical weekday look like for you? Who do you live with?
- Story: Tell me about how dinner happened last Tuesday, from when you first thought about it.
- Follow-ups: When did you start thinking about dinner? What options did you consider? What made you choose that one? What was the hardest part? How long did deciding take? How did you feel afterwards? What have you tried to make dinner decisions easier? How did that go?
- Wrap-up: Is there anything about dinner decisions I should have asked? Who else do you know who struggles with this?
```

## Quiz

```quiz
Q: Which question is most likely to produce reliable insight?
- [ ] Would you use an app that reminds you to drink water? :: Asks about future behaviour, which people predict badly.
- [x] Tell me about the last time you tried to drink more water. What happened? :: Correct. It asks about a specific past event, which produces real detail.
- [ ] Don’t you think staying hydrated is important? :: A leading question; almost everyone says yes.
- [ ] How much would you pay for a hydration app? :: People guess prices poorly; past spending is more reliable.

Q: Why are workarounds so valuable to discover?
- [ ] They show users don’t need a new product :: Usually the opposite: they show a real need that’s badly served.
- [x] They prove the problem is painful enough that people already spend effort on it :: Correct. Effort spent is strong evidence of a real problem.
- [ ] They tell you exactly what to build :: They inform solutions but don’t dictate them.
- [ ] They help you sell to the user :: Interviews aren’t sales conversations.

Q: You notice you’ve been talking for most of the interview. What’s the likely problem?
- [ ] Nothing, the interviewer should lead :: You lead the structure, but the user should do most of the talking.
- [x] You’re explaining or pitching instead of listening; aim for the user speaking ~80% of the time :: Correct. Your job is to draw out their story.
- [ ] The user is shy, so it’s fine :: Even with quiet users, use open questions and silence instead of filling the gap.
- [ ] You need more questions in your guide :: More questions usually means more talking, not more insight.

Q: Which is a leading question?
- [ ] What did you do after the payment failed? :: Neutral and open.
- [x] Wasn’t it annoying when the payment failed? :: Correct. It suggests the answer you expect.
- [ ] How did you pay for your last order? :: Neutral and specific: it asks about real past behaviour without suggesting an answer.
- [ ] Walk me through the checkout step by step :: Neutral and open.

Q: After how many interviews should you usually start seeing repeated patterns for one user type?
- [ ] 1–2 :: Too few to see patterns.
- [x] 5–8 :: Correct. Patterns usually emerge around here; stop when new interviews add little.
- [ ] 50+ :: That’s survey territory; interviews are for depth, not volume.
- [ ] You need statistical significance first :: Interviews are qualitative; significance doesn’t apply.

Q: What should your notes capture to support a discovery report?
- [ ] Your summary of what the user probably meant :: Interpretations are useful but must be marked separately.
- [x] Verbatim quotes, kept separate from your interpretations :: Correct. Each insight needs real quotes as evidence.
- [ ] Only the answers that support your idea :: That’s confirmation bias.
- [ ] Nothing; memory is enough :: Memory fades and distorts within hours.

Q: When is the right time to show your solution idea, if at all?
- [ ] At the start, so they know what you’re building :: This biases everything they say afterwards.
- [ ] In the middle, after warm-up :: Still biases the rest of the story.
- [x] At the very end, after you’ve learned their real story, or not at all :: Correct. Protect the unbiased part of the conversation.
- [ ] Never talk about solutions with users :: You can test solutions later with prototypes; discovery interviews just come first.
```

## Key takeaways

- Ask about **specific past behaviour** (“the last time you…”), never about hypothetical futures.
- Hunt for **workarounds**, **frequency** and **cost**; they prove a problem is real.
- Avoid **leading, double and yes/no questions**; don’t **pitch**.
- Let the user talk **80% of the time**; follow-ups and silence unlock the best insights.
- Capture **verbatim quotes**, kept separate from your interpretations.

*Go deeper (optional):* Rob Fitzpatrick’s short book *The Mom Test* covers this style of questioning.
