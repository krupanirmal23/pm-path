/** Local-date helpers. All dates are yyyy-mm-dd strings in the user's local time. */

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseISODate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

export function today(): string {
  return toISODate(new Date());
}

export function addDays(s: string, n: number): string {
  const d = parseISODate(s);
  d.setDate(d.getDate() + n);
  return toISODate(d);
}

export function daysBetween(a: string, b: string): number {
  const ms = parseISODate(b).getTime() - parseISODate(a).getTime();
  return Math.round(ms / 86400000);
}

/** Monday of the week containing `s`. */
export function mondayOf(s: string): string {
  const d = parseISODate(s);
  const dow = d.getDay(); // 0 Sun .. 6 Sat
  const diff = dow === 0 ? -6 : 1 - dow;
  return addDays(s, diff);
}

export function weekdayOf(s: string): number {
  return parseISODate(s).getDay();
}

export function formatDate(s: string, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }): string {
  return parseISODate(s).toLocaleDateString('en-IN', opts);
}

export function nextMonday(from: string = today()): string {
  const dow = weekdayOf(from);
  const add = dow === 1 ? 0 : (8 - dow) % 7;
  return addDays(from, add);
}
