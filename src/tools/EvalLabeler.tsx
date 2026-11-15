import { useMemo, useState } from 'react';
import { Plus, Trash2, Check, X, Download, Upload } from 'lucide-react';
import { useStore } from '../store/useStore';
import { uid } from '../lib/uid';
import { judgeAgreement, parseVerdict, type Verdict } from '../lib/stats';
import { downloadText } from '../lib/backup';
import type { EvalItem } from '../data/types';
import { Button, Callout, Card, CardTitle, EmptyState, Field, Select, Tabs, Textarea, cx } from '../components/ui';

const DEFAULT_CATS = ['hallucinated fact', 'wrong number', 'missed part of question', 'out of scope', 'wrong language', 'format/JSON', 'tone', 'unsafe', 'other'];

const SAMPLE: Omit<EvalItem, 'id'>[] = [
  { input: 'paid 600 for wifi, split with everyone', output: '{"amount":600,"split":"all"}', version: 'v1', label: 'pass', category: '', judge: 'pass' },
  { input: 'kal dinner ke 1.8k maine diye', output: '{"amount":1000}', version: 'v1', label: 'fail', category: 'wrong number', judge: 'pass' },
  { input: 'Ronny owes me 200', output: '{"from":"Rohan","amount":200}', version: 'v1', label: 'fail', category: 'hallucinated fact', judge: 'fail' },
  { input: "what's the weather?", output: 'It will be sunny in Bengaluru today.', version: 'v1', label: 'fail', category: 'out of scope', judge: 'fail' },
  { input: 'kal dinner ke 1.8k maine diye', output: '{"amount":1800}', version: 'v2', label: 'pass', category: '', judge: 'pass' },
  { input: 'Ronny owes me 200', output: '{"needs_clarification":true}', version: 'v2', label: 'pass', category: '', judge: 'pass' },
  { input: "what's the weather?", output: 'I can only help with shared expenses.', version: 'v2', label: 'pass', category: '', judge: 'pass' },
  { input: 'paid 600 for wifi, split with everyone', output: '{"amount":600,"split":"all"}', version: 'v2', label: 'pass', category: '', judge: 'pass' },
];

function pct(x: number | null) {
  return x === null ? '—' : `${Math.round(x * 100)}%`;
}

export function versionStats(items: EvalItem[], version: 'v1' | 'v2') {
  const labelled = items.filter((i) => i.version === version && i.label);
  const pass = labelled.filter((i) => i.label === 'pass').length;
  const cats: Record<string, number> = {};
  for (const i of labelled) if (i.label === 'fail') cats[i.category || 'uncategorised'] = (cats[i.category || 'uncategorised'] ?? 0) + 1;
  return { n: labelled.length, pass, rate: labelled.length ? pass / labelled.length : null, cats: Object.entries(cats).sort((a, b) => b[1] - a[1]) };
}

