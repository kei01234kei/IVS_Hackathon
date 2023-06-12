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
import { CreateProblemRequest, UpdateProblemRequest, GetProblemsResponse } from '@/types/problem';
import { CreateSubmissionRequest } from '@/types/submission';
import { problem1,problem2,problem3,dummyConversation } from '@/repository/memoryRepository';

import { AbstractRepository } from '@/repository/abstractRepository';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { CreateSubmissionResponse, EvaluationRequest } from '../types/submission';

let evaluateScore = 0;

export class MixRepository extends AbstractRepository {
  private apiClient: AxiosInstance ;
  constructor() {
    super();
    this.apiClient = axios.create({
      baseURL: 'http://localhost:3000/api',
    })
  }
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
          start_date: '2020-01-01',
          end_date: '2020-01-02',
        },
        {
          id: 2,
          name: 'コンペティションに名',
          description: 'コンペティション２説明',
          start_date: '2020-02-01',
          end_date: '2020-02-04',
        },
      ],
    });
  }
  getCompetition(competitionId: number) {
    return Promise.resolve({
      id: competitionId,
      name: 'コンペティションいち',
      description: 'コンペティションいち説明',
      start_date: '2020-01-01',
      end_date: '2020-01-02',
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
    return new Promise<GetProblemsResponse>(async (resolve) => {
      const res = await this.apiClient.get(`/competitions/${competitionId}/problems`)
      const problems = res.data?.problems
      const result: GetProblemResponse[] = []
      if (problems) {
        problems.forEach((problem:any) => {
          const addProblem: GetProblemResponse = {
            id: Number(problem?.id),
            competition_id: Number(problem?.competition_id),
            problem_number: Number(problem?.problem_number),
            name: problem?.name,
            level: problem?.level,
            score: Number(problem?.score),
            problem_type_id: Number(problem?.problem_type_id),
            content: problem?.content,
            input_example: problem?.input_example as string,
            output_example: problem?.output_example as string,
            next_problem_id: Number(problem?.next_problem_id) || null,
            prev_problem_id: Number(problem?.prev_problem_id) || null,
          }
          result.push(addProblem)
        });
      }

      resolve({
        problems: result,
      })
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
    return new Promise<CreateSubmissionResponse>(async (resolve) => {
      const res = await this.apiClient.post(`/competition/${createSubmissionRequest.competition_id}/submissions`,{
        user_id: createSubmissionRequest.user_id,
        problem_id: createSubmissionRequest.problem_id,
        content: createSubmissionRequest.content,
      })
      const id = parseInt(res.data?.id)
      const userId = parseInt(res.data?.user_id)
      const problemId = parseInt(res.data?.problem_id)
      const content = JSON.parse(res.data?.content)
      const score = parseInt(res.data?.score)
      const problemTypeId = parseInt(res.data?.problem_type_id)
      resolve({
        id: id,
        user_id: userId,
        problem_id: problemId,
        content: content,
        score: score,
        problem_type_id: problemTypeId,
        submitted_at: res.data?.submitted_at,
      })
    });
  }

  evaluate(
    evaluationRequest: EvaluationRequest
  ) {
    return new Promise<number>(async (resolve) => {
      const res = await this.apiClient.post(`/competition/${evaluationRequest.id}/evaluation`,{
        user_id: evaluationRequest.user_id,
        problem_id: evaluationRequest.problem_id,
        message: evaluationRequest.message,
      })
      const score = parseInt(res.data?.score)
      resolve(score)
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
