---
id: w8-heuristics
title: The 10 usability heuristics
week: 8
estimatedMinutes: 15
tags: [ux, usability, design]
---

## Why this matters for a PM

Usability risk is one of the four product risks. The **10 usability heuristics** are a well-known checklist for spotting usability problems quickly, without a big research budget. PMs use them to review designs, write better requirements, critique products in interviews, and explain *why* something feels confusing instead of just “I don’t like it”.

## Core concepts

A **heuristic** is a rule of thumb. The 10 usability heuristics were popularised by usability researcher Jakob Nielsen in the 1990s and are still widely used. Here they are in plain language, with Indian product examples.

### 1. Visibility of system status
Keep users informed about what’s happening, with timely feedback.
- Good: Swiggy’s live order status (“Order received → Preparing → Out for delivery”) with a map.
- Bad: tapping “Pay” and seeing nothing for 5 seconds, so users tap again (and risk paying twice).

### 2. Match between the system and the real world
Use words, concepts and order that users already know, not internal jargon.
- Good: “Pay later” instead of “Deferred settlement”; showing ₹ amounts with Indian number formatting (₹1,50,000).
- Bad: error messages like “TXN_FAILED_ISSUER_U16”.

### 3. User control and freedom
Users make mistakes; give them clear ways to undo, go back or cancel.
- Good: “Undo” after removing an item from the cart; free cancellation for 60 seconds after ordering.
- Bad: no way to edit the delivery address after placing an order, even seconds later.

### 4. Consistency and standards
Follow platform conventions and stay consistent within your product.
- Good: the back button behaves like every other Android app; “Add” buttons look the same everywhere.
- Bad: green means “confirm” on one screen and “cancel” on another.

### 5. Error prevention
Better than a good error message is a design that prevents the error.
- Good: UPI apps show the payee’s verified name before you enter the PIN; date pickers that don’t allow past dates for scheduled deliveries.
- Bad: letting users type a 5-digit PIN code and failing at checkout.

### 6. Recognition rather than recall
Make options visible so users don’t have to remember information.
- Good: “Order again” showing your past orders; recent searches; saved addresses.
- Bad: asking users to remember a coupon code they saw on a different screen.

### 7. Flexibility and efficiency of use
Offer shortcuts for experienced users without confusing beginners.
- Good: Zerodha Kite’s keyboard shortcuts for traders, while beginners use buttons; saved payment methods; one-tap reorder.
- Bad: forcing frequent users through the same 6-step flow every time.

### 8. Aesthetic and minimalist design
Every extra element competes for attention. Remove what doesn’t help the user’s goal.
- Good: a checkout screen showing only what’s needed to pay.
- Bad: a payment confirmation screen crowded with five offers and three banners.

### 9. Help users recognise, diagnose and recover from errors
Error messages should say what went wrong in plain language and suggest a fix.
- Good: “Your bank’s server is slow right now. Your money is safe. Try again in a minute or use another UPI app.”
- Bad: “Something went wrong.”

### 10. Help and documentation
Ideally the product needs no explanation, but when help is needed, make it easy to find and focused on the task.
- Good: a small “What is GTT?” link next to the Good Till Triggered order option.
- Bad: a 40-page FAQ with no search.

### Heuristic evaluation

A **heuristic evaluation** is a review where one or more people go through a product screen by screen, noting where it violates heuristics. Each issue gets a **severity rating**:
- **0:** not a problem
- **1:** cosmetic; fix if time allows
- **2:** minor usability problem; low priority
- **3:** major problem; important to fix
- **4:** usability catastrophe; must fix before release

Three to five evaluators find most issues; one person usually misses many. It’s cheap and fast, but it **doesn’t replace testing with real users** (evaluators aren’t your users).

## Worked example

**Heuristic evaluation of a fictional rent-payment flow (illustrative).**

| Screen | Issue | Heuristic | Severity | Fix |
|---|---|---|---|---|
| Add landlord | Asks for IFSC with no lookup or explanation | 2 (real world), 6 (recognition) | 3 | Add “Find IFSC by bank and branch”; show bank name once IFSC is valid |
| Amount | Allows ₹0 and ₹10,00,00,000 | 5 (error prevention) | 3 | Validate range; confirm large amounts |
| Pay | Spinner with no text for 8+ seconds | 1 (status) | 4 | Show steps (“Contacting your bank…”) and a safe-retry message |
| Failure | “Error 1043” | 9 (error recovery) | 4 | Plain message + money-safety reassurance + next step |
| Receipt | No option to download or share receipt | 3 (control), 10 (help) | 2 | Add download/share; email automatically |
| Repeat payment | Must re-enter all landlord details every month | 7 (efficiency) | 3 | Save landlord; “Pay again” with one tap |

