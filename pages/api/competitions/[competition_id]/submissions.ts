import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

import { Temperature } from '@/lib/chatGPT';
import { gradeSenseUsingChatGPT, gradedMultipleCaseUsingChatGPT } from '@/utils/app/chatGPT';
import { CreateSubmissionRequest, CreateSubmissionResponse } from '@/types/submission';


const filePaths = {
  submissions: path.join(process.cwd(), 'data', 'submissions.json'),
  answers: path.join(process.cwd(), 'data', 'answers.json'),
  problems: path.join(process.cwd(), 'data', 'problems.json'),
  problem_types: path.join(process.cwd(), 'data', 'problem_types.json'),
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { user_id, competition_id, problem_id, content } = req.body as CreateSubmissionRequest;

    // JSONファイルから投稿、回答、問題、問題の種類を読み込む
    const submissions = JSON.parse(fs.readFileSync(filePaths.submissions, 'utf8'),);
    const answers = JSON.parse(fs.readFileSync(filePaths.answers, 'utf8'));
    const problems = JSON.parse(fs.readFileSync(filePaths.problems, 'utf8'));
    const problem_types = JSON.parse(fs.readFileSync(filePaths.problem_types, 'utf8'),);

    // 問題の正解を探す
    const answer = answers.find((a: any) => a.problem_id === problem_id);

    // 問題とその種類を見つける
    const problem = problems.find((p: any) => String(p.id) === String(problem_id) && String(p.competition_id) === String(competition_id));
    if (!problem) {
      throw new Error(`Problem not found with id: ${problem_id} and competition_id: ${competition_id}`);
    }
    const problem_type = problem_types.find((pt: any) => pt.id === problem.problem_type_id,);

    // ユーザの最後のメッセージを取得します
    const userAnswer = content.messages[content.messages.length - 1].content;;
    if (!answer) {
      res.status(404).json({ error: `Answer for problem id ${problem_id} not found` });
      return;
    }

    // temperature を取得します
    const temperature = new Temperature(content.temperature);

    // スコアを算出します
    let score = 0;
    if (problem_type.type === 'pattern') {
      if (answer && answer.contents[0] === userAnswer) {
        score = problem.score;
      }
    } else if (problem_type.type === 'gradeSenseUsingChatGPT') {
      try {
        score = await gradeSenseUsingChatGPT(userAnswer, problem, answer, temperature);
      } catch (error) {
        // chat gpt による採点がうまくいかなかった場合はエラーを返します
        res.status(500).json({ error: error });
        return;
      }
    } else if (problem_type.type === 'gradedMultipleCaseUsingChatGPT') {
      const system_prompt = content.messages.find((m: any) => m.role === 'system')?.content || '';
      try {
        score = await gradedMultipleCaseUsingChatGPT(userAnswer, system_prompt, problem, answer, temperature);
      } catch (error: any) {
        // chat gpt による採点がうまくいかなかった場合はエラーを返します
        res.status(500).json({ error: error });
        return;
      }
    } else {
      res.status(500).json({ error: 'Problem type not found' });
      return;
    }

    // submission を作成します
    const newSubmission: CreateSubmissionResponse = {
      id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      user_id,
      problem_id,
      problem_type_id: problem.problem_type_id,
      content,
      score,
      submitted_at: new Date().toISOString(),
    };

    // 新しい submission をリストに追加して保存する
    submissions.push(newSubmission);
    fs.writeFileSync(
      filePaths.submissions,
      JSON.stringify(submissions, null, 2),
    );

    // レスポンスを返します
    res.status(200).json(newSubmission);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
