import {
  IconLoader,
  IconMessageChatbot,
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

interface ReasonCardProps {
  reason: string;
  loading?: boolean;
}

const ReasonCard = ({ reason, loading = false }: ReasonCardProps) => {
  return (
    <>
      <div
        className={`flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 text-sm transition-colors duration-200 hover:bg-[#343541]/90  bg-[#343541]/90`}
      >
        <IconMessageChatbot size={18} />
        {loading ? (
          <div className="flex-grow flex items-center justify-center pr-6">
            <IconLoader size={16} className="animate-spin" />
          </div>
        ) : (
          <div
            className={`relative flex-1 overflow-hidden text-ellipsis whitespace-nowrap break-all text-left text-[12.5px] leading-3 pr-12`}
          >
            <p className="mb-2">[AI採点コメント]</p>
            <p className="font-normal">{reason}</p>
          </div>
        )}
      </div>
    </>
  );
};

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
  const [canEvaluated, setCanEvaluated] = useState<boolean>(false);
  const [evaluateLoading, setEvaluateLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [reason, setReason] = useState<string>('');
  const { reward } = useReward('rewardId', 'confetti', {
    angle: 130,
  });

  useEffect(() => {
    const fetchProblem = async (competitionId: number, problemId: number) => {
      const result = await prompthonClient.getProblem(competitionId, problemId);
      setProblem(result);
    };
    fetchProblem(competitionId, problemId);
  }, [competitionId, problemId]);

  // 特定のreasonを変換する
  const reasonConverter = (reason: string) => {
    switch (reason) {
      case 'error':
        return '';
      default:
        return reason;
    }
  };

  const handleEvaluate = async () => {
    setEvaluateLoading(true);
    setIsEvaluated(true);
    const selectedConversation = state.selectedConversation;
    if (!selectedConversation) {
      alert('会話を選択してください');
      setEvaluateLoading(false);
    } else if (selectedConversation.messages.length === 0) {
      alert('メッセージを1回以上送信してください');
      setEvaluateLoading(false);
      setIsEvaluated(false);
    } else {
      // todo: user_idを取得する
      prompthonClient
        .evaluate({
          competition_id: competitionId.toString(),
          user_id: 1,
          problem_id: problemId,
          message: selectedConversation,
        })
        .then((evaluateResponse) => {
          setReason(evaluateResponse.reason);
          const newScore = evaluateResponse.score;
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
      {isEvaluated && reason && (
        <ReasonCard reason={reason} loading={evaluateLoading}></ReasonCard>
      )}
      {problem && <Score maxScore={problem.totalScore} score={score} />}
      <div>
        <span id="rewardId" />
      </div>
      <button
        className="tour-evaluate-prompt tour-active-evaluation text-white flex w-[260px] h-[64px] p-3 flex-shrink-0 cursor-pointer select-none items-center gap-3 transition-colors duration-200 hover:bg-white hover:text-black"
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
        className={`tour-submission-prompt tour-active-submission text-sidebar flex w-[260px] h-[64px] p-3 flex-shrink-0 cursor-pointer select-none items-center gap-3 transition-colors duration-200 ${
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
