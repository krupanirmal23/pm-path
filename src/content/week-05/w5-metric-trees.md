---
id: w5-metric-trees
title: Metric trees
week: 5
estimatedMinutes: 13
tags: [metrics, metric-tree, analytics]
---

## Why this matters for a PM

A **metric tree** turns one big number into a map of everything that drives it. It shows where to look when a metric drops, which team owns which lever, and where your feature can make a difference. It’s part of your P1 deliverable this week, and the built-in Metrics Tree Builder in the Toolkit makes it quick.

## Core concepts

### What a metric tree is

A **metric tree** (also called a **driver tree** or **KPI tree**) is a diagram that breaks a top-level metric into the smaller metrics that mathematically or causally produce it. Each level is more specific and easier to act on.

- **Root:** the North Star or a key business metric.
- **Branches:** input metrics that combine to make the root.
- **Leaves:** specific, actionable metrics a team can move with features.

### Two kinds of relationships

1. **Mathematical (formula) relationships.** The children multiply or add up to the parent exactly.
   - Revenue = Orders × Average order value
   - Orders = Active customers × Orders per active customer
   - Active customers = New + Retained + Resurrected
2. **Causal (influence) relationships.** The child influences the parent but not by a strict formula.
   - Orders per customer ← restaurant selection, search quality, delivery time
   These are hypotheses; you confirm them with data and experiments.

Draw formula links as solid lines and causal links as dashed lines, so everyone knows which is which.

### Why trees are useful

- **Diagnosis:** when the root drops, walk down the tree to find which branch moved. (Week 6: root-causing a metric drop.)
- **Prioritisation:** see which lever has the most room to improve and the biggest effect on the root.
- **Ownership:** assign each branch to a team; avoid two teams pulling the same lever unknowingly.
- **Alignment:** connect a small feature (“reorder button”) to the North Star through a visible chain.

### Sensitivity: where to push

Not all branches are equal. If Orders = Customers × Frequency, a 10% lift in either gives the same 10% lift in orders. But it may be much cheaper to move frequency by 10% (a good reorder feature) than to grow customers by 10% (expensive marketing). Ask: **which lever moves most per unit of effort, and which has the most room to grow?**

### Common tree patterns

- **E-commerce / delivery:** Revenue = Buyers × Orders per buyer × Average order value (× take rate for marketplaces).
- **Subscription:** Monthly recurring revenue = Paying subscribers × Average revenue per subscriber; Paying subscribers = Previous + New − Churned.
- **Funnel-based:** Conversions = Visitors × Visit-to-signup % × Signup-to-activation % × Activation-to-purchase %.
- **Marketplace health:** separate supply (restaurants, sellers, drivers) and demand (customers) branches, plus matching quality (on-time rate, availability).

### Guardrails on the tree

Add guardrail metrics beside the tree, connected to the branches they protect: cancellation rate next to orders; refund rate next to delivered orders; cost per order next to delivery speed.

## Worked example

**Zepto (illustrative). Root: weekly gross order value (GOV).**

- **GOV = Weekly orders × Average order value (AOV)**
  - **Weekly orders = Weekly active households × Orders per household**
    - Weekly active households = New (first order this week) + Retained (ordered last week too) + Resurrected (returned after 2+ weeks)
      - New ← app installs × install-to-first-order rate (dashed: influenced by first-order offers, onboarding)
      - Retained ← first-order experience: on-time %, completeness % (dashed)
    - Orders per household ← assortment availability, reorder features, delivery fee perception (dashed)
  - **AOV = Items per order × Average item price**
    - Items per order ← “frequently bought together”, free-delivery threshold (dashed)
- **Guardrails:** % orders with a missing item; delivery cost per order; cancellation rate.

