import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { GLOSSARY, type GlossaryCategory } from '../data/glossary';
import { slugify } from '../lib/markdown';
import { Chip, Input, PageHeader, cx } from '../components/ui';

const CATS: GlossaryCategory[] = ['Product', 'Discovery', 'Strategy', 'Metrics', 'Data', 'Experiments', 'Tech', 'Design', 'Delivery', 'AI', 'Business', 'Career'];

export default function Glossary() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get('q') ?? '');
  const [cat, setCat] = useState<string>('All');
  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return GLOSSARY.filter((t) => (cat === 'All' || t.category === cat) && (!s || t.term.toLowerCase().includes(s) || t.def.toLowerCase().includes(s))).sort((a, b) => {
      if (!s) return 0;
      const ai = a.term.toLowerCase().includes(s) ? 0 : 1;
      const bi = b.term.toLowerCase().includes(s) ? 0 : 1;
      return ai - bi || a.term.localeCompare(b.term);
    });
  }, [q, cat]);
  const letters = useMemo(() => [...new Set(shown.map((t) => t.term[0].toUpperCase()))], [shown]);
  const grouped = !q.trim();

  return (
    <div>
      <PageHeader title="Glossary" kicker={<Chip color="butter">{GLOSSARY.length} terms</Chip>}>
        Plain-English definitions of the product, data, tech and AI terms you will meet in lessons and interviews.
      </PageHeader>
      <div className="sticky top-0 z-10 -mx-4 mb-5 bg-bg/95 px-4 py-3 backdrop-blur lg:top-0">
        <div className="relative max-w-md">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
          <Input
            aria-label="Search glossary"
            placeholder="Search terms or definitions…"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setParams(e.target.value ? { q: e.target.value } : {}, { replace: true });
            }}
            className="pl-9"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
          {['All', ...CATS].map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={cx('nb-chip cursor-pointer text-xs', cat === c && 'bg-butter text-onpastel')}>
              {c}
            </button>
          ))}
        </div>
        {grouped && (
          <nav aria-label="Jump to letter" className="mt-2 flex flex-wrap gap-1 text-sm font-semibold">
            {letters.map((l) => (
              <a key={l} href={`#letter-${l}`} className="rounded px-1.5 hover:bg-butter hover:text-onpastel">
                {l}
              </a>
            ))}
          </nav>
        )}
      </div>
      <p className="mb-3 text-sm text-muted" aria-live="polite">{shown.length} terms</p>
      {shown.length === 0 && <p className="text-muted">No terms match “{q}”. Try a shorter word.</p>}
      <dl className="grid gap-3 md:grid-cols-2">
        {shown.map((t, i) => {
          const first = grouped && (i === 0 || shown[i - 1].term[0].toUpperCase() !== t.term[0].toUpperCase());
          return (
            <div key={t.term} id={`term-${slugify(t.term)}`} className="nb-card scroll-mt-40 p-4">
              {first && <span id={`letter-${t.term[0].toUpperCase()}`} className="block scroll-mt-48" aria-hidden />}
              <dt className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-display text-lg font-bold">{t.term}</span>
                <span className="nb-chip text-xs">{t.category}</span>
              </dt>
              <dd className="mt-1 text-[0.95rem]">{t.def}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
