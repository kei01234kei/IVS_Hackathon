import { Badge } from '@mantine/core';

enum Level {
  Beginner = 1,
  Intermediate = 2,
  Advanced = 3,
}

interface LevelBadgeProps {
  level: Level;
}

export const LevelBadge = ({ level }: LevelBadgeProps) => {
  let color: string;
  let label: string;

  switch (level) {
    case Level.Beginner:
      color = 'green';
      label = '初級';
      break;
    case Level.Intermediate:
      color = 'lightblue';
      label = '中級';
      break;
    case Level.Advanced:
      color = 'red';
      label = '上級';
      break;
    default:
      color = 'gray';
      label = '未定義';
  }

  return (
    <Badge color={color} size="md" radius="sm" variant="filled">
      {label}
    </Badge>
  );
};
