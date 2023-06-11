import { Conversation } from '@/types/chat';

import { Paper, Title } from '@mantine/core';

interface PromptProps {
  prompt: Conversation;
}

export const PromptHistory = (props: PromptProps) => {
  const { model, prompt, temperature } = props.prompt;

  return (
    <div>
      <Title order={3} mb="sm">
        プロンプト情報
      </Title>

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
          <div className="space-y-1">
            <p className="text-gray-400">モデル</p>
            <p className="text-gray-800">{model.name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-400">システムプロンプト</p>
            <p className="text-gray-800">{prompt}</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-400">Temperature</p>
            <p className="text-gray-800">{temperature}</p>
          </div>
        </div>
      </Paper>
    </div>
  );
};
