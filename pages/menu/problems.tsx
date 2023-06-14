import { useEffect, useState } from 'react';

import Head from 'next/head';

import { GetProblemsResponse, Problem } from '@/types/problem';

import { PageHeader } from '@/components/Menu/PageHeader';
import { ProblemCard } from '@/components/Menu/Problems/ProblemCard';

import { ClientFactory } from '@/lib/clientFactory';
import { Container, Flex, Text, Title, useMantineTheme } from '@mantine/core';

interface Props { }

export default function Problems(props: Props) {
  const theme = useMantineTheme();
  const prompthonClient = ClientFactory.getPrompthonClient();
  // TODO: 仮のcompetitionId
  const competitionId = 1;
  const [problemsResponse, setProblemsResponse] =
    useState<GetProblemsResponse | null>({
      problems: [

      ],
    });

  // TODO: getProblemsが動いたらこっちに切り替える
  useEffect(() => {
    const fetchProblems = async (competitionId: number) => {
      const response = await prompthonClient.getProblems(competitionId);
      setProblemsResponse(response);
    };
    fetchProblems(competitionId);
  }, [competitionId]);

  return (
    <>
      <Head>
        <title>問題</title>
      </Head>
      <PageHeader label="問題" />
      <Container size="sm" my="xl" py="xl">
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
            <Flex
              gap="xs"
              justify="flex-start"
              direction={{ base: 'column', xs: 'row' }}
              wrap="wrap"
            >
              {problemsResponse!.problems.map((problem: Problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
            </Flex>
          </div>
        </div>
      </Container>
    </>
  );
}
