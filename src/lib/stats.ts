/** Standard normal CDF (Abramowitz–Stegun 7.1.26 via erf approximation). */
export function normCdf(x: number): number {
  const t = 1 / (1 + 0.3275911 * Math.abs(x) / Math.SQRT2);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-(x * x) / 2);
  return x >= 0 ? (1 + y) / 2 : (1 - y) / 2;
}

/** Inverse standard normal CDF (Acklam's algorithm). */
export function normInv(p: number): number {
  if (p <= 0 || p >= 1) throw new Error('p must be in (0,1)');
  const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.38357751867269e2, -3.066479806614716e1, 2.506628277459239];
  const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1];
  const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];
  const pl = 0.02425;
  let q: number, r: number;
  if (p < pl) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  if (p > 1 - pl) {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  q = p - 0.5;
  r = q * q;
  return ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}

/**
 * Sample size per group for a two-sided test of two proportions.
 * baseline and mde are fractions (0.2 = 20%); mde is absolute unless relative=true.
 */
export function sampleSizePerGroup(baseline: number, mde: number, alpha = 0.05, power = 0.8, relative = false): number {
  const p1 = baseline;
  const p2 = relative ? baseline * (1 + mde) : baseline + mde;
  if (p1 <= 0 || p1 >= 1 || p2 <= 0 || p2 >= 1 || p1 === p2) return NaN;
  const za = normInv(1 - alpha / 2);
  const zb = normInv(power);
  const n = ((za + zb) ** 2 * (p1 * (1 - p1) + p2 * (1 - p2))) / (p2 - p1) ** 2;
  return Math.ceil(n);
}

export interface TestResult {
  pA: number;
  pB: number;
  absLift: number;
  relLift: number;
  z: number;
  pValue: number;
  ciLow: number;
  ciHigh: number;
  significant: boolean;
}

/** Two-proportion z-test (pooled SE for the test, unpooled SE for the CI). */
export function twoProportionTest(convA: number, nA: number, convB: number, nB: number, alpha = 0.05): TestResult | null {
  if (nA <= 0 || nB <= 0 || convA < 0 || convB < 0 || convA > nA || convB > nB) return null;
  const pA = convA / nA;
  const pB = convB / nB;
  const pPool = (convA + convB) / (nA + nB);
  const sePool = Math.sqrt(pPool * (1 - pPool) * (1 / nA + 1 / nB));
  const z = sePool === 0 ? 0 : (pB - pA) / sePool;
  const pValue = 2 * (1 - normCdf(Math.abs(z)));
  const se = Math.sqrt((pA * (1 - pA)) / nA + (pB * (1 - pB)) / nB);
  const zc = normInv(1 - alpha / 2);
  return { pA, pB, absLift: pB - pA, relLift: pA === 0 ? NaN : (pB - pA) / pA, z, pValue, ciLow: pB - pA - zc * se, ciHigh: pB - pA + zc * se, significant: pValue < alpha };
}

/** Sample ratio mismatch check: chi-square p-value for an expected 50/50 split. */
export function srmPValue(nA: number, nB: number): number {
  const exp = (nA + nB) / 2;
  const chi = ((nA - exp) ** 2 + (nB - exp) ** 2) / exp;
  // chi-square with 1 dof → p = 2*(1 - Φ(sqrt(chi)))
  return 2 * (1 - normCdf(Math.sqrt(chi)));
}

export function rice(reach: number, impact: number, confidencePct: number, effort: number): number {
  if (!(effort > 0)) return 0;
  return (reach * impact * (confidencePct / 100)) / effort;
}

export function aiCost(opts: { inTokens: number; outTokens: number; inPrice: number; outPrice: number; requestsPerUser: number; users: number; fx: number }) {
  const perRequestUsd = (opts.inTokens * opts.inPrice + opts.outTokens * opts.outPrice) / 1_000_000;
  const perUserUsd = perRequestUsd * opts.requestsPerUser;
  const totalUsd = perUserUsd * opts.users;
  return { perRequestUsd, perUserUsd, totalUsd, perRequestInr: perRequestUsd * opts.fx, perUserInr: perUserUsd * opts.fx, totalInr: totalUsd * opts.fx };
}

export type Verdict = 'pass' | 'fail';
export interface Agreement {
  total: number;
  agree: number;
  accuracy: number | null;
  failRecall: number | null; // of human FAILs, share the judge also failed
  failPrecision: number | null; // of judge FAILs, share that humans failed
  matrix: { pp: number; pf: number; fp: number; ff: number }; // judge×human: pp = judge pass & human pass, pf = judge pass & human fail ...
}

/** Compares judge verdicts with human labels (pairs with a missing label are skipped). */
export function judgeAgreement(human: (Verdict | null)[], judge: (Verdict | null)[]): Agreement {
  const m = { pp: 0, pf: 0, fp: 0, ff: 0 };
  for (let i = 0; i < Math.min(human.length, judge.length); i++) {
    const h = human[i];
    const j = judge[i];
    if (!h || !j) continue;
    if (j === 'pass' && h === 'pass') m.pp++;
    else if (j === 'pass' && h === 'fail') m.pf++;
    else if (j === 'fail' && h === 'pass') m.fp++;
    else m.ff++;
  }
  const total = m.pp + m.pf + m.fp + m.ff;
  const humanFails = m.pf + m.ff;
  const judgeFails = m.fp + m.ff;
  return {
    total,
    agree: m.pp + m.ff,
    accuracy: total ? (m.pp + m.ff) / total : null,
    failRecall: humanFails ? m.ff / humanFails : null,
    failPrecision: judgeFails ? m.ff / judgeFails : null,
    matrix: m,
  };
}

export function parseVerdict(s: string): Verdict | null {
  const t = s.trim().toLowerCase();
  if (['pass', 'p', '1', 'yes', 'y', 'true', '✓', 'ok'].includes(t)) return 'pass';
  if (['fail', 'f', '0', 'no', 'n', 'false', '✗', 'x'].includes(t)) return 'fail';
  return null;
}
