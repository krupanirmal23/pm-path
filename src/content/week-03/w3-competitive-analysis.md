---
id: w3-competitive-analysis
title: Competitive analysis and positioning
week: 3
estimatedMinutes: 15
tags: [strategy, competition, positioning]
---

## Why this matters for a PM

Users always have alternatives: another app, a spreadsheet, WhatsApp, doing nothing. If you don’t understand them, you can’t explain why anyone should choose your product. Competitive analysis shows where the gaps are; **positioning** turns that into a clear, believable reason to choose you. Both go into your P1 strategy doc.

## Core concepts

### Types of competitors

- **Direct competitors:** solve the same job in a similar way for the same users. Zepto vs. Blinkit vs. Instamart.
- **Indirect competitors:** solve the same job differently. Zepto vs. the kirana store vs. BigBasket’s scheduled delivery.
- **Substitutes / non-consumption:** doing nothing or a workaround. For expense splitting: WhatsApp messages, rounding off, a notebook.
- **Future competitors:** big players who could enter. A payments app adding a feature you depend on.

JTBD (Week 2) helps here: list everything users currently “hire” for the job.

### What to compare

A useful **competitive analysis** compares alternatives on dimensions that matter *to your users* (from research), not every feature. Typical dimensions:
- **Target user and job**: who are they really for?
- **Core value proposition**: their main promise.
- **Key strengths and weaknesses**: from reviews and your own use.
- **Pricing / business model**.
- **Distribution**: how they acquire users (ads, referrals, app store, partnerships).
- **User sentiment**: what reviews praise and complain about.
- **Moat**: anything hard to copy (network effects, data, brand, cost advantages, regulation). A **moat** is a lasting advantage that protects a business from competitors.

### Competitive analysis tools

- **Feature/attribute matrix:** rows are competitors, columns are dimensions. Fill with short notes or ratings. Useful, but can turn into a feature-counting contest.
- **Positioning map (perceptual map):** a 2x2 chart with two dimensions users care about (e.g., price vs. speed). Plot competitors. Empty quadrants may be opportunities (or empty for a good reason).
- **Review mining:** tagging reviews to find what users love and hate about each competitor (this week’s tool guide).
- **SWOT:** Strengths, Weaknesses (internal), Opportunities, Threats (external). Quick but often vague; use only with evidence.

### Positioning

**Positioning** is the place your product occupies in the user’s mind compared to alternatives. It answers: “For whom, compared to what, and why is it better?”

A common template:
> **For** [target user] **who** [need/job], **[product]** is a [category] **that** [key benefit]. **Unlike** [main alternative], **we** [key difference backed by proof].

Example: “For flatmates who share small household purchases, FlatSplit is an expense tool that settles up automatically each month. Unlike Splitwise, nobody has to log every expense or ask friends for money: FlatSplit reads shared UPI payments and sends a neutral monthly summary.”

Good positioning:
- **Picks a specific user** (not everyone).
- **Names the real alternative** users compare you with.
- **Claims one or two differences** that matter to that user and that you can prove.
- **Is honest**: you can deliver it.

### Differentiation that lasts

Features are easy to copy. Lasting advantage usually comes from:
- **Network effects**: the product gets better as more people use it (more restaurants attract more users, which attract more restaurants).
- **Proprietary data**: unique data that improves the product.
- **Cost advantages**: a structurally cheaper way to deliver.
- **Brand and trust**: especially in money and health.
- **Switching costs**: effort or loss when leaving (data, habits, integrations).
- **Distribution**: a channel competitors can’t easily access.

## Worked example

**Zerodha vs. Groww vs. Upstox vs. a bank broker (illustrative).**

| Dimension | Zerodha | Groww | Upstox | Bank broker (e.g., large bank) |
|---|---|---|---|---|
| Core user | Active traders and serious investors | First-time investors | Price-sensitive traders | Existing bank customers |
| Main promise | Low cost, reliable, powerful tools | Simple, friendly investing | Low cost, modern app | Convenience with your bank |
| Strengths (from reviews) | Reliability, education (Varsity), no-nonsense | Very easy onboarding, clean UI | Pricing, offers | Trust, linked accounts |
| Weaknesses (from reviews) | Can feel complex for beginners | Less depth for advanced traders | Mixed reliability perception | High fees, dated apps |
| Moat | Brand trust, scale, community | Beginner brand, simplicity | Price | Existing customer base |

