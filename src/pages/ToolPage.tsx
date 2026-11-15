import { Suspense, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { TOOLS } from '../tools/registry';
import { Chip, PageHeader } from '../components/ui';
import { PageLoading } from '../components/Layout';
import { NotFound } from './NotFound';

export default function ToolPage() {
  const { tool = '' } = useParams();
  const def = TOOLS.find((t) => t.slug === tool && t.Component);
  useEffect(() => {
    if (def) document.title = `${def.name} · PM Path`;
    return () => {
      document.title = 'PM Path';
    };
  }, [def]);
  if (!def || !def.Component) return <NotFound />;
  const C = def.Component;
  return (
    <div>
      <Link to="/toolkit" className="mb-4 inline-flex items-center gap-1 text-sm font-semibold hover:underline">
        <ArrowLeft size={14} aria-hidden /> Toolkit
      </Link>
      <PageHeader title={def.name} kicker={<Chip color={def.color}>Used in Week {def.week}</Chip>}>
        {def.blurb}
      </PageHeader>
      <Suspense fallback={<PageLoading />}>
        <C />
      </Suspense>
    </div>
  );
}
