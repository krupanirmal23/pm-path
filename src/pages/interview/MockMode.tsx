import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pause, Play, RotateCcw, Shuffle, Save } from 'lucide-react';
import { QUESTIONS, Q_CATEGORIES, categoryLabel, type QCategory, type Question } from '../../data/questions';
import { useStore } from '../../store/useStore';
import { uid } from '../../lib/uid';
import { today } from '../../lib/dates';
import { Button, Callout, Card, CardTitle, Chip, Field, ProgressBar, Reveal, Select, Textarea, cx } from '../../components/ui';
import { fmt, useStopwatch } from './useTimer';
import type { MockLog } from '../../data/types';

export const RUBRIC: { id: string; label: string; hint: string }[] = [
  { id: 'structure', label: 'Structure', hint: 'Clear plan, signposted, easy to follow' },
  { id: 'users', label: 'User focus', hint: 'Picked a user with a reason; real needs' },
  { id: 'ideas', label: 'Ideas & depth', hint: 'Creative but grounded solutions or analysis' },
  { id: 'tradeoffs', label: 'Prioritisation', hint: 'Made choices and explained trade-offs' },
  { id: 'metrics', label: 'Metrics', hint: 'Measurable success and guardrails' },
  { id: 'communication', label: 'Communication', hint: 'Concise, confident, checked in with interviewer' },
];

const SCALE = ['', 'Weak', 'Mixed', 'Good', 'Strong'];

const FULL_PHASES = [
  { label: 'Intro & tell me about yourself', min: 5, prompt: '90-second pitch: present → past → proof → why PM.' },
  { label: 'Clarify the question', min: 4, prompt: 'Ask 2–3 clarifying questions: goal, scope, constraints.' },
  { label: 'Users & needs', min: 8, prompt: 'List segments, pick one with a reason, list needs, choose one.' },
  { label: 'Solutions', min: 10, prompt: 'Brainstorm 3+ ideas, including one bold one. Then pick.' },
  { label: 'Trade-offs & metrics', min: 8, prompt: 'Risks, trade-offs, success metric and guardrail.' },
  { label: 'Summary', min: 3, prompt: 'Recap in 30 seconds: user, problem, solution, metric.' },
  { label: 'Your questions', min: 7, prompt: 'Ask 2 thoughtful questions about the team or product.' },
];