**Using it:** GOV dropped 6% last week. The tree shows orders were flat but AOV fell 6%. Items per order fell; average item price didn’t. The team finds the free-delivery threshold was lowered from ₹199 to ₹99 in a pricing test, so people stopped padding baskets. Now it’s a clear trade-off: more satisfied users and possibly higher frequency vs. lower AOV.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 280" role="img" aria-labelledby="mt-t mt-d">
<title id="mt-t">A metric tree</title>
<desc id="mt-d">Gross order value splits into weekly orders and average order value; orders split into active households and orders per household; households split into new, retained and resurrected.</desc>
<g class="d-ink" stroke-width="2"><line x1="320" y1="54" x2="190" y2="86"/><line x1="320" y1="54" x2="470" y2="86"/><line x1="190" y1="130" x2="100" y2="162"/><line x1="190" y1="130" x2="280" y2="162"/><line x1="470" y1="130" x2="470" y2="162"/><line x1="100" y1="206" x2="40" y2="232"/><line x1="100" y1="206" x2="110" y2="232"/><line x1="100" y1="206" x2="180" y2="232"/></g>
<g class="d-ink" stroke-width="2" stroke-dasharray="5 4"><line x1="280" y1="206" x2="300" y2="232"/></g>
<rect x="225" y="14" width="190" height="40" rx="10" class="d-butter d-ink" stroke-width="2"/><text x="245" y="39" class="d-text-dark" font-weight="700" font-size="12">Gross order value</text>
<rect x="110" y="86" width="160" height="44" rx="10" class="d-sky d-ink" stroke-width="2"/><text x="124" y="113" class="d-text-dark" font-weight="700" font-size="12">Weekly orders</text>
<rect x="390" y="86" width="160" height="44" rx="10" class="d-sky d-ink" stroke-width="2"/><text x="404" y="113" class="d-text-dark" font-weight="700" font-size="12">Avg order value</text>
<rect x="20" y="162" width="160" height="44" rx="10" class="d-mint d-ink" stroke-width="2"/><text x="32" y="189" class="d-text-dark" font-size="11">Active households</text>
<rect x="200" y="162" width="160" height="44" rx="10" class="d-mint d-ink" stroke-width="2"/><text x="212" y="189" class="d-text-dark" font-size="11">Orders / household</text>
<rect x="390" y="162" width="160" height="44" rx="10" class="d-mint d-ink" stroke-width="2"/><text x="402" y="189" class="d-text-dark" font-size="11">Items / order × price</text>
<rect x="5" y="232" width="70" height="34" rx="8" class="d-surface d-ink" stroke-width="2"/><text x="17" y="254" class="d-text" font-size="11">New</text>
<rect x="80" y="232" width="70" height="34" rx="8" class="d-surface d-ink" stroke-width="2"/><text x="86" y="254" class="d-text" font-size="11">Retained</text>
<rect x="155" y="232" width="80" height="34" rx="8" class="d-surface d-ink" stroke-width="2"/><text x="160" y="254" class="d-text" font-size="11">Resurrected</text>
<rect x="250" y="232" width="110" height="34" rx="8" class="d-surface d-ink" stroke-width="2" stroke-dasharray="5 4"/><text x="258" y="254" class="d-text" font-size="11">Reorder feature</text>
<text x="400" y="250" class="d-text" font-size="11">solid = formula · dashed = influence</text>
</svg>
<figcaption>Formula links let you diagnose exactly; influence links are hypotheses to test.</figcaption>
</figure>

## Step by step

Building your P1 metric tree:

1. **Put your North Star at the root**, precisely defined.
2. **Write the first formula**: how the root breaks into 2–3 factors that multiply or add up.
3. **Break each factor down** one more level (new/retained/resurrected; funnel steps; rates).
4. **Add influence links** (dashed) from features or behaviours to the leaves.
5. **Mark ownership**: which team (or which of your P1 features) affects each leaf.
6. **Add guardrails** next to the branches they protect.
7. **Fill in current or estimated values** where you can. Even rough numbers show where the biggest gaps are.
8. **Circle the lever** your P1 feature targets and explain the expected effect on the root.
9. **Build it** in the Toolkit’s Metrics Tree Builder or in Google Sheets/Miro, and screenshot it for your deliverable.

## Common mistakes

1. **Mixing formula and influence links** without marking them; people assume causation that isn’t proven.
2. **Branches that don’t add up.** If children don’t combine to the parent, diagnosis breaks.
3. **Going too deep.** 3–4 levels are enough; leaves should be actionable, not microscopic.
4. **No values.** A tree without numbers can’t show where the biggest opportunity is.
5. **Leaving out guardrails.** Optimising one branch can quietly damage another.
6. **Building it once and forgetting it.** Revisit when strategy or the product changes.

