import { parseFrontmatter } from './markdown';

export interface TemplateDoc {
  id: string;
  title: string;
  category: string;
  week: number;
  summary: string;
  guide: string;
  blank: string;
  example: string;
}

const files = import.meta.glob('../content/templates/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export const TEMPLATE_CATEGORIES = ['Discover', 'Strategy', 'Build', 'Design', 'Measure', 'AI', 'Career'] as const;

export function parseTemplate(id: string, raw: string): TemplateDoc {
  const { meta, body } = parseFrontmatter(raw);
  const [guide, rest = ''] = body.split('<!-- template -->');
  const [blank, example = ''] = rest.split('<!-- example -->');
  return {
    id,
    title: String(meta.title ?? id),
    category: String(meta.category ?? 'Other'),
    week: Number(meta.week ?? 0),
    summary: String(meta.summary ?? ''),
    guide: guide.trim(),
    blank: blank.trim(),
    example: example.trim(),
  };
}

export const TEMPLATES: TemplateDoc[] = Object.entries(files)
  .map(([p, raw]) => parseTemplate(p.split('/').pop()!.replace(/\.md$/, ''), raw))
  .sort((a, b) => TEMPLATE_CATEGORIES.indexOf(a.category as never) - TEMPLATE_CATEGORIES.indexOf(b.category as never) || a.week - b.week || a.title.localeCompare(b.title));

export const templateById = (id: string) => TEMPLATES.find((t) => t.id === id);
