import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Wrench } from 'lucide-react';
import { loadToolGuide, type LoadedDoc } from '../lib/content';
import { WEEKS, PHASES } from '../data/curriculum';
import { Chip } from '../components/ui';
import { PageLoading } from '../components/Layout';
import { NotFound } from './NotFound';
import { DocBody, ReadingProgress, Toc } from './LessonPage';

export default function ToolGuidePage() {
  const { id = '' } = useParams();
  const [doc, setDoc] = useState<LoadedDoc | null | undefined>(undefined);
  useEffect(() => {
    let live = true;
    setDoc(undefined);
    loadToolGuide(id).then((d) => live && setDoc(d));
    return () => {
      live = false;
    };
  }, [id]);
  if (doc === undefined) return <PageLoading />;
  if (doc === null) return <NotFound />;
  const wn = Number(id.match(/^w(\d+)-/)?.[1]);
  const week = WEEKS.find((w) => w.n === wn);
  const phase = week ? PHASES.find((p) => p.id === week.phase) : undefined;
  return (
    <article>
      <ReadingProgress />
      {week && (
        <div className="mb-4">
          <Link to={`/week/${week.n}#tools`} className="inline-flex items-center gap-1 text-sm font-semibold hover:underline">
            <ArrowLeft size={14} aria-hidden /> Week {week.n}: {week.title}
          </Link>
        </div>
      )}
      <header className="mb-8 max-w-[70ch]">
        <div className="mb-3 flex flex-wrap gap-2">
          <Chip color={phase?.color ?? 'butter'}>
            <Wrench size={13} aria-hidden /> Tool guide{week ? ` · Week ${week.n}` : ''}
          </Chip>
          <Chip>{doc.estimatedMinutes} min read</Chip>
        </div>
        <h1 className="text-3xl font-bold leading-tight sm:text-[2.6rem]">{doc.title}</h1>
      </header>
      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          <DocBody doc={doc} />
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
