import { Problem } from '@/types/problem';
import { SubmissionResponse } from '@/types/submission';

// 問題の詳細を取得
export async function getProblem(
  competitionId: number,
  problemId: number,
): Promise<Problem> {
  // リアルなAPIを叩く処理は後ほど実装
  return {
    id: problemId,
    competition_id: competitionId,
    problem_number: 1,
    name: '算数の問題',
    level: 1,
    score: 5,
    problem_type_id: 1,
    content:
      'A君が16日、B君が20日で終わらせられる仕事がある。この仕事を2人で行ったとき、終わるのは何日後？',
    input_example: '入力例',
    output_example: '整数のみ (小数の場合は繰り上げ)',
  };
}

// 採点
export async function evaluate(
  competitionId: number,
  problemId: number,
  promptHistory: any,
): Promise<number> {
  // とりあえずランダムな点数を返す
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 6));
    }, 1000); // 1秒後にresolve
  });
}

// 提出
export async function submit(
  competitionId: number,
  problemId: number,
  promptHistory: any,
): Promise<SubmissionResponse> {
  // とりあえずランダムな値を返す
  // 提出すれば満点
  return Promise.resolve({
    id: 1,
    user_id: 1,
    problem_id: problemId,
    problem_type: 'problemType',
    content: JSON.stringify(promptHistory),
    score: 5,
    submitted_at: new Date().toISOString(),
  });
}