## How it shows up in interviews

> [!INTERVIEW]
> **“Revenue for Zomato dropped 5% this month. How do you think about it?”**
> Outline: build the tree aloud (revenue = orders × AOV × take rate; orders = customers × frequency…) → check which branch moved → segment (city, platform, new vs. returning) → hypotheses for that branch → data to confirm → action.

> [!INTERVIEW]
> **“How would you measure the success of a new ‘reorder’ button?”**
> Outline: place it on the tree (orders per customer, retained customers) → primary metric (reorder rate among exposed users) → link to North Star → guardrails (AOV, discovery of new restaurants).

## Practice exercise

**Task (30 minutes):** Build a 3-level metric tree for **PhonePe’s monthly successful transactions**. Mark formula vs. influence links, add 2 guardrails, and circle the lever you’d target with a new “UPI Lite” feature.

```answer Reveal a model answer
**Root:** Monthly successful transactions (MST)

- **MST = Monthly transacting users (MTU) × Transactions per user × Success rate**
  - **MTU = New + Retained + Resurrected** (formula)
    - New ← KYC/onboarding completion, referral offers (influence)
    - Retained ← reliability, merchant acceptance (influence)
  - **Transactions per user** = P2P per user + Merchant payments per user + Bill payments per user (formula)
    - Merchant payments per user ← QR acceptance at shops, speed of small payments (influence) ⭕ UPI Lite target
  - **Success rate** = 1 − failure rate (formula)
    - Failure rate ← bank server uptime, PIN errors, network (influence)

**Guardrails:** fraud/dispute rate; cost per transaction.

**UPI Lite lever:** it makes small payments faster and less likely to fail due to bank downtime, so it targets **merchant payments per user** (more small, frequent payments) and **success rate** for low-value payments.
```

## Quiz

```quiz
Q: In a metric tree, what’s the difference between solid and dashed links?
- [ ] Solid links are more important :: Importance isn’t the distinction.
- [x] Solid links are exact formulas; dashed links are hypothesised influences :: Correct. It prevents confusing correlation with exact math.
- [ ] Dashed links are deprecated metrics :: Not what they mean.
- [ ] There’s no difference :: Marking the difference matters for diagnosis.

Q: Revenue = Orders × AOV. Orders stayed flat, revenue fell 8%. Where should you look?
- [ ] Number of active customers :: Orders were flat, so customer count isn’t the main driver.
- [x] Average order value and its drivers :: Correct. AOV must have fallen ~8%.
- [ ] App downloads :: Unrelated to this change.
- [ ] Nowhere; it’s random :: An 8% drop deserves investigation.

Q: Which breakdown of “active customers” is a proper formula?
- [ ] Active customers = Marketing + Product :: Not measurable components.
- [x] Active customers = New + Retained + Resurrected :: Correct. These add up exactly.
- [ ] Active customers = Downloads × Ratings :: Not a valid relationship.
- [ ] Active customers = Revenue ÷ Price :: Not a standard or exact relationship.

Q: Why add values to a metric tree?
- [ ] To make it look complex :: Not the purpose.
- [x] To see which branches have the biggest gaps and opportunities :: Correct. Numbers turn the tree from a picture into a prioritisation tool.
- [ ] Because trees must have numbers by definition :: They’re useful without numbers, but much better with them.
- [ ] To replace dashboards :: Trees complement dashboards.

Q: How deep should a metric tree usually go?
- [ ] One level :: Too shallow to act on.
- [x] 3–4 levels, until leaves are actionable :: Correct. Deep enough that a team can act on each leaf, shallow enough to stay readable.
- [ ] 10+ levels :: Becomes unreadable and too granular.
- [ ] As deep as possible :: Depth without purpose adds noise.
```

## Key takeaways

- A **metric tree** breaks a root metric into drivers, down to **actionable leaves**.
- Mark **formula** (exact) and **influence** (hypothesis) links differently.
- Use it to **diagnose drops**, **prioritise levers**, and **assign ownership**.
- Add **values** and **guardrails**; aim for **3–4 levels**.
- Connect each feature to the North Star through a **visible chain**.