export default function EvalLabeler() {
  const items = useStore((s) => s.evals);
  const setEvals = useStore((s) => s.setEvals);
  const [tab, setTab] = useState<'label' | 'results' | 'judge'>('label');
  const [version, setVersion] = useState<'v1' | 'v2'>('v1');
  const [bulk, setBulk] = useState('');
  const [draft, setDraft] = useState({ input: '', output: '' });
  const [humanCol, setHumanCol] = useState('');
  const [judgeCol, setJudgeCol] = useState('');

  const update = (id: string, patch: Partial<EvalItem>) => setEvals(items.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  const shown = items.filter((i) => i.version === version);
  const v1 = useMemo(() => versionStats(items, 'v1'), [items]);
  const v2 = useMemo(() => versionStats(items, 'v2'), [items]);
  const storedAgreement = useMemo(() => judgeAgreement(items.map((i) => i.label), items.map((i) => i.judge)), [items]);
  const pastedAgreement = useMemo(() => {
    const h = humanCol.split(/\r?\n/).filter((l) => l.trim()).map(parseVerdict);
    const j = judgeCol.split(/\r?\n/).filter((l) => l.trim()).map(parseVerdict);
    return h.length && j.length ? judgeAgreement(h, j) : null;
  }, [humanCol, judgeCol]);

  const importBulk = () => {
    const rows = bulk
      .split(/\r?\n/)
      .map((l) => l.split('\t'))
      .filter((c) => c[0]?.trim());
    const next: EvalItem[] = rows.map((c) => ({ id: uid(), input: c[0].trim(), output: (c[1] ?? '').trim(), version, label: c[2] ? parseVerdict(c[2]) : null, category: (c[3] ?? '').trim(), judge: c[4] ? parseVerdict(c[4]) : null }));
    setEvals([...items, ...next]);
    setBulk('');
  };
  const exportTsv = () => {
    const head = 'input\toutput\tversion\tlabel\tcategory\tjudge';
    const body = items.map((i) => [i.input, i.output, i.version, i.label ?? '', i.category, i.judge ?? ''].map((s) => String(s).replace(/\t|\n/g, ' ')).join('\t'));
    downloadText('eval-labels.tsv', [head, ...body].join('\n'), 'text/tab-separated-values');
  };

  const Matrix = ({ a }: { a: ReturnType<typeof judgeAgreement> }) => (
    <div className="space-y-3">
      <table className="w-full max-w-md border-2 border-line text-center text-sm">
        <thead>
          <tr className="bg-butter text-onpastel">
            <th className="p-2" />
            <th className="p-2">Human PASS</th>
            <th className="p-2">Human FAIL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="bg-butter p-2 text-onpastel">Judge PASS</th>
            <td className="bg-mint p-2 text-onpastel">{a.matrix.pp}</td>
            <td className="bg-pink p-2 font-bold text-onpastel">{a.matrix.pf} false pass</td>
          </tr>
          <tr>
            <th className="bg-butter p-2 text-onpastel">Judge FAIL</th>
            <td className="p-2">{a.matrix.fp} false fail</td>
            <td className="bg-mint p-2 text-onpastel">{a.matrix.ff}</td>
          </tr>
        </tbody>
      </table>
      <p className="text-sm">
        Pairs compared: <strong>{a.total}</strong> · Agreement: <strong>{pct(a.accuracy)}</strong> · Failure recall: <strong>{pct(a.failRecall)}</strong> · Failure precision: <strong>{pct(a.failPrecision)}</strong>
      </p>
      {a.failRecall !== null && a.failRecall < 0.8 && <p className="rounded-[8px] bg-pink p-2 text-sm text-onpastel">The judge misses many real failures. Read the false-pass cases and tighten the judge’s rubric before relying on it.</p>}
    </div>
  );

  return (
    <div className="space-y-4">
      <Tabs
        label="Eval labeler sections"
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'label', label: 'Label outputs' },
          { id: 'results', label: 'Results & v1 vs v2' },
          { id: 'judge', label: 'Judge vs human' },
        ]}
      />

      {tab === 'label' && (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <Tabs
              label="Version"
              value={version}
              onChange={setVersion}
              tabs={[
                { id: 'v1', label: `Version 1 (${items.filter((i) => i.version === 'v1').length})` },
                { id: 'v2', label: `Version 2 (${items.filter((i) => i.version === 'v2').length})` },
              ]}
            />
            <Button size="sm" onClick={exportTsv} disabled={!items.length}>
              <Download size={14} aria-hidden /> Export TSV
            </Button>
            {!items.length && (
              <Button size="sm" onClick={() => setEvals(SAMPLE.map((s) => ({ ...s, id: uid() })))}>
                Load sample
              </Button>
            )}
          </div>
          <Card className="space-y-3 p-5">
            <CardTitle>Add an example to {version}</CardTitle>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Input (what the user sent)">{(id) => <Textarea id={id} rows={3} value={draft.input} onChange={(e) => setDraft({ ...draft, input: e.target.value })} />}</Field>
              <Field label="AI output">{(id) => <Textarea id={id} rows={3} value={draft.output} onChange={(e) => setDraft({ ...draft, output: e.target.value })} />}</Field>
            </div>
            <Button
              onClick={() => {
                if (!draft.input.trim()) return;
                setEvals([...items, { id: uid(), input: draft.input, output: draft.output, version, label: null, category: '', judge: null }]);
                setDraft({ input: '', output: '' });
              }}
            >
              <Plus size={16} aria-hidden /> Add example
            </Button>
            <details>
              <summary className="cursor-pointer font-display text-sm font-semibold">
                <Upload size={14} className="mr-1 inline" aria-hidden />
                Paste many rows (from Google Sheets)
              </summary>
              <p className="mt-2 text-xs text-muted">One row per line, tab-separated: input · output · label (pass/fail, optional) · category (optional) · judge (pass/fail, optional). Copying cells from Sheets gives tabs automatically.</p>
              <Textarea aria-label="Paste rows" rows={5} value={bulk} onChange={(e) => setBulk(e.target.value)} className="mt-2 font-mono text-xs" />
              <Button size="sm" className="mt-2" onClick={importBulk} disabled={!bulk.trim()}>
                Import into {version}
              </Button>
            </details>
          </Card>
          {!shown.length ? (
            <EmptyState title={`No ${version} examples yet`}>Add examples above or load the sample set.</EmptyState>
          ) : (
            <ul className="space-y-3">
              {shown.map((i, k) => (
                <li key={i.id}>
                  <Card className={cx('p-4', i.label === 'pass' && 'bg-mint', i.label === 'fail' && 'bg-pink')}>
                    <div className="grid gap-3 md:grid-cols-[30px_1fr_1fr_auto]">
                      <span className="font-display font-bold">{k + 1}</span>
                      <div>
                        <div className="nb-label">Input</div>
                        <p className="whitespace-pre-wrap break-words text-sm">{i.input}</p>
                      </div>
                      <div>
                        <div className="nb-label">Output</div>
                        <p className="whitespace-pre-wrap break-words font-mono text-xs">{i.output}</p>
                      </div>
                      <div className="flex flex-wrap items-start gap-2 md:w-56 md:flex-col">
                        <div className="flex gap-2">
                          <Button size="sm" color={i.label === 'pass' ? 'mint' : undefined} aria-pressed={i.label === 'pass'} onClick={() => update(i.id, { label: i.label === 'pass' ? null : 'pass', category: '' })}>
                            <Check size={14} aria-hidden /> Pass
                          </Button>
                          <Button size="sm" color={i.label === 'fail' ? 'pink' : undefined} aria-pressed={i.label === 'fail'} onClick={() => update(i.id, { label: i.label === 'fail' ? null : 'fail' })}>
                            <X size={14} aria-hidden /> Fail
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setEvals(items.filter((x) => x.id !== i.id))} aria-label="Delete example">
                            <Trash2 size={14} aria-hidden />
                          </Button>
                        </div>
                        {i.label === 'fail' && (
                          <Select aria-label="Failure category" value={i.category} onChange={(e) => update(i.id, { category: e.target.value })} className="bg-surface">
                            <option value="">Failure category…</option>
                            {DEFAULT_CATS.map((c) => (
                              <option key={c}>{c}</option>
                            ))}
                          </Select>
                        )}
                        <Select aria-label="LLM judge verdict" value={i.judge ?? ''} onChange={(e) => update(i.id, { judge: (e.target.value || null) as Verdict | null })} className="bg-surface">
                          <option value="">Judge verdict…</option>
                          <option value="pass">Judge: pass</option>
                          <option value="fail">Judge: fail</option>
                        </Select>
                      </div>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {tab === 'results' && (
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ['Version 1', v1],
            ['Version 2', v2],
          ].map(([name, s]) => {
            const st = s as typeof v1;
            return (
              <Card key={name as string} className="p-5">
                <CardTitle>{name as string}</CardTitle>
                <p className="mt-2 font-display text-4xl font-bold">{pct(st.rate)}</p>
                <p className="text-sm text-muted">
                  {st.pass} of {st.n} labelled outputs passed
                </p>
                <div className="mt-4 space-y-2">
                  {st.cats.length ? (
                    st.cats.map(([c, n]) => (
                      <div key={c}>
                        <div className="flex justify-between text-sm">
                          <span>{c}</span>
                          <span className="font-semibold">{n}</span>
                        </div>
                        <div className="nb-progress mt-1 h-3">
                          <span className="bg-pink" style={{ width: `${(n / Math.max(1, st.n - st.pass)) * 100}%` }} />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted">No failures labelled yet.</p>
                  )}
                </div>
              </Card>
            );
          })}
          <Card color="butter" className="p-5 md:col-span-2">
            <CardTitle>Your checkpoint sentence</CardTitle>
            <p className="mt-2">
              “Version 2 went from <strong>{pct(v1.rate)}</strong> to <strong>{pct(v2.rate)}</strong> on {Math.max(v1.n, v2.n)} examples because of change <strong>[describe the change]</strong>.”
            </p>
            <p className="mt-2 text-sm">Make sure both versions were labelled on the same inputs. With 50 examples, each example moves the rate by 2 points; look at category changes too.</p>
          </Card>
        </div>
      )}

      {tab === 'judge' && (
        <div className="space-y-4">
          <Card className="p-5">
            <CardTitle className="mb-3">Agreement on your labelled examples</CardTitle>
            {storedAgreement.total ? <Matrix a={storedAgreement} /> : <p className="text-sm text-muted">Set both a human label and a judge verdict on some examples to see agreement.</p>}
          </Card>
          <Card className="p-5">
            <CardTitle className="mb-3">Or paste two columns</CardTitle>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Human labels (one per line: pass/fail)">{(id) => <Textarea id={id} rows={8} value={humanCol} onChange={(e) => setHumanCol(e.target.value)} className="font-mono text-xs" />}</Field>
              <Field label="Judge verdicts (same order)">{(id) => <Textarea id={id} rows={8} value={judgeCol} onChange={(e) => setJudgeCol(e.target.value)} className="font-mono text-xs" />}</Field>
            </div>
            {pastedAgreement && <div className="mt-4"><Matrix a={pastedAgreement} /></div>}
          </Card>
          <Callout kind="tip">Aim for high agreement and strong failure recall before trusting a judge at scale. False passes (judge says pass, you said fail) are the dangerous cell.</Callout>
        </div>
      )}
      <p className="text-xs text-muted">
        Labels are saved in this browser and included in your JSON backup.
      </p>
    </div>
  );
}
