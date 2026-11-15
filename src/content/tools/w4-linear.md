---
id: w4-linear
title: "Linear: recreate the backlog"
week: 4
estimatedMinutes: 8
tags: [tool, linear, agile]
---

## What it is

**Linear** is a fast, keyboard-friendly issue tracker popular with startups. It does many of the same things as Jira (issues, projects, cycles) with a simpler, opinionated design.

## Why PMs use it

Many Indian startups, especially newer and AI-focused ones, use Linear instead of Jira. Recreating your backlog in Linear teaches you that the concepts (epics, stories, sprints) transfer across tools, and lets you mention both on your resume honestly.

## Account setup (free plan)

1. Go to linear.app → **Sign up** with Google.
2. Create a workspace (e.g., “Krupa PM”).
3. Create a team, e.g., “P1”.
4. The free plan supports a limited number of issues and members, which is enough for this exercise. Check the pricing page for current limits.

## Concept mapping: Jira → Linear

| Jira | Linear |
|---|---|
| Epic | **Project** (or a parent issue) |
| Story | **Issue** |
| Sub-task | **Sub-issue** |
| Sprint | **Cycle** |
| Story points | **Estimate** |
| Board columns | **Workflow states** (Backlog, Todo, In Progress, Done…) |

## Walkthrough: recreate your P1 backlog

### 1. Turn on cycles and estimates
1. Go to **Settings → Teams → P1**.
2. Under **Cycles**, enable cycles and set the duration to **2 weeks**.
3. Under **Estimates**, choose a scale (Fibonacci: 1, 2, 3, 5, 8).

### 2. Create the project (your epic)
1. In the sidebar, click **Projects → New project**.
2. Name: “Auto monthly settle-up”. Add the PRD TL;DR and link in the description.
3. Set a target date (optional) and a lead (you).

### 3. Create issues fast
1. Press **C** anywhere to create an issue.
2. Title: short story name. Description: paste the full story and acceptance criteria. Linear supports Markdown, so use `- [ ]` checklists for AC.
3. Set **Project** to “Auto monthly settle-up”, **Estimate**, and **Priority** (Urgent/High/Medium/Low).
4. Tip: after creating one, press **Cmd/Ctrl + D** on an issue to duplicate, or copy-paste multiple lines into the create box (Linear can create several issues at once from pasted lines).

### 4. Plan two cycles
1. Open **Cycles** in the sidebar. You’ll see the current and upcoming cycle.
2. Drag issues from the backlog into **Cycle 1** until you reach ~80% of your assumed velocity. Linear shows total estimates per cycle.
3. Fill **Cycle 2** with the next issues.
4. Add a cycle description with the goal.

### 5. Compare with Jira
1. Open the **Board** view (toggle top right) to see workflow states.
2. Write 3–5 bullets in your Notion notes: what was faster in Linear, what Jira did better (e.g., reporting), and which you’d choose for a 10-person startup vs. a 500-person company.

## Tips

- **Learn the keyboard:** C (create), S (status), P (priority), E (estimate), Cmd/Ctrl + K (command menu).
- **Use views and filters** to show “my issues in this cycle”.
- **Write issue titles as outcomes** (“User sees settled status”) rather than vague nouns (“Status”).
- **Projects have updates**: post a short weekly project update; it’s great practice for stakeholder communication.
- **Don’t pay.** The free plan is enough for learning.
