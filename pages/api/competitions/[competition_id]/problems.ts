import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import { GetProblemResponse } from '@/types/problem';


// problems.json ファイルのパスを取得します。
const filePaths = {
  problems: path.join(process.cwd(), 'data', 'problems.json'),
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // HTTPメソッドをチェックします。
  if (req.method === 'GET') {
    const { competition_id } = req.query;

    // JSONファイルから問題を読み込む
    const problems = JSON.parse(fs.readFileSync(filePaths.problems, 'utf8'));

    // 問題と一覧を見つける
    const responseProblems = problems.filter((p: any) => String(p.competition_id) === String(competition_id)) as GetProblemResponse[];
    if (!responseProblems) {
      throw new Error(`Problem not found with competition_id: ${competition_id}`);
    }

    // レスポンスとして問題を返します。
    res.status(200).json({ problems: responseProblems });
  }
}
