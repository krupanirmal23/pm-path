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
Callouts: `> [!TIP]`, `> [!WARNING]`, `> [!EXAMPLE]`, `> [!INTERVIEW]`, `> [!NOTE]`.

| Week | Lessons | Tool guides |
|---|---|---|
| 1 | in progress | |

## Next steps (in order)
5. Toolkit tools (SQL Playground + dataset + 40 problems first)
6. Templates, Frameworks (40+), Interview Prep (200+ Qs), Job Search, Portfolio, Glossary (200+), Weekly Review, Skip This
7. Global search (MiniSearch), PWA icons/offline check, performance pass, README
