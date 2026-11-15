// Prints which curriculum lessons and tool guides exist. Run: node scripts/coverage.mjs
import { readFileSync, existsSync, readdirSync } from 'node:fs';
const src = readFileSync('src/data/curriculum.ts', 'utf8');
const weeks = src.split(/\n  \{\n    n: /).slice(1);
let total = 0, have = 0, gTotal = 0, gHave = 0;
for (const w of weeks) {
  const n = Number(w.match(/^(\d+)/)[1]);
  const topics = [...w.matchAll(/t\('([^']+)'/g)].map((m) => m[1]);
  const tools = [...w.matchAll(/\{ id: '([^']+)', name: '[^']*', use: '[^']*'( , builtIn| ?\})/g)].map((m) => m[1]);
  const toolsAll = [...w.matchAll(/\{ id: '([^']+)', name: ([`'"])(?:(?!\2).)*\2, use: ([`'"])(?:(?!\3).)*\3(, builtIn: '[^']+')? \}/g)].map((m) => ({ id: m[1], builtIn: !!m[4] }));
  const dir = `src/content/week-${String(n).padStart(2, '0')}`;
  const missing = topics.filter((t) => !existsSync(`${dir}/${t}.md`));
  const gNeeded = toolsAll.filter((t) => !t.builtIn).map((t) => `w${n}-${t.id}`);
  const gMissing = gNeeded.filter((g) => !existsSync(`src/content/tools/${g}.md`));
  total += topics.length; have += topics.length - missing.length;
  gTotal += gNeeded.length; gHave += gNeeded.length - gMissing.length;
  console.log(`Week ${n}: lessons ${topics.length - missing.length}/${topics.length}, guides ${gNeeded.length - gMissing.length}/${gNeeded.length}${missing.length ? ' | missing lessons: ' + missing.join(', ') : ''}${gMissing.length ? ' | missing guides: ' + gMissing.join(', ') : ''}`);
}
console.log(`\nTOTAL lessons ${have}/${total}, guides ${gHave}/${gTotal}`);
