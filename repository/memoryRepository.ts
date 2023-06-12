import { Conversation } from '@/types/chat';
import { CreateCompetitionsRequest, UpdateCompetitionsRequest } from '@/types/competition';
import { CreateProblemRequest, UpdateProblemRequest } from '@/types/problem';
import { CreateSubmissionRequest } from '@/types/submission';
import { CreateParticipantRequest, UpdateParticipantRequest } from '../types/participant';
import { Problem } from '../types/problem';



import { AbstractRepository } from '@/repository/abstractRepository';


let evaluateScore = 0;
const problem1 = {
  competition_id: 1,
  id: 1,
  problem_number: 1,
  name: '算数の問題',
  level: 1,
  score: 4,
  problem_type_id: 1,
  content:
    'A君が16日、B君が20日で終わらせられる仕事がある。この仕事を2人で行ったとき、終わるのは何日後？',
  input_example: '入力例',
  output_example: '整数のみ (小数の場合は繰り上げ)',
};

const problem2 = {
  competition_id: 1,
  id: 2,
  problem_number: 2,
  name: '問題名',
  level: 2,
  score: 6,
  problem_type_id: 2,
  content: '問題内容',
  input_example: '⼊⼒例',
  output_example: '出⼒例',
};

const problem3 = {
  competition_id: 1,
  id: 3,
  problem_number: 3,
  name: '問題名',
  level: 1,
  score: 10,
  problem_type_id: 3,
  content: '問題内容',
  input_example: '⼊⼒例',
  output_example: '出⼒例',
};

const futureTime = (new Date('2023-06-20T12:00:00+09:00')).toISOString();
const pastTime = (new Date('2023-06-10T12:00:00+09:00')).toISOString();

const dummyConversation: Conversation = {
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

  getProblems() {
    return Promise.resolve({
      problems: [problem1, problem2, problem3],
    });
  }
  getProblem(competitionId: number, problemId: number) {
    return new Promise<Problem>((resolve) => {
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
      problem_type_id: createProblemRequest.score,
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
      problem_type_id: updateProblemRequest.score,
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

  evaluate(
    competitionId: number,
    problemId: number,
    promptHistory: Conversation,
  ) {
    return new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(evaluateScore++);
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
}
