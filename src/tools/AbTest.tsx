import { useState } from 'react';
import { sampleSizePerGroup, twoProportionTest, srmPValue } from '../lib/stats';
import { Callout, Card, CardTitle, Field, Input, Select, Tabs, cx } from '../components/ui';

const fmtPct = (x: number, d = 2) => `${(x * 100).toFixed(d)}%`;
const num = (v: string) => (v === '' ? NaN : Number(v));

function SampleSize() {
  const [baseline, setBaseline] = useState('20');
  const [mde, setMde] = useState('2');
  const [mdeType, setMdeType] = useState<'abs' | 'rel'>('abs');
  const [alpha, setAlpha] = useState('0.05');
  const [power, setPower] = useState('0.8');
  const [traffic, setTraffic] = useState('1500');
  const [split, setSplit] = useState('50');

  const b = num(baseline) / 100;
  const m = mdeType === 'abs' ? num(mde) / 100 : num(mde) / 100;
  const n = sampleSizePerGroup(b, m, num(alpha), num(power), mdeType === 'rel');
  const shareInTest = num(split) / 100;
  const total = n * 2;
  const days = Number.isFinite(total) && num(traffic) > 0 ? Math.ceil(total / (num(traffic) * Math.min(1, shareInTest * 2))) : NaN;
  const weeks = Number.isFinite(days) ? Math.max(1, Math.ceil(days / 7)) : NaN;
  const target = mdeType === 'abs' ? b + m : b * (1 + m);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="space-y-4 p-5">
        <CardTitle>Inputs</CardTitle>
        <Field label="Baseline conversion rate (%)" hint="Today’s rate for the primary metric, e.g., 20 for 20%.">
          {(id) => <Input id={id} type="number" min={0.1} max={99} step={0.1} value={baseline} onChange={(e) => setBaseline(e.target.value)} />}
        </Field>
        <div className="grid grid-cols-[1fr_140px] gap-3">
          <Field label="Minimum detectable effect" hint="Smallest change worth detecting.">
            {(id) => <Input id={id} type="number" min={0.01} step={0.1} value={mde} onChange={(e) => setMde(e.target.value)} />}
          </Field>
          <Field label="Type">
            {(id) => (
              <Select id={id} value={mdeType} onChange={(e) => setMdeType(e.target.value as 'abs' | 'rel')}>
                <option value="abs">points (abs.)</option>
                <option value="rel">% relative</option>
              </Select>
            )}
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Significance (α)" hint="Two-sided. 0.05 is standard.">
            {(id) => (
              <Select id={id} value={alpha} onChange={(e) => setAlpha(e.target.value)}>
                <option value="0.1">0.10</option>
                <option value="0.05">0.05</option>
                <option value="0.01">0.01</option>
              </Select>
            )}
          </Field>
          <Field label="Power (1−β)" hint="80% is standard.">
            {(id) => (
              <Select id={id} value={power} onChange={(e) => setPower(e.target.value)}>
                <option value="0.8">80%</option>
                <option value="0.9">90%</option>
              </Select>
            )}
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Eligible users per day" hint="Users who reach the tested experience.">
            {(id) => <Input id={id} type="number" min={1} value={traffic} onChange={(e) => setTraffic(e.target.value)} />}
          </Field>
          <Field label="% of traffic per variant" hint="50 = all traffic split 50/50.">
            {(id) => <Input id={id} type="number" min={1} max={50} value={split} onChange={(e) => setSplit(e.target.value)} />}
          </Field>
        </div>
      </Card>
      <div className="space-y-4">
        <Card color="butter" className="p-5" aria-live="polite">
          <CardTitle>Result</CardTitle>
          {Number.isFinite(n) ? (
            <>
              <p className="mt-2 font-display text-4xl font-bold">{n.toLocaleString('en-IN')}</p>
              <p className="text-sm">users per variant · {total.toLocaleString('en-IN')} total</p>
              <p className="mt-3 text-sm">
                Detecting a change from <strong>{fmtPct(b, 1)}</strong> to <strong>{fmtPct(target, 1)}</strong>.
              </p>
              <p className="mt-2 text-sm">
                Estimated duration: <strong>{days} day{days === 1 ? '' : 's'}</strong> → run for at least <strong>{weeks} full week{weeks === 1 ? '' : 's'}</strong>.
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm">Check the inputs: baseline and target must be between 0% and 100% and differ.</p>
          )}
        </Card>
        <Callout kind="example">
          In plain English: if the change really moves the metric by your MDE, a test of this size will detect it {Math.round(num(power) * 100)}% of the time. If the change does nothing, you’ll wrongly see a “win” about {Math.round(num(alpha) * 100)}% of the time.
        </Callout>
        <Callout kind="tip">Halving the MDE roughly quadruples the sample. Rare baselines (2–5%) need far more users. Round duration up to full weeks and add the metric’s measurement window (e.g., 7-day activation).</Callout>
      </div>
    </div>
  );
}

