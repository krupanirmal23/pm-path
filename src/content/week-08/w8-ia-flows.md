---
id: w8-ia-flows
title: Information architecture and user flows
week: 8
estimatedMinutes: 14
tags: [ux, information-architecture, flows]
---

## Why this matters for a PM

Before anyone designs a beautiful screen, someone has to decide **what goes where** and **how users move** through the product. Get this wrong and users can’t find features, even good ones. **Information architecture (IA)** and **user flows** are where PMs and designers make those structural decisions together. Your P1 prototype starts with a user flow this week.

## Core concepts

### Information architecture

**Information architecture (IA)** is how content and features are organised, labelled and connected so people can find what they need. It covers:
- **Organisation:** how things are grouped (by task, by category, by user type).
- **Labelling:** what things are called (“Orders” vs. “My activity”).
- **Navigation:** how people move between areas (tabs, menus, links, search).
- **Search:** how people find things by typing.

A product’s IA is often drawn as a **sitemap**: a tree showing the main sections and what’s inside them.

### Navigation patterns on mobile

- **Bottom tab bar:** 3–5 top-level destinations always visible (Home, Search, Orders, Account). Most common in Indian consumer apps.
- **Top tabs / segmented controls:** switch views within a section (“Delivery | Dining”).
- **Hamburger menu (☰):** hidden menu; saves space but reduces discoverability. Use for secondary items.
- **Hub and spoke:** a home screen of entry points that open separate flows (super apps like PhonePe or Paytm use grids of icons).
- **Search-first:** a prominent search bar for large catalogues (e-commerce, quick commerce).

### Mental models and card sorting

A **mental model** is how users *think* something works or is organised. Good IA matches users’ mental models, not the company’s org chart. (Users don’t care that “Wallet” and “Bills” are owned by different teams.)

**Card sorting** is a research method to learn mental models: participants group cards (one feature or content item per card) into categories that make sense to them.
- **Open card sort:** users create and name their own groups. Good for new IA.
- **Closed card sort:** users place cards into predefined groups. Good for testing an existing IA.

**Tree testing** is the reverse: users try to find items in a text-only version of your sitemap (“Where would you go to change your delivery address?”), which tests labels and structure without visual design.

### User flows

A **user flow** is the path a user takes through screens and decisions to complete a task. It shows:
- **Entry points:** where the flow starts (home screen, notification, deep link).
- **Screens / steps:** each screen in order.
- **Decisions:** branches (logged in? payment success?).
- **Exits:** success, failure, abandonment.

Flows make gaps visible: “What happens if the user has no saved address?” “Where do they land after a failed payment?”

### Flow notation (simple)

- Rectangle = screen or step.
- Diamond = decision (yes/no).
- Arrow = movement.
- Rounded rectangle / oval = start or end.

### Task flows vs. user journeys

- A **task flow** is a single path for one task with no branches (“happy path”).
- A **user flow** includes branches and edge cases.
- A **journey map** (Week 1) is broader: the whole experience across time and channels, including feelings.

### Edge cases in flows

The happy path is easy. Flows are valuable because they force you to design:
- **Empty states:** first use, no data yet (“No orders yet: browse restaurants near you”).
- **Error states:** network failure, payment failure, invalid input.
- **Loading states:** what users see while waiting.
- **Permission denied:** user refused location access.
- **Interrupted flows:** app closed mid-payment; user returns via notification.

## Worked example

**User flow: “Settle my monthly balance” (P1).**

1. **Entry points:** push notification on the 1st (“Your flat’s summary is ready”), the home screen card, or WhatsApp link.
2. **Summary screen:** shows net balance.
   - Decision: *Do I owe money?*
     - No → “You’re all settled 🎉” (end).
     - Yes → shows amount and top expenses → “Settle ₹420”.
3. **Choose UPI app** (system chooser or preselected last app).
4. **UPI app:** user enters PIN.
   - Decision: *Payment result?*
     - Success → return to app → balance updates to ₹0 → confirmation + “Shared with flatmates” (end).
     - Failure → “Payment didn’t go through. No money was deducted.” → retry or choose another app.
     - Pending → “Payment pending. We’ll update you within 10 minutes.” → status check → notification.
5. **Edge cases:** user disputes an expense → “Something wrong? Tell the group” → opens comment on the expense. User has no UPI app → show bank transfer details.

