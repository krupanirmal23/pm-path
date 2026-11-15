---
id: w8-design-systems
title: Design systems basics
week: 8
estimatedMinutes: 12
tags: [ux, design-systems, ui]
---

## Why this matters for a PM

As products grow, inconsistency creeps in: five slightly different buttons, three shades of green, error messages written in different tones. A **design system** fixes this with shared, reusable building blocks. For PMs, it means faster delivery (teams reuse instead of reinvent), better quality and accessibility, and a common language with designers and engineers. PM Path itself has a design system: open the Styleguide page to see one in action.

## Core concepts

### What a design system is

A **design system** is a collection of reusable components, guidelines and standards that teams use to build consistent products. It usually includes:

1. **Design tokens:** the smallest decisions, stored as named values: colours (`color-primary`, `color-error`), font sizes, spacing (4/8/16/24 px), border radius, shadows. Tokens let teams change the look everywhere by changing one value (for example, adding dark mode).
2. **Components:** reusable UI pieces: buttons, inputs, checkboxes, cards, modals, tabs, toasts, navigation bars. Each has defined **variants** (primary, secondary, danger) and **states** (default, hover, pressed, disabled, loading, error).
3. **Patterns:** combinations of components for common tasks: forms, empty states, error handling, onboarding, search results.
4. **Guidelines:** when and how to use each component, accessibility rules, writing style (voice and tone), iconography, motion.
5. **Code + design libraries:** the same components exist in Figma (for designers) and in code (for engineers), kept in sync.

Well-known public examples: Google’s Material Design, Apple’s Human Interface Guidelines (platform guidelines rather than a full system), and many companies publish their own.

### Atomic design (a helpful mental model)

A popular way to think about components, from small to large:
- **Atoms:** basic elements (button, label, input, icon).
- **Molecules:** small groups (search bar = input + button).
- **Organisms:** larger sections (header with logo, search and cart).
- **Templates:** page layouts.
- **Pages:** templates filled with real content.

### Benefits

- **Speed:** teams assemble screens from existing components.
- **Consistency:** users learn patterns once and recognise them everywhere (supports the consistency heuristic).
- **Quality and accessibility:** fix contrast or keyboard behaviour once in the component, and every screen improves.
- **Easier design–engineering collaboration:** shared names (“use the `Card` with `elevated` variant”).
- **Easier rebrands and theming:** change tokens, not hundreds of screens.

### Costs and trade-offs

- **Upfront and ongoing investment:** someone must build, document and maintain it (often a dedicated team in larger companies).
- **Can feel restrictive:** teams may need new components for genuinely new needs. Good systems have a contribution process.
- **Adoption is the hard part:** a system nobody uses is waste.

### The PM’s role

- **Use existing components first** when specifying features; ask “do we have a component for this?”
- **Budget for system work** when a feature needs a new reusable component.
- **Advocate for consistency** in reviews (“Why does this screen use a different button style?”).
- **Treat the design system as a product** if you own it: its users are designers and engineers; measure adoption and time saved.

### UI kits for your prototype

A **UI kit** is a ready-made set of components in a design tool. Free Figma UI kits (from the Figma Community) let you build a hi-fi prototype quickly without designing every button. You’ll use one this week.

## Worked example

**Situation:** A fintech app has grown to 6 product teams. Users complain the app “feels different on every screen”, and accessibility audits find low-contrast text in 40% of screens.

**Audit (by design and PM):**
- 14 button styles; 9 shades of primary green; 4 different date pickers; error messages in 3 tones.
- Each team spends ~20% of design time recreating basic components.

**Plan:**
1. **Tokens first:** define colour, type and spacing tokens, with contrast-checked colour pairs.
2. **Top 10 components:** button, input, dropdown, checkbox, card, modal, toast, tabs, list item, date picker, each with states and accessibility built in.
3. **Patterns:** forms with validation, empty states, error handling, payment confirmation.
4. **Adoption:** new features must use system components; old screens migrate when touched.
5. **Metrics:** % of screens using system components; design and development time for standard screens; accessibility issues per audit; UI consistency complaints.

