import { useRouter } from 'next/router';

import { Problem } from '@/types/problem';

import { LevelBadge } from '@/components/LevelBadge';

import { Group, Paper, Text } from '@mantine/core';

enum Level {
  Beginner = 1,
  Intermediate = 2,
  Advanced = 3,
}

interface ProblemCardProps {
  problem: Problem;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
  const router = useRouter();

  const handleClick = () => {
    window.open(
      `/chat/?problemId=${problem.id}&competitionId=${problem.competition_id}`,
      '_blank',
    );
  };

  return (
    <Paper
      p="sm"
      shadow="sm"
      style={{
        display: 'inline-block',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.transition = 'transform 0.3s ease-in-out';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
      onClick={handleClick}
    >
      <Group>
        <Text fz="lg" fw={700}>
          {problem.name}
        </Text>
        <LevelBadge level={problem.level} />
      </Group>
    </Paper>
  );
};
