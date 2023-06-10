import {
  IconLoader,
  IconPlayerPlay,
  IconSquareCheck,
} from '@tabler/icons-react';
import { FC, useContext, useEffect, useState } from 'react';
import Confetti from 'react-confetti';

import { Problem } from '@/types/problem';

import HomeContext from '@/pages/api/home/home.context';

import { Score } from './Score';

import { evaluate, getProblem, submit } from '@/lib/clientApi';

interface Props {}

export const PromptbarSettings: FC<Props> = () => {
  const homeContext = useContext(HomeContext);
  const competitionId = homeContext.competitionId;
  const problemId = homeContext.problemId;

  const [problem, setProblem] = useState<Problem | null>(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const fetchProblem = async (competitionId: number, problemId: number) => {
      const result = await getProblem(competitionId, problemId);
      setProblem(result);
    };
    fetchProblem(competitionId, problemId);
  }, [competitionId, problemId]);

  // モック
  const promptHistory = [
    {
      user: 'Hello GPT!',
      gpt: 'Hello User!',
    },
  ];

  const handleEvaluate = async () => {
    setLoading(true);
    const newScore = await evaluate(
      homeContext.competitionId,
      homeContext.problemId,
      promptHistory,
    );
    setScore(newScore);
    if (newScore > bestScore) {
      setBestScore(newScore);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Hide after 5 seconds
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    const submission = await submit(
      homeContext.competitionId,
      homeContext.problemId,
      promptHistory,
    );
    console.log(submission.score);
  };

  return (
    <div className="flex flex-col items-center space-y-0 border-t border-white/0 pt-1 text-sm font-bold">
      {showConfetti && <Confetti />}
      {problem && <Score maxScore={problem.score} score={score} />}
      <button
        className="text-white flex w-[260px] h-[64px] p-3 flex-shrink-0 cursor-pointer select-none items-center gap-3 transition-colors duration-200 hover:bg-white hover:text-black"
        onClick={handleEvaluate}
        disabled={loading}
      >
        {loading ? (
          <>
            <IconLoader size={16} className="animate-spin mr-2" />
            <p>採点中...</p>
          </>
        ) : (
          <>
            <IconPlayerPlay size={16} />
            採点する
          </>
        )}
      </button>

      <button
        className="text-sidebar flex w-[260px] h-[64px] p-3 flex-shrink-0 cursor-pointer select-none items-center gap-3 transition-colors duration-200 hover:bg-gray-500 text-white"
        onClick={handleSubmit}
      >
        <IconSquareCheck size={16} />
        提出して完了する
      </button>
    </div>
  );
};