**Result after two quarters (illustrative):** 70% of screens migrated; low-contrast issues down from 40% to 8% of screens; standard forms built in days instead of weeks.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 230" role="img" aria-labelledby="ds-t ds-d">
<title id="ds-t">Layers of a design system</title>
<desc id="ds-d">Tokens feed components, components combine into patterns, patterns form product screens, with guidelines spanning all layers.</desc>
<defs><marker id="ds-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="20" y="40" width="130" height="110" rx="10" class="d-lavender d-ink" stroke-width="2"/>
<text x="36" y="66" class="d-text-dark" font-weight="700">Tokens</text>
<circle cx="50" cy="95" r="10" class="d-mint d-ink" stroke-width="1.5"/><circle cx="76" cy="95" r="10" class="d-pink d-ink" stroke-width="1.5"/><circle cx="102" cy="95" r="10" class="d-butter d-ink" stroke-width="1.5"/>
<text x="36" y="132" class="d-text-dark" font-size="11">colour, type, space</text>
<rect x="175" y="40" width="130" height="110" rx="10" class="d-sky d-ink" stroke-width="2"/>
<text x="191" y="66" class="d-text-dark" font-weight="700">Components</text>
<rect x="191" y="80" width="60" height="22" rx="6" class="d-mint d-ink" stroke-width="1.5"/><text x="198" y="95" class="d-text-dark" font-size="10">Button</text>
<rect x="191" y="108" width="98" height="20" rx="4" class="d-surface d-ink" stroke-width="1.5"/><text x="198" y="122" class="d-text" font-size="10">Input…</text>
<rect x="330" y="40" width="130" height="110" rx="10" class="d-butter d-ink" stroke-width="2"/>
<text x="346" y="66" class="d-text-dark" font-weight="700">Patterns</text>
<text x="346" y="92" class="d-text-dark" font-size="11">forms, empty</text>
<text x="346" y="108" class="d-text-dark" font-size="11">states, errors,</text>
<text x="346" y="124" class="d-text-dark" font-size="11">checkout</text>
<rect x="485" y="40" width="130" height="110" rx="10" class="d-mint d-ink" stroke-width="2"/>
<text x="501" y="66" class="d-text-dark" font-weight="700">Screens</text>
<text x="501" y="92" class="d-text-dark" font-size="11">built from the</text>
<text x="501" y="108" class="d-text-dark" font-size="11">pieces above</text>
<g class="d-ink" stroke-width="2"><line x1="152" y1="95" x2="171" y2="95" marker-end="url(#ds-a)"/><line x1="307" y1="95" x2="326" y2="95" marker-end="url(#ds-a)"/><line x1="462" y1="95" x2="481" y2="95" marker-end="url(#ds-a)"/></g>
<rect x="20" y="170" width="595" height="40" rx="10" class="d-peach d-ink" stroke-width="2"/>
<text x="36" y="195" class="d-text-dark" font-size="12" font-weight="700">Guidelines across all layers: accessibility, voice and tone, usage rules</text>
</svg>
<figcaption>Change a token once, and every component and screen updates. That’s the leverage of a system.</figcaption>
</figure>

## Step by step

Using a design system (or UI kit) for P1:

1. **Pick a free UI kit** in Figma Community that matches mobile app patterns.
2. **Set your tokens**: 1 primary colour, neutrals, success/error colours with good contrast, 2 text sizes for body, 3 for headings, a spacing scale (4/8/16/24).
3. **Use kit components** for buttons, inputs, cards and lists; avoid custom one-offs.
4. **Define states** for each component you use (disabled, loading, error).
5. **Write 5 copy guidelines** (e.g., “Use plain English; say ‘you’; show amounts with ₹ and Indian formatting”).
6. **Check consistency** across your prototype: same button style for the same action everywhere.
7. **Document** any custom component with a short note on when to use it.

## Common mistakes

1. **Building a huge design system before having a product**; start small.
2. **Design library and code library drifting apart.**
3. **Ignoring accessibility** in core components, multiplying problems.
4. **One-off “special” components** for every feature.
5. **No owner**, so the system decays.
6. **Treating consistency as more important than user needs**; systems should evolve.

