interface Props {
  maxScore: number;
  score: number;
}

export const Score = (props: Props) => {
  const { maxScore, score } = props;
  return (
    <div className="flex justify-center w-full">
      <div className="p-4 pb-7 flex flex-col gap-2 w-full">
        {/* <div className="p-1 flex flex-col gap-2">
          <p className="font-medium text-lg">スコア:</p>
          <p className="font-medium text-4xl">
            {`${score}`}/{`${maxScore}`}pt
          </p>
        </div> */}
        <div className="flex items-end space-x-6">
          <p className="font-medium text-base">スコア:</p>
          <p className="font-medium text-5xl">{`${score}`}</p>
          <p className="font-medium text-lg">/{`${maxScore}`}pt</p>
        </div>
      </div>
    </div>
  );
};
