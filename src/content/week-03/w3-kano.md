---
id: w3-kano
title: The Kano model
week: 3
estimatedMinutes: 13
tags: [prioritization, frameworks, kano]
---

## Why this matters for a PM

Not all features affect satisfaction the same way. Some are expected (users only notice them when missing), some scale with quality, and some surprise and delight. The **Kano model** helps you decide what must be there, what to invest in, and where a small surprise goes a long way. It complements RICE: RICE asks *how much value per effort*; Kano asks *what kind of value*.

## Core concepts

### The idea

The Kano model (named after Professor Noriaki Kano) sorts features by how their presence or absence affects user satisfaction. Picture a chart: the horizontal axis is how well a feature is implemented (absent → fully present); the vertical axis is user satisfaction (frustrated → delighted).

### The five categories

**1. Basic needs (must-be).** Users expect them. If they’re missing, users are very unhappy. If present, users don’t notice or give credit.
- Example: a payments app showing whether a payment succeeded. A food app showing the delivery address.
- PM implication: get them right first. Don’t over-invest beyond “works reliably”.

**2. Performance needs (one-dimensional).** The better they are, the happier users are, roughly in a straight line. Users talk about them and compare on them.
- Example: delivery speed for Zepto; brokerage fees for traders; app load time.
- PM implication: these are where you compete. Invest where you can be clearly better.

**3. Delighters (attractive).** Users don’t expect them, so absence doesn’t hurt, but presence creates delight and word of mouth.
- Example: CRED’s playful rewards and design when it launched; Swiggy showing “your order is being packed” with a fun animation; Zerodha Varsity as free, high-quality education.
- PM implication: small investments can create big love. But delighters become expected over time.

**4. Indifferent.** Users don’t care either way.
- Example: an extra theme colour most users never change.
- PM implication: don’t build them, unless they serve another goal.

**5. Reverse.** Some users are actively *less* satisfied when present.
- Example: autoplay videos in a feed; forced social sharing; heavy gamification in a banking app for serious users.
- PM implication: be careful; segment users or make it optional.

### Features move over time

Today’s delighter is tomorrow’s basic need. Live order tracking was a delighter in Indian food delivery early on; now it’s expected. UPI payments in an app were once a performance feature; now they’re basic. This drift is why products must keep innovating just to keep satisfaction steady.

### The Kano questionnaire

To classify features with real users, Kano uses paired questions for each feature:
- **Functional:** “If the app had [feature], how would you feel?”
- **Dysfunctional:** “If the app did *not* have [feature], how would you feel?”

Answer options for both: *I like it / I expect it / I’m neutral / I can tolerate it / I dislike it.*

The combination classifies the feature. Simplified rules:
- Like it present + dislike it absent → **Performance**
- Like it present + neutral/tolerate absent → **Delighter**
- Expect/neutral present + dislike absent → **Basic**
- Neutral both ways → **Indifferent**
- Dislike present + like/neutral absent → **Reverse**

Survey 20–50 target users, classify each response, and take the most common category per feature.

### Kano in practice

You don’t always need a full survey. Use Kano as a **thinking lens** in planning:
- Are all basics covered and reliable? (If not, fix first.)
- Which performance attribute do we compete on?
- Is there one cheap delighter we can add?
- Are we building anything indifferent or reverse?

## Worked example

**P1 (flatmate expense app). Features classified with a quick Kano survey of 30 target users (illustrative).**

| Feature | Functional (present) | Dysfunctional (absent) | Category |
|---|---|---|---|
| Accurate balance of who owes whom | Expect | Dislike | Basic |
| Settle up via UPI in one tap | Like | Dislike | Performance |
| Effort to log an expense (less is better) | Like | Dislike | Performance |
| Monthly “flat harmony” summary with a friendly tone | Like | Neutral | Delighter |
| Expense charts by category | Neutral | Neutral | Indifferent |
| Leaderboard of who pays on time | Dislike (for many) | Neutral | Reverse |

