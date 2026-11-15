import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  ProgressData,
  Settings,
  Status,
  Application,
  MockLog,
  Story,
  WeeklyReview,
  RiceIdea,
  TreeNode,
  EvalItem,
  Reflection,
  PortfolioProgress,
} from '../data/types';
import { WEEKS, PROJECTS, CASE_STUDY_CHECKLIST } from '../data/curriculum';
import { today, nextMonday } from '../lib/dates';
import { statusFromChecklist } from '../lib/progress';
import { uid } from '../lib/uid';

export const STORAGE_KEY = 'pm-path-state';

export function defaultData(): ProgressData {
  return {
    version: 1,
    settings: { name: 'Krupa', startDate: nextMonday(), dailyHours: 9, theme: 'system', apiKey: '' },
    topics: {},
    quizzes: {},
    lessonNotes: {},
    weekNotes: {},
    deliverables: {},
    checkpoints: {},
    timeLogs: [],
    activeTimer: null,
    todayChecks: {},
    reflections: {},
    activity: {},
    applications: [],
    outreach: {},
    mocks: [],
    stories: [],
    portfolio: {},
    weeklyReviews: [],
    sqlSolved: {},
    rice: [],
    metricTree: null,
    evals: [],
    templateDrafts: {},
    celebratedWeeks: [],
  };
}

/** Merge an unknown object onto defaults so missing keys never crash the app. */
export function normalize(input: unknown): ProgressData {
  const base = defaultData();
  if (!input || typeof input !== 'object') return base;
  const src = input as Partial<ProgressData>;
  const out: ProgressData = { ...base };
  for (const key of Object.keys(base) as (keyof ProgressData)[]) {
    const v = src[key];
    if (v === undefined || v === null) {
      if (key === 'activeTimer' || key === 'metricTree') (out as any)[key] = null;
      continue;
    }
    const b = base[key];
    if (Array.isArray(b)) {
      if (Array.isArray(v)) (out as any)[key] = v;
    } else if (typeof b === 'object' && b !== null) {
      if (typeof v === 'object' && !Array.isArray(v)) (out as any)[key] = key === 'settings' ? { ...base.settings, ...(v as object) } : v;
    } else if (key === 'activeTimer' || key === 'metricTree') {
      (out as any)[key] = v;
    } else {
      (out as any)[key] = v;
    }
  }
  out.version = 1;
  return out;
}

type Updater = (d: ProgressData) => Partial<ProgressData>;

interface Actions {
  set: (fn: Updater, track?: boolean) => void;
  updateSettings: (s: Partial<Settings>) => void;
  toggleTopic: (id: string, done?: boolean) => void;
  recordQuiz: (lessonId: string, score: number, total: number, answers: number[]) => void;
  setLessonNote: (id: string, text: string) => void;
  setWeekNote: (n: number, text: string) => void;
  toggleDeliverableItem: (n: number, i: number) => void;
  setDeliverable: (n: number, patch: { link?: string; status?: Status }) => void;
  toggleCheckpointCriterion: (n: number, i: number) => void;
  setCheckpoint: (n: number, patch: { result?: 'pass' | 'fail' | null; notes?: string }) => void;
  startTimer: (blockKey: string) => void;
  stopTimer: () => void;
  addManualTime: (date: string, blockKey: string, minutes: number) => void;
  removeTimeLog: (id: string) => void;
  toggleTodayCheck: (date: string, id: string) => void;
  setReflection: (date: string, r: Partial<Reflection>) => void;
  upsertApplication: (a: Application) => void;
  removeApplication: (id: string) => void;
  addOutreach: (date: string, delta: number) => void;
  addMock: (m: MockLog) => void;
  removeMock: (id: string) => void;
  upsertStory: (s: Story) => void;
  removeStory: (id: string) => void;
  setPortfolio: (id: string, patch: Partial<PortfolioProgress>) => void;
  saveWeeklyReview: (r: WeeklyReview) => void;
  removeWeeklyReview: (id: string) => void;
  markSqlSolved: (id: string) => void;
  setRice: (ideas: RiceIdea[]) => void;
  setMetricTree: (t: TreeNode | null) => void;
  setEvals: (e: EvalItem[]) => void;
  setTemplateDraft: (id: string, text: string) => void;
  markCelebrated: (n: number) => void;
  replaceAll: (d: ProgressData) => void;
  reset: () => void;
}

