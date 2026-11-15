import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, Download, Eye, Pencil, RotateCcw, FileText, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import { TEMPLATES, TEMPLATE_CATEGORIES, templateById, type TemplateDoc } from '../lib/templates';
import { renderMarkdown, renderUserMarkdown } from '../lib/markdown';
import { downloadText } from '../lib/backup';
import { Button, Card, Chip, PageHeader, Tabs, Textarea, cx, useConfirm } from '../components/ui';
import { NotFound } from './NotFound';

const CAT_COLOR: Record<string, 'lavender' | 'sky' | 'mint' | 'peach' | 'butter' | 'pink'> = {
  Discover: 'lavender',
  Strategy: 'lavender',
  Build: 'lavender',
  Design: 'lavender',
  Measure: 'sky',
  AI: 'mint',
  Career: 'peach',
};

function TemplateList() {
  const drafts = useStore((s) => s.templateDrafts);
  const [cat, setCat] = useState<string>('All');
  const shown = cat === 'All' ? TEMPLATES : TEMPLATES.filter((t) => t.category === cat);
  return (
    <div>
      <PageHeader title="Templates" kicker={<Chip color="butter">{TEMPLATES.length} templates</Chip>}>
        Fill-in-the-blank documents with guidance and a filled example for each. Your drafts save automatically in this browser; copy or download them as Markdown when ready.
      </PageHeader>
      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {['All', ...TEMPLATE_CATEGORIES].map((c) => (
          <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={cx('nb-chip cursor-pointer', cat === c && 'bg-butter text-onpastel')}>
            {c}
          </button>
        ))}
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((t) => {
          const started = !!drafts[t.id] && drafts[t.id] !== t.blank;
          return (
            <li key={t.id}>
              <Link to={`/templates/${t.id}`} className="block h-full rounded-[10px]">
                <Card hover className="flex h-full flex-col p-5">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Chip color={CAT_COLOR[t.category]}>{t.category}</Chip>
                    <Chip>Week {t.week}</Chip>
                    {started && <Chip color="butter">Draft saved</Chip>}
                  </div>
                  <h2 className="text-lg font-bold leading-snug">{t.title}</h2>
                  <p className="mt-1 flex-1 text-sm text-muted">{t.summary}</p>
                  <ArrowRight size={18} className="mt-3 self-end" aria-hidden />
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function TemplateDetail({ t }: { t: TemplateDoc }) {
  const draft = useStore((s) => s.templateDrafts[t.id]);
  const setDraft = useStore((s) => s.setTemplateDraft);
  const [tab, setTab] = useState<'fill' | 'example'>('fill');
  const [preview, setPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const confirm = useConfirm();
  const text = draft ?? t.blank;
  const guideHtml = useMemo(() => renderMarkdown(t.guide), [t.guide]);
  const exampleHtml = useMemo(() => renderMarkdown(t.example), [t.example]);
  const previewHtml = useMemo(() => (preview ? renderUserMarkdown(text) : ''), [preview, text]);
  const idx = TEMPLATES.findIndex((x) => x.id === t.id);
  const next = TEMPLATES[idx + 1];

  useEffect(() => {
    document.title = `${t.title} · PM Path`;
    return () => {
      document.title = 'PM Path';
    };
  }, [t.title]);

  const copy = async () => {
    await navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <Link to="/templates" className="mb-4 inline-flex items-center gap-1 text-sm font-semibold hover:underline">
        <ArrowLeft size={14} aria-hidden /> All templates
      </Link>
      <PageHeader title={t.title} kicker={<div className="flex gap-2"><Chip color={CAT_COLOR[t.category]}>{t.category}</Chip><Link to={`/week/${t.week}`}><Chip>Used in Week {t.week}</Chip></Link></div>}>
        {t.summary}
      </PageHeader>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-4">
          <Tabs
            label="Template view"
            value={tab}
            onChange={setTab}
            tabs={[
              { id: 'fill', label: <span className="inline-flex items-center gap-1"><Pencil size={14} aria-hidden /> Fill it in</span> },
              { id: 'example', label: <span className="inline-flex items-center gap-1"><FileText size={14} aria-hidden /> Filled example</span> },
            ]}
          />
          {tab === 'fill' ? (
            <Card className="space-y-3 p-4">
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => setPreview((p) => !p)} aria-pressed={preview}>
                  {preview ? <Pencil size={14} aria-hidden /> : <Eye size={14} aria-hidden />} {preview ? 'Edit' : 'Preview'}
                </Button>
                <Button size="sm" onClick={copy}>
                  {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />} {copied ? 'Copied' : 'Copy Markdown'}
                </Button>
                <Button size="sm" onClick={() => downloadText(`${t.id}.md`, text, 'text/markdown')}>
                  <Download size={14} aria-hidden /> Download .md
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    if (confirm('Replace your current draft with the filled example so you can edit it?')) setDraft(t.id, t.example);
                  }}
                >
                  Edit the example
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    if (confirm('Reset this draft to the blank template? Your text will be lost.')) setDraft(t.id, t.blank);
                  }}
                >
                  <RotateCcw size={14} aria-hidden /> Reset
                </Button>
              </div>
              {preview ? (
                <div className="prose-pm max-w-none rounded-[8px] border-2 border-line bg-surface p-4" dangerouslySetInnerHTML={{ __html: previewHtml }} />
              ) : (
                <Textarea
                  aria-label={`${t.title} draft`}
                  value={text}
                  onChange={(e) => setDraft(t.id, e.target.value)}
                  rows={28}
                  className="font-mono text-sm leading-relaxed"
                  spellCheck
                />
              )}
              <p className="text-xs text-muted">Replace each {'{placeholder}'}. Saved automatically. Markdown pastes cleanly into Notion and Google Docs (with Markdown enabled).</p>
            </Card>
          ) : (
            <Card className="p-5">
              <p className="mb-3 text-sm text-muted">An example based on the FlatSplit case used throughout PM Path. Use it for structure and level of detail, not as words to copy.</p>
              <div className="prose-pm max-w-none" dangerouslySetInnerHTML={{ __html: exampleHtml }} />
            </Card>
          )}
        </div>
        <aside className="space-y-4">
          <Card className="p-5" color="butter">
            <div className="prose-pm prose-sm max-w-none text-onpastel" dangerouslySetInnerHTML={{ __html: guideHtml }} />
          </Card>
          {next && (
            <Link to={`/templates/${next.id}`} className="block rounded-[10px]">
              <Card hover className="p-4">
                <p className="nb-label">Next template</p>
                <p className="font-semibold">{next.title}</p>
              </Card>
            </Link>
          )}
        </aside>
      </div>
    </div>
  );
}

export default function Templates() {
  const { id } = useParams();
  if (!id) return <TemplateList />;
  const t = templateById(id);
  if (!t) return <NotFound />;
  return <TemplateDetail key={t.id} t={t} />;
}