function ResultsChecker() {
  const [nA, setNA] = useState('10000');
  const [cA, setCA] = useState('1000');
  const [nB, setNB] = useState('10000');
  const [cB, setCB] = useState('1100');
  const [alpha, setAlpha] = useState('0.05');
  const r = twoProportionTest(num(cA), num(nA), num(cB), num(nB), num(alpha));
  const srm = srmPValue(num(nA), num(nB));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="space-y-4 p-5">
        <CardTitle>Observed results</CardTitle>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Control users (A)">{(id) => <Input id={id} type="number" min={1} value={nA} onChange={(e) => setNA(e.target.value)} />}</Field>
          <Field label="Control conversions">{(id) => <Input id={id} type="number" min={0} value={cA} onChange={(e) => setCA(e.target.value)} />}</Field>
          <Field label="Variant users (B)">{(id) => <Input id={id} type="number" min={1} value={nB} onChange={(e) => setNB(e.target.value)} />}</Field>
          <Field label="Variant conversions">{(id) => <Input id={id} type="number" min={0} value={cB} onChange={(e) => setCB(e.target.value)} />}</Field>
        </div>
        <Field label="Significance (α)">
          {(id) => (
            <Select id={id} value={alpha} onChange={(e) => setAlpha(e.target.value)}>
              <option value="0.1">0.10</option>
              <option value="0.05">0.05</option>
              <option value="0.01">0.01</option>
            </Select>
          )}
        </Field>
      </Card>
      <div className="space-y-4" aria-live="polite">
        {r ? (
          <Card color={r.significant ? (r.absLift > 0 ? 'mint' : 'pink') : 'butter'} className="p-5">
            <CardTitle>{r.significant ? (r.absLift > 0 ? 'Statistically significant improvement' : 'Statistically significant decrease') : 'Not statistically significant'}</CardTitle>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <dt>Control rate</dt>
              <dd className="font-semibold">{fmtPct(r.pA)}</dd>
              <dt>Variant rate</dt>
              <dd className="font-semibold">{fmtPct(r.pB)}</dd>
              <dt>Absolute lift</dt>
              <dd className="font-semibold">{(r.absLift * 100).toFixed(2)} pts</dd>
              <dt>Relative lift</dt>
              <dd className="font-semibold">{Number.isFinite(r.relLift) ? fmtPct(r.relLift, 1) : '—'}</dd>
              <dt>p-value</dt>
              <dd className="font-semibold">{r.pValue < 0.0001 ? '< 0.0001' : r.pValue.toFixed(4)}</dd>
              <dt>{Math.round((1 - num(alpha)) * 100)}% CI of lift</dt>
              <dd className="font-semibold">
                {(r.ciLow * 100).toFixed(2)} to {(r.ciHigh * 100).toFixed(2)} pts
              </dd>
            </dl>
          </Card>
        ) : (
          <Card color="pink" className="p-4 text-sm">
            Conversions can’t exceed users, and users must be above zero.
          </Card>
        )}
        <Card className={cx('p-4 text-sm', srm < 0.01 ? 'bg-pink' : '')}>
          <strong>Sample ratio check (50/50):</strong> p = {Number.isFinite(srm) ? srm.toFixed(4) : '—'}. {srm < 0.01 ? 'Possible sample ratio mismatch: investigate assignment or tracking before trusting results.' : 'Split looks healthy.'}
        </Card>
        <Callout kind="warning">Only read results at the planned sample size. Checking repeatedly and stopping at the first “significant” moment inflates false positives. Also check guardrails and novelty (is the lift fading day by day?).</Callout>
      </div>
    </div>
  );
}

export default function AbTest() {
  const [tab, setTab] = useState<'size' | 'check'>('size');
  return (
    <div className="space-y-4">
      <Tabs
        label="A/B tools"
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'size', label: 'Sample size & duration' },
          { id: 'check', label: 'Results checker' },
        ]}
      />
      {tab === 'size' ? <SampleSize /> : <ResultsChecker />}
    </div>
  );
}
