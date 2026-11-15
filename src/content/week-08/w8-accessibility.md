---
id: w8-accessibility
title: Accessibility basics
week: 8
estimatedMinutes: 14
tags: [ux, accessibility, inclusion]
---

## Why this matters for a PM

India has tens of millions of people with disabilities, a huge population of older adults coming online, and many users who read in a second language or use low-end phones in bright sunlight. **Accessibility** means designing so that everyone can use the product, including people with visual, hearing, motor and cognitive disabilities. It’s the right thing to do, it expands your market, and it increasingly matters legally (India’s Rights of Persons with Disabilities Act, 2016, and accessibility guidelines for digital services). Accessible design is usually better design for everyone.

## Core concepts

### Types of disability and situations

Disabilities can be **permanent** (blindness), **temporary** (a broken arm) or **situational** (holding a baby, bright sunlight, a noisy train). Designing for permanent disabilities helps everyone in similar situations.

- **Visual:** blindness, low vision, colour blindness (about 1 in 12 men has some form of colour vision deficiency).
- **Hearing:** deafness, hard of hearing.
- **Motor:** limited dexterity, tremors, one-handed use.
- **Cognitive:** dyslexia, attention difficulties, memory issues, low literacy, unfamiliarity with technology.

### WCAG and POUR

The **Web Content Accessibility Guidelines (WCAG)**, published by the W3C, are the global standard. Most organisations aim for **WCAG level AA**. WCAG is organised around four principles, **POUR**:

1. **Perceivable:** users can perceive the content (alt text for images, captions for video, enough contrast).
2. **Operable:** users can operate the interface (keyboard access, large enough touch targets, enough time).
3. **Understandable:** content and behaviour are clear (plain language, predictable navigation, helpful error messages).
4. **Robust:** works with assistive technologies (proper code semantics so screen readers can interpret it).

### Key practices PMs should require

**Colour and contrast**
- Text contrast ratio of at least **4.5:1** against its background for normal text (3:1 for large text) at level AA.
- **Never use colour alone** to convey meaning. A red/green “failed/success” label also needs an icon or text. (PM Path’s status chips pair colour with icons and labels for this reason.)

**Screen readers**
- **Screen readers** (TalkBack on Android, VoiceOver on iOS) read the screen aloud. Every image needs **alt text** (a text description); icon-only buttons need **accessible labels** (“Search”, not “button”).
- Content order should make sense when read aloud.

**Touch targets and motor access**
- Touch targets around **44–48 px/points** minimum, with spacing between them.
- Don’t rely on complex gestures (long-press, multi-finger swipes) without an alternative.
- Support keyboard navigation on the web, with **visible focus indicators**.

**Text and language**
- Support **dynamic text sizes** (users who increase font size in phone settings).
- Use **plain language**; short sentences; avoid jargon.
- Offer **regional languages** where your users need them; this is a major inclusion lever in India.

**Time and motion**
- Avoid tight time limits (or allow extensions): OTP timers that expire too fast exclude slower users.
- Respect **reduced motion** settings; avoid flashing content.

**Forms and errors**
- Visible labels (not just placeholder text that disappears).
- Clear error messages next to the field, explaining how to fix it.

**Media**
- Captions for videos; transcripts for audio.

### Testing accessibility

- **Automated checkers:** Lighthouse (in Chrome DevTools), axe, Android Accessibility Scanner. They catch maybe a third of issues (like contrast and missing labels).
- **Manual checks:** turn on TalkBack/VoiceOver and try your key flow eyes-closed; navigate the web version with only a keyboard; increase font size to the maximum; check in greyscale.
- **Testing with disabled users** is the most valuable and often overlooked.

### Accessibility as a product requirement

Write accessibility into the PRD’s non-functional requirements and the Definition of Done, e.g.:
- “All interactive elements have accessible labels and work with TalkBack/VoiceOver.”
- “Text contrast meets WCAG AA (4.5:1).”
- “Layouts work at 200% font size without cutting off text.”
- “Status is never shown by colour alone.”

## Worked example

**Accessibility review of a UPI payment flow (illustrative), aimed at older users and people with low vision.**

