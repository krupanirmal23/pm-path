import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button, Card, CardTitle, Chip, StatusChip, ProgressBar, ProgressRing, Input, Textarea, Checkbox, Select, Tabs, Callout, PageHeader, Stat, Reveal, Field, EmptyState } from '../components/ui';
import { renderMarkdown } from '../lib/markdown';
import type { Pastel } from '../data/types';

const SWATCHES: { name: string; token: string; hex: string }[] = [
  { name: 'Cream (background)', token: 'bg', hex: '#FFF8EE' },
  { name: 'Surface', token: 'surface', hex: '#FFFFFF' },
  { name: 'Ink', token: 'ink', hex: '#1E1E24' },
  { name: 'Muted text', token: 'muted', hex: '#5B5B66' },
  { name: 'Lavender — Phase 1', token: 'lavender', hex: '#D9CCF5' },
  { name: 'Sky — Phase 2', token: 'sky', hex: '#CFE6FF' },
  { name: 'Mint — Phase 3 / done', token: 'mint', hex: '#CDEFD9' },
  { name: 'Peach — Phase 4', token: 'peach', hex: '#FFDCC2' },
  { name: 'Butter — highlight / today / in progress', token: 'butter', hex: '#FFF1B8' },
  { name: 'Pink — streaks / celebrations / blocked', token: 'pink', hex: '#FFD6E0' },
];

const SAMPLE_MD = `Lesson prose renders like this. **Bold** text, \`inline code\`, and a [link](#).

> [!TIP]
> Tip callout: short, practical advice.

> [!WARNING]
> Warning callout: a common mistake.

> [!EXAMPLE]
> Example callout: a worked case from an Indian product.

> [!INTERVIEW]
> Interview callout: how this shows up in an interview.

| Metric | Value |
|---|---|
| DAU | 1.2M |
| D7 retention | 34% |

\`\`\`sql
SELECT city, COUNT(*) FROM orders GROUP BY city;
\`\`\``;

