---
id: w11-vercel
title: "Vercel free: host the app"
week: 11
estimatedMinutes: 8
tags: [tool, vercel, hosting, deployment]
---

## What it is

**Vercel** is a hosting platform for web apps and static sites. Connect a GitHub repository and Vercel builds and deploys it automatically on every push, giving you a live URL, HTTPS and **preview deployments** for each change. The free **Hobby** plan is for personal, non-commercial projects (check current terms).

## Why PMs use it

It gets your P4 app (and your portfolio, and even PM Path itself) onto a fast public URL with almost no setup. Preview deployments also mirror how real teams review changes before release.

## Account setup (free plan)

1. Go to vercel.com → **Sign up** with GitHub.
2. Choose the **Hobby** plan.
3. Authorise Vercel to access the repository that contains your P4 app (exported from Lovable/Bolt to GitHub).

## Walkthrough: deploy P4

### 1. Import the project
1. In the Vercel dashboard: **Add New → Project** → select your P4 repository → **Import**.
2. Vercel usually detects the framework (e.g., Vite, Next.js). Keep the defaults unless your README says otherwise.

### 2. Add environment variables
1. In the import screen (or **Project → Settings → Environment Variables**), add the **public** values your front end needs, e.g., `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_POSTHOG_KEY`.
2. **Do not** add secret keys (Gemini key, Supabase service role key) as front-end variables. Front-end variables (often prefixed `VITE_` or `NEXT_PUBLIC_`) are visible to anyone in the browser. Secrets belong in server functions (Supabase secrets).

### 3. Deploy
1. Click **Deploy**. Watch the build log; fix any errors it shows (missing variables are the usual cause).
2. Open the production URL (e.g., `p4-yourname.vercel.app`) on your phone. Test sign-in and the core flow.

### 4. Configure auth redirects
1. In Supabase **Authentication → URL configuration**, add your Vercel production URL and preview URL pattern to allowed redirects, or magic links will fail.

### 5. Use preview deployments
1. Make a change on a new branch and push (or edit via GitHub).
2. Vercel creates a **preview URL** for that branch. Test there before merging to `main` (which updates production).

### 6. Optional: custom domain and analytics
1. **Settings → Domains** to add a domain you own.
2. Vercel offers simple web analytics; you’ll use PostHog for product analytics anyway.

## Tips

- **Read build logs top to bottom**; the first error is usually the real one.
- **Single-page apps** (like Vite React apps) may need a rewrite rule so deep links work; Vercel’s docs show a `vercel.json` with a rewrite to `index.html`.
- **Keep production stable**: test on preview URLs first.
- **Check the Hobby terms** if your P4 starts charging money; you may need a different plan.
- **PM Path itself** can be deployed the same way (see this site’s README).
