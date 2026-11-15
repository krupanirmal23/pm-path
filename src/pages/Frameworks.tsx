import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { FRAMEWORKS, FRAMEWORK_CATEGORIES, frameworkById, type Framework } from '../data/frameworks';
import { renderMarkdown } from '../lib/markdown';
import { Card, CardTitle, Chip, Input, PageHeader, cx } from '../components/ui';
import { NotFound } from './NotFound';

export const FW_COLOR: Record<string, 'lavender' | 'sky' | 'mint' | 'peach' | 'butter' | 'pink'> = {
  Discovery: 'lavender',
  Strategy: 'lavender',
  Prioritisation: 'lavender',
  Design: 'lavender',
  Execution: 'lavender',
  Metrics: 'sky',
  AI: 'mint',
  Interview: 'peach',
};

function FrameworkList() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return FRAMEWORKS.filter((f) => (cat === 'All' || f.category === cat) && (!s || `${f.name} ${f.oneLiner} ${f.what}`.toLowerCase().includes(s)));
  }, [q, cat]);
  return (
    <div>
      <PageHeader title="Frameworks" kicker={<Chip color="butter">{FRAMEWORKS.length} frameworks</Chip>}>
        Each one explains what it is, when to use it, when not to, the steps, an Indian worked example and common mistakes. Learn the thinking, not the acronyms.
      </PageHeader>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative md:w-72">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
          <Input aria-label="Filter frameworks" placeholder="Filter frameworks…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {['All', ...FRAMEWORK_CATEGORIES].map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={cx('nb-chip cursor-pointer', cat === c && 'bg-butter text-onpastel')}>
              {c}
            </button>
          ))}
        </div>
      </div>
      {shown.length === 0 ? (
        <p className="text-muted">No frameworks match “{q}”.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((f) => (
            <li key={f.id}>
              <Link to={`/frameworks/${f.id}`} className="block h-full rounded-[10px]">
                <Card hover className="flex h-full flex-col p-5">
                  <div className="mb-2 flex gap-2">
                    <Chip color={FW_COLOR[f.category]}>{f.category}</Chip>
                    <Chip>Week {f.week}</Chip>
                  </div>
                  <h2 className="text-lg font-bold leading-snug">{f.name}</h2>
                  <p className="mt-1 flex-1 text-sm text-muted">{f.oneLiner}</p>
                  <ArrowRight size={18} className="mt-3 self-end" aria-hidden />
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  );
}

function FrameworkDetail({ f }: { f: Framework }) {
  const exampleHtml = useMemo(() => renderMarkdown(f.example.body), [f.example.body]);
  const related = FRAMEWORKS.filter((x) => x.category === f.category && x.id !== f.id).slice(0, 4);
  useEffect(() => {
    document.title = `${f.name} · PM Path`;
    return () => {
      document.title = 'PM Path';
    };
  }, [f.name]);
  return (
    <div>
      <Link to="/frameworks" className="mb-4 inline-flex items-center gap-1 text-sm font-semibold hover:underline">
        <ArrowLeft size={14} aria-hidden /> All frameworks
      </Link>
      <PageHeader title={f.name} kicker={<div className="flex gap-2"><Chip color={FW_COLOR[f.category]}>{f.category}</Chip><Link to={`/week/${f.week}`}><Chip>Week {f.week}</Chip></Link></div>}>
        {f.oneLiner}
      </PageHeader>
      <div className="grid gap-5 lg:grid-cols-2 [&>*]:min-w-0">
        <Card className="p-5 lg:col-span-2">
          <CardTitle>What it is</CardTitle>
          <p className="mt-2">{f.what}</p>
        </Card>
        <Card className="p-5" color="mint">
          <CardTitle>Use it when</CardTitle>
          <div className="mt-2 text-onpastel"><Bullets items={f.when} /></div>
        </Card>
        <Card className="p-5" color="pink">
          <CardTitle>Don’t use it when</CardTitle>
          <div className="mt-2 text-onpastel"><Bullets items={f.whenNot} /></div>
        </Card>
        <Card className="p-5 lg:col-span-2">
          <CardTitle>Steps</CardTitle>
          <ol className="mt-3 space-y-2">
            {f.steps.map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-line bg-butter font-display text-sm font-bold text-onpastel">{i + 1}</span>
                <span className="pt-0.5">{s}</span>
              </li>
            ))}
          </ol>
        </Card>
        <Card className="p-5 lg:col-span-2" color="sky">
          <CardTitle>Worked example: {f.example.title}</CardTitle>
          <div className="prose-pm mt-2 max-w-none rounded-[8px] bg-surface p-4" dangerouslySetInnerHTML={{ __html: exampleHtml }} />
        </Card>
        <Card className="p-5 lg:col-span-2">
          <CardTitle>Common mistakes</CardTitle>
          <div className="mt-2"><Bullets items={f.mistakes} /></div>
        </Card>
      </div>
      {related.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-bold">More in {f.category}</h2>
          <div className="flex flex-wrap gap-2">
            {related.map((r) => (
              <Link key={r.id} to={`/frameworks/${r.id}`} className="nb-chip hover:bg-butter hover:text-onpastel">
                {r.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function Frameworks() {
  const { id } = useParams();
  if (!id) return <FrameworkList />;
  const f = frameworkById(id);
  if (!f) return <NotFound />;
  return <FrameworkDetail key={f.id} f={f} />;
}