**Positioning map: simplicity (x) vs. depth of tools (y).** Groww sits high simplicity / lower depth; Zerodha sits high depth / medium simplicity; bank brokers sit low on both. The gap: a product with high simplicity *and* growing depth that grows with the investor. That could be a positioning opportunity for a new entrant, or a direction for Groww.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 300" role="img" aria-labelledby="ca-t ca-d">
<title id="ca-t">Positioning map</title>
<desc id="ca-d">A two by two chart with simplicity on the x axis and depth of tools on the y axis. Groww is high simplicity, Zerodha is high depth, bank brokers are low on both, and the top-right is an open gap.</desc>
<line x1="80" y1="260" x2="600" y2="260" class="d-ink" stroke-width="2"/>
<line x1="80" y1="260" x2="80" y2="20" class="d-ink" stroke-width="2"/>
<line x1="340" y1="20" x2="340" y2="260" class="d-ink" stroke-width="1" stroke-dasharray="5 5"/>
<line x1="80" y1="140" x2="600" y2="140" class="d-ink" stroke-width="1" stroke-dasharray="5 5"/>
<text x="250" y="288" class="d-text" font-size="12">Simplicity for beginners →</text>
<text x="40" y="200" class="d-text" font-size="12" transform="rotate(-90 40 200)">Depth of tools →</text>
<circle cx="270" cy="60" r="26" class="d-sky d-ink" stroke-width="2"/><text x="248" y="64" class="d-text-dark" font-size="11" font-weight="700">Zerodha</text>
<circle cx="500" cy="190" r="26" class="d-mint d-ink" stroke-width="2"/><text x="482" y="194" class="d-text-dark" font-size="11" font-weight="700">Groww</text>
<circle cx="200" cy="120" r="24" class="d-peach d-ink" stroke-width="2"/><text x="180" y="124" class="d-text-dark" font-size="11" font-weight="700">Upstox</text>
<circle cx="140" cy="220" r="26" class="d-surface d-ink" stroke-width="2"/><text x="122" y="218" class="d-text" font-size="10" font-weight="700">Bank</text><text x="118" y="230" class="d-text" font-size="10">broker</text>
<rect x="430" y="40" width="150" height="70" rx="10" class="d-butter d-ink" stroke-width="2" stroke-dasharray="6 4"/>
<text x="445" y="70" class="d-text-dark" font-size="12" font-weight="700">Gap?</text>
<text x="445" y="90" class="d-text-dark" font-size="11">Simple + grows with you</text>
</svg>
<figcaption>Pick axes users actually care about. An empty quadrant is a question to investigate, not proof of an opportunity.</figcaption>
</figure>

## Step by step

For your P1 competitive analysis:

1. **List alternatives** using the job: direct, indirect, substitutes (including “do nothing”). Pick 4–6 to analyse.
2. **Choose 5–7 dimensions** that your research says users care about.
3. **Use each product** for 20 minutes. Screenshot key flows.
4. **Mine 50+ reviews** across competitors (tool guide). Tag complaints and praise.
5. **Fill the matrix** with short, evidence-backed notes. Cite review counts.
6. **Draw a positioning map** in Miro with the two dimensions that best separate alternatives *and* matter to users.
7. **Identify gaps**: underserved users, unmet needs, consistent complaints.
8. **Write your positioning statement** with the template. Check: specific user, real alternative, provable difference.
9. **Note threats**: what if a big player copies you? What’s your lasting advantage?

## Common mistakes

1. **Only listing direct competitors.** Substitutes like WhatsApp often win.
2. **Feature-count tables.** More features isn’t better; what matters is what users value.
3. **Dimensions users don’t care about.** “Uses microservices” isn’t a user dimension.
4. **Positioning for everyone.** “For all Indians” means no one feels it’s for them.
5. **Claiming differences you can’t prove.** “Best customer service” needs evidence.
6. **Assuming empty quadrants are opportunities.** Sometimes nobody wants that combination.

## How it shows up in interviews

> [!INTERVIEW]
> **“How would you compete with Blinkit if you were Zepto?”**
> Outline: define the battleground (users, cities, job) → compare on dimensions users value (speed, assortment, price, reliability) → identify where you can win and why (moat) → 2–3 moves → what you won’t do (e.g., price war everywhere) → metrics.