**IA decision:** where does “Settle up” live? Research (card sort with 8 users) shows people group it with “Balances” rather than “Payments”. So the home tab shows balances with a “Settle” button, rather than hiding it under a “Payments” menu.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 260" role="img" aria-labelledby="uf-t uf-d">
<title id="uf-t">User flow with decisions</title>
<desc id="uf-d">Start at notification, go to summary, decision whether user owes money, if yes go to UPI payment, then decision on payment result with success, failure and pending branches.</desc>
<defs><marker id="uf-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="10" y="105" width="90" height="44" rx="22" class="d-lavender d-ink" stroke-width="2"/><text x="22" y="131" class="d-text-dark" font-size="11" font-weight="700">Notification</text>
<rect x="120" y="105" width="90" height="44" rx="8" class="d-surface d-ink" stroke-width="2"/><text x="135" y="131" class="d-text" font-size="11">Summary</text>
<polygon points="275,95 320,127 275,159 230,127" class="d-butter d-ink" stroke-width="2"/><text x="252" y="131" class="d-text-dark" font-size="10">Owes?</text>
<rect x="232" y="200" width="90" height="40" rx="20" class="d-mint d-ink" stroke-width="2"/><text x="244" y="224" class="d-text-dark" font-size="10">All settled ✓</text>
<rect x="340" y="105" width="90" height="44" rx="8" class="d-surface d-ink" stroke-width="2"/><text x="352" y="124" class="d-text" font-size="11">UPI app</text><text x="352" y="139" class="d-text" font-size="10">enter PIN</text>
<polygon points="495,95 540,127 495,159 450,127" class="d-butter d-ink" stroke-width="2"/><text x="472" y="131" class="d-text-dark" font-size="10">Result?</text>
<rect x="555" y="25" width="78" height="40" rx="20" class="d-mint d-ink" stroke-width="2"/><text x="565" y="49" class="d-text-dark" font-size="10">Success</text>
<rect x="555" y="107" width="78" height="40" rx="8" class="d-pink d-ink" stroke-width="2"/><text x="565" y="131" class="d-text-dark" font-size="10">Failure</text>
<rect x="555" y="190" width="78" height="40" rx="8" class="d-peach d-ink" stroke-width="2"/><text x="565" y="214" class="d-text-dark" font-size="10">Pending</text>
<g class="d-ink" stroke-width="2"><line x1="102" y1="127" x2="116" y2="127" marker-end="url(#uf-a)"/><line x1="212" y1="127" x2="228" y2="127" marker-end="url(#uf-a)"/><line x1="322" y1="127" x2="336" y2="127" marker-end="url(#uf-a)"/><line x1="276" y1="161" x2="276" y2="196" marker-end="url(#uf-a)"/><line x1="432" y1="127" x2="446" y2="127" marker-end="url(#uf-a)"/><line x1="530" y1="110" x2="553" y2="55" marker-end="url(#uf-a)"/><line x1="542" y1="127" x2="551" y2="127" marker-end="url(#uf-a)"/><line x1="530" y1="144" x2="553" y2="200" marker-end="url(#uf-a)"/></g>
<text x="282" y="186" class="d-text" font-size="10">no</text><text x="322" y="118" class="d-text" font-size="10">yes</text>
<path d="M594 147 C 600 170 440 175 395 152" fill="none" class="d-ink" stroke-width="1.5" stroke-dasharray="4 4" marker-end="url(#uf-a)"/>
<text x="430" y="186" class="d-text" font-size="10">retry</text>
</svg>
<figcaption>Flows force decisions about branches, errors and pending states before design starts.</figcaption>
</figure>

## Step by step

Creating your P1 user flow:

1. **Pick the main task** from your PRD.
2. **List entry points** (how users start the task).
3. **Draw the happy path** (screens in order).
4. **Add decision points** (diamonds) and their branches.
5. **Add edge cases**: empty, error, loading, permission denied, interrupted.
6. **Mark exits**: success, failure, abandon.
7. **Check IA**: where does each screen live in the app’s navigation? Is the entry point discoverable?
8. **Validate labels** with 3–5 users (a quick tree test or card sort).
9. **Use the flow** to plan wireframes (next lesson): one wireframe per screen.

## Common mistakes

1. **Happy path only.** Most usability problems hide in errors and edge cases.
2. **Organising IA around internal teams** instead of user mental models.
3. **Hiding important features in a hamburger menu.**
4. **Inconsistent labels** for the same thing (“Orders”, “History”, “My activity”).
5. **No clear entry point** for new features.
6. **Too many top-level tabs** (more than 5).