**Decisions:**
- Basics: make balances bulletproof before anything else.
- Performance: compete on low logging effort and fast settle-up; these differentiate from Splitwise.
- Delighter: the friendly monthly summary is cheap and supports the “no one has to ask” insight.
- Skip charts for now (indifferent); kill the leaderboard (reverse: it creates the social tension users want to avoid).

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 300" role="img" aria-labelledby="kano-t kano-d">
<title id="kano-t">The Kano model</title>
<desc id="kano-d">A chart with implementation on the x axis and satisfaction on the y axis. The delighter curve rises sharply, the performance line rises diagonally, and the basic needs curve rises only to neutral.</desc>
<line x1="60" y1="150" x2="610" y2="150" class="d-ink" stroke-width="2"/>
<line x1="335" y1="20" x2="335" y2="280" class="d-ink" stroke-width="2"/>
<text x="470" y="170" class="d-text" font-size="11">Fully present →</text>
<text x="70" y="170" class="d-text" font-size="11">← Absent</text>
<text x="345" y="32" class="d-text" font-size="11">Delighted</text>
<text x="345" y="275" class="d-text" font-size="11">Frustrated</text>
<line x1="90" y1="260" x2="590" y2="40" style="stroke: var(--c-sky)" stroke-width="5"/>
<text x="470" y="72" class="d-text" font-weight="700" font-size="12">Performance</text>
<path d="M90 140 C 300 135 450 110 590 30" fill="none" style="stroke: var(--c-mint)" stroke-width="5"/>
<path d="M90 140 C 300 135 450 110 590 30" fill="none" class="d-ink" stroke-width="1"/>
<text x="520" y="22" class="d-text" font-weight="700" font-size="12">Delighters</text>
<path d="M90 275 C 200 260 300 200 590 160" fill="none" style="stroke: var(--c-pink)" stroke-width="5"/>
<path d="M90 275 C 200 260 300 200 590 160" fill="none" class="d-ink" stroke-width="1"/>
<text x="470" y="200" class="d-text" font-weight="700" font-size="12">Basic needs</text>
</svg>
<figcaption>Basics only prevent frustration; performance scales satisfaction; delighters create surprise and love.</figcaption>
</figure>

## Step by step

1. **List 8–12 features or attributes** for your product (existing and proposed).
2. **Quick classification:** for each, guess the category using the definitions. Mark your confidence.
3. **Validate the uncertain ones** with a Kano survey (Google Form) to 20–50 target users: paired functional/dysfunctional questions with the five answer options.
4. **Classify each response** using the simplified rules, then take the most common category per feature.
5. **Check basics:** are any missing or unreliable? These jump to the top.
6. **Choose 1–2 performance attributes** to compete on, aligned with your positioning.
7. **Pick one cheap delighter** that reinforces your key insight.
8. **Drop indifferent and reverse features** (or make reverse ones optional for a segment).
9. **Feed this into RICE**: Kano informs impact scores and sequencing.

## Common mistakes

1. **Chasing delighters while basics are broken.** No animation fixes a failed payment.
2. **Over-investing in basics.** Beyond “reliable and clear”, extra polish gives little return.
3. **Assuming categories are permanent.** Re-check yearly; delighters decay into basics.
4. **Classifying without users.** Your guess about what delights is often wrong.
5. **Ignoring segments.** A feature can be a delighter for beginners and indifferent for experts.
6. **Using Kano alone.** It doesn’t consider effort or reach; combine with RICE.

## How it shows up in interviews

> [!INTERVIEW]
> **“How would you decide which features to include in an MVP?”**
> Outline: identify the core job → include all basic needs for that job → include the one performance attribute you’ll compete on → maybe one cheap delighter → exclude everything else. Kano gives clean language for this.

> [!INTERVIEW]
> **“Live order tracking used to be a differentiator. What happened, and what does it mean for product teams?”**
> Outline: delighter → became expected (basic) as competitors copied → satisfaction no longer rises with it, but frustration rises if it fails → teams must keep reliability high and find new delighters.

## Practice exercise