**Prioritisation:** fix the two severity-4 issues (status during payment, error recovery) before launch; plan the 3s next sprint.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 270" role="img" aria-labelledby="h10-t h10-d">
<title id="h10-t">The ten usability heuristics</title>
<desc id="h10-d">Ten numbered tiles: status, real world, control, consistency, error prevention, recognition, efficiency, minimalism, error recovery, help.</desc>
<g font-size="11" class="d-ink" stroke-width="2">
<rect x="15" y="20" width="115" height="105" rx="10" class="d-lavender"/><rect x="138" y="20" width="115" height="105" rx="10" class="d-sky"/><rect x="261" y="20" width="115" height="105" rx="10" class="d-mint"/><rect x="384" y="20" width="115" height="105" rx="10" class="d-butter"/><rect x="507" y="20" width="118" height="105" rx="10" class="d-peach"/>
<rect x="15" y="140" width="115" height="105" rx="10" class="d-pink"/><rect x="138" y="140" width="115" height="105" rx="10" class="d-lavender"/><rect x="261" y="140" width="115" height="105" rx="10" class="d-sky"/><rect x="384" y="140" width="115" height="105" rx="10" class="d-mint"/><rect x="507" y="140" width="118" height="105" rx="10" class="d-butter"/>
</g>
<g font-size="12" class="d-text-dark" font-weight="700">
<text x="27" y="48">1 Status</text><text x="150" y="48">2 Real world</text><text x="273" y="48">3 Control</text><text x="396" y="48">4 Consistency</text><text x="519" y="48">5 Prevent errors</text>
<text x="27" y="168">6 Recognition</text><text x="150" y="168">7 Efficiency</text><text x="273" y="168">8 Minimalism</text><text x="396" y="168">9 Error recovery</text><text x="519" y="168">10 Help</text>
</g>
<g font-size="10" class="d-text-dark">
<text x="27" y="72">Show what’s</text><text x="27" y="86">happening</text>
<text x="150" y="72">Users’ words,</text><text x="150" y="86">not jargon</text>
<text x="273" y="72">Undo, back,</text><text x="273" y="86">cancel</text>
<text x="396" y="72">Same patterns</text><text x="396" y="86">everywhere</text>
<text x="519" y="72">Stop mistakes</text><text x="519" y="86">before they happen</text>
<text x="27" y="192">Show, don’t</text><text x="27" y="206">make them recall</text>
<text x="150" y="192">Shortcuts for</text><text x="150" y="206">experts</text>
<text x="273" y="192">Only what helps</text><text x="273" y="206">the goal</text>
<text x="396" y="192">Plain message</text><text x="396" y="206">+ next step</text>
<text x="519" y="192">Help in context,</text><text x="519" y="206">easy to find</text>
</g>
</svg>
<figcaption>Use these as a lens to review any screen, then rate severity 0–4.</figcaption>
</figure>

## Step by step

Running a heuristic evaluation of your P1 prototype:

1. **Define the main task** (e.g., “settle your monthly balance”).
2. **Walk through every screen** of the task as a first-time user.
3. **For each screen, check all 10 heuristics** and write issues in a table: screen, issue, heuristic, severity, suggested fix.
4. **Ask 2 others** to do the same independently (friends or classmates).
5. **Merge findings**; remove duplicates; average severities.
6. **Fix 4s and 3s first.**
7. **Validate with real users** in usability tests (this week’s later lesson).

## Common mistakes

1. **Treating heuristics as laws.** They’re guidance; context matters.
2. **Only one evaluator.** You’ll miss many issues.
3. **No severity ratings**, so everything seems equally urgent.
4. **Using heuristics instead of user testing** rather than alongside it.
5. **Vague findings** (“confusing”) without naming the heuristic and a fix.
6. **Ignoring error states and edge cases**, where many violations hide.

## How it shows up in interviews

