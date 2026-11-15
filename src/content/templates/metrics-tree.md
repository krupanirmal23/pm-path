---
title: Metrics tree
category: Measure
week: 5
summary: Breaks a North Star metric into inputs your team can move, plus guardrails. Use the Metrics Tree Builder for an interactive version.
---
## When to use
When defining success for a product or team, or answering “how would you measure…” in interviews. Build it interactively in the **Metrics Tree Builder** in the Toolkit.

## How to fill it
1. **North Star:** captures value delivered to users and leads to business value. Usually a count over time.
2. **Inputs:** 3–5 metrics that add or multiply up to the North Star.
3. **Drivers:** levers a team can change this quarter.
4. **Guardrails:** things that must not get worse (quality, trust, cost).
5. For each metric, write its definition precisely (who counts, time window).

<!-- template -->
# Metrics tree: {product}

**North Star:** {metric} — definition: {precise}

| Level | Metric | Definition | Current | Owner |
|---|---|---|---|---|
| Input | | | | |
| Driver | | | | |
| Guardrail | | | | |

**Formula:** {how inputs combine}
**Why this North Star:** {link to user value and revenue}

<!-- example -->
# Metrics tree: FlatSplit

**North Star:** Groups fully settled per month — a group where every member’s net balance reached ₹0 at least once in the calendar month.

| Level | Metric | Definition | Current | Owner |
|---|---|---|---|---|
| Input | Active groups | Groups with ≥1 expense in the month | 2,100 | Growth |
| Input | Summary open rate | % of members who open the monthly summary within 3 days | 48% | Product |
| Input | Settle rate after open | % of opened summaries where the member pays | 55% | Product |
| Driver | New groups created | Groups created in month | 600 | Growth |
| Driver | Groups retained | Active last month and this month | 1,500 | Product |
| Driver | UPI hand-off success | % of Pay taps that return as paid | 82% | Eng |
| Guardrail | Notification opt-out rate | % of users disabling notifications per month | 2.1% | Product |
| Guardrail | Group leave rate | % of members leaving a group per month | 1.4% | Product |

**Formula:** settled groups ≈ active groups × P(all members settle), and P(all settle) rises with open rate × settle-after-open rate.
**Why this North Star:** it measures the value users came for (no awkward money chasing), and settled groups retain better, which drives growth through invites.
