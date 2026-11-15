---
id: w9-notion
title: "Notion: build your tested prompt library"
week: 9
estimatedMinutes: 8
tags: [tool, notion, prompts]
---

## What it is

**Notion**, your workspace from earlier weeks. This week you’ll use a **Notion database** as a **prompt library**: a structured collection of prompts with versions, test results and notes.

## Why PMs use it

AI teams treat prompts like product assets: they’re versioned, tested and reused. A well-organised prompt library shows interviewers that you work systematically with AI, and it’s part of your P4 deliverable (10+ tested prompts).

## Account setup (free plan)

Use your existing Notion workspace. Create the library under **Projects → P4**.

## Walkthrough: create the prompt library

### 1. Create the database
1. In your P4 page, type `/database` → **Database – Full page**. Name it “P4 Prompt Library”.
2. Add these properties (click **+** on the table header):
   - **Name** (title): short descriptive name, e.g., “Ticket parser”.
   - **Version** (Text): v1, v2…
   - **Use case** (Select): parser, classifier, explainer, reply drafter, summariser, guardrail.
   - **Model** (Text): model name and tier tested.
   - **Temperature** (Number).
   - **Status** (Select): draft, testing, approved, retired.
   - **Pass rate** (Number, format as percent): share of test inputs that passed.
   - **Tested on** (Date).
   - **Owner** (Person).

### 2. Build a page template for each prompt
1. Click the arrow next to **New** → **+ New template**. Name it “Prompt entry”.
2. Inside the template, add headings:
   - **Purpose** (one sentence)
   - **System prompt** (a code block: type `/code`)
   - **User prompt template** (code block with `{variables}`)
   - **Output format / schema** (code block)
   - **Test set** (a simple table: input · expected · result · pass/fail)
   - **Failures and fixes** (bullets)
   - **Change log** (date · what changed · effect on pass rate)
3. Save the template.

### 3. Add your 10+ prompts
1. Create one entry per prompt using the template.
2. Paste the final prompts from your AI Studio and comparison work.
3. Fill the test table with at least 5 inputs per prompt (normal, messy, edge, adversarial).
4. Calculate the **pass rate** and enter it.

### 4. Add useful views
1. Click **+ Add view** → **Board** grouped by **Status** to see what’s approved.
2. Add a **Table** view filtered by **Use case**.
3. Sort the main view by **Pass rate** (descending).

### 5. Link it to your spec
1. In your P4 AI feature spec page, type `@` and link to the library.
2. In the spec’s “Prompts” section, list which prompt versions the feature uses.

## Tips

- **Never overwrite** an approved prompt; duplicate it as a new version.
- **Record the model and date** for every test; behaviour changes when models update.
- **Keep test inputs reusable**: the same inputs become your eval set in Week 10.
- **Remove personal data** from test inputs before saving.
- **Publish a cleaned-up version** in your portfolio to show systematic AI work.
