import { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { aiCost } from '../lib/stats';
import { Button, Callout, Card, CardTitle, Field, Input, Select } from '../components/ui';

interface ModelPrice {
  name: string;
  input: number; // $ per 1M input tokens
  output: number; // $ per 1M output tokens
}

// Example prices only, for learning. Real prices change often; always check the provider’s pricing page.
const DEFAULT_MODELS: ModelPrice[] = [
  { name: 'Example small/fast model', input: 0.1, output: 0.4 },
  { name: 'Example mid-size model', input: 0.4, output: 1.6 },
  { name: 'Example large model', input: 3, output: 15 },
];
const KEY = 'pm-path-ai-cost';

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (s && Array.isArray(s.models)) return s;
  } catch {
    /* ignore */
  }
  return null;
}

const usd = (x: number) => (x < 0.01 ? `$${x.toFixed(5)}` : `$${x.toLocaleString('en-US', { maximumFractionDigits: 2 })}`);
const inr = (x: number) => (x < 1 ? `₹${x.toFixed(3)}` : `₹${x.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`);

export default function AiCost() {
  const saved = load();
  const [models, setModels] = useState<ModelPrice[]>(saved?.models ?? DEFAULT_MODELS);
  const [modelIdx, setModelIdx] = useState<number>(saved?.modelIdx ?? 1);
  const [inTok, setInTok] = useState<number>(saved?.inTok ?? 2000);
  const [outTok, setOutTok] = useState<number>(saved?.outTok ?? 300);
  const [reqs, setReqs] = useState<number>(saved?.reqs ?? 30);
  const [users, setUsers] = useState<number>(saved?.users ?? 1000);
  const [fx, setFx] = useState<number>(saved?.fx ?? 85);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ models, modelIdx, inTok, outTok, reqs, users, fx }));
    } catch {
      /* ignore */
    }
  }, [models, modelIdx, inTok, outTok, reqs, users, fx]);

  const m = models[modelIdx] ?? models[0];
  const c = aiCost({ inTokens: inTok, outTokens: outTok, inPrice: m.input, outPrice: m.output, requestsPerUser: reqs, users, fx });
  const setModel = (i: number, patch: Partial<ModelPrice>) => setModels(models.map((x, k) => (k === i ? { ...x, ...patch } : x)));

  return (
    <div className="space-y-4">
      <Callout kind="warning">Prices below are <strong>example prices for learning, not real quotes</strong>. Check current pricing on each provider’s website and edit them here.</Callout>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4 p-5">
          <CardTitle>Per request</CardTitle>
          <Field label="Model">
            {(id) => (
              <Select id={id} value={modelIdx} onChange={(e) => setModelIdx(Number(e.target.value))}>
                {models.map((mm, i) => (
                  <option key={i} value={i}>
                    {mm.name}
                  </option>
                ))}
              </Select>
            )}
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Input tokens / request" hint="System prompt + context + history + question.">
              {(id) => <Input id={id} type="number" min={0} value={inTok} onChange={(e) => setInTok(Math.max(0, Number(e.target.value)))} />}
            </Field>
            <Field label="Output tokens / request" hint="~1.3 tokens per English word.">
              {(id) => <Input id={id} type="number" min={0} value={outTok} onChange={(e) => setOutTok(Math.max(0, Number(e.target.value)))} />}
            </Field>
            <Field label="Requests / user / month">{(id) => <Input id={id} type="number" min={0} value={reqs} onChange={(e) => setReqs(Math.max(0, Number(e.target.value)))} />}</Field>
            <Field label="Users">{(id) => <Input id={id} type="number" min={0} value={users} onChange={(e) => setUsers(Math.max(0, Number(e.target.value)))} />}</Field>
          </div>
          <Field label="Exchange rate (₹ per $)" hint="Edit to today’s rate.">
            {(id) => <Input id={id} type="number" min={1} step={0.1} value={fx} onChange={(e) => setFx(Math.max(1, Number(e.target.value)))} />}
          </Field>
        </Card>
        <div className="space-y-4">
          <Card color="butter" className="p-5" aria-live="polite">
            <CardTitle>Cost</CardTitle>
            <dl className="mt-3 grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-2 text-sm">
              <dt className="font-semibold">Per request</dt>
              <dd>{usd(c.perRequestUsd)}</dd>
              <dd>{inr(c.perRequestInr)}</dd>
              <dt className="font-semibold">Per user / month</dt>
              <dd>{usd(c.perUserUsd)}</dd>
              <dd className="font-display text-lg font-bold">{inr(c.perUserInr)}</dd>
              <dt className="font-semibold">Total / month</dt>
              <dd>{usd(c.totalUsd)}</dd>
              <dd className="font-display text-lg font-bold">{inr(c.totalInr)}</dd>
            </dl>
          </Card>
          <Callout kind="tip">Biggest levers: fewer input tokens (shorter prompts, less context, summarised history), shorter outputs, routing easy requests to a smaller model, caching repeated answers, and fair-use limits for heavy users.</Callout>
        </div>
      </div>
      <Card className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <CardTitle>Model prices ($ per 1M tokens, editable)</CardTitle>
          <Button size="sm" onClick={() => setModels(DEFAULT_MODELS)}>
            <RotateCcw size={14} aria-hidden /> Reset examples
          </Button>
        </div>
        <div className="space-y-2">
          {models.map((mm, i) => (
            <div key={i} className="grid gap-2 sm:grid-cols-[2fr_1fr_1fr]">
              <Input aria-label={`Model ${i + 1} name`} value={mm.name} onChange={(e) => setModel(i, { name: e.target.value })} />
              <Input aria-label={`Model ${i + 1} input price`} type="number" min={0} step={0.01} value={mm.input} onChange={(e) => setModel(i, { input: Number(e.target.value) })} />
              <Input aria-label={`Model ${i + 1} output price`} type="number" min={0} step={0.01} value={mm.output} onChange={(e) => setModel(i, { output: Number(e.target.value) })} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
