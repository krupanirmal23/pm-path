import { describe, it, expect } from 'vitest';
import { serializeBackup, parseBackup } from '../lib/backup';
import { defaultData } from '../store/useStore';

describe('backup', () => {
  it('round-trips the full state', () => {
    const d = defaultData();
    d.settings.name = 'Krupa';
    d.topics['w1-pm-role'] = { done: true, doneAt: '2026-01-05T10:00:00.000Z' };
    d.timeLogs.push({ id: 'x', date: '2026-01-05', blockKey: 'learn', minutes: 120 });
    d.lessonNotes['w1-pm-role'] = '# Notes\n- one';
    const text = serializeBackup(d, new Date('2026-01-06T00:00:00Z'));
    const res = parseBackup(text);
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.data).toEqual(d);
      expect(res.exportedAt).toBe('2026-01-06T00:00:00.000Z');
    }
  });
  it('rejects invalid JSON and foreign files', () => {
    expect(parseBackup('not json').ok).toBe(false);
    expect(parseBackup('{"hello":1}').ok).toBe(false);
    expect(parseBackup('{"app":"pm-path"}').ok).toBe(false);
  });
  it('accepts a bare state object', () => {
    const res = parseBackup(JSON.stringify({ settings: { name: 'A' }, topics: {} }));
    expect(res.ok && res.data.settings.name).toBe('A');
  });
});
