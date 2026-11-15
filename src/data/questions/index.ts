import { PRODUCT_SENSE } from './productSense';
import { DESIGN } from './design';
import { IMPROVEMENT } from './improvement';
import { ESTIMATION } from './estimation';
import { STRATEGY_Q } from './strategy';
import { EXECUTION_Q } from './execution';
import { TECHNICAL } from './technical';
import { BEHAVIORAL } from './behavioral';
import { AI_Q } from './ai';
import type { QCategory, Question, Difficulty } from './types';

export type { QCategory, Question, Difficulty };

export const Q_CATEGORIES: { id: QCategory; label: string; color: 'lavender' | 'sky' | 'mint' | 'peach' | 'butter' | 'pink' }[] = [
  { id: 'product-sense', label: 'Product sense', color: 'lavender' },
  { id: 'design', label: 'Product design', color: 'lavender' },
  { id: 'improvement', label: 'Product improvement', color: 'lavender' },
  { id: 'estimation', label: 'Estimation', color: 'peach' },
  { id: 'strategy', label: 'Strategy', color: 'peach' },
  { id: 'execution', label: 'Execution & metrics', color: 'sky' },
  { id: 'technical', label: 'Technical', color: 'sky' },
  { id: 'behavioral', label: 'Behavioural', color: 'pink' },
  { id: 'ai', label: 'AI PM', color: 'mint' },
];

export const QUESTIONS: Question[] = [...PRODUCT_SENSE, ...DESIGN, ...IMPROVEMENT, ...ESTIMATION, ...STRATEGY_Q, ...EXECUTION_Q, ...TECHNICAL, ...BEHAVIORAL, ...AI_Q];
export const categoryLabel = (c: QCategory) => Q_CATEGORIES.find((x) => x.id === c)?.label ?? c;
