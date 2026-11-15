import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Check } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { uid } from '../../lib/uid';
import type { Story } from '../../data/types';
import { Button, Card, Chip, Field, Input, ProgressBar, Textarea, cx, useConfirm } from '../../components/ui';

export const STORY_THEMES: { id: string; title: string; answers: string[] }[] = [
  { id: 'conflict', title: 'Disagreement or conflict', answers: ['Tell me about a time you disagreed with someone', 'How do you handle conflict with engineers?'] },
  { id: 'failure', title: 'A failure or mistake', answers: ['Tell me about a time you failed', 'What is your biggest mistake?'] },
  { id: 'influence', title: 'Influence without authority', answers: ['How did you get people to follow your idea?', 'Tell me about leading without a title'] },
  { id: 'data', title: 'A decision driven by data', answers: ['Tell me about a time you used data', 'How do you make decisions?'] },
  { id: 'ambiguity', title: 'Handling ambiguity', answers: ['Tell me about an unclear project', 'How do you work without clear direction?'] },
  { id: 'customer', title: 'Deep customer understanding', answers: ['Tell me about a time you understood a user deeply', 'How do you gather feedback?'] },
  { id: 'deadline', title: 'Tight deadline or trade-off', answers: ['Tell me about delivering under pressure', 'Tell me about a time you cut scope'] },
  { id: 'technical', title: 'Working on something technical', answers: ['Tell me about working with engineers', 'Explain a technical concept you learned'] },
  { id: 'feedback', title: 'Receiving tough feedback', answers: ['Tell me about critical feedback you received', 'How do you grow?'] },
  { id: 'proud', title: 'Achievement you’re proudest of', answers: ['What are you most proud of?', 'Tell me about a project you led end to end'] },
];

const EMPTY = (id: string, title: string, tags: string[]): Story => ({ id, title, situation: '', task: '', action: '', result: '', tags });

function filled(s?: Story) {
  return !!s && [s.situation, s.task, s.action, s.result].every((x) => x.trim().length > 10);
}

function StoryEditor({ story, onChange, onDelete, hint }: { story: Story; onChange: (s: Story) => void; onDelete?: () => void; hint?: string[] }) {
  const set = (k: keyof Story) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange({ ...story, [k]: e.target.value });
  return (
    <div className="space-y-3">
      {hint && <p className="text-sm text-muted">Answers: {hint.map((h) => `“${h}”`).join(' · ')}</p>}
      <Field label="Story title">{(id) => <Input id={id} value={story.title} onChange={set('title')} />}</Field>
      <Field label="Situation" hint="Context in 1–2 sentences">{(id) => <Textarea id={id} rows={2} value={story.situation} onChange={set('situation')} />}</Field>
      <Field label="Task" hint="Your responsibility">{(id) => <Textarea id={id} rows={2} value={story.task} onChange={set('task')} />}</Field>
      <Field label="Action" hint="3–4 steps you took. Use “I”.">{(id) => <Textarea id={id} rows={5} value={story.action} onChange={set('action')} />}</Field>
      <Field label="Result" hint="Outcome with numbers + what you learned">{(id) => <Textarea id={id} rows={3} value={story.result} onChange={set('result')} />}</Field>
      {onDelete && (
        <Button size="sm" variant="ghost" onClick={onDelete}>
          <Trash2 size={14} aria-hidden /> Delete story
        </Button>
      )}
    </div>
  );
}

export function StoryBank() {
  const stories = useStore((s) => s.stories);
  const upsert = useStore((s) => s.upsertStory);
  const remove = useStore((s) => s.removeStory);
  const confirm = useConfirm();
  const [open, setOpen] = useState<string>(STORY_THEMES[0].id);
  const byId = new Map(stories.map((s) => [s.id, s]));
  const extras = stories.filter((s) => !STORY_THEMES.some((t) => t.id === s.id));
  const doneCount = STORY_THEMES.filter((t) => filled(byId.get(t.id))).length;

  return (
    <div className="space-y-5">
      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-semibold">{doneCount} of 10 core stories ready</p>
            <p className="text-sm text-muted">One strong story can answer several questions. See the <Link to="/templates/star-story" className="underline">STAR template</Link> for a filled example.</p>
          </div>
          <Button
            onClick={() => {
              const s = EMPTY(uid(), 'New story', []);
              upsert(s);
              setOpen(s.id);
            }}
          >
            <Plus size={16} aria-hidden /> Add extra story
          </Button>
        </div>
        <ProgressBar value={doneCount * 10} className="mt-3" label="Stories ready" />
      </Card>
      <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <ul className="space-y-1.5" aria-label="Stories">
          {[...STORY_THEMES.map((t) => ({ id: t.id, title: t.title })), ...extras.map((e) => ({ id: e.id, title: e.title || 'Untitled' }))].map((t) => (
            <li key={t.id}>
              <button onClick={() => setOpen(t.id)} aria-current={open === t.id} className={cx('flex w-full items-center justify-between gap-2 rounded-[8px] border-2 px-3 py-2 text-left text-sm', open === t.id ? 'border-line bg-butter text-onpastel' : 'border-transparent hover:border-line')}>
                <span>{t.title}</span>
                {filled(byId.get(t.id)) && <Check size={16} aria-label="ready" />}
              </button>
            </li>
          ))}
        </ul>
        <Card className="p-5">
          {(() => {
            const theme = STORY_THEMES.find((t) => t.id === open);
            const story = byId.get(open) ?? (theme ? EMPTY(theme.id, '', [theme.title]) : undefined);
            if (!story) return <p className="text-muted">Pick a story on the left.</p>;
            return (
              <>
                <div className="mb-3 flex items-center gap-2">
                  <h2 className="text-xl font-bold">{theme?.title ?? 'Extra story'}</h2>
                  {filled(byId.get(open)) && <Chip color="mint">Ready</Chip>}
                </div>
                <StoryEditor
                  key={open}
                  story={story}
                  hint={theme?.answers}
                  onChange={upsert}
                  onDelete={
                    theme
                      ? undefined
                      : () => {
                          if (confirm('Delete this story?')) {
                            remove(open);
                            setOpen(STORY_THEMES[0].id);
                          }
                        }
                  }
                />
              </>
            );
          })()}
        </Card>
      </div>
    </div>
  );
}
