import { ChatGPT, ChatGPTMessage, Temperature } from '@/lib/chatGPT';


type Score = {
  score: number;
};

export const gradeSenseUsingChatGPT = async (
  submission: string,
  problem: any,
  answer: any,
  temperature: Temperature
): Promise<number> => {
  const scores: number[] = [];
  for (const chat_gpt_role of answer.chat_gpt_roles) {
    const chatGPTResponse = await ChatGPT.create(
      answer?.model || 'gpt-4',  // answers.json で指定されているモデルを読み込みます
      [
        new ChatGPTMessage(
          'user',
          `# Role
          ${chat_gpt_role}
          
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
          ${submission}`,
        ),
      ],
      temperature
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
};

export const gradedMultipleCaseUsingChatGPT = async (
  submission: string,
  system_prompt: any,
  problem: any,
  answer: any,
  temperature: Temperature
): Promise<number> => {
  const scores: number[] = [];
  for (let i = 0; i < answer.inputs.length; i++) {
    const input = answer.inputs[i];
    let content: any;
    try {
      content = JSON.parse(answer.contents[i]);
    } catch (error) {
      throw new Error(`${answer.contents[i]} is not a valid JSON`);
    }
    const chatGPTResponse = await ChatGPT.create(
      answer?.model || 'gpt-4',  // answers.json で指定されているモデルを読み込みます
      [
        new ChatGPTMessage('system', system_prompt),
        new ChatGPTMessage('user', submission),
        new ChatGPTMessage('user', input),
      ],
      temperature
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
