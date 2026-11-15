// ---------- Curriculum ----------
export type PhaseId = 1 | 2 | 3 | 4;
export type Pastel = 'lavender' | 'pink' | 'sky' | 'mint' | 'butter' | 'peach';

export interface Phase {
  id: PhaseId;
  title: string;
  color: Pastel;
  weeks: number[];
  summary: string;
}

export interface Topic {
  /** Stable id; also the lesson id and the lesson file name. */
  id: string;
  title: string;
}

export interface ToolRef {
  /** Stable id; also the tool guide file name. */
  id: string;
  name: string;
  /** What she uses it for this week. */
  use: string;
  /** Built-in tools link to a route instead of a guide file. */
  builtIn?: string;
}

export type BlockKind =
  | 'learn'
  | 'tools'
  | 'deliverable'
  | 'interview'
  | 'writeup'
  | 'lunch'
  | 'portfolio'
  | 'applications'
  | 'practice'
  | 'mocks'
  | 'build';

export interface ScheduleBlock {
  key: string;
  label: string;
  kind: BlockKind;
  start: string; // "09:00"
  end: string; // "11:30"
  hours: number;
}

export type ProjectId = 'P1' | 'P2' | 'P3' | 'P4';

export interface Week {
  n: number; // 1..15 (15 = "Week 15+")
  phase: PhaseId;
  title: string;
  goal: string;
  topics: Topic[];
  tools: ToolRef[];
  deliverable: {
    title: string;
    description: string;
    checklist: string[];
    project?: ProjectId;
  };
  checkpoint: { summary: string; criteria: string[] };
  /** Daily split in hours, if it differs from the standard day. */
  split?: { kind: BlockKind; label: string; hours: number }[];
}

// ---------- Progress state ----------
export type Status = 'not_started' | 'in_progress' | 'done' | 'blocked';

export interface QuizAttempt {
  at: string; // ISO
  score: number;
  total: number;
  answers: number[]; // chosen option index per question
}

export interface DeliverableProgress {
  checklist: boolean[];
  link: string;
  status: Status;
}

export interface CheckpointProgress {
  criteria: boolean[];
  result: 'pass' | 'fail' | null;
  notes: string;
  at?: string;
}

export interface TimeLog {
  id: string;
  date: string; // yyyy-mm-dd
  blockKey: string;
  minutes: number;
}

export interface ActiveTimer {
  blockKey: string;
  date: string;
  startedAt: number; // epoch ms
}

export interface Reflection {
  shipped: string;
  hard: string;
  tomorrow: string;
}

export type AppStage = 'wishlist' | 'applied' | 'referred' | 'interviewing' | 'offer' | 'rejected';

export interface Application {
  id: string;
  company: string;
  role: string;
  link: string;
  referral: string;
  stage: AppStage;
  appliedOn: string;
  updatedOn: string;
  nextStep: string;
  notes: string;
  callback: boolean;
}

export interface MockLog {
  id: string;
  date: string;
  questionId?: string;
  question: string;
  category: string;
  durationMin: number;
  scores: Record<string, number>; // rubric dimension -> 1..4
  verdict: 'advance' | 'borderline' | 'no';
  notes: string;
}

export interface Story {
  id: string;
  title: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  tags: string[];
}

export interface PortfolioProgress {
  milestones: boolean[];
  caseChecklist: boolean[];
  links: { label: string; url: string }[];
  status: Status;
}

export interface WeeklyReview {
  id: string;
  weekStart: string; // Monday yyyy-mm-dd
  savedAt: string;
  answers: Record<string, string>;
  stats: { hours: number; topicsDone: number; quizAvg: number | null; applications: number; outreach: number; mocks: number };
}

export interface RiceIdea {
  id: string;
  name: string;
  reach: number;
  impact: number;
  confidence: number; // percent
  effort: number;
}

export interface TreeNode {
  id: string;
  label: string;
  kind: 'north' | 'input' | 'guardrail' | 'sub';
  children: TreeNode[];
}

export interface EvalItem {
  id: string;
  input: string;
  output: string;
  version: 'v1' | 'v2';
  label: 'pass' | 'fail' | null;
  category: string;
  judge: 'pass' | 'fail' | null;
}

export interface Settings {
  name: string;
  startDate: string; // yyyy-mm-dd
  dailyHours: number;
  theme: 'light' | 'dark' | 'system';
  apiKey: string;
}

export interface ProgressData {
  version: 1;
  settings: Settings;
  topics: Record<string, { done: boolean; doneAt?: string }>;
  quizzes: Record<string, QuizAttempt[]>;
  lessonNotes: Record<string, string>;
  weekNotes: Record<string, string>;
  deliverables: Record<string, DeliverableProgress>;
  checkpoints: Record<string, CheckpointProgress>;
  timeLogs: TimeLog[];
  activeTimer: ActiveTimer | null;
  todayChecks: Record<string, Record<string, boolean>>; // date -> taskId -> done
  reflections: Record<string, Reflection>;
  activity: Record<string, number>; // date -> count of tracked actions
  applications: Application[];
  outreach: Record<string, number>; // date -> messages sent
  mocks: MockLog[];
  stories: Story[];
  portfolio: Record<string, PortfolioProgress>;
  weeklyReviews: WeeklyReview[];
  sqlSolved: Record<string, string>; // problemId -> ISO solved time
  rice: RiceIdea[];
  metricTree: TreeNode | null;
  evals: EvalItem[];
  templateDrafts: Record<string, string>;
  celebratedWeeks: number[];
}
