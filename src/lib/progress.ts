import type { ProgressData, Week, Status, Application } from '../data/types';
import { WEEKS, PHASES, buildSchedule } from '../data/curriculum';
import { addDays, daysBetween, mondayOf, today, weekdayOf, parseISODate } from './dates';

export const CORE_WEEKS = WEEKS.filter((w) => w.n <= 14);

// ---------- Calendar ----------
/** 1-based week number for a date given the start date. 0 = not started yet. Capped at 15 (“Week 15+”). */
export function currentWeekNumber(startDate: string, on: string = today()): number {
  const d = daysBetween(startDate, on);
  if (d < 0) return 0;
  return Math.min(15, Math.floor(d / 7) + 1);
}

export function weekDates(startDate: string, n: number): { start: string; end: string } {
  const start = addDays(startDate, (n - 1) * 7);
  return { start, end: addDays(start, 6) };
}

// ---------- Topics & weeks ----------
export function isTopicDone(data: ProgressData, id: string): boolean {
  return !!data.topics[id]?.done;
}

export function topicsDoneCount(data: ProgressData, week: Week): number {
  return week.topics.filter((t) => isTopicDone(data, t.id)).length;
}

export function topicPct(data: ProgressData, week: Week): number {
  if (week.topics.length === 0) return 0;
  return Math.round((topicsDoneCount(data, week) / week.topics.length) * 100);
}

export function deliverableFraction(data: ProgressData, week: Week): number {
  const d = data.deliverables[week.n];
  if (!d) return 0;
  if (d.status === 'done') return 1;
  const n = week.deliverable.checklist.length;
  if (!n) return 0;
  return week.deliverable.checklist.filter((_, i) => d.checklist[i]).length / n;
}

export function deliverableStatus(data: ProgressData, week: Week): Status {
  return data.deliverables[week.n]?.status ?? 'not_started';
}

/** Derive a deliverable status from its checklist, keeping a manual “blocked”. */
export function statusFromChecklist(checklist: boolean[], total: number, current: Status): Status {
  const done = checklist.slice(0, total).filter(Boolean).length;
  if (current === 'blocked' && done < total) return 'blocked';
  if (done === 0) return current === 'in_progress' ? 'in_progress' : 'not_started';
  if (done >= total) return 'done';
  return 'in_progress';
}

export type CheckpointState = 'pass' | 'fail' | 'pending';
export function checkpointState(data: ProgressData, week: Week): CheckpointState {
  const c = data.checkpoints[week.n];
  return c?.result ?? 'pending';
}

export function weekStatus(data: ProgressData, week: Week): Status {
  const tDone = topicsDoneCount(data, week);
  const allTopics = tDone === week.topics.length;
  const dStatus = deliverableStatus(data, week);
  const cp = checkpointState(data, week);
  if (allTopics && dStatus === 'done' && cp === 'pass' && (week.topics.length > 0 || week.n === 15)) return 'done';
  if (dStatus === 'blocked') return 'blocked';
  const anyDeliv = (data.deliverables[week.n]?.checklist ?? []).some(Boolean) || dStatus !== 'not_started';
  const anyCp = (data.checkpoints[week.n]?.criteria ?? []).some(Boolean) || cp !== 'pending';
  if (tDone > 0 || anyDeliv || anyCp) return 'in_progress';
  return 'not_started';
}

/** Units of work in a week: each topic, the deliverable and the checkpoint. */
export function weekUnits(data: ProgressData, week: Week): { done: number; total: number } {
  const total = week.topics.length + 2;
  const done = topicsDoneCount(data, week) + deliverableFraction(data, week) + (checkpointState(data, week) === 'pass' ? 1 : 0);
  return { done, total };
}

export function weekPct(data: ProgressData, week: Week): number {
  const u = weekUnits(data, week);
  return Math.round((u.done / u.total) * 100);
}

export function overallPct(data: ProgressData): number {
  let done = 0;
  let total = 0;
  for (const w of CORE_WEEKS) {
    const u = weekUnits(data, w);
    done += u.done;
    total += u.total;
  }
  return total ? Math.round((done / total) * 100) : 0;
}

export function phasePct(data: ProgressData, phaseId: number): number {
  const phase = PHASES.find((p) => p.id === phaseId);
  if (!phase) return 0;
  let done = 0;
  let total = 0;
  for (const n of phase.weeks) {
    if (n > 14) continue;
    const w = WEEKS.find((x) => x.n === n)!;
    const u = weekUnits(data, w);
    done += u.done;
    total += u.total;
  }
  return total ? Math.round((done / total) * 100) : 0;
}

export function totalTopics(): number {
  return CORE_WEEKS.reduce((s, w) => s + w.topics.length, 0);
}

