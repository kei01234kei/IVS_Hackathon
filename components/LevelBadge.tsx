import { Level, getBadgeProps } from '@/utils/app/badgeColor';

import { Badge } from '@mantine/core';

interface LevelBadgeProps {
  level: Level;
}

export const LevelBadge = ({ level }: LevelBadgeProps) => {
  const { color, label } = getBadgeProps(level);

  return (
    <Badge color={color} size="md" radius="sm" variant="filled">
      {label}
    </Badge>
  );
};
