import { useEffect, useMemo, useRef, useState } from 'react';
import { Plus, Trash2, Shuffle, Play, Pause, RotateCcw } from 'lucide-react';
import { Button, Callout, Card, CardTitle, Input, Select, Textarea } from '../components/ui';
import { uid } from '../lib/uid';

type Op = '×' | '÷' | '+' | '−';
interface Step {
  id: string;
  op: Op;
  label: string;
  value: number;
  unit: string;
}

const PROMPTS = [
  'How many food delivery orders happen in Bengaluru per day?',
  'How many bike-taxi rides happen in Bengaluru per day?',
  'Estimate annual revenue for an AI resume-review subscription for Indian college students.',
  'How many UPI transactions happen in India per day?',
  'How many dosas are sold in Bengaluru every day?',
  'Estimate the market for pet insurance in urban India.',
  'How many smartphones are sold in India each year?',
  'How many people take the Bengaluru metro on a weekday?',
  'Estimate the annual revenue of a quick-commerce dark store.',
  'How many Zerodha-style trading accounts are opened in India each month?',
];

const TEMPLATE: Step[] = [
  { id: 'a', op: '×', label: 'Population (Bengaluru)', value: 13000000, unit: 'people' },
  { id: 'b', op: '÷', label: 'People per household', value: 4, unit: '' },
  { id: 'c', op: '×', label: '% households ordering online', value: 0.4, unit: 'share' },
  { id: 'd', op: '×', label: 'Orders per household per week', value: 1.5, unit: '' },
  { id: 'e', op: '÷', label: 'Days per week', value: 7, unit: '' },
];

const KEY = 'pm-path-estimation';
const fmt = (n: number) => (Math.abs(n) >= 1e7 ? `${(n / 1e7).toFixed(2)} crore` : Math.abs(n) >= 1e5 ? `${(n / 1e5).toFixed(2)} lakh` : n.toLocaleString('en-IN', { maximumFractionDigits: 2 }));

export function computeSteps(steps: Step[]): number {
  return steps.reduce((acc, s, i) => {
    if (i === 0) return s.value;
    if (s.op === '×') return acc * s.value;
    if (s.op === '÷') return s.value === 0 ? NaN : acc / s.value;
    if (s.op === '+') return acc + s.value;
    return acc - s.value;
  }, 0);
}

export default function Estimation() {
  const saved = (() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || 'null');
    } catch {
      return null;
    }
  })();
  const [prompt, setPrompt] = useState<string>(saved?.prompt ?? PROMPTS[0]);
  const [steps, setSteps] = useState<Step[]>(saved?.steps ?? TEMPLATE);
  const [notes, setNotes] = useState<string>(saved?.notes ?? 'Clarify: …\nApproach: top-down\nSanity check: …');
  const [seconds, setSeconds] = useState(12 * 60);
  const [running, setRunning] = useState(false);
  const tick = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ prompt, steps, notes }));
    } catch {
      /* ignore */
    }
  }, [prompt, steps, notes]);

  useEffect(() => {
    if (!running) return;
    tick.current = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(tick.current);
  }, [running]);
  useEffect(() => {
    if (seconds === 0) setRunning(false);
  }, [seconds]);

  const result = useMemo(() => computeSteps(steps), [steps]);
  const update = (id: string, patch: Partial<Step>) => setSteps(steps.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle>Question</CardTitle>
          <div className="flex items-center gap-2">
            <span className={`nb-chip font-mono text-base ${seconds < 120 ? 'bg-pink' : 'bg-butter'}`} aria-live="off" aria-label={`Timer ${mm} minutes ${ss} seconds`}>
              {mm}:{ss}
            </span>
            <Button size="sm" onClick={() => setRunning((r) => !r)} aria-label={running ? 'Pause timer' : 'Start timer'}>
              {running ? <Pause size={14} aria-hidden /> : <Play size={14} aria-hidden />}
            </Button>
            <Button size="sm" onClick={() => { setRunning(false); setSeconds(12 * 60); }} aria-label="Reset timer">
              <RotateCcw size={14} aria-hidden />
            </Button>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <Input aria-label="Estimation question" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
          <Button onClick={() => setPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)])} aria-label="Random question">
            <Shuffle size={16} aria-hidden />
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Card className="p-5">
          <CardTitle className="mb-3">Build the formula, one assumption per line</CardTitle>
          <ol className="space-y-2">
            {steps.map((s, i) => (
              <li key={s.id} className="grid grid-cols-[56px_minmax(0,1fr)_minmax(0,1fr)_36px] items-center gap-2 border-b-2 border-line/20 pb-2 sm:grid-cols-[64px_minmax(0,1fr)_120px_80px_36px] sm:border-0 sm:pb-0">
                {i === 0 ? (
                  <span className="order-1 text-center font-display text-sm font-bold sm:order-none">Start</span>
                ) : (
                  <Select aria-label="Operator" className="order-1 sm:order-none" value={s.op} onChange={(e) => update(s.id, { op: e.target.value as Op })}>
                    {(['×', '÷', '+', '−'] as Op[]).map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </Select>
                )}
                <Input aria-label="Assumption" className="order-2 col-span-2 sm:order-none sm:col-span-1" value={s.label} onChange={(e) => update(s.id, { label: e.target.value })} />
                <Input aria-label="Value" className="order-4 col-start-2 sm:order-none sm:col-start-auto" type="number" step="any" value={s.value} onChange={(e) => update(s.id, { value: Number(e.target.value) })} />
                <Input aria-label="Unit" className="order-5 sm:order-none" value={s.unit} onChange={(e) => update(s.id, { unit: e.target.value })} placeholder="unit" />
                <Button size="sm" variant="ghost" className="order-3 sm:order-none" onClick={() => setSteps(steps.filter((x) => x.id !== s.id))} aria-label="Remove step" disabled={steps.length <= 1}>
                  <Trash2 size={14} aria-hidden />
                </Button>
              </li>
            ))}
          </ol>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm" onClick={() => setSteps([...steps, { id: uid(), op: '×', label: 'New assumption', value: 1, unit: '' }])}>
              <Plus size={14} aria-hidden /> Add step
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setSteps(TEMPLATE)}>
              Load example
            </Button>
          </div>
          <div className="mt-4 rounded-[10px] border-2 border-line bg-mint p-4 text-onpastel" aria-live="polite">
            <div className="font-display text-xs font-bold uppercase tracking-wide">Result</div>
            <div className="font-display text-3xl font-bold">{Number.isFinite(result) ? fmt(result) : '—'}</div>
          </div>
        </Card>
        <div className="space-y-4">
          <Card className="p-5">
            <CardTitle className="mb-2">Notes</CardTitle>
            <Textarea aria-label="Estimation notes" rows={9} value={notes} onChange={(e) => setNotes(e.target.value)} className="font-mono text-sm" />
          </Card>
          <Callout kind="tip">Clarify the unit and scope → write the formula → segment where behaviour differs → round numbers → sanity-check with a bottom-up route → give a range and name your shakiest assumption.</Callout>
        </div>
      </div>
    </div>
  );
}
