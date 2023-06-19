import { GetTipsResponse } from '@/types/tips';

import { Paper, Title } from '@mantine/core';

interface Props {
  tips: GetTipsResponse;
}

export const TipsCard = (props: Props) => {
  const { tips } = props;

  return (
    <>
      <Paper
        withBorder
        radius="md"
        mb="sm"
        p="md"
        style={{
          backgroundColor: '#FFFFFF',
        }}
      >
        <div className="space-y-4">
          <div className="space-y-1 whitespace-pre-wrap">
            <p className="text-gray-800">{tips?.content}</p>
          </div>
          {tips && tips?.examples.length > 0
            ? tips?.examples.map((example, index) => {
                return (
                  <div className="space-y-1 whitespace-pre-wrap key={index}">
                    <p className="text-gray-400">{example.title}</p>
                    <p className="text-gray-800">{example.content}</p>
                  </div>
                );
              })
            : null}
        </div>
      </Paper>
    </>
  );
};
