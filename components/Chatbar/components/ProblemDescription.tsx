import { Problem } from '@/types/problem';

import { LevelBadge } from '@/components/LevelBadge';

enum Level {
  Beginner = 1,
  Intermediate = 2,
  Advanced = 3,
}

interface Props {
  problem: Problem | null;
}

export const ProblemDescription = (props: Props) => {
  const problem = props.problem;
  let levelLabel: string = '';

  if (problem) {
    switch (problem.level) {
      case Level.Beginner:
        levelLabel = '初級';
        break;
      case Level.Intermediate:
        levelLabel = '中級';
        break;
      case Level.Advanced:
        levelLabel = '上級';
        break;
    }
  }

  return (
    <div className="flex justify-center">
      {problem && (
        <div className="p-2 flex flex-col gap-5">
          <div className="p-1 flex flex-col gap-2">
            <div className="flex items-center space-x-3">
              <p className="font-semibold text-2xl">{problem.name}</p>
              <LevelBadge level={problem.level} />
            </div>
          </div>
          <div className="p-1 flex flex-col gap-2 whitespace-pre-wrap">
            <p className="font-semibold text-xl">問題文</p>
            <p className="font-medium text-sm">{problem.content}</p>
          </div>
          <div className="p-1 flex flex-col gap-2 whitespace-pre-wrap">
            <p className="font-semibold text-xl">出力フォーマット</p>
            <p className="font-medium text-sm">{problem.output_example}</p>
          </div>
          <div className="p-1 flex flex-col gap-2">
            <p className="font-semibold text-xl">配点</p>
            <p className="font-medium text-sm">{problem.score}pt</p>
          </div>
        </div>
      )}
    </div>
  );
};
