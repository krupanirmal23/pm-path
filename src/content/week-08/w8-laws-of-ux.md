---
id: w8-laws-of-ux
title: Laws of UX
week: 8
estimatedMinutes: 14
tags: [ux, psychology, design]
---

## Why this matters for a PM

Users aren’t robots. They skim, get distracted, remember little and make quick judgements. A handful of well-tested **psychology principles** (often called “laws of UX”) explain why some designs feel effortless and others frustrate. Knowing them helps PMs make better design decisions, give sharper feedback, and justify choices with more than taste.

## Core concepts

### Hick’s law: more choices, slower decisions
The time to make a decision increases with the number and complexity of choices.
- Implication: reduce choices at key moments; group or progressively reveal options.
- Example: a checkout showing 9 payment methods at once slows people down. Show the user’s last-used method first and “More options” below.

### Fitts’s law: big and close is easy
The time to reach a target depends on its size and distance.
- Implication: make important buttons large and easy to reach; put them where thumbs naturally go on phones (lower part of the screen).
- Example: a sticky full-width “Place order” button at the bottom beats a small link at the top-right.

### Jakob’s law: users expect your product to work like others
Users spend most of their time in *other* apps, so they expect familiar patterns.
- Implication: don’t reinvent common patterns (search at the top, cart icon top-right or bottom tab, swipe to go back).
- Example: a new food app placing the cart in an unusual place confuses users trained by Swiggy and Zomato.

### Miller’s law: working memory is limited
People can hold only a small number of items in working memory (commonly cited as “7 ± 2”, though modern research suggests closer to 4 chunks).
- Implication: chunk information (phone numbers as 98450 12345; card numbers in groups of 4); don’t ask users to remember things across screens.

### Peak–end rule
People judge an experience mostly by its most intense moment (the peak) and its end, not the average.
- Implication: design great endings (clear confirmation, a delightful “order delivered” moment) and fix the worst moments first (payment failure).
- Example: CRED’s celebratory rewards screen at the end of a bill payment creates a positive memory of a dull task.

### Goal-gradient effect
People speed up as they get closer to a goal.
- Implication: show progress; give a head start.
- Example: “2 of 3 steps done” in KYC; a loyalty card that starts with 2 of 10 stamps filled gets completed faster than a blank 8-stamp card.

### Zeigarnik effect
People remember unfinished tasks better than finished ones.
- Implication: show incomplete progress to bring users back (“Complete your profile: 70%”). Use sparingly; it can feel nagging.

### Serial position effect
People best remember the first and last items in a list.
- Implication: put the most important items at the start and end of menus and lists.

### Von Restorff effect (isolation effect)
The item that stands out is remembered.
- Implication: make the primary action visually distinct; use emphasis sparingly so it works.

### Doherty threshold
Productivity and satisfaction rise when systems respond within about 400 ms.
- Implication: aim for fast responses; when you can’t, show immediate feedback (skeleton screens, progress), which makes waits feel shorter.

### Aesthetic–usability effect
People perceive attractive designs as easier to use and are more tolerant of small issues.
- Implication: visual polish matters, but it can hide real usability problems in tests. Watch behaviour, not just compliments.

### Tesler’s law (conservation of complexity)
Every system has some complexity that can’t be removed; the question is who handles it: the user or the system.
- Implication: absorb complexity for users (auto-fill address from PIN code; auto-detect UPI apps).

### Defaults are powerful
Most people stick with the default option.
- Implication: choose defaults that serve users (e.g., the most common delivery slot, sensible notification settings). Defaults that trick users (pre-ticked insurance add-ons) are **dark patterns**: designs that manipulate users against their interest, which damage trust and may break consumer protection guidelines.

## Worked example

**Redesigning a quick-commerce checkout with UX laws (illustrative).**

