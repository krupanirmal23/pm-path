---
id: w12-notion-portfolio
title: "Notion: publish your portfolio site"
week: 12
estimatedMinutes: 10
tags: [tool, notion, portfolio]
---

## What it is

**Notion** lets you publish any page as a public website. With a clean structure, it makes a fast, free PM portfolio: a home page linking to your four case studies. (Optional free alternatives: Notion + a custom domain through third-party tools, or a simple site on Vercel.)

## Why PMs use it

Hiring managers want to see how you think, not just read your resume. A portfolio with well-structured case studies is the strongest evidence a career switcher can offer, and it gives every referral message and LinkedIn post something concrete to link to.

## Account setup (free plan)

Use your existing Notion workspace. Public publishing is free. Your page URL will look like `yourname.notion.site/...` once you set a workspace domain (Settings → Public settings/Domains).

## Walkthrough: build and publish the portfolio

### 1. Create the home page
1. Create a new top-level page: “Krupa – Product Portfolio”.
2. Add a cover image (simple, not busy) and an icon.
3. Top section (callout block): one-line intro + links. Example: “Technical Marketing Engineer moving into product. I’ve shipped an AI product to 40+ users and completed four end-to-end case studies. Resume · LinkedIn · Email”.

### 2. Add the case study gallery
1. Type `/gallery` to create a **Gallery database** called “Case studies”.
2. Add four entries: P4 (AI product), P1 (end-to-end), P2 (analytics), P3 (technical teardown). Put P4 first for AI PM roles, P1 first for general PM roles.
3. Properties: **Type** (select), **One-line result** (text, e.g., “Eval pass rate 66% → 90%”), **Skills** (multi-select), **Read time**.
4. Card preview: **Page cover**; give each case study a clean cover (a key screen or diagram).

### 3. Structure each case study page
Use the **Portfolio case study template** in PM Path (Templates page). Sections:
1. **TL;DR** (callout): problem, what you did, result in 3 lines.
2. **Context and problem** (with evidence).
3. **Process and key decisions** (options considered, why you chose).
4. **Artefacts** (embedded images, links to PRD, Figma, dashboards, GitHub).
5. **Results** (numbers, honest limits).
6. **What I learned / what I’d do next.**
Aim for 5–7 minutes of reading. Use toggles for detail.

### 4. Embed artefacts
- Images: drag in screenshots and diagrams; add captions.
- `/embed` for Figma prototypes, Miro boards (view access), Google Sheets.
- Links to the live P4 app and GitHub repos.

### 5. Add an About block
A short section with your story (from the career story lesson), skills grouped, and contact links.

### 6. Publish
1. **Share → Publish → Publish to web**. Turn **off** editing, comments and template duplication.
2. Decide on **search engine indexing** (on if you want it discoverable).
3. Open the public link in an incognito window and on your phone. Check every link and embed.
4. Put the link in your resume header, LinkedIn Featured and email signature.

## Tips

- **Lead with results**: recruiters skim the TL;DR and the one-line results.
- **Show messy middle**: one sketch, one affinity map, one eval chart shows real process.
- **Remove private data**: interviewees’ names, employer confidential information, API keys.
- **Keep it fast**: compress large images; avoid too many embeds on the home page.
- **Ask a PM reviewer** to skim it for 2 minutes and tell you what they remember. Fix what they missed.
