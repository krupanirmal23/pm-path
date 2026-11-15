---
id: w3-review-mining
title: "Play Store / G2 reviews: complaint mining"
week: 3
estimatedMinutes: 9
tags: [tool, research, reviews]
---

## What it is

**Review mining** means systematically reading and tagging public reviews of your product or competitors to find patterns. For consumer apps, use the **Google Play Store** and **Apple App Store**. For B2B software, use **G2** (g2.com) or **Capterra**.

## Why PMs use it

Reviews are free, recent, written in users’ own words and available for every competitor. Mining 50–100 reviews gives you evidence for competitive analysis, problems for teardowns, and quotes for strategy docs, in an afternoon.

## Account setup (free plan)

- **Play Store:** open play.google.com in a browser. No account needed to read reviews; signing in lets you see more.
- **App Store:** use the App Store app on an iPhone, or search “[app name] app store” in a browser.
- **G2:** go to g2.com, search the product. Free to read; a free account may unlock more reviews.
- **Google Sheets** for tagging (you set it up earlier).

## Walkthrough: mine 50+ competitor reviews

### 1. Set up your tracking sheet
1. Create a Google Sheet “P1 Review mining”.
2. Columns: `Competitor | Source | Date | Stars | Review text (short) | Theme 1 | Theme 2 | Sentiment | Quote-worthy?`
3. Freeze row 1 (**View → Freeze → 1 row**).

### 2. Collect reviews
1. On the Play Store page, click **See all reviews**.
2. Use the sort/filter options: sort by **Newest** (or Most relevant), and filter by **star rating**.
3. For each competitor, collect roughly:
   - 15 reviews with 1–2 stars (problems)
   - 5 reviews with 5 stars (what people love)
4. Copy the key sentence of each review into your sheet (not the whole thing), with date and stars.
5. Skip reviews that are only “bad app” or about unrelated issues (spam, delivery driver rudeness unrelated to the product, etc.).

### 3. Tag themes (bottom-up, like affinity mapping)
1. Read the first 15 reviews and write a short theme for each: “manual entry effort”, “sync bugs”, “ads”, “pricing/paywall”, “settle-up confusion”.
2. Reuse existing themes when possible; create new ones only when needed.
3. After ~30 reviews, clean up: merge similar themes, aim for 6–10 total.
4. Add a dropdown for themes (**Data → Data validation**) to keep tagging consistent.

### 4. Count
1. Select your data → **Insert → Pivot table** → New sheet.
2. Rows: **Competitor**. Columns: **Theme 1**. Values: **Theme 1 → COUNTA**.
3. You now have a table showing how often each complaint appears per competitor.

### 5. Turn counts into evidence
1. Write 3–5 evidence statements: “14 of 50 Splitwise reviews (28%) complain about manual entry effort.”
2. Pick 2 quotes per major theme (mark “Quote-worthy?” = Yes).
3. Use them in your competitive matrix, positioning map annotations and strategy doc.

### 6. Optional: AI-assisted tagging, carefully
1. You can paste anonymous review text (no names) into an AI assistant and ask it to suggest themes.
2. Always check its tags against the actual text for a sample of 10. Never rely on AI counts without checking.

## Tips

- **Recency matters.** Prefer reviews from the last 6 months; apps change.
- **Read developer replies** too; they reveal what the company considers a known issue.
- **Watch for review bombing** (sudden waves of 1-star reviews about one event) and note it separately.
- **Look for “switching” language**: “moved from X to Y because…” is gold for positioning.
- **Quote exactly** and anonymise (don’t include reviewer names in public docs).
