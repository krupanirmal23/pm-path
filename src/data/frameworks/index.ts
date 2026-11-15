import { DISCOVERY } from './discovery';
import { STRATEGY } from './strategy';
import { PRIORITISATION } from './prioritisation';
import { METRICS } from './metrics';
import { EXECUTION } from './execution';
import { AI } from './ai';
import type { Framework, FrameworkCategory } from './types';

export type { Framework, FrameworkCategory };
export const FRAMEWORK_CATEGORIES: FrameworkCategory[] = ['Discovery', 'Strategy', 'Prioritisation', 'Metrics', 'Execution', 'Design', 'Interview', 'AI'];
export const FRAMEWORKS: Framework[] = [...DISCOVERY, ...STRATEGY, ...PRIORITISATION, ...METRICS, ...EXECUTION, ...AI];
export const frameworkById = (id: string) => FRAMEWORKS.find((f) => f.id === id);