function pickRandom(cat: QCategory | 'any', exclude?: string): Question {
  const pool = QUESTIONS.filter((q) => (cat === 'any' || q.category === cat) && q.id !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}

export function MockMode() {
  const [params] = useSearchParams();
  const addMock = useStore((s) => s.addMock);
  const [cat, setCat] = useState<QCategory | 'any'>('any');
  const [mode, setMode] = useState<'full' | 'single'>('full');
  const [singleMin, setSingleMin] = useState(15);
  const [question, setQuestion] = useState<Question>(() => QUESTIONS.find((q) => q.id === params.get('q')) ?? pickRandom('any'));
  const sw = useStopwatch();
  const [scores, setScores] = useState<Record<string, number>>({});
  const [verdict, setVerdict] = useState<MockLog['verdict']>('borderline');
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  const totalMs = (mode === 'full' ? FULL_PHASES.reduce((a, p) => a + p.min, 0) : singleMin) * 60000;
  const phase = useMemo(() => {
    if (mode !== 'full') return null;
    let acc = 0;
    for (let i = 0; i < FULL_PHASES.length; i++) {
      acc += FULL_PHASES[i].min * 60000;
      if (sw.elapsed < acc) return { i, endsIn: acc - sw.elapsed };
    }
    return { i: FULL_PHASES.length - 1, endsIn: 0 };
  }, [mode, sw.elapsed]);
  const remaining = totalMs - sw.elapsed;
  const allScored = RUBRIC.every((r) => scores[r.id]);

  const newQuestion = () => {
    setQuestion(pickRandom(cat, question.id));
    sw.reset();
    setScores({});
    setNotes('');
    setSaved(false);
  };

  const save = () => {
    addMock({
      id: uid(),
      date: today(),
      questionId: question.id,
      question: question.q,
      category: question.category,
      durationMin: Math.max(1, Math.round(sw.elapsed / 60000)),
      scores,
      verdict,
      notes,
    });
    setSaved(true);
    sw.pause();
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0 space-y-4">
        <Card className="flex flex-wrap items-end gap-3 p-4">
          <Field label="Category">
            {(id) => (
              <Select id={id} value={cat} onChange={(e) => setCat(e.target.value as QCategory | 'any')} className="w-52">
                <option value="any">Any category</option>
                {Q_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </Select>
            )}
          </Field>
          <Field label="Format">
            {(id) => (
              <Select id={id} value={mode} onChange={(e) => { setMode(e.target.value as 'full' | 'single'); sw.reset(); }} className="w-52">
                <option value="full">Full interview (45 min)</option>
                <option value="single">Single question</option>
              </Select>
            )}
          </Field>
          {mode === 'single' && (
            <Field label="Minutes">
              {(id) => (
                <Select id={id} value={singleMin} onChange={(e) => { setSingleMin(Number(e.target.value)); sw.reset(); }} className="w-28">
                  {[5, 10, 15, 20, 25].map((m) => <option key={m} value={m}>{m}</option>)}
                </Select>
              )}
            </Field>
          )}
          <Button onClick={newQuestion}>
            <Shuffle size={16} aria-hidden /> Random question
          </Button>
        </Card>

        <Card className="p-6" color="lavender">
          <Chip className="mb-2 bg-surface">{categoryLabel(question.category)} · {question.difficulty}</Chip>
          <p className="font-display text-2xl font-bold leading-snug text-onpastel">{question.q}</p>
        </Card>

        <Card className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="nb-label">{remaining >= 0 ? 'Time left' : 'Over time'}</p>
              <p className={cx('font-mono text-5xl font-bold tabular-nums', remaining < 0 && 'inline-block rounded-[8px] bg-pink px-2 text-onpastel')} aria-live="off">{fmt(remaining)}</p>
            </div>
            <div className="flex gap-2">
              {sw.running ? (
                <Button onClick={sw.pause}><Pause size={16} aria-hidden /> Pause</Button>
              ) : (
                <Button variant="primary" onClick={sw.start}><Play size={16} aria-hidden /> {sw.elapsed ? 'Resume' : 'Start'}</Button>
              )}
              <Button variant="ghost" onClick={sw.reset} aria-label="Reset timer"><RotateCcw size={16} aria-hidden /></Button>
            </div>
          </div>
          <ProgressBar value={Math.min(100, (sw.elapsed / totalMs) * 100)} color="butter" className="mt-4" label="Interview progress" />
          {mode === 'full' && phase && (
            <ol className="mt-4 grid gap-2 sm:grid-cols-2">
              {FULL_PHASES.map((p, i) => (
                <li key={p.label} className={cx('rounded-[8px] border-2 px-3 py-2 text-sm', i === phase.i ? 'border-line bg-butter text-onpastel' : i < phase.i ? 'border-transparent bg-mint/60 text-onpastel' : 'border-line/30')}>
                  <div className="flex justify-between gap-2 font-semibold">
                    <span>{p.label}</span>
                    <span className="font-mono">{i === phase.i ? fmt(phase.endsIn) : `${p.min}m`}</span>
                  </div>
                  {i === phase.i && <p className="mt-1">{p.prompt}</p>}
                </li>
              ))}
            </ol>
          )}
          {mode === 'single' && <p className="mt-3 text-sm text-muted">Answer out loud as if an interviewer is listening. Record yourself on your phone if you can.</p>}
        </Card>

        <Reveal label="Show the answer outline (after you finish)">
          <ol className="list-decimal space-y-1 pl-5 text-sm">
            {question.outline.map((x) => <li key={x}>{x}</li>)}
          </ol>
          <p className="nb-label mt-3">What interviewers look for</p>
          <ul className="list-disc pl-5 text-sm">{question.lookFor.map((x) => <li key={x}>{x}</li>)}</ul>
          <p className="nb-label mt-3">Pitfalls</p>
          <ul className="list-disc pl-5 text-sm">{question.pitfalls.map((x) => <li key={x}>{x}</li>)}</ul>
        </Reveal>
      </div>

      <aside className="space-y-4">
        <Card className="space-y-4 p-5">
          <CardTitle>Score yourself</CardTitle>
          {RUBRIC.map((r) => (
            <fieldset key={r.id}>
              <legend className="text-sm font-semibold">{r.label}</legend>
              <p className="text-xs text-muted">{r.hint}</p>
              <div className="mt-1 flex gap-1.5">
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    onClick={() => setScores((s) => ({ ...s, [r.id]: n }))}
                    aria-pressed={scores[r.id] === n}
                    aria-label={`${r.label}: ${n} ${SCALE[n]}`}
                    className={cx('flex-1 rounded-[8px] border-2 border-line py-1 text-xs font-semibold', scores[r.id] === n ? 'bg-butter text-onpastel' : 'bg-surface hover:bg-butter/40')}
                  >
                    {n} <span className="hidden sm:inline">{SCALE[n]}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          ))}
          <Field label="Verdict">
            {(id) => (
              <Select id={id} value={verdict} onChange={(e) => setVerdict(e.target.value as MockLog['verdict'])}>
                <option value="advance">Would advance</option>
                <option value="borderline">Borderline</option>
                <option value="no">Would not advance</option>
              </Select>
            )}
          </Field>
          <Field label="Notes: what to fix next time">
            {(id) => <Textarea id={id} rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />}
          </Field>
          <Button variant="primary" className="w-full" disabled={!allScored || saved} onClick={save}>
            <Save size={16} aria-hidden /> {saved ? 'Saved to mock log' : 'Save to mock log'}
          </Button>
          {!allScored && <p className="text-xs text-muted">Score all six dimensions to save.</p>}
        </Card>
        <Callout kind="tip">Better still: ask a friend to read the question and score you with this rubric. Self-scores tend to be generous.</Callout>
      </aside>
    </div>
  );
}
