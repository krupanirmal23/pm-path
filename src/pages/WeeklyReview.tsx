import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Save, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { addDays, formatDate, mondayOf, today } from '../lib/dates';
import { activeWeek, currentWeekNumber, weekStats } from '../lib/progress';
import { WEEKLY_TARGET_HOURS } from '../data/curriculum';
import { uid } from '../lib/uid';
import { Button, Card, CardTitle, Chip, Field, PageHeader, ProgressBar, Stat, Textarea, useConfirm } from '../components/ui';

export const REVIEW_QUESTIONS: { id: string; label: string; hint: string }[] = [
  { id: 'wins', label: 'What went well this week?', hint: 'Lessons finished, deliverables shipped, a mock that felt good.' },
  { id: 'learned', label: 'What are the 3 most useful things you learned?', hint: 'Write them so you could explain them in an interview.' },
  { id: 'struggled', label: 'Where did you struggle or fall behind, and why?', hint: 'Be specific: a topic, a habit, energy, distractions.' },
  { id: 'deliverable', label: 'How is this week’s deliverable? What is left?', hint: 'If it isn’t done, write the smallest next step.' },
  { id: 'evidence', label: 'What proof did you create for your portfolio?', hint: 'A doc, prototype, query, case study section or post.' },
  { id: 'change', label: 'What will you change next week?', hint: 'One concrete change to your schedule or approach.' },
  { id: 'priorities', label: 'Top 3 priorities for next week', hint: 'Keep them outcome-based.' },
];

export default function WeeklyReview() {
  const settings = useStore((s) => s.settings);
  const reviews = useStore((s) => s.weeklyReviews);
  const save = useStore((s) => s.saveWeeklyReview);
  const remove = useStore((s) => s.removeWeeklyReview);
  const all = useStore((s) => s);
  const confirm = useConfirm();
  const [monday, setMonday] = useState(() => mondayOf(today()));
  const existing = reviews.find((r) => r.weekStart === monday);
  const [answers, setAnswers] = useState<Record<string, string>>(existing?.answers ?? {});
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const stats = useMemo(() => weekStats(all, monday), [all, monday]);
  const programmeWeek = currentWeekNumber(settings.startDate, monday);
  const isThisWeek = monday === mondayOf(today());

  const go = (delta: number) => {
    const m = addDays(monday, delta * 7);
    setMonday(m);
    setAnswers(reviews.find((r) => r.weekStart === m)?.answers ?? {});
    setSavedAt(null);
  };

  return (
    <div>
      <PageHeader title="Weekly review" kicker={<Chip color="butter">Sundays · 1 hour</Chip>}>
        Look back honestly, then plan the week ahead. Your stats fill in automatically.
      </PageHeader>
      <Card className="mb-5 flex flex-wrap items-center justify-between gap-3 p-4">
        <Button size="sm" onClick={() => go(-1)} aria-label="Previous week"><ChevronLeft size={16} aria-hidden /></Button>
        <div className="text-center">
          <p className="font-display text-lg font-bold">
            {formatDate(monday)} – {formatDate(addDays(monday, 6))}
          </p>
          <p className="text-sm text-muted">
            {programmeWeek >= 1 && programmeWeek <= 15 ? `Programme week ${programmeWeek}` : programmeWeek < 1 ? 'Before your start date' : 'Week 15+ (job search)'}
            {isThisWeek && ' · this week'}
          </p>
        </div>
        <Button size="sm" onClick={() => go(1)} disabled={isThisWeek} aria-label="Next week"><ChevronRight size={16} aria-hidden /></Button>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <Card className="space-y-4 p-5">
          {REVIEW_QUESTIONS.map((q) => (
            <Field key={q.id} label={q.label} hint={q.hint}>
              {(id) => <Textarea id={id} rows={3} value={answers[q.id] ?? ''} onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))} />}
            </Field>
          ))}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              disabled={!Object.values(answers).some((v) => v.trim())}
              onClick={() => {
                save({ id: existing?.id ?? uid(), weekStart: monday, savedAt: new Date().toISOString(), answers, stats });
                setSavedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
              }}
            >
              <Save size={16} aria-hidden /> {existing ? 'Update review' : 'Save review'}
            </Button>
            {savedAt && <span className="text-sm text-muted" role="status">Saved at {savedAt}</span>}
          </div>
        </Card>
        <aside className="space-y-4">
          <Card className="space-y-4 p-5">
            <CardTitle>This week in numbers</CardTitle>
            <div>
              <Stat label="Hours logged" value={`${stats.hours} h`} sub={`Target ${WEEKLY_TARGET_HOURS} h`} />
              <ProgressBar value={Math.min(100, (stats.hours / WEEKLY_TARGET_HOURS) * 100)} className="mt-2" label="Hours vs target" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Stat label="Topics done" value={stats.topicsDone} />
              <Stat label="Quiz average" value={stats.quizAvg === null ? '–' : `${stats.quizAvg}%`} />
              <Stat label="Outreach" value={stats.outreach} />
              <Stat label="Applications" value={stats.applications} />
              <Stat label="Mocks" value={stats.mocks} />
            </div>
            {isThisWeek && (
              <p className="text-sm">
                Current focus: <Link to={`/week/${activeWeek(all).n}`} className="underline">Week {activeWeek(all).n}</Link>
              </p>
            )}
          </Card>
        </aside>
      </div>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-bold">Past reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-muted">No reviews saved yet. Your first one will appear here.</p>
        ) : (
          <ul className="space-y-3">
            {reviews.map((r) => (
              <li key={r.id}>
                <Card className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <button className="font-display font-bold underline-offset-2 hover:underline" onClick={() => { setMonday(r.weekStart); setAnswers(r.answers); setSavedAt(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                      Week of {formatDate(r.weekStart, { day: 'numeric', month: 'short', year: 'numeric' })}
                    </button>
                    <Chip>{r.stats.hours} h</Chip>
                    <Chip>{r.stats.topicsDone} topics</Chip>
                    {r.stats.quizAvg !== null && <Chip>Quiz {r.stats.quizAvg}%</Chip>}
                    <Button size="sm" variant="ghost" className="ml-auto" aria-label="Delete review" onClick={() => confirm('Delete this weekly review?') && remove(r.id)}>
                      <Trash2 size={14} aria-hidden />
                    </Button>
                  </div>
                  {r.answers.change && <p className="mt-2 text-sm"><span className="font-semibold">Change: </span>{r.answers.change}</p>}
                  {r.answers.priorities && <p className="mt-1 whitespace-pre-wrap text-sm"><span className="font-semibold">Priorities: </span>{r.answers.priorities}</p>}
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
