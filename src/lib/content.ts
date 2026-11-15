import { parseFrontmatter, splitSegments, headingsOf, wordCount, type Segment } from './markdown';

// Each lesson/tool guide becomes its own lazily loaded chunk (and is precached by the service worker).
const lessonFiles = import.meta.glob('../content/week-*/*.md', { query: '?raw', import: 'default' }) as Record<string, () => Promise<string>>;
const toolFiles = import.meta.glob('../content/tools/*.md', { query: '?raw', import: 'default' }) as Record<string, () => Promise<string>>;
const pageFiles = import.meta.glob('../content/pages/*.md', { query: '?raw', import: 'default' }) as Record<string, () => Promise<string>>;

function fileId(path: string): string {
  return path.split('/').pop()!.replace(/\.md$/, '');
}

const lessonIndex = new Map<string, () => Promise<string>>();
for (const [p, fn] of Object.entries(lessonFiles)) lessonIndex.set(fileId(p), fn);
const toolIndex = new Map<string, () => Promise<string>>();
for (const [p, fn] of Object.entries(toolFiles)) toolIndex.set(fileId(p), fn);
const pageIndex = new Map<string, () => Promise<string>>();
for (const [p, fn] of Object.entries(pageFiles)) pageIndex.set(fileId(p), fn);

export function hasLesson(id: string): boolean {
  return lessonIndex.has(id);
}
export function hasToolGuide(id: string): boolean {
  return toolIndex.has(id);
}
export function lessonIds(): string[] {
  return [...lessonIndex.keys()];
}

export interface LoadedDoc {
  id: string;
  title: string;
  week?: number;
  estimatedMinutes: number;
  tags: string[];
  body: string;
  segments: Segment[];
  headings: { id: string; text: string }[];
  words: number;
}

const cache = new Map<string, LoadedDoc>();

function build(id: string, raw: string): LoadedDoc {
  const { meta, body } = parseFrontmatter(raw);
  const words = wordCount(body);
  return {
    id,
    title: String(meta.title ?? id),
    week: typeof meta.week === 'number' ? meta.week : undefined,
    estimatedMinutes: typeof meta.estimatedMinutes === 'number' ? meta.estimatedMinutes : Math.max(5, Math.round(words / 200)),
    tags: Array.isArray(meta.tags) ? (meta.tags as string[]) : [],
    body,
    segments: splitSegments(body),
    headings: headingsOf(body),
    words,
  };
}

async function load(index: Map<string, () => Promise<string>>, prefix: string, id: string): Promise<LoadedDoc | null> {
  const key = prefix + id;
  if (cache.has(key)) return cache.get(key)!;
  const fn = index.get(id);
  if (!fn) return null;
  const doc = build(id, await fn());
  cache.set(key, doc);
  return doc;
}

export const loadLesson = (id: string) => load(lessonIndex, 'l:', id);
export const loadToolGuide = (id: string) => load(toolIndex, 't:', id);
export const loadPage = (id: string) => load(pageIndex, 'p:', id);

export async function loadAllLessons(): Promise<LoadedDoc[]> {
  const out = await Promise.all([...lessonIndex.keys()].map((id) => loadLesson(id)));
  return out.filter(Boolean) as LoadedDoc[];
}
export async function loadAllToolGuides(): Promise<LoadedDoc[]> {
  const out = await Promise.all([...toolIndex.keys()].map((id) => loadToolGuide(id)));
  return out.filter(Boolean) as LoadedDoc[];
}
