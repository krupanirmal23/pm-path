import { lazy, type LazyExoticComponent, type ComponentType } from 'react';
import type { Pastel } from '../data/types';

export interface ToolDef {
  slug: string;
  name: string;
  blurb: string;
  week: number;
  color: Pastel;
  to?: string; // external route instead of /toolkit/:slug
  Component?: LazyExoticComponent<ComponentType>;
}

export const TOOLS: ToolDef[] = [
  { slug: 'sql', name: 'SQL Playground', blurb: 'Real SQLite in your browser with a food-delivery dataset and 40 graded problems.', week: 5, color: 'sky', Component: lazy(() => import('./sql/SqlPlayground')) },
  { slug: 'rice', name: 'RICE Calculator', blurb: 'Score ideas by reach, impact, confidence and effort; auto-sort and export CSV.', week: 3, color: 'lavender', Component: lazy(() => import('./RiceCalculator')) },
  { slug: 'metrics-tree', name: 'Metrics Tree Builder', blurb: 'Break your North Star into inputs, drivers and guardrails.', week: 5, color: 'sky', Component: lazy(() => import('./MetricsTree')) },
  { slug: 'funnel', name: 'Funnel & Retention Explorer', blurb: 'Synthetic data, segments and guided “diagnose the drop” exercises.', week: 6, color: 'sky', Component: lazy(() => import('./FunnelExplorer')) },
  { slug: 'ab-test', name: 'A/B Test Calculator', blurb: 'Sample size, duration and a significance checker, in plain English.', week: 6, color: 'sky', Component: lazy(() => import('./AbTest')) },
  { slug: 'estimation', name: 'Estimation Scratchpad', blurb: 'Structured market sizing with a timer and live maths.', week: 13, color: 'peach', Component: lazy(() => import('./Estimation')) },
  { slug: 'ai-cost', name: 'AI Cost Calculator', blurb: 'Tokens → cost per request and per user per month in ₹ and $.', week: 11, color: 'mint', Component: lazy(() => import('./AiCost')) },
  { slug: 'evals', name: 'Eval Labeler', blurb: 'Label AI outputs, see failure breakdowns, compare v1 vs v2, check judge agreement.', week: 10, color: 'mint', Component: lazy(() => import('./EvalLabeler')) },
  { slug: 'prompt-lab', name: 'Prompt Lab', blurb: 'Annotated weak vs. strong prompts with example outputs; optional live runs.', week: 9, color: 'mint', Component: lazy(() => import('./PromptLab')) },
  { slug: 'mock', name: 'Mock Interview Timer', blurb: 'Random questions by category, a 45-minute phased timer, rubric and log.', week: 13, color: 'peach', to: '/interview/mock' },
];