export type Store = ProgressData & Actions;

function bump(d: ProgressData): Record<string, number> {
  const t = today();
  return { ...d.activity, [t]: (d.activity[t] ?? 0) + 1 };
}

export const useStore = create<Store>()(
  persist(
    (setState, get) => {
      const set: Actions['set'] = (fn, track = true) => {
        const d = get();
        const patch = fn(d);
        setState(track ? { ...patch, activity: bump({ ...d, ...patch } as ProgressData) } : patch);
      };
      return {
        ...defaultData(),
        set,
        updateSettings: (s) => set((d) => ({ settings: { ...d.settings, ...s } }), false),
        toggleTopic: (id, done) =>
          set((d) => {
            const now = done ?? !d.topics[id]?.done;
            return { topics: { ...d.topics, [id]: { done: now, doneAt: now ? new Date().toISOString() : undefined } } };
          }),
        recordQuiz: (lessonId, score, total, answers) =>
          set((d) => ({ quizzes: { ...d.quizzes, [lessonId]: [...(d.quizzes[lessonId] ?? []), { at: new Date().toISOString(), score, total, answers }] } })),
        setLessonNote: (id, text) => set((d) => ({ lessonNotes: { ...d.lessonNotes, [id]: text } }), false),
        setWeekNote: (n, text) => set((d) => ({ weekNotes: { ...d.weekNotes, [n]: text } }), false),
        toggleDeliverableItem: (n, i) =>
          set((d) => {
            const week = WEEKS.find((w) => w.n === n)!;
            const cur = d.deliverables[n] ?? { checklist: [], link: '', status: 'not_started' as Status };
            const checklist = [...cur.checklist];
            checklist[i] = !checklist[i];
            const status = statusFromChecklist(checklist, week.deliverable.checklist.length, cur.status === 'done' ? 'in_progress' : cur.status);
            return { deliverables: { ...d.deliverables, [n]: { ...cur, checklist, status } } };
          }),
        setDeliverable: (n, patch) =>
          set((d) => {
            const cur = d.deliverables[n] ?? { checklist: [], link: '', status: 'not_started' as Status };
            return { deliverables: { ...d.deliverables, [n]: { ...cur, ...patch } } };
          }, patch.status !== undefined),
        toggleCheckpointCriterion: (n, i) =>
          set((d) => {
            const cur = d.checkpoints[n] ?? { criteria: [], result: null, notes: '' };
            const criteria = [...cur.criteria];
            criteria[i] = !criteria[i];
            return { checkpoints: { ...d.checkpoints, [n]: { ...cur, criteria } } };
          }),
        setCheckpoint: (n, patch) =>
          set((d) => {
            const cur = d.checkpoints[n] ?? { criteria: [], result: null, notes: '' };
            const next = { ...cur, ...patch };
            if (patch.result !== undefined) next.at = new Date().toISOString();
            return { checkpoints: { ...d.checkpoints, [n]: next } };
          }, patch.result !== undefined),
        startTimer: (blockKey) => {
          const d = get();
          if (d.activeTimer) get().stopTimer();
          set(() => ({ activeTimer: { blockKey, date: today(), startedAt: Date.now() } }), false);
        },
        stopTimer: () =>
          set((d) => {
            if (!d.activeTimer) return {};
            const minutes = Math.round((Date.now() - d.activeTimer.startedAt) / 60000);
            const logs = minutes > 0 ? [...d.timeLogs, { id: uid(), date: d.activeTimer.date, blockKey: d.activeTimer.blockKey, minutes }] : d.timeLogs;
            return { activeTimer: null, timeLogs: logs };
          }),
        addManualTime: (date, blockKey, minutes) =>
          set((d) => ({ timeLogs: [...d.timeLogs, { id: uid(), date, blockKey, minutes }] })),
        removeTimeLog: (id) => set((d) => ({ timeLogs: d.timeLogs.filter((l) => l.id !== id) }), false),
        toggleTodayCheck: (date, id) =>
          set((d) => ({ todayChecks: { ...d.todayChecks, [date]: { ...(d.todayChecks[date] ?? {}), [id]: !d.todayChecks[date]?.[id] } } })),
        setReflection: (date, r) =>
          set((d) => ({ reflections: { ...d.reflections, [date]: { ...{ shipped: '', hard: '', tomorrow: '' }, ...(d.reflections[date] ?? {}), ...r } } })),
        upsertApplication: (a) =>
          set((d) => {
            const exists = d.applications.some((x) => x.id === a.id);
            return { applications: exists ? d.applications.map((x) => (x.id === a.id ? a : x)) : [...d.applications, a] };
          }),
        removeApplication: (id) => set((d) => ({ applications: d.applications.filter((x) => x.id !== id) }), false),
        addOutreach: (date, delta) => set((d) => ({ outreach: { ...d.outreach, [date]: Math.max(0, (d.outreach[date] ?? 0) + delta) } }), delta > 0),
        addMock: (m) => set((d) => ({ mocks: [...d.mocks, m] })),
        removeMock: (id) => set((d) => ({ mocks: d.mocks.filter((x) => x.id !== id) }), false),
        upsertStory: (s) =>
          set((d) => {
            const exists = d.stories.some((x) => x.id === s.id);
            return { stories: exists ? d.stories.map((x) => (x.id === s.id ? s : x)) : [...d.stories, s] };
          }),
        removeStory: (id) => set((d) => ({ stories: d.stories.filter((x) => x.id !== id) }), false),
        setPortfolio: (id, patch) =>
          set((d) => {
            const proj = PROJECTS.find((p) => p.id === id)!;
            const cur: PortfolioProgress = d.portfolio[id] ?? {
              milestones: proj.milestones.map(() => false),
              caseChecklist: CASE_STUDY_CHECKLIST.map(() => false),
              links: [],
              status: 'not_started',
            };
            return { portfolio: { ...d.portfolio, [id]: { ...cur, ...patch } } };
          }),
        saveWeeklyReview: (r) =>
          set((d) => {
            const others = d.weeklyReviews.filter((x) => x.weekStart !== r.weekStart);
            return { weeklyReviews: [...others, r].sort((a, b) => b.weekStart.localeCompare(a.weekStart)) };
          }),
        removeWeeklyReview: (id) => set((d) => ({ weeklyReviews: d.weeklyReviews.filter((x) => x.id !== id) }), false),
        markSqlSolved: (id) => set((d) => (d.sqlSolved[id] ? {} : { sqlSolved: { ...d.sqlSolved, [id]: new Date().toISOString() } })),
        setRice: (ideas) => set(() => ({ rice: ideas }), false),
        setMetricTree: (tr) => set(() => ({ metricTree: tr }), false),
        setEvals: (e) => set(() => ({ evals: e }), false),
        setTemplateDraft: (id, text) => set((d) => ({ templateDrafts: { ...d.templateDrafts, [id]: text } }), false),
        markCelebrated: (n) => set((d) => ({ celebratedWeeks: [...new Set([...d.celebratedWeeks, n])] }), false),
        replaceAll: (data) => setState({ ...normalize(data) }),
        reset: () => setState({ ...defaultData() }),
      };
    },
    {
      name: STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => {
        const out: Partial<ProgressData> = {};
        for (const k of Object.keys(defaultData()) as (keyof ProgressData)[]) (out as any)[k] = s[k];
        return out as ProgressData;
      },
      merge: (persisted, current) => ({ ...current, ...normalize(persisted) }),
    },
  ),
);

/** Snapshot of just the data (no actions). */
export function getData(): ProgressData {
  const s = useStore.getState();
  const out: Partial<ProgressData> = {};
  for (const k of Object.keys(defaultData()) as (keyof ProgressData)[]) (out as any)[k] = s[k];
  return out as ProgressData;
}
