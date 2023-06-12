import Head from 'next/head';

import { PageHeader } from '@/components/Menu/PageHeader';

import { Container, Text, Title } from '@mantine/core';

interface Props {}

export default function Problems(props: Props) {
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
              What's Prompthon?
            </Title>
          </div>
          <div className="space-y-4">
            <Title order={2} c="gray.8">
              Prompthonとは
            </Title>
            <Text fz="md" c="gray.8">
              Default text
            </Text>
          </div>
          <div className="space-y-4">
            <Title order={2} c="gray.8">
              Prompthonのルール
            </Title>
            <Text fz="md" c="gray.8">
              Default text
            </Text>
          </div>
        </div>
      </Container>
    </>
  );
}
