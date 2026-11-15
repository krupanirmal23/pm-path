# PM Path

A self-contained learning and tracking site for becoming an APM / PM / AI PM in 14 weeks. Built for Krupa (Bengaluru, 9 hours a day Monday–Saturday, 1-hour review on Sundays), but anyone can use it.

Everything lives inside the site: lessons, tool guides, templates, frameworks, interview questions and hands-on tools. External links are only optional “Go deeper” extras. There is no backend and no login. Progress is saved in your browser, and the whole site works offline once it has loaded.

## What’s inside

| Area | What you get |
|---|---|
| Roadmap | 14 weeks in 4 phases (+ Week 15+ job-search mode), each with topics, a deliverable and a checkpoint, mapped to real calendar dates from your start date |
| Lessons | 101 original lessons with worked Indian examples, diagrams, practice exercises with answers and quizzes |
| Tool guides | 42 step-by-step guides (Figma, Notion, PostHog, BigQuery, Postman, Google AI Studio and more), all on free tiers |
| Today | Your day as time blocks with timers, a checklist and a 3-question reflection |
| Toolkit | SQL Playground (real SQLite in the browser, 7,203-row food-delivery dataset, 40 graded problems), RICE calculator, Metrics Tree Builder, Funnel & Retention Explorer, A/B test calculator, Estimation Scratchpad, AI Cost Calculator, Eval Labeler, Prompt Lab, Mock Interview Timer |
| Templates | 21 fill-in templates (PRD, teardown, discovery report, AI feature spec, eval sheet, resume, referral message, STAR story and more), each with a filled example |
| Frameworks | 51 frameworks: what, when, when not, steps, an Indian worked example and common mistakes |
| Interview prep | 207 questions across 9 categories with answer outlines, what interviewers look for and pitfalls; mock mode with a 45-minute phased timer and rubric; mock log; 10-slot STAR story bank |
| Job search | Kanban board, daily outreach counter (target 5), callback rates with and without referrals, Bengaluru APM guide |
| Portfolio | The four projects with milestones, a case-study checklist and links |
| Glossary | 277 plain-English terms |
| Weekly review | Guided questions, automatic stats and history |
| Skip this | What not to spend time or money on, and what to do instead |

Search everything with **Ctrl/Cmd + K** or **/**.

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
```

```bash
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

Other commands:

```bash
npm test
```

```bash
npm run build
```

```bash
npm run preview
```

`npm test` validates all content (lesson structure, quiz explanations, templates, frameworks, questions, glossary) and checks that every SQL problem’s model solution runs against the dataset. `npm run build` type-checks and produces a static site in `dist/`.

## Deploy for free

The build output in `dist/` is a plain static site. Any static host works. Because it is a single-page app, the host must serve `index.html` for unknown paths; the config for that is already included.

### Netlify
1. Push this folder to a GitHub repository.
2. In Netlify, choose **Add new site → Import an existing project** and pick the repo.
3. Build command: `npm run build`. Publish directory: `dist`.
4. `public/_redirects` handles page refreshes on deep links.

### Vercel
1. Import the repository in Vercel.
2. Framework preset: **Vite** (build `npm run build`, output `dist`).
3. `vercel.json` handles the rewrites.

### Cloudflare Pages
Build command `npm run build`, output directory `dist`. `public/_redirects` works here too.

### GitHub Pages
1. Push to a repository with a `main` branch.
2. In the repo, go to **Settings → Pages → Source** and choose **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy-pages.yml`) runs the tests, builds with the right sub-path (`/<repo-name>/`) and publishes. It also copies `index.html` to `404.html` so deep links work.

To build for any other sub-path yourself:

```bash
BASE_PATH=/my-sub-path/ npm run build
```

## Your data and backups

- All progress (lesson completion, quiz scores, notes, timers, reflections, applications, mocks, stories, portfolio, reviews, tool work) is stored in your browser’s `localStorage` under the key `pm-path-state`.
- Nothing is sent to a server. The only optional network call is in **Prompt Lab** if you add your own Gemini API key in Settings; that key is stored only in your browser and requests go straight from your browser to Google.
- **Back up regularly:** Settings → **Export JSON** downloads a JSON file. Keep it in Google Drive or email it to yourself.
- **Restore or move to another device:** Settings → **Import JSON** and choose the JSON file.
- Clearing browser data, using private browsing, or switching browsers or devices starts fresh unless you import a backup.
- **Reset** in Settings wipes everything after a double confirmation. Export first.

## Offline use

After the first visit the service worker caches every page, lesson, guide, font and the SQLite engine. You can then use PM Path without internet, including the SQL Playground. On a phone, use your browser’s **Add to Home screen** to install it like an app. When a new version is deployed, it updates automatically on the next visit.

## Project structure

```
src/
  content/        Markdown: week-XX lessons, tools/ guides, templates/, pages/
  data/           curriculum, frameworks, interview questions, glossary, types
  tools/          interactive Toolkit tools (sql/ has the dataset, problems and engine)
  pages/          one file per route (interview/ holds the prep sub-pages)
  components/     layout, UI kit, quiz, search, modal
  lib/            progress maths, dates, markdown, search, stats, backup
  store/          Zustand store with persistence
  styles/         design tokens and component styles
```

To change the plan, edit `src/data/curriculum.ts`. To edit a lesson, edit its Markdown file; run `npm test` afterwards to check the structure. `PROGRESS.md` documents the content formats.

## Tech

Vite, React, TypeScript, Tailwind CSS v4, React Router, Zustand, Recharts, sql.js, MiniSearch, marked, lucide icons, self-hosted fonts via Fontsource, vite-plugin-pwa and Vitest. No runtime CDNs and no paid services.
