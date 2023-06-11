import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next'

import { ChatGPT, ChatGPTMessage } from '@/lib/chatGPT';


type Score = {
  score: number;
}

// 現時点では chat gpt のモデルは gpt-4 のみを使用します
const chatGPTModel = 'gpt-4';

const filePaths = {
  submissions: path.join(process.cwd(), 'data', 'submissions.json'),
  answers: path.join(process.cwd(), 'data', 'answers.json'),
  problems: path.join(process.cwd(), 'data', 'problems.json'),
  problem_types: path.join(process.cwd(), 'data', 'problem_types.json'),
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { user_id, problem_id, system_prompt, content } = req.body; // この system_prompt は gradedMultipleCaseByChatGPT 用です

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
      if (answer && answer.contents[0] === content) {
        score = problem.score;
      }
    } else if (problem_type.type === 'gradeSenseUsingChatGPT') {
      try {
        score = await gradeSenseUsingChatGPT(content, problem, answer);
      } catch (error) {
        // chat gpt による採点がうまくいかなかった場合はエラーを返します
        res.status(500).json({ error: error });
      }
    } else if (problem_type.type === 'gradedMultipleCaseUsingChatGPT') {
      try {
        score = await gradedMultipleCaseUsingChatGPT(content, system_prompt, problem, answer);
      } catch (error) {
        // chat gpt による採点がうまくいかなかった場合はエラーを返します
        res.status(500).json({ error: error });
      }
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

const gradeSenseUsingChatGPT = async (submission: string, problem: any, answer: any): Promise<number> => {
  const scores: number[] = [];
  for (const chat_gpt_roles of answer.chat_gpt_roles) {
    const chatGPTResponse = await ChatGPT.create(
      chatGPTModel,
      [
        new ChatGPTMessage(
          'user',
          `# Role
          ${chat_gpt_roles}
          
          # Scoring Criteria
          ${answer.scoring_criteria}
          
          # Output Format
          {
          "reason":  string (in Japanese),
          "score" : number (0-${problem.score})
          }
          
          # Problem statement
          ${problem.content}
          
          # User Response
          ${submission}`
        ),
      ]
    );
    console.log('ChatGPT からのレスポンスです');
    console.log(chatGPTResponse);
    if (!chatGPTResponse) throw new Error('ChatGPTResponse is undefined');
    try {
      const score = extractScoreFromJSON(chatGPTResponse?.utterances[0].content);
      scores.push(score.score);
    } catch (error) {
      // chat gpt のレスポンスから score を抽出できなかった場合は continue します
      console.error(error);
      continue;
    }
  }
  // chat gpt のレスポンスから1つも score を抽出できなかった場合はエラーを投げます
  if (scores.length === 0) {
    throw new Error('No scores were extracted from ChatGPTResponse');
  }
  const averageScore = scores.reduce((a, b) => a + b) / scores.length;
  return Math.round(averageScore);
}

const gradedMultipleCaseUsingChatGPT = async (submission: string, system_prompt: any, problem: any, answer: any): Promise<number> => {
  const scores: number[] = [];
  for (let i = 0; i < answer.inputs.length; i++) {
    const input =  answer.inputs[i];
    let content: any;
    try {
      content = JSON.parse(answer.contents[i]);
    } catch (error) {
      throw new Error(`${answer.contents[i]} is not a valid JSON`);
    }
    const chatGPTResponse = await ChatGPT.create(
      chatGPTModel,
      [
        new ChatGPTMessage('system', system_prompt),
        new ChatGPTMessage('user', submission),
        new ChatGPTMessage('user', input),
      ]
    );
    console.log('ChatGPT からのレスポンスです');
    console.log(chatGPTResponse);
    if (!chatGPTResponse) throw new Error('ChatGPTResponse is undefined');
    try {
      const output = JSON.parse(chatGPTResponse.utterances[0].content);
      if (JSON.stringify(output) === JSON.stringify(content)) {
        console.log('正解です')
        scores.push(problem.score);
      } else {
        console.log('不正解です')
        scores.push(0);
      }      
    } catch (error) {
      // chat gpt のレスポンスから score を抽出できなかった場合は continue します
      console.error(error);
      continue;
    }
  }
  // score を足し合わせて返します
  if (!(scores.length === 0)) {
    return scores.reduce((a, b) => a + b);
  }
  else {
    throw new Error('score を1つも取得できませんでした');
  }
}

/**
 * json 文字列から score を抽出します。
 * @param jsonString 
 * @returns Score
 */
const extractScoreFromJSON = (jsonString: string): Score => {
  const regex = /{(?:[^{}]|{[^{}]*})*}/g;
  const matches = jsonString.match(regex);

  if (!matches) {
    throw new Error("No JSON object found in the jsonString string.");
  }

  if (matches.length > 1) {
    throw new Error("jsonString string contains more than one JSON object.");
  }

  try {
    const json = JSON.parse(matches[0]);
    if ('score' in json && typeof json.score === 'number') {
      return json as Score;
    } else {
      throw new Error("JSON object is not of type Score.");
    }
  } catch (error) {
    throw new Error(`Invalid JSON: ${matches[0]}`);
  }
}

export default handler;
