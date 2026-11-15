import type { Phase, Week, ScheduleBlock, BlockKind } from './types';

export const PHASES: Phase[] = [
  { id: 1, title: 'PM foundations', color: 'lavender', weeks: [1, 2, 3, 4], summary: 'What PMs do, discovery, strategy and execution. Ends with a full PRD for your P1 product.' },
  { id: 2, title: 'Data, tech and UX', color: 'sky', weeks: [5, 6, 7, 8], summary: 'Metrics, SQL, experiments, technical fluency and usability testing. Ends with a published P1 case study.' },
  { id: 3, title: 'AI product management', color: 'mint', weeks: [9, 10, 11], summary: 'LLMs, prompting, RAG, agents, evals, cost and safety. Ends with a live AI product used by 20+ real people.' },
  { id: 4, title: 'Getting hired', color: 'peach', weeks: [12, 13, 14, 15], summary: 'Portfolio, resume, outreach and interview practice until you have an offer.' },
];

export const STANDARD_SCHEDULE: ScheduleBlock[] = [
  { key: 'learn', label: 'Learn', kind: 'learn', start: '09:00', end: '11:30', hours: 2.5 },
  { key: 'tools', label: 'Hands-on with tools', kind: 'tools', start: '11:45', end: '14:00', hours: 2.25 },
  { key: 'lunch', label: 'Lunch', kind: 'lunch', start: '14:00', end: '15:00', hours: 1 },
  { key: 'deliverable', label: 'Portfolio deliverable', kind: 'deliverable', start: '15:00', end: '17:30', hours: 2.5 },
  { key: 'interview', label: 'Interview practice', kind: 'interview', start: '17:45', end: '18:45', hours: 1 },
  { key: 'writeup', label: 'Write-up / LinkedIn / applications', kind: 'writeup', start: '18:45', end: '19:30', hours: 0.75 },
];

export const WEEKLY_RHYTHM: Record<number, string> = {
  1: 'Monday: start the week’s topic and set up the tools.',
  2: 'Tuesday: go deep and build.',
  3: 'Wednesday: go deep and build.',
  4: 'Thursday: go deep and build.',
  5: 'Friday: finish the deliverable and run the checkpoint.',
  6: 'Saturday: publish your work and catch up.',
  0: 'Sunday: one-hour review. Rest the rest of the day.',
};

export const WEEKLY_TARGET_HOURS = 54;

const t = (id: string, title: string) => ({ id, title });

