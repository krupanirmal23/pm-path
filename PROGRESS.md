# PM Path: build progress

Where the build stands, and exactly where to resume.

## Done
- [x] Step 1: scaffold, design tokens, `/styleguide`, layout (sidebar + mobile tabs)
- [x] Step 2: data model (`src/data/types.ts`), curriculum (`src/data/curriculum.ts`), Zustand store with localStorage persistence, JSON export/import, Settings
- [x] Step 3: Dashboard, Roadmap, Week page, Lesson page (reading bar, TOC, quiz, notes), Today (timers, checklist, reflection)

## Content (Step 4)
Lessons live in `src/content/week-XX/<topic-id>.md`. Tool guides live in `src/content/tools/w<N>-<tool-id>.md`.
Topic ids and tool ids come from `src/data/curriculum.ts`.

Lesson format: frontmatter (`id, title, week, estimatedMinutes, tags`), then sections:
`## Why this matters for a PM` · `## Core concepts` · `## Worked example` · `## Visual` (inline SVG in `<figure class="diagram">`) ·
`## Step by step` · `## Common mistakes` · `## How it shows up in interviews` · `## Practice exercise` (with a ```` ```answer ```` block) ·
`## Quiz` (a ```` ```quiz ```` block: `Q:` lines, `- [x] option :: explanation`) · `## Key takeaways`.
Quiz rule: every option needs a real explanation (>12 chars; never just “Correct.”). Use ````answer (4 backticks) when the answer contains code.
Callouts: `> [!TIP]`, `> [!WARNING]`, `> [!EXAMPLE]`, `> [!INTERVIEW]`, `> [!NOTE]`.

Run `node scripts/coverage.mjs` to see exactly which lessons and guides exist.

| Week | Lessons | Tool guides |
|---|---|---|
| 1–4 (Phase 1) | done | done |
| 5–8 (Phase 2) | done | done |
| 9–11 (Phase 3) | done | done |
| 12–14 (Phase 4) | done | done |

All 101 lessons and 42 tool guides are written and validated (`npm test`).

## SQL Playground dataset (lessons in Week 5 reference this exact schema)
Synthetic Indian food-delivery data, fixed seed, dates 2025-01-01 → 2025-06-30.
- `users(user_id, name, city, signup_date, platform, acquisition_channel, is_premium)`
- `restaurants(restaurant_id, name, city, cuisine, rating, avg_cost_for_two, is_veg_only, onboarded_date)`
- `orders(order_id, user_id, restaurant_id, order_ts, status, payment_method, subtotal, delivery_fee, discount, total, delivery_minutes, coupon_code)`
  - status ∈ delivered / cancelled / refunded; payment_method ∈ upi / card / cod / wallet
- `order_items(order_item_id, order_id, item_name, category, quantity, price)`
- `sessions(session_id, user_id, session_start, platform, duration_seconds)`
- `events(event_id, user_id, session_id, event_name, event_ts)`
  - event_name ∈ app_open / search / view_restaurant / add_to_cart / checkout_start / payment_success / payment_failed
- cities: Bengaluru, Mumbai, Delhi, Hyderabad, Pune, Chennai; platform ∈ android / ios / web
- acquisition_channel ∈ organic / referral / paid_social / search_ads / partner

## Steps 5–7 (done)
- Toolkit: SQL Playground (sql.js, 7,203-row dataset, 40 graded problems), RICE, Metrics Tree, Funnel & Retention Explorer, A/B Test calculator, Estimation Scratchpad, AI Cost Calculator, Eval Labeler, Prompt Lab, Mock Interview Timer (`src/tools/`, registry in `src/tools/registry.ts`)
- Templates: 21 in `src/content/templates/*.md` (frontmatter + guide, then `<!-- template -->` blank, then `<!-- example -->` filled example)
- Frameworks: 51 in `src/data/frameworks/*.ts`
- Interview prep: 207 questions in `src/data/questions/*.ts` (9 categories × 23), mock mode with 45-minute phased timer and rubric, mock log, 10-slot STAR story bank
- Job search Kanban, outreach counter, callback rates, Bengaluru APM guide (`src/content/pages/bengaluru-apm.md`)
- Portfolio, Glossary (277 terms in `src/data/glossary.ts`), Weekly Review, Skip This
- Global search (MiniSearch, `src/lib/search.ts`), PWA icons, offline verified (lessons + SQL engine work with the server stopped)
- Lighthouse (production build, mobile; performance/accessibility/best practices/SEO): home 93/98/100/91 (the SEO miss was a missing robots.txt, since added); lesson 93/100/100/100; SQL tool 92/98/100/100

## Status
The build is complete. All content is validated by `npm test` (lessons, guides, templates, frameworks, questions, glossary, SQL solutions, stats).

## Ideas for later
- Add more SQL problems or a second dataset
- Optional sync via a user-owned file (File System Access API) for multi-device use
