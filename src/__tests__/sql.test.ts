// @vitest-environment node
import { describe, it, expect, beforeAll } from 'vitest';
import initSqlJs, { type Database } from 'sql.js';
import { buildDatabase, runQuery, compareResults } from '../tools/sql/db';
import { SQL_PROBLEMS } from '../tools/sql/problems';
import { generateDataset } from '../tools/sql/dataset';

let db: Database;
beforeAll(async () => {
  const SQL = await initSqlJs();
  db = buildDatabase(SQL);
});

describe('dataset', () => {
  it('is deterministic and about 5–8k rows', () => {
    const a = generateDataset();
    const b = generateDataset();
    const total = a.inserts.reduce((s, t) => s + t.rows.length, 0);
    expect(JSON.stringify(a.inserts[2].rows.slice(0, 20))).toBe(JSON.stringify(b.inserts[2].rows.slice(0, 20)));
    console.log(a.inserts.map((t) => `${t.table}=${t.rows.length}`).join(' '), 'total', total);
    expect(total).toBeGreaterThan(4000);
    expect(total).toBeLessThan(10000);
  });
});

describe('sql problems', () => {
  it('has 40 problems with unique ids', () => {
    expect(SQL_PROBLEMS).toHaveLength(40);
    expect(new Set(SQL_PROBLEMS.map((p) => p.id)).size).toBe(40);
  });
  for (const p of SQL_PROBLEMS) {
    it(`${p.id} solution runs and returns rows`, () => {
      const r = runQuery(db, p.solution);
      expect(r.length).toBeGreaterThan(0);
      expect(r[r.length - 1].rows.length).toBeGreaterThan(0);
      expect(compareResults(r[r.length - 1], r[r.length - 1], p.ordered).ok).toBe(true);
    });
  }
  it('compareResults ignores order when unordered and catches differences', () => {
    const a = { columns: ['x'], rows: [[1], [2]] };
    const b = { columns: ['y'], rows: [[2], [1]] };
    expect(compareResults(a, b, false).ok).toBe(true);
    expect(compareResults(a, b, true).ok).toBe(false);
    expect(compareResults({ columns: ['x'], rows: [[1.004]] }, { columns: ['x'], rows: [[1]] }, false).ok).toBe(true);
  });
});
