import MiniSearch from 'minisearch';
import { loadAllLessons, loadAllToolGuides } from './content';
import { stripMarkdown } from './markdown';
import { ALL_TOPICS, WEEKS } from '../data/curriculum';
import { FRAMEWORKS } from '../data/frameworks';
import { GLOSSARY } from '../data/glossary';
import { QUESTIONS, categoryLabel } from '../data/questions';
import { TEMPLATES } from './templates';
import { TOOLS } from '../tools/registry';
import { slugify } from './markdown';

export type DocKind = 'Lesson' | 'Tool guide' | 'Framework' | 'Template' | 'Glossary' | 'Question' | 'Tool' | 'Week' | 'Page';

export interface SearchDoc {
  id: string;
  kind: DocKind;
  title: string;
  text: string;
  to: string;
  meta?: string;
}

const PAGES: SearchDoc[] = [
  { id: 'page-today', kind: 'Page', title: 'Today', text: 'daily plan time blocks timer checklist reflection', to: '/today' },
  { id: 'page-roadmap', kind: 'Page', title: 'Roadmap', text: '14 weeks phases calendar deliverables checkpoints', to: '/roadmap' },
  { id: 'page-jobs', kind: 'Page', title: 'Job search', text: 'applications kanban outreach referrals callback rate Bengaluru APM guide salary', to: '/jobs' },
  { id: 'page-portfolio', kind: 'Page', title: 'Portfolio', text: 'projects P1 P2 P3 P4 case study milestones links', to: '/portfolio' },
  { id: 'page-review', kind: 'Page', title: 'Weekly review', text: 'reflection sunday stats hours plan next week', to: '/review' },
  { id: 'page-skip', kind: 'Page', title: 'Skip this', text: 'certificates bootcamps MBA agile certification PMP easy apply what not to do', to: '/skip' },
  { id: 'page-settings', kind: 'Page', title: 'Settings', text: 'export import backup reset theme dark mode start date name API key', to: '/settings' },
  { id: 'page-mock', kind: 'Page', title: 'Mock interview', text: 'mock interview timer rubric practice 45 minutes', to: '/interview/mock' },
  { id: 'page-stories', kind: 'Page', title: 'Story bank', text: 'STAR stories behavioural interview', to: '/interview/stories' },
];

let indexPromise: Promise<MiniSearch<SearchDoc>> | null = null;

export function staticDocs(): SearchDoc[] {
  const docs: SearchDoc[] = [...PAGES];
  for (const w of WEEKS) docs.push({ id: `week-${w.n}`, kind: 'Week', title: `Week ${w.n}: ${w.title}`, text: `${w.goal} ${w.deliverable.title} ${w.deliverable.description}`, to: `/week/${w.n}` });
  for (const f of FRAMEWORKS) docs.push({ id: `fw-${f.id}`, kind: 'Framework', title: f.name, text: `${f.oneLiner} ${f.what} ${f.steps.join(' ')} ${f.example.title}`, to: `/frameworks/${f.id}`, meta: f.category });
  for (const t of TEMPLATES) docs.push({ id: `tpl-${t.id}`, kind: 'Template', title: t.title, text: `${t.summary} ${stripMarkdown(t.guide)}`, to: `/templates/${t.id}`, meta: t.category });
  for (const g of GLOSSARY) docs.push({ id: `gl-${slugify(g.term)}`, kind: 'Glossary', title: g.term, text: g.def, to: `/glossary?q=${encodeURIComponent(g.term)}`, meta: g.category });
  for (const q of QUESTIONS) docs.push({ id: `q-${q.id}`, kind: 'Question', title: q.q, text: q.outline.join(' '), to: `/interview?q=${encodeURIComponent(q.id)}`, meta: categoryLabel(q.category) });
  for (const t of TOOLS) docs.push({ id: `tool-${t.slug}`, kind: 'Tool', title: t.name, text: t.blurb, to: t.to ?? `/toolkit/${t.slug}` });
  return docs;
}

function newIndex() {
  return new MiniSearch<SearchDoc>({
    fields: ['title', 'text', 'meta'],
    storeFields: ['kind', 'title', 'to', 'meta', 'text'],
    searchOptions: { boost: { title: 3, meta: 1.5 }, prefix: true, fuzzy: 0.15, combineWith: 'AND' },
  });
}

/** Builds the index once; lesson bodies are loaded lazily (they are precached for offline use). */
export function getIndex(): Promise<MiniSearch<SearchDoc>> {
  if (!indexPromise) {
    indexPromise = (async () => {
      const ms = newIndex();
      ms.addAll(staticDocs());
      const [lessons, guides] = await Promise.all([loadAllLessons(), loadAllToolGuides()]);
      const titleOf = new Map(ALL_TOPICS.map((t) => [t.id, t.title]));
      ms.addAll(
        lessons.map((l) => ({ id: `lesson-${l.id}`, kind: 'Lesson' as const, title: titleOf.get(l.id) ?? l.title, text: stripMarkdown(l.body), to: `/lesson/${l.id}`, meta: l.week ? `Week ${l.week}` : undefined })),
      );
      ms.addAll(guides.map((g) => ({ id: `guide-${g.id}`, kind: 'Tool guide' as const, title: g.title, text: stripMarkdown(g.body), to: `/guide/${g.id}`, meta: g.week ? `Week ${g.week}` : undefined })));
      return ms;
    })();
  }
  return indexPromise;
}

export function snippet(text: string, query: string, len = 140): string {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const lower = text.toLowerCase();
  let at = -1;
  for (const w of words) {
    at = lower.indexOf(w);
    if (at >= 0) break;
  }
  if (at < 0) return text.slice(0, len) + (text.length > len ? '…' : '');
  const start = Math.max(0, at - 40);
  return (start > 0 ? '…' : '') + text.slice(start, start + len).trim() + (start + len < text.length ? '…' : '');
}
