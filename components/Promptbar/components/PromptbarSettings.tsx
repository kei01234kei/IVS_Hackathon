import {
  IconLoader,
  IconPlayerPlay,
  IconSquareCheck,
} from '@tabler/icons-react';
import { FC, useContext, useEffect, useState } from 'react';
import { useReward } from 'react-rewards';

import { useRouter } from 'next/router';

import { Problem } from '@/types/problem';

import ChatbarContext from '@/components/Chatbar/Chatbar.context';
import HomeContext from '@/components/Home/home.context';

import { Score } from './Score';

import { ClientFactory } from '@/lib/clientFactory';

interface Props {}

export const PromptbarSettings: FC<Props> = () => {
  const prompthonClient = ClientFactory.getPrompthonClient();
  const {
    state,
    competitionId,
    problemId,
    handleUpdateScore,
    handleUpdateBestScore,
  } = useContext(HomeContext);
  const { handleClearConversations } = useContext(ChatbarContext);
  const score = state.score;
  const bestScore = state.bestScore;
  const [problem, setProblem] = useState<Problem | null>(null);
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [evaluateLoading, setEvaluateLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { reward, isAnimating } = useReward('rewardId', 'confetti', {
    angle: 130,
  });

  useEffect(() => {
    const fetchProblem = async (competitionId: number, problemId: number) => {
      const result = await prompthonClient.getProblem(competitionId, problemId);
      setProblem(result);
    };
    fetchProblem(competitionId, problemId);
  }, [competitionId, problemId]);

  const handleEvaluate = async () => {
    setEvaluateLoading(true);
    setIsEvaluated(true);
    const selectedConversation = state.selectedConversation;
    if (!selectedConversation) {
      alert('会話を選択してください');
      setEvaluateLoading(false);
    } else {
      // todo: user_idを取得する
      prompthonClient
        .evaluate({
          competition_id: competitionId.toString(),
          user_id: 1,
          problem_id: problemId,
          message: selectedConversation,
        })
        .then((evaluate) => {
          const newScore = evaluate.score;
          handleUpdateScore(newScore);
          if (newScore > bestScore) {
            handleUpdateBestScore(newScore);
            reward();
          }
          setEvaluateLoading(false);
        });
    }
  };

  const router = useRouter();

  const handleSubmit = async () => {
    if (isEvaluated) {
      const isConfirmed = window.confirm(
        `${bestScore}点のスコアで提出しますか？`,
      );
      if (isConfirmed) {
        setSubmitLoading(true);
        const selectedConversation = state.selectedConversation;
        if (!selectedConversation) {
          alert('会話を選択してください');
          setSubmitLoading(false);
          return;
        } else {
          // todo: user_idを取得する
          const submission = await prompthonClient.createSubmission({
            user_id: 1,
            competition_id: competitionId,
            problem_id: problemId,
            content: selectedConversation,
          });
          localStorage.setItem('tmp.submission', JSON.stringify(submission));
          console.log(submission.score);
          console.log(submission.content);
          handleClearConversations();
          setSubmitLoading(false);
          router.push({
            pathname: '/result',
            query: {
              userId: 1,
              problemId,
              competitionId,
              submissionId: submission.id,
            },
          });
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-0 border-t border-white/20 pt-2 text-sm font-bold">
      {problem && <Score maxScore={problem.score} score={score} />}
      <div>
        <span id="rewardId" />
      </div>
      <button
        className="text-white flex w-[260px] h-[64px] p-3 flex-shrink-0 cursor-pointer select-none items-center gap-3 transition-colors duration-200 hover:bg-white hover:text-black"
        onClick={handleEvaluate}
        disabled={evaluateLoading}
      >
        {evaluateLoading ? (
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

      {/* className="text-sidebar flex w-[260px] h-[64px] p-3 flex-shrink-0 cursor-pointer select-none items-center gap-3 transition-colors duration-200 hover:bg-gray-500 text-white" */}
      <button
        className={`text-sidebar flex w-[260px] h-[64px] p-3 flex-shrink-0 cursor-pointer select-none items-center gap-3 transition-colors duration-200 ${
          isEvaluated
            ? 'hover:bg-gray-500 text-white'
            : 'bg-gray text-gray-600 pointer-events-none'
        }`}
        onClick={handleSubmit}
      >
        {submitLoading ? (
          <>
            <IconLoader size={16} className="animate-spin mr-2" />
            <p>提出中...</p>
          </>
        ) : (
          <>
            <IconSquareCheck size={16} />
            提出して完了する
          </>
        )}
      </button>
    </div>
  );
};
