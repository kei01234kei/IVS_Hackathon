import {
  CreateParticipantRequest,
  UpdateParticipantRequest,
} from '../types/participant';
import { GetProblemResponse } from '../types/problem';
import { Conversation } from '@/types/chat';
import {
  CreateCompetitionsRequest,
  UpdateCompetitionsRequest,
} from '@/types/competition';
import { CreateProblemRequest, UpdateProblemRequest } from '@/types/problem';
import {
  CreateSubmissionRequest,
  EvaluationRequest,
  EvaluationResponse,
} from '@/types/submission';

import {
  GetTipsRequest,
  GetTipsResponse,
} from '@/types/tips';

import { AbstractRepository } from '@/repository/abstractRepository';

let evaluateScore = 0;
export const problem1:GetProblemResponse = {
  competition_id: 1,
  id: 1,
  problem_number: 1,
  name: '算数の問題',
  level: 1,
  score: 4,
  totalScore: 4,
  problem_type_id: 1,
  content:
    'A君が16日、B君が20日で終わらせられる仕事がある。この仕事を2人で行ったとき、終わるのは何日後？',
  input_example: '入力例',
  output_example: '整数のみ (小数の場合は繰り上げ)',
  next_problem_id: 2,
  prev_problem_id: null,
  example: null, 
};

export const problem2:GetProblemResponse = {
  competition_id: 1,
  id: 2,
  problem_number: 2,
  name: '問題名',
  level: 2,
  score: 6,
  totalScore: 6,
  problem_type_id: 2,
  content: '問題内容',
  input_example: '⼊⼒例',
  output_example: '出⼒例',
  next_problem_id: 3,
  prev_problem_id: 1,
  example: null, 
};

export const problem3:GetProblemResponse = {
  competition_id: 1,
  id: 3,
  problem_number: 3,
  name: '問題名',
  level: 1,
  score: 10,
  totalScore: 10,
  problem_type_id: 3,
  content: '問題内容',
  input_example: '⼊⼒例',
  output_example: '出⼒例',
  next_problem_id: null,
  prev_problem_id: 2,
  example: null, 
};

const futureTime = new Date('2023-06-20T12:00:00+09:00').toISOString();
const pastTime = new Date('2023-06-10T12:00:00+09:00').toISOString();

export const dummyConversation: Conversation = {
  id: 'dummy1',
  name: 'Dummy conversation',
  messages: [
    {
      role: 'user',
      content: 'こんにちは、ChatGPT。今日の天気はどうですか？',
    },
    {
      role: 'assistant',
      content:
        'こんにちは、ユーザーさん。私はAIなので、天気情報を直接知ることはできません。しかし、インターネットを通じて最新の天気情報を取得することが可能です。',
    },
    {
      role: 'user',
      content: 'それは面白いですね。では、最新のニュースを教えてください。',
    },
    {
      role: 'assistant',
      content:
        'すみません、私はリアルタイムのインターネットアクセス能力を持っていません。そのため、最新のニュースを提供することはできません。ただし、あなたが特定のトピックについて情報を求めるなら、私が知っている範囲で答えることができます。',
    },
  ],
  model: {
    id: '1',
    name: 'Default (GPT-3.5)',
    maxLength: 128,
    tokenLimit: 128,
  },
  prompt: 'これはプロンプトのサンプルです',
  temperature: 0.5,
  folderId: null,
};

export const tips1:GetTipsResponse = {
    content:
`この例では、カスタマイズしたプロンプトとメッセージを使用して、Chatbot APIに入力されたテキストをそのまま返すエコーサーバーとして機能させることができました。
このテクニックを応用することで、さまざまな機能を持つChatbotを作成することができます。
`,
    examples:[
    {
      "title": "ユーザーの入力を繰り返す",
      "content": 
`ユーザーの入力を繰り返す:
システムプロンプト: you are Parrot.you echo text
メッセージ: こんにちは、元気ですか？
出力: こんにちは、元気ですか？
`
    },
    {
      "title": "ユーザーの入力を反転させる",
      "content": 
`システムプロンプト: あなたは反転テキストマシンです
メッセージ: おはようございます
出力: すまいざごようはお
`
    },
    {
      "title": "ユーザーの入力をシャッフルする",
      "content": 
`システムプロンプト: あなたはテキストシャッフルマシンです
メッセージ: これはテストです
出力: トステこですはれ (出力はシャッフルされるため、毎回異なる結果が得られます)
`
    }
  ]
};

