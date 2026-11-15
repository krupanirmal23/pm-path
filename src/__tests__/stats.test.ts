import { describe, it, expect } from 'vitest';
import { normCdf, normInv, sampleSizePerGroup, twoProportionTest, srmPValue, rice, aiCost } from '../lib/stats';

describe('stats', () => {
  it('normal functions', () => {
    expect(normCdf(0)).toBeCloseTo(0.5, 5);
    expect(normCdf(1.96)).toBeCloseTo(0.975, 3);
    expect(normInv(0.975)).toBeCloseTo(1.96, 2);
    expect(normInv(0.8)).toBeCloseTo(0.8416, 3);
  });
  it('sample size matches the lesson example (~6,500/group)', () => {
    const n = sampleSizePerGroup(0.2, 0.02);
    expect(n).toBeGreaterThan(6400);
    expect(n).toBeLessThan(6600);
    expect(sampleSizePerGroup(0.2, 0.1, 0.05, 0.8, true)).toBe(n);
  });
  it('halving the MDE roughly quadruples sample size', () => {
    const a = sampleSizePerGroup(0.3, 0.04);
    const b = sampleSizePerGroup(0.3, 0.02);
    expect(b / a).toBeGreaterThan(3.7);
    expect(b / a).toBeLessThan(4.3);
  });
  it('two-proportion test', () => {
    const r = twoProportionTest(1000, 10000, 1100, 10000)!;
    expect(r.absLift).toBeCloseTo(0.01, 5);
    expect(r.pValue).toBeLessThan(0.05);
    expect(r.ciLow).toBeGreaterThan(0);
    const flat = twoProportionTest(500, 5000, 505, 5000)!;
    expect(flat.significant).toBe(false);
    expect(twoProportionTest(5, 0, 1, 10)).toBeNull();
  });
  it('srm', () => {
    expect(srmPValue(50000, 50000)).toBeCloseTo(1, 5);
    expect(srmPValue(53000, 47000)).toBeLessThan(0.001);
  });
  it('rice and ai cost', () => {
    expect(rice(20000, 2, 80, 1)).toBe(32000);
    expect(rice(10, 1, 100, 0)).toBe(0);
    const c = aiCost({ inTokens: 2030, outTokens: 250, inPrice: 0.5, outPrice: 1.5, requestsPerUser: 3, users: 200000, fx: 85 });
    expect(c.perRequestUsd).toBeCloseTo(0.00139, 5);
    expect(c.totalUsd).toBeCloseTo(834, 0);
  });
});

import { judgeAgreement, parseVerdict } from '../lib/stats';
describe('judge agreement', () => {
  it('matches the lesson example (87% agreement, 67% failure recall)', () => {
    const human: ('pass' | 'fail')[] = [...Array(42).fill('pass'), ...Array(18).fill('fail')];
    const judge: ('pass' | 'fail')[] = [...Array(40).fill('pass'), ...Array(2).fill('fail'), ...Array(6).fill('pass'), ...Array(12).fill('fail')];
    const a = judgeAgreement(human, judge);
    expect(a.total).toBe(60);
    expect(Math.round(a.accuracy! * 100)).toBe(87);
    expect(Math.round(a.failRecall! * 100)).toBe(67);
    expect(a.matrix).toEqual({ pp: 40, pf: 6, fp: 2, ff: 12 });
  });
  it('parses verdict words', () => {
    expect(parseVerdict(' PASS ')).toBe('pass');
    expect(parseVerdict('0')).toBe('fail');
    expect(parseVerdict('maybe')).toBeNull();
  });
});
