export type FrameworkCategory = 'Discovery' | 'Strategy' | 'Prioritisation' | 'Metrics' | 'Execution' | 'Design' | 'Interview' | 'AI';

export interface Framework {
  id: string;
  name: string;
  category: FrameworkCategory;
  week: number;
  oneLiner: string;
  what: string;
  when: string[];
  whenNot: string[];
  steps: string[];
  example: { title: string; body: string }; // body is Markdown
  mistakes: string[];
}
