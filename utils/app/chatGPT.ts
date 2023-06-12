import GPT3Tokenizer from "gpt3-tokenizer";
import { ChatGPT, Temperature } from '@/lib/chatGPT';
import { Message } from "@/types/chat";


const TOKEN_LIMIT = 4096;

type Score = {
  score: number;
};

export const gradeSenseUsingChatGPT = async (
  problem: any,
  answer: any,
  temperature: Temperature,
  systemPrompt: string,
  messages: Message[]
): Promise<number> => {
  // ユーザの最後のメッセージを取得します
  const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop();
  if (!lastUserMessage) {
    throw new Error('User message not found');
  }
  const scores: number[] = [];
  for (const chat_gpt_role of answer.chat_gpt_roles) {
    const messagesToSend = await trimHistory(
      [
        {role: 'system', content: systemPrompt},
        {
          role: 'user',
          content: `# Role
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
          ${lastUserMessage.content}`
        }
      ],
      TOKEN_LIMIT
    );
    const chatGPTResponse = await ChatGPT.create(
      answer?.model || 'gpt-4',  // answers.json で指定されているモデルを読み込みます
      messagesToSend,
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
  problem: any,
  answer: any,
  temperature: Temperature,
  systemPrompt: string,
  messages: Message[]
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
    const messagesToSend = await trimHistory(
      [
        {role: 'system', content: systemPrompt},
        ...messages,
        {
          "role": "user",
          "content": input
        },
      ],
      TOKEN_LIMIT
    );
    const chatGPTResponse = await ChatGPT.create(
      answer?.model || 'gpt-4',  // answers.json で指定されているモデルを読み込みます
      messagesToSend,
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

// 会話履歴の配列をトリミングする関数
export const trimHistory = async (messages: Message[], tokenLimit: number): Promise<Message[]> => {
  let tokenCount = 0;
    let messagesToSend: any[] = [];

    // 最初のメッセージがsysmtem promptの場合は必ず含める
    let firstMessage = null;
    if (messages.length > 0 && messages[0]["role"] === "system") {
        firstMessage = messages[0];
        tokenCount = await getTokenCount(messages[0]["content"]) + 4; // 4はChatGPTが勝手に付与するトークン
    }

    let endIndex = 0;
    if (firstMessage) {
        endIndex = 1; // 最初のメッセージは既に処理されているので、ループの開始位置を1つ前にする
    }
    for (let i = messages.length - 1; i >= endIndex; i--) {
        const message = messages[i];
        const tokenLength = await getTokenCount(message["content"]) + 4 // 4はChatGPTが勝手に付与するトークン
        console.log("tokenLength", tokenLength)
        if (tokenCount + tokenLength > tokenLimit) {
            break;
        }
        console.log("tokenCount", tokenCount)
        tokenCount += tokenLength;
        messagesToSend = [message, ...messagesToSend];
    }

    if (firstMessage) {
        messagesToSend = [firstMessage, ...messagesToSend];
    }

    return messagesToSend;
}

export const getTokenCount = async (inputText: string): Promise<number> => {
  const tokenizer = new GPT3Tokenizer({ type: "gpt3" }) // or 'codex'
  const encoded: { bpe: number[]; text: string[] } = tokenizer.encode(inputText)
  return encoded.bpe.length
}
