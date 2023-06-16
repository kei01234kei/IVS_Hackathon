import React, { useState } from 'react';

import { getBadgeProps } from '@/utils/app/badgeColor';

import { Problem } from '@/types/problem';

import { LevelBadge } from '@/components/LevelBadge';

import { Group, Paper, Text } from '@mantine/core';

interface ProblemCardProps {
  problem: Problem;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
  const { color, colorCode } = getBadgeProps(problem.level);
  const originalTextColor = 'gray.8';
  const [textColor, setTextColor] = useState(originalTextColor);

  const handleClick = () => {
    window.open(
      `/chat?problemId=${problem.id}&competitionId=${problem.competition_id}`,
      '_blank',
    );
  };

  return (
    <Paper
      p="sm"
      shadow="sm"
      style={{
        display: 'inline-block',
        background: 'white',
        transition: 'background 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `${colorCode}`;
        setTextColor('white');
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'white';
        setTextColor(originalTextColor);
      }}
      onClick={handleClick}
    >
      <Group noWrap={true} align={'center'} spacing={'sm'}>
        <Text
          fz="lg"
          fw={700}
          c={textColor}
          style={{ transition: 'color 0.2s' }}
        >
          {problem.name}
        </Text>
        <LevelBadge level={problem.level} />
      </Group>
    </Paper>
  );
};