> [!INTERVIEW]
> **“Who are your product’s competitors?”**
> Outline: JTBD lens → direct, indirect, substitutes → most dangerous one and why → how you’re positioned against it.

## Practice exercise

**Task (40 minutes):** For your P1 problem (or use “shared expenses among flatmates”), list 5 alternatives (including at least one substitute), compare them on 5 user-relevant dimensions, and write a positioning statement.

```answer Reveal a model answer (shared expenses)
**Alternatives:** Splitwise (direct), Google Sheets (indirect), WhatsApp group messages + UPI (substitute), one person pays everything and absorbs it (non-consumption), PhonePe/GPay split request (indirect).

| Dimension | Splitwise | Sheets | WhatsApp + UPI | Absorb it | UPI split |
|---|---|---|---|---|---|
| Effort to log | High (manual) | High | Medium | None | Low (per bill) |
| Settles money | No (tracks only) | No | Yes (manual) | No | Yes |
| Social awkwardness | Medium | Medium | High (someone asks) | None (but resentment) | Medium |
| Handles cash/mixed | Yes (manual) | Yes | Partly | — | No |
| Cost | Free + paid tier | Free | Free | Hidden losses | Free |

**Gap:** low effort + money settled + no one has to ask.

**Positioning:** “For flatmates who share small, irregular household purchases, FlatSplit is a settle-up tool that works in the background. Unlike Splitwise or WhatsApp requests, no one logs every expense or chases friends: it builds a monthly summary from shared UPI payments and sends one neutral settle-up link.”
```

## Quiz

```quiz
Q: For a flatmate expense app, which is a substitute rather than a direct competitor?
- [ ] Splitwise :: A direct competitor solving the same job in a similar way.
- [x] Rounding off in a WhatsApp group and absorbing small losses :: Correct. A workaround/non-consumption that competes for the same job.
- [ ] Another expense-splitting app :: Direct competitor.
- [ ] Splitwise’s paid tier :: Still Splitwise; direct.

Q: What makes a good positioning statement?
- [ ] It targets all users so nobody is excluded :: Positioning for everyone resonates with no one.
- [x] It names a specific user, the real alternative, and a provable difference :: Correct. That’s the core of positioning.
- [ ] It lists every feature :: Features aren’t positioning.
- [ ] It uses the word “best” :: Superlatives without proof are weak.

Q: Which is the strongest example of a moat?
- [ ] A nice colour scheme :: Easy to copy.
- [ ] A clever feature launched last month :: Features are usually copied quickly.
- [x] A marketplace where more restaurants attract more users, which attract more restaurants :: Correct. That’s a network effect, hard to replicate.
- [ ] A big launch event :: Temporary attention, not a lasting advantage.

Q: You find an empty quadrant on your positioning map. What should you conclude?
- [ ] It’s definitely a market opportunity :: Not necessarily.
- [x] Investigate whether users actually want that combination; it might be empty for a good reason :: Correct. Treat it as a hypothesis.
- [ ] Your axes are wrong :: Possibly, but the gap alone doesn’t prove that.
- [ ] Competitors are unaware of it :: Often they know and chose not to go there.

Q: How should you choose the dimensions for a competitive comparison?
- [ ] Use every feature you can find :: That creates a feature-count contest.
- [x] Use dimensions your research shows users care about :: Correct. Compare on what drives choice.
- [ ] Use technical architecture details :: Users rarely choose on architecture.
- [ ] Use whatever makes your product look best :: That’s biased and won’t hold up.

Q: Why is review mining useful in competitive analysis?
- [ ] It replaces the need to use competitor products :: You should still use them.
- [x] It shows, in users’ words and at scale, what they love and hate about each alternative :: Correct. Patterns in reviews reveal gaps.
- [ ] It tells you competitors’ revenue :: Reviews don’t reveal revenue.
- [ ] It’s required by law :: It isn’t.
```

## Key takeaways

- Map **direct, indirect, substitute and future** competitors using the **job**.
- Compare on **dimensions users care about**, with evidence from use and **reviews**.
- A **positioning map** reveals gaps; treat empty quadrants as **hypotheses**.
- Positioning = **for whom, compared to what, why better**, and you must be able to **prove it**.
- Lasting advantage comes from **moats** (network effects, data, cost, trust, switching costs), not features.