export const WEEKS: Week[] = [
  // ---------------- Phase 1 ----------------
  {
    n: 1,
    phase: 1,
    title: 'What PMs do and how they think',
    goal: 'Understand the PM job well enough to explain it to a stranger, think in problems and outcomes, and pick the real problem you will work on for Project 1.',
    topics: [
      t('w1-pm-role', 'The PM role: PM vs. project manager vs. product owner'),
      t('w1-product-lifecycle', 'The product lifecycle'),
      t('w1-four-risks', 'The four product risks'),
      t('w1-outcomes-outputs', 'Outcomes vs. outputs'),
      t('w1-problem-solution', 'Problem vs. solution thinking'),
      t('w1-startup-bigtech', 'PM at startups vs. big tech'),
      t('w1-teardown', 'How to do a product teardown'),
    ],
    tools: [
      { id: 'notion', name: 'Notion', use: 'Set up your learning hub: notes, teardowns and a weekly log.' },
      { id: 'miro', name: 'Miro', use: 'Map user journeys for your three teardowns.' },
      { id: 'ai-quiz', name: 'Claude / ChatGPT', use: 'Quiz yourself on the week’s concepts.' },
    ],
    deliverable: {
      title: '3 product teardowns + choose the P1 problem',
      description: 'Tear down Swiggy, CRED and Zerodha Kite. For each: who it is for, its core job, one key flow, 3 problems, 1 fix and the metric that fix should move. Then pick the problem you will work on for Project 1.',
      project: 'P1',
      checklist: [
        'Swiggy teardown: user, core job, key flow, 3 problems, 1 fix, metric',
        'CRED teardown: user, core job, key flow, 3 problems, 1 fix, metric',
        'Zerodha Kite teardown: user, core job, key flow, 3 problems, 1 fix, metric',
        'Journey map in Miro for at least one teardown',
        'P1 problem chosen and written in one sentence',
        'Teardowns published (Notion page or LinkedIn post)',
      ],
    },
    checkpoint: {
      summary: 'Explain the four risks in 2 minutes, and why “build a chat feature” is a solution, not a problem.',
      criteria: [
        'Explained value, usability, feasibility and viability risk in under 2 minutes, with an example for each',
        'Explained why “build a chat feature” is a solution and rewrote it as a user problem',
        'P1 problem is stated as a user problem, not a feature',
      ],
    },
  },
  {
    n: 2,
    phase: 1,
    title: 'Discovery and user research',
    goal: 'Learn to talk to users so you hear what they actually do, then turn messy notes into evidence-backed opportunities for P1.',
    topics: [
      t('w2-user-interviews', 'User interview technique: past behaviour, not opinions'),
      t('w2-recruiting', 'Recruiting and screeners'),
      t('w2-jtbd', 'Jobs to Be Done'),
      t('w2-personas-jtbd', 'Personas vs. JTBD'),
      t('w2-affinity-mapping', 'Affinity mapping and synthesis'),
      t('w2-ost', 'Opportunity solution trees'),
      t('w2-problem-statements', 'Problem statements and “How might we”'),
    ],
    tools: [
      { id: 'google-forms', name: 'Google Forms', use: 'Build a screener to recruit the right interviewees.' },
      { id: 'transcripts', name: 'Google Meet captions / Otter.ai', use: 'Record transcripts of interviews, with consent.' },
      { id: 'miro', name: 'Miro', use: 'Affinity map your notes and draw the opportunity tree.' },
    ],
    deliverable: {
      title: 'P1 discovery report',
      description: 'Run 5+ real interviews for your P1 problem. The report has your interview guide, top 3 themes with quotes, JTBD statements, an opportunity solution tree and a problem statement.',
      project: 'P1',
      checklist: [
        'Screener built and shared; 8+ responses',
        'Interview guide written (past-behaviour questions)',
        '5+ interviews done and transcribed (with consent)',
        'Affinity map with clusters in Miro',
        'Top 3 themes, each with 2+ quotes',
        '3+ JTBD statements',
        'Opportunity solution tree',
        'Final problem statement + 3 HMW questions',
      ],
    },
    checkpoint: {
      summary: 'Every insight is backed by at least 2 quotes.',
      criteria: [
        'Each of the top 3 themes has at least 2 quotes from different people',
        'No insight is based only on what a user said they would do in the future',
        'Problem statement names a user, a situation and a struggle (no solution in it)',
      ],
    },
  },
  {
    n: 3,
    phase: 1,
    title: 'Strategy and prioritization',
    goal: 'Decide where P1 should play and in what order to build, and defend those choices with reasoning, not opinion.',
    topics: [
      t('w3-vision-strategy', 'Vision vs. strategy vs. goals'),
      t('w3-okrs', 'OKRs'),
      t('w3-competitive-analysis', 'Competitive analysis and positioning'),
      t('w3-rice', 'RICE prioritization'),
      t('w3-kano', 'The Kano model'),
      t('w3-moscow-impact-effort', 'MoSCoW and impact vs. effort'),
      t('w3-tradeoffs', 'Trade-offs and saying no'),
      t('w3-roadmaps', 'Now / Next / Later roadmaps'),
    ],
    tools: [
      { id: 'google-sheets', name: 'Google Sheets', use: 'Build a RICE sheet with formulas.' },
      { id: 'miro', name: 'Miro', use: 'Draw a competitor map and an impact-vs-effort 2x2.' },
      { id: 'notion', name: 'Notion', use: 'Write the 2-page strategy doc.' },
      { id: 'review-mining', name: 'Play Store / G2 reviews', use: 'Mine competitor reviews for complaints.' },
      { id: 'rice-calc', name: 'Built-in RICE Calculator', use: 'Score and sort ideas quickly.', builtIn: '/toolkit/rice' },
    ],
    deliverable: {
      title: 'P1 strategy doc + RICE roadmap',
      description: 'A 2-page strategy doc for P1 (vision, target user, positioning, goals/OKRs, bets, what you will not do) plus a RICE-prioritized Now/Next/Later roadmap.',
      project: 'P1',
      checklist: [
        '50+ competitor reviews mined and tagged',
        'Competitor positioning map',
        'Vision, strategy and 1–2 OKRs written',
        '10+ ideas scored with RICE (formulas, not typed numbers)',
        'Impact vs. effort 2x2',
        'Now / Next / Later roadmap',
        '2-page strategy doc finished, including “what we won’t do”',
      ],
    },
    checkpoint: {
      summary: 'A 5-minute verbal defence of priorities #1, #2 and why #6 waits.',
      criteria: [
        'Defended #1 and #2 with evidence from discovery and RICE inputs',
        'Explained clearly why #6 waits (not just “low score”)',
        'Finished within 5 minutes',
      ],
    },
  },
  {
    n: 4,
    phase: 1,
    title: 'Execution: PRDs, agile and launches',
    goal: 'Turn your top P1 idea into a spec an engineering team could build from, organise the work into sprints, and plan the launch.',
    topics: [
      t('w4-prd', 'PRD structure'),
      t('w4-user-stories', 'User stories and acceptance criteria'),
      t('w4-scrum-kanban', 'Scrum and kanban'),
      t('w4-sprint-planning', 'Sprint planning and estimation'),
      t('w4-eng-design', 'Working with engineering and design'),
      t('w4-launch-gtm', 'Launch plans and go-to-market basics'),
    ],
    tools: [
      { id: 'jira', name: 'Jira (free)', use: 'Create an epic, 12–15 stories and 2 sprints.' },
      { id: 'linear', name: 'Linear (free)', use: 'Recreate the same backlog to compare tools.' },
      { id: 'notion', name: 'Notion', use: 'Write the PRD.' },
    ],
    deliverable: {
      title: 'P1 PRD + Jira backlog + launch plan',
      description: 'A full PRD for P1’s top feature, a Jira backlog (epic, 12–15 stories with acceptance criteria, 2 sprints) and a 1-page launch plan.',
      project: 'P1',
      checklist: [
        'PRD: problem, goals, non-goals, users, requirements, metrics, risks, open questions',
        '12–15 user stories with Given/When/Then acceptance criteria',
        'Epic and 2 sprints set up in Jira',
        'Same backlog in Linear',
        '1-page launch plan (audience, message, channels, rollout, success metric)',
        'PRD reviewed by one developer or technical friend',
      ],
    },
    checkpoint: {
      summary: 'A developer reviewing the PRD raises fewer than 5 open questions.',
      criteria: [
        'A developer reviewed the PRD',
        'They raised fewer than 5 open questions',
        'You updated the PRD to answer the questions they raised',
      ],
    },
  },
  // ---------------- Phase 2 ----------------
  {
    n: 5,
    phase: 2,
    title: 'Metrics and SQL basics',
    goal: 'Choose metrics that reflect real user value and pull your own numbers with SQL, without waiting for an analyst.',
    topics: [
      t('w5-north-star', 'North Star and input metrics'),
      t('w5-metric-trees', 'Metric trees'),
      t('w5-aarrr', 'AARRR funnels'),
      t('w5-retention-cohorts', 'Retention and cohorts'),
      t('w5-leading-lagging', 'Leading vs. lagging and guardrail metrics'),
      t('w5-sql-select', 'SQL: SELECT, WHERE, ORDER BY'),
      t('w5-sql-groupby', 'SQL: GROUP BY and aggregates'),
      t('w5-sql-joins', 'SQL: JOINs'),
      t('w5-sql-case-dates', 'SQL: CASE and date functions'),
    ],
    tools: [
      { id: 'google-sheets', name: 'Google Sheets', use: 'Build your metric tree and a funnel model.' },
      { id: 'sql-playground', name: 'Built-in SQL Playground', use: 'Solve 25 graded problems on food-delivery data.', builtIn: '/toolkit/sql' },
      { id: 'bigquery', name: 'BigQuery sandbox', use: 'Query the public GA4 sample e-commerce dataset.' },
      { id: 'metrics-tree', name: 'Built-in Metrics Tree Builder', use: 'Sketch the P1 tree.', builtIn: '/toolkit/metrics-tree' },
    ],
    deliverable: {
      title: 'P1 metrics tree + 25 SQL problems + 5 funnel queries',
      description: 'A metric tree for P1 (North Star, inputs, guardrails), 25 SQL Playground problems solved, and 5 funnel queries (in the playground or BigQuery).',
      project: 'P1',
      checklist: [
        'P1 North Star chosen, with a one-line reason it is not a vanity metric',
        'Metric tree with 3+ input metrics and 2+ guardrails',
        '25 SQL Playground problems solved',
        '5 funnel queries written and saved',
        'Funnel model in Google Sheets',
      ],
    },
    checkpoint: {
      summary: 'A 3-table JOIN with GROUP BY in under 10 minutes; explain why your North Star is not a vanity metric.',
      criteria: [
        'Wrote a correct 3-table JOIN with GROUP BY in under 10 minutes',
        'Explained why your North Star reflects delivered value',
      ],
    },
  },
  {
    n: 6,
    phase: 2,
    title: 'Product analytics and A/B testing',
    goal: 'Instrument a product, read a dashboard, diagnose a metric drop calmly, and design an experiment that can actually reach a conclusion.',
    topics: [
      t('w6-tracking-plans', 'Event tracking plans'),
      t('w6-dashboards', 'Dashboards'),
      t('w6-cohort-analysis', 'Cohort and retention analysis'),
      t('w6-metric-drop', 'Root-causing a metric drop'),
      t('w6-hypotheses', 'Writing hypotheses'),
      t('w6-ab-design', 'A/B test design: sample size, power, significance, duration'),
      t('w6-ab-pitfalls', 'A/B pitfalls: peeking, novelty effects, when not to test'),
    ],
    tools: [
      { id: 'mixpanel', name: 'Mixpanel (demo data) or PostHog free', use: 'Explore events, funnels and retention on demo data.' },
      { id: 'amplitude', name: 'Amplitude free', use: 'Build the same charts in a second tool.' },
      { id: 'growthbook', name: 'GrowthBook', use: 'Set up a feature flag and an experiment.' },
      { id: 'ab-calc', name: 'Built-in A/B calculators', use: 'Compute sample size and check results.', builtIn: '/toolkit/ab-test' },
      { id: 'funnel-explorer', name: 'Built-in Funnel & Retention Explorer', use: 'Practise “diagnose the drop”.', builtIn: '/toolkit/funnel' },
    ],
    deliverable: {
      title: 'P2: analytics & experimentation case',
      description: 'A tracking plan, a dashboard, a diagnosis of a made-up 15% activation drop (4 ranked hypotheses + the queries to test them), and an experiment plan with sample size.',
      project: 'P2',
      checklist: [
        'Tracking plan: 15+ events with properties and triggers',
        'Dashboard with 5+ charts in Mixpanel/PostHog/Amplitude',
        '15% activation drop: 4 ranked hypotheses',
        'A query for each hypothesis',
        'Experiment plan: hypothesis, metric, guardrails, sample size, duration',
        'P2 case study written up',
      ],
    },
    checkpoint: {
      summary: 'A structured 8-minute answer to “DAU dropped 10% yesterday, what do you do?”',
      criteria: [
        'Started by checking data validity before guessing causes',
        'Segmented the drop (platform, geography, version, new vs. returning)',
        'Covered internal and external causes, and gave a next step',
        'Finished in about 8 minutes',
      ],
    },
  },
  {
    n: 7,
    phase: 2,
    title: 'Technical fluency for PMs',
    goal: 'Understand how software works well enough to ask engineers good questions, read API docs, and reason about trade-offs.',
    topics: [
      t('w7-client-server', 'Client–server and HTTP'),
      t('w7-rest-json', 'REST APIs and JSON'),
      t('w7-auth', 'Authentication'),
      t('w7-databases', 'Databases: SQL vs. NoSQL'),
      t('w7-caching-queues-cdn', 'Caching, queues and CDNs'),
      t('w7-scalability-latency', 'Scalability and latency'),
      t('w7-mobile-apps', 'How mobile apps are built and released'),
      t('w7-tech-debt', 'Technical debt'),
      t('w7-api-docs', 'Reading API docs'),
    ],
    tools: [
      { id: 'postman', name: 'Postman', use: 'Call 2 public APIs and save a collection.' },
      { id: 'devtools', name: 'Chrome DevTools (Network tab)', use: 'Watch real requests from a real site.' },
      { id: 'github', name: 'GitHub', use: 'Create a repo with a README, an issue and a PR.' },
      { id: 'excalidraw', name: 'Excalidraw', use: 'Draw your architecture diagram.' },
    ],
    deliverable: {
      title: 'P3: technical teardown',
      description: 'An annotated architecture diagram of one real feature (UPI payment or live order tracking), a Postman collection, and a trade-offs note.',
      project: 'P3',
      checklist: [
        'Feature chosen (UPI payment or live order tracking)',
        'Architecture diagram with 6+ components and labelled arrows',
        'Annotations: what happens at each step and what can fail',
        'Postman collection with requests to 2 public APIs',
        'Trade-offs note (1 page): 3 trade-offs the team likely made',
        'GitHub repo with README linking everything',
      ],
    },
    checkpoint: {
      summary: 'Explain in 3 minutes what happens between tapping “Pay” and “Payment successful”.',
      criteria: [
        'Covered app → PSP/bank servers → NPCI → issuer bank → back',
        'Mentioned authentication (UPI PIN) and at least one failure case',
        'Finished in about 3 minutes, in plain English',
      ],
    },
  },
  {
    n: 8,
    phase: 2,
    title: 'UX, prototyping and usability testing',
    goal: 'Design and test a clickable prototype of your P1 solution, improve it from real evidence, and publish the full P1 case study.',
    topics: [
      t('w8-heuristics', 'The 10 usability heuristics'),
      t('w8-laws-of-ux', 'Laws of UX'),
      t('w8-ia-flows', 'Information architecture and user flows'),
      t('w8-wireframes', 'Wireframes: low vs. high fidelity'),
      t('w8-design-systems', 'Design systems basics'),
      t('w8-accessibility', 'Accessibility basics'),
      t('w8-usability-tests', 'Running usability tests'),
      t('w8-designers', 'Working with designers'),
    ],
    tools: [
      { id: 'excalidraw', name: 'Excalidraw / paper', use: 'Sketch low-fidelity flows fast.' },
      { id: 'figma', name: 'Figma (free)', use: 'Wireframes → clickable prototype with a free UI kit.' },
      { id: 'maze', name: 'Maze free or Google Meet', use: 'Run 5 usability tests.' },
    ],
    deliverable: {
      title: 'P1 prototype + usability report + v2 + published case study',
      description: 'A clickable Figma prototype, a usability test report from 5 users, a v2 that fixes what you found, and the full P1 case study published.',
      project: 'P1',
      checklist: [
        'User flow for the main task',
        'Low-fi sketches (3+ options for the key screen)',
        'Clickable Figma prototype (v1)',
        '5 usability tests run with a script',
        'Usability report: task success, issues ranked by severity',
        'Prototype v2 fixing the top issues',
        'Full P1 case study published',
      ],
    },
    checkpoint: {
      summary: '4 of 5 testers complete the main task on v2 without help.',
      criteria: [
        'Tested v2 with 5 people',
        '4 or more completed the main task without help',
      ],
    },
  },
  // ---------------- Phase 3 ----------------
  {
    n: 9,
    phase: 3,
    title: 'How LLMs work, prompting and AI UX',
    goal: 'Understand what LLMs are good and bad at, write prompts that work reliably, and design AI features users can trust.',
    topics: [
      t('w9-tokens-inference', 'Tokens, context windows, training vs. inference'),
      t('w9-hallucination', 'Why models hallucinate'),
      t('w9-choosing-model', 'Choosing a model: quality, speed, cost'),
      t('w9-prompt-structure', 'Prompt structure'),
      t('w9-system-prompts', 'System prompts and structured output'),
      t('w9-ai-ux', 'AI UX patterns'),
      t('w9-when-not-ai', 'When not to use AI'),
    ],
    tools: [
      { id: 'llm-compare', name: 'Claude, ChatGPT, Gemini', use: 'Compare the same 10 prompts across three models.' },
      { id: 'ai-studio', name: 'Google AI Studio', use: 'System prompts, JSON output and a free API key.' },
      { id: 'notion', name: 'Notion', use: 'Keep your tested prompt library.' },
      { id: 'prompt-lab', name: 'Built-in Prompt Lab', use: 'Study bad vs. good prompts.', builtIn: '/toolkit/prompt-lab' },
    ],
    deliverable: {
      title: 'P4 AI feature spec + tested prompt library',
      description: 'A spec for your P4 AI product and a library of 10+ tested prompts. The P4 idea must pass 3 tests: 20+ reachable users, AI is genuinely better than a form or rule, and it fits in 3 weeks.',
      project: 'P4',
      checklist: [
        'P4 idea passes test 1: you can reach 20+ real users',
        'P4 idea passes test 2: AI beats a form or a rule',
        'P4 idea passes test 3: buildable in 3 weeks',
        'AI feature spec (problem, user, inputs/outputs, failure modes, UX, metrics)',
        '10+ prompts tested on 3 models with notes',
        'Prompt library in Notion',
      ],
    },
    checkpoint: {
      summary: 'Explain to a non-technical friend why the AI can be confidently wrong and what the UX does about it.',
      criteria: [
        'Explained next-token prediction in plain words',
        'Explained why fluent ≠ correct',
        'Named 2+ UX patterns that protect users (citations, editable output, feedback, fallbacks)',
      ],
    },
    split: [
      { kind: 'learn', label: 'Learn', hours: 2 },
      { kind: 'tools', label: 'Hands-on with tools', hours: 2.5 },
      { kind: 'deliverable', label: 'Deliverable', hours: 3 },
      { kind: 'interview', label: 'Interview practice', hours: 1 },
      { kind: 'writeup', label: 'Write-up', hours: 0.5 },
    ],
  },
  {
    n: 10,
    phase: 3,
    title: 'RAG, agents and evals',
    goal: 'Build a working P4 prototype and measure its quality with real evals, so you can say what changed and by how much.',
    topics: [
      t('w10-rag', 'RAG: chunking, embeddings, retrieval quality'),
      t('w10-agents', 'Tool use and agents'),
      t('w10-workflows-agents', 'Workflows vs. autonomous agents'),
      t('w10-hitl', 'Human-in-the-loop'),
      t('w10-evals-golden', 'Evals: golden datasets and error analysis'),
      t('w10-llm-judge', 'Code-based checks and LLM-as-judge'),
      t('w10-online-offline', 'Online vs. offline evals and tracing'),
    ],
    tools: [
      { id: 'gemini-api', name: 'Gemini API free tier', use: 'Power your prototype.' },
      { id: 'n8n', name: 'n8n or Make free', use: 'Build the RAG or agent workflow.' },
      { id: 'eval-labeler', name: 'Built-in Eval Labeler / Sheets', use: 'Label 50 outputs.', builtIn: '/toolkit/evals' },
      { id: 'promptfoo', name: 'Promptfoo', use: 'Automate your evals.' },
      { id: 'langfuse', name: 'Langfuse free', use: 'Trace requests end to end.' },
    ],
    deliverable: {
      title: 'Working P4 prototype + eval set + failure analysis',
      description: 'A working P4 prototype, a 50-example eval set, a top-3 failure analysis, and an LLM-as-judge checked against your own labels.',
      project: 'P4',
      checklist: [
        'Prototype works end to end on real inputs',
        '50-example golden dataset',
        'All 50 outputs labelled pass/fail with failure categories',
        'Top-3 failure analysis with examples',
        'One change made; v2 re-scored on the same 50',
        'LLM-as-judge agreement with your labels measured',
      ],
    },
    checkpoint: {
      summary: '“Version 2 went from X% to Y% because of change Z”, with real numbers.',
      criteria: [
        'Have a v1 pass rate and a v2 pass rate on the same eval set',
        'Can name the specific change that caused the difference',
      ],
    },
    split: [
      { kind: 'learn', label: 'Learn', hours: 2 },
      { kind: 'tools', label: 'Hands-on with tools', hours: 3 },
      { kind: 'deliverable', label: 'Deliverable', hours: 2.5 },
      { kind: 'interview', label: 'Interview practice', hours: 1 },
      { kind: 'writeup', label: 'Write-up', hours: 0.5 },
    ],
  },
  {
    n: 11,
    phase: 3,
    title: 'Ship it, then cost, safety and AI strategy',
    goal: 'Put P4 in front of 20+ real people, measure it, make it cheaper and safer, and understand where AI products create lasting value.',
    topics: [
      t('w11-cost', 'Cost per user and per request'),
      t('w11-latency', 'Latency budgets'),
      t('w11-tradeoffs', 'Cost / latency / accuracy trade-offs'),
      t('w11-guardrails', 'Guardrails and red-teaming'),
      t('w11-privacy-dpdp', 'Privacy and data (incl. India’s DPDP Act basics)'),
      t('w11-bias', 'Bias and fairness'),
      t('w11-ai-strategy', 'AI product strategy'),
    ],
    tools: [
      { id: 'lovable', name: 'Lovable or Bolt free', use: 'Build the user-facing app.' },
      { id: 'supabase', name: 'Supabase free', use: 'Database and login.' },
      { id: 'vercel', name: 'Vercel free', use: 'Host the app.' },
      { id: 'posthog', name: 'PostHog free', use: 'Usage analytics.' },
      { id: 'tally', name: 'Tally / Google Forms', use: 'Collect user feedback.' },
      { id: 'ai-cost', name: 'Built-in AI Cost Calculator', use: 'Work out cost per user.', builtIn: '/toolkit/ai-cost' },
    ],
    deliverable: {
      title: 'Live P4 with 20+ real users + case study',
      description: 'P4 live with 20+ real users, a usage dashboard, before/after eval scores, cost per user, a responsible-AI note and the P4 case study.',
      project: 'P4',
      checklist: [
        'App live on a public URL',
        '20+ real users have used it',
        'Usage dashboard in PostHog',
        'Feedback form live; 10+ responses',
        'Before/after eval scores',
        'Cost per user per month calculated',
        'Responsible-AI note (risks, guardrails, data handling)',
        'P4 case study published',
      ],
    },
    checkpoint: {
      summary: '20+ users, and one data-driven change shipped.',
      criteria: ['20+ real users', 'One change shipped because of data or feedback, with before/after numbers'],
    },
    split: [
      { kind: 'learn', label: 'Learn', hours: 1.5 },
      { kind: 'tools', label: 'Hands-on with tools', hours: 2 },
      { kind: 'build', label: 'Build and user outreach', hours: 4 },
      { kind: 'interview', label: 'Interview practice', hours: 1 },
      { kind: 'writeup', label: 'Write-up', hours: 0.5 },
    ],
  },
  // ---------------- Phase 4 ----------------
  {
    n: 12,
    phase: 4,
    title: 'Portfolio, resume, LinkedIn. Start applying',
    goal: 'Package your work so a recruiter understands it in 30 seconds, and start a steady pipeline of applications with referrals.',
    topics: [
      t('w12-resume', 'PM resume structure'),
      t('w12-impact-bullets', 'Impact bullets (the XYZ formula)'),
      t('w12-career-story', 'Telling your career story'),
      t('w12-linkedin', 'LinkedIn positioning'),
      t('w12-referrals', 'Referral outreach'),
      t('w12-tailoring', 'Tailoring to a job post'),
      t('w12-apm-bengaluru', 'Finding APM roles in Bengaluru'),
    ],
    tools: [
      { id: 'notion-portfolio', name: 'Notion (published portfolio)', use: 'Publish your portfolio site.' },
      { id: 'resume-tools', name: 'Canva / Google Docs', use: 'Build PM and AI PM resumes.' },
      { id: 'linkedin', name: 'LinkedIn', use: 'Rewrite your profile and send referral requests.' },
      { id: 'job-tracker', name: 'Built-in Job Tracker', use: 'Track every application.', builtIn: '/jobs' },
    ],
    deliverable: {
      title: 'Portfolio + resumes + 25 applications',
      description: 'A portfolio site, PM and AI PM resumes, a 25-company target list, 25 applications and 25 referral messages.',
      checklist: [
        'Portfolio site published with all 4 projects',
        'PM resume (1 page)',
        'AI PM resume variant',
        'LinkedIn headline and About rewritten',
        '25-company target list',
        '25 applications logged in the Job Tracker',
        '25 referral messages sent',
      ],
    },
    checkpoint: {
      summary: '2 working PMs review your resume and portfolio, and you fix everything they flag.',
      criteria: ['PM reviewer 1 gave feedback', 'PM reviewer 2 gave feedback', 'Every flagged issue fixed'],
    },
    split: [
      { kind: 'learn', label: 'Learn', hours: 1 },
      { kind: 'portfolio', label: 'Portfolio / resume', hours: 4 },
      { kind: 'applications', label: 'Applications / outreach', hours: 2.5 },
      { kind: 'interview', label: 'Interview practice', hours: 1.5 },
    ],
  },
  {
    n: 13,
    phase: 4,
    title: 'Interviews I: product sense, design, estimation, strategy',
    goal: 'Build reliable structures for the open-ended rounds and practise out loud until they feel natural.',
    topics: [
      t('w13-design-framework', 'The product design framework'),
      t('w13-improvement', 'Product improvement questions'),
      t('w13-favourite-product', 'Favourite product'),
      t('w13-estimation', 'Estimation and market sizing'),
      t('w13-strategy-questions', 'Strategy questions'),
      t('w13-thinking-aloud', 'Thinking out loud and time management'),
    ],
    tools: [
      { id: 'loom', name: 'Loom', use: 'Record and review your answers.' },
      { id: 'peer-mocks', name: 'Google Meet (peer mocks)', use: 'Run live mocks with peers.' },
      { id: 'mock-mode', name: 'Built-in Mock Interview mode', use: 'Random questions, timer and rubric.', builtIn: '/interview/mock' },
    ],
    deliverable: {
      title: '15 practised answers + 4 mocks + 15 applications',
      description: '15 practised answers (5 design, 4 improvement, 3 estimation, 3 strategy), 4 live mocks and 15 applications.',
      checklist: [
        '5 product design answers recorded',
        '4 product improvement answers recorded',
        '3 estimation answers recorded',
        '3 strategy answers recorded',
        '4 live mocks done and logged',
        '15 applications logged',
      ],
    },
    checkpoint: {
      summary: '2 mock partners in a row rate you “would advance”.',
      criteria: ['Mock partner A rated “would advance”', 'Mock partner B (next mock) rated “would advance”'],
    },
    split: [
      { kind: 'learn', label: 'Learn', hours: 1 },
      { kind: 'practice', label: 'Practice', hours: 4 },
      { kind: 'mocks', label: 'Mocks', hours: 1.5 },
      { kind: 'applications', label: 'Applications', hours: 2.5 },
    ],
  },
  {
    n: 14,
    phase: 4,
    title: 'Interviews II: execution, metrics, behavioral, AI PM cases',
    goal: 'Master the structured rounds and your stories, and get comfortable with AI PM case questions.',
    topics: [
      t('w14-metric-rca', 'Metric definition and root-cause questions'),
      t('w14-tradeoff-questions', 'Trade-off questions'),
      t('w14-behavioral-star', 'Behavioral questions with STAR'),
      t('w14-ai-pm-cases', 'AI PM cases'),
      t('w14-take-homes', 'Take-home assignments'),
      t('w14-salary', 'Salary basics in India'),
    ],
    tools: [
      { id: 'story-bank', name: 'Built-in Story Bank', use: 'Write your 10 STAR stories.', builtIn: '/interview/stories' },
      { id: 'mock-mode', name: 'Built-in Mock Interview mode', use: 'Run mocks across round types.', builtIn: '/interview/mock' },
      { id: 'job-tracker', name: 'Built-in Job Tracker', use: 'Keep applications moving.', builtIn: '/jobs' },
    ],
    deliverable: {
      title: '6 mocks + 10-story bank + cheat sheet + 15 applications',
      description: '6 more mocks (2+ AI PM cases), a 10-story bank, a 1-page framework cheat sheet and 15 applications.',
      checklist: [
        '6 mocks done and logged',
        '2+ of them AI PM cases',
        '10 STAR stories in the Story Bank',
        '1-page framework cheat sheet',
        '15 applications logged',
      ],
    },
    checkpoint: {
      summary: 'Rated “would advance” in 3 mocks in a row, across round types.',
      criteria: ['Mock 1: “would advance”', 'Mock 2: “would advance”', 'Mock 3: “would advance”', 'The 3 mocks covered at least 2 different round types'],
    },
    split: [
      { kind: 'learn', label: 'Learn', hours: 0.5 },
      { kind: 'practice', label: 'Practice', hours: 3.5 },
      { kind: 'mocks', label: 'Mocks', hours: 2 },
      { kind: 'applications', label: 'Applications', hours: 3 },
    ],
  },
  {
    n: 15,
    phase: 4,
    title: 'Week 15+: keep going until there’s an offer',
    goal: 'Run a steady, measured job-search system every week, and fix whichever stage is leaking.',
    topics: [],
    tools: [
      { id: 'job-tracker', name: 'Built-in Job Tracker', use: 'Track applications and callback rate.', builtIn: '/jobs' },
      { id: 'mock-mode', name: 'Built-in Mock Interview mode', use: '2 mocks a week on your weakest round.', builtIn: '/interview/mock' },
    ],
    deliverable: {
      title: 'The weekly job-search system',
      description: 'Repeat every week until you have an offer.',
      checklist: [
        '10–15 tailored applications this week',
        '10 referral messages this week',
        'Followed up on everything older than 5 working days',
        '2 mocks on your weakest round type',
        'P4 improvement shipped (every 2 weeks) and posted about',
        'Sunday: callback rate checked and the leaking stage fixed',
      ],
    },
    checkpoint: {
      summary: 'Every Sunday: callback rate under 10% → fix resume and targeting. Callbacks but no offers → fix interviewing.',
      criteria: ['Callback rate calculated this week', 'One concrete fix made to the weakest stage'],
    },
    split: [
      { kind: 'applications', label: 'Applications + referrals', hours: 3 },
      { kind: 'practice', label: 'Interview practice', hours: 2.5 },
      { kind: 'mocks', label: 'Mocks', hours: 1 },
      { kind: 'build', label: 'P4 improvements', hours: 2 },
      { kind: 'writeup', label: 'Posting and follow-ups', hours: 0.5 },
    ],
  },
];