export const tips2:GetTipsResponse = {
    content:
`この例では、カスタマイズしたプロンプトとメッセージを使用して、Chatbot APIに計算を実行させることができました。
このテクニックを応用することで、さまざまな機能を持つChatbotを作成することができます。`,
    examples:[
    {
      "title": "数学的な問題を解決する",
      "content": "システムプロンプト: あなたは数学の先生です\nメッセージ: √16\n出力: 4"
    },
    {
      "title": "単語の意味を説明する",
      "content": `システムプロンプト: あなたは辞書です
メッセージ: 自由の意味は？
出力: 自由とは、制約や束縛から解放され、自分の意志で行動できる状態を指します。
`
    },
    {
      "title": "簡単な質問に答える:",
      "content": `カスタマイズプロンプト: あなたは一般知識の達人です
メッセージ: 日本の首都はどこですか？
出力: 日本の首都は東京です
`
    }
  ]
};
export const tips3:GetTipsResponse = {
    content:
`この例では、システムプロンプトに指定された問題を解決し、ユーザーが求める形式で答えを提供するようにChatbot APIを誘導しています。`,
    examples:[
    {
      "title": "数学的な問題を解決し、答えだけを提供する",
      "content": 
`システムプロンプト: "A君が16日、B君が20日で終わらせられる仕事がある。この仕事を2人で行ったとき、終わるのは何日後？答えだけを提供してください。"
メッセージ: ありがとうございます。計算過程も教えてください。
出力: 9日
`
    },
    {
      "title": "質問に答え、答えだけを提供する",
      "content": 
`システムプロンプト: "日本の首都はどこですか？答えだけを提供してください。"
メッセージ: ありがとうございます。他の国の首都も教えてください。
出力: 東京
`
    },
    {
      "title": "単語の意味を説明し、答えだけを提供する",
      "content": 
`システムプロンプト: "自由の意味は何ですか？答えだけを提供してください。"
メッセージ: ありがとうございます。他の単語の意味も教えてください。
出力: 制約や束縛から解放され、自分の意志で行動できる状態
`
    }
  ]
};
export const tips4:GetTipsResponse = {
    content:
`この例では、システムプロンプトに指定された要求に従って、ユーザーからのドキュメントからメタデータを抽出し、JSON形式で返すようにChatbot APIを誘導しています。`,
    examples:[
    {
      "title": "ドキュメントから特定の情報を抽出し、JSON形式で返す",
      "content": 
`システムプロンプト: "ユーザーからのドキュメントを受け取り、次のメタデータを抽出してください: - 会社名: 文字列またはnull - 住所: 文字列またはnull。抽出されたメタデータをキー・バリューペアのJSONで返してください。メタデータフィールドが見つからない場合は、指定しないでください。レスポンスとしてJSONのみが受け入れられます。"
メッセージ: "株式会社ABC、東京都渋谷区1-2-3"
出力: {"会社名": "株式会社ABC", "住所": "東京都渋谷区1-2-3"}
`
    },
    {
      "title": "ドキュメントから複数の情報を抽出し、JSON形式で返す",
      "content": 
`システムプロンプト: "日本の首都はどこですか？答えだけを提供してください。"
メッセージ: ありがとうございます。他の国の首都も教えてください。
出力: 東京
`
    },
    {
      "title": "単語の意味を説明し、答えだけを提供する",
      "content": 
`システムプロンプト: "ユーザーからのドキュメントを受け取り、次のメタデータを抽出してください: - 商品名: 文字列またはnull - 価格: 数値またはnull。抽出されたメタデータをキー・バリューペアのJSONで返してください。メタデータフィールドが見つからない場合は、指定しないでください。レスポンスとしてJSONのみが受け入れられます。"
メッセージ: "商品名：スマートフォン、価格：50000円"
出力: {"商品名": "スマートフォン", "価格": 50000}
`
    }
  ]
};

