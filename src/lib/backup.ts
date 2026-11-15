import type { ProgressData } from '../data/types';
import { normalize } from '../store/useStore';

export const BACKUP_APP_ID = 'pm-path';

export interface BackupFile {
  app: typeof BACKUP_APP_ID;
  version: 1;
  exportedAt: string;
  data: ProgressData;
}

export function serializeBackup(data: ProgressData, now: Date = new Date()): string {
  const file: BackupFile = { app: BACKUP_APP_ID, version: 1, exportedAt: now.toISOString(), data };
  return JSON.stringify(file, null, 2);
}

export type ParseResult = { ok: true; data: ProgressData; exportedAt?: string } | { ok: false; error: string };

/** Accepts a PM Path backup file (or a bare state object) and returns normalized data. */
export function parseBackup(text: string): ParseResult {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return { ok: false, error: 'This file is not valid JSON.' };
  }
  if (!raw || typeof raw !== 'object') return { ok: false, error: 'This file does not contain a PM Path backup.' };
  const obj = raw as Record<string, unknown>;
  if (obj.app === BACKUP_APP_ID) {
    if (!obj.data || typeof obj.data !== 'object') return { ok: false, error: 'The backup is missing its data section.' };
    return { ok: true, data: normalize(obj.data), exportedAt: typeof obj.exportedAt === 'string' ? obj.exportedAt : undefined };
  }
  if ('settings' in obj && 'topics' in obj) return { ok: true, data: normalize(obj) };
  return { ok: false, error: 'This file does not look like a PM Path backup.' };
}

export function downloadText(filename: string, text: string, type = 'application/json') {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
