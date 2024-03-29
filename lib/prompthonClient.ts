import {
  CreateParticipantRequest,
  UpdateParticipantRequest,
} from '../types/participant';
import { Conversation } from '@/types/chat';
import {
  CompleteCompetitionsResponse,
  CreateCompetitionsRequest,
  CreateCompetitionsResponse,
  DeleteCompetitionsResponse,
  GetCompetitionResponse,
  GetCompetitionsResponse,
  UpdateCompetitionsRequest,
  UpdateCompetitionsResponse,
} from '@/types/competition';
import {
  CreateParticipantResponse,
  DeleteParticipantResponse,
  GetParticipantsResponse,
  UpdateParticipantResponse,
} from '@/types/participant';
import {
  CreateProblemRequest,
  CreateProblemResponse,
  DeleteProblemResponse,
  GetProblemResponse,
  GetProblemsResponse,
  UpdateProblemRequest,
  UpdateProblemResponse,
} from '@/types/problem';
import {
  CreateSubmissionRequest,
  CreateSubmissionResponse,
  EvaluationRequest,
  EvaluationResponse,
  GetSubmissionResponse,
  GetSubmissionsResponse,
} from '@/types/submission';
import {
  CreateUserResponse,
  DeleteUerResponse,
  GetUserResponse,
  UpdateUerResponse,
} from '@/types/user';
import { GetTipsRequest, GetTipsResponse, } from '@/types/tips';

import { AbstractRepository } from '@/repository/abstractRepository';

export class PrompthonClient {
  private repo: AbstractRepository;
  constructor(repo: AbstractRepository) {
    this.repo = repo;
  }

  async createUser(userName: string): Promise<CreateUserResponse> {
    return this.repo.createUser(userName);
  }
  async updateUser(
    userId: number,
    userName: string,
  ): Promise<UpdateUerResponse> {
    return this.repo.updateUser(userId, userName);
  }
  async(userId: number): Promise<GetUserResponse> {
    return this.repo.getUser(userId);
  }
  async deleteUser(userId: number): Promise<DeleteUerResponse> {
    return this.repo.deleteUser(userId);
  }

  async getCompetitions(): Promise<GetCompetitionsResponse> {
    return this.repo.getCompetitions();
  }
  async getCompetition(competitionId: number): Promise<GetCompetitionResponse> {
    return this.repo.getCompetition(competitionId);
  }
  async createCompetition(
    createCompetitionsRequest: CreateCompetitionsRequest,
  ): Promise<CreateCompetitionsResponse> {
    return this.repo.createCompetition(createCompetitionsRequest);
  }
  async updateCompetition(
    UpdateCompetitionsRequest: UpdateCompetitionsRequest,
  ): Promise<UpdateCompetitionsResponse> {
    return this.repo.updateCompetition(UpdateCompetitionsRequest);
  }
  async deleteCompetition(
    competitionId: number,
  ): Promise<DeleteCompetitionsResponse> {
    return this.repo.deleteCompetition(competitionId);
  }
  async completeCompetition(
    competitionId: number,
  ): Promise<CompleteCompetitionsResponse> {
    return this.repo.completeCompetition(competitionId);
  }
  async getCompetitionStandings() {}

  async getProblems(competitionId: number): Promise<GetProblemsResponse> {
    return this.repo.getProblems(competitionId);
  }
  // 問題の詳細を取得
  async getProblem(
    competitionId: number,
    problemId: number,
  ): Promise<GetProblemResponse> {
    return this.repo.getProblem(competitionId, problemId);
  }
  async createProblem(
    createProblemRequest: CreateProblemRequest,
  ): Promise<CreateProblemResponse> {
    return this.repo.createProblem(createProblemRequest);
  }
  async updateProblem(
    updateProblemRequest: UpdateProblemRequest,
  ): Promise<UpdateProblemResponse> {
    return this.repo.updateProblem(updateProblemRequest);
  }
  async deleteProblem(
    competitionId: number,
    problemId: number,
  ): Promise<DeleteProblemResponse> {
    return this.repo.deleteProblem(competitionId, problemId);
  }

  async getSubmissions(): Promise<GetSubmissionsResponse> {
    return this.repo.getSubmissions();
  }
  async getSubmission(
    competitionId: number,
    submissionId: number,
  ): Promise<GetSubmissionResponse> {
    return this.repo.getSubmission(competitionId, submissionId);
  }
  async createSubmission(
    createSubmissionRequest: CreateSubmissionRequest,
  ): Promise<CreateSubmissionResponse> {
    return this.repo.createSubmission(createSubmissionRequest);
  }

  // 採点
  async evaluate(
    evaluationRequest: EvaluationRequest,
  ): Promise<EvaluationResponse> {
    return this.repo.evaluate(evaluationRequest);
  }

  // 提出
  async submit(
    competitionId: number,
    problemId: number,
    promptHistory: Conversation,
  ): Promise<CreateSubmissionResponse> {
    return this.repo.submit(competitionId, problemId, promptHistory);
  }

  async getParticipants(
    competitionId: number,
  ): Promise<GetParticipantsResponse> {
    return this.repo.getParticipants(competitionId);
  }
  async createParticipant(
    createParticipantRequest: CreateParticipantRequest,
  ): Promise<CreateParticipantResponse> {
    return this.repo.createParticipant(createParticipantRequest);
  }
  async updateParticipant(
    updateParticipantRequest: UpdateParticipantRequest,
  ): Promise<UpdateParticipantResponse> {
    return this.repo.updateParticipant(updateParticipantRequest);
  }
  async deleteParticipant(
    competitionId: number,
    participantId: number,
  ): Promise<DeleteParticipantResponse> {
    return this.repo.deleteParticipant(competitionId, participantId);
  }
  async saveBestScore(bestScore: Number) {}
  async saveScore(score: Number) {}
  async getScore(): Promise<Number> {
    return Promise.resolve(0);
  }
  async getBestScore(): Promise<Number> {
    return Promise.resolve(0);
  }


  async getTips( getTipsRequest: GetTipsRequest): Promise<GetTipsResponse> {
    return this.repo.getTips(getTipsRequest);
  }
}
