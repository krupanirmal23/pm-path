import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Play, X, Check } from 'lucide-react';
import { PROMPT_LIBRARY } from './promptLibrary';
import { useStore } from '../store/useStore';
import { Button, Callout, Card, CardTitle, Chip, Field, Input, Textarea, cx } from '../components/ui';

async function runGemini(apiKey: string, model: string, prompt: string): Promise<string> {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: { temperature: 0.2, maxOutputTokens: 600 } }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || `Request failed (${res.status})`);
  return data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? '').join('') || '(empty response)';
}

export default function PromptLab() {
  const [id, setId] = useState(PROMPT_LIBRARY[0].id);
  const ex = PROMPT_LIBRARY.find((p) => p.id === id)!;
  const apiKey = useStore((s) => s.settings.apiKey);
  const [model, setModel] = useState('gemini-2.5-flash');
  const [live, setLive] = useState('');
  const [liveOut, setLiveOut] = useState<string | null>(null);
  const [liveErr, setLiveErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const copy = (t: string) => navigator.clipboard?.writeText(t);

  return (
    <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
      <aside>
        <Card className="p-3">
          <p className="px-2 pb-2 font-display text-xs font-bold uppercase tracking-widest text-muted">Examples</p>
          <ul className="space-y-1">
            {PROMPT_LIBRARY.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => {
                    setId(p.id);
                    setLive(p.goodPrompt);
                    setLiveOut(null);
                    setLiveErr(null);
                  }}
                  className={cx('w-full rounded-[8px] border-2 px-2 py-1.5 text-left text-sm', id === p.id ? 'border-line bg-butter text-onpastel' : 'border-transparent hover:border-line')}
                >
                  {p.title}
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </aside>
      <section className="min-w-0 space-y-4">
        <Card className="p-5">
          <h2 className="text-xl font-bold">{ex.title}</h2>
          <p className="text-sm text-muted">{ex.task}</p>
        </Card>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-4" color="pink">
            <div className="mb-2 flex items-center justify-between">
              <CardTitle icon={<X size={16} aria-hidden />}>Weak prompt</CardTitle>
              <Button size="sm" onClick={() => copy(ex.badPrompt)} aria-label="Copy weak prompt" className="bg-surface">
                <Copy size={14} aria-hidden />
              </Button>
            </div>
            <pre className="whitespace-pre-wrap rounded-[8px] bg-surface p-3 font-mono text-xs text-ink">{ex.badPrompt}</pre>
            <p className="nb-label mt-3">Example output</p>
            <p className="rounded-[8px] bg-surface/70 p-3 text-sm italic text-ink">{ex.badOutput}</p>
            <p className="nb-label mt-3">What goes wrong</p>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {ex.problems.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </Card>
          <Card className="p-4" color="mint">
            <div className="mb-2 flex items-center justify-between">
              <CardTitle icon={<Check size={16} aria-hidden />}>Strong prompt</CardTitle>
              <Button size="sm" onClick={() => copy(ex.goodPrompt)} aria-label="Copy strong prompt" className="bg-surface">
                <Copy size={14} aria-hidden />
              </Button>
            </div>
            <pre className="whitespace-pre-wrap rounded-[8px] bg-surface p-3 font-mono text-xs text-ink">{ex.goodPrompt}</pre>
            <p className="nb-label mt-3">Example output</p>
            <p className="whitespace-pre-wrap rounded-[8px] bg-surface/70 p-3 text-sm text-ink">{ex.goodOutput}</p>
            <p className="nb-label mt-3">Why it works</p>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {ex.why.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </Card>
        </div>
        <p className="text-xs text-muted">Example outputs are pre-written illustrations so this lab works offline. Real model outputs vary.</p>

        <Card className="space-y-3 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>Optional: run live</CardTitle>
            <Chip color={apiKey ? 'mint' : undefined}>{apiKey ? 'API key set' : 'No API key'}</Chip>
          </div>
          {!apiKey ? (
            <Callout kind="tip">
              Everything above works without a key. To try prompts against a real model, add a free Gemini API key in <Link to="/settings" className="underline">Settings</Link> (stored only in this browser).
            </Callout>
          ) : (
            <>
              <Field label="Model name" hint="Use a model id from Google AI Studio.">
                {(fid) => <Input id={fid} value={model} onChange={(e) => setModel(e.target.value.trim())} />}
              </Field>
              <Field label="Prompt (replace {placeholders} with real text)">
                {(fid) => <Textarea id={fid} rows={8} value={live || ex.goodPrompt} onChange={(e) => setLive(e.target.value)} className="font-mono text-xs" />}
              </Field>
              <Button
                variant="primary"
                disabled={busy}
                onClick={async () => {
                  setBusy(true);
                  setLiveErr(null);
                  setLiveOut(null);
                  try {
                    setLiveOut(await runGemini(apiKey, model, live || ex.goodPrompt));
                  } catch (e) {
                    setLiveErr(String((e as Error).message || e));
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                <Play size={16} aria-hidden /> {busy ? 'Running…' : 'Run'}
              </Button>
              <div aria-live="polite">
                {liveErr && <p className="rounded-[8px] bg-pink p-3 text-sm text-onpastel">{liveErr}</p>}
                {liveOut && <pre className="whitespace-pre-wrap rounded-[8px] border-2 border-line bg-codebg p-3 font-mono text-xs">{liveOut}</pre>}
              </div>
              <p className="text-xs text-muted">Requests go directly from your browser to Google’s API. Don’t paste personal data on free tiers.</p>
            </>
          )}
        </Card>
      </section>
    </div>
  );
}
