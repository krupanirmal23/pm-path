import { Link } from 'react-router-dom';
import { Ban } from 'lucide-react';
import { Card, Chip, PageHeader } from '../components/ui';

const SKIPS: { title: string; why: string; instead: string; link?: { to: string; label: string } }[] = [
  {
    title: 'Expensive PM certificates and bootcamps',
    why: 'Hiring managers for APM roles rarely shortlist on certificates. They look for evidence you can do the work. A ₹50,000–₹3 lakh course gives you the same frameworks this site covers, without the proof.',
    instead: 'Spend that time finishing your four portfolio projects and publishing case studies.',
    link: { to: '/portfolio', label: 'Portfolio' },
  },
  {
    title: 'Long paid programmes (6–12 months)',
    why: 'They are slow, and you need momentum. Your 14-week plan already covers the core skills. Long programmes also delay the job search, where most of the learning about interviews happens.',
    instead: 'Follow the roadmap and start outreach in Week 12, not after another course.',
    link: { to: '/roadmap', label: 'Roadmap' },
  },
  {
    title: 'Agile certifications (CSPO, CSM, SAFe) and PMP',
    why: 'These are for project and delivery roles. Product interviews test product sense, analytics and judgment, not ceremonies. Many PMs never get one.',
    instead: 'Learn how sprints and backlogs work (Week 4), then practise writing good user stories.',
    link: { to: '/frameworks/user-stories', label: 'User stories framework' },
  },
  {
    title: 'Deep machine-learning maths',
    why: 'AI PMs need to understand what models can and can’t do, how to evaluate them and what they cost. You do not need linear algebra, backpropagation or training models from scratch.',
    instead: 'Build one real AI product and a proper eval set. That beats any maths course in AI PM interviews.',
    link: { to: '/toolkit/evals', label: 'Eval Labeler' },
  },
  {
    title: 'Coding bootcamps',
    why: 'You already have a technical background. PMs need to understand APIs, data and architecture well enough to talk with engineers, not to ship production code.',
    instead: 'Learn SQL well, use Postman, and write one technical teardown.',
    link: { to: '/toolkit/sql', label: 'SQL Playground' },
  },
  {
    title: 'Deep dives into every tool (Jira admin, advanced Figma, Tableau certs)',
    why: 'Tools change between companies and are learned in a week on the job. Interviewers rarely test tool depth.',
    instead: 'Learn each tool to the level in its guide: enough to produce your deliverable.',
    link: { to: '/toolkit', label: 'Toolkit' },
  },
  {
    title: 'Collecting frameworks',
    why: 'Reciting CIRCLES or RICE word for word sounds robotic. Interviewers want clear thinking that fits the question.',
    instead: 'Learn the 10–15 frameworks you actually use, and practise applying them out loud.',
    link: { to: '/frameworks', label: 'Frameworks' },
  },
  {
    title: 'Reading interview answers without doing mocks',
    why: 'Reading feels productive but doesn’t build the skill of thinking out loud under time pressure. Most candidates fail on structure and delivery, not knowledge.',
    instead: 'Do at least 3 timed mocks a week from Week 13, and log them.',
    link: { to: '/interview/mock', label: 'Mock mode' },
  },
  {
    title: 'Mass “Easy Apply”',
    why: 'Hundreds of untailored applications produce a very low callback rate and burn your motivation. Recruiters skim; generic resumes get filtered.',
    instead: 'Five personalised outreach messages a day and a few tailored applications with referrals.',
    link: { to: '/jobs', label: 'Job search' },
  },
  {
    title: 'Paid plans of tools',
    why: 'Every tool in this programme has a free tier that is enough for learning and portfolio projects: Figma, Notion, PostHog, Amplitude, Google AI Studio, Postman and more.',
    instead: 'Use free tiers. If a tool asks for a card, check the guide for a free alternative.',
    link: { to: '/toolkit', label: 'Toolkit' },
  },
  {
    title: 'Waiting until you feel “ready” to apply',
    why: 'Nobody feels ready. Interviews themselves are the fastest teacher, and the market rewards momentum.',
    instead: 'Apply to a few stretch roles from Week 12 even if your portfolio is still being polished.',
  },
  {
    title: 'An MBA as a prerequisite',
    why: 'Many Indian product companies hire APMs without MBAs, especially candidates with technical backgrounds and strong portfolios. An MBA is a big cost and two years of time.',
    instead: 'Use your technical marketing experience plus projects as your edge. Revisit an MBA later only if a specific goal needs it.',
  },
];

export default function SkipThis() {
  return (
    <div>
      <PageHeader title="Skip this" kicker={<Chip color="pink">Save time and money</Chip>}>
        Things that look useful but are not worth your time or money right now. Every hour you don’t spend here goes into projects, practice and outreach.
      </PageHeader>
      <ul className="grid gap-4 md:grid-cols-2">
        {SKIPS.map((s) => (
          <li key={s.title}>
            <Card className="flex h-full flex-col p-5">
              <h2 className="flex items-start gap-2 text-lg font-bold leading-snug">
                <Ban size={20} className="mt-0.5 shrink-0" aria-hidden />
                {s.title}
              </h2>
              <p className="mt-2 text-[0.95rem]">
                <span className="font-semibold">Why skip: </span>
                {s.why}
              </p>
              <p className="mt-2 rounded-[8px] border-2 border-line bg-mint p-3 text-[0.95rem] text-onpastel">
                <span className="font-semibold">Do this instead: </span>
                {s.instead}
              </p>
              {s.link && (
                <Link to={s.link.to} className="mt-3 self-start text-sm font-semibold underline">
                  Go to {s.link.label} →
                </Link>
              )}
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
