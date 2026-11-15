import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TOOLS } from '../tools/registry';
import { Card, Chip, PageHeader } from '../components/ui';

export default function Toolkit() {
  return (
    <div>
      <PageHeader title="Toolkit" kicker={<Chip color="butter">Works offline</Chip>}>
        Ten built-in tools for hands-on practice. Everything runs in your browser; your work is saved locally.
      </PageHeader>
      <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {TOOLS.map((t) => (
          <li key={t.slug}>
            <Link to={t.to ?? `/toolkit/${t.slug}`} className="block h-full rounded-[10px]">
              <Card hover className="flex h-full flex-col p-5">
                <div className={`mb-3 h-2 w-16 rounded-full border-2 border-line bg-${t.color}`} aria-hidden />
                <h2 className="text-lg font-bold">{t.name}</h2>
                <p className="mt-1 flex-1 text-sm text-muted">{t.blurb}</p>
                <div className="mt-4 flex items-center justify-between">
                  <Chip>Week {t.week}</Chip>
                  <ArrowRight size={18} aria-hidden />
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
