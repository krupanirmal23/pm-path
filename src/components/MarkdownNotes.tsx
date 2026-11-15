import { useEffect, useRef, useState } from 'react';
import { renderUserMarkdown } from '../lib/markdown';
import { Tabs, Textarea } from './ui';

/** Markdown notes with write/preview tabs. Autosaves after a short pause. */
export function MarkdownNotes({ value, onChange, label, placeholder }: { value: string; onChange: (v: string) => void; label: string; placeholder?: string }) {
  const [mode, setMode] = useState<'write' | 'preview'>('write');
  const [draft, setDraft] = useState(value);
  const [saved, setSaved] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => setDraft(value), [value]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const change = (v: string) => {
    setDraft(v);
    setSaved(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      onChange(v);
      setSaved(true);
    }, 500);
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <Tabs
          label={`${label} mode`}
          value={mode}
          onChange={setMode}
          tabs={[
            { id: 'write', label: 'Write' },
            { id: 'preview', label: 'Preview' },
          ]}
        />
        <span className="text-xs text-muted" aria-live="polite">
          {saved ? 'Saved' : 'Saving…'}
        </span>
      </div>
      {mode === 'write' ? (
        <Textarea
          aria-label={label}
          value={draft}
          onChange={(e) => change(e.target.value)}
          onBlur={() => {
            clearTimeout(timer.current);
            if (!saved) {
              onChange(draft);
              setSaved(true);
            }
          }}
          rows={8}
          placeholder={placeholder ?? 'Markdown works: **bold**, - lists, ## headings'}
          className="font-mono text-sm"
        />
      ) : (
        <div className="nb-input min-h-[8rem]">
          {draft.trim() ? <div className="prose-pm" dangerouslySetInnerHTML={{ __html: renderUserMarkdown(draft) }} /> : <p className="text-muted">Nothing written yet.</p>}
        </div>
      )}
    </div>
  );
}
