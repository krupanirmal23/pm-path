---
id: w2-personas-jtbd
title: Personas vs. JTBD
week: 2
estimatedMinutes: 12
tags: [discovery, personas, jtbd]
---

## Why this matters for a PM

Personas are everywhere in product teams, and they’re often useless: a stock photo, a made-up name, and a list of hobbies that guide no decision. JTBD focuses on situations instead of people. Knowing when to use each, and how to combine them, helps you communicate research in a way that actually changes what the team builds.

## Core concepts

### What a persona is

A **persona** is a fictional but research-based profile of a typical user, used to help a team remember who they’re designing for. A useful persona includes:
- A name and short description (so the team can refer to “Priya” instead of “segment 2”).
- **Goals**: what they’re trying to achieve.
- **Behaviours**: what they actually do today, including tools and workarounds.
- **Pain points**: where they struggle.
- **Context**: device, connectivity, time pressure, who else is involved.
- A few **real quotes** from research.

A poor persona includes: age, a stock photo, “loves yoga and coffee”, a favourite brand. None of that changes a design decision.

### What JTBD focuses on

JTBD (previous lesson) centres on the **situation and progress**, not the person. The same person can have very different jobs: Priya ordering lunch at her desk on a Tuesday (fast, cheap, no mess) and Priya ordering a Saturday dinner for friends (impressive, enough for 6) need different things. A persona called “Priya” blurs those situations together; two jobs keep them sharp.

### Side-by-side

| | Persona | JTBD |
|---|---|---|
| Unit of focus | A type of person | A situation and the progress wanted |
| Answers | “Who are we building for?” | “Why do they choose, and what does success look like?” |
| Strength | Builds empathy; easy to remember and share | Explains motivation and real competition; guides design and messaging |
| Risk | Becomes a stereotype; demographics with no decision value | Can feel abstract; loses the human face |
| Best for | Aligning a team on users; designing for context (device, skill level) | Prioritising problems; finding competitors; writing positioning |

### When personas help

Personas are useful when **who the user is changes the design**:
- Skill level: a first-time investor vs. an active trader need different screens on Zerodha.
- Constraints: a seller on a ₹8,000 Android phone with patchy 4G (Meesho) vs. an urban shopper on fast Wi-Fi.
- Roles in B2B: the finance manager who approves vs. the accountant who uses the tool daily.

### When JTBD helps more

JTBD is stronger when **the situation changes the need** more than the person does:
- Deciding *what to build first* (which job is most painful and underserved?).
- Understanding *why people switch* or churn.
- Writing marketing messages (“Dinner sorted in one tap after a long day”).

### The best of both: job-based personas

Most good teams combine them: a **lightweight persona** (role, context, constraints, skill) that holds **2–3 job statements**. The persona gives a human face; the jobs give direction. Some teams call this a **proto-persona** when it’s a first draft based on assumptions, to be validated by research. Label it clearly as assumptions until it’s backed by interviews.

### Segments, briefly

A **segment** is a group of users who share characteristics that matter for your product (behaviour, need, value to the business). Personas usually represent segments. Good segments are based on behaviour or needs (“sellers listing 50+ products a month”), not demographics alone.

## Worked example

**Product: Meesho seller app. Research: 8 interviews with small sellers.**

**Weak persona:**
> *Sunita, 34, Surat. Loves cooking and Bollywood. Mother of two. Uses Android.*
Nothing here tells the team what to build.

**Job-based persona:**
> **Sunita: home-based reseller, Surat**
> - Context: sells sarees from home, alongside childcare; works in bursts during the afternoon; ₹10,000 Android phone; Gujarati first, some Hindi, little English.
> - Skill: comfortable with WhatsApp and YouTube; unsure about forms and pricing settings.
> - Jobs:
>   1. “When I get new stock from the wholesaler, I want to list it in minutes, so I can start selling before the design goes out of fashion.”
>   2. “When an order is returned, I want to understand why and whether I’ll lose money, so I can decide whether to keep selling that item.”
>   3. “When I’m not sure about a setting, I want to ask someone who speaks my language, so I don’t make a costly mistake.”
> - Quotes: “Listing 20 sarees takes my whole afternoon.” “Return aaya, paisa kaata, pata nahi kyun.” (A return came, money was deducted, I don’t know why.)

