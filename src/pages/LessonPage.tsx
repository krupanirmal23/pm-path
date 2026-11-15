import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Clock, NotebookPen } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ALL_TOPICS, PHASES, WEEKS } from '../data/curriculum';
import { loadLesson, type LoadedDoc } from '../lib/content';
import { renderMarkdown } from '../lib/markdown';
import { Button, Card, CardTitle, Chip, LinkButton, Reveal } from '../components/ui';
import { MarkdownNotes } from '../components/MarkdownNotes';
import { Quiz } from '../components/Quiz';
import { PageLoading } from '../components/Layout';
import { NotFound } from './NotFound';

export function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-40 h-1.5 bg-transparent" aria-hidden>
      <div className="h-full border-b-2 border-line bg-pink" style={{ width: `${p}%`, borderRightWidth: p > 0 && p < 100 ? 2 : 0 }} />
    </div>
  );
}

export function Toc({ headings }: { headings: { id: string; text: string }[] }) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-10% 0px -70% 0px' },
    );
    els.forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, [headings]);
  return (
    <nav aria-label="On this page" className="nb-card p-4">
      <p className="mb-2 font-display text-xs font-bold uppercase tracking-widest text-muted">On this page</p>
      <ol className="space-y-1 text-sm">
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className={`block rounded-[6px] px-2 py-1 leading-snug ${active === h.id ? 'bg-butter font-semibold text-onpastel' : 'hover:underline'}`}>
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function DocBody({ doc, lessonId }: { doc: LoadedDoc; lessonId?: string }) {
  const html = useMemo(() => doc.segments.map((s) => (s.type === 'md' ? renderMarkdown(s.md) : s.type === 'answer' ? renderMarkdown(s.md) : '')), [doc]);
  return (
    <div className="prose-pm">
      {doc.segments.map((s, i) => {
        if (s.type === 'md') return <div key={i} className="prose-pm" dangerouslySetInnerHTML={{ __html: html[i] }} />;
        if (s.type === 'answer')
          return (
            <Reveal key={i} label={s.label}>
              <div className="prose-pm" dangerouslySetInnerHTML={{ __html: html[i] }} />
            </Reveal>
          );
        return <Quiz key={i} lessonId={lessonId ?? doc.id} questions={s.questions} />;
      })}
    </div>
  );
}

export default function LessonPage() {
  const { id = '' } = useParams();
  const [doc, setDoc] = useState<LoadedDoc | null | undefined>(undefined);
  const done = useStore((s) => !!s.topics[id]?.done);
  const toggleTopic = useStore((s) => s.toggleTopic);
  const note = useStore((s) => s.lessonNotes[id] ?? '');
  const setLessonNote = useStore((s) => s.setLessonNote);

  useEffect(() => {
    let live = true;
    setDoc(undefined);
    loadLesson(id).then((d) => live && setDoc(d));
    return () => {
      live = false;
    };
  }, [id]);

  useEffect(() => {
    if (doc) document.title = `${doc.title} · PM Path`;
    return () => {
      document.title = 'PM Path';
    };
  }, [doc]);

  if (doc === undefined) return <PageLoading />;
  const idx = ALL_TOPICS.findIndex((t) => t.id === id);
  if (doc === null || idx < 0) return <NotFound />;
  const topic = ALL_TOPICS[idx];
  const week = WEEKS.find((w) => w.n === topic.week)!;
  const phase = PHASES.find((p) => p.id === week.phase)!;
  const prev = ALL_TOPICS[idx - 1];
  const next = ALL_TOPICS[idx + 1];
  const minutes = doc.estimatedMinutes;

  return (
    <article>
      <ReadingProgress />
      <div className="mb-4">
        <Link to={`/week/${week.n}`} className="inline-flex items-center gap-1 text-sm font-semibold hover:underline">
          <ArrowLeft size={14} aria-hidden /> Week {week.n}: {week.title}
        </Link>
      </div>
      <header className="mb-8 max-w-[70ch]">
        <div className="mb-3 flex flex-wrap gap-2">
          <Chip color={phase.color}>Week {week.n}</Chip>
          <Chip>
            <Clock size={13} aria-hidden /> {minutes} min read · {doc.words.toLocaleString()} words
          </Chip>
          {doc.tags.slice(0, 3).map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
          {done && (
            <Chip color="mint">
              <Check size={13} aria-hidden /> Complete
            </Chip>
          )}
        </div>
        <h1 className="text-3xl font-bold leading-tight sm:text-[2.6rem]">{doc.title}</h1>
      </header>

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          <DocBody doc={doc} lessonId={id} />

          <div className="mt-12 max-w-[70ch] space-y-6">
            <Card color={done ? 'mint' : 'butter'} className="flex flex-wrap items-center justify-between gap-3 p-5">
              <div>
                <p className="font-display text-lg font-bold">{done ? 'Lesson complete' : 'Finished reading and did the exercise?'}</p>
                <p className="text-sm">{done ? 'Nice. Your progress has been updated.' : 'Mark it complete to update your progress.'}</p>
              </div>
              <Button variant={done ? 'default' : 'primary'} className={done ? '' : 'bg-surface'} onClick={() => toggleTopic(id)}>
                <Check size={16} aria-hidden /> {done ? 'Mark not complete' : 'Mark complete'}
              </Button>
            </Card>
            <Card className="p-5">
              <CardTitle icon={<NotebookPen size={18} aria-hidden />} className="mb-3">
                Your notes
              </CardTitle>
              <MarkdownNotes label="Lesson notes" value={note} onChange={(v) => setLessonNote(id, v)} />
            </Card>
            <nav className="flex flex-wrap justify-between gap-3" aria-label="Lesson navigation">
              {prev ? (
                <LinkButton to={`/lesson/${prev.id}`}>
                  <ArrowLeft size={16} aria-hidden /> <span className="max-w-[16rem] truncate">{prev.title}</span>
                </LinkButton>
              ) : (
                <span />
              )}
              {next && (
                <LinkButton to={`/lesson/${next.id}`} variant="primary">
                  <span className="max-w-[16rem] truncate">{next.title}</span> <ArrowRight size={16} aria-hidden />
                </LinkButton>
              )}
            </nav>
          </div>
        </div>
        <aside className="hidden xl:block">
          <div className="sticky top-8">
            <Toc headings={doc.headings} />
          </div>
        </aside>
      </div>
    </article>
  );
}
