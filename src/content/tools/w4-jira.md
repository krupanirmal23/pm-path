---
id: w4-jira
title: "Jira: epic, stories and 2 sprints"
week: 4
estimatedMinutes: 10
tags: [tool, jira, agile]
---

## What it is

**Jira** (by Atlassian) is the most widely used tool for planning and tracking software work. Teams use it to manage backlogs, sprints, bugs and releases.

## Why PMs use it

Most product companies in Bengaluru use Jira (or something similar). PMs create epics and stories, order the backlog, plan sprints with the team, and track progress. Being comfortable in Jira on day one signals you’ve worked like a real PM.

## Account setup (free plan)

1. Go to atlassian.com → **Jira** → **Get it free**.
2. Sign up with your Google account.
3. Name your site (e.g., `krupa-pm`). Your URL will be `krupa-pm.atlassian.net`.
4. When asked to choose a template, pick **Scrum** (under Software development).
5. Name the project “P1 – [your topic]” with a short key like `P1`.
6. The free plan supports up to 10 users, which is plenty.

## Walkthrough: build your P1 backlog and 2 sprints

### 1. Create the epic
1. In the left sidebar, open **Backlog**.
2. Find the **Epic** panel (in many layouts it’s a toggle at the top of the backlog, or click **Timeline** in the sidebar).
3. Click **+ Create epic**. Name it “Auto monthly settle-up” (or your P1 feature).
4. Open the epic and paste the PRD TL;DR and a link to the full PRD in the description.

### 2. Create 12–15 stories
1. In the backlog, click **+ Create issue** at the bottom. Make sure the type is **Story**.
2. Title: the short version (“Settle balance via UPI”).
3. Open the story. In **Description**, paste:
   - The full story: “As a… I want… so that…”
   - **Acceptance criteria** as a checklist of Given/When/Then lines.
4. Set the **Parent** (or Epic link) field to your epic.
5. Add **Story points** (if the field isn’t visible, open the story → **Configure** fields, or use the “Estimate” field in the backlog).
6. Add a **Priority** (Highest → Lowest) and **Labels** (e.g., `must`, `should`).
7. Repeat for all stories. Tip: create the first one fully, then use **⋯ → Clone** to speed up.

### 3. Order the backlog
1. Drag stories up and down so the most important are at the top.
2. Put dependent stories after their prerequisites.

### 4. Create Sprint 1
1. At the top of the backlog, click **Create sprint**.
2. Drag the top stories into the sprint until the total points reach ~80% of your assumed velocity (shown at the sprint header).
3. Click **Start sprint**. Set:
   - **Duration:** 2 weeks.
   - **Sprint goal:** one sentence (“Users can receive the monthly summary and see what they owe”).
4. Click **Start**.

### 5. Create Sprint 2
1. Click **Create sprint** again to add Sprint 2 below.
2. Drag the next set of stories into it, with its own goal in the sprint’s edit menu (**⋯ → Edit sprint**).
3. Don’t start it; it stays planned.

### 6. Use the board
1. Open **Board** in the sidebar. You’ll see columns: To Do, In Progress, Done.
2. Move a story to “In Progress” and then “Done” to see how progress updates.
3. Optional: **⋯ → Configure board** → add a column “In Review” and set a WIP limit (max issues) on “In Progress”.

### 7. Show your work
1. Open **Reports** (or **Insights**) to see the sprint burndown (how remaining work drops over the sprint).
2. Take screenshots of: the backlog with the epic, one story with acceptance criteria, and both sprints with goals.
3. Add them to your P1 page in Notion and paste the Jira project link into the deliverable field (note: private Jira sites need a login, so screenshots are essential for reviewers).

## Tips

- **One story = one user-visible slice.** Put technical steps as **Sub-tasks** inside a story.
- **Use the description template** consistently: story, AC, links (PRD, designs).
- **Keyboard:** press **C** to create an issue, **/** to search.
- **JQL** (Jira Query Language) is useful later: `project = P1 AND sprint in openSprints() AND status != Done`.
- **Don’t over-configure.** Default Scrum settings are fine for learning.
