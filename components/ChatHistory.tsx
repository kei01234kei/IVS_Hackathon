import {
  ChatBubbleBottomCenterIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

import { Conversation } from '@/types/chat';

import { Group, Paper, ScrollArea, Title } from '@mantine/core';

interface ChatProps {
  conversation: Conversation;
}

function removeLeadingWhitespace(str: string): string {
  return str.replace(/^\s+/, ''); // Replace one or more whitespace characters at the beginning of the string with an empty string
}

const isAssistant = (role: string) => role === 'assistant';

export const ChatHistory = (props: ChatProps) => {
  const { messages } = props.conversation;

  return (
    <div>
      <Title order={3} mb="sm" c={'gray.8'}>
        会話履歴
      </Title>

      {messages.length > 0 ? (
        messages.map((message, index) => {
          const formattedMessageContent = removeLeadingWhitespace(
            message.content,
          );

          return (
            <Paper
              withBorder
              radius="md"
              mb="sm"
              p="md"
              style={{
                backgroundColor: isAssistant(message.role)
                  ? '#F3F4F6'
                  : '#FFFFFF',
              }}
              key={index}
            >
              <Group>
                {isAssistant(message.role) ? (
                  <ChatBubbleBottomCenterIcon
                    style={{ width: 20, height: 20 }}
                  />
                ) : (
                  <UserIcon style={{ width: 20, height: 20 }} />
                )}

                <ScrollArea
                  style={{
                    color: isAssistant(message.role) ? '#374151' : '#1F2937',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {formattedMessageContent}
                </ScrollArea>
              </Group>
            </Paper>
          );
        })
      ) : (
        <div className="">
          <Paper withBorder radius="md" mb="sm" p="md">
            n/a
          </Paper>
        </div>
      )}
    </div>
  );
};
