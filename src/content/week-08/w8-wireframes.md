---
id: w8-wireframes
title: "Wireframes: low vs. high fidelity"
week: 8
estimatedMinutes: 13
tags: [ux, wireframes, prototyping]
---

## Why this matters for a PM

Pictures beat paragraphs. A quick wireframe can settle a debate that a 3-page spec can’t, and a clickable prototype can test value and usability before a single line of code. PMs don’t need to be designers, but they must be able to sketch ideas, choose the right level of detail, and give useful feedback on designs. This week you’ll build a P1 prototype in Figma.

## Core concepts

### Fidelity

**Fidelity** means how closely a design resembles the final product.

- **Low fidelity (lo-fi):** rough sketches on paper or simple boxes and placeholder text. Fast (minutes), cheap to throw away. Focus: structure, layout, flow, content priority.
- **Mid fidelity:** clean greyscale wireframes in a tool, with real labels and realistic content, no colours or images.
- **High fidelity (hi-fi):** looks like the real product: colours, typography, icons, images, real copy. Focus: visual design, detailed interaction.

### Wireframes, mockups and prototypes

- **Wireframe:** a layout of a screen showing what goes where, usually lo-fi or mid-fi. Like an architect’s floor plan.
- **Mockup:** a static, high-fidelity picture of a screen.
- **Prototype:** a clickable or interactive simulation of the product. Can be lo-fi (linked paper sketches photographed into a tool) or hi-fi (Figma prototype that feels real).

### Choosing the right fidelity

| Goal | Fidelity |
|---|---|
| Explore many ideas quickly | Lo-fi sketches (paper, Excalidraw) |
| Agree on structure and flow with the team | Lo-fi to mid-fi wireframes |
| Test whether users understand the flow (usability) | Mid-fi clickable prototype |
| Test trust, appeal, brand perception | Hi-fi prototype |
| Hand over to engineering | Hi-fi designs with specs and states |

Rule of thumb: **use the lowest fidelity that answers your question.** High fidelity too early makes people comment on colours instead of the flow, and makes the team reluctant to throw things away.

### Sketching techniques for PMs

- **Crazy 8s:** fold a page into 8 panels; sketch 8 different ideas for one screen in 8 minutes. Forces variety.
- **Storyboards:** a comic-strip sequence of the user’s situation and how the product helps.
- **Annotated sketches:** add notes explaining behaviour (“tapping here expands the breakdown”).

### What a good wireframe shows

- **Content hierarchy:** what matters most is biggest and highest.
- **Primary action:** one clear main button per screen.
- **Real content:** realistic names, amounts and lengths (“Udupi Upahar, Indiranagar” not “Lorem ipsum”). Real content reveals layout problems.
- **States:** empty, loading, error and success, not just the ideal screen.
- **Annotations:** behaviour, rules and open questions.

### Prototyping fidelity for testing

For usability tests (later lesson), a mid-fi clickable prototype often works best: realistic enough for users to act naturally, rough enough that they don’t think it’s finished (they’re more willing to criticise).

### Giving design feedback as a PM

- **Anchor on the goal and user**: “For a first-time user, is it clear what they owe?”
- **Describe problems, not solutions**: “I’m worried users won’t notice the fee breakdown” rather than “Make it red”.
- **Separate must-fix from preferences.**
- **Ask questions**: “What did you consider for this?”
- **Use evidence**: research, heuristics, test results.

## Worked example

**Designing the “monthly summary” screen for P1.**

**Step 1: Crazy 8s (lo-fi, 8 minutes).** Ideas include: a big net amount with a settle button; a list of who owes whom; a chat-style message from “FlatBot”; a pie chart of spending; a “settle all” group payment; a calendar view; a receipt-style summary; a card per flatmate.

**Step 2: Choose 2 to wireframe (mid-fi).**
- Option A: big net amount (“You owe ₹420”), top 5 expenses, sticky “Settle ₹420” button.
- Option B: card per flatmate with individual amounts and settle buttons.

**Step 3: Quick test with 3 people (paper).** All three understood Option A in under 5 seconds; Option B confused two who owed multiple people (“Do I pay each one?”). Insight: show a single net amount, and handle splitting behind the scenes.

**Step 4: Hi-fi for the chosen option** with brand colours, plus states: all settled (celebration), payment pending, payment failed, disputed expense.

