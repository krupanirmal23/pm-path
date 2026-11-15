import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatDate } from '../../lib/dates';
import { categoryLabel, type QCategory } from '../../data/questions';
import { Button, Card, Chip, EmptyState, Stat, useConfirm } from '../../components/ui';
import { RUBRIC } from './MockMode';

const VERDICT = { advance: { label: 'Would advance', color: 'mint' as const }, borderline: { label: 'Borderline', color: 'butter' as const }, no: { label: 'Would not advance', color: 'pink' as const } };

export function MockLogView() {
  const mocks = useStore((s) => s.mocks);
  const remove = useStore((s) => s.removeMock);
  const confirm = useConfirm();
  if (!mocks.length)
    return (
      <EmptyState title="No mocks logged yet">
        Run one in <Link to="/interview/mock" className="underline">Mock mode</Link>. Aim for at least 3 a week from Week 13.
      </EmptyState>
    );
  const avg = (id: string) => {
    const xs = mocks.map((m) => m.scores[id]).filter(Boolean);
    return xs.length ? (xs.reduce((a, b) => a + b, 0) / xs.length).toFixed(1) : '–';
  };
  const recent = [...mocks].sort((a, b) => b.date.localeCompare(a.date));
  const advanceRate = Math.round((mocks.filter((m) => m.verdict === 'advance').length / mocks.length) * 100);
  return (
    <div className="space-y-5">
      <Card className="grid gap-4 p-5 sm:grid-cols-4">
        <Stat label="Mocks" value={mocks.length} />
        <Stat label="Minutes practised" value={mocks.reduce((a, m) => a + m.durationMin, 0)} />
        <Stat label="Would advance" value={`${advanceRate}%`} />
        <Stat label="Weakest area" value={[...RUBRIC].sort((a, b) => Number(avg(a.id)) - Number(avg(b.id)))[0].label} />
      </Card>
      <Card className="p-5">
        <p className="nb-label mb-2">Average score by dimension (1–4)</p>
        <ul className="grid gap-2 sm:grid-cols-3">
          {RUBRIC.map((r) => (
            <li key={r.id} className="flex justify-between rounded-[8px] border-2 border-line px-3 py-1.5 text-sm">
              <span>{r.label}</span>
              <span className="font-mono font-bold">{avg(r.id)}</span>
            </li>
          ))}
        </ul>
      </Card>
      <ul className="space-y-3">
        {recent.map((m) => (
          <li key={m.id}>
            <Card className="p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Chip>{formatDate(m.date)}</Chip>
                <Chip>{categoryLabel(m.category as QCategory)}</Chip>
                <Chip color={VERDICT[m.verdict].color}>{VERDICT[m.verdict].label}</Chip>
                <span className="text-sm text-muted">{m.durationMin} min</span>
                <Button size="sm" variant="ghost" className="ml-auto" aria-label="Delete mock" onClick={() => confirm('Delete this mock log?') && remove(m.id)}>
                  <Trash2 size={14} aria-hidden />
                </Button>
              </div>
              <p className="mt-2 font-semibold">{m.question}</p>
              <p className="mt-1 text-sm text-muted">{RUBRIC.map((r) => `${r.label} ${m.scores[r.id] ?? '–'}`).join(' · ')}</p>
              {m.notes && <p className="mt-2 whitespace-pre-wrap text-sm">{m.notes}</p>}
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