| Before | Principle | After |
|---|---|---|
| 9 payment methods in a long list | Hick’s law | Last-used method preselected; “Change” opens the full list |
| Small “Pay” link at top-right | Fitts’s law | Sticky full-width “Pay ₹486” button at the bottom |
| Fees revealed only on the final screen | Peak–end (bad peak) + status | All-in total visible from the cart; fee breakdown on tap |
| “Something went wrong” on failure | Peak–end (worst moment) | Clear reason, “money is safe”, one-tap retry with another method |
| Coupon code to be typed from memory | Recognition / Miller | Applicable coupons listed with one-tap apply |
| Pre-ticked “donate ₹2” | Defaults / dark pattern | Unticked by default with a clear option |

**Measured impact plan:** A/B test the new checkout; primary metric checkout completion; guardrails: support tickets about charges, refund requests.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 250" role="img" aria-labelledby="lux-t lux-d">
<title id="lux-t">Phone checkout annotated with UX laws</title>
<desc id="lux-d">A phone screen with a preselected payment method labelled Hick’s law, an all-in total labelled peak-end, and a large bottom button labelled Fitts’s law.</desc>
<rect x="210" y="10" width="220" height="230" rx="24" class="d-surface d-ink" stroke-width="3"/>
<rect x="228" y="40" width="184" height="40" rx="8" class="d-sky d-ink" stroke-width="2"/>
<text x="238" y="65" class="d-text-dark" font-size="11">✓ UPI · last used  ·  Change</text>
<rect x="228" y="92" width="184" height="60" rx="8" class="d-butter d-ink" stroke-width="2"/>
<text x="238" y="114" class="d-text-dark" font-size="11">Items ₹450 · Fees ₹36</text>
<text x="238" y="136" class="d-text-dark" font-size="12" font-weight="700">Total ₹486</text>
<rect x="228" y="185" width="184" height="42" rx="10" class="d-mint d-ink" stroke-width="2"/>
<text x="275" y="211" class="d-text-dark" font-size="13" font-weight="700">Pay ₹486</text>
<g class="d-ink" stroke-width="1.5"><line x1="200" y1="60" x2="150" y2="60"/><line x1="200" y1="122" x2="150" y2="122"/><line x1="440" y1="206" x2="490" y2="206"/></g>
<text x="20" y="56" class="d-text" font-size="12" font-weight="700">Hick’s law:</text><text x="20" y="72" class="d-text" font-size="11">fewer choices up front</text>
<text x="20" y="118" class="d-text" font-size="12" font-weight="700">No bad peaks:</text><text x="20" y="134" class="d-text" font-size="11">total shown early</text>
<text x="495" y="202" class="d-text" font-size="12" font-weight="700">Fitts’s law:</text><text x="495" y="218" class="d-text" font-size="11">big, thumb-reachable</text>
</svg>
<figcaption>Small, principled changes reduce effort at the moments that matter most.</figcaption>
</figure>

## Step by step

Applying UX laws in a design review:

1. **Walk the key flow** on a real phone, one-handed.
2. **Count choices** at each decision point (Hick). Can you cut, default or group?
3. **Check primary buttons**: size, position, contrast (Fitts, Von Restorff).
4. **Check familiarity**: does anything break common patterns (Jakob)?
5. **Look for memory demands** across screens (Miller, recognition).
6. **Identify the peak and the end**: are the worst and last moments handled well?
7. **Check progress cues** in multi-step flows (goal-gradient).
8. **Check defaults** for fairness; flag dark patterns.
9. **Write suggestions** with the principle and expected user impact.

## Common mistakes

1. **Citing laws as rules** without testing; they’re tendencies, not guarantees.
2. **Overusing emphasis**, so nothing stands out.
3. **Reinventing standard patterns** for novelty.
4. **Using psychology to manipulate** (dark patterns): false urgency, hidden costs, pre-ticked add-ons.
5. **Optimising for attractive screenshots** instead of actual task success.
6. **Ignoring one-handed phone use** common on Indian commutes.

## How it shows up in interviews

> [!INTERVIEW]
> **“How would you improve the checkout of [app]?”**
> Outline: walk the flow → identify friction using principles (choices, button reachability, surprise fees, error moments) → propose specific changes → metric (checkout completion) and guardrails → mention ethical limits (no dark patterns).