Cost so far: about 3 hours. No engineering time spent. A wrong direction (Option B) eliminated early.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 260" role="img" aria-labelledby="wf-t wf-d">
<title id="wf-t">Low, mid and high fidelity</title>
<desc id="wf-d">Three phone screens side by side: a rough sketch, a greyscale wireframe with labels, and a coloured high fidelity design.</desc>
<g class="d-ink" stroke-width="2">
<rect x="30" y="20" width="160" height="220" rx="18" class="d-surface"/>
<rect x="240" y="20" width="160" height="220" rx="18" class="d-surface"/>
<rect x="450" y="20" width="160" height="220" rx="18" class="d-surface"/>
</g>
<g class="d-ink" stroke-width="1.5" fill="none" stroke-dasharray="3 3">
<path d="M50 50 h120"/><path d="M50 80 h80"/><rect x="50" y="100" width="120" height="50"/><path d="M50 170 h120"/><rect x="50" y="195" width="120" height="28" rx="6"/>
</g>
<text x="62" y="214" class="d-text" font-size="10">Pay?</text>
<g class="d-ink" stroke-width="1.5">
<rect x="258" y="40" width="124" height="22" class="d-surface"/><rect x="258" y="72" width="124" height="40" class="d-surface"/><rect x="258" y="122" width="124" height="16" class="d-surface"/><rect x="258" y="144" width="124" height="16" class="d-surface"/><rect x="258" y="195" width="124" height="28" rx="6" class="d-surface"/>
</g>
<text x="264" y="55" class="d-text" font-size="10">Flat 4B summary</text><text x="264" y="97" class="d-text" font-size="12" font-weight="700">You owe ₹420</text><text x="264" y="134" class="d-text" font-size="9">Groceries ₹1,260</text><text x="264" y="156" class="d-text" font-size="9">Wi-Fi ₹999</text><text x="292" y="214" class="d-text" font-size="11">Settle ₹420</text>
<rect x="468" y="40" width="124" height="22" rx="6" class="d-lavender d-ink" stroke-width="1.5"/>
<rect x="468" y="72" width="124" height="40" rx="8" class="d-butter d-ink" stroke-width="1.5"/>
<rect x="468" y="122" width="124" height="38" rx="6" class="d-sky d-ink" stroke-width="1.5"/>
<rect x="468" y="195" width="124" height="28" rx="8" class="d-mint d-ink" stroke-width="2"/>
<text x="474" y="55" class="d-text-dark" font-size="10" font-weight="700">Flat 4B · June</text><text x="474" y="97" class="d-text-dark" font-size="13" font-weight="700">You owe ₹420</text><text x="474" y="140" class="d-text-dark" font-size="9">🛒 Groceries · 🌐 Wi-Fi</text><text x="496" y="214" class="d-text-dark" font-size="11" font-weight="700">Settle ₹420</text>
<text x="60" y="256" class="d-text" font-size="12" font-weight="700">Low: ideas</text>
<text x="262" y="256" class="d-text" font-size="12" font-weight="700">Mid: structure</text>
<text x="475" y="256" class="d-text" font-size="12" font-weight="700">High: polish</text>
</svg>
<figcaption>Use the lowest fidelity that answers your current question.</figcaption>
</figure>

## Step by step

From flow to prototype for P1:

1. **Start from your user flow**: list every screen and state.
2. **Crazy 8s** for the most important screen.
3. **Pick 2 ideas** and sketch them properly on paper or in Excalidraw.
4. **Quick paper test** with 2–3 people: “What can you do here? What would you tap?”
5. **Mid-fi wireframes** in Figma for the whole flow, with real content.
6. **Add states**: empty, loading, error, success.
7. **Link screens** into a clickable prototype (Figma guide).
8. **Add hi-fi styling** with a free UI kit once the flow works.
9. **Annotate** behaviour and open questions for engineers.

## Common mistakes

1. **Jumping to hi-fi**, then defending polish instead of learning.
2. **Lorem ipsum** instead of real content.
3. **Only the happy-path screen**; no empty, error or loading states.
4. **Several primary buttons** fighting for attention.
5. **Prescribing pixel-level design** as a PM instead of describing problems.
6. **One idea only**; you lose the benefit of comparison.

## How it shows up in interviews

> [!INTERVIEW]
> **Product design questions (“Design X for Y”)**
> Outline: after users, problems and solutions, sketch the key screen verbally or on a whiteboard: hierarchy, primary action, key states. Interviewers like candidates who can make ideas concrete.

