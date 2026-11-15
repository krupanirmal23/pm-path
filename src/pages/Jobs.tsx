import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, ExternalLink, Pencil, Trash2, Send, Target, Phone } from 'lucide-react';
import { useStore } from '../store/useStore';
import { uid } from '../lib/uid';
import { addDays, formatDate, mondayOf, today } from '../lib/dates';
import { callbackRate, outreachBetween, outreachOn } from '../lib/progress';
import { loadPage, type LoadedDoc } from '../lib/content';
import { renderMarkdown } from '../lib/markdown';
import type { AppStage, Application } from '../data/types';
import { Button, Card, CardTitle, Checkbox, Chip, Field, Input, PageHeader, ProgressBar, Select, Stat, Tabs, Textarea, cx, useConfirm } from '../components/ui';
import { Modal } from '../components/Modal';

export const STAGES: { id: AppStage; label: string; color: 'butter' | 'sky' | 'lavender' | 'peach' | 'mint' | 'pink' }[] = [
  { id: 'wishlist', label: 'Wishlist', color: 'butter' },
  { id: 'applied', label: 'Applied', color: 'sky' },
  { id: 'referred', label: 'Referred', color: 'lavender' },
  { id: 'interviewing', label: 'Interviewing', color: 'peach' },
  { id: 'offer', label: 'Offer', color: 'mint' },
  { id: 'rejected', label: 'Rejected', color: 'pink' },
];
const OUTREACH_TARGET = 5;

function blank(stage: AppStage = 'wishlist'): Application {
  const d = today();
  return { id: uid(), company: '', role: '', link: '', referral: '', stage, appliedOn: stage === 'wishlist' ? '' : d, updatedOn: d, nextStep: '', notes: '', callback: false };
}

function safeUrl(u: string): string | null {
  try {
    const x = new URL(u.startsWith('http') ? u : `https://${u}`);
    return x.protocol === 'https:' || x.protocol === 'http:' ? x.href : null;
  } catch {
    return null;
  }
}