/** Lay out a daily split into timed blocks, starting 9:00 with 15-min breaks and lunch 14:00–15:00. */
export function buildSchedule(week: Week): ScheduleBlock[] {
  if (!week.split) return STANDARD_SCHEDULE;
  const blocks: ScheduleBlock[] = [];
  let cur = 9 * 60;
  let lunchDone = false;
  const fmt = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const insertLunch = () => {
    blocks.push({ key: 'lunch', label: 'Lunch', kind: 'lunch', start: fmt(cur), end: fmt(cur + 60), hours: 1 });
    cur += 60;
    lunchDone = true;
  };
  week.split.forEach((s, i) => {
    let mins = Math.round(s.hours * 60);
    if (!lunchDone && cur >= 13 * 60 + 30) insertLunch();
    // split a block that crosses 14:00 around lunch
    if (!lunchDone && cur < 14 * 60 && cur + mins > 14 * 60 + 15) {
      const first = 14 * 60 - cur;
      blocks.push({ key: `${s.kind}-${i}a`, label: s.label, kind: s.kind as BlockKind, start: fmt(cur), end: fmt(cur + first), hours: first / 60 });
      cur += first;
      insertLunch();
      mins -= first;
      blocks.push({ key: `${s.kind}-${i}b`, label: `${s.label} (cont.)`, kind: s.kind, start: fmt(cur), end: fmt(cur + mins), hours: mins / 60 });
      cur += mins + 15;
      return;
    }
    blocks.push({ key: `${s.kind}-${i}`, label: s.label, kind: s.kind, start: fmt(cur), end: fmt(cur + mins), hours: mins / 60 });
    cur += mins + 15;
  });
  return blocks;
}

