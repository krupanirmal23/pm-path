import initSqlJs, { type Database, type SqlJsStatic } from 'sql.js';
import { generateDataset } from './dataset';

export function buildDatabase(SQL: SqlJsStatic): Database {
  const db = new SQL.Database();
  const ds = generateDataset();
  db.run(ds.schemaSql);
  db.run('BEGIN');
  for (const t of ds.inserts) {
    const stmt = db.prepare(`INSERT INTO ${t.table} (${t.columns.join(',')}) VALUES (${t.columns.map(() => '?').join(',')})`);
    for (const r of t.rows) stmt.run(r as (string | number | null)[]);
    stmt.free();
  }
  db.run('COMMIT');
  return db;
}

let cached: Promise<Database> | null = null;

/** Loads sql.js (self-hosted wasm) and builds the seeded dataset once per page load. */
export function loadDatabase(): Promise<Database> {
  if (!cached) {
    cached = (async () => {
      const wasmUrl = (await import('sql.js/dist/sql-wasm.wasm?url')).default;
      const SQL = await initSqlJs({ locateFile: () => wasmUrl });
      return buildDatabase(SQL);
    })();
  }
  return cached;
}

export interface QueryResult {
  columns: string[];
  rows: (string | number | null | Uint8Array)[][];
}

export function runQuery(db: Database, sql: string): QueryResult[] {
  const res = db.exec(sql);
  return res.map((r) => ({ columns: r.columns, rows: r.values }));
}

function norm(v: unknown): string {
  if (v === null || v === undefined) return '∅';
  if (typeof v === 'number') return Number.isInteger(v) ? String(v) : (Math.round(v * 100) / 100).toFixed(2).replace(/\.00$/, '');
  return String(v).trim();
}

/** Compares result sets by values (column names ignored). Order matters only when `ordered` is true. */
export function compareResults(user: QueryResult | undefined, expected: QueryResult | undefined, ordered: boolean): { ok: boolean; reason?: string } {
  if (!expected) return { ok: false, reason: 'The model solution returned no result.' };
  if (!user) return { ok: false, reason: 'Your query returned no result table.' };
  if (user.columns.length !== expected.columns.length) return { ok: false, reason: `Expected ${expected.columns.length} column(s), your query returned ${user.columns.length}.` };
  if (user.rows.length !== expected.rows.length) return { ok: false, reason: `Expected ${expected.rows.length} row(s), your query returned ${user.rows.length}.` };
  const a = user.rows.map((r) => r.map(norm).join('|'));
  const b = expected.rows.map((r) => r.map(norm).join('|'));
  if (!ordered) {
    a.sort();
    b.sort();
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return { ok: false, reason: ordered ? `Row ${i + 1} differs (check values and sort order).` : 'Some values differ from the expected result.' };
  }
  return { ok: true };
}