export function totalTopicsDone(data: ProgressData): number {
  return CORE_WEEKS.reduce((s, w) => s + topicsDoneCount(data, w), 0);
}

// ---------- Time ----------
export function minutesOn(data: ProgressData, date: string): number {
  return data.timeLogs.filter((l) => l.date === date).reduce((s, l) => s + l.minutes, 0);
}

export function minutesBetween(data: ProgressData, start: string, end: string): number {
  return data.timeLogs.filter((l) => l.date >= start && l.date <= end).reduce((s, l) => s + l.minutes, 0);
}

export function minutesForBlock(data: ProgressData, date: string, blockKey: string): number {
  return data.timeLogs.filter((l) => l.date === date && l.blockKey === blockKey).reduce((s, l) => s + l.minutes, 0);
}

export function hoursThisWeek(data: ProgressData, on: string = today()): number {
  const mon = mondayOf(on);
  return minutesBetween(data, mon, addDays(mon, 6)) / 60;
}

export function dailyHoursSeries(data: ProgressData, on: string = today()): { date: string; day: string; hours: number }[] {
  const mon = mondayOf(on);
  const names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return names.map((day, i) => {
    const date = addDays(mon, i);
    return { date, day, hours: Math.round((minutesOn(data, date) / 60) * 10) / 10 };
  });
}

// ---------- Streak ----------
/** A day counts if any tracked action happened. Mon–Sat only; Sundays neither count nor break the streak. */
export function isActiveDay(data: ProgressData, date: string): boolean {
  return (data.activity[date] ?? 0) > 0 || minutesOn(data, date) > 0;
}

export function streak(data: ProgressData, on: string = today()): number {
  let count = 0;
  let d = on;
  // if today is a workday with no activity yet, start counting from yesterday (today isn't over)
  if (weekdayOf(d) !== 0 && !isActiveDay(data, d)) d = addDays(d, -1);
  for (let i = 0; i < 800; i++) {
    if (weekdayOf(d) === 0) {
      d = addDays(d, -1);
      continue;
    }
    if (isActiveDay(data, d)) {
      count++;
      d = addDays(d, -1);
    } else break;
  }
  return count;
}

// ---------- Quizzes ----------
export function bestQuizScore(data: ProgressData, lessonId: string): { score: number; total: number } | null {
  const a = data.quizzes[lessonId];
  if (!a || a.length === 0) return null;
  return a.reduce((best, x) => (x.score / x.total > best.score / best.total ? x : best), a[0]);
}

export function quizAverage(data: ProgressData, from?: string, to?: string): number | null {
  const all = Object.values(data.quizzes)
    .flat()
    .filter((a) => {
      const d = a.at.slice(0, 10);
      return (!from || d >= from) && (!to || d <= to);
    });
  if (all.length === 0) return null;
  return Math.round((all.reduce((s, a) => s + a.score / a.total, 0) / all.length) * 100);
}

// ---------- Next up ----------
export function activeWeek(data: ProgressData, on: string = today()): Week {
  const n = Math.max(1, currentWeekNumber(data.settings.startDate, on));
  return WEEKS.find((w) => w.n === n) ?? WEEKS[0];
}

export function nextLesson(data: ProgressData, on: string = today()): { id: string; title: string; week: number } | null {
  const cw = activeWeek(data, on);
  const ordered = [...WEEKS.filter((w) => w.n >= cw.n), ...WEEKS.filter((w) => w.n < cw.n)];
  for (const w of ordered) {
    for (const t of w.topics) if (!isTopicDone(data, t.id)) return { ...t, week: w.n };
  }
  return null;
}

export function nextDeliverable(data: ProgressData, on: string = today()): { week: Week; due: string } | null {
  const cw = activeWeek(data, on);
  for (const w of CORE_WEEKS) {
    if (w.n < cw.n && deliverableStatus(data, w) === 'done') continue;
    if (deliverableStatus(data, w) !== 'done') {
      const { start } = weekDates(data.settings.startDate, w.n);
      return { week: w, due: addDays(start, 4) }; // Friday of that week (if start is Monday)
    }
  }
  return null;
}

export function upcomingCheckpoint(data: ProgressData): { week: Week; due: string } | null {
  for (const w of CORE_WEEKS) {
    if (checkpointState(data, w) !== 'pass') {
      const { start } = weekDates(data.settings.startDate, w.n);
      return { week: w, due: addDays(start, 4) };
    }
  }
  return null;
}

// ---------- Today’s tasks ----------
export interface DayTask {
  id: string;
  label: string;
  kind: 'topic' | 'deliverable' | 'checkpoint' | 'routine';
  ref?: string; // topic id or checklist index
  href?: string;
}

