import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Wrench, Target, Flag, Clock, NotebookPen, ExternalLink, Check, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { WEEKS, PHASES, WEEKLY_RHYTHM, buildSchedule } from '../data/curriculum';
import { weekStatus, weekDates, topicPct, deliverableStatus, checkpointState, bestQuizScore, weekPct } from '../lib/progress';
import { formatDate } from '../lib/dates';
import { hasLesson, hasToolGuide } from '../lib/content';
import { Button, Card, CardTitle, Checkbox, Chip, Field, Input, LinkButton, PageHeader, ProgressBar, Select, StatusChip, Textarea, cx } from '../components/ui';
import { MarkdownNotes } from '../components/MarkdownNotes';
import { Celebrate } from '../components/Celebrate';
import { NotFound } from './NotFound';
import type { Status } from '../data/types';

export default function WeekPage() {
  const { n: nParam } = useParams();
  const n = Number(nParam);
  const week = WEEKS.find((w) => w.n === n);
  const data = useStore();
  const loc = useLocation();
  const [celebrate, setCelebrate] = useState(false);

  const st = week ? weekStatus(data, week) : 'not_started';
  useEffect(() => {
    if (week && st === 'done' && !data.celebratedWeeks.includes(week.n)) setCelebrate(true);
  }, [st, week, data.celebratedWeeks]);
  const onCelebrated = useCallback(() => {
    setCelebrate(false);
    if (week) useStore.getState().markCelebrated(week.n);
  }, [week]);

  useEffect(() => {
    if (loc.hash) {
      const el = document.getElementById(loc.hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    }
  }, [loc.hash, n]);

  if (!week) return <NotFound />;
  const phase = PHASES.find((p) => p.id === week.phase)!;
  const { start, end } = weekDates(data.settings.startDate, n);
  const deliv = data.deliverables[n] ?? { checklist: [], link: '', status: 'not_started' as Status };
  const cp = data.checkpoints[n] ?? { criteria: [], result: null, notes: '' };
  const schedule = buildSchedule(week);
  const prev = WEEKS.find((w) => w.n === n - 1);
  const next = WEEKS.find((w) => w.n === n + 1);
  const label = n === 15 ? 'Week 15+' : `Week ${n}`;

  return (
    <div>
      {celebrate && <Celebrate label={`${label} complete`} onDone={onCelebrated} />}
      <PageHeader
        title={week.title}
        kicker={
          <>
            <Chip color={phase.color}>
              Phase {phase.id}: {phase.title}
            </Chip>
            <Chip>{label}</Chip>
            <Chip>
              {formatDate(start)} – {n === 15 ? 'until an offer' : formatDate(end)}
            </Chip>
            <StatusChip status={st} />
          </>
        }
      >
        {week.goal}
      </PageHeader>

      <div className="mb-8 max-w-xl">
        <ProgressBar value={weekPct(data, week)} color={phase.color} label={`${label} progress`} />
        <p className="mt-1 text-xs text-muted">{weekPct(data, week)}% of this week: lessons, deliverable and checkpoint.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          {week.topics.length > 0 && (
            <Card as="section" className="p-5" aria-labelledby="topics-h">
              <div className="mb-3 flex items-center justify-between">
                <CardTitle icon={<BookOpen size={18} aria-hidden />}>
                  <span id="topics-h">Lessons</span>
                </CardTitle>
                <Chip>{topicPct(data, week)}% done</Chip>
              </div>
              <ul className="divide-y-2 divide-dashed divide-line/20">
                {week.topics.map((t, i) => {
                  const done = !!data.topics[t.id]?.done;
                  const best = bestQuizScore(data, t.id);
                  return (
                    <li key={t.id} className="flex items-center gap-3 py-3">
                      <input
                        type="checkbox"
                        className="nb-check"
                        checked={done}
                        onChange={() => data.toggleTopic(t.id)}
                        aria-label={`Mark “${t.title}” ${done ? 'not done' : 'done'}`}
                      />
                      <span className="w-6 font-display text-sm font-bold text-muted">{i + 1}.</span>
                      <div className="min-w-0 flex-1">
                        {hasLesson(t.id) ? (
                          <Link to={`/lesson/${t.id}`} className={cx('font-medium underline-offset-4 hover:underline', done && 'text-muted line-through')}>
                            {t.title}
                          </Link>
                        ) : (
                          <span className={cx('font-medium', done && 'text-muted line-through')}>{t.title}</span>
                        )}
                      </div>
                      {best && (
                        <Chip color={best.score / best.total >= 0.8 ? 'mint' : 'butter'} title="Best quiz score">
                          Quiz {best.score}/{best.total}
                        </Chip>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Card>
          )}

          {week.n === 15 && <Week15Guide />}

          <Card as="section" className="scroll-mt-20 p-5" id="tools">
            <CardTitle icon={<Wrench size={18} aria-hidden />} className="mb-3">
              Tools this week
            </CardTitle>
            <ul className="grid gap-3 sm:grid-cols-2">
              {week.tools.map((tool) => {
                const guideId = `w${n}-${tool.id}`;
                const to = tool.builtIn ?? (hasToolGuide(guideId) ? `/guide/${guideId}` : undefined);
                const inner = (
                  <>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display font-bold">{tool.name}</span>
                      {to && <ArrowRight size={16} aria-hidden />}
                    </div>
                    <p className="mt-1 text-sm text-muted">{tool.use}</p>
                    <p className="mt-2 text-xs font-semibold">{tool.builtIn ? 'Built into PM Path' : 'Step-by-step guide'}</p>
                  </>
                );
                return (
                  <li key={tool.id}>
                    {to ? (
                      <Link to={to} className="block h-full rounded-[10px]">
                        <Card hover color={tool.builtIn ? 'butter' : undefined} className="h-full p-4">
                          {inner}
                        </Card>
                      </Link>
                    ) : (
                      <Card className="h-full p-4">{inner}</Card>
                    )}
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card as="section" className="scroll-mt-20 p-5" id="deliverable">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <CardTitle icon={<Target size={18} aria-hidden />}>Deliverable{week.deliverable.project ? ` · ${week.deliverable.project}` : ''}</CardTitle>
              <StatusChip status={deliverableStatus(data, week)} />
            </div>
            <p className="font-display text-lg font-bold">{week.deliverable.title}</p>
            <p className="mt-1 text-sm">{week.deliverable.description}</p>
            <div className="mt-4 space-y-2.5">
              {week.deliverable.checklist.map((item, i) => (
                <Checkbox key={i} checked={!!deliv.checklist[i]} onChange={() => data.toggleDeliverableItem(n, i)} label={item} />
              ))}
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_200px]">
              <Field label="Link to your work">
                {(id) => (
                  <div className="flex gap-2">
                    <Input id={id} type="url" placeholder="https://notion.so/…" value={deliv.link} onChange={(e) => data.setDeliverable(n, { link: e.target.value })} />
                    {/^https?:\/\//.test(deliv.link) && (
                      <a className="nb-btn" href={deliv.link} target="_blank" rel="noopener noreferrer" aria-label="Open link">
                        <ExternalLink size={16} aria-hidden />
                      </a>
                    )}
                  </div>
                )}
              </Field>
              <Field label="Status">
                {(id) => (
                  <Select id={id} value={deliv.status} onChange={(e) => data.setDeliverable(n, { status: e.target.value as Status })}>
                    <option value="not_started">Not started</option>
                    <option value="in_progress">In progress</option>
                    <option value="done">Done</option>
                    <option value="blocked">Blocked</option>
                  </Select>
                )}
              </Field>
            </div>
            {week.deliverable.project && (
              <p className="mt-3 text-sm">
                Part of <Link to="/portfolio" className="underline">{week.deliverable.project} in your portfolio</Link>.
              </p>
            )}
          </Card>

          <Card as="section" className="scroll-mt-20 p-5" id="checkpoint">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <CardTitle icon={<Flag size={18} aria-hidden />}>Checkpoint</CardTitle>
              <Chip color={checkpointState(data, week) === 'pass' ? 'mint' : checkpointState(data, week) === 'fail' ? 'pink' : undefined}>
                {checkpointState(data, week) === 'pass' ? 'Passed' : checkpointState(data, week) === 'fail' ? 'Not yet' : 'Pending'}
              </Chip>
            </div>
            <p className="font-medium">{week.checkpoint.summary}</p>
            <p className="mt-3 nb-label">Criteria</p>
            <div className="space-y-2.5">
              {week.checkpoint.criteria.map((c, i) => (
                <Checkbox key={i} checked={!!cp.criteria[i]} onChange={() => data.toggleCheckpointCriterion(n, i)} label={c} />
              ))}
            </div>
            <p className="mt-4 nb-label">Self-assessment</p>
            <div className="flex flex-wrap gap-3">
              <Button color={cp.result === 'pass' ? 'mint' : undefined} aria-pressed={cp.result === 'pass'} onClick={() => data.setCheckpoint(n, { result: cp.result === 'pass' ? null : 'pass' })}>
                <Check size={16} aria-hidden /> Pass
              </Button>
              <Button color={cp.result === 'fail' ? 'pink' : undefined} aria-pressed={cp.result === 'fail'} onClick={() => data.setCheckpoint(n, { result: cp.result === 'fail' ? null : 'fail' })}>
                <X size={16} aria-hidden /> Not yet
              </Button>
            </div>
            {cp.result === 'pass' && cp.criteria.filter(Boolean).length < week.checkpoint.criteria.length && (
              <p className="mt-2 text-sm text-muted">You marked a pass without ticking every criterion. Be honest with yourself: that is the point.</p>
            )}
            <div className="mt-4">
              <Field label="Checkpoint notes">
                {(id) => <Textarea id={id} rows={3} value={cp.notes} onChange={(e) => data.setCheckpoint(n, { notes: e.target.value })} placeholder="What went well, what to redo, who reviewed it…" />}
              </Field>
            </div>
          </Card>

          <Card as="section" className="p-5">
            <CardTitle icon={<NotebookPen size={18} aria-hidden />} className="mb-3">
              Week notes
            </CardTitle>
            <MarkdownNotes label={`${label} notes`} value={data.weekNotes[n] ?? ''} onChange={(v) => data.setWeekNote(n, v)} />
          </Card>
        </div>

        <aside className="space-y-6">
          <Card className="p-5">
            <CardTitle icon={<Clock size={18} aria-hidden />} className="mb-3">
              Daily schedule
            </CardTitle>
            <ul className="space-y-2">
              {schedule.map((b) => (
                <li key={b.key} className={cx('flex items-start gap-3 rounded-[8px] border-2 px-3 py-2 text-sm', b.kind === 'lunch' ? 'border-dashed border-line/40' : 'border-line')}>
                  <span className="w-[88px] shrink-0 font-mono text-xs leading-5">
                    {b.start}–{b.end}
                  </span>
                  <span className="font-medium leading-5">{b.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted">{week.split ? 'This week uses its own daily split.' : 'Standard 9-hour day.'}</p>
          </Card>
          <Card className="p-5">
            <CardTitle className="mb-3">Weekly rhythm</CardTitle>
            <ul className="space-y-1.5 text-sm">
              {[1, 2, 3, 4, 5, 6, 0].map((d) => (
                <li key={d}>{WEEKLY_RHYTHM[d]}</li>
              ))}
            </ul>
          </Card>
          <div className="flex justify-between gap-3">
            {prev ? (
              <LinkButton to={`/week/${prev.n}`} size="sm">
                <ArrowLeft size={14} aria-hidden /> Week {prev.n}
              </LinkButton>
            ) : (
              <span />
            )}
            {next && (
              <LinkButton to={`/week/${next.n}`} size="sm">
                {next.n === 15 ? 'Week 15+' : `Week ${next.n}`} <ArrowRight size={14} aria-hidden />
              </LinkButton>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function Week15Guide() {
  return (
    <Card as="section" color="peach" className="p-5">
      <CardTitle className="mb-2">How Week 15+ works</CardTitle>
      <ul className="list-disc space-y-1.5 pl-5 text-sm">
        <li>Send 10–15 tailored applications and 10 referral messages every week. Quality beats volume: each application should mention one thing specific to that company.</li>
        <li>Follow up after 5 working days with a short, polite note. Most replies come after the follow-up, not the first message.</li>
        <li>Do 2 mocks a week on your weakest round type. Check the Mock log to see which one scores lowest.</li>
        <li>Ship a P4 improvement every 2 weeks and post about it. It keeps your profile fresh and gives you new interview stories.</li>
        <li>
          Every Sunday, check your callback rate in the Job Tracker. Under 10% means the resume or targeting is the problem. Callbacks but no offers means the interviewing is the problem. Fix the leaking stage, not everything at once.
        </li>
      </ul>
      <div className="mt-4 flex flex-wrap gap-3">
        <LinkButton to="/jobs" size="sm">
          Job Tracker
        </LinkButton>
        <LinkButton to="/interview/mock" size="sm">
          Mock interview
        </LinkButton>
        <LinkButton to="/review" size="sm">
          Weekly review
        </LinkButton>
      </div>
    </Card>
  );
}
