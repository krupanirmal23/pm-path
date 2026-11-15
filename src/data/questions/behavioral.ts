import { mk, type Question } from './types';
const Q = mk('behavioral');

const STAR = ['Situation: 1–2 sentences of context', 'Task: your responsibility', 'Action: 3–4 specific steps you took (use “I”)', 'Result: outcome with numbers', 'Learning: what you would repeat or change'];

export const BEHAVIORAL: Question[] = [
  Q('01', 'E', 'Tell me about yourself.', ['Present: who you are now', 'Past: relevant experience (TME at Palo Alto Networks)', 'Proof: projects with results', 'Future: why this PM role', 'Keep to ~90 seconds'], ['Clear narrative toward PM', 'Relevance'], ['Reading your resume line by line']),
  Q('02', 'E', 'Why do you want to be a product manager?', ['Moment you realised it', 'Skills that transfer', 'What excites you about the role', 'Evidence you have tried it'], ['Genuine motivation with evidence'], ['“I want to be a leader”']),
  Q('03', 'M', 'Tell me about a time you disagreed with a stakeholder.', STAR, ['Respectful influence', 'Data-driven'], ['Making the other person the villain']),
  Q('04', 'M', 'Tell me about a time you failed.', STAR, ['Ownership and learning'], ['A fake failure', 'Blaming others']),
  Q('05', 'M', 'Tell me about a time you used data to make a decision.', STAR, ['Analytical thinking'], ['No numbers']),
  Q('06', 'M', 'Tell me about a time you influenced without authority.', STAR, ['Influence skills'], ['Using escalation as the main tool']),
  Q('07', 'E', 'Why are you leaving your current role / why did you leave?', ['Positive framing', 'Growth toward PM', 'No negativity about employer'], ['Maturity'], ['Complaining']),
  Q('08', 'M', 'Tell me about a time you dealt with ambiguity.', STAR, ['Comfort with uncertainty', 'Structuring'], ['Waiting for instructions']),
  Q('09', 'M', 'Tell me about a time you had to say no.', STAR, ['Prioritisation and communication'], ['Saying no rudely']),
  Q('10', 'H', 'Tell me about the hardest decision you made at work.', STAR, ['Judgment and trade-offs'], ['Trivial example']),
  Q('11', 'E', 'What are your strengths and weaknesses?', ['Strength with example', 'Real weakness with action taken', 'Link to PM role'], ['Self-awareness'], ['“I’m a perfectionist”']),
  Q('12', 'M', 'Tell me about a time you understood a customer deeply.', STAR, ['Customer empathy'], ['Generic statements']),
  Q('13', 'M', 'Tell me about a time you worked with engineers on something technical.', STAR, ['Technical collaboration'], ['Overclaiming engineering work']),
  Q('14', 'M', 'Tell me about a time you had to deliver under a tight deadline.', STAR, ['Prioritisation under pressure'], ['Heroics without process']),
  Q('15', 'H', 'Tell me about a time you changed your mind based on new information.', STAR, ['Intellectual humility'], ['Never changing mind']),
  Q('16', 'E', 'Why this company?', ['Product you use and admire', 'Specific team or problem', 'How you’d contribute'], ['Research and genuine interest'], ['Generic praise']),
  Q('17', 'M', 'Tell me about a project you led from start to finish.', STAR, ['Ownership'], ['Only describing tasks']),
  Q('18', 'M', 'Tell me about a time you received tough feedback.', STAR, ['Coachability'], ['Defensiveness']),
  Q('19', 'M', 'How do you handle conflicting priorities from two leaders?', ['Clarify goals', 'Make trade-offs visible with data', 'Escalate with a recommendation if needed'], ['Structured approach'], ['Pleasing both']),
  Q('20', 'H', 'Tell me about a time you shipped something that users didn’t like.', STAR, ['Learning loop'], ['No follow-up']),
  Q('21', 'E', 'Where do you see yourself in five years?', ['Growth as PM', 'Domain interest', 'Realistic and aligned with company'], ['Ambition with realism'], ['Saying “in your seat”']),
  Q('22', 'M', 'You are switching careers into PM. Why should we hire you over someone with PM experience?', ['Transferable skills', 'Unique edge (customer and technical)', 'Proof through projects', 'Learning speed'], ['Confidence with evidence'], ['Apologising for background']),
  Q('23', 'M', 'Tell me about a time you simplified something complex.', STAR, ['Communication'], ['Too much detail']),
];
