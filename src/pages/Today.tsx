import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Square, Plus, Trash2, ArrowRight, Sun } from 'lucide-react';
import { useStore } from '../store/useStore';
import { PHASES, WEEKLY_RHYTHM } from '../data/curriculum';
import { activeWeek, scheduleFor, tasksForDay, isTaskDone, minutesForBlock, minutesOn, currentWeekNumber } from '../lib/progress';
import { today, weekdayOf, formatDate } from '../lib/dates';
import { Button, Card, CardTitle, Chip, Field, Input, PageHeader, ProgressBar, Textarea, cx, Select } from '../components/ui';

function fmtDuration(min: number) {
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  return h ? `${h}h ${m}m` : `${m}m`;
}
function fmtClock(ms: number) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h ? `${h}:` : ''}${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

export default function Today() {
  const data = useStore();
  const navigate = useNavigate();
  const t = today();
  const dow = weekdayOf(t);
  const week = activeWeek(data, t);
  const phase = PHASES.find((p) => p.id === week.phase)!;
  const schedule = scheduleFor(week).filter((b) => b.kind !== 'lunch');
  const tasks = tasksForDay(data, week, dow);
  const [tick, setTick] = useState(Date.now());
  const [manual, setManual] = useState({ block: schedule[0]?.key ?? 'learn', minutes: 30 });
  const timer = data.activeTimer;

  useEffect(() => {
    if (!timer) return;
    const i = setInterval(() => setTick(Date.now()), 1000);
    return () => clearInterval(i);
  }, [timer]);

  const loggedToday = minutesOn(data, t) + (timer && timer.date === t ? (tick - timer.startedAt) / 60000 : 0);
  const targetToday = dow === 0 ? 60 : data.settings.dailyHours * 60;
  const reflection = data.reflections[t] ?? { shipped: '', hard: '', tomorrow: '' };
  const todayLogs = data.timeLogs.filter((l) => l.date === t);
  const blockLabel = (key: string) => scheduleFor(week).find((b) => b.key === key)?.label ?? key;
  const notStarted = currentWeekNumber(data.settings.startDate, t) === 0;

  const toggleTask = (task: (typeof tasks)[number]) => {
    if (task.kind === 'topic' && task.ref) data.toggleTopic(task.ref);
    else if (task.kind === 'deliverable' && task.ref) data.toggleDeliverableItem(week.n, Number(task.ref));
    else if (task.kind === 'checkpoint') navigate(`/week/${week.n}#checkpoint`);
    else data.toggleTodayCheck(t, task.id);
  };

  return (
    <div>
      <PageHeader
        title="Today"
        kicker={
          <>
            <Chip color="butter">
              <Sun size={13} aria-hidden /> {formatDate(t, { weekday: 'long', day: 'numeric', month: 'long' })}
            </Chip>
            <Chip color={phase.color}>{week.n === 15 ? 'Week 15+' : `Week ${week.n}`}</Chip>
          </>
        }
      >
        {notStarted ? `Your roadmap starts ${formatDate(data.settings.startDate, { weekday: 'long', day: 'numeric', month: 'long' })}. This preview shows Week 1.` : WEEKLY_RHYTHM[dow]}
      </PageHeader>

      <Card className="mb-6 p-5">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
          <span className="font-display text-lg font-bold">
            {fmtDuration(loggedToday)} logged <span className="text-base font-semibold text-muted">of {fmtDuration(targetToday)}</span>
          </span>
          {timer && (
            <span className="nb-chip bg-pink" aria-live="off">
              ● {blockLabel(timer.blockKey)}: {fmtClock(tick - timer.startedAt)}
            </span>
          )}
        </div>
        <ProgressBar value={(loggedToday / targetToday) * 100} color="butter" label="Hours logged today" />
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-6">
          <Card as="section" className="p-5" aria-labelledby="blocks-h">
            <CardTitle className="mb-3">
              <span id="blocks-h">Time blocks</span>
            </CardTitle>
            {dow === 0 && <p className="mb-3 text-sm">It’s Sunday: one hour for review. Log it under any block, then rest.</p>}
            <ul className="space-y-3">
              {schedule.map((b) => {
                const running = timer?.blockKey === b.key && timer.date === t;
                const logged = minutesForBlock(data, t, b.key) + (running ? (tick - timer!.startedAt) / 60000 : 0);
                const pct = (logged / (b.hours * 60)) * 100;
                return (
                  <li key={b.key} className={cx('rounded-[10px] border-2 border-line p-3', running && 'bg-butter text-onpastel')}>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="w-[92px] font-mono text-xs">
                        {b.start}–{b.end}
                      </span>
                      <span className="flex-1 font-display font-semibold">{b.label}</span>
                      <span className="text-xs font-semibold">
                        {fmtDuration(logged)} / {fmtDuration(b.hours * 60)}
                      </span>
                      {running ? (
                        <Button size="sm" color="pink" onClick={data.stopTimer} aria-label={`Stop timer for ${b.label}`}>
                          <Square size={14} aria-hidden /> {fmtClock(tick - timer!.startedAt)}
                        </Button>
                      ) : (
                        <Button size="sm" onClick={() => data.startTimer(b.key)} aria-label={`Start timer for ${b.label}`}>
                          <Play size={14} aria-hidden /> Start
                        </Button>
                      )}
                    </div>
                    <ProgressBar className="mt-2" value={pct} color={pct >= 100 ? 'mint' : 'sky'} label={`${b.label} progress`} />
                  </li>
                );
              })}
            </ul>
            <details className="mt-4">
              <summary className="cursor-pointer font-display text-sm font-semibold">Forgot the timer? Add time manually</summary>
              <div className="mt-3 flex flex-wrap items-end gap-3">
                <Field label="Block">
                  {(id) => (
                    <Select id={id} value={manual.block} onChange={(e) => setManual((m) => ({ ...m, block: e.target.value }))}>
                      {schedule.map((b) => (
                        <option key={b.key} value={b.key}>
                          {b.label}
                        </option>
                      ))}
                    </Select>
                  )}
                </Field>
                <Field label="Minutes">
                  {(id) => <Input id={id} type="number" min={5} max={600} step={5} value={manual.minutes} onChange={(e) => setManual((m) => ({ ...m, minutes: Number(e.target.value) }))} className="w-28" />}
                </Field>
                <Button onClick={() => manual.minutes > 0 && data.addManualTime(t, manual.block, manual.minutes)}>
                  <Plus size={16} aria-hidden /> Add
                </Button>
              </div>
              {todayLogs.length > 0 && (
                <ul className="mt-3 space-y-1 text-sm">
                  {todayLogs.map((l) => (
                    <li key={l.id} className="flex items-center gap-2">
                      <span className="flex-1">
                        {blockLabel(l.blockKey)}: {fmtDuration(l.minutes)}
                      </span>
                      <button className="nb-btn nb-btn-sm nb-btn-ghost" onClick={() => data.removeTimeLog(l.id)} aria-label={`Delete ${fmtDuration(l.minutes)} log`}>
                        <Trash2 size={14} aria-hidden />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </details>
          </Card>
        </div>

        <div className="space-y-6">
          <Card as="section" color="butter" className="p-5">
            <CardTitle className="mb-3">Today’s checklist</CardTitle>
            <ul className="space-y-2.5">
              {tasks.map((task) => {
                const done = isTaskDone(data, week, t, task);
                return (
                  <li key={task.id} className="flex items-start gap-3">
                    <input type="checkbox" className="nb-check mt-0.5" checked={done} onChange={() => toggleTask(task)} aria-label={task.label} id={`task-${task.id}`} />
                    <label htmlFor={`task-${task.id}`} className={cx('flex-1 cursor-pointer leading-snug', done && 'line-through opacity-70')}>
                      {task.label}
                    </label>
                    {task.href && (
                      <Link to={task.href} className="nb-btn nb-btn-sm bg-surface" aria-label={`Open: ${task.label}`}>
                        <ArrowRight size={14} aria-hidden />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-xs">Lessons and deliverable items tick off on their week page too. It’s the same data.</p>
          </Card>

          <Card as="section" className="space-y-4 p-5">
            <CardTitle>End-of-day reflection</CardTitle>
            <Field label="What I shipped today">{(id) => <Textarea id={id} rows={3} value={reflection.shipped} onChange={(e) => data.setReflection(t, { shipped: e.target.value })} />}</Field>
            <Field label="What was hard">{(id) => <Textarea id={id} rows={3} value={reflection.hard} onChange={(e) => data.setReflection(t, { hard: e.target.value })} />}</Field>
            <Field label="Tomorrow’s first task">{(id) => <Input id={id} value={reflection.tomorrow} onChange={(e) => data.setReflection(t, { tomorrow: e.target.value })} />}</Field>
            <p className="text-xs text-muted">Saved automatically. Yesterday’s “first task” shows below.</p>
            <YesterdayFirstTask />
          </Card>
        </div>
      </div>
    </div>
  );
}

function YesterdayFirstTask() {
  const reflections = useStore((s) => s.reflections);
  const t = today();
  const prev = Object.keys(reflections)
    .filter((d) => d < t && reflections[d].tomorrow)
    .sort()
    .pop();
  if (!prev) return null;
  return (
    <div className="nb-card bg-sky p-3 text-sm">
      <span className="font-display font-bold">Your first task, from {formatDate(prev, { weekday: 'short' })}: </span>
      {reflections[prev].tomorrow}
    </div>
  );
}
