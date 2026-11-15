import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Timer } from 'lucide-react';
import { QUESTIONS, Q_CATEGORIES, categoryLabel, type Difficulty, type Question } from '../../data/questions';
import { useStore } from '../../store/useStore';
import { Card, Chip, Input, Reveal, Select, cx } from '../../components/ui';

const DIFF_COLOR: Record<Difficulty, 'mint' | 'butter' | 'pink'> = { Easy: 'mint', Medium: 'butter', Hard: 'pink' };

export function QuestionCard({ q, practised }: { q: Question; practised?: number }) {
  const color = Q_CATEGORIES.find((c) => c.id === q.category)?.color;
  return (
    <Card className="p-4">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <Chip color={color}>{categoryLabel(q.category)}</Chip>
        <Chip color={DIFF_COLOR[q.difficulty]}>{q.difficulty}</Chip>
        {!!practised && <Chip>Practised {practised}×</Chip>}
      </div>
      <p className="font-semibold leading-snug">{q.q}</p>
      <div className="mt-3 space-y-2">
        <Reveal label="Show answer outline">
          <ol className="list-decimal space-y-1 pl-5 text-sm">
            {q.outline.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ol>
          <p className="nb-label mt-3">What interviewers look for</p>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {q.lookFor.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <p className="nb-label mt-3">Pitfalls</p>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {q.pitfalls.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </Reveal>
        <Link to={`/interview/mock?q=${q.id}`} className="inline-flex items-center gap-1 text-sm font-semibold underline-offset-2 hover:underline">
          <Timer size={14} aria-hidden /> Practise this in mock mode
        </Link>
      </div>
    </Card>
  );
}

export function QuestionBank() {
  const mocks = useStore((s) => s.mocks);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const [diff, setDiff] = useState('all');
  const [limit, setLimit] = useState(30);
  const practised = useMemo(() => {
    const m: Record<string, number> = {};
    for (const x of mocks) if (x.questionId) m[x.questionId] = (m[x.questionId] ?? 0) + 1;
    return m;
  }, [mocks]);
  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return QUESTIONS.filter((x) => (cat === 'all' || x.category === cat) && (diff === 'all' || x.difficulty === diff) && (!s || x.q.toLowerCase().includes(s)));
  }, [q, cat, diff]);
  return (
    <div>
      <p className="mb-4 text-muted">
        {QUESTIONS.length} questions. Try answering out loud first, then compare with the outline. Reading answers without practising is the most common prep mistake.
      </p>
      <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative md:w-72">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
          <Input aria-label="Search questions" placeholder="Search questions…" value={q} onChange={(e) => { setQ(e.target.value); setLimit(30); }} className="pl-9" />
        </div>
        <Select aria-label="Difficulty" value={diff} onChange={(e) => { setDiff(e.target.value); setLimit(30); }} className="md:w-40">
          <option value="all">All levels</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </Select>
      </div>
      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {[{ id: 'all', label: 'All' }, ...Q_CATEGORIES].map((c) => {
          const n = c.id === 'all' ? QUESTIONS.length : QUESTIONS.filter((x) => x.category === c.id).length;
          return (
            <button key={c.id} onClick={() => { setCat(c.id); setLimit(30); }} aria-pressed={cat === c.id} className={cx('nb-chip cursor-pointer', cat === c.id && 'bg-butter text-onpastel')}>
              {c.label} <span className="opacity-70">{n}</span>
            </button>
          );
        })}
      </div>
      <p className="mb-3 text-sm text-muted" aria-live="polite">{shown.length} shown</p>
      <ul className="grid gap-4 lg:grid-cols-2">
        {shown.slice(0, limit).map((x) => (
          <li key={x.id}>
            <QuestionCard q={x} practised={practised[x.id]} />
          </li>
        ))}
      </ul>
      {shown.length > limit && (
        <div className="mt-5 text-center">
          <button className="nb-btn" onClick={() => setLimit((l) => l + 30)}>
            Show more ({shown.length - limit} left)
          </button>
        </div>
      )}
    </div>
  );
}
