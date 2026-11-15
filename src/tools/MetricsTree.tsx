import { Plus, Trash2, RotateCcw, Copy } from 'lucide-react';
import { useStore } from '../store/useStore';
import { uid } from '../lib/uid';
import type { TreeNode } from '../data/types';
import { Button, Callout, Card, Input, Select, cx } from '../components/ui';

const KIND_META: Record<TreeNode['kind'], { label: string; color: string }> = {
  north: { label: 'North Star', color: 'bg-butter' },
  input: { label: 'Input', color: 'bg-sky' },
  sub: { label: 'Driver', color: 'bg-surface' },
  guardrail: { label: 'Guardrail', color: 'bg-pink' },
};

export const TEMPLATE_TREE = (): TreeNode => ({
  id: uid(),
  label: 'Groups fully settled per month',
  kind: 'north',
  children: [
    { id: uid(), label: 'Active groups', kind: 'input', children: [
      { id: uid(), label: 'New groups created', kind: 'sub', children: [] },
      { id: uid(), label: 'Groups retained from last month', kind: 'sub', children: [] },
    ] },
    { id: uid(), label: '% of summaries opened', kind: 'input', children: [] },
    { id: uid(), label: '% of opened summaries settled', kind: 'input', children: [
      { id: uid(), label: 'One-tap UPI success rate', kind: 'sub', children: [] },
    ] },
    { id: uid(), label: 'Notification opt-out rate', kind: 'guardrail', children: [] },
    { id: uid(), label: 'Group leave rate', kind: 'guardrail', children: [] },
  ],
});

function mapTree(node: TreeNode, id: string, fn: (n: TreeNode) => TreeNode | null): TreeNode | null {
  if (node.id === id) return fn(node);
  const children = node.children.map((c) => mapTree(c, id, fn)).filter(Boolean) as TreeNode[];
  return { ...node, children };
}

export function treeToText(n: TreeNode, depth = 0): string {
  const line = `${'  '.repeat(depth)}- [${KIND_META[n.kind].label}] ${n.label}`;
  return [line, ...n.children.map((c) => treeToText(c, depth + 1))].join('\n');
}

function NodeRow({ node, depth, onChange }: { node: TreeNode; depth: number; onChange: (id: string, fn: (n: TreeNode) => TreeNode | null) => void }) {
  return (
    <li>
      <div className="flex items-center gap-2" style={{ paddingLeft: depth * 24 }}>
        {depth > 0 && <span aria-hidden className="h-0.5 w-4 bg-ink" />}
        <div className={cx('flex flex-1 flex-wrap items-center gap-2 rounded-[10px] border-2 border-line p-2', KIND_META[node.kind].color, node.kind !== 'sub' && 'text-onpastel')}>
          <Input aria-label="Metric name" value={node.label} onChange={(e) => onChange(node.id, (n) => ({ ...n, label: e.target.value }))} className="min-w-[12rem] flex-1 bg-surface" />
          <Select aria-label="Metric type" value={node.kind} onChange={(e) => onChange(node.id, (n) => ({ ...n, kind: e.target.value as TreeNode['kind'] }))} className="w-36 bg-surface">
            {Object.entries(KIND_META).map(([k, m]) => (
              <option key={k} value={k}>
                {m.label}
              </option>
            ))}
          </Select>
          <Button size="sm" onClick={() => onChange(node.id, (n) => ({ ...n, children: [...n.children, { id: uid(), label: 'New metric', kind: 'sub', children: [] }] }))} aria-label={`Add child to ${node.label}`}>
            <Plus size={14} aria-hidden />
          </Button>
          {depth > 0 && (
            <Button size="sm" variant="ghost" onClick={() => onChange(node.id, () => null)} aria-label={`Delete ${node.label}`}>
              <Trash2 size={14} aria-hidden />
            </Button>
          )}
        </div>
      </div>
      {node.children.length > 0 && (
        <ul className="mt-2 space-y-2">
          {node.children.map((c) => (
            <NodeRow key={c.id} node={c} depth={depth + 1} onChange={onChange} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function MetricsTree() {
  const tree = useStore((s) => s.metricTree);
  const setTree = useStore((s) => s.setMetricTree);
  const root = tree ?? TEMPLATE_TREE();
  const onChange = (id: string, fn: (n: TreeNode) => TreeNode | null) => {
    const next = mapTree(root, id, fn);
    if (next) setTree(next);
  };
  return (
    <div className="space-y-4">
      <Callout kind="tip">Start with your North Star at the top. Break it into 2–4 inputs that multiply or add up to it, then into drivers your team can move. Add guardrails that must not get worse.</Callout>
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setTree(TEMPLATE_TREE())}>
          <RotateCcw size={16} aria-hidden /> Load P1 example
        </Button>
        <Button onClick={() => setTree({ id: uid(), label: 'Your North Star', kind: 'north', children: [] })}>Start blank</Button>
        <Button onClick={() => navigator.clipboard?.writeText(treeToText(root))}>
          <Copy size={16} aria-hidden /> Copy as text
        </Button>
      </div>
      <Card className="overflow-x-auto p-5">
        <ul className="min-w-[560px] space-y-2">
          <NodeRow node={root} depth={0} onChange={onChange} />
        </ul>
      </Card>
      <div className="flex flex-wrap gap-2 text-xs">
        {Object.values(KIND_META).map((m) => (
          <span key={m.label} className={cx('nb-chip', m.color)}>
            {m.label}
          </span>
        ))}
      </div>
    </div>
  );
}
