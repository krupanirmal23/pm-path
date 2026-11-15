---
id: w7-github
title: "GitHub: repo, issues, PRs and a README"
week: 7
estimatedMinutes: 10
tags: [tool, github, collaboration]
---

## What it is

**GitHub** is where most software teams store code and collaborate on it. It’s built on **Git**, a version control system that tracks every change. On GitHub you’ll find **repositories** (projects), **issues** (tasks and bugs), **pull requests** (proposed changes, reviewed before merging) and **README** files (project front pages).

## Why PMs use it

Many engineering teams track work in GitHub issues and review changes in pull requests. PMs read PRs to understand what changed, comment on issues, and link specs. A clean GitHub repo is also a great home for your P3 technical teardown: diagram, Postman collection and trade-offs note in one public place.

## Account setup (free plan)

1. Go to github.com → **Sign up**. Choose a professional username (it appears on your portfolio links).
2. Verify your email. The free plan includes unlimited public and private repositories.
3. Optional: add a profile photo and a one-line bio (“Aspiring PM | ex-Technical Marketing Engineer”).

## Walkthrough: your P3 repository

### 1. Create the repository
1. Click **+** (top right) → **New repository**.
2. Name: `p3-upi-payment-teardown` (or `p3-live-order-tracking`).
3. Description: “Technical teardown of UPI payments: architecture, APIs and trade-offs.”
4. Visibility: **Public**. Tick **Add a README file**. Click **Create repository**.

### 2. Write the README (in the browser)
1. Click the pencil icon on `README.md`.
2. Use Markdown (the same format PM Path uses for notes). Suggested structure:
```markdown
# UPI payment: technical teardown

**TL;DR:** What happens between tapping "Pay" and "Payment successful", the main components, where it can fail, and three trade-offs the teams likely made.

## Architecture
![Architecture diagram](architecture.png)

## Step by step
1. ...

## APIs explored
- Postman collection: `postman/p3-collection.json`

## Trade-offs
1. ...

## What I learned
...
```
3. Click **Commit changes** (a **commit** is a saved snapshot of changes with a message, e.g., “Add README structure”).

### 3. Upload files
1. Click **Add file → Upload files**.
2. Drag in your Excalidraw diagram (PNG), your Postman collection JSON, and your trade-offs note (Markdown or PDF).
3. Write a commit message (“Add diagram and Postman collection”) and commit.

### 4. Create issues for your own work
1. Go to the **Issues** tab → **New issue**.
2. Create 3 issues, e.g., “Add failure scenarios to diagram”, “Write trade-off #3”, “Add latency estimates”.
3. Add **labels** (e.g., `docs`, `diagram`) from the right sidebar.
4. Close each issue when done (comment “Done in commit …”).

### 5. Make a pull request (practise the workflow)
1. Open `README.md` → pencil icon → make a change (e.g., add a “Glossary” section).
2. At the bottom, choose **Create a new branch for this commit and start a pull request**. Name the branch `add-glossary`.
3. Click **Propose changes** → **Create pull request**.
4. Look at the **Files changed** tab: green lines are additions, red are deletions. This is what engineers review.
5. Add a comment on a line (hover → **+**), then **Merge pull request** → **Confirm merge** → **Delete branch**.

### 6. Pin it to your profile
1. Go to your profile → **Customize your pins** → select the repo.
2. Add the repo link to your Week 7 deliverable field and later your portfolio.

## Tips

- **Write good commit messages**: short and specific (“Add payment failure states”), not “update”.
- **Use relative links** in the README to files in the repo.
- **Never upload secrets** (API keys, tokens). If you do by mistake, revoke the key immediately; deleting the file isn’t enough because history keeps it.
- **Read real PRs** in open-source projects to see how engineers discuss changes.
- **Keep the README skimmable**: a TL;DR, a diagram, and headings.
