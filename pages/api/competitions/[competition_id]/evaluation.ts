import type { NextApiRequest, NextApiResponse } from 'next';

import {
  MakeWrongReasonCompared,
  gradeSenseUsingChatGPT,
  gradedMultipleCaseUsingChatGPT,
} from '@/utils/app/chatGPT';

import { EvaluationRequest, EvaluationResponse } from '@/types/submission';

import { Temperature } from '@/lib/chatGPT';
import fs from 'fs';
import path from 'path';

const filePaths = {
  answers: path.join(process.cwd(), 'data', 'answers.json'),
  problems: path.join(process.cwd(), 'data', 'problems.json'),
  problem_types: path.join(process.cwd(), 'data', 'problem_types.json'),
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id, competition_id, problem_id, message } =
    req.body as EvaluationRequest;

  // JSONファイルから回答、問題、問題の種類を読み込む
  let answers: any;
  try {
    answers = JSON.parse(fs.readFileSync(filePaths.answers, 'utf8'));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
  let problems: any;
  try {
    problems = JSON.parse(fs.readFileSync(filePaths.problems, 'utf8'));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
  let problem_types: any;
  try {
    problem_types = JSON.parse(
      fs.readFileSync(filePaths.problem_types, 'utf8'),
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message });
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

  const systemPrompt = message.prompt;

  const messages = message.messages;
  if (!messages) {
    res.status(200).json({
      competition_id,
      user_id,
      problem_id,
      message,
      score: 0,
      reason: "",
      submitted_at: new Date().toISOString(),
    } as EvaluationResponse);
    return;
  }

  // temperature を取得します
  const temperature = new Temperature(message.temperature);

  // スコアを算出します
  let score = 0;
  let reason = '';
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
    } else {
      score = 0;
      reason = await MakeWrongReasonCompared(
        lastUserMessage.content,
        answer.contents[0],
      );
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
      score = grade.score;
      reason = grade.reason;
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
      reason = grade.reason;
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
  const evaluationResponse: EvaluationResponse = {
    competition_id,
    user_id,
    problem_id,
    message,
    score,
    reason,
    submitted_at: new Date().toISOString(),
  };

  // レスポンスを返します
  res.status(200).json(evaluationResponse);
};

export default handler;
