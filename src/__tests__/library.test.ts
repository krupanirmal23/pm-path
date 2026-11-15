import { describe, expect, it } from 'vitest';
import { TEMPLATES } from '../lib/templates';
import { FRAMEWORKS } from '../data/frameworks';
import { QUESTIONS, Q_CATEGORIES } from '../data/questions';

const BANNED = /\b(lorem|ipsum|TODO|TBD|coming soon)\b/i;

describe('templates', () => {
  it('has at least 21 templates with guide, blank and example', () => {
    expect(TEMPLATES.length).toBeGreaterThanOrEqual(21);
    for (const t of TEMPLATES) {
      expect(t.guide.length, t.id).toBeGreaterThan(150);
      expect(t.blank.length, t.id).toBeGreaterThan(150);
      expect(t.example.length, t.id).toBeGreaterThan(300);
      expect(t.summary.length, t.id).toBeGreaterThan(20);
      expect(t.week, t.id).toBeGreaterThan(0);
      expect(BANNED.test(t.guide + t.blank + t.example), t.id).toBe(false);
    }
  });
  it('has unique ids', () => {
    expect(new Set(TEMPLATES.map((t) => t.id)).size).toBe(TEMPLATES.length);
  });
});

describe('frameworks', () => {
  it('has 40+ complete frameworks', () => {
    expect(FRAMEWORKS.length).toBeGreaterThanOrEqual(40);
    for (const f of FRAMEWORKS) {
      expect(f.what.length, f.id).toBeGreaterThan(80);
      expect(f.when.length, f.id).toBeGreaterThan(0);
      expect(f.whenNot.length, f.id).toBeGreaterThan(0);
      expect(f.steps.length, f.id).toBeGreaterThanOrEqual(3);
      expect(f.example.body.length, f.id).toBeGreaterThan(80);
      expect(f.mistakes.length, f.id).toBeGreaterThan(0);
    }
    expect(new Set(FRAMEWORKS.map((f) => f.id)).size).toBe(FRAMEWORKS.length);
  });
});

describe('interview questions', () => {
  it('has 200+ questions covering all categories', () => {
    expect(QUESTIONS.length).toBeGreaterThanOrEqual(200);
    for (const c of Q_CATEGORIES) expect(QUESTIONS.filter((q) => q.category === c.id).length, c.id).toBeGreaterThanOrEqual(20);
    expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(QUESTIONS.length);
  });
  it('every question has outline, look-for and pitfalls', () => {
    for (const q of QUESTIONS) {
      expect(q.outline.length, q.id).toBeGreaterThanOrEqual(3);
      expect(q.lookFor.length, q.id).toBeGreaterThan(0);
      expect(q.pitfalls.length, q.id).toBeGreaterThan(0);
      expect(q.pitfalls.some((p) => p.length < 6), q.id).toBe(false);
    }
  });
});
