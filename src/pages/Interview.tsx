import { useNavigate, useParams } from 'react-router-dom';
import { Chip, PageHeader, Tabs } from '../components/ui';
import { QUESTIONS } from '../data/questions';
import { QuestionBank } from './interview/QuestionBank';
import { MockMode } from './interview/MockMode';
import { StoryBank } from './interview/StoryBank';
import { MockLogView } from './interview/MockLogView';
import { NotFound } from './NotFound';

const TABS = [
  { id: 'questions', label: 'Question bank' },
  { id: 'mock', label: 'Mock mode' },
  { id: 'log', label: 'Mock log' },
  { id: 'stories', label: 'Story bank' },
] as const;
type TabId = (typeof TABS)[number]['id'];

export default function Interview() {
  const { tab = 'questions' } = useParams();
  const nav = useNavigate();
  if (!TABS.some((t) => t.id === tab)) return <NotFound />;
  return (
    <div>
      <PageHeader title="Interview prep" kicker={<Chip color="peach">{QUESTIONS.length} questions</Chip>}>
        Practise out loud, score yourself honestly and log every mock. Build your 10 STAR stories early so behavioural rounds are easy.
      </PageHeader>
      <div className="mb-5">
        <Tabs<TabId> label="Interview prep sections" value={tab as TabId} onChange={(t) => nav(t === 'questions' ? '/interview' : `/interview/${t}`)} tabs={TABS.map((t) => ({ id: t.id, label: t.label }))} />
      </div>
      {tab === 'questions' && <QuestionBank />}
      {tab === 'mock' && <MockMode />}
      {tab === 'log' && <MockLogView />}
      {tab === 'stories' && <StoryBank />}
    </div>
  );
}