## How it shows up in interviews

> [!INTERVIEW]
> **“How would you justify investing in a design system?”**
> Outline: current cost of inconsistency (time spent recreating components, bugs, accessibility issues, user confusion) → expected benefits (speed, quality, accessibility, theming) → phased plan (tokens, top components, adoption rule) → metrics (adoption %, build time, accessibility issues).

> [!INTERVIEW]
> **“You own an internal design system. Who are your users and how do you measure success?”**
> Outline: users are designers and engineers → measure adoption, time to build standard screens, contribution rate, satisfaction, defects → roadmap based on their pain points.

## Practice exercise

**Task (20 minutes):** Open PM Path’s **Styleguide** page. List 5 design tokens you can identify (colours, radius, shadows, spacing), 5 components and their variants/states, and 2 places where the system enforces accessibility. Then write 3 guidelines you’d add if more people were building PM Path.

```answer Reveal a model answer
**Tokens:** cream background (#FFF8EE), ink (#1E1E24), phase pastels (lavender, sky, mint, peach), 10px corner radius, 3px hard offset card shadow (4px for primary buttons), 2px ink borders.

**Components:** Button (primary/default/ghost/danger; sm/md; hover, pressed, disabled); Card (plain/pastel; hover lift); Chip and StatusChip (done/in progress/not started/blocked, each with an icon and label); Progress bar and ring; Tabs; Callouts (tip/warning/example/interview); Checkbox; Input/Select/Textarea.

**Accessibility enforced:** status always pairs colour with an icon and text label (not colour alone); visible focus rings (3px butter outline); dark text on all pastel fills for contrast.

**Guidelines to add:** 1) One primary button per screen section. 2) Use pastel fills only for meaning (phase, status, callout type), never decoration. 3) Copy: plain English, short sentences, rupees with ₹ and Indian digit grouping.
```

## Quiz

```quiz
Q: What is a design token?
- [ ] A login credential for designers :: Unrelated to authentication.
- [x] A named value for a basic design decision, like a colour or spacing size :: Correct. Change the token once and every use updates.
- [ ] A complete screen :: Screens are built from components.
- [ ] A coupon for design tools :: Unrelated: tokens are design values, not discounts.

Q: What’s a key benefit of fixing accessibility inside a shared component?
- [ ] It only affects one screen :: The point is the opposite.
- [x] Every screen using that component improves at once :: Correct. That leverage is a major reason to build a system.
- [ ] It removes the need for testing :: You still need testing.
- [ ] It makes the app smaller :: Not the main benefit.

Q: In atomic design, a search bar made of an input and a button is a:
- [ ] Atom :: Atoms are single elements like a button.
- [x] Molecule :: Correct. A small group of atoms working together.
- [ ] Template :: Templates are page layouts.
- [ ] Token :: Tokens are design values, not UI pieces.

Q: What is usually the hardest part of a design system?
- [ ] Choosing the name :: Easy compared to the rest.
- [x] Getting teams to adopt and maintain it :: Correct. Unused systems are waste.
- [ ] Picking colours :: Important but not the hardest part.
- [ ] Creating the first button :: Quick to do; the hard part comes after: adoption and upkeep.

Q: As a PM, what should you ask first when specifying a new UI element?
- [ ] Can we invent a new style? :: Custom one-offs create inconsistency.
- [x] Does the design system already have a component for this? :: Correct. Reuse first; extend only when needed.
- [ ] Can engineering skip states? :: States are essential for quality.
- [ ] Can we copy a competitor exactly? :: Not a good default.
```

## Key takeaways

- A **design system** = **tokens + components + patterns + guidelines**, in both design and code.
- It speeds up delivery, improves **consistency** and lets you fix **accessibility** once.
- **Atomic design** (atoms → molecules → organisms → templates → pages) is a helpful model.
- The hard part is **adoption and maintenance**; treat the system as a product.
- PMs should **reuse components first** and budget for new reusable ones when needed.