Now the team can act: faster bulk listing from photos, a plain-language return explanation, help in regional languages.

**Second persona** for contrast: **Rahul, full-time reseller, 300+ listings**, whose main job is “When sales drop, I want to know which products to push, so I can keep monthly income stable.” Different job, different priorities: analytics, not simplicity.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 230" role="img" aria-labelledby="pj-t pj-d">
<title id="pj-t">A job-based persona card</title>
<desc id="pj-d">A card with the persona name and context on the left, and three job statements on the right.</desc>
<rect x="20" y="20" width="600" height="190" rx="12" class="d-surface d-ink" stroke-width="2"/>
<rect x="20" y="20" width="210" height="190" rx="12" class="d-lavender d-ink" stroke-width="2"/>
<text x="38" y="52" class="d-text-dark" font-weight="700" font-size="16">Sunita</text>
<text x="38" y="72" class="d-text-dark" font-size="12">Home reseller, Surat</text>
<text x="38" y="100" class="d-text-dark" font-size="11">• Works in short bursts</text>
<text x="38" y="118" class="d-text-dark" font-size="11">• ₹10k Android, patchy 4G</text>
<text x="38" y="136" class="d-text-dark" font-size="11">• Gujarati / Hindi first</text>
<text x="38" y="154" class="d-text-dark" font-size="11">• Unsure about settings</text>
<text x="38" y="186" class="d-text-dark" font-size="11" font-style="italic">“Listing takes my whole</text>
<text x="38" y="200" class="d-text-dark" font-size="11" font-style="italic">afternoon.”</text>
<rect x="245" y="35" width="360" height="48" rx="8" class="d-butter d-ink" stroke-width="2"/>
<text x="258" y="64" class="d-text-dark" font-size="12">Job 1: List new stock in minutes, before trends fade</text>
<rect x="245" y="91" width="360" height="48" rx="8" class="d-butter d-ink" stroke-width="2"/>
<text x="258" y="120" class="d-text-dark" font-size="12">Job 2: Understand returns and whether I lose money</text>
<rect x="245" y="147" width="360" height="48" rx="8" class="d-butter d-ink" stroke-width="2"/>
<text x="258" y="176" class="d-text-dark" font-size="12">Job 3: Get help in my language before mistakes</text>
</svg>
<figcaption>Persona for context and empathy; jobs for direction. No stock photos or hobbies needed.</figcaption>
</figure>

## Step by step

Building job-based personas from your P1 research:

1. **List the variables that changed behaviour** across your interviews: experience level, frequency, device, role, constraints.
2. **Group participants** by the 1–2 variables that mattered most. Usually you’ll get 2–3 groups.
3. **For each group**, write context, constraints and skill level in 4–5 bullets.
4. **Attach 2–3 job statements** from your JTBD work, each backed by quotes.
5. **Add 2 real quotes** that capture the group’s voice.
6. **Give each a name and role label** (“Sunita, home reseller”), no photo needed.
7. **Choose a primary persona** for P1. Say explicitly who you are *not* designing for first.
8. **Share and use them**: refer to personas by name in your PRD and design reviews.

## Common mistakes

1. **Demographic personas.** Age, hobbies and photos add bias, not insight.
2. **Inventing personas without research.** If they’re assumptions, label them proto-personas and test them.
3. **Too many personas.** Teams remember 2–3. Seven personas means no focus.
4. **Treating one persona as having one need.** People have different jobs in different situations.
5. **Creating personas and never using them.** If no decision mentions them, they’re decoration.

## How it shows up in interviews

> [!INTERVIEW]
> **“Who would you build this for?”** (in any product design question)
> Outline: list 3–4 user segments based on behaviour or needs → briefly compare them on pain and size → pick one with a clear reason → describe them with context + a job statement. Interviewers want to see you choose, not list.

