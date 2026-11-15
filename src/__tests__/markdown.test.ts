import { describe, it, expect } from 'vitest';
import { parseFrontmatter, splitSegments, parseQuiz, headingsOf, renderMarkdown, renderUserMarkdown } from '../lib/markdown';

describe('markdown helpers', () => {
  it('parses frontmatter', () => {
    const { meta, body } = parseFrontmatter('---\nid: a\ntitle: "Hello: world"\nweek: 2\ntags: [x, y]\n---\nBody');
    expect(meta).toEqual({ id: 'a', title: 'Hello: world', week: 2, tags: ['x', 'y'] });
    expect(body).toBe('Body');
  });
  it('splits quiz and answer blocks', () => {
    const segs = splitSegments('Intro\n```answer Show it\nModel\n```\nMid\n```quiz\nQ: One?\n- [x] A :: because\n- [ ] B :: no\n```\nEnd');
    expect(segs.map((s) => s.type)).toEqual(['md', 'answer', 'md', 'quiz', 'md']);
  });
  it('parses quiz questions with explanations', () => {
    const q = parseQuiz('Q: What?\n- [ ] Wrong :: Not this\n- [x] Right :: Yes this');
    expect(q).toHaveLength(1);
    expect(q[0].options[1]).toEqual({ text: 'Right', correct: true, why: 'Yes this' });
  });
  it('collects h2 headings outside code fences', () => {
    expect(headingsOf('## One\n```\n## not\n```\n## Two')).toEqual([
      { id: 'one', text: 'One' },
      { id: 'two', text: 'Two' },
    ]);
  });
  it('renders callouts and escapes HTML in user notes', () => {
    expect(renderMarkdown('> [!TIP]\n> Do it')).toContain('callout-tip');
    expect(renderUserMarkdown('<script>alert(1)</script>')).not.toContain('<script>');
  });
});

describe('nested fences', () => {
  it('supports 4-backtick answer blocks containing code', () => {
    const segs = splitSegments('A\n````answer Show\n```sql\nSELECT 1;\n```\n````\nB');
    expect(segs.map((s) => s.type)).toEqual(['md', 'answer', 'md']);
    expect(segs[1].type === 'answer' && segs[1].md).toContain('SELECT 1;');
  });
});
