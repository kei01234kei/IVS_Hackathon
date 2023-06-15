import { Message } from '@/types/chat';

import { ChatGPT, ChatGPTResponse, MODEL, Temperature } from '@/lib/chatGPT';
import _ from 'lodash';

type Score = {
  score: number;
  reason: string;
};

type Grade = {
  score: number;
  reason: string;
};

export const gradeSenseUsingChatGPT = async (
  problem: any,
  answer: any,
  temperature: Temperature,
  systemPrompt: string,
  messages: Message[],
): Promise<Grade> => {
  // ユーザの最後のメッセージを取得します
  const lastUserMessage = messages
    .filter((m: any) => m.role === 'assistant')
    .pop();
  if (!lastUserMessage) {
    throw new Error('User message not found');
  }
  let averageScore: number = 0;
  let counter: number = 0;
  let reason: string | null = null;
  for (const chat_gpt_role of answer.chat_gpt_roles) {
    const score = await getSenseScore(
      problem,
      answer,
      systemPrompt,
      chat_gpt_role,
      lastUserMessage,
      temperature,
    );
    // 逐次平均
    averageScore = averageScore + (score.score - averageScore) / ++counter;
    if (!reason) {
      reason = score.reason;
    }
  }
  // chat gpt のレスポンスから1つも reason を抽出できなかった場合かつscoreが0の場合ははエラーを投げます
  if (!reason && averageScore == 0) {
    throw new Error('No scores were extracted from ChatGPTResponse');
  }

  return {
    score: averageScore,
    reason: reason || '',
  };
};

async function getSenseScore(
  problem: any,
  answer: any,
  systemPrompt: string,
  chat_gpt_role: string,
  lastUserMessage: any,
  temperature: Temperature,
): Promise<Score> {
  let chatGPTResponse: ChatGPTResponse | undefined;
  try {
    const model: MODEL = answer?.model || 'gpt-3.5-turbo-0613';
    chatGPTResponse = await senseChatGPT(
      model,
      systemPrompt,
      chat_gpt_role,
      answer.scoring_criteria,
      problem.score,
      problem.content,
      lastUserMessage.content,
      temperature,
    );
  } catch (error: any) {
    console.error(error.message);
    return {
      score: 0,
      reason: 'error',
    };
  }
  console.log('ChatGPT からのレスポンスです');
  console.log(chatGPTResponse);
  try {
    const score = extractScoreFromJSON(chatGPTResponse?.utterances[0].content);
    return score;
  } catch (error) {
    // chat gpt のレスポンスから score を抽出できなかった場合は continue します
    console.error(error);
    return {
      score: 0,
      reason: 'error',
    };
  }
}

async function senseChatGPT(
  model: MODEL,
  systemPrompt: string,
  chat_gpt_role: string,
  scoring_criteria: string,
  problem_score: string,
  content: string,
  lastUserMessage_content: string,
  temperature: Temperature,
): Promise<ChatGPTResponse> {
  let chatGPTResponse: ChatGPTResponse | undefined;
  chatGPTResponse = await ChatGPT.create(
    model,
    systemPrompt,
    [
      {
        role: 'user',
        content: `# Role
        ${chat_gpt_role}
        
        # Scoring Criteria
        ${scoring_criteria}
        
        # Output Format
        {
        "reason":  string (in Japanese),
        "score" : number (0-${problem_score})
        }
        
        # Problem statement
        ${content}
        
        # User Response
        ${lastUserMessage_content}`,
      },
    ],
    temperature,
  );
  if (!chatGPTResponse) throw new Error('ChatGPTResponse is undefined');
  return chatGPTResponse;
}

async function emulateChatGPT(
  model: MODEL,
  systemPrompt: string,
  messages: Message[],
  input: string,
  temperature: Temperature,
): Promise<ChatGPTResponse> {
  let chatGPTResponse: ChatGPTResponse | undefined;
  chatGPTResponse = await ChatGPT.create(
    model,
    systemPrompt,
    [
      ...messages,
      {
        role: 'user',
        content: input,
      },
    ],
    temperature,
  );
  if (!chatGPTResponse) throw new Error('ChatGPTResponse is undefined');
  return chatGPTResponse;
}