> [!INTERVIEW]
> **“What is a dark pattern? Give an example.”**
> Outline: design that tricks users against their interests → examples (pre-ticked add-ons, hidden fees revealed late, confirm-shaming “No, I don’t like saving money”, hard-to-cancel subscriptions) → why it hurts long-term trust and may break consumer protection rules.

## Practice exercise

**Task (25 minutes):** Pick one app you use daily. Find 5 places where a UX law is followed well or broken. For each: screen, principle, what you observed, and an improvement (or why it works).

```answer Reveal a model answer (food delivery app, illustrative)
1. **Restaurant list – Hick’s law (broken):** 12 filter chips at once; most users use 2–3. Improvement: show “Rating 4+”, “Fast delivery” and “Pure veg” first, others under “More filters”.
2. **Cart – Fitts’s law (followed):** sticky full-width “Proceed to pay” at the bottom, reachable one-handed.
3. **Delivered screen – Peak–end (followed):** a warm “Enjoy your meal!” with a simple rating prompt ends the journey positively.
4. **Coupon field – Recognition (broken):** users must type codes; improvement: list eligible coupons with one-tap apply.
5. **Tipping – Defaults (risky):** a pre-selected ₹20 tip. Better: no default or clearly optional, to avoid feeling tricked while still encouraging tips.
```

## Quiz

```quiz
Q: A checkout lists 9 payment methods and users hesitate. Which principle explains this?
- [x] Hick’s law :: Correct. More choices increase decision time.
- [ ] Fitts’s law :: Fitts’s law is about target size and distance.
- [ ] Zeigarnik effect :: That’s about remembering unfinished tasks.
- [ ] Doherty threshold :: That’s about system response time.

Q: Why place the primary button at the bottom of a phone screen and make it wide?
- [ ] It looks modern :: Style isn’t the main reason.
- [x] Fitts’s law: bigger, closer targets are faster and easier to hit, especially with thumbs :: Correct. Bottom, full-width buttons suit one-handed phone use.
- [ ] Jakob’s law requires it :: Jakob’s law is about familiarity, though this pattern is also familiar.
- [ ] To hide it from new users :: The opposite of the goal.

Q: What does the peak–end rule suggest?
- [ ] Users remember every step equally :: They don’t: peaks and endings dominate memory.
- [x] Experiences are judged mostly by their most intense moment and their end :: Correct. Fix the worst moment and design a good ending.
- [ ] The first screen matters most :: The first impression matters, but this rule is about peak and end.
- [ ] Users prefer long experiences :: Not what the rule says.

Q: A loyalty card starts with 2 of 10 stamps already filled. Which effect is used?
- [ ] Hick’s law :: Not about choices.
- [x] Goal-gradient effect :: Correct. People speed up as they get closer to a goal.
- [ ] Miller’s law :: Not about memory limits.
- [ ] Aesthetic–usability effect :: Not about attractiveness.

Q: Which is a dark pattern?
- [ ] Preselecting the user’s last-used payment method :: Helpful, transparent default.
- [x] Pre-ticking a paid add-on that users must notice and untick :: Correct. It manipulates users into paying.
- [ ] Showing the all-in total early :: Transparent and helpful.
- [ ] A clear undo button :: Supports user control.

Q: What does Jakob’s law suggest about inventing a new navigation pattern?
- [ ] Always innovate on navigation :: Novel navigation often confuses users.
- [x] Users expect your product to work like others they use, so unfamiliar patterns add friction :: Correct. Familiar patterns let users rely on what they already know.
- [ ] Navigation doesn’t matter :: It matters a lot.
- [ ] Only power users notice navigation :: All users rely on it.
```

## Key takeaways

- **Hick** (fewer choices), **Fitts** (big, reachable targets), **Jakob** (familiar patterns), **Miller** (chunk information).
- **Peak–end**: fix the worst moments and design great endings.
- **Goal-gradient** and **progress cues** help users finish multi-step flows.
- Respond fast (**Doherty**) or show immediate feedback; absorb complexity for users (**Tesler**).
- Use **defaults** for users’ benefit; avoid **dark patterns**.

*Go deeper (optional):* the website lawsofux.com summarises these principles visually.