| Issue | Who it affects | Fix |
|---|---|---|
| Amount shown in light grey on white (2.3:1 contrast) | Low vision, sunlight | Dark text, ≥ 4.5:1 |
| Payee verification shown only by a green tick | Colour-blind and screen-reader users | Add text “Verified: Ramesh Kumar” and accessible label |
| PIN keypad buttons small and close together | Tremors, older users | Larger keys with spacing |
| Success screen auto-closes after 3 seconds | Slow readers, screen-reader users | Keep until dismissed; announce “Payment successful” to screen readers |
| Errors only in English with codes | Users with low English literacy | Plain-language messages in the user’s chosen language |
| Layout breaks at large font size | Users who enlarge text | Responsive layout that wraps text |

**Outcome measures:** task success for older users in usability tests; support tickets from older users; app rating among 50+ users (from surveys).

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 230" role="img" aria-labelledby="a11y-t a11y-d">
<title id="a11y-t">POUR principles</title>
<desc id="a11y-d">Four boxes: perceivable, operable, understandable and robust, each with a short example.</desc>
<g class="d-ink" stroke-width="2">
<rect x="15" y="25" width="145" height="170" rx="12" class="d-lavender"/><rect x="170" y="25" width="145" height="170" rx="12" class="d-sky"/><rect x="325" y="25" width="145" height="170" rx="12" class="d-mint"/><rect x="480" y="25" width="145" height="170" rx="12" class="d-butter"/>
</g>
<g class="d-text-dark">
<text x="30" y="55" font-weight="700" font-size="15">Perceivable</text><text x="30" y="85" font-size="11">Contrast ≥ 4.5:1</text><text x="30" y="105" font-size="11">Alt text for images</text><text x="30" y="125" font-size="11">Captions</text><text x="30" y="145" font-size="11">Not colour alone</text>
<text x="185" y="55" font-weight="700" font-size="15">Operable</text><text x="185" y="85" font-size="11">48px touch targets</text><text x="185" y="105" font-size="11">Keyboard access</text><text x="185" y="125" font-size="11">Visible focus</text><text x="185" y="145" font-size="11">Enough time</text>
<text x="340" y="55" font-weight="700" font-size="15">Understandable</text><text x="340" y="85" font-size="11">Plain language</text><text x="340" y="105" font-size="11">Regional languages</text><text x="340" y="125" font-size="11">Clear errors + fixes</text><text x="340" y="145" font-size="11">Predictable layout</text>
<text x="495" y="55" font-weight="700" font-size="15">Robust</text><text x="495" y="85" font-size="11">Works with</text><text x="495" y="105" font-size="11">TalkBack/VoiceOver</text><text x="495" y="125" font-size="11">Proper labels and</text><text x="495" y="145" font-size="11">semantics</text>
</g>
<text x="150" y="220" class="d-text" font-size="12">Design for permanent disabilities; help everyone in temporary and situational ones.</text>
</svg>
<figcaption>WCAG’s four principles. Aim for level AA as a baseline requirement.</figcaption>
</figure>

## Step by step

An accessibility pass on your P1 prototype (45 minutes):

1. **Check contrast** of all text and key icons with a contrast checker (Figma plugins or online tools).
2. **Find colour-only meaning** and add icons or text.
3. **Check touch target sizes** (≥ 44–48).
4. **Add accessible labels** to icon-only buttons in your design notes.
5. **Review copy** for plain language; read it aloud.
6. **Check forms**: visible labels, error messages next to fields.
7. **Check timers and auto-dismissing messages.**
8. **Simulate large text**: enlarge text styles by 30–50% and see what breaks.
9. **Write 4–5 accessibility requirements** into your PRD and Definition of Done.
10. **If possible, include one older user or a user with low vision** in your usability tests.

## Common mistakes

1. **Treating accessibility as a final checklist** instead of a requirement from the start.
2. **Colour as the only signal** for status or errors.
3. **Placeholder text instead of labels** in forms.
4. **Icon-only buttons without labels.**
5. **Tiny touch targets** and cramped layouts.
6. **Relying only on automated tools**; manual and real-user testing find most issues.

## How it shows up in interviews

> [!INTERVIEW]
> **“How would you make [app] more accessible?”**
> Outline: define users (low vision, older users, low literacy, motor) → POUR-based issues in a key flow → specific fixes (contrast, labels, target size, plain language, regional languages) → make it a requirement (PRD, Definition of Done) → test with real users → measure task success.