export const tips5:GetTipsResponse = {
    content:
`この例では、 カスタマイズしたプロンプトを使用して、ユーザーが特定の目的や制約に基づいてクリエイティブなアイデアを生成するのを助けることができます。
例えば、新しい商品名や広告キャンペーンのアイデアを考える際に、指定された要素やワードを使って提案を作成することができます。
`,
    examples:[
    {
      "title": "商品名のアイデア生成",
      "content": 
`システムプロンプト:
あなたは、新しいスマートフォンアクセサリーの商品名を考えるAIです。このアクセサリーは、スマートフォンを充電しながら同時にスタンドとして使用できるものです。以下の要素を考慮して、5つの商品名のアイデアを提案してください。

1. スマートフォン充電機能
2. スタンド機能
3. 便利さ
4. シンプルなデザイン
5. ユニバーサルな互換性

メッセージ: 
ステップ1: 上記の要素を考慮して、5つのキーワードを生成してください。
ステップ2: 生成されたキーワードを使用して、5つの商品名のアイデアを提案してください。

出力:
ChargeStand - 充電とスタンドの機能を兼ね備えた製品
PowerLounge - スマートフォンを充電しながらリラックスできるスペース
UniChargeDock - どんなスマートフォンにも対応する充電スタンド
SimpleChargeStand - シンプルなデザインの充電スタンド
FlexiCharger - 柔軟な充電とスタンド機能を持つアクセサリー力:
`
    },
  ]
};



export class MemoryRepository extends AbstractRepository {
  createUser(userName: string) {
    return Promise.resolve({
      id: 1,
      username: userName,
    });
  }
  updateUser(userId: number, userName: string) {
    return Promise.resolve({
      id: userId,
      username: userName,
    });
  }
  getUser(userId: number) {
    return Promise.resolve({
      id: userId,
      username: 'aaaa',
    });
  }
  deleteUser(userId: number) {
    return Promise.resolve({
      code: 0,
    });
  }

  getCompetitions() {
    return Promise.resolve({
      competitions: [
        {
          id: 1,
          name: 'コンペティションいち',
          description: 'コンペティションいち説明',
          start_date: pastTime,
          end_date: futureTime,
        },
        {
          id: 2,
          name: 'コンペティションに名',
          description: 'コンペティション２説明',
          start_date: pastTime,
          end_date: futureTime,
        },
      ],
    });
  }
  getCompetition(competitionId: number) {
    return Promise.resolve({
      id: competitionId,
      name: 'コンペティションいち',
      description: 'コンペティションいち説明',
      start_date: pastTime,
      end_date: futureTime,
    });
  }
  createCompetition(createCompetitionsRequest: CreateCompetitionsRequest) {
    return Promise.resolve({
      id: 1,
      name: createCompetitionsRequest.name,
      description: createCompetitionsRequest.description,
      start_date: createCompetitionsRequest.start_date,
      end_date: createCompetitionsRequest.end_date,
    });
  }
  updateCompetition(UpdateCompetitionsRequest: UpdateCompetitionsRequest) {
    return Promise.resolve({
      id: UpdateCompetitionsRequest.id,
      name: UpdateCompetitionsRequest.name,
      description: UpdateCompetitionsRequest.description,
      start_date: UpdateCompetitionsRequest.start_date,
      end_date: UpdateCompetitionsRequest.end_date,
    });
  }
  deleteCompetition(competitionId: number) {
    return Promise.resolve({
      code: 0,
    });
  }
  completeCompetition(competitionId: number) {
    return Promise.resolve({
      code: 0,
    });
  }

  getProblems(competitionId: number) {
    return Promise.resolve({
      problems: [problem1, problem2, problem3],
    });
  }
  getProblem(competitionId: number, problemId: number) {
    return new Promise<GetProblemResponse>((resolve) => {
      if (problem1.id === problemId) {
        resolve(problem1);
      } else if (problem2.id === problemId) {
        resolve(problem2);
      } else if (problem3.id === problemId) {
        resolve(problem3);
      } else {
        resolve(problem1);
      }
    });
  }
  createProblem(createProblemRequest: CreateProblemRequest) {
    return Promise.resolve({
      id: 1,
      competition_id: createProblemRequest.competition_id,
      problem_number: 1,
      name: createProblemRequest.name,
      level: createProblemRequest.level,
      score: createProblemRequest.score,
      totalScore: createProblemRequest.totalScore,
      problem_type_id: createProblemRequest.totalScore,
      content: createProblemRequest.content,
      input_example: createProblemRequest.input_example,
      output_example: createProblemRequest.output_example,
    });
  }
  updateProblem(updateProblemRequest: UpdateProblemRequest) {
    return Promise.resolve({
      id: updateProblemRequest.id,
      competition_id: updateProblemRequest.competition_id,
      problem_number: updateProblemRequest.problem_number,
      name: updateProblemRequest.name,
      level: updateProblemRequest.level,
      score: updateProblemRequest.score,
      totalScore: updateProblemRequest.totalScore,
      problem_type_id: updateProblemRequest.totalScore,
      content: updateProblemRequest.content,
      input_example: updateProblemRequest.input_example,
      output_example: updateProblemRequest.output_example,
    });
  }
  deleteProblem(competitionId: number, problemId: number) {
    return Promise.resolve({
      code: 0,
    });
  }