> [!INTERVIEW]
> **“How do you work with designers on a new feature?”**
> Outline: share problem and research → co-sketch early (Crazy 8s) → agree on fidelity for each stage → test early with users → give feedback on goals, not taste → support design decisions with evidence.

## Practice exercise

**Task (30 minutes):** Do a Crazy 8s for **“the screen a Zerodha Kite user sees after a big market drop”** (goal: reduce panic selling for new investors). Then turn your best idea into a mid-fi wireframe with real content and one error/edge state.

```answer Reveal a model answer
**Crazy 8s ideas:** 1) Calm banner “Markets fell 3% today, historically normal”; 2) Long-term chart by default (5-year view instead of 1-day); 3) “Your goal progress” instead of today’s loss; 4) A “Before you sell” checklist on the sell button; 5) Short explainer card “Why markets fall”; 6) Notification summarising the day calmly; 7) Option to hide daily P&L; 8) Peer stat “82% of long-term investors held this week”.

**Chosen (mid-fi):** Portfolio screen for new investors on high-volatility days:
- Top: “Markets are down 3.1% today. Drops like this happen a few times a year.” (link: “What should I do?”)
- Middle: portfolio value with a toggle “Today | 1 year | Since you started” (default “Since you started”).
- Holdings list as usual.
- Sell flow: a light “Selling during a dip locks in losses. Continue?” step for long-term holdings (not for traders).
- **Edge state:** if the user’s portfolio is up despite the market fall, hide the banner (don’t create worry).
```

## Quiz

```quiz
Q: When is low-fidelity sketching the best choice?
- [ ] Final handover to engineering :: Engineers need detailed hi-fi designs and states.
- [x] Exploring many ideas quickly and cheaply :: Correct. Lo-fi makes it easy to try and discard ideas.
- [ ] Testing brand perception :: That needs hi-fi visuals.
- [ ] Measuring app performance :: Unrelated to wireframing.

Q: What’s the difference between a wireframe and a prototype?
- [ ] They’re the same :: A prototype adds interactivity.
- [x] A wireframe shows a screen’s layout; a prototype simulates interaction across screens :: Correct. Prototypes let users tap through a flow.
- [ ] Wireframes are always coloured :: Wireframes are usually greyscale.
- [ ] Prototypes are always code :: Many prototypes are made in design tools.

Q: Why use real content instead of lorem ipsum?
- [ ] It looks nicer :: Looks aren’t the main reason.
- [x] Real lengths and values reveal layout and clarity problems early :: Correct. Long restaurant names and big amounts break layouts that lorem ipsum hides.
- [ ] Lorem ipsum is illegal :: It isn’t illegal; it just hides real layout and clarity problems.
- [ ] Users prefer Latin :: Users don’t read placeholder text meaningfully.

Q: What is Crazy 8s?
- [ ] Eight screens of a final design :: It’s an idea-generation exercise.
- [x] Sketching 8 different ideas for one screen in 8 minutes :: Correct. The time pressure forces variety over polish.
- [ ] Testing with 8 users :: Not what it means.
- [ ] Eight sprints of design work :: Not what it means.

Q: Which is the best design feedback from a PM?
- [ ] Make the button bigger and red :: Prescribes a solution without the problem.
- [x] I’m worried first-time users won’t notice the fee breakdown before paying; can we check that in testing? :: Correct. States the user problem and suggests evidence.
- [ ] I don’t like it :: Not actionable.
- [ ] Copy what Swiggy does :: Not tied to your users’ problem.

Q: Why might a mid-fi prototype be better than hi-fi for usability tests?
- [ ] It’s required by testing tools :: No such requirement.
- [x] It’s realistic enough to test the flow, and users feel freer to criticise something that looks unfinished :: Correct. You get honest feedback on the flow.
- [ ] Users can’t use hi-fi prototypes :: They can use them fine; the issue is how polish affects feedback.
- [ ] Mid-fi always has more features :: Feature count isn’t about fidelity.
```

## Key takeaways

- **Fidelity** ranges from rough sketches to polished designs; use the **lowest fidelity that answers your question**.
- **Wireframes** show layout; **mockups** show visuals; **prototypes** simulate interaction.
- Generate **many ideas** (Crazy 8s), compare, then refine.
- Use **real content** and design **empty, loading, error and success** states.
- Give feedback on **goals and user problems**, not personal taste.