> [!INTERVIEW]
> **“Do you prefer personas or JTBD?”**
> Outline: both have roles → personas for empathy and context (device, skill) → JTBD for motivation, prioritisation and competition → you combine them as job-based personas → example.

## Practice exercise

**Task (25 minutes):** For **Zerodha Kite**, create two job-based personas: one first-time investor and one active intraday trader. Each needs context (4 bullets), 2 job statements and 1 plausible quote. Then write one sentence on how their needs pull the product design in different directions.

```answer Reveal a model answer
**Ananya: first-time investor**
- Context: 24, first job in Bengaluru; invests ₹3,000–₹5,000 a month; checks the app weekly.
- Skill: knows basic terms (SIP, stock) but not order types.
- Device: phone only.
- Constraint: anxious about losing money; fears “doing it wrong”.
- Jobs: “When I want to buy my first stock, I want to place the order without jargon, so I can be sure I didn’t make a costly mistake.” / “When my holdings fall, I want to understand if it’s normal, so I can stay calm and not panic-sell.”
- Quote: “I didn’t know what ‘limit’ meant so I just picked market.”

**Vikram: active intraday trader**
- Context: 31, trades daily 9:15–15:30; dozens of orders a day.
- Skill: expert in order types, charts and margins.
- Device: laptop with multiple screens + phone backup.
- Constraint: every second and rupee counts.
- Jobs: “When I spot a setup, I want to place and modify orders in one or two keystrokes, so I can act before the price moves.” / “When the app lags during volatility, I want a reliable fallback, so I don’t get stuck in a losing position.”
- Quote: “If it freezes at 9:16 I lose more than a year of brokerage.”

**Tension:** Ananya needs explanation and guardrails (more steps, more clarity); Vikram needs speed and density (fewer steps, more data). Kite must serve both, for example with simple defaults plus power-user shortcuts.
```

## Quiz

```quiz
Q: Which persona detail is most useful for design decisions?
- [ ] Loves filter coffee and cricket :: Hobbies rarely affect product design.
- [ ] Is 29 years old :: Age alone doesn’t tell you what to build.
- [x] Uses a ₹9,000 Android phone on patchy 4G :: Correct. This constraint directly affects app size, loading and offline design.
- [ ] Has a stock photo of a smiling woman :: Photos add no decision value and can add bias.

Q: What is the main weakness of personas on their own?
- [ ] They are too expensive to make :: Cost isn’t the main issue.
- [x] They can blur different situations together and turn into stereotypes :: Correct. One person can have different jobs in different situations.
- [ ] Teams can’t remember them :: Good personas are usually memorable.
- [ ] They require statistical data :: They’re usually based on qualitative research.

Q: When is JTBD especially useful compared to personas?
- [ ] Choosing the colour scheme :: Neither tool helps much here.
- [x] Deciding which problem to solve first and understanding real competition :: Correct. JTBD clarifies motivation, pain and alternatives.
- [ ] Deciding the user’s age range :: That’s demographics.
- [ ] Writing release notes :: Not a primary use.

Q: What is a proto-persona?
- [ ] A persona based on 500 survey responses :: That’s a research-based persona.
- [x] A first-draft persona based on assumptions, to be validated by research :: Correct. Label it clearly until evidence backs it.
- [ ] A persona for prototype testers only :: Not what the term means.
- [ ] A persona of a competitor’s user :: Not what the term means.

Q: How many personas should a product team typically focus on?
- [ ] One for every user interviewed :: That’s far too many to be useful.
- [x] Two or three, with one clearly primary :: Correct. Enough to capture key differences, few enough to remember and prioritise.
- [ ] At least ten for full coverage :: Too many destroys focus.
- [ ] None; they’re always useless :: Good personas help with empathy and context.
```

## Key takeaways

- **Personas** describe *who*; **JTBD** describes the *situation and progress wanted*.
- Useful persona details are **context, constraints, skill and behaviour**, not hobbies or photos.
- Use personas when **who the user is changes the design**; use JTBD when **the situation changes the need**.
- Combine them as **job-based personas**: a light profile holding 2–3 job statements and real quotes.
- Keep to **2–3 personas** with one **primary**, and actually use them in decisions.
