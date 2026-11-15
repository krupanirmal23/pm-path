import { describe, it, expect } from 'vitest';
import { defaultData, normalize } from '../store/useStore';
import { WEEKS, buildSchedule } from '../data/curriculum';
import { currentWeekNumber, overallPct, weekStatus, streak, topicPct, statusFromChecklist, callbackRate, hoursThisWeek, weekPct, tasksForDay } from '../lib/progress';
import { mondayOf, addDays } from '../lib/dates';
import type { Application } from '../data/types';

const w1 = WEEKS[0];

describe('calendar', () => {
  it('computes the current week from the start date', () => {
    expect(currentWeekNumber('2026-01-05', '2026-01-04')).toBe(0);
    expect(currentWeekNumber('2026-01-05', '2026-01-05')).toBe(1);
    expect(currentWeekNumber('2026-01-05', '2026-01-11')).toBe(1);
    expect(currentWeekNumber('2026-01-05', '2026-01-12')).toBe(2);
    expect(currentWeekNumber('2026-01-05', '2026-12-31')).toBe(15);
  });
  it('finds the Monday of a week', () => {
    expect(mondayOf('2026-01-07')).toBe('2026-01-05');
    expect(mondayOf('2026-01-11')).toBe('2026-01-05'); // Sunday belongs to the week before
    expect(mondayOf('2026-01-05')).toBe('2026-01-05');
  });
});

describe('progress', () => {
  it('starts at zero', () => {
    const d = defaultData();
    expect(overallPct(d)).toBe(0);
    expect(weekStatus(d, w1)).toBe('not_started');
  });
  it('computes topic percentage from data', () => {
    const d = defaultData();
    d.topics[w1.topics[0].id] = { done: true };
    expect(topicPct(d, w1)).toBe(Math.round(100 / w1.topics.length));
    expect(weekStatus(d, w1)).toBe('in_progress');
    expect(overallPct(d)).toBeGreaterThan(0);
  });
  it('marks a week done only when topics, deliverable and checkpoint are complete', () => {
    const d = defaultData();
    for (const t of w1.topics) d.topics[t.id] = { done: true };
    expect(weekStatus(d, w1)).toBe('in_progress');
    d.deliverables[1] = { checklist: w1.deliverable.checklist.map(() => true), link: '', status: 'done' };
    expect(weekStatus(d, w1)).toBe('in_progress');
    d.checkpoints[1] = { criteria: [], result: 'pass', notes: '' };
    expect(weekStatus(d, w1)).toBe('done');
    expect(weekPct(d, w1)).toBe(100);
  });
  it('derives deliverable status from its checklist', () => {
    expect(statusFromChecklist([], 3, 'not_started')).toBe('not_started');
    expect(statusFromChecklist([true], 3, 'not_started')).toBe('in_progress');
    expect(statusFromChecklist([true, true, true], 3, 'in_progress')).toBe('done');
    expect(statusFromChecklist([true], 3, 'blocked')).toBe('blocked');
  });
});

describe('streak', () => {
  it('counts consecutive Mon–Sat days and skips Sundays', () => {
    const d = defaultData();
    // Fri 2026-01-09, Sat 01-10, (Sun 01-11 skipped), Mon 01-12
    for (const day of ['2026-01-09', '2026-01-10', '2026-01-12']) d.activity[day] = 1;
    expect(streak(d, '2026-01-12')).toBe(3);
  });
  it('does not break on a Sunday with no activity, and today without activity does not reset it', () => {
    const d = defaultData();
    for (const day of ['2026-01-09', '2026-01-10']) d.activity[day] = 1;
    expect(streak(d, '2026-01-11')).toBe(2); // Sunday
    expect(streak(d, '2026-01-12')).toBe(2); // Monday morning, nothing logged yet
  });
  it('breaks on a missed workday', () => {
    const d = defaultData();
    for (const day of ['2026-01-07', '2026-01-09']) d.activity[day] = 1;
    expect(streak(d, '2026-01-09')).toBe(1);
  });
});

describe('hours', () => {
  it('sums the current week', () => {
    const d = defaultData();
    const mon = '2026-01-05';
    d.timeLogs.push({ id: 'a', date: mon, blockKey: 'learn', minutes: 150 }, { id: 'b', date: addDays(mon, 2), blockKey: 'tools', minutes: 90 }, { id: 'c', date: addDays(mon, 7), blockKey: 'learn', minutes: 60 });
    expect(hoursThisWeek(d, addDays(mon, 3))).toBe(4);
  });
});

describe('schedule', () => {
  it('uses the standard 9-hour day by default', () => {
    const s = buildSchedule(w1);
    expect(s.filter((b) => b.kind !== 'lunch').reduce((a, b) => a + b.hours, 0)).toBe(9);
  });
  it('lays out custom splits with lunch', () => {
    const w9 = WEEKS.find((w) => w.n === 9)!;
    const s = buildSchedule(w9);
    expect(s.some((b) => b.kind === 'lunch')).toBe(true);
    expect(s.filter((b) => b.kind !== 'lunch').reduce((a, b) => a + b.hours, 0)).toBeCloseTo(9);
  });
  it('spreads every topic across the week', () => {
    const d = defaultData();
    const ids = new Set<string>();
    for (const dow of [1, 2, 3, 4]) tasksForDay(d, w1, dow).forEach((t) => t.kind === 'topic' && ids.add(t.ref!));
    expect(ids.size).toBe(w1.topics.length);
  });
});

describe('jobs', () => {
  it('computes callback rate excluding wishlist', () => {
    const base: Omit<Application, 'id' | 'stage' | 'callback'> = { company: 'x', role: 'APM', link: '', referral: '', appliedOn: '', updatedOn: '', nextStep: '', notes: '' };
    const apps: Application[] = [
      { ...base, id: '1', stage: 'wishlist', callback: false },
      { ...base, id: '2', stage: 'applied', callback: false },
      { ...base, id: '3', stage: 'interviewing', callback: false },
      { ...base, id: '4', stage: 'rejected', callback: true },
    ];
    expect(callbackRate(apps)).toEqual({ applied: 3, callbacks: 2, rate: 67 });
  });
});

describe('normalize', () => {
  it('fills missing keys and keeps known values', () => {
    const n = normalize({ settings: { name: 'K' }, topics: { a: { done: true } }, junk: 1 });
    expect(n.settings.name).toBe('K');
    expect(n.settings.dailyHours).toBe(9);
    expect(n.topics.a.done).toBe(true);
    expect(Array.isArray(n.timeLogs)).toBe(true);
    expect((n as any).junk).toBeUndefined();
  });
  it('rejects wrong types', () => {
    const n = normalize({ timeLogs: 'nope', topics: [] });
    expect(n.timeLogs).toEqual([]);
    expect(n.topics).toEqual({});
  });
});
