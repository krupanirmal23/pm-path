---
id: w4-notion
title: "Notion: write the PRD"
week: 4
estimatedMinutes: 8
tags: [tool, notion, prd]
---

## What it is

**Notion**, your workspace from earlier weeks. This week it becomes the home for your **PRD** and **launch plan**.

## Why PMs use it

Many startups write PRDs in Notion because it mixes text, tables, toggles, embeds and comments. Reviewers can comment inline, and the page can be shared or published for your portfolio.

## Account setup (free plan)

Use your existing workspace. Under **Projects → P1**, you’ll add two pages: “P1 PRD – [feature]” and “P1 Launch plan”.

## Walkthrough: build the PRD page

### 1. Create the page with properties
1. In **P1**, type `/page` → name it “PRD – Auto monthly settle-up”.
2. At the top, add a small table of document info using `/table` (simple) with rows: **Owner**, **Status** (Draft / In review / Approved), **Last updated**, **Reviewers**, **Links** (Jira epic, Miro, designs).

### 2. Add the sections
Type `/h2` for each heading:
1. TL;DR (add a `/callout` here with 3–4 sentences)
2. Problem
3. Goals and success metrics
4. Non-goals
5. Users and use cases
6. Requirements
7. User experience
8. Edge cases
9. Tracking
10. Dependencies
11. Risks and mitigations
12. Rollout
13. Open questions
14. Appendix

Shortcut: use the **PRD template** in PM Path’s Templates page, copy it, and paste it into Notion. Markdown headings convert automatically.

### 3. Requirements as a table
1. Under **Requirements**, type `/table` → **Table view** (database) if you want filtering, or a simple table.
2. Columns: **ID** (R1…), **Requirement / story**, **Priority** (Must/Should/Could), **Acceptance criteria**, **Jira link**.
3. Keep each AC short; link to the Jira story for the full list.

### 4. Edge cases with toggles
1. Use `/toggle` for each edge case: the title is the situation (“Payment pending for 10+ minutes”), the content is the expected behaviour.
2. This keeps the doc skimmable while detailed.

### 5. Open questions as a checklist
1. Use `/todo` items: “❓ Payee: one person or each creditor? — Owner: PM — Due: Thu”.
2. Tick them off and write the decision next to them as they’re resolved.

### 6. Developer review (your checkpoint)
1. Share the page: **Share → Invite** (by email) with comment access, or **Copy link** if published.
2. Ask the reviewer to leave **comments** (select text → **Comment**). Each comment = one question.
3. Count the questions (target: fewer than 5).
4. Answer each by updating the PRD itself, then resolve the comment.
5. Note the count and date in the Week 4 checkpoint notes in PM Path.

### 7. The launch plan page
1. Create “P1 Launch plan” with the 10-point structure from the lesson.
2. Keep it to one page. Link it from the PRD’s **Rollout** section.

## Tips

- **Write the TL;DR last and put it first.**
- **Use `@` mentions** for owners and **dates** (`@today`, `@next Thursday`) for due dates.
- **Track changes**: add a small “Change log” at the bottom with date and what changed.
- **Use synced blocks** (`/synced block`) if you want the same goals section in both the PRD and the strategy doc.
- **Publish carefully**: remove anything private (names of interviewees) before making it public.
