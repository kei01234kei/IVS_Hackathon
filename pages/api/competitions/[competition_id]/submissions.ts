import type { NextApiRequest, NextApiResponse } from 'next';

import {
  gradeSenseUsingChatGPT,
  gradedMultipleCaseUsingChatGPT,
} from '@/utils/app/chatGPT';

import {
  CreateSubmissionRequest,
  CreateSubmissionResponse,
} from '@/types/submission';

import { Temperature } from '@/lib/chatGPT';
import fs from 'fs';
import path from 'path';

const filePaths = {
  submissions: path.join(process.cwd(), 'data', 'submissions.json'),
  answers: path.join(process.cwd(), 'data', 'answers.json'),
  problems: path.join(process.cwd(), 'data', 'problems.json'),
  problem_types: path.join(process.cwd(), 'data', 'problem_types.json'),
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id, competition_id, problem_id, content } =
    req.body as CreateSubmissionRequest;

  // JSONファイルから投稿、回答、問題、問題の種類を読み込む
  let submissions: any;
  try {
    submissions = JSON.parse(fs.readFileSync(filePaths.submissions, 'utf8'));
  } catch (error) {
    res.status(500).json({ error: error });
  }
  let answers: any;
  try {
    answers = JSON.parse(fs.readFileSync(filePaths.answers, 'utf8'));
  } catch (error) {
    res.status(500).json({ error: error });
  }
  let problems: any;
  try {
    problems = JSON.parse(fs.readFileSync(filePaths.problems, 'utf8'));
  } catch (error) {
    res.status(500).json({ error: error });
  }
  let problem_types: any;
  try {
    problem_types = JSON.parse(
      fs.readFileSync(filePaths.problem_types, 'utf8'),
    );
  } catch (error) {
    res.status(500).json({ error: error });
  }

  // 問題の正解を探す
  const answer = answers.find((a: any) => a.problem_id === problem_id);
  if (!answer) {
    res
      .status(404)
      .json({ error: `Answer for problem id ${problem_id} not found` });
    return;
  }

  // 問題とその種類を見つける
  const problem = problems.find(
    (p: any) =>
      String(p.id) === String(problem_id) &&
      String(p.competition_id) === String(competition_id),
  );
  if (!problem) {
    throw new Error(
      `Problem not found with id: ${problem_id} and competition_id: ${competition_id}`,
    );
  }
  const problem_type = problem_types.find(
    (pt: any) => pt.id === problem.problem_type_id,
  );

  const systemPrompt = content.prompt;

  const messages = content.messages;
  if (!messages) {
    res.status(200).json({
      id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      user_id,
      problem_id,
      problem_type_id: problem.problem_type_id,
      content,
      score: 0,
      submitted_at: new Date().toISOString(),
    } as CreateSubmissionResponse);
    return;
  }

  // temperature を取得します
  const temperature = new Temperature(content.temperature);

  // スコアを算出します
  let score = 0;
  if (problem_type.type === 'pattern') {
    // ユーザの最後のメッセージを取得します
    const lastUserMessage = messages
      .filter((m: any) => m.role === 'assistant')
      .pop();
    if (!lastUserMessage) {
      res.status(400).json({ error: 'User message not found' });
      return;
    }
    if (answer && answer.contents[0] === lastUserMessage.content) {
      score = problem.score;
    }
  } else if (problem_type.type === 'gradeSenseUsingChatGPT') {
    try {
      const grade = await gradeSenseUsingChatGPT(
        problem,
        answer,
        temperature,
        systemPrompt,
        messages,
      );
      score += grade.score;
    } catch (error: any) {
      // chat gpt による採点がうまくいかなかった場合はエラーを返します
      res.status(500).json({ error: error.message });
      return;
    }
  } else if (problem_type.type === 'gradedMultipleCaseUsingChatGPT') {
    try {
      const grade = await gradedMultipleCaseUsingChatGPT(
        problem,
        answer,
        temperature,
        systemPrompt,
        messages,
      );
      score = grade.score;
    } catch (error: any) {
      // chat gpt による採点がうまくいかなかった場合はエラーを返します
      res.status(500).json({ error: error.message });
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

  // ファイルに書き込み必要がないためコメントアウト
  // fs.writeFileSync(
  //   filePaths.submissions,
  //   JSON.stringify(submissions, null, 2),
  // );

  // レスポンスを返します
  res.status(200).json(newSubmission);
};
export default handler;
