import { useState } from 'react';

import Head from 'next/head';

import { GetProblemsResponse, Problem } from '@/types/problem';

import { PageHeader } from '@/components/Menu/PageHeader';
import { ProblemCard } from '@/components/Menu/Problems/ProblemCard';

import { ClientFactory } from '@/lib/clientFactory';
import { Container, Text, Title } from '@mantine/core';

interface Props {}

export default function Problems(props: Props) {
  const prompthonClient = ClientFactory.getPrompthonClient();
  // TODO: 仮のcompetitionId
  const competitionId = 1;
  const [problemsResponse, setProblemsResponse] =
    useState<GetProblemsResponse | null>({
      problems: [
        {
          competition_id: 1,
          id: 1,
          problem_number: 1,
          name: '算数の問題',
          level: 1,
          score: 4,
          problem_type_id: 1,
          content:
            'A君が16日、B君が20日で終わらせられる仕事がある。この仕事を2人で行ったとき、終わるのは何日後？',
          input_example: '入力例',
          output_example: '整数のみ (小数の場合は繰り上げ)',
          prev_problem_id: null,
          next_problem_id: null,
        },
        {
          competition_id: 1,
          id: 2,
          problem_number: 2,
          name: '中級問題',
          level: 2,
          score: 4,
          problem_type_id: 1,
          content: '中級問題',
          input_example: '入力例',
          output_example: '出力例',
          prev_problem_id: null,
          next_problem_id: null,
        },
        {
          competition_id: 1,
          id: 3,
          problem_number: 3,
          name: '上級問題',
          level: 3,
          score: 4,
          problem_type_id: 1,
          content: '上級問題',
          input_example: '入力例',
          output_example: '出力例',
          prev_problem_id: null,
          next_problem_id: null,
        },
      ],
    });

  // TODO: getProblemsが動いたらこっちに切り替える
  // useEffect(() => {
  //   const fetchProblems = async (competitionId: number) => {
  //     const response = await prompthonClient.getProblems(competitionId);
  //     setProblemsResponse(response);
  //   };
  //   fetchProblems(competitionId);
  // }, [competitionId]);

  return (
    <>
      <Head>
        <title>問題</title>
      </Head>
      <PageHeader label="問題" />
      <Container size="lg" style={{ padding: '64px 128px' }}>
        <div className="space-y-8">
          <div className="space-y-4">
            <Title order={1} c="gray.8">
              IVS Prompthon 2023
            </Title>
            <Text fz="md" c="gray.8">
              IVS Prompthon
              2023に参加いただき、ありがとうございます。ここでの経験を通じて、AIとの対話を通じて問題解決する新たな技術を身につけ、一歩進んだスキルを習得できることを願っています。
              <p>一緒に学び、挑戦し、成長しましょう！</p>
            </Text>
          </div>
          <div className="space-y-4">
            <Title order={2} c="gray.8">
              問題
            </Title>
            <div className="space-x-4">
              {problemsResponse!.problems.map((problem: Problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
