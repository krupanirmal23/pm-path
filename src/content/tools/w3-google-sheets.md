---
id: w3-google-sheets
title: "Google Sheets: a RICE sheet with formulas"
week: 3
estimatedMinutes: 9
tags: [tool, google-sheets, rice]
---

## What it is

**Google Sheets** is Google’s free online spreadsheet. It works in the browser, saves automatically and is easy to share.

## Why PMs use it

Spreadsheets are the PM’s Swiss Army knife: prioritisation sheets, simple financial models, funnel calculations, research trackers, launch checklists. Using formulas (not typed numbers) makes your work trustworthy and easy to update when estimates change.

## Account setup (free plan)

1. Go to sheets.google.com with your Google account.
2. Click **Blank spreadsheet**. Everything you need is free.

## Walkthrough: build your P1 RICE sheet

### 1. Set up columns
1. Rename the sheet (top left) to “P1 RICE – [your topic]”.
2. In row 1, type headers in columns A–J:
   `Idea | Opportunity | Reach (per qtr) | Impact | Confidence | Effort (person-months) | RICE score | Evidence | Rank | Bucket`
3. Select row 1 → **Format → Text → Bold**. Then **View → Freeze → 1 row** so headers stay visible.

### 2. Add dropdowns for Impact and Confidence
1. Select D2:D30 (Impact). Go to **Data → Data validation → Add rule**.
2. Criteria: **Dropdown**. Add the values `3`, `2`, `1`, `0.5`, `0.25`. Click **Done**.
3. Select E2:E30 (Confidence). Add a dropdown with `100%`, `80%`, `50%`.
4. Format E2:E30 as percent: **Format → Number → Percent**.

Dropdowns stop people typing random values like “high” or “7”.

### 3. Write the RICE formula
1. In G2, type: `=IF(OR(C2="",D2="",E2="",F2=""),"",ROUND(C2*D2*E2/F2,0))`
2. This calculates (Reach × Impact × Confidence) ÷ Effort, but stays blank until all four inputs are filled.
3. Click G2, then drag the small blue square at the bottom-right corner down to G30 to copy the formula.

### 4. Add an automatic rank
1. In I2, type: `=IF(G2="","",RANK(G2,$G$2:$G$30,0))`
2. Drag down to I30. The `$` signs keep the range fixed while copying.

### 5. Highlight the top ideas
1. Select A2:J30. Go to **Format → Conditional formatting**.
2. Choose **Custom formula is** and enter: `=AND($I2<>"",$I2<=3)`
3. Pick a light green fill. Now the top 3 ideas light up automatically.

### 6. Fill it in
1. Add your 10–15 P1 ideas in column A, each linked to an opportunity from your OST in column B.
2. Fill Reach using research or estimates; note the source in column H (“Evidence”): “5 of 6 interviews; ~3,000 groups/qtr estimate”.
3. Ask a technical friend for Effort.
4. In column J (Bucket), type Now / Next / Later after you review the ranking.

### 7. Sort without breaking formulas
1. Select A1:J30 → **Data → Create a filter**.
2. Click the filter icon on **RICE score** → **Sort Z → A**.

### 8. Share
1. Click **Share** → **General access** → “Anyone with the link” → **Viewer**.
2. Paste the link into your strategy doc and the Week 3 deliverable field.

## Tips

- **Never type a calculated number.** If it can be a formula, make it one.
- **Keep an “Evidence” column.** It makes your checkpoint defence easy.
- **Add a “Notes on overrides” column** when you sequence differently from the score.
- **Use the built-in RICE Calculator** in PM Path’s Toolkit for quick what-if scoring, then keep the official version in Sheets.
- **Learn three shortcuts:** Ctrl/Cmd + D (fill down), Ctrl/Cmd + Shift + V (paste values only), and F4 (toggle `$` in a reference while editing a formula).