**Task (20 minutes):** Classify these 8 features of a ride-hailing app (Ola/Uber/Rapido) into Kano categories for a daily commuter. Then pick one basic to protect, one performance attribute to compete on, and one cheap delighter to add.

1. Showing the driver’s name, photo and vehicle number
2. Pickup ETA accuracy
3. Price shown before booking
4. In-ride music choice
5. Fare lower than competitors
6. A “you saved X minutes vs. your usual route” message
7. Ride-sharing with strangers forced on by default
8. Safety SOS button

```answer Reveal a model answer
1. Driver details: **Basic** (expected; huge frustration and safety concern if missing).
2. ETA accuracy: **Performance** (more accurate = more satisfied).
3. Price before booking: **Basic** today (was performance/delighter years ago).
4. In-ride music choice: **Indifferent** for most commuters (maybe a delighter for a few).
5. Lower fare: **Performance**.
6. “You saved X minutes”: **Delighter** (unexpected, positive, cheap).
7. Forced ride-sharing by default: **Reverse** for many commuters.
8. SOS button: **Basic** (expected for safety; rarely used, but absence would be unacceptable).

**Protect:** driver details and SOS reliability.
**Compete on:** pickup ETA accuracy (it directly addresses cancellations and waiting, the biggest pain).
**Delighter:** the “minutes saved” message on frequent routes.
```

## Quiz

```quiz
Q: Users don’t mention a feature when it works but are furious when it fails. Which Kano category is it?
- [x] Basic need :: Correct. Expected; absence causes dissatisfaction, presence earns no extra credit.
- [ ] Performance :: Performance features earn more satisfaction as they improve.
- [ ] Delighter :: Delighters aren’t expected, so their absence doesn’t cause anger.
- [ ] Indifferent :: Users would not be furious about an indifferent feature.

Q: Which is the best example of a performance attribute for a quick-commerce app?
- [ ] Showing the delivery address :: That’s a basic need.
- [x] Delivery speed :: Correct. Faster delivery makes users steadily happier, and they compare apps on it.
- [ ] A surprise free chocolate on your birthday :: That’s a delighter.
- [ ] A hidden settings page :: Likely indifferent.

Q: Why do delighters tend to become basic needs over time?
- [ ] Users get bored of features :: Boredom isn’t quite it.
- [x] Competitors copy them and users start to expect them :: Correct. Expectations rise across the market.
- [ ] Delighters become more expensive :: Cost doesn’t change the category.
- [ ] Regulators require them :: Occasionally, but not the general reason.

Q: In a Kano survey, a user says they’d “like it” if a feature were present and are “neutral” if it were absent. What category is that response?
- [ ] Basic :: Basic would show dislike when absent.
- [ ] Performance :: Performance would show dislike when absent.
- [x] Delighter :: Correct. Present = like; absent = no problem.
- [ ] Reverse :: Reverse would show dislike when present.

Q: Your payments app has occasional failures to show payment status, and the team wants to build animated celebration screens. What should you prioritise?
- [ ] The animations, because delighters create love :: Delight can’t compensate for broken basics.
- [x] Fixing payment status reliability first :: Correct. Basics come before delighters.
- [ ] Both equally :: Basics are a precondition.
- [ ] Neither; focus on performance :: Broken basics must be fixed first.

Q: What does a “reverse” feature mean?
- [ ] A feature that works backwards :: Not what it means.
- [x] A feature some users actively dislike having :: Correct. Presence lowers their satisfaction.
- [ ] A feature that was removed :: Not what it means.
- [ ] A feature that only works offline :: Unrelated: “reverse” describes how users feel about a feature, not where it works.
```

## Key takeaways

- Kano sorts features by their effect on satisfaction: **basic, performance, delighter, indifferent, reverse**.
- Fix **basics first**; compete on **1–2 performance attributes**; add **cheap delighters**.
- **Delighters decay into basics** as competitors copy them.
- Validate with a **paired functional/dysfunctional survey** of 20–50 users.
- Combine Kano (type of value) with **RICE** (value per effort).
