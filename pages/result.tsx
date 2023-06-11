import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { Problem } from '@/types/problem';
import { GetSubmissionResponse } from '@/types/submission';

import { ClientFactory } from '@/lib/clientFactory';

const Result: React.FC = () => {
  const router = useRouter();
  const { userId, problemId, competitionId, submissionId } = router.query;
  const [submissionData, setSubmissionData] =
    useState<GetSubmissionResponse | null>(null);
  const prompthonClient = ClientFactory.getPrompthonClient();
  const [problemData, setProblemData] = useState<Problem | null>(null);

  useEffect(() => {
    if (!userId || !competitionId || !problemId) return;

    const fetchSubmissionData = async () => {
      const res = await prompthonClient.getSubmission(
        Number(competitionId),
        Number(submissionId),
      );
      setSubmissionData(res);
    };

    fetchSubmissionData();

    const fetchProblemData = async () => {
      const res = await prompthonClient.getProblem(
        Number(competitionId),
        Number(problemId),
      );
      setProblemData(res);
    };
    fetchProblemData();
  }, [userId, competitionId, problemId]);

  // Ensure data is loaded before rendering
  if (!submissionData || !problemData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen mx-auto px-[384px] py-32 bg-white">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">お疲れ様でした！</h1>
          <p className="text-gray-600 text-base/6">
            「{problemData.name}」を提出しました。あなたのスコアは
            {problemData.score}pt中{submissionData.score}ptです。
          </p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold text-gray-800">User ID:</h2>
          <p className="text-gray-600">{submissionData.user_id}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold text-gray-800">Content:</h2>
          <p className="text-gray-600">{submissionData.content.toString()}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold text-gray-800">Score:</h2>
          <p className="text-gray-600">{submissionData.score}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold text-gray-800">Submitted At:</h2>
          <p className="text-gray-600">{submissionData.submitted_at}</p>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 space-x-4">
        <button
          className="px-4 py-2 bg-white rounded h-10 rounded text-gray-600 border border-gray-600 hover:border-transparent"
          onClick={() => {
            alert('未実装');
            // router.push('/another-path');
          }}
        >
          <p className="font-bold">問題一覧に戻る</p>
        </button>
        <button
          className="px-4 py-2 bg-gray-600 rounded h-10 rounded text-white"
          onClick={() => {
            prompthonClient.getNextProblemId(Number(problemId)).then((nextProblemId) => {
              router.push({
                pathname: '/',
                query: {
                  problemId: nextProblemId,
                  competitionId,
                },
              });
            });
          }}
        >
          <p className="font-bold">次の問題を解く</p>
        </button>
      </div>
    </div>
  );
};

export default Result;
