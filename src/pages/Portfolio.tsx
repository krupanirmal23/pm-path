import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Plus, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CASE_STUDY_CHECKLIST, PROJECTS } from '../data/curriculum';
import type { PortfolioProgress, Status } from '../data/types';
import { Button, Card, Checkbox, Chip, Input, PageHeader, ProgressBar, Select, StatusChip, statusLabel } from '../components/ui';

const PROJECT_COLOR = { P1: 'lavender', P2: 'sky', P3: 'sky', P4: 'mint' } as const;

function safeUrl(u: string): string | null {
  try {
    const x = new URL(u.startsWith('http') ? u : `https://${u}`);
    return x.protocol === 'https:' || x.protocol === 'http:' ? x.href : null;
  } catch {
    return null;
  }
}

function ProjectCard({ p }: { p: (typeof PROJECTS)[number] }) {
  const prog = useStore((s) => s.portfolio[p.id]);
  const setPortfolio = useStore((s) => s.setPortfolio);
  const cur: PortfolioProgress = prog ?? { milestones: p.milestones.map(() => false), caseChecklist: CASE_STUDY_CHECKLIST.map(() => false), links: [], status: 'not_started' };
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');
  const mDone = cur.milestones.filter(Boolean).length;
  const cDone = cur.caseChecklist.filter(Boolean).length;
  const pct = Math.round(((mDone + cDone) / (p.milestones.length + CASE_STUDY_CHECKLIST.length)) * 100);

  const toggleMilestone = (i: number, v: boolean) => {
    const milestones = p.milestones.map((_, j) => (j === i ? v : !!cur.milestones[j]));
    const all = milestones.every(Boolean);
    const status: Status = cur.status === 'blocked' ? 'blocked' : all ? 'done' : milestones.some(Boolean) ? 'in_progress' : cur.status === 'done' ? 'in_progress' : cur.status;
    setPortfolio(p.id, { milestones, status });
  };

  return (
    <Card className="overflow-hidden">
      <div className={`border-b-2 border-line bg-${PROJECT_COLOR[p.id]} p-5 text-onpastel`}>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Chip className="bg-surface">{p.id}</Chip>
          <Chip className="bg-surface">Weeks {p.weeks.join(', ')}</Chip>
          <StatusChip status={cur.status} />
        </div>
        <h2 className="text-2xl font-bold">{p.title}</h2>
        <p className="mt-1">{p.summary}</p>
        <ProgressBar value={pct} color="mint" className="mt-3" label={`${p.title} progress`} />
      </div>
      <div className="grid gap-6 p-5 md:grid-cols-2">
        <section>
          <h3 className="nb-label mb-2">Milestones ({mDone}/{p.milestones.length})</h3>
          <ul className="space-y-1.5">
            {p.milestones.map((m, i) => (
              <li key={m}>
                <Checkbox checked={!!cur.milestones[i]} onChange={(v) => toggleMilestone(i, v)} label={m} />
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <label className="text-sm font-semibold" htmlFor={`status-${p.id}`}>Status</label>
            <Select id={`status-${p.id}`} value={cur.status} onChange={(e) => setPortfolio(p.id, { status: e.target.value as Status })} className="w-44">
              {(['not_started', 'in_progress', 'blocked', 'done'] as Status[]).map((s) => (
                <option key={s} value={s}>{statusLabel(s)}</option>
              ))}
            </Select>
          </div>
          <p className="mt-3 text-sm">
            Weeks:{' '}
            {p.weeks.map((w, i) => (
              <span key={w}>
                {i > 0 && ', '}
                <Link to={`/week/${w}`} className="underline">Week {w}</Link>
              </span>
            ))}
          </p>
        </section>
        <section>
          <h3 className="nb-label mb-2">Case study checklist ({cDone}/{CASE_STUDY_CHECKLIST.length})</h3>
          <ul className="space-y-1.5">
            {CASE_STUDY_CHECKLIST.map((c, i) => (
              <li key={c}>
                <Checkbox checked={!!cur.caseChecklist[i]} onChange={(v) => setPortfolio(p.id, { caseChecklist: CASE_STUDY_CHECKLIST.map((_, j) => (j === i ? v : !!cur.caseChecklist[j])) })} label={c} />
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm">
            Write it with the <Link to="/templates/case-study" className="underline">case study template</Link>.
          </p>
        </section>
        <section className="md:col-span-2">
          <h3 className="nb-label mb-2">Links</h3>
          {cur.links.length > 0 && (
            <ul className="mb-3 space-y-1.5">
              {cur.links.map((l, i) => {
                const href = safeUrl(l.url);
                return (
                  <li key={`${l.url}-${i}`} className="flex items-center gap-2 text-sm">
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold underline">
                        {l.label || l.url} <ExternalLink size={12} aria-hidden />
                      </a>
                    ) : (
                      <span>{l.label || l.url}</span>
                    )}
                    <button className="rounded p-1 hover:bg-pink" aria-label={`Remove link ${l.label || l.url}`} onClick={() => setPortfolio(p.id, { links: cur.links.filter((_, j) => j !== i) })}>
                      <Trash2 size={13} aria-hidden />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          <form
            className="flex flex-col gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (!url.trim()) return;
              setPortfolio(p.id, { links: [...cur.links, { label: label.trim(), url: url.trim() }] });
              setLabel('');
              setUrl('');
            }}
          >
            <Input aria-label="Link label" placeholder="Label (e.g. Case study)" value={label} onChange={(e) => setLabel(e.target.value)} className="sm:w-48" />
            <Input aria-label="Link URL" placeholder="https://…" value={url} onChange={(e) => setUrl(e.target.value)} inputMode="url" className="flex-1" />
            <Button type="submit" disabled={!url.trim()}>
              <Plus size={16} aria-hidden /> Add link
            </Button>
          </form>
        </section>
      </div>
    </Card>
  );
}

export default function Portfolio() {
  const portfolio = useStore((s) => s.portfolio);
  const done = PROJECTS.filter((p) => portfolio[p.id]?.status === 'done').length;
  return (
    <div>
      <PageHeader title="Portfolio" kicker={<Chip color="butter">{done} of 4 projects done</Chip>}>
        Four projects that prove you can do the job: an end-to-end product case, an analytics case, a technical teardown and a shipped AI product with real users. Track milestones, publish case studies and keep links in one place.
      </PageHeader>
      <div className="space-y-6">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
