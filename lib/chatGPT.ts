import axios, { AxiosError } from 'axios';
import { Configuration, OpenAIApi } from 'openai';
import { Message } from '@/types/chat'

export class Temperature {
  private value: number;

  constructor(_value: number) {
    if (_value < 0 || _value > 2) {
      throw new Error("Temperature must be between 0 and 2");
    }

    this.value = _value;
  }

  getValue(): number {
    return this.value;
  }

  setValue(value: number): void {
    if (value < 0 || value > 2) {
      throw new Error("Temperature must be between 0 and 2");
    }

    this.value = value;
  }
}

// Role型を enum 形式で定義
const ROLE = {
  USER: 'user',
  SYSTEM: 'system',
  ASSISTANT: 'assistant',
} as const;
export type Role = (typeof ROLE)[keyof typeof ROLE];

// Role型を enum 形式で定義
const MODEL = {
  gpt3_5: 'gpt-3.5-turbo',
  gpt4: 'gpt-4',
} as const;
export type MODEL = (typeof MODEL)[keyof typeof MODEL];

/**
 * ChatGPT APIのレスポンスデータの整形に使用。
 * このシステムの内部でデータを扱いやすいようにいろいろと変換しています。
 */
export class Utterance {
  public content: string;
  public role: Role;
  public isFinishedByStop: boolean;
  public index: number;

  constructor(
    _content: string,
    _role: Role,
    _isFinishedByStop: boolean,
    _index: number,
  ) {
    this.content = _content;
    this.role = _role;
    this.isFinishedByStop = _isFinishedByStop;
    this.index = _index;
  }

  /**
   * ChatGPT APIのレスポンスデータのマッピングに使用。
   * @param response
   * @returns Utterance
   */
  public static fromChatGPTResponse(response: any): Utterance {
    const content = response.message.content;
    const role: Role = response.message.role;
    const isFinishedByStop = response.finish_reason === 'stop';
    const index = Number(response.index);
    return new Utterance(content, role, isFinishedByStop, index);
  }
}

/**
 * ChatGPT APIのレスポンスデータの整形に使用。
 * 特にUsageクレームのマッピングに使用。
 */
export class Usage {
  completionTokens: number;
  promptTokens: number;
  totalTokens: number;

  constructor(
    _completionTokens: number,
    _promptTokens: number,
    _totalTokens: number,
  ) {
    this.completionTokens = _completionTokens;
    this.promptTokens = _promptTokens;
    this.totalTokens = _totalTokens;
  }

  /**
   * ChatGPT APIのレスポンスデータのマッピングに使用。
   * @param response
   * @returns Usage
   */
  public static fromChatGPTResponse(response: any): Usage {
    const completionTokens = response.completion_tokens;
    const promptTokens = response.prompt_tokens;
    const totalTokens = response.total_tokens;
    return new Usage(completionTokens, promptTokens, totalTokens);
  }
}

/**
 * ChatGPT APIのレスポンスデータを格納するクラスです。
 */
export class ChatGPTResponse {
  public utterances: Utterance[];
  public created: number;
  public id: string; // リクエストごとにふられる識別子みたいなものです
  public model: string; //
  public object: string;
  public usage: Usage;

  constructor(
    _utterances: Utterance[],
    _created: number,
    _id: string,
    _model: string,
    _object: string,
    _usage: Usage,
  ) {
    this.utterances = _utterances;
    this.created = _created;
    this.id = _id;
    this.model = _model;
    this.object = _object;
    this.usage = _usage;
  }

  /**
   * ChatGPT APIのレスポンスデータをクラス変数に格納する関数です。
   * @param response
   * @returns ChatGPTResponse
   */
  public static fromChatGPTResponse(response: any): ChatGPTResponse {
    const utterances = response.choices.map((choice: any) =>
      Utterance.fromChatGPTResponse(choice),
    );
    const created = response.created;
    const id = response.id;
    const model = response.model;
    const object = response.object;
    const usage = Usage.fromChatGPTResponse(response.usage);
    return new ChatGPTResponse(utterances, created, id, model, object, usage);
  }
}

/**
 * ChatGPT APIを呼び出すためのクラスです。
 * 参考: https://platform.openai.com/docs/quickstart/build-your-application
 */
export class ChatGPT {
  /**
   * ChatGPT APIを呼び出す関数です。
   * @param messages
   * @param timeout
   */
  public static async create(
    model: MODEL,
    messages: Message[],
    temperature?: Temperature,
    timeout?: number,
  ): Promise<ChatGPTResponse | undefined> {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
      basePath: 'https://oai.langcore.org/v1',
    });
    const openai = new OpenAIApi(configuration);
    let completion: any;
    try {
      completion = await openai.createChatCompletion(
        {
          model: model,
          messages: messages,
          temperature: temperature?.getValue(),
        },
        {
          timeout,
        },
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.code === 'ECONNABORTED') {
          console.error('ChatGPT APIの呼び出しがタイムアウトしました。');
          return undefined;
        }
      }
      throw error;
    }
    return ChatGPTResponse.fromChatGPTResponse(completion.data);
  }
}
