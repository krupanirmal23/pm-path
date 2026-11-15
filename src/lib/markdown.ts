import { Marked, type Tokens } from 'marked';

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
}

const CALLOUTS: Record<string, string> = {
  TIP: 'Tip',
  WARNING: 'Watch out',
  EXAMPLE: 'Example',
  INTERVIEW: 'Interview angle',
  NOTE: 'Note',
};

function makeMarked(allowHtml: boolean) {
  const m = new Marked({ gfm: true, breaks: false });
  m.use({
    renderer: {
      heading(this: any, token: Tokens.Heading) {
        const inner = this.parser.parseInline(token.tokens);
        const id = slugify(token.text);
        return `<h${token.depth} id="${id}">${inner}</h${token.depth}>\n`;
      },
      blockquote(this: any, token: Tokens.Blockquote) {
        const body: string = this.parser.parse(token.tokens);
        const match = body.match(/^<p>\[!(TIP|WARNING|EXAMPLE|INTERVIEW|NOTE)\]\s*/);
        if (match) {
          const kind = match[1];
          const rest = '<p>' + body.slice(match[0].length);
          return `<div class="callout callout-${kind.toLowerCase()}" role="note"><p class="callout-title">${CALLOUTS[kind]}</p>${rest}</div>\n`;
        }
        return `<blockquote>${body}</blockquote>\n`;
      },
      link(this: any, token: Tokens.Link) {
        const text = this.parser.parseInline(token.tokens);
        const href = token.href || '';
        const external = /^https?:\/\//.test(href);
        const safe = /^(https?:|mailto:|\/|#)/.test(href) ? href : '#';
        return `<a href="${safe}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>`;
      },
      ...(allowHtml
        ? {}
        : {
            html(token: Tokens.HTML | Tokens.Tag) {
              return escapeHtml(token.text);
            },
          }),
    },
  });
  return m;
}

const trusted = makeMarked(true);
const untrusted = makeMarked(false);

export function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Render content written by the site (may include inline SVG diagrams). */
export function renderMarkdown(md: string): string {
  return trusted.parse(md, { async: false }) as string;
}

/** Render the learner’s own notes; raw HTML is escaped. */
export function renderUserMarkdown(md: string): string {
  return untrusted.parse(md, { async: false }) as string;
}

// ---------- Frontmatter ----------
export interface Frontmatter {
  [k: string]: string | number | string[] | undefined;
}

export function parseFrontmatter(src: string): { meta: Frontmatter; body: string } {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { meta: {}, body: src };
  const meta: Frontmatter = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) continue;
    const [, k, raw] = kv;
    let v: string = raw.trim();
    if (v.startsWith('[') && v.endsWith(']')) {
      meta[k] = v
        .slice(1, -1)
        .split(',')
        .map((x) => x.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    } else if (/^-?\d+(\.\d+)?$/.test(v)) {
      meta[k] = Number(v);
    } else {
      meta[k] = v.replace(/^['"]|['"]$/g, '');
    }
  }
  return { meta, body: src.slice(m[0].length) };
}

// ---------- Lesson segments ----------
export interface QuizQuestion {
  q: string;
  options: { text: string; correct: boolean; why: string }[];
}

export type Segment =
  | { type: 'md'; md: string }
  | { type: 'quiz'; questions: QuizQuestion[] }
  | { type: 'answer'; md: string; label: string };

export function parseQuiz(src: string): QuizQuestion[] {
  const qs: QuizQuestion[] = [];
  let cur: QuizQuestion | null = null;
  for (const raw of src.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    if (/^Q:/i.test(line)) {
      cur = { q: line.replace(/^Q:\s*/i, ''), options: [] };
      qs.push(cur);
    } else if (cur && /^-\s*\[( |x|X)\]/.test(line)) {
      const correct = /^-\s*\[(x|X)\]/.test(line);
      const rest = line.replace(/^-\s*\[( |x|X)\]\s*/, '');
      const [text, why = ''] = rest.split(/\s+::\s+/);
      cur.options.push({ text: text.trim(), correct, why: why.trim() });
    } else if (cur && cur.options.length > 0) {
      // continuation of the last explanation
      const last = cur.options[cur.options.length - 1];
      last.why = (last.why + ' ' + line).trim();
    } else if (cur) {
      cur.q += ' ' + line;
    }
  }
  return qs;
}

/** Split a lesson body into markdown, quiz and reveal-answer segments. */
export function splitSegments(body: string): Segment[] {
  const out: Segment[] = [];
  // ```answer / ```quiz blocks; use 4+ backticks when the block itself contains code fences.
  const re = /(`{3,})(quiz|answer)([^\n]*)\n([\s\S]*?)\n\1(?!`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) {
    if (m.index > last) out.push({ type: 'md', md: body.slice(last, m.index) });
    if (m[2] === 'quiz') out.push({ type: 'quiz', questions: parseQuiz(m[4]) });
    else out.push({ type: 'answer', md: m[4], label: m[3].trim() || 'Reveal model answer' });
    last = m.index + m[0].length;
  }
  if (last < body.length) out.push({ type: 'md', md: body.slice(last) });
  return out;
}

export function headingsOf(body: string): { id: string; text: string }[] {
  const out: { id: string; text: string }[] = [];
  let inFence = false;
  for (const line of body.split(/\r?\n/)) {
    if (line.startsWith('```')) inFence = !inFence;
    if (inFence) continue;
    const m = line.match(/^##\s+(.+)$/);
    if (m) {
      const text = m[1].replace(/[*_`]/g, '').trim();
      out.push({ id: slugify(text), text });
    }
  }
  return out;
}

export function wordCount(md: string): number {
  return md
    .replace(/<svg[\s\S]*?<\/svg>/g, ' ')
    .replace(/<\/?[a-zA-Z][^>]*>/g, ' ')
    .replace(/[#>*_`|\-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

export function stripMarkdown(md: string): string {
  return md
    .replace(/<svg[\s\S]*?<\/svg>/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<\/?[a-zA-Z][^>]*>/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#>*_`|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
