---
id: w11-tally
title: "Tally / Google Forms: collect user feedback"
week: 11
estimatedMinutes: 8
tags: [tool, tally, feedback, surveys]
---

## What it is

**Tally** (tally.so) is a form builder with a generous free plan: unlimited forms and responses, logic, hidden fields and a document-like editor. **Google Forms** (Week 2) also works. Both let you collect structured feedback from P4 users.

## Why PMs use it

Analytics shows what users do; feedback shows why. A short, well-placed feedback form gives you quotes for your case study, ideas for your data-driven change, and evidence of value (“14 of 20 users said it saved them time”).

## Account setup (free plan)

1. Go to tally.so → **Sign up** (Google sign-in).
2. The free plan covers what you need. (Or use forms.google.com.)

## Walkthrough: a 2-minute P4 feedback form

### 1. Create the form
1. Click **Create form** → start blank. Title: “Help improve FlatSplit AI (2 minutes)”.
2. Type `/` to add blocks (Tally works like Notion).

### 2. Questions (keep it to 6–7)
1. **How often have you used the app?** (Multiple choice: once / 2–5 times / 6+ times)
2. **How easy was adding an expense by typing it?** (Linear scale 1–5)
3. **How often were the AI drafts correct without editing?** (Almost always / Usually / Sometimes / Rarely)
4. **What’s one thing that frustrated you?** (Long text)
5. **How would you feel if you could no longer use the app?** (Very disappointed / Somewhat disappointed / Not disappointed). This “disappointment” question is a quick signal of product–market fit.
6. **Did the AI ever get something wrong in a way that worried you?** (Yes/No + optional details)
7. **Can we contact you for a 15-minute chat?** (Yes/No + contact field, optional)

### 3. Hidden fields (link answers to usage)
1. Add a **Hidden field** block named `uid`.
2. In your app, link to the form as `https://tally.so/r/FORMID?uid=USER_ID` (use the internal ID, not personal data). Now each response connects to PostHog usage data.

### 4. Logic
1. Add **conditional logic**: if Q6 = Yes, show “What happened?” as required.
2. If Q7 = No, hide the contact field.

### 5. Place it well
1. Show the link after a user’s 3rd accepted draft (“You’ve added 3 expenses: tell us how it’s going?”), not on first use.
2. Also add a permanent “Give feedback” link in Settings.

### 6. Analyse
1. Tally shows results per question; export to Google Sheets for deeper analysis.
2. Tag open-text answers by theme (like Week 2 affinity mapping).
3. Pick the top theme as a candidate for your data-driven change, and confirm it in PostHog data.
4. Pull 3–5 quotes for your P4 case study (with permission, anonymised).

## Tips

- **Short beats complete**: 2 minutes maximum.
- **Ask about behaviour and experience**, not hypothetical future use.
- **Time it right**: after users have experienced value.
- **Close the loop**: tell users what you changed because of their feedback; it boosts response rates next time.
- **Don’t collect personal data you don’t need**; contact details only if they opt in.