function AppForm({ initial, onSave, onClose, onDelete }: { initial: Application; onSave: (a: Application) => void; onClose: () => void; onDelete?: () => void }) {
  const [a, setA] = useState(initial);
  const set = <K extends keyof Application>(k: K, v: Application[K]) => setA((x) => ({ ...x, [k]: v }));
  const valid = a.company.trim() && a.role.trim();
  return (
    <Modal title={initial.company ? `Edit: ${initial.company}` : 'Add application'} onClose={onClose}>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!valid) return;
          onSave({ ...a, company: a.company.trim(), role: a.role.trim(), updatedOn: today(), appliedOn: a.stage !== 'wishlist' && !a.appliedOn ? today() : a.appliedOn });
        }}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Company">{(id) => <Input id={id} required value={a.company} onChange={(e) => set('company', e.target.value)} />}</Field>
          <Field label="Role">{(id) => <Input id={id} required value={a.role} onChange={(e) => set('role', e.target.value)} placeholder="Associate Product Manager" />}</Field>
        </div>
        <Field label="Job link">{(id) => <Input id={id} value={a.link} onChange={(e) => set('link', e.target.value)} placeholder="https://…" inputMode="url" />}</Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Stage">
            {(id) => (
              <Select id={id} value={a.stage} onChange={(e) => set('stage', e.target.value as AppStage)}>
                {STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </Select>
            )}
          </Field>
          <Field label="Applied on">{(id) => <Input id={id} type="date" value={a.appliedOn} onChange={(e) => set('appliedOn', e.target.value)} />}</Field>
        </div>
        <Field label="Referral / contact" hint="Who referred you or who you reached out to">{(id) => <Input id={id} value={a.referral} onChange={(e) => set('referral', e.target.value)} />}</Field>
        <Field label="Next step">{(id) => <Input id={id} value={a.nextStep} onChange={(e) => set('nextStep', e.target.value)} placeholder="Follow up with Aditi on Friday" />}</Field>
        <Field label="Notes">{(id) => <Textarea id={id} rows={3} value={a.notes} onChange={(e) => set('notes', e.target.value)} />}</Field>
        <Checkbox checked={a.callback} onChange={(v) => set('callback', v)} label="Got a callback (recruiter or hiring manager responded)" />
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="submit" variant="primary" disabled={!valid}>Save</Button>
          <Button onClick={onClose}>Cancel</Button>
          {onDelete && (
            <Button variant="ghost" className="ml-auto" onClick={onDelete}>
              <Trash2 size={14} aria-hidden /> Delete
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
}

function AppCard({ a, onEdit, onMove }: { a: Application; onEdit: () => void; onMove: (s: AppStage) => void }) {
  const url = a.link ? safeUrl(a.link) : null;
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', a.id);
        e.dataTransfer.effectAllowed = 'move';
      }}
      className="nb-card cursor-grab bg-surface p-3 active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-semibold">{a.company}</p>
          <p className="truncate text-sm text-muted">{a.role}</p>
        </div>
        <button onClick={onEdit} className="rounded p-1 hover:bg-butter/50" aria-label={`Edit ${a.company}`}>
          <Pencil size={14} aria-hidden />
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-1 text-xs">
        {a.referral && <span className="nb-chip !px-1.5 !py-0 text-xs">Ref: {a.referral}</span>}
        {a.callback && <span className="nb-chip bg-mint !px-1.5 !py-0 text-xs text-onpastel">Callback</span>}
        {a.appliedOn && <span className="text-muted">Applied {formatDate(a.appliedOn)}</span>}
      </div>
      {a.nextStep && <p className="mt-1.5 text-xs"><span className="font-semibold">Next:</span> {a.nextStep}</p>}
      <div className="mt-2 flex items-center justify-between gap-2">
        <Select aria-label={`Move ${a.company} to stage`} value={a.stage} onChange={(e) => onMove(e.target.value as AppStage)} className="!h-8 !py-0 text-xs">
          {STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </Select>
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Open job link for ${a.company}`} className="rounded p-1 hover:bg-butter/50">
            <ExternalLink size={14} aria-hidden />
          </a>
        )}
      </div>
    </div>
  );
}

function Board() {
  const apps = useStore((s) => s.applications);
  const upsert = useStore((s) => s.upsertApplication);
  const remove = useStore((s) => s.removeApplication);
  const confirm = useConfirm();
  const [editing, setEditing] = useState<Application | null>(null);
  const [over, setOver] = useState<AppStage | null>(null);
  const move = (id: string, stage: AppStage) => {
    const a = apps.find((x) => x.id === id);
    if (!a || a.stage === stage) return;
    upsert({ ...a, stage, updatedOn: today(), appliedOn: stage !== 'wishlist' && !a.appliedOn ? today() : a.appliedOn, callback: a.callback || stage === 'interviewing' || stage === 'offer' });
  };
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">Drag cards between columns, or use the stage menu on each card.</p>
        <Button variant="primary" onClick={() => setEditing(blank())}>
          <Plus size={16} aria-hidden /> Add application
        </Button>
      </div>
      <div className="-mx-4 overflow-x-auto px-4 pb-3">
        <div className="grid min-w-[1100px] grid-cols-6 gap-3">
          {STAGES.map((s) => {
            const col = apps.filter((a) => a.stage === s.id).sort((a, b) => b.updatedOn.localeCompare(a.updatedOn));
            return (
              <section
                key={s.id}
                aria-label={`${s.label} column`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setOver(s.id);
                }}
                onDragLeave={() => setOver(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  setOver(null);
                  move(e.dataTransfer.getData('text/plain'), s.id);
                }}
                className={cx('min-h-[320px] rounded-[10px] border-2 border-line p-2', `bg-${s.color}`, over === s.id && 'outline-dashed outline-2 outline-offset-2 outline-ink')}
              >
                <div className="mb-2 flex items-center justify-between px-1 text-onpastel">
                  <h3 className="font-display text-sm font-bold">{s.label}</h3>
                  <span className="font-mono text-xs font-bold">{col.length}</span>
                </div>
                <div className="space-y-2">
                  {col.map((a) => (
                    <AppCard key={a.id} a={a} onEdit={() => setEditing(a)} onMove={(st) => move(a.id, st)} />
                  ))}
                  <button onClick={() => setEditing(blank(s.id))} className="w-full rounded-[8px] border-2 border-dashed border-line/50 py-1.5 text-xs font-semibold text-onpastel hover:border-line">
                    + Add
                  </button>
                </div>
              </section>
            );
          })}
        </div>
      </div>
      {editing && (
        <AppForm
          key={editing.id}
          initial={editing}
          onClose={() => setEditing(null)}
          onSave={(a) => {
            upsert(a);
            setEditing(null);
          }}
          onDelete={
            apps.some((x) => x.id === editing.id)
              ? () => {
                  if (confirm(`Delete ${editing.company}?`)) {
                    remove(editing.id);
                    setEditing(null);
                  }
                }
              : undefined
          }
        />
      )}
    </div>
  );
}

function Outreach() {
  const data = useStore((s) => s);
  const add = useStore((s) => s.addOutreach);
  const d = today();
  const n = outreachOn(data, d);
  const mon = mondayOf(d);
  const week = Array.from({ length: 6 }, (_, i) => addDays(mon, i));
  const weekTotal = outreachBetween(data, mon, addDays(mon, 6));
  return (
    <Card className="p-5">
      <CardTitle icon={<Send size={16} aria-hidden />}>Outreach today</CardTitle>
      <div className="mt-3 flex items-center gap-4">
        <Button aria-label="Remove one message" onClick={() => add(d, -1)} disabled={n === 0}>
          <Minus size={18} aria-hidden />
        </Button>
        <p className="font-display text-5xl font-bold tabular-nums" aria-live="polite">
          {n}
          <span className="text-xl text-muted">/{OUTREACH_TARGET}</span>
        </p>
        <Button variant="primary" aria-label="Log one message sent" onClick={() => add(d, 1)}>
          <Plus size={18} aria-hidden />
        </Button>
      </div>
      <ProgressBar value={Math.min(100, (n / OUTREACH_TARGET) * 100)} color={n >= OUTREACH_TARGET ? 'mint' : 'butter'} className="mt-3" label="Daily outreach target" />
      <p className="mt-2 text-sm text-muted">{n >= OUTREACH_TARGET ? 'Target hit. Nice work.' : `${OUTREACH_TARGET - n} more to hit today’s target.`}</p>
      <div className="mt-4 flex items-end gap-2" aria-label="This week">
        {week.map((day) => {
          const v = outreachOn(data, day);
          return (
            <div key={day} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex h-16 w-full items-end rounded-[6px] border-2 border-line bg-surface">
                <div className={cx('w-full rounded-[3px]', v >= OUTREACH_TARGET ? 'bg-mint' : 'bg-butter')} style={{ height: `${Math.min(100, (v / OUTREACH_TARGET) * 100)}%` }} />
              </div>
              <span className={cx('text-xs', day === d && 'font-bold')}>{formatDate(day, { weekday: 'short' })}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-sm">This week: <span className="font-bold">{weekTotal}</span> / {OUTREACH_TARGET * 6}</p>
      <p className="mt-3 text-sm">
        Templates: <Link to="/templates/referral-message" className="underline">Referral message</Link> · <Link to="/templates/follow-up-message" className="underline">Follow-up</Link>
      </p>
    </Card>
  );
}

function Funnel() {
  const apps = useStore((s) => s.applications);
  const cb = callbackRate(apps);
  const referred = apps.filter((a) => a.referral.trim() && a.stage !== 'wishlist');
  const refCb = callbackRate(referred);
  const cold = apps.filter((a) => !a.referral.trim());
  const coldCb = callbackRate(cold);
  return (
    <Card className="p-5">
      <CardTitle icon={<Target size={16} aria-hidden />}>Callback rate</CardTitle>
      <div className="mt-3 grid grid-cols-2 gap-4">
        <Stat label="Overall" value={cb.rate === null ? '–' : `${cb.rate}%`} sub={`${cb.callbacks} of ${cb.applied} applications`} />
        <Stat label="Interviews" value={apps.filter((a) => a.stage === 'interviewing').length} sub={`${apps.filter((a) => a.stage === 'offer').length} offers`} />
        <Stat label="With referral" value={refCb.rate === null ? '–' : `${refCb.rate}%`} sub={`${refCb.applied} applications`} />
        <Stat label="Without referral" value={coldCb.rate === null ? '–' : `${coldCb.rate}%`} sub={`${coldCb.applied} applications`} />
      </div>
      <p className="mt-3 text-sm text-muted">
        <Phone size={12} className="mr-1 inline" aria-hidden />
        Below 10% after 20+ applications? Fix the resume and target list before sending more.
      </p>
    </Card>
  );
}

function Guide() {
  const [doc, setDoc] = useState<LoadedDoc | null>(null);
  useEffect(() => {
    loadPage('bengaluru-apm').then(setDoc);
  }, []);
  const html = useMemo(() => (doc ? renderMarkdown(doc.body) : ''), [doc]);
  if (!doc) return <p className="text-muted">Loading guide…</p>;
  return (
    <Card className="p-6">
      <div className="prose-pm max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </Card>
  );
}

export default function Jobs() {
  const [tab, setTab] = useState<'board' | 'guide'>('board');
  const apps = useStore((s) => s.applications);
  return (
    <div>
      <PageHeader title="Job search" kicker={<Chip color="peach">Week 12 onward</Chip>}>
        Track every application, hit your daily outreach target and watch your callback rate. Referrals first, tailored applications second, Easy Apply last.
      </PageHeader>
      <div className="mb-6 grid gap-5 lg:grid-cols-2">
        <Outreach />
        <Funnel />
      </div>
      <div className="mb-4">
        <Tabs label="Job search sections" value={tab} onChange={setTab} tabs={[{ id: 'board', label: `Applications (${apps.length})` }, { id: 'guide', label: 'Bengaluru APM guide' }]} />
      </div>
      {tab === 'board' ? <Board /> : <Guide />}
    </div>
  );
}
