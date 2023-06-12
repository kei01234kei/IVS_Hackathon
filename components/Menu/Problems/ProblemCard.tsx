import { LevelBadge } from '@/components/LevelBadge';

import { Group, Paper, Text } from '@mantine/core';

enum Level {
  Beginner = 1,
  Intermediate = 2,
  Advanced = 3,
}

interface ProblemCardProps {
  title: string;
  level: Level;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({ title, level }) => {
  return (
    <Paper
      p="sm"
      shadow="sm"
      style={{
        display: 'inline-block',
      }}
    >
      <Group>
        <Text fz="lg" fw={700}>
          {title}
        </Text>
        <LevelBadge level={level} />
      </Group>
    </Paper>
  );
};