## How it shows up in interviews

> [!INTERVIEW]
> **“Users can’t find feature X. How would you fix it?”**
> Outline: verify with data (usage, search terms, support tickets) → check IA and labels (tree test) → check entry points → consider contextual entry (show it where the need arises) → test changes → measure discovery and usage.

> [!INTERVIEW]
> **“Walk me through the user flow for [task].”**
> Outline: entry points → happy path → decisions and branches → errors and empty states → success and follow-up. Draw it if possible.

## Practice exercise

**Task (30 minutes):** Draw a user flow (Excalidraw or paper) for **“Reschedule a delivery slot on BigBasket-style grocery app”**, with at least 2 decision points and 3 edge cases. List the IA question you’d need to answer.

```answer Reveal a model answer
**Entry points:** order details screen; “Change slot” link in the reminder notification; support chat.

**Flow:** Order details → “Change slot” → decision: *order already packed?*
- Yes → “Your order is already being packed and can’t be rescheduled. Contact support?” (end or support).
- No → show available slots for the next 3 days → user selects slot → decision: *slot still available?*
  - No (taken while choosing) → “That slot just filled up. Pick another.” → back to slots.
  - Yes → confirm → decision: *does the new slot change fees?*
    - Yes → show fee difference → confirm/cancel.
    - No → success: “Delivery moved to Sat 8–10 a.m.” + notification.

**Edge cases:** no slots available in the next 3 days (offer cancellation with refund); network failure on confirm (keep old slot until confirmed; show retry); perishable items with shelf-life limits (warn if the new slot is too far).

**IA question:** should “Change slot” live only in order details, or also in the home screen’s “upcoming delivery” card? A quick tree test with 5 users can answer where they’d look first.
```

## Quiz

```quiz
Q: What is information architecture?
- [ ] The server architecture of an app :: That’s system architecture, not IA.
- [x] How content and features are organised, labelled and navigated :: Correct. IA decides what goes where and what it’s called.
- [ ] The app’s colour palette :: That’s visual design.
- [ ] The database schema :: That’s data modelling.

Q: What does an open card sort reveal?
- [ ] Which design users find prettiest :: Card sorting isn’t about aesthetics.
- [x] How users naturally group and name features, revealing their mental models :: Correct. Users create groups and names in their own words.
- [ ] Whether the app is fast :: Unrelated to performance.
- [ ] Which features engineers prefer :: It’s about users’ grouping, not engineers.

Q: In a user flow diagram, what does a diamond usually represent?
- [ ] A screen :: Screens are usually rectangles.
- [x] A decision point with branches :: Correct. Each branch leads to a different path.
- [ ] The end of the flow :: Ends are usually ovals or rounded shapes.
- [ ] An error :: Errors are outcomes of decisions, shown as screens or states.

Q: Why is a hamburger menu risky for important features?
- [ ] It’s slow to load :: Speed isn’t the issue.
- [x] Hidden items are less discoverable, so fewer users find them :: Correct. Out of sight is often out of mind.
- [ ] Apple bans it :: It isn’t banned.
- [ ] It uses too much data :: Unrelated: a menu icon doesn’t affect data usage.

Q: What is tree testing used for?
- [ ] Measuring server load :: Unrelated: tree testing is about navigation, not servers.
- [x] Checking whether users can find items in a text-only version of your navigation :: Correct. It isolates structure and labels from visual design.
- [ ] Testing colours :: It deliberately removes visual design.
- [ ] A/B testing prices :: Unrelated: tree testing studies navigation, not pricing.

Q: Which is an edge case a good user flow should include?
- [ ] The happy path :: That’s the main case, not an edge case.
- [x] The user denies location permission :: Correct. Flows should define what happens then.
- [ ] The app logo :: Not a flow element.
- [ ] The marketing tagline :: Not a flow element.
```

## Key takeaways

- **IA** = organisation, labelling, navigation and search; match users’ **mental models**, not the org chart.
- Use **card sorting** to learn grouping and **tree testing** to validate navigation and labels.
- **User flows** map entry points, screens, decisions and exits, including **errors, empty, loading and permission states**.
- Keep top-level navigation to **3–5 destinations**; don’t hide key features.
- Build the flow **before wireframes**; it’s your screen list and edge-case checklist.
