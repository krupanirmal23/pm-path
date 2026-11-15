export type QCategory = 'product-sense' | 'design' | 'improvement' | 'estimation' | 'strategy' | 'execution' | 'technical' | 'behavioral' | 'ai';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: string;
  category: QCategory;
  difficulty: Difficulty;
  q: string;
  outline: string[];
  lookFor: string[];
  pitfalls: string[];
}

const D = { E: 'Easy', M: 'Medium', H: 'Hard' } as const;

export function mk(category: QCategory) {
  return (id: string, d: keyof typeof D, q: string, outline: string[], lookFor: string[], pitfalls: string[]): Question => ({
    id: `${category}-${id}`,
    category,
    difficulty: D[d],
    q,
    outline,
    lookFor,
    pitfalls,
  });
}
