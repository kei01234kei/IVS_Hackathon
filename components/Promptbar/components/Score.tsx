import { FC } from 'react';

interface Props {
  maxScore: number;
  score: number;
}

export const Score: FC<Props> = ({ maxScore, score }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="tour-evaluate-prompt-point p-4 pb-7 flex flex-col gap-2 w-full">
        <div className="flex items-end space-x-5">
          <p className="font-normal text-base">スコア:</p>
          <p className="font-medium text-5xl tabular-nums">{`${score}`}</p>
          <p className="font-medium text-lg">/{`${maxScore}`}pt</p>
        </div>
      </div>
    </div>
  );
};
