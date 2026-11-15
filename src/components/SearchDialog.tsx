import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, CornerDownLeft } from 'lucide-react';
import type MiniSearch from 'minisearch';
import { cx } from './ui';
import type { SearchDoc, DocKind } from '../lib/search';

const KIND_COLOR: Record<DocKind, string> = {
  Lesson: 'bg-lavender',
  'Tool guide': 'bg-sky',
  Framework: 'bg-butter',
  Template: 'bg-peach',
  Glossary: 'bg-mint',
  Question: 'bg-pink',
  Tool: 'bg-sky',
  Week: 'bg-lavender',
  Page: 'bg-surface',
};

type Hit = SearchDoc & { score: number };

export function SearchDialog({ onClose }: { onClose: () => void }) {
  const nav = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState('');
  const [index, setIndex] = useState<MiniSearch<SearchDoc> | null>(null);
  const [mod, setMod] = useState<typeof import('../lib/search') | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    inputRef.current?.focus();
    let alive = true;
    import('../lib/search').then((m) => {
      if (!alive) return;
      setMod(m);
      m.getIndex().then((ix) => alive && setIndex(ix));
    });
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      alive = false;
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const results: Hit[] = useMemo(() => {
    if (!index || q.trim().length < 2) return [];
    let r = index.search(q.trim()) as unknown as Hit[];
    if (!r.length) r = index.search(q.trim(), { combineWith: 'OR' }) as unknown as Hit[];
    return r.slice(0, 30);
  }, [index, q]);

  useEffect(() => setActive(0), [q]);

  const go = (h: Hit) => {
    onClose();
    nav(h.to);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-3 pt-[8vh]" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label="Search PM Path" className="nb-card pop-in flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden">
        <div className="flex items-center gap-2 border-b-2 border-line px-4 py-3">
          <Search size={18} aria-hidden />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActive((a) => Math.min(results.length - 1, a + 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActive((a) => Math.max(0, a - 1));
              } else if (e.key === 'Enter' && results[active]) {
                go(results[active]);
              }
            }}
            placeholder="Search lessons, frameworks, templates, glossary, questions…"
            aria-label="Search"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="search-results"
            aria-activedescendant={results[active] ? `sr-${results[active].id}` : undefined}
            className="w-full bg-transparent py-1 text-lg outline-none placeholder:text-muted"
          />
          <button onClick={onClose} aria-label="Close search" className="rounded p-1 hover:bg-butter hover:text-onpastel">
            <X size={18} aria-hidden />
          </button>
        </div>
        <div className="overflow-y-auto">
          {!index && <p className="p-4 text-sm text-muted">Building search index…</p>}
          {index && q.trim().length < 2 && <p className="p-4 text-sm text-muted">Type at least 2 letters. Try “retention”, “RICE”, “PRD”, “evals” or “SQL join”.</p>}
          {index && q.trim().length >= 2 && results.length === 0 && <p className="p-4 text-sm text-muted">No results for “{q}”.</p>}
          <ul id="search-results" role="listbox" aria-label="Results" className="divide-y-2 divide-line/20">
            {results.map((h, i) => (
              <li
                key={h.id}
                id={`sr-${h.id}`}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(h)}
                className={cx('cursor-pointer px-4 py-3', i === active && 'bg-butter/40')}
              >
                <div className="flex items-center gap-2">
                  <span className={cx('rounded-[6px] border-2 border-line px-1.5 text-[0.7rem] font-bold uppercase', KIND_COLOR[h.kind])}>{h.kind}</span>
                  {h.meta && <span className="text-xs text-muted">{h.meta}</span>}
                  {i === active && <CornerDownLeft size={14} className="ml-auto" aria-hidden />}
                </div>
                <p className="mt-1 font-semibold leading-snug">{h.title}</p>
                {mod && <p className="mt-0.5 line-clamp-2 text-sm text-muted">{mod.snippet(h.text, q)}</p>}
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden border-t-2 border-line px-4 py-2 text-xs text-muted sm:block">↑ ↓ to move · Enter to open · Esc to close</div>
      </div>
    </div>
  );
}
