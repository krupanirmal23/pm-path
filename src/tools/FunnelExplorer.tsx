import { useMemo, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend, ReferenceLine } from 'recharts';
import { mulberry32 } from './sql/dataset';
import { Button, Callout, Card, CardTitle, Field, Reveal, Select, Tabs } from '../components/ui';

const STEPS = ['App open', 'View restaurant', 'Add to cart', 'Checkout', 'Paid'];
const BASE_CONV = [1, 0.62, 0.48, 0.72, 0.9];
const PLATFORMS = ['android', 'ios', 'web'] as const;
const CITIES = ['Bengaluru', 'Mumbai', 'Delhi', 'Pune'] as const;
type Platform = (typeof PLATFORMS)[number];
type City = (typeof CITIES)[number];

interface Scenario {
  id: string;
  title: string;
  story: string;
  apply: (day: number, platform: Platform, city: City, step: number) => number; // multiplier
  questions: string[];
  answer: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'none',
    title: 'Normal weeks (no incident)',
    story: 'Explore a healthy funnel with weekly seasonality. Use this to learn the controls.',
    apply: () => 1,
    questions: ['Which step loses the most users?', 'How does the weekend pattern show up?'],
    answer: 'The biggest drop is from app open to viewing a restaurant (~38% leave), then view → add to cart. Weekends lift opens and orders; always compare with the same weekday last week.',
  },
  {
    id: 'android',
    title: 'Exercise 1: “Paid orders fell 12% on day 45”',
    story: 'Leadership flags a sudden drop in paid orders starting day 45. Find where and why.',
    apply: (day, platform, _c, step) => (day >= 45 && platform === 'android' && step >= 4 ? 0.7 : 1),
    questions: ['Is the drop sudden or gradual?', 'Which platform is affected?', 'Which funnel step dropped?', 'What’s your top hypothesis and the next check?'],
    answer: 'Sudden drop from day 45, only on Android, only at Checkout → Paid. Hypothesis: a payment issue on Android (an app release or a payment SDK/gateway change on that platform). Next: check Android app version split and payment error codes; roll back or hotfix; communicate.',
  },
  {
    id: 'rain',
    title: 'Exercise 2: “Bengaluru orders dipped for 3 days”',
    story: 'Orders in one city dipped mid-month and recovered. What happened?',
    apply: (day, _p, city, step) => (city === 'Bengaluru' && day >= 60 && day <= 62 && step >= 1 ? 0.75 : 1),
    questions: ['Is it one city or all?', 'Which steps are affected?', 'Internal or external cause?'],
    answer: 'Only Bengaluru, days 60–62, affecting every step after app open (users browse less and order less), then fully recovering. That pattern suggests an external event (e.g., heavy rain or a city-wide disruption), not a product bug. Confirm with weather/news and delivery partner supply; consider rain-mode messaging and surge handling.',
  },
  {
    id: 'web',
    title: 'Exercise 3: “Conversion slowly declining”',
    story: 'Overall conversion has slid gradually over the last month. Diagnose it.',
    apply: (day, platform, _c, step) => (platform === 'web' && step === 2 && day >= 50 ? Math.max(0.7, 1 - (day - 50) * 0.008) : 1),
    questions: ['Sudden or gradual?', 'Which platform and step?', 'What could cause a gradual decline?'],
    answer: 'A gradual decline from day 50 on Web only, at View restaurant → Add to cart. Gradual declines suggest a slowly growing issue: rising page load times, a creeping bug for some browsers, or a mix shift (more low-intent web traffic from a new campaign). Check web performance (p95 load), browser split and traffic sources.',
  },
];

function generate(scenario: Scenario, days: number) {
  const rnd = mulberry32(42);
  const rows: { day: number; platform: Platform; city: City; counts: number[] }[] = [];
  const pw = { android: 0.62, ios: 0.25, web: 0.13 };
  const cw = { Bengaluru: 0.34, Mumbai: 0.26, Delhi: 0.24, Pune: 0.16 };
  for (let d = 1; d <= days; d++) {
    const dow = d % 7;
    const weekend = dow === 5 || dow === 6 ? 1.25 : 1;
    const trend = 1 + d * 0.002;
    for (const p of PLATFORMS) {
      for (const c of CITIES) {
        const opens = Math.round(20000 * pw[p] * cw[c] * weekend * trend * (0.94 + rnd() * 0.12));
        const counts = [opens];
        for (let s = 1; s < STEPS.length; s++) {
          const conv = BASE_CONV[s] * (p === 'web' && s === 4 ? 0.92 : 1) * (0.97 + rnd() * 0.06) * scenario.apply(d, p, c, s);
          counts.push(Math.round(counts[s - 1] * Math.min(0.99, conv)));
        }
        rows.push({ day: d, platform: p, city: c, counts });
      }
    }
  }
  return rows;
}

