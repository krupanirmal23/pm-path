import { useState } from 'react';
import { Check, X, RotateCcw } from 'lucide-react';
import type { QuizQuestion } from '../lib/markdown';
import { useStore } from '../store/useStore';
import { Button, Card, Chip, cx } from './ui';

export function Quiz({ lessonId, questions }: { lessonId: string; questions: QuizQuestion[] }) {
  const attempts = useStore((s) => s.quizzes[lessonId]) ?? [];
  const recordQuiz = useStore((s) => s.recordQuiz);
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const [reviewOnly, setReviewOnly] = useState(false);
  const last = attempts[attempts.length - 1];

  const score = answers.reduce<number>((s, a, i) => (a !== null && questions[i].options[a]?.correct ? s + 1 : s), 0);
  const allAnswered = answers.every((a) => a !== null);

  const submit = () => {
    setSubmitted(true);
    recordQuiz(
      lessonId,
      score,
      questions.length,
      answers.map((a) => a ?? -1),
    );
  };
  const retake = () => {
    setAnswers(questions.map(() => null));
    setSubmitted(false);
    setReviewOnly(false);
  };
  const reviewWrong = () => {
    if (!last) return;
    setAnswers(last.answers.map((a) => (a < 0 ? null : a)));
    setSubmitted(true);
    setReviewOnly(true);
  };

  const shown = questions.map((q, i) => ({ q, i })).filter(({ q, i }) => !reviewOnly || !(answers[i] !== null && q.options[answers[i]!]?.correct));

  return (
    <div className="not-prose my-6 space-y-4" aria-label="Lesson quiz">
      <div className="flex flex-wrap items-center gap-2">
        {attempts.length > 0 && (
          <Chip color="butter">
            {attempts.length} attempt{attempts.length > 1 ? 's' : ''} · best {Math.max(...attempts.map((a) => a.score))}/{questions.length}
          </Chip>
        )}
        {last && !submitted && last.score < last.total && (
          <Button size="sm" onClick={reviewWrong}>
            Review wrong answers from last attempt
          </Button>
        )}
      </div>
      {reviewOnly && shown.length === 0 && <p>No wrong answers in your last attempt.</p>}
      {shown.map(({ q, i }) => (
        <Card key={i} className="p-4">
          <fieldset>
            <legend className="font-display font-bold leading-snug">
              {i + 1}. {q.q}
            </legend>
            <div className="mt-3 space-y-2">
              {q.options.map((o, j) => {
                const chosen = answers[i] === j;
                const show = submitted;
                return (
                  <div key={j}>
                    <label
                      className={cx(
                        'flex cursor-pointer items-start gap-3 rounded-[8px] border-2 px-3 py-2 text-[0.95rem]',
                        show && o.correct ? 'border-line bg-mint text-onpastel' : show && chosen && !o.correct ? 'border-line bg-pink text-onpastel' : chosen ? 'border-line bg-butter text-onpastel' : 'border-line/30 hover:border-line',
                        submitted && 'cursor-default',
                      )}
                    >
                      <input
                        type="radio"
                        name={`q-${lessonId}-${i}`}
                        className="mt-1.5 accent-[#1E1E24]"
                        checked={chosen}
                        disabled={submitted}
                        onChange={() => setAnswers((a) => a.map((x, k) => (k === i ? j : x)))}
                      />
                      <span className="flex-1">
                        {o.text}
                        {show && (
                          <span className="mt-1 flex items-start gap-1.5 text-sm">
                            {o.correct ? <Check size={15} className="mt-0.5 shrink-0" aria-label="Correct" /> : <X size={15} className="mt-0.5 shrink-0" aria-label="Incorrect" />}
                            <span>{o.why}</span>
                          </span>
                        )}
                      </span>
                    </label>
                  </div>
                );
              })}
            </div>
          </fieldset>
        </Card>
      ))}
      <div className="flex flex-wrap items-center gap-3" aria-live="polite">
        {!submitted ? (
          <Button variant="primary" disabled={!allAnswered} onClick={submit}>
            {allAnswered ? 'Check answers' : `Answer all ${questions.length} questions`}
          </Button>
        ) : (
          <>
            {!reviewOnly && (
              <span className={cx('nb-chip text-sm', score / questions.length >= 0.8 ? 'bg-mint' : 'bg-butter')}>
                Score: {score}/{questions.length}
                {score === questions.length ? ' · perfect!' : score / questions.length >= 0.8 ? ' · solid' : ' · review the explanations, then retake'}
              </span>
            )}
            <Button onClick={retake}>
              <RotateCcw size={16} aria-hidden /> Retake
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
