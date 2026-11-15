import { useRef, useState } from 'react';
import { Download, Upload, RotateCcw, Moon, Sun, Monitor, KeyRound } from 'lucide-react';
import { useStore, getData } from '../store/useStore';
import { serializeBackup, parseBackup, downloadText } from '../lib/backup';
import { Button, Card, CardTitle, Field, Input, PageHeader, Callout, cx, LinkButton } from '../components/ui';
import { today, weekdayOf, formatDate } from '../lib/dates';

export default function Settings() {
  const settings = useStore((s) => s.settings);
  const updateSettings = useStore((s) => s.updateSettings);
  const replaceAll = useStore((s) => s.replaceAll);
  const reset = useStore((s) => s.reset);
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  const [showKey, setShowKey] = useState(false);

  const doExport = () => {
    downloadText(`pm-path-backup-${today()}.json`, serializeBackup(getData()));
    setMsg({ kind: 'ok', text: 'Backup downloaded. Keep it somewhere safe, like Google Drive.' });
  };

  const doImport = async (file: File) => {
    const text = await file.text();
    const res = parseBackup(text);
    if (!res.ok) {
      setMsg({ kind: 'err', text: res.error });
      return;
    }
    const when = res.exportedAt ? ` from ${new Date(res.exportedAt).toLocaleString('en-IN')}` : '';
    if (!window.confirm(`Import this backup${when}? It will replace all progress currently in this browser.`)) return;
    replaceAll(res.data);
    setMsg({ kind: 'ok', text: 'Backup imported. Your progress has been restored.' });
  };

  const doReset = () => {
    if (!window.confirm('Reset ALL progress? This deletes lessons, hours, notes, applications and everything else stored in this browser.')) return;
    if (!window.confirm('Are you sure? Export a backup first if you might want this data later. This cannot be undone.')) return;
    reset();
    setMsg({ kind: 'ok', text: 'All progress has been reset.' });
  };

  const startNotMonday = weekdayOf(settings.startDate) !== 1;

  return (
    <div>
      <PageHeader title="Settings">Everything is stored only in this browser. Export a backup regularly.</PageHeader>
      {msg && (
        <div role="status" className={cx('nb-card mb-6 p-4', msg.kind === 'ok' ? 'bg-mint' : 'bg-pink')}>
          {msg.text}
        </div>
      )}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4 p-5">
          <CardTitle>Profile and plan</CardTitle>
          <Field label="Name">{(id) => <Input id={id} value={settings.name} onChange={(e) => updateSettings({ name: e.target.value })} />}</Field>
          <Field label="Start date" hint={startNotMonday ? 'Tip: start on a Monday so the weekly rhythm lines up with the calendar.' : `Week 1 runs ${formatDate(settings.startDate)} onward.`}>
            {(id) => <Input id={id} type="date" value={settings.startDate} onChange={(e) => e.target.value && updateSettings({ startDate: e.target.value })} />}
          </Field>
          <Field label="Daily study hours (Mon–Sat)" hint={`Weekly target: ${settings.dailyHours * 6} hours. The roadmap is designed around 9.`}>
            {(id) => (
              <Input id={id} type="number" min={1} max={14} step={0.5} value={settings.dailyHours} onChange={(e) => updateSettings({ dailyHours: Math.max(1, Math.min(14, Number(e.target.value) || 9)) })} />
            )}
          </Field>
        </Card>

        <Card className="space-y-4 p-5">
          <CardTitle>Appearance</CardTitle>
          <div role="radiogroup" aria-label="Theme" className="flex flex-wrap gap-3">
            {(
              [
                ['light', 'Light', <Sun size={16} aria-hidden key="s" />],
                ['dark', 'Dark', <Moon size={16} aria-hidden key="m" />],
                ['system', 'System', <Monitor size={16} aria-hidden key="c" />],
              ] as const
            ).map(([v, label, icon]) => (
              <button key={v} role="radio" aria-checked={settings.theme === v} onClick={() => updateSettings({ theme: v })} className={cx('nb-btn', settings.theme === v && 'bg-butter text-onpastel')}>
                {icon}
                {label}
              </button>
            ))}
          </div>
          <p className="text-sm text-muted">
            See every component in the <LinkButton to="/styleguide" size="sm" variant="ghost">styleguide</LinkButton>.
          </p>
        </Card>

        <Card className="space-y-4 p-5">
          <CardTitle>Backup and restore</CardTitle>
          <p className="text-sm">Your progress lives in this browser’s storage. Clearing site data or switching devices loses it, so export a backup every Sunday.</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={doExport}>
              <Download size={16} aria-hidden /> Export JSON
            </Button>
            <Button onClick={() => fileRef.current?.click()}>
              <Upload size={16} aria-hidden /> Import JSON
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              aria-label="Choose backup file"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) doImport(f);
                e.target.value = '';
              }}
            />
          </div>
        </Card>

        <Card className="space-y-4 p-5">
          <CardTitle icon={<KeyRound size={18} aria-hidden />}>Optional: your own API key</CardTitle>
          <p className="text-sm">
            Only used by the Prompt Lab’s optional “run live” button, to call Google’s Gemini API (free tier) directly from your browser. The site works fully without it. The key is stored only in this browser and is included in exports, so keep your backup private.
          </p>
          <Field label="Gemini API key">
            {(id) => (
              <div className="flex gap-2">
                <Input id={id} type={showKey ? 'text' : 'password'} autoComplete="off" value={settings.apiKey} onChange={(e) => updateSettings({ apiKey: e.target.value.trim() })} placeholder="Paste key from Google AI Studio" />
                <Button onClick={() => setShowKey((s) => !s)} aria-pressed={showKey}>
                  {showKey ? 'Hide' : 'Show'}
                </Button>
              </div>
            )}
          </Field>
        </Card>

        <Card className="space-y-4 p-5 lg:col-span-2" color="pink">
          <CardTitle icon={<RotateCcw size={18} aria-hidden />}>Reset progress</CardTitle>
          <p className="text-sm">Deletes everything stored by PM Path in this browser. You will be asked twice.</p>
          <Button variant="danger" onClick={doReset} className="bg-surface">
            Reset all progress
          </Button>
        </Card>
      </div>
      <div className="mt-6">
        <Callout kind="tip">Offline: after your first visit, PM Path works without internet. Install it from your browser menu (“Install app” or “Add to Home screen”) for a one-tap launch.</Callout>
      </div>
    </div>
  );
}
