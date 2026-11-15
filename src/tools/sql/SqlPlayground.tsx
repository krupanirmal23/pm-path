import { useEffect, useMemo, useRef, useState } from 'react';
import type { Database } from 'sql.js';
import { Play, Check, Lightbulb, Eye, Database as DbIcon, RotateCcw } from 'lucide-react';
import { loadDatabase, runQuery, compareResults, type QueryResult } from './db';
import { SQL_PROBLEMS, type SqlProblem } from './problems';
import { SCHEMA_DOC } from './dataset';
import { useStore } from '../../store/useStore';
import { Button, Card, CardTitle, Chip, ProgressBar, Select, cx } from '../../components/ui';

const LEVEL_COLOR = { easy: 'mint', medium: 'butter', hard: 'pink' } as const;
const DRAFT_KEY = 'pm-path-sql-drafts';

function readDrafts(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}');
  } catch {
    return {};
  }
}

function ResultTable({ result }: { result: QueryResult }) {
  const rows = result.rows.slice(0, 200);
  return (
    <div className="overflow-x-auto rounded-[10px] border-2 border-line">
      <table className="w-full text-left font-mono text-xs">
        <thead className="bg-butter text-onpastel">
          <tr>
            {result.columns.map((c, i) => (
              <th key={i} className="whitespace-nowrap px-3 py-2 font-semibold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-line/20">
              {r.map((v, j) => (
                <td key={j} className="whitespace-nowrap px-3 py-1.5">
                  {v === null ? <span className="text-muted">NULL</span> : String(v)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t border-line/20 px-3 py-1.5 text-xs text-muted">
        {result.rows.length} row{result.rows.length === 1 ? '' : 's'}
        {result.rows.length > 200 ? ' (showing first 200)' : ''}
      </div>
    </div>
  );
}

export default function SqlPlayground() {
  const [db, setDb] = useState<Database | null>(null);
  const [loadErr, setLoadErr] = useState<string | null>(null);
  const solved = useStore((s) => s.sqlSolved);
  const markSqlSolved = useStore((s) => s.markSqlSolved);
  const [problemId, setProblemId] = useState<string>('free');
  const [level, setLevel] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const drafts = useRef<Record<string, string>>(readDrafts());
  const [sql, setSql] = useState<string>(drafts.current.free ?? 'SELECT * FROM orders LIMIT 10;');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [check, setCheck] = useState<{ ok: boolean; reason?: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    loadDatabase()
      .then(setDb)
      .catch((e) => setLoadErr(String(e?.message || e)));
  }, []);

  const problem: SqlProblem | undefined = SQL_PROBLEMS.find((p) => p.id === problemId);
  const filtered = useMemo(() => SQL_PROBLEMS.filter((p) => level === 'all' || p.level === level), [level]);
  const solvedCount = SQL_PROBLEMS.filter((p) => solved[p.id]).length;

  const choose = (id: string) => {
    drafts.current[problemId] = sql;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts.current));
    } catch {
      /* ignore */
    }
    setProblemId(id);
    setSql(drafts.current[id] ?? (id === 'free' ? 'SELECT * FROM orders LIMIT 10;' : '-- Write your query here\nSELECT '));
    setResult(null);
    setError(null);
    setCheck(null);
    setShowHint(false);
    setShowSolution(false);
  };

  const run = (): QueryResult | null => {
    if (!db) return null;
    setCheck(null);
    const t0 = performance.now();
    try {
      const res = runQuery(db, sql);
      setMs(Math.round(performance.now() - t0));
      const last = res[res.length - 1] ?? { columns: [], rows: [] };
      setResult(last);
      setError(null);
      return last;
    } catch (e) {
      setError(String((e as Error).message || e));
      setResult(null);
      return null;
    }
  };

  const checkAnswer = () => {
    if (!db || !problem) return;
    const mine = run();
    if (!mine) return;
    const expected = runQuery(db, problem.solution);
    const verdict = compareResults(mine, expected[expected.length - 1], problem.ordered);
    setCheck(verdict);
    if (verdict.ok) markSqlSolved(problem.id);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="space-y-4">
        <Card className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <CardTitle>Problems</CardTitle>
            <Chip color="mint">
              {solvedCount}/40
            </Chip>
          </div>
          <ProgressBar value={(solvedCount / 40) * 100} label="SQL problems solved" />
          <div className="mt-3">
            <Select aria-label="Filter by level" value={level} onChange={(e) => setLevel(e.target.value as typeof level)}>
              <option value="all">All levels</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Select>
          </div>
          <ul className="scrollbar-thin mt-3 max-h-[46vh] space-y-1 overflow-y-auto pr-1">
            <li>
              <button onClick={() => choose('free')} className={cx('w-full rounded-[8px] border-2 px-2 py-1.5 text-left text-sm', problemId === 'free' ? 'border-line bg-butter text-onpastel' : 'border-transparent hover:border-line')}>
                ✎ Free play (no checking)
              </button>
            </li>
            {filtered.map((p, i) => (
              <li key={p.id}>
                <button
                  onClick={() => choose(p.id)}
                  className={cx('flex w-full items-center gap-2 rounded-[8px] border-2 px-2 py-1.5 text-left text-sm', problemId === p.id ? 'border-line bg-butter text-onpastel' : 'border-transparent hover:border-line')}
                >
                  <span className="w-6 font-mono text-xs text-muted">{SQL_PROBLEMS.indexOf(p) + 1 || i + 1}</span>
                  <span className="flex-1 leading-snug">{p.title}</span>
                  {solved[p.id] ? <Check size={14} aria-label="Solved" /> : <span className={`h-2.5 w-2.5 rounded-full border border-line bg-${LEVEL_COLOR[p.level]}`} aria-label={p.level} />}
                </button>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-4">
          <CardTitle icon={<DbIcon size={16} aria-hidden />} className="mb-2">
            Schema
          </CardTitle>
          <ul className="space-y-2 text-xs">
            {SCHEMA_DOC.map((t) => (
              <li key={t.table}>
                <button className="font-mono font-semibold underline-offset-2 hover:underline" onClick={() => setSql(`SELECT * FROM ${t.table} LIMIT 10;`)}>
                  {t.table}
                </button>
                <span className="text-muted"> · {t.desc}</span>
                <div className="font-mono text-[0.7rem] leading-relaxed text-muted">{t.cols}</div>
              </li>
            ))}
          </ul>
        </Card>
      </aside>

      <section className="min-w-0 space-y-4">
        {problem ? (
          <Card className="p-5">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <Chip color={LEVEL_COLOR[problem.level]}>{problem.level}</Chip>
              {solved[problem.id] && (
                <Chip color="mint">
                  <Check size={12} aria-hidden /> Solved
                </Chip>
              )}
              {problem.ordered && <Chip>Row order matters</Chip>}
            </div>
            <h2 className="text-xl font-bold">{problem.title}</h2>
            <p className="mt-1">{problem.prompt}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => setShowHint((h) => !h)} aria-expanded={showHint}>
                <Lightbulb size={14} aria-hidden /> {showHint ? 'Hide hint' : 'Hint'}
              </Button>
              <Button size="sm" onClick={() => setShowSolution((s) => !s)} aria-expanded={showSolution}>
                <Eye size={14} aria-hidden /> {showSolution ? 'Hide solution' : 'Model solution'}
              </Button>
            </div>
            {showHint && <p className="pop-in mt-3 rounded-[8px] bg-mint p-3 text-sm text-onpastel">{problem.hint}</p>}
            {showSolution && <pre className="pop-in mt-3 overflow-x-auto rounded-[8px] border-2 border-line bg-codebg p-3 font-mono text-xs">{problem.solution}</pre>}
          </Card>
        ) : (
          <Card className="p-5">
            <h2 className="text-xl font-bold">Free play</h2>
            <p className="mt-1 text-sm text-muted">Explore the food-delivery dataset (Jan–Jun 2025). Click a table name to preview it. Press Ctrl/Cmd + Enter to run.</p>
          </Card>
        )}

        <Card className="p-4">
          <label htmlFor="sql-editor" className="nb-label">
            SQL editor
          </label>
          <textarea
            id="sql-editor"
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                e.preventDefault();
                run();
              }
              if (e.key === 'Tab') {
                e.preventDefault();
                const t = e.currentTarget;
                const s = t.selectionStart;
                const v = t.value;
                setSql(v.slice(0, s) + '  ' + v.slice(t.selectionEnd));
                requestAnimationFrame(() => t.setSelectionRange(s + 2, s + 2));
              }
            }}
            spellCheck={false}
            rows={8}
            className="nb-input min-h-[10rem] font-mono text-sm leading-relaxed"
          />
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button variant="primary" onClick={run} disabled={!db}>
              <Play size={16} aria-hidden /> Run
            </Button>
            {problem && (
              <Button color="mint" onClick={checkAnswer} disabled={!db}>
                <Check size={16} aria-hidden /> Check answer
              </Button>
            )}
            <Button variant="ghost" onClick={() => setSql(problem ? '-- Write your query here\nSELECT ' : 'SELECT * FROM orders LIMIT 10;')}>
              <RotateCcw size={16} aria-hidden /> Reset
            </Button>
            <span className="text-xs text-muted" aria-live="polite">
              {!db && !loadErr ? 'Loading database…' : ms !== null ? `Ran in ${ms} ms` : 'Ready'}
            </span>
          </div>
        </Card>

        <div aria-live="polite">
          {loadErr && <Card color="pink" className="p-4 text-sm">Could not load the SQL engine: {loadErr}</Card>}
          {check && (
            <Card color={check.ok ? 'mint' : 'pink'} className="pop-in mb-4 p-4">
              <p className="font-display font-bold">{check.ok ? 'Correct! Nicely done.' : 'Not quite yet.'}</p>
              {!check.ok && <p className="text-sm">{check.reason} Compare your result with the question, check filters and grouping, then try again.</p>}
            </Card>
          )}
          {error && (
            <Card color="pink" className="p-4">
              <p className="font-display font-bold">SQL error</p>
              <pre className="mt-1 whitespace-pre-wrap font-mono text-xs">{error}</pre>
            </Card>
          )}
          {result && (result.columns.length ? <ResultTable result={result} /> : <p className="text-sm text-muted">Query ran. No rows to show.</p>)}
        </div>
      </section>
    </div>
  );
}
