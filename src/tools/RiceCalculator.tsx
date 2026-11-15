import { Plus, Trash2, Download } from 'lucide-react';
import { useStore } from '../store/useStore';
import { rice } from '../lib/stats';
import { uid } from '../lib/uid';
import { downloadText } from '../lib/backup';
import { Button, Callout, Card, EmptyState, Input, Select } from '../components/ui';
import type { RiceIdea } from '../data/types';

const IMPACTS = [3, 2, 1, 0.5, 0.25];
const IMPACT_LABEL: Record<number, string> = { 3: '3 · massive', 2: '2 · high', 1: '1 · medium', 0.5: '0.5 · low', 0.25: '0.25 · minimal' };
const CONF = [100, 80, 50];

export function toCsv(ideas: RiceIdea[]): string {
  const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
  const head = 'Rank,Idea,Reach,Impact,Confidence %,Effort,RICE';
  const rows = [...ideas]
    .map((i) => ({ ...i, score: rice(i.reach, i.impact, i.confidence, i.effort) }))
    .sort((a, b) => b.score - a.score)
    .map((i, k) => [k + 1, esc(i.name), i.reach, i.impact, i.confidence, i.effort, Math.round(i.score)].join(','));
  return [head, ...rows].join('\n');
}

export default function RiceCalculator() {
  const ideas = useStore((s) => s.rice);
  const setRice = useStore((s) => s.setRice);
  const sorted = [...ideas].map((i) => ({ ...i, score: rice(i.reach, i.impact, i.confidence, i.effort) })).sort((a, b) => b.score - a.score);

  const update = (id: string, patch: Partial<RiceIdea>) => setRice(ideas.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  const add = () => setRice([...ideas, { id: uid(), name: 'New idea', reach: 1000, impact: 1, confidence: 80, effort: 1 }]);
  const loadExample = () =>
    setRice([
      { id: uid(), name: 'WhatsApp settle-up link', reach: 3000, impact: 2, confidence: 80, effort: 1 },
      { id: uid(), name: 'Auto monthly summary', reach: 3000, impact: 3, confidence: 80, effort: 2 },
      { id: uid(), name: 'Import shared UPI payments', reach: 3000, impact: 2, confidence: 50, effort: 4 },
      { id: uid(), name: 'Cash quick-add widget', reach: 1500, impact: 1, confidence: 80, effort: 0.5 },
      { id: uid(), name: 'Dark mode', reach: 3000, impact: 0.25, confidence: 100, effort: 0.5 },
    ]);

  return (
    <div className="space-y-4">
      <Callout kind="tip">
        RICE = (Reach × Impact × Confidence) ÷ Effort. Use the same time period for reach (e.g., users per quarter) and get effort (person-months) from engineers. The list re-sorts automatically.
      </Callout>
      <div className="flex flex-wrap gap-3">
        <Button variant="primary" onClick={add}>
          <Plus size={16} aria-hidden /> Add idea
        </Button>
        <Button onClick={() => downloadText('rice-scores.csv', toCsv(ideas), 'text/csv')} disabled={!ideas.length}>
          <Download size={16} aria-hidden /> Export CSV
        </Button>
        {!ideas.length && <Button onClick={loadExample}>Load example (P1)</Button>}
      </div>
      {!ideas.length ? (
        <EmptyState title="No ideas yet">Add ideas or load the example to see how scoring works.</EmptyState>
      ) : (
        <div className="space-y-3">
          {sorted.map((i, k) => (
            <Card key={i.id} className="p-4" color={k === 0 ? 'butter' : undefined}>
              <div className="grid items-end gap-3 sm:grid-cols-[40px_minmax(0,2fr)_repeat(4,minmax(0,1fr))_90px_40px]">
                <div className="font-display text-2xl font-bold">#{k + 1}</div>
                <label className="block">
                  <span className="nb-label">Idea</span>
                  <Input value={i.name} onChange={(e) => update(i.id, { name: e.target.value })} />
                </label>
                <label className="block">
                  <span className="nb-label">Reach</span>
                  <Input type="number" min={0} value={i.reach} onChange={(e) => update(i.id, { reach: Math.max(0, Number(e.target.value)) })} />
                </label>
                <label className="block">
                  <span className="nb-label">Impact</span>
                  <Select value={i.impact} onChange={(e) => update(i.id, { impact: Number(e.target.value) })}>
                    {IMPACTS.map((v) => (
                      <option key={v} value={v}>
                        {IMPACT_LABEL[v]}
                      </option>
                    ))}
                  </Select>
                </label>
                <label className="block">
                  <span className="nb-label">Confidence</span>
                  <Select value={i.confidence} onChange={(e) => update(i.id, { confidence: Number(e.target.value) })}>
                    {CONF.map((v) => (
                      <option key={v} value={v}>
                        {v}%
                      </option>
                    ))}
                  </Select>
                </label>
                <label className="block">
                  <span className="nb-label">Effort (p-m)</span>
                  <Input type="number" min={0.1} step={0.5} value={i.effort} onChange={(e) => update(i.id, { effort: Math.max(0.1, Number(e.target.value)) })} />
                </label>
                <div>
                  <span className="nb-label">RICE</span>
                  <div className="font-display text-xl font-bold">{Math.round(i.score).toLocaleString('en-IN')}</div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setRice(ideas.filter((x) => x.id !== i.id))} aria-label={`Delete ${i.name}`}>
                  <Trash2 size={16} aria-hidden />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
