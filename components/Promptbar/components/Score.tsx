import { FC } from 'react';

interface Props {
  maxScore: number;
  score: number;
}

export const Score: FC<Props> = ({ maxScore, score }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="p-4 pb-7 flex flex-col gap-2 w-full">
        <div className="flex items-end space-x-6">
          <p className="font-medium text-base">スコア:</p>
          <p className="font-medium text-5xl">{`${score}`}</p>
          <p className="font-medium text-lg">/{`${maxScore}`}pt</p>
        </div>
      </div>
    </div>
  );
};