export const ALL_TOPICS = WEEKS.flatMap((w) => w.topics.map((tp) => ({ ...tp, week: w.n })));

export function weekOf(n: number): Week | undefined {
  return WEEKS.find((w) => w.n === n);
}

export function topicWeek(topicId: string): number | undefined {
  return ALL_TOPICS.find((x) => x.id === topicId)?.week;
}

export function phaseOf(weekN: number): Phase {
  return PHASES.find((p) => p.weeks.includes(weekN)) ?? PHASES[0];
}

export const PROJECTS = [
  {
    id: 'P1' as const,
    title: 'End-to-end product case',
    weeks: [1, 2, 3, 4, 8],
    summary: 'Pick a real user problem, research it, set strategy, write the PRD, prototype and test it, and publish the whole story.',
    milestones: ['Problem chosen (Week 1)', 'Discovery report (Week 2)', 'Strategy doc + roadmap (Week 3)', 'PRD + backlog + launch plan (Week 4)', 'Metrics tree (Week 5)', 'Prototype + usability report + v2 (Week 8)', 'Case study published (Week 8)'],
  },
  {
    id: 'P2' as const,
    title: 'Analytics & experimentation case',
    weeks: [5, 6],
    summary: 'Show you can instrument a product, diagnose a metric drop and design a sound experiment.',
    milestones: ['Tracking plan', 'Dashboard', 'Activation-drop diagnosis (4 hypotheses + queries)', 'Experiment plan with sample size', 'Case study published'],
  },
  {
    id: 'P3' as const,
    title: 'Technical teardown',
    weeks: [7],
    summary: 'Explain how a real feature works under the hood, and the trade-offs behind it.',
    milestones: ['Feature chosen', 'Architecture diagram', 'Postman collection', 'Trade-offs note', 'Published with README'],
  },
  {
    id: 'P4' as const,
    title: 'Shipped AI product with 20+ real users',
    weeks: [9, 10, 11, 15],
    summary: 'Build, evaluate and ship a real AI product, then keep improving it with data.',
    milestones: ['Idea passes the 3 tests', 'AI feature spec + prompt library', 'Working prototype', '50-example eval set + failure analysis', 'Live with 20+ users', 'Cost per user + responsible-AI note', 'Case study published', 'Improvement shipped every 2 weeks'],
  },
];

export const CASE_STUDY_CHECKLIST = [
  'One-line summary at the top: problem, what you did, result',
  'Context: who the user is and why the problem matters',
  'Evidence: research, data or quotes that prove the problem',
  'Your process and the key decisions (with the options you rejected)',
  'Artefacts embedded: screens, diagrams, docs',
  'Results with numbers, or an honest “what I’d measure”',
  'What you learned and what you would do next',
  'Skimmable: headings, bullets, under 7 minutes to read',
];