export default function Styleguide() {
  const [tab, setTab] = useState<'a' | 'b' | 'c'>('a');
  const [checked, setChecked] = useState(true);
  return (
    <div className="space-y-10">
      <PageHeader title="Styleguide" kicker={<Chip color="butter">Design system</Chip>}>
        Every component in one place, so the look stays consistent. Pastel skin, subtle neo-brutalist bones.
      </PageHeader>

      <section aria-labelledby="sg-colours">
        <h2 id="sg-colours" className="mb-4 text-2xl font-bold">Colour tokens</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {SWATCHES.map((s) => (
            <div key={s.token} className="nb-card overflow-hidden">
              <div className={`h-16 border-b-2 border-line bg-${s.token}`} />
              <div className="p-3 text-sm">
                <div className="font-display font-semibold">{s.name}</div>
                <code className="text-xs text-muted">{s.hex}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="sg-type">
        <h2 id="sg-type" className="mb-4 text-2xl font-bold">Typography</h2>
        <Card className="space-y-3 p-6">
          <p className="font-display text-5xl font-bold">Space Grotesk 700</p>
          <p className="font-display text-2xl font-semibold">Space Grotesk 600 — headings</p>
          <p>Inter 400 at 17px with a 1.7 line height. Body copy stays under about 70 characters per line so it is easy to read for hours.</p>
          <p className="font-medium">Inter 500 — emphasis and labels.</p>
          <p className="font-mono text-sm">JetBrains Mono — SELECT * FROM orders;</p>
        </Card>
      </section>

      <section aria-labelledby="sg-buttons">
        <h2 id="sg-buttons" className="mb-4 text-2xl font-bold">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button>Default</Button>
          <Button color="mint">Mint</Button>
          <Button color="sky">Sky</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="sm">Small</Button>
          <Button disabled>Disabled</Button>
          <Button aria-label="Star">
            <Star size={16} aria-hidden />
          </Button>
        </div>
      </section>

      <section aria-labelledby="sg-cards">
        <h2 id="sg-cards" className="mb-4 text-2xl font-bold">Cards</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(['lavender', 'sky', 'mint', 'peach'] as Pastel[]).map((c) => (
            <Card key={c} color={c} hover className="p-4">
              <CardTitle>{c[0].toUpperCase() + c.slice(1)} card</CardTitle>
              <p className="mt-1 text-sm">Hover me: I lift by 2px and my shadow grows.</p>
            </Card>
          ))}
          <Card className="p-4">
            <Stat label="Hours this week" value="31.5" sub="of 54 target" />
          </Card>
        </div>
      </section>

      <section aria-labelledby="sg-chips">
        <h2 id="sg-chips" className="mb-4 text-2xl font-bold">Chips and status</h2>
        <div className="flex flex-wrap gap-2">
          <Chip>Default</Chip>
          <Chip color="lavender">Phase 1</Chip>
          <Chip color="sky">Phase 2</Chip>
          <Chip color="mint">Phase 3</Chip>
          <Chip color="peach">Phase 4</Chip>
          <StatusChip status="done" />
          <StatusChip status="in_progress" />
          <StatusChip status="not_started" />
          <StatusChip status="blocked" />
        </div>
      </section>

      <section aria-labelledby="sg-inputs">
        <h2 id="sg-inputs" className="mb-4 text-2xl font-bold">Inputs</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Text input" hint="A hint goes here.">
            {(id) => <Input id={id} placeholder="Type something" />}
          </Field>
          <Field label="Select">
            {(id) => (
              <Select id={id}>
                <option>Option one</option>
                <option>Option two</option>
              </Select>
            )}
          </Field>
          <Field label="Textarea">{(id) => <Textarea id={id} placeholder="Notes…" />}</Field>
          <div className="space-y-3 pt-6">
            <Checkbox checked={checked} onChange={setChecked} label="A checked checkbox" />
            <Checkbox checked={!checked} onChange={(v) => setChecked(!v)} label="An unchecked checkbox" />
          </div>
        </div>
      </section>

      <section aria-labelledby="sg-progress">
        <h2 id="sg-progress" className="mb-4 text-2xl font-bold">Progress</h2>
        <div className="grid items-center gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <ProgressBar value={0} label="Empty" />
            <ProgressBar value={35} color="butter" label="35%" />
            <ProgressBar value={72} color="sky" label="72%" />
            <ProgressBar value={100} label="Full" />
          </div>
          <div className="flex gap-6">
            <ProgressRing value={42} color="lavender">
              <span className="font-display text-2xl font-bold">42%</span>
            </ProgressRing>
            <ProgressRing value={88} size={96} stroke={12}>
              <span className="font-display font-bold">88%</span>
            </ProgressRing>
          </div>
        </div>
      </section>

      <section aria-labelledby="sg-tabs">
        <h2 id="sg-tabs" className="mb-4 text-2xl font-bold">Tabs</h2>
        <Tabs
          label="Example tabs"
          value={tab}
          onChange={setTab}
          tabs={[
            { id: 'a', label: 'First' },
            { id: 'b', label: 'Second' },
            { id: 'c', label: 'Third' },
          ]}
        />
        <Card className="mt-3 p-4">Selected tab: {tab}</Card>
      </section>

      <section aria-labelledby="sg-callouts">
        <h2 id="sg-callouts" className="mb-4 text-2xl font-bold">Callouts</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Callout kind="tip">Ask about the last time it happened, not what they would do.</Callout>
          <Callout kind="warning">Don’t present an output (a feature shipped) as an outcome.</Callout>
          <Callout kind="example">Swiggy Instamart’s 10-minute promise changed what users expect.</Callout>
          <Callout kind="interview">Interviewers want to see you pick a user before a solution.</Callout>
        </div>
      </section>

      <section aria-labelledby="sg-other">
        <h2 id="sg-other" className="mb-4 text-2xl font-bold">Reveal and empty state</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Reveal label="Reveal model answer">
            <p>Hidden content appears here after you try the exercise.</p>
          </Reveal>
          <EmptyState title="Nothing here yet">Add your first item to get started.</EmptyState>
        </div>
      </section>

      <section aria-labelledby="sg-prose">
        <h2 id="sg-prose" className="mb-4 text-2xl font-bold">Lesson prose</h2>
        <Card className="p-6">
          <div className="prose-pm" dangerouslySetInnerHTML={{ __html: renderMarkdown(SAMPLE_MD) }} />
        </Card>
      </section>
    </div>
  );
}