> [!INTERVIEW]
> **“Design a payments app for elderly users.”**
> Outline: segment (first-time smartphone users 60+) → needs (trust, clarity, help from family) → accessibility-first design (large text and targets, plain language, voice support, confirmation steps, family assist) → safety (fraud warnings) → metrics.

## Practice exercise

**Task (25 minutes):** Turn on TalkBack (Android) or VoiceOver (iPhone) and try to complete one simple task in an app you use (e.g., check your last order or recharge a phone). Write down 5 problems you hit and how you’d fix them. Turn the screen reader off when done (practise how to turn it off first!).

```answer Reveal a model answer (illustrative findings)
1. **Icon buttons read as “Button, unlabelled”** (e.g., filter and cart icons). Fix: add accessible labels (“Filters”, “Cart, 2 items”).
2. **Promotional banners are images with text baked in, read as “Image”.** Fix: alt text with the offer text, or real text over the image.
3. **Focus jumps to the bottom navigation after each page load**, forcing a long swipe back. Fix: logical focus order starting at the page title.
4. **Price and discount read as “₹250 ₹199”** without context. Fix: label as “Original price ₹250, now ₹199”.
5. **Toast message “Added!” disappears before it’s announced.** Fix: announce status changes to screen readers and keep messages visible longer.

(Tip for next time: learn the screen reader’s off gesture or shortcut before turning it on.)
```

## Quiz

```quiz
Q: What does WCAG level AA typically require for normal text contrast?
- [ ] 2:1 :: Too low for most users with low vision.
- [x] At least 4.5:1 :: Correct. Large text can use 3:1.
- [ ] 10:1 :: Higher than required at AA.
- [ ] Any contrast is fine :: Low contrast excludes many users.

Q: Why shouldn’t colour be the only way to show status?
- [ ] Colours are expensive :: Cost isn’t the issue.
- [x] Colour-blind and screen-reader users may miss it; add icons or text :: Correct. Pairing colour with an icon or label makes status clear to everyone.
- [ ] Colours slow the app :: Not meaningfully.
- [ ] Guidelines ban colour :: Colour is fine; colour alone isn’t.

Q: What does a screen reader need for an icon-only “search” button?
- [ ] A bigger icon :: Size helps sighted users but doesn’t tell a screen reader what it is.
- [x] An accessible label such as “Search” :: Correct. The label is what the screen reader announces.
- [ ] A different colour :: Colour isn’t read aloud.
- [ ] Nothing; icons are self-explanatory :: Screen readers can’t interpret icons without labels.

Q: Which is an example of a situational disability?
- [ ] Permanent blindness :: That’s permanent.
- [x] Using a phone one-handed while holding a bag on a crowded train :: Correct. Designs for motor disabilities help here too.
- [ ] A broken arm :: That’s temporary.
- [ ] Colour blindness :: That’s permanent.

Q: What do automated accessibility checkers typically catch?
- [ ] Every issue :: They miss many issues.
- [x] Only part of the issues, such as contrast and missing labels; manual and real-user testing are still needed :: Correct. Tools are a quick first pass, not a full audit.
- [ ] Nothing useful :: They catch real issues quickly.
- [ ] Only performance problems :: They focus on accessibility.

Q: Which requirement best supports users who enlarge text in phone settings?
- [ ] Use fixed pixel font sizes everywhere :: Fixed sizes ignore user settings.
- [x] Layouts must work at 200% text size without cutting off content :: Correct. It respects users’ phone settings instead of overriding them.
- [ ] Use smaller fonts to fit more content :: Makes reading harder.
- [ ] Disable font scaling :: Excludes users who need larger text.
```

## Key takeaways

- Accessibility serves people with **permanent, temporary and situational** disabilities, and improves design for all.
- Follow **WCAG (aim for AA)** and its principles: **Perceivable, Operable, Understandable, Robust**.
- Require **contrast ≥ 4.5:1, labels for icons, 44–48 touch targets, plain language, scalable text, no colour-only meaning**.
- Test with **automated tools, screen readers, large text, and real users**.
- Put accessibility in the **PRD and Definition of Done** from the start.
