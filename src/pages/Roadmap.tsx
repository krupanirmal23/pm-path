import { Link } from 'react-router-dom';
import { Flag, Target, BookOpen, Check, X, Minus } from 'lucide-react';
import { useStore } from '../store/useStore';
import { PHASES, WEEKS } from '../data/curriculum';
import { weekStatus, topicPct, deliverableStatus, checkpointState, weekDates, currentWeekNumber, topicsDoneCount } from '../lib/progress';
import { formatDate, today } from '../lib/dates';
import { Card, Chip, PageHeader, ProgressBar, StatusChip, cx, statusLabel } from '../components/ui';

export default function Roadmap() {
  const data = useStore();
  const cur = currentWeekNumber(data.settings.startDate, today());
  return (
    <div>
      <PageHeader title="Roadmap" kicker={<Chip color="butter">14 weeks + Week 15+</Chip>}>
        Four phases, one week at a time. Each card shows lessons done, the deliverable and the checkpoint. Dates come from your start date ({formatDate(data.settings.startDate, { day: 'numeric', month: 'short', year: 'numeric' })}); change it in{' '}
        <Link to="/settings" className="underline">
          Settings
        </Link>
        .
      </PageHeader>

      <ol className="space-y-10">
        {PHASES.map((p) => (
          <li key={p.id}>
            <section aria-labelledby={`phase-${p.id}`}>
              <div className={cx('nb-card mb-5 flex flex-wrap items-center justify-between gap-3 p-4', `bg-${p.color}`)}>
                <div>
                  <h2 id={`phase-${p.id}`} className="text-xl font-bold">
                    Phase {p.id}: {p.title}
                  </h2>
                  <p className="text-sm">{p.summary}</p>
                </div>
                <Chip>Weeks {p.weeks[0]}–{p.weeks[p.weeks.length - 1] === 15 ? '15+' : p.weeks[p.weeks.length - 1]}</Chip>
              </div>
              <ol className="relative ml-3 space-y-4 border-l-2 border-dashed border-line/60 pl-6 sm:ml-5">
                {p.weeks.map((n) => {
                  const w = WEEKS.find((x) => x.n === n)!;
                  const st = weekStatus(data, w);
                  const tp = topicPct(data, w);
                  const ds = deliverableStatus(data, w);
                  const cs = checkpointState(data, w);
                  const { start, end } = weekDates(data.settings.startDate, n);
                  const isCurrent = cur === n || (cur === 0 && n === 1);
                  return (
                    <li key={n} className="relative">
                      <span
                        aria-hidden
                        className={cx('absolute -left-[35px] top-5 grid h-5 w-5 place-items-center rounded-full border-2 border-line', st === 'done' ? 'bg-mint' : st === 'in_progress' ? 'bg-butter' : st === 'blocked' ? 'bg-pink' : 'bg-surface')}
                      />
                      <Link to={`/week/${n}`} className="block rounded-[10px]" aria-label={`Week ${n === 15 ? '15+' : n}: ${w.title}. ${statusLabel(st)}.`}>
                        <Card hover className={cx('p-4 sm:p-5', isCurrent && 'outline outline-[3px] outline-offset-2 outline-[#F2C94C]')}>
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-display text-sm font-bold text-muted">{n === 15 ? 'Week 15+' : `Week ${n}`}</span>
                                <span className="text-xs text-muted">
                                  {formatDate(start)} – {n === 15 ? 'until an offer' : formatDate(end)}
                                </span>
                                {isCurrent && <Chip color="butter">This week</Chip>}
                              </div>
                              <h3 className="mt-1 text-lg font-bold leading-snug">{w.title}</h3>
                            </div>
                            <StatusChip status={st} />
                          </div>
                          {w.topics.length > 0 && (
                            <div className="mt-3">
                              <div className="mb-1 flex justify-between text-xs">
                                <span className="flex items-center gap-1 font-semibold">
                                  <BookOpen size={13} aria-hidden /> Lessons {topicsDoneCount(data, w)}/{w.topics.length}
                                </span>
                                <span className="font-semibold">{tp}%</span>
                              </div>
                              <ProgressBar value={tp} color={p.color} label={`Week ${n} lessons ${tp}%`} />
                            </div>
                          )}
                          <div className="mt-3 flex flex-wrap gap-2 text-xs">
                            <Chip color={ds === 'done' ? 'mint' : ds === 'in_progress' ? 'butter' : ds === 'blocked' ? 'pink' : undefined}>
                              <Target size={13} aria-hidden /> Deliverable: {statusLabel(ds)}
                            </Chip>
                            <Chip color={cs === 'pass' ? 'mint' : cs === 'fail' ? 'pink' : undefined}>
                              <Flag size={13} aria-hidden /> Checkpoint:{' '}
                              {cs === 'pass' ? (
                                <>
                                  <Check size={12} aria-hidden /> Pass
                                </>
                              ) : cs === 'fail' ? (
                                <>
                                  <X size={12} aria-hidden /> Not yet
                                </>
                              ) : (
                                <>
                                  <Minus size={12} aria-hidden /> Pending
                                </>
                              )}
                            </Chip>
                          </div>
                        </Card>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </section>
          </li>
        ))}
      </ol>
    </div>
  );
}