function retentionCurves() {
  const weeks = Array.from({ length: 9 }, (_, w) => w);
  const curve = (floor: number, speed: number) => weeks.map((w) => (w === 0 ? 100 : Math.round((floor + (100 - floor) * Math.exp(-w / speed)) * 10) / 10));
  const organic = curve(26, 1.6);
  const paid = curve(9, 1.2);
  const coupon = curve(12, 1.1);
  return weeks.map((w) => ({ week: `W${w}`, Organic: organic[w], 'Paid social': paid[w], 'First-order coupon': coupon[w] }));
}

export default function FunnelExplorer() {
  const [scenarioId, setScenarioId] = useState('android');
  const [range, setRange] = useState<[number, number]>([1, 90]);
  const [platform, setPlatform] = useState<'all' | Platform>('all');
  const [city, setCity] = useState<'all' | City>('all');
  const [view, setView] = useState<'trend' | 'funnel' | 'retention'>('trend');
  const scenario = SCENARIOS.find((s) => s.id === scenarioId)!;
  const data = useMemo(() => generate(scenario, 90), [scenario]);

  const filtered = data.filter((r) => r.day >= range[0] && r.day <= range[1] && (platform === 'all' || r.platform === platform) && (city === 'all' || r.city === city));

  const daily = useMemo(() => {
    const m = new Map<number, number[]>();
    for (const r of filtered) {
      const cur = m.get(r.day) ?? STEPS.map(() => 0);
      r.counts.forEach((v, i) => (cur[i] += v));
      m.set(r.day, cur);
    }
    return [...m.entries()].sort((a, b) => a[0] - b[0]).map(([day, c]) => ({ day, Paid: c[4], 'Open→Paid %': Math.round((c[4] / c[0]) * 1000) / 10 }));
  }, [filtered]);

  const funnel = useMemo(() => {
    const tot = STEPS.map(() => 0);
    for (const r of filtered) r.counts.forEach((v, i) => (tot[i] += v));
    return STEPS.map((s, i) => ({ step: s, users: tot[i], conv: i === 0 ? 100 : Math.round((tot[i] / Math.max(1, tot[i - 1])) * 1000) / 10 }));
  }, [filtered]);

  const segBreak = useMemo(() => {
    const out: Record<string, { before: number[]; after: number[] }> = {};
    for (const r of data) {
      if (city !== 'all' && r.city !== city) continue;
      const key = r.platform;
      out[key] ||= { before: [0, 0], after: [0, 0] };
      const bucket = r.day >= 31 && r.day <= 44 ? 'before' : r.day >= 46 && r.day <= 59 ? 'after' : null;
      if (!bucket) continue;
      out[key][bucket][0] += r.counts[3];
      out[key][bucket][1] += r.counts[4];
    }
    return Object.entries(out).map(([p, v]) => ({ platform: p, before: Math.round((v.before[1] / Math.max(1, v.before[0])) * 1000) / 10, after: Math.round((v.after[1] / Math.max(1, v.after[0])) * 1000) / 10 }));
  }, [data, city]);

  const axis = { stroke: 'var(--c-ink)', fontSize: 11 };
  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="grid gap-4 md:grid-cols-4">
          <Field label="Scenario">
            {(id) => (
              <Select id={id} value={scenarioId} onChange={(e) => setScenarioId(e.target.value)}>
                {SCENARIOS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </Select>
            )}
          </Field>
          <Field label="Platform">
            {(id) => (
              <Select id={id} value={platform} onChange={(e) => setPlatform(e.target.value as typeof platform)}>
                <option value="all">All platforms</option>
                {PLATFORMS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </Select>
            )}
          </Field>
          <Field label="City">
            {(id) => (
              <Select id={id} value={city} onChange={(e) => setCity(e.target.value as typeof city)}>
                <option value="all">All cities</option>
                {CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            )}
          </Field>
          <Field label={`Days ${range[0]}–${range[1]}`}>
            {() => (
              <div className="flex flex-wrap gap-1">
                {(
                  [
                    [1, 90, 'All'],
                    [31, 60, '31–60'],
                    [40, 50, '40–50'],
                    [55, 65, '55–65'],
                  ] as const
                ).map(([a, b, l]) => (
                  <Button key={l} size="sm" color={range[0] === a && range[1] === b ? 'butter' : undefined} onClick={() => setRange([a, b])}>
                    {l}
                  </Button>
                ))}
              </div>
            )}
          </Field>
        </div>
        <p className="mt-3 text-sm">{scenario.story}</p>
      </Card>

      <Tabs
        label="Explorer view"
        value={view}
        onChange={setView}
        tabs={[
          { id: 'trend', label: 'Daily trend' },
          { id: 'funnel', label: 'Funnel' },
          { id: 'retention', label: 'Retention cohorts' },
        ]}
      />

      {view === 'trend' && (
        <Card className="p-5">
          <CardTitle className="mb-3">Paid orders per day and open → paid conversion</CardTitle>
          <div className="h-72" role="img" aria-label="Line chart of daily paid orders and conversion">
            <ResponsiveContainer>
              <LineChart data={daily} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--c-line)" strokeOpacity={0.15} />
                <XAxis dataKey="day" tick={axis} />
                <YAxis yAxisId="l" tick={axis} />
                <YAxis yAxisId="r" orientation="right" tick={axis} unit="%" />
                <Tooltip contentStyle={{ background: 'var(--c-surface)', border: '2px solid var(--c-line)', borderRadius: 10, color: 'var(--c-ink)' }} />
                <Legend />
                <Line isAnimationActive={false} yAxisId="l" type="monotone" dataKey="Paid" stroke="#5B8DEF" strokeWidth={2.5} dot={false} />
                <Line isAnimationActive={false} yAxisId="r" type="monotone" dataKey="Open→Paid %" stroke="#E07A9B" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {view === 'funnel' && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <CardTitle className="mb-3">Funnel for the selected range</CardTitle>
            <div className="h-72" role="img" aria-label="Funnel bar chart">
              <ResponsiveContainer>
                <BarChart data={funnel} layout="vertical" margin={{ left: 30, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--c-line)" strokeOpacity={0.15} />
                  <XAxis type="number" tick={axis} />
                  <YAxis type="category" dataKey="step" tick={axis} width={100} />
                  <Tooltip contentStyle={{ background: 'var(--c-surface)', border: '2px solid var(--c-line)', borderRadius: 10, color: 'var(--c-ink)' }} />
                  <Bar isAnimationActive={false} dataKey="users" fill="#9DB9F2" stroke="#1E1E24" strokeWidth={1.5} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <table className="mt-3 w-full text-sm">
              <tbody>
                {funnel.map((f) => (
                  <tr key={f.step} className="border-t border-line/20">
                    <td className="py-1">{f.step}</td>
                    <td className="py-1 text-right font-mono">{f.users.toLocaleString('en-IN')}</td>
                    <td className="py-1 text-right font-mono">{f.conv}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <Card className="p-5">
            <CardTitle className="mb-3">Checkout → Paid by platform: days 31–44 vs 46–59</CardTitle>
            <div className="h-72" role="img" aria-label="Before and after conversion by platform">
              <ResponsiveContainer>
                <BarChart data={segBreak}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--c-line)" strokeOpacity={0.15} />
                  <XAxis dataKey="platform" tick={axis} />
                  <YAxis tick={axis} unit="%" domain={[50, 100]} />
                  <Tooltip contentStyle={{ background: 'var(--c-surface)', border: '2px solid var(--c-line)', borderRadius: 10, color: 'var(--c-ink)' }} />
                  <Legend />
                  <Bar isAnimationActive={false} dataKey="before" fill="#B9E4C9" stroke="#1E1E24" />
                  <Bar isAnimationActive={false} dataKey="after" fill="#F6B9C9" stroke="#1E1E24" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {view === 'retention' && (
        <Card className="p-5">
          <CardTitle className="mb-3">Weekly ordering retention by acquisition source</CardTitle>
          <div className="h-72" role="img" aria-label="Retention curves by acquisition source">
            <ResponsiveContainer>
              <LineChart data={retentionCurves()}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--c-line)" strokeOpacity={0.15} />
                <XAxis dataKey="week" tick={axis} />
                <YAxis tick={axis} unit="%" />
                <Tooltip contentStyle={{ background: 'var(--c-surface)', border: '2px solid var(--c-line)', borderRadius: 10, color: 'var(--c-ink)' }} />
                <Legend />
                <ReferenceLine y={20} stroke="#1E1E24" strokeDasharray="4 4" />
                <Line isAnimationActive={false} dataKey="Organic" stroke="#3FA36B" strokeWidth={2.5} />
                <Line isAnimationActive={false} dataKey="Paid social" stroke="#E07A9B" strokeWidth={2.5} />
                <Line isAnimationActive={false} dataKey="First-order coupon" stroke="#C9A227" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-sm">Organic users flatten near 26% (a sign of product–market fit for that cohort); paid-social and coupon users fall towards 10%. Mix shift towards paid users would lower overall retention even if the product didn’t change.</p>
        </Card>
      )}

      <Card className="p-5">
        <CardTitle className="mb-2">Diagnose the drop</CardTitle>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          {scenario.questions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
        <Reveal label="Reveal the diagnosis">
          <p className="text-sm">{scenario.answer}</p>
        </Reveal>
        <Callout kind="tip">Work the structure: clarify the drop → check data → segment (platform, city, step) → match the timing to internal or external changes → rank hypotheses → act.</Callout>
      </Card>
    </div>
  );
}
