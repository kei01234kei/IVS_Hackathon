import { Problem } from '@/types/problem';

import { LevelBadge } from '@/components/LevelBadge';

interface Props {
  problem: Problem | null;
}

export const ProblemDescription = (props: Props) => {
  const problem = props.problem;

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
          <div className="p-1 flex flex-col gap-2 whitespace-pre-wrap tour-problem">
            <p className="font-semibold text-xl">問題文</p>
            <p className="font-medium text-sm">{problem.content}</p>
          </div>
          {problem.input_example && (
            <div className="p-1 flex flex-col gap-2 whitespace-pre-wrap">
              <p className="font-semibold text-xl">入力例</p>
              <p className="font-medium text-sm">{problem.input_example}</p>
            </div>
          )}
          <div className="p-1 flex flex-col gap-2 whitespace-pre-wrap tour-output">
            <p className="font-semibold text-xl">出力フォーマット</p>
            <p className="font-medium text-sm">{problem.output_example}</p>
          </div>
          <div className="p-1 flex flex-col gap-2">
            <p className="font-semibold text-xl">配点</p>
            {problem.score === problem.totalScore ? (
              <p className="font-medium text-sm">{problem.score}pt</p>
            ) : (
              <>
                <p className="font-medium text-sm">
                  <span className="font-bold text-sm">ケースごとの配点: </span>
                  <span className="font-medium text-sm">{problem.score}pt</span>
                </p>
                <p className="font-medium text-sm">
                  <span className="font-bold text-sm">合計配点: </span>
                  <span className="font-medium text-sm">
                    {problem.totalScore}pt
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
