import { PageHeader } from '@/components/Menu/PageHeader';
import { ProblemCard } from '@/components/Menu/Problems/ProblemCard';

import { Container, Title } from '@mantine/core';

interface Props {
  user: any;
  page: number;
  pageSize: number;
  sortBy: string;
}

export default function Problems(props: Props) {
  return (
    <>
      <PageHeader label="問題" />
      <Container size="lg" style={{ padding: '64px 128px' }}>
        <Title order={1}>IVS Prompthon 2023</Title>
        <p>
          IVS Prompthon
          2023へようこそ！あなたがここにいること、それ自体が未来への第一歩です。この場所はただの学習の場じゃない、未来と共に進化する旅の始まり地点です。
        </p>
        <p>
          ChatGPTをただ使うだけ？それは古い話。ここではChatGPTをどう使いこなすか、それを学びます。でも、単にコードを打ち込むだけじゃないんです。一緒に、AIと共に新しい未来を切り開いていくんです。
        </p>
        <p>
          私たちが目指してるのは、自分自身が何でもできる人材になること。AIを上手く活用するためのツール、それがPrompthonです。
          さあ、共にこの挑戦を始めましょう。未来を創造するために、Prompthonであなたの力を試してみてください！
        </p>
        <p></p>
        <Title order={2}>問題</Title>
        <p></p>
        <ProblemCard title="算数の問題" level={1} />
      </Container>
    </>
  );
}
