---
id: w5-google-sheets
title: "Google Sheets: metric tree and funnel model"
week: 5
estimatedMinutes: 9
tags: [tool, google-sheets, metrics]
---

## What it is

**Google Sheets**, the spreadsheet you used for RICE. This week you’ll build two analytical models: a **metric tree** with live numbers and a **funnel model** that shows how improving one step changes the outcome.

## Why PMs use it

Sheets models let you size the impact of ideas (“if activation goes up 5 points, how many more retained users?”), which feeds RICE impact scores and makes your PRD goals credible. Leaders trust numbers they can trace.

## Account setup (free plan)

Use your Google account at sheets.google.com. Create a spreadsheet named “P1 Metrics model”.

## Walkthrough part 1: metric tree in a sheet

### 1. Lay out the tree as rows
1. In column A, write each metric, indented by level using spaces or by using columns A–C for levels:
   - A1: `North Star: groups settled / month`
   - B2: `Active groups`
   - B3: `% summaries opened`
   - B4: `% opened → settled`
2. In column D, put the **current value** (from research or assumptions): D2 = 3000, D3 = 60%, D4 = 35%.
3. In D1 (the North Star), write the formula: `=D2*D3*D4` → 630.
4. Format percent cells: select → **Format → Number → Percent**.

### 2. Add a “scenario” column
1. In column E, copy the values, then change one input, e.g., E4 = 45%.
2. In E1: `=E2*E3*E4` → 810.
3. In F1: `=E1/D1-1` and format as percent → +29%. Now you can show “raising settle rate from 35% to 45% increases the North Star by 29%”.

### 3. Add guardrails
1. Below the tree, list guardrails with current value and threshold: `Opt-out rate | 1.2% | max 2%`.
2. Use **Format → Conditional formatting** to turn the cell pink if the value exceeds the threshold (custom formula: `=B12>C12`).

## Walkthrough part 2: funnel model

### 1. Set up the funnel
Create a new tab (**+** at the bottom), name it “Funnel”. Columns: `Step | Users | Conv. from previous | Conv. from top`.

| Step | Users |
|---|---|
| Visited | 40000 |
| Signed up | |
| Created group | |
| Added 3 expenses | |
| First settle-up | |

### 2. Use input rates, not typed numbers
1. Add a column `Assumed rate` next to each step after the first: 10%, 60%, 50%, 40%.
2. In B3 (Signed up): `=B2*E3` (where E3 holds 10%). Fill down for the other steps.
3. In C3: `=B3/B2` (conversion from previous). In D3: `=B3/$B$2` (from top). Fill down.

### 3. Find the leak and model improvements
1. Highlight the lowest relative conversion with conditional formatting (**Color scale** on column C).
2. Duplicate the tab (right-click tab → **Duplicate**), rename “Funnel – scenario”.
3. Change one assumed rate (e.g., group creation 60% → 70%) and see the final step change.
4. Make a small table comparing baseline vs. scenario final numbers.

### 4. Chart it
1. Select the Step and Users columns → **Insert → Chart**.
2. In the chart editor, choose **Column chart** (or **Bar chart**). Title it “P1 activation funnel (assumptions)”.
3. Label it clearly as **assumptions** unless the numbers come from real data.

### 5. Connect to real data (optional)
When you run your funnel queries in the SQL Playground or BigQuery, paste the real counts into a new tab “Funnel – actual” and compare with your assumptions.

## Tips

- **Separate inputs from calculations**: inputs in one colour (light yellow), formulas in white. Never type over a formula.
- **Name key cells** (Data → Named ranges), e.g., `activation_rate`, to make formulas readable.
- **Write your assumptions** in a notes column with sources.
- **Use the Metrics Tree Builder** in the Toolkit for the visual version and this sheet for the numbers.
- **Round sensibly**: show whole users and 1-decimal percentages.
