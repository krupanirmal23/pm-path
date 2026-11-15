import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parseFrontmatter, splitSegments, headingsOf, wordCount } from '../lib/markdown';
import { WEEKS } from '../data/curriculum';

const root = join(__dirname, '..', 'content');
const REQUIRED = ['Why this matters for a PM', 'Core concepts', 'Worked example', 'Step by step', 'Common mistakes', 'How it shows up in interviews', 'Practice exercise', 'Quiz', 'Key takeaways'];

const lessonFiles: string[] = [];
for (const dir of readdirSync(root).filter((d) => d.startsWith('week-'))) {
  for (const f of readdirSync(join(root, dir)).filter((f) => f.endsWith('.md'))) lessonFiles.push(join(root, dir, f));
}

describe('lesson content', () => {
  for (const file of lessonFiles) {
    const raw = readFileSync(file, 'utf8');
    const { meta, body } = parseFrontmatter(raw);
    const name = file.split('/').pop()!;
    it(`${name}: frontmatter`, () => {
      expect(meta.id).toBe(name.replace(/\.md$/, ''));
      expect(typeof meta.title).toBe('string');
      expect(typeof meta.week).toBe('number');
      expect(typeof meta.estimatedMinutes).toBe('number');
      expect(Array.isArray(meta.tags)).toBe(true);
      const topic = WEEKS.flatMap((w) => w.topics).find((t) => t.id === meta.id);
      expect(topic, 'topic exists in curriculum').toBeTruthy();
    });
    it(`${name}: structure`, () => {
      const heads = headingsOf(body).map((h) => h.text);
      for (const r of REQUIRED) expect(heads, `missing "${r}"`).toContain(r);
      expect(body).toMatch(/<svg|class="diagram"/);
      const segs = splitSegments(body);
      expect(segs.filter((s) => s.type === 'answer').length).toBeGreaterThanOrEqual(1);
      const quiz = segs.find((s) => s.type === 'quiz');
      expect(quiz).toBeTruthy();
      if (quiz && quiz.type === 'quiz') {
        expect(quiz.questions.length).toBeGreaterThanOrEqual(5);
        expect(quiz.questions.length).toBeLessThanOrEqual(8);
        for (const q of quiz.questions) {
          expect(q.options.filter((o) => o.correct).length, q.q).toBe(1);
          expect(q.options.length, q.q).toBeGreaterThanOrEqual(3);
          for (const o of q.options) expect(o.why.length, `${q.q} / ${o.text}`).toBeGreaterThan(5);
        }
      }
      expect(body.split('## Key takeaways')[1].match(/^- /gm)?.length).toBe(5);
      expect(wordCount(body)).toBeGreaterThan(1400);
    });
  }
});

describe('tool guides', () => {
  const dir = join(root, 'tools');
  const files = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.md')) : [];
  for (const f of files) {
    it(`${f}: matches a week tool`, () => {
      const m = f.match(/^w(\d+)-(.+)\.md$/);
      expect(m).toBeTruthy();
      const week = WEEKS.find((w) => w.n === Number(m![1]));
      expect(week?.tools.some((t) => t.id === m![2])).toBe(true);
      const body = readFileSync(join(dir, f), 'utf8');
      for (const h of ['What it is', 'Why PMs use it', 'Account setup', 'Walkthrough', 'Tips']) expect(body).toMatch(new RegExp(`## ${h}`));
    });
  }
});
