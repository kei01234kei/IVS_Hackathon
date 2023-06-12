import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { GetProblemResponse } from '@/types/problem';
import { GetSubmissionResponse } from '@/types/submission';

import { ChatHistory } from '@/components/ChatHistory';
import { PromptHistory } from '@/components/PromptHistory';

import { ClientFactory } from '@/lib/clientFactory';
import { Table, Title } from '@mantine/core';

const Result: React.FC = () => {
  const router = useRouter();
  const { userId, problemId, competitionId, submissionId } = router.query;
  const [submissionData, setSubmissionData] =
    useState<GetSubmissionResponse | null>(null);
  const prompthonClient = ClientFactory.getPrompthonClient();
  const [problemData, setProblemData] = useState<GetProblemResponse | null>(
    null,
  );

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Asia/Tokyo',
  };

  const formatter = new Intl.DateTimeFormat('ja-JP', options);

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

  const elements = [
    {
      col: '提出日時',
      value: formatter.format(new Date(submissionData.submitted_at)),
    },
    { col: '問題', value: problemData.name },
    { col: 'スコア', value: `${submissionData.score}pt` },
  ];

  const rows = elements.map((element) => (
    <tr key={element.col}>
      <td>{element.col}</td>
      <td>{element.value}</td>
    </tr>
  ));

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
        <div className="space-y-4">
          <Title order={2} c={'gray.8'}>
            提出の詳細
          </Title>
          <Table striped verticalSpacing="md" horizontalSpacing="xl">
            <tbody>{rows}</tbody>
          </Table>
        </div>
        <PromptHistory prompt={submissionData.content} />
        <ChatHistory conversation={submissionData.content} />
      </div>

      <div className="fixed bottom-8 right-8 space-x-4">
        <button
          className="px-4 py-2 bg-white rounded h-10 rounded text-gray-600 border border-gray-600 hover:border-transparent"
          onClick={() => {
            router.push({
              pathname: '/menu/problems',
            });
          }}
        >
          <p className="font-bold">問題一覧に戻る</p>
        </button>
        <button
          className="px-4 py-2 bg-gray-600 rounded h-10 rounded text-white"
          onClick={() => {
            router.push({
              pathname: '/chat',
              query: {
                problemId: problemData.next_problem_id,
                competitionId,
              },
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