  getSubmissions() {
    return Promise.resolve({
      submissions: [
        {
          id: 1,
          user_id: 1,
          problem_id: 1,
          content: dummyConversation,
          score: 10,
          submitted_at: '2020-01-01 00:00:00',
        },
        {
          id: 1,
          user_id: 2,
          problem_id: 1,
          content: dummyConversation,
          score: 9,
          submitted_at: '2020-01-02 00:00:00',
        },
      ],
    });
  }
  getSubmission(competitionId: number, submissionId: number) {
    return Promise.resolve({
      id: 1,
      user_id: 1,
      problem_id: 1,
      content: dummyConversation,
      score: 10,
      submitted_at: '2020-01-01 00:00:00',
    });
  }
  createSubmission(createSubmissionRequest: CreateSubmissionRequest) {
    return Promise.resolve({
      id: 1,
      user_id: createSubmissionRequest.user_id,
      problem_id: createSubmissionRequest.problem_id,
      problem_type_id: 1,
      content: createSubmissionRequest.content,
      score: 10,
      submitted_at: '2020-01-01 00:00:00',
    });
  }

  evaluate(evaluationRequest: EvaluationRequest) {
    return new Promise<EvaluationResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          user_id: evaluationRequest.user_id,
          competition_id: evaluationRequest.competition_id,
          message: dummyConversation,
          problem_id: evaluationRequest.problem_id,
          reason: '正解',
          score: evaluateScore++,
          submitted_at: new Date().toISOString(),
        });
      }, 500);
    });
  }

  submit(
    competitionId: number,
    problemId: number,
    promptHistory: Conversation,
  ) {
    return Promise.resolve({
      id: 1,
      user_id: 1,
      problem_id: problemId,
      problem_type_id: 1,
      content: promptHistory,
      score: 5,
      submitted_at: new Date().toISOString(),
    });
  }

  getParticipants(competitionId: number) {
    return Promise.resolve({
      participants: [
        {
          id: 1,
          username: 'いち',
          competition_id: 1,
          score: 10,
          registered_at: '2015-01-01 00:00:00',
        },
        {
          id: 2,
          username: '弐',
          competition_id: 1,
          score: 8,
          registered_at: '2015-01-01 00:00:00',
        },
        {
          id: 3,
          username: 'さん',
          competition_id: 1,
          score: 6,
          registered_at: '2015-01-01 00:00:00',
        },
      ],
    });
  }
  createParticipant(createParticipantRequest: CreateParticipantRequest) {
    return Promise.resolve({
      id: 1,
      username: 'いち',
      competition_id: 1,
      score: 10,
      registered_at: '2015-01-01 00:00:00',
    });
  }
  updateParticipant(updateParticipantRequest: UpdateParticipantRequest) {
    return Promise.resolve({
      id: updateParticipantRequest.id,
      username: updateParticipantRequest.username,
      competition_id: updateParticipantRequest.competitionId,
      score: 10,
      registered_at: updateParticipantRequest.registered_at,
    });
  }
  deleteParticipant(competitionId: number, participantId: number) {
    return Promise.resolve({
      code: 0,
    });
  }
  getTips(
    getTipsRequest: GetTipsRequest
    ){
      return GetDummyTips( getTipsRequest)
  };
}

export const GetDummyTips = (getTipsRequest: GetTipsRequest): Promise<GetTipsResponse> =>{
  if(getTipsRequest.problem_id === 1){
    return Promise.resolve(tips1);
  }else if(getTipsRequest.problem_id === 2){
    return Promise.resolve(tips2);
  }else if(getTipsRequest.problem_id === 3){
    return Promise.resolve(tips3);
  }else if(getTipsRequest.problem_id === 4){
    return Promise.resolve(tips4);
  }else if(getTipsRequest.problem_id === 5){
    return Promise.resolve(tips5);
  }else{
    return Promise.resolve(tips1);
  }
}