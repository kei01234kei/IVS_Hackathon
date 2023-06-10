import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next'

import { ChatGPT, ChatGPTMessage } from '@/lib/chatGPT';


type Score = {
  score: number;
}

// 現時点では chat gpt のモデルは gpt-3.5-turbo のみを使用します
const chatGPTModel = 'gpt-3.5-turbo';

const systemPrompt = `
    Given a document from a user, try to extract the following metadata:
    - score: number

    Respond with a JSON containing the extracted metadata in key value pairs.
    `;

const filePaths = {
  submissions: path.join(process.cwd(), 'data', 'submissions.json'),
  answers: path.join(process.cwd(), 'data', 'answers.json'),
  problems: path.join(process.cwd(), 'data', 'problems.json'),
  problem_types: path.join(process.cwd(), 'data', 'problem_types.json'),
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
      try {
        score = await gradeUsingChatGPT(content, problem, answer);
      } catch (error) {
        // chat gpt による採点がうまくいかなかった場合はエラーを返します
        res.status(500).json({ error: error });
      }
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

const gradeUsingChatGPT = async (submission: string, problem: any, answer: any): Promise<number> => {
  const scores: number[] = [];
  for (const chat_gpt_grade_prompt of answer.chat_gpt_grade_prompts) {
    const ChatGPTResponse = await ChatGPT.create(
      chatGPTModel,
      [
        new ChatGPTMessage(
          'user',
          `# Role
          ${chat_gpt_grade_prompt}
          
          # Scoring Criteria
          1. Relevance to the Prompt: This measures how well the submitted content relates and adapts to the given prompt.
          2. Creativity: This evaluates how original and creative the submitted content is.
          3. Essence of Humor: This assesses how effectively the submitted content uses universal humorous elements.
          
          # Output Format
          {
          "reason":  string (in Japanese),
          "score" : number (0-${problem.score})
          }
          
          # Prompt
          ${problem.content}
          
          # User Response
          ${submission}`
        ),
      ]
    );
    console.log('ChatGPT からのレスポンスです');
    console.log(ChatGPTResponse);
    if (!ChatGPTResponse) throw new Error('ChatGPTResponse is undefined');
    try {
      const score = extractScoreFromJSON(ChatGPTResponse?.utterances[0].content);
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