async function testPrompt(
  model: MODEL,
  input: any,
  correctAnswer: any,
  system_prompt: string,
  messages: Message[],
  temperature: Temperature,
): Promise<{
  success: boolean;
  correctAnswer: any;
  res: ChatGPTResponse | undefined;
}> {
  let result = {
    correctAnswer,
    success: false,
    res: undefined as ChatGPTResponse | undefined,
  };
  try {
    result.res = await emulateChatGPT(
      model,
      system_prompt,
      messages,
      input,
      temperature,
    );
    correctAnswer = JSON.parse(correctAnswer);
    const output = JSON.parse(result.res.utterances[0].content);
    console.log('ChatGPT からのレスポンスです');
    console.log(result.res);
    if (_.isEqual(output, correctAnswer)) {
      console.log('正解です');
      result.success = true;
    } else {
      console.log('不正解です');
    }
  } catch (error: any) {
    console.error(error.message);
  } finally {
    return result;
  }
}

export const gradedMultipleCaseUsingChatGPT = async (
  problem: any,
  answer: any,
  temperature: Temperature,
  systemPrompt: string,
  messages: Message[],
): Promise<Grade> => {
  let score: number = 0;
  const model: MODEL = answer?.model || 'gpt-3.5-turbo-0613';
  const promises = [];
  for (let i = 0; i < answer.inputs.length; i++) {
    const correctAnswer = answer.contents[i];
    promises.push(
      testPrompt(
        model,
        answer.inputs[i],
        correctAnswer,
        systemPrompt,
        messages,
        temperature,
      ),
    );
  }
  const results = await Promise.all(promises);
  let promiseReason: Promise<string> | null = null;
  results.forEach((result) => {
    if (result.success) {
      // score を足し合わせて
      score += problem.score;
    } else if (!promiseReason) {
      if (result.res) {
        promiseReason = MakeWrongReasonCompared(
          result.res.utterances[0].content,
          result.correctAnswer,
        );
      }
    }
  });

  return {
    score,
    reason: (await promiseReason) || 'error',
  };
};

/**
 * json 文字列から score を抽出します。
 * @param jsonString
 * @returns Score
 */
const extractScoreFromJSON = (jsonString: string): Score => {
  const regex = /{(?:[^{}]|{[^{}]*})*}/g;
  const matches = jsonString.match(regex);

  if (!matches) {
    throw new Error('No JSON object found in the jsonString string.');
  }

  if (matches.length > 1) {
    throw new Error('jsonString string contains more than one JSON object.');
  }

  try {
    const json = JSON.parse(matches[0]);
    if ('score' in json && typeof json.score === 'number') {
      return json as Score;
    } else {
      throw new Error('JSON object is not of type Score.');
    }
  } catch (error) {
    throw new Error(`Invalid JSON: ${matches[0]}`);
  }
};

export const MakeWrongReasonCompared = async (
  userAnswer: string,
  correct: string,
): Promise<string> => {
  const temperature = new Temperature(0);
  console.log('userAnswer', userAnswer);
  console.log('correct', correct);
  try {
    const chatGPTResponse = await ChatGPT.create(
      'gpt-3.5-turbo-0613', // answers.json で指定されているモデルを読み込みます
      // answer?.model || 'gpt-3.5-turbo-0613',  // answers.json で指定されているモデルを読み込みます
      // systemPrompt,
      `
            You are the one who checks the strings.
            Please check if the strings match, and if they are wrong, tell us why!

            # Output Format
            {
            "reason":  string (in Japanese),
            }

            # example 1
            ## user input text
            hello john
            ## correct text
            hello smith
            ## response
            {
              "reason": "名前が違います"
            }

            # example 2
            ## user input text
            {
              "name": "john",
              "age": 20
            }
            ## correct text
            {
              "name": "john",
              "age": 23
            }
            ## response
            {
              "reason": "年齢が違います"
            }

            # example 3
            ## user input text
            {
              "name": "john",
              "type": 1
            }
            ## correct text
            {
              "name": "john",
              "age": 23
            }
            ## response
            {
              "reason": "フィールド名が違います"
            }
            # example 4
            ## user input text
            hello json
            ## correct text
            {
              "name": "john",
              "age": 23
            }
            ## response
            {
              "reason": "フォーマットが違います"
            }
        `,
      [
        {
          role: 'user',
          content: `
            # user input string
            ${userAnswer}
            
            # correct string
            ${correct}
            `,
        },
      ],
      temperature,
    );
    console.log('chatGPTResponse');
    console.log(chatGPTResponse);
    if (!chatGPTResponse) throw new Error('ChatGPTResponse is undefined');
    console.log(JSON.parse(chatGPTResponse?.utterances[0].content));
    return JSON.parse(chatGPTResponse?.utterances[0].content);
  } catch (error: any) {
    console.error(error.message);
    return error.message;
  }
};
