import Head from 'next/head';

import { PageHeader } from '@/components/Menu/PageHeader';

import { Container, Text, Title } from '@mantine/core';

interface Props {}

export default function Submits(props: Props) {
  return (
    <>
      <Head>
        <title>提出結果</title>
      </Head>
      <PageHeader label="提出結果" />
      <Container size="sm" my="xl" py="xl">
        <div className="space-y-8">
          <div className="space-y-4">
            <Title order={1} c="gray.8">
              提出結果
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
