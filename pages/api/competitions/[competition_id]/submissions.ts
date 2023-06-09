import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next'

const filePaths = {
  submissions: path.join(process.cwd(), 'data', 'submissions.json'),
  answers: path.join(process.cwd(), 'data', 'answers.json'),
  problems: path.join(process.cwd(), 'data', 'problems.json'),
  problem_types: path.join(process.cwd(), 'data', 'problem_types.json'),
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { user_id, problem_id, content } = req.body;

    // JSONファイルから投稿、回答、問題、問題の種類を読み込む
    const submissions = JSON.parse(fs.readFileSync(filePaths.submissions, 'utf8'));
    const answers = JSON.parse(fs.readFileSync(filePaths.answers, 'utf8'));
    const problems = JSON.parse(fs.readFileSync(filePaths.problems, 'utf8'));
    const problem_types = JSON.parse(fs.readFileSync(filePaths.problem_types, 'utf8'));

    // 問題の正解を探す
    const answer = answers.find((a: any) => a.problem_id === problem_id);

    // 問題とその種類を見つける
    const problem = problems.find((p: any) => p.id === problem_id);
    const problem_type = problem_types.find((pt: any) => pt.id === problem.problem_type_id);

    // スコアを算出します
    let score = 0;
    if (problem_type.type === 'pattern') {
      if (answer && answer.content === content) {
        score = problem.score;
      }
    } else if (problem_type.type === 'gradedOneCaseByChatGPT') {
      // chat gpt に採点させるコードをかく
      res.status(500).json({ error: '準備中' });
    } else if (problem_type.type === 'gradedMultipleCaseByChatGPT') {
      // chat gpt に採点させるコードをかく
      res.status(500).json({ error: '準備中' });
    } else {
      res.status(500).json({ error: 'Problem type not found' });
    }
    
    // submission を作成します
    const newSubmission = {
      id: nanoid(),
      user_id,
      problem_id,
      content,
      score,
      submitted_at: new Date().toISOString(),
    };

    // 新しい submission をリストに追加して保存する
    submissions.push(newSubmission);
    fs.writeFileSync(filePaths.submissions, JSON.stringify(submissions, null, 2));

    // レスポンスを返します
    res.status(200).json(newSubmission);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
