import { IconExternalLink } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { GetProblemResponse } from '@/types/problem';
import { GetSubmissionResponse } from '@/types/submission';

import { ChatHistory } from '@/components/ChatHistory';
import { PromptHistory } from '@/components/PromptHistory';

import { ClientFactory } from '@/lib/clientFactory';
import { Button, Container, Flex, Table, Title } from '@mantine/core';

const getCorrectAnswerExample = (problemId: number): string => {
  switch (problemId) {
    case 1: // チュートリアル
      return 'https://chat.openai.com/share/e1e11bf3-508d-44be-94d7-977b58cd89f9';
    case 2: // 簡単な計算
      return 'https://chat.openai.com/share/cd8b240f-3e8d-40d1-81fc-ba20a2ebd811';
    case 3: // 算数
      return 'https://chat.openai.com/share/38121fb2-2463-49e4-99af-b3d1aa947311';
    case 4: // データ抽出
      return 'https://chat.openai.com/share/766c237d-2ef0-4e0b-9ef4-9e54d5292e08';
    case 5: // 大喜利
      return 'https://chat.openai.com/share/590e5326-824b-48f9-9f55-8c6665bed09d';
    default:
      return '';
  }
};

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
    <Container size="sm" pt="3rem" pb="6rem" className="flex justify-center">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">お疲れ様でした！</h1>
          <p className="text-gray-600 text-base/6">
            「{problemData.name}」を提出しました。あなたのスコアは
            {problemData.score}pt中{submissionData.score}ptです。
          </p>
          <Title order={2} c={'gray.8'}>
            提出の詳細
          </Title>
          <Table striped verticalSpacing="md" horizontalSpacing="xl">
            <tbody>{rows}</tbody>
          </Table>
        </div>
        <div className="space-y-4">
          {getCorrectAnswerExample(problemData.id) && (
            <>
              <Title order={2} c={'gray.8'}>
                正当例
              </Title>
              <Button
                component="a"
                href={getCorrectAnswerExample(problemData.id)}
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
                leftIcon={<IconExternalLink size={14} />}
              >
                正当例はこちら
              </Button>
            </>
          )}
        </div>
        <div className="space-y-4">
          <Title order={2} c={'gray.8'}>
            あなたの回答
          </Title>
          <PromptHistory prompt={submissionData.content} />
        </div>
        <ChatHistory conversation={submissionData.content} />
      </div>

      <Flex justify="center" className="fixed bottom-8 space-x-4">
        <button
          className="px-4 py-2 bg-white rounded h-10 shadow-md rounded text-gray-600 border border-gray-600 hover:border-transparent"
          onClick={() => {
            router.push({
              pathname: '/menu/problems',
            });
          }}
        >
          <p className="font-bold">問題一覧に戻る</p>
        </button>
        <button
          className="px-4 py-2 bg-gray-600 rounded h-10 shadow-md rounded text-white"
          onClick={() => {
            // TODO problemData.next_problem_idで取得するようにし、それがnullの場合の処理で分ける
            const nextProblemId = problemData.id + 1;
            if (nextProblemId > 5) {
              router.push({
                pathname: '/menu/problems',
              });
            } else {
              router.push({
                pathname: '/chat',
                query: {
                  problemId: nextProblemId,
                  competitionId,
                },
              });
            }
          }}
        >
          <p className="font-bold">次の問題を解く</p>
        </button>
      </Flex>
    </Container>
  );
};

export default Result;