/** Spread a week’s work across Mon–Sat following the weekly rhythm. */
export function tasksForDay(data: ProgressData, week: Week, dow: number): DayTask[] {
  const tasks: DayTask[] = [];
  const topics = week.topics;
  const dayIdx = dow === 0 ? -1 : dow - 1; // Mon=0 .. Sat=5
  if (dow === 0) {
    tasks.push({ id: 'review', label: 'One-hour weekly review', kind: 'routine', href: '/review' });
    return tasks;
  }
  // topics across Mon–Thu
  topics.forEach((t, i) => {
    const day = Math.min(3, Math.floor((i * 4) / Math.max(1, topics.length)));
    if (day === dayIdx) tasks.push({ id: `topic:${t.id}`, label: `Lesson: ${t.title}`, kind: 'topic', ref: t.id, href: `/lesson/${t.id}` });
  });
  if (dayIdx === 0 && week.tools.length) {
    tasks.push({ id: 'setup-tools', label: `Set up tools: ${week.tools.map((x) => x.name).join(', ')}`, kind: 'routine', href: `/week/${week.n}#tools` });
  }
  // deliverable checklist across Tue–Fri
  const cl = week.deliverable.checklist;
  cl.forEach((item, i) => {
    const day = 1 + Math.min(3, Math.floor((i * 4) / Math.max(1, cl.length)));
    if (day === dayIdx) tasks.push({ id: `deliv:${i}`, label: item, kind: 'deliverable', ref: String(i), href: `/week/${week.n}#deliverable` });
  });
  if (dayIdx === 4) tasks.push({ id: 'checkpoint', label: `Run the checkpoint: ${week.checkpoint.summary}`, kind: 'checkpoint', href: `/week/${week.n}#checkpoint` });
  if (dayIdx === 5) {
    tasks.push({ id: 'publish', label: 'Publish this week’s work (Notion / LinkedIn post)', kind: 'routine' });
    topics.forEach((t) => {
      if (!isTopicDone(data, t.id)) tasks.push({ id: `topic:${t.id}`, label: `Catch up: ${t.title}`, kind: 'topic', ref: t.id, href: `/lesson/${t.id}` });
    });
  }
  tasks.push({ id: 'interview', label: 'Interview practice: 1 question out loud', kind: 'routine', href: '/interview' });
  return tasks;
}

export function isTaskDone(data: ProgressData, week: Week, date: string, task: DayTask): boolean {
  if (task.kind === 'topic' && task.ref) return isTopicDone(data, task.ref);
  if (task.kind === 'deliverable' && task.ref) return !!data.deliverables[week.n]?.checklist[Number(task.ref)];
  if (task.kind === 'checkpoint') return checkpointState(data, week) === 'pass';
  return !!data.todayChecks[date]?.[task.id];
}

export function scheduleFor(week: Week) {
  return buildSchedule(week);
}

// ---------- Jobs ----------
const RESPONDED: Application['stage'][] = ['interviewing', 'offer'];
export function callbackRate(apps: Application[]): { applied: number; callbacks: number; rate: number | null } {
  const applied = apps.filter((a) => a.stage !== 'wishlist');
  const callbacks = applied.filter((a) => a.callback || RESPONDED.includes(a.stage)).length;
  return { applied: applied.length, callbacks, rate: applied.length ? Math.round((callbacks / applied.length) * 100) : null };
}

export function outreachOn(data: ProgressData, date: string): number {
  return data.outreach[date] ?? 0;
}

export function outreachBetween(data: ProgressData, start: string, end: string): number {
  return Object.entries(data.outreach)
    .filter(([d]) => d >= start && d <= end)
    .reduce((s, [, n]) => s + n, 0);
}

export function weekStats(data: ProgressData, mondayISO: string) {
  const end = addDays(mondayISO, 6);
  const topicsDone = Object.values(data.topics).filter((t) => t.done && t.doneAt && t.doneAt.slice(0, 10) >= mondayISO && t.doneAt.slice(0, 10) <= end).length;
  return {
    hours: Math.round((minutesBetween(data, mondayISO, end) / 60) * 10) / 10,
    topicsDone,
    quizAvg: quizAverage(data, mondayISO, end),
    applications: data.applications.filter((a) => a.appliedOn && a.appliedOn >= mondayISO && a.appliedOn <= end).length,
    outreach: outreachBetween(data, mondayISO, end),
    mocks: data.mocks.filter((m) => m.date >= mondayISO && m.date <= end).length,
  };
}

export function isBeforeStart(data: ProgressData, on: string = today()): boolean {
  return parseISODate(on) < parseISODate(data.settings.startDate);
}
