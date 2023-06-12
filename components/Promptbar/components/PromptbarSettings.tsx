import {
  IconLoader,
  IconPlayerPlay,
  IconSquareCheck,
} from '@tabler/icons-react';
import { FC, useContext, useEffect, useState } from 'react';
import { useReward } from 'react-rewards';

import { useRouter } from 'next/router';

import { Problem } from '@/types/problem';

import HomeContext from '@/pages/chat/home.context';

import ChatbarContext from '@/components/Chatbar/Chatbar.context';

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
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const selectedConversation = state.selectedConversation;
    if (!selectedConversation) {
      alert('会話を選択してください');
      setLoading(false);
    } else {
      prompthonClient
        .evaluate(competitionId, problemId, selectedConversation)
        .then((newScore) => {
          handleUpdateScore(newScore);
          if (newScore > bestScore) {
            handleUpdateBestScore(newScore);
            reward();
          }
          setLoading(false);
        });
    }
  };

  const router = useRouter();

  const handleSubmit = async () => {
    const selectedConversation = state.selectedConversation;
    if (!selectedConversation) {
      alert('会話を選択してください');
      return;
    } else {
      const submission = await prompthonClient.submit(
        competitionId,
        problemId,
        selectedConversation,
      );
      console.log(submission.score);
      console.log(submission.content);
      handleClearConversations();
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
