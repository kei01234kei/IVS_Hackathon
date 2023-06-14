import Head from 'next/head';

import { PageHeader } from '@/components/Menu/PageHeader';

import { Container, Text, Title } from '@mantine/core';

interface Props {}

export default function Problems(props: Props) {
  return (
    <>
      <Head>
        <title>Prompthonとは</title>
      </Head>
      <PageHeader label="Prompthonとは" />
      <Container size="sm" my="xl" py="xl">
        <div className="space-y-8">
          <div className="space-y-4">
            <Title order={1} c="gray.8">
              What's Prompthon?
            </Title>
          </div>
          <div className="space-y-4">
            <Title order={2} c="gray.8">
              Prompthonについて
            </Title>
            <Text fz="md" c="gray.8">
              <p>
                Prompthon (プロンプトソン)は、プロンプト (Prompt) と
                ハッカソン(Hackathon)を組み合わせた造語であり、ChatGPTとの対話スキルを磨くためのコンペティションです。
              </p>
              <p>
                各参加者は具体的なタスクについて、ChatGPTだけで達成することが求められます。ゲーム感覚でプロンプトエンジニアリングを学ぶことで、AIとの対話により深い理解を得ることが可能になります。まずはAIとの対話を「知る」ことから始まり、「使いこなす」ことへと進み、最終的には「自動化する」ことを目指します。
              </p>
            </Text>
          </div>
          <div className="space-y-4">
            <Title order={2} c="gray.8">
              Prompthonのルール
            </Title>
            <Text fz="md" c="gray.8">
              <p>
                Prompthonのコンペティションでは、参加者が特定のタスクを解決するためにChatGPTと対話します。
              </p>
            </Text>
          </div>
        </div>
      </Container>
    </>
  );
}
