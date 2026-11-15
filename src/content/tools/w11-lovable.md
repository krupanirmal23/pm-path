---
id: w11-lovable
title: "Lovable or Bolt: build the user-facing app"
week: 11
estimatedMinutes: 11
tags: [tool, lovable, bolt, prototyping]
---

## What it is

**Lovable** (lovable.dev) and **Bolt** (bolt.new) are AI app builders: you describe an app in plain English, and they generate a working web app (front end, and often a connected back end) that you can edit by chatting, preview live and deploy. Both have free tiers with daily or monthly message limits.

## Why PMs use it

They let a PM turn a spec into a real, usable product in days without a full engineering team, which is exactly what P4 needs: a live app with 20+ real users. You’ll also learn how far “vibe coding” goes, and where you need an engineer (security, scale, complex logic).

## Account setup (free plan)

1. Go to lovable.dev or bolt.new → sign up with Google or GitHub.
2. Note the free limits (number of AI messages/credits per day or month). Plan your prompts so you don’t waste credits on tiny edits.
3. Connect **GitHub** (recommended) so your code is saved to a repository you own.

## Walkthrough: build the P4 app

### 1. Write a build brief before prompting
Paste a structured brief as your first message (it saves many credits):
```
Build a mobile-first web app called "FlatSplit AI".
Users: flatmates in Indian cities sharing expenses.
Core flow:
1. Sign in with email magic link (Supabase auth).
2. Create or join a flat group via invite link.
3. Type an expense in plain language (e.g., "paid 1260 for groceries, cheese 340 was mine").
4. Call our backend function /parse-expense which returns JSON (expenses array). Show it as an editable draft card; nothing saves until the user taps "Add".
5. Group balance screen: who owes whom, with a "Settle via UPI" button (UPI deep link with amount and payee VPA).
6. 👍/👎 on each AI draft, stored with the draft id.
Design: clean, large tap targets, Indian rupee formatting (₹1,26,000), light pastel colours.
Pages: Sign in, Groups, Group detail (expenses + balances), Add expense, Settings (delete my data).
Don't build: payments processing, chat, notifications.
```

### 2. Review the generated app
1. Use the live preview. Click through every page on a phone-sized view.
2. Write down issues before asking for fixes; batch them in one message (“Fix these 5 things: …”).

### 3. Connect the backend
1. Lovable has a native **Supabase** integration (see the Supabase guide); Bolt can also use Supabase or its own hosting options. Follow the prompts to connect your Supabase project.
2. Ask the builder to create tables (groups, members, expenses, ai_drafts, feedback) with **row-level security** so users only see their own groups (see Supabase guide).
3. For the AI call, ask it to create a **server-side function** (e.g., a Supabase Edge Function) that calls the Gemini API with your system prompt and schema. **The API key must live in server-side secrets, never in the front-end code.**

### 4. Add analytics and feedback
1. Ask it to add PostHog (PostHog guide) for events like `expense_draft_shown`, `expense_draft_accepted`, `expense_draft_edited`, `feedback_given`.
2. Add a “Give feedback” link to your Tally form (Tally guide).

### 5. Test like a PM
1. Run your golden-set inputs through the real app; check drafts, edits and saves.
2. Test edge cases: no internet, unknown names, very large amounts, Hindi input.
3. Test permissions: create two accounts; make sure one can’t see the other’s group.

### 6. Deploy
1. Lovable/Bolt offer one-click publishing to a URL. Or export to GitHub and deploy on **Vercel** (Vercel guide) for a custom domain.
2. Share the link with 3 friends first, fix issues, then recruit your 20+ users.

## Tips

- **Write specs, not wishes**: precise briefs save credits and produce better apps.
- **One change per prompt** when debugging; batch small cosmetic fixes.
- **Secrets stay server-side.** Search the generated code for your API key before publishing.
- **Ask an engineer friend** to review authentication and database rules before real users join.
- **Keep the brief and prompts** in your P4 case study; they show how you specified the product.
