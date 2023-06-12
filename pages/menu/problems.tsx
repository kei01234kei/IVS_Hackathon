import Head from 'next/head';

import { GetProblemsResponse, Problem } from '@/types/problem';

import { PageHeader } from '@/components/Menu/PageHeader';
import { ProblemCard } from '@/components/Menu/Problems/ProblemCard';

import { ClientFactory } from '@/lib/clientFactory';
import { Container, Text, Title } from '@mantine/core';

interface Props {}

export default function Problems(props: Props) {
  const prompthonClient = ClientFactory.getPrompthonClient();
  // TODO: PR16がマージされたら (モックのバックエンドAPIが動いたら) ここ対応する
  // const problems: GetProblemsResponse[] = await prompthonClient.getProblems(1);
  // ダミーデータ
  const getProblemsResponse: GetProblemsResponse = {
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
  };
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
              IVS
              Prompthon2023へようこそ！あなたがここにいること、それ自体が未来への第一歩です。この場所はただの学習の場じゃない、未来と共に進化する旅の始まり地点です。
            </Text>
            <Text fz="md" c="gray.8">
              ChatGPTをただ使うだけ？それは古い話。ここではChatGPTをどう使いこなすか、それを学びます。でも、単にコードを打ち込むだけじゃないんです。一緒に、AIと共に新しい未来を切り開いていくんです。
            </Text>
            <Text fz="md" c="gray.8">
              私たちが目指してるのは、自分自身が何でもできる人材になること。AIを上手く活用するためのツール、それがPrompthonです。
              さあ、共にこの挑戦を始めましょう。未来を創造するために、Prompthonであなたの力を試してみてください！
            </Text>
          </div>
          <div className="space-y-4">
            <Title order={2} c="gray.8">
              問題
            </Title>
            <div className="space-x-4">
              {getProblemsResponse.problems.map((problem: Problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