> [!INTERVIEW]
> **“What’s one thing you’d improve in [app]?”**
> Outline: pick a specific flow → name the issue precisely, using a heuristic (“there’s no visibility of system status after tapping Pay”) → explain the user impact → propose a fix → define a metric.

> [!INTERVIEW]
> **“How would you quickly assess the usability of a new design?”**
> Outline: heuristic evaluation with 3–5 evaluators and severity ratings → quick hallway tests with 5 target users → prioritise severe issues → retest.

## Practice exercise

**Task (35 minutes):** Do a heuristic evaluation of one real flow on your phone (e.g., adding a new UPI payee in a payments app, or changing the delivery address in a food app). Find at least 6 issues, map each to a heuristic, rate severity and propose fixes.

```answer Reveal a model answer (adding a new payee, illustrative)
| Issue | Heuristic | Severity | Fix |
|---|---|---|---|
| UPI ID field accepts invalid formats until “Verify” is tapped | 5 Error prevention | 2 | Validate format as the user types |
| Verified name shown in small grey text, easy to miss | 1 Status / 5 Prevention | 3 | Show verified name prominently with a tick before the PIN step |
| “Collect request” vs. “Pay” wording confuses new users | 2 Real world | 3 | Use “Request money” and “Send money” |
| No way to edit a saved payee’s nickname | 3 Control | 1 | Add edit option |
| Error “U30” after failed payment | 9 Error recovery | 4 | Plain message: “Your bank declined this payment. No money was deducted.” + retry options |
| Recent payees hidden two screens deep | 6 Recognition | 2 | Show recent payees on the pay screen |
```

## Quiz

```quiz
Q: A user taps “Pay” and nothing appears to happen for 6 seconds. Which heuristic is violated?
- [x] Visibility of system status :: Correct. The user needs feedback that the payment is in progress.
- [ ] Aesthetic and minimalist design :: Clutter isn’t the issue; missing feedback is.
- [ ] Flexibility and efficiency of use :: Shortcuts aren’t the issue here.
- [ ] Help and documentation :: Documentation wouldn’t fix missing feedback.

Q: Showing the payee’s verified name before the PIN step mainly supports which heuristic?
- [ ] Consistency and standards :: Consistency isn’t the main benefit here.
- [x] Error prevention :: Correct. It stops users sending money to the wrong person.
- [ ] Help and documentation :: It isn’t help content.
- [ ] Minimalist design :: It adds information rather than removing it.

Q: Which error message best follows the heuristics?
- [ ] Error 1043 :: Jargon with no help.
- [ ] Something went wrong :: Vague; no diagnosis or next step.
- [x] Your bank’s server is slow. Your money is safe. Try again in a minute or use another UPI app. :: Correct. Plain language, reassurance and a next step.
- [ ] Transaction failed due to issuer timeout code U16 :: Technical jargon users don’t understand.

Q: What does a severity rating of 4 mean?
- [ ] Cosmetic issue :: That’s severity 1: fix only if time allows.
- [ ] Minor problem :: That’s severity 2: low priority.
- [x] Usability catastrophe; must fix before release :: Correct. Severity 4 blocks release.
- [ ] Not a problem :: That’s severity 0: no action needed.

Q: Why use 3–5 evaluators for a heuristic evaluation?
- [ ] It’s required by the method’s copyright :: No such rule.
- [x] Each evaluator finds different issues; a single person misses many :: Correct. Combining several reviews covers far more problems.
- [ ] To make meetings longer :: Not the purpose.
- [ ] Because users are never involved :: You should still test with users.

Q: “Order again” showing past orders supports which heuristic?
- [ ] Error prevention :: Not primarily.
- [x] Recognition rather than recall :: Correct. Users see options instead of remembering them.
- [ ] Visibility of system status :: Not about status.
- [ ] User control and freedom :: Not about undo or exit.
```

## Key takeaways

- The **10 heuristics** are a fast lens for spotting usability problems: status, real world, control, consistency, prevention, recognition, efficiency, minimalism, error recovery, help.
- Run a **heuristic evaluation** with **3–5 evaluators** and **severity ratings 0–4**.
- Fix **4s and 3s** first; especially payment status and error recovery.
- Use heuristics to **explain why** something is confusing, in reviews and interviews.
- Heuristics **complement, not replace**, testing with real users.

*Go deeper (optional):* the Nielsen Norman Group website has articles on each heuristic.
