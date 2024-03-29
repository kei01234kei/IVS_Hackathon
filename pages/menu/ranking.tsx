import Head from 'next/head';

import { PageHeader } from '@/components/Menu/PageHeader';

import { Container, Text, Title } from '@mantine/core';

interface Props {}

export default function Ranking(props: Props) {
  return (
    <>
      <Head>
        <title>順位</title>
      </Head>
      <PageHeader label="順位" />
      <Container size="sm" my="xl" py="xl">
        <div className="space-y-8">
          <div className="space-y-4">
            <Title order={1} c="gray.8">
              順位
            </Title>
            <Text fz="md" c="gray.8">
              <p>未実装</p>
            </Text>
          </div>
        </div>
      </Container>
    </>
  );
}
