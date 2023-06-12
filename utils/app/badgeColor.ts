interface BadgeProps {
  color: string;
  colorCode: string;
  label: string;
}

export const getBadgeProps = (level: Level): BadgeProps => {
  let color: string;
  let colorCode: string;
  let label: string;

  switch (level) {
    case Level.Beginner:
      color = 'green.4';
      colorCode = '#69DB7C';
      label = '初級';
      break;
    case Level.Intermediate:
      color = 'blue.4';
      colorCode = '#4DABF7';
      label = '中級';
      break;
    case Level.Advanced:
      color = 'red.4';
      colorCode = '#FF8787';
      label = '上級';
      break;
    default:
      color = 'gray.4';
      colorCode = '#CED4DA';
      label = '未定義';
  }

  return { color, colorCode, label };
};

export enum Level {
  Beginner = 1,
  Intermediate = 2,
  Advanced = 3,
}
