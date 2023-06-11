import { Conversation } from '@/types/chat';
import {
  GetProblemsResponse, GetProblemResponse, CreateProblemResponse, UpdateProblemResponse, DeleteProblemResponse,
  CreateProblemRequest, UpdateProblemRequest
} from '@/types/problem';
import { GetSubmissionResponse, GetSubmissionsResponse, CreateSubmissionResponse,
  CreateSubmissionRequest,
} from '@/types/submission';
import { CreateUserResponse, UpdateUerResponse, GetUserResponse, DeleteUerResponse } from '@/types/user';
import {
  GetCompetitionsResponse, GetCompetitionResponse,
  CreateCompetitionsResponse, UpdateCompetitionsResponse,
  DeleteCompetitionsResponse, CompleteCompetitionsResponse,
  CreateCompetitionsRequest, UpdateCompetitionsRequest
} from '@/types/competition';
import { GetParticipantsResponse, GetParticipantResponse, CreateParticipantResponse, UpdateParticipantResponse, DeleteParticipantResponse } from '@/types/participant';
import { CreateParticipantRequest, UpdateParticipantRequest } from '../types/participant';
import { AbstractRepository } from '@/repository/abstractRepository';

export class PrompthonClient {
  private repo: AbstractRepository;
  constructor(repo: AbstractRepository) {
    this.repo = repo;
  }

  async createUser(userName: string): Promise<CreateUserResponse>{
    return this.repo.createUser(userName);
  }
  async updateUser(userId: number, userName: string): Promise<UpdateUerResponse>{
    return this.repo.updateUser(userId, userName);
  }
  async(userId: number): Promise<GetUserResponse>{
    return this.repo.getUser(userId);
  }
  async deleteUser(userId: number): Promise<DeleteUerResponse>{
    return this.repo.deleteUser(userId);
  }

  async getCompetitions(): Promise<GetCompetitionsResponse>{
    return this.repo.getCompetitions();
  }
  async getCompetition(competitionId: number): Promise<GetCompetitionResponse>{
    return this.repo.getCompetition(competitionId);
  }
  async createCompetition(createCompetitionsRequest: CreateCompetitionsRequest): Promise<CreateCompetitionsResponse>{
    return this.repo.createCompetition(createCompetitionsRequest);
  }
  async updateCompetition(UpdateCompetitionsRequest: UpdateCompetitionsRequest): Promise<UpdateCompetitionsResponse>{
    return this.repo.updateCompetition(UpdateCompetitionsRequest);
  }
  async deleteCompetition(competitionId: number): Promise<DeleteCompetitionsResponse>{
    return this.repo.deleteCompetition(competitionId);
  }
  async completeCompetition(competitionId: number): Promise<CompleteCompetitionsResponse>{
    return this.repo.completeCompetition(competitionId);
  }
  async getCompetitionStandings() {}

  async getProblems(): Promise<GetProblemsResponse>{
    return this.repo.getProblems();
  }
  // 問題の詳細を取得
  async getProblem(competitionId: number, problemId: number): Promise<GetProblemResponse> {
    return this.repo.getProblem(competitionId, problemId);
  }
  async createProblem(createProblemRequest: CreateProblemRequest): Promise<CreateProblemResponse>{
    return this.repo.createProblem(createProblemRequest);
  }
  async updateProblem(updateProblemRequest: UpdateProblemRequest): Promise<UpdateProblemResponse>{
    return this.repo.updateProblem(updateProblemRequest);
  }
  async deleteProblem(competitionId: number, problemId: number): Promise<DeleteProblemResponse>{
    return this.repo.deleteProblem(competitionId, problemId);
  }

  async getSubmissions(): Promise<GetSubmissionsResponse>{
    return this.repo.getSubmissions();
  }
  async getSubmission(competitionId: number, submissionId: number): Promise<GetSubmissionResponse>{
    return this.repo.getSubmission(competitionId, submissionId);
  }
  async createSubmission(createSubmissionRequest: CreateSubmissionRequest): Promise<CreateSubmissionResponse>{
    return this.repo.createSubmission(createSubmissionRequest);
  }

  // 採点
  async evaluate(
    competitionId: number,
    problemId: number,
    promptHistory: Conversation,
  ): Promise<number> {
    return this.repo.evaluate(competitionId, problemId, promptHistory);
  }

  // 提出
  async submit(
    competitionId: number,
    problemId: number,
    promptHistory: Conversation,
  ): Promise<CreateSubmissionResponse> {
    return this.repo.submit(competitionId, problemId, promptHistory);
  }

  async getParticipants(competitionId: number): Promise<GetParticipantsResponse>{
    return this.repo.getParticipants(competitionId);
  }
  async createParticipant(createParticipantRequest: CreateParticipantRequest): Promise<CreateParticipantResponse>{
    return this.repo.createParticipant(createParticipantRequest);
  }
  async updateParticipant(updateParticipantRequest: UpdateParticipantRequest): Promise<UpdateParticipantResponse>{
    return this.repo.updateParticipant(updateParticipantRequest);
  }
  async deleteParticipant(competitionId: number, participantId: number): Promise<DeleteParticipantResponse>{
    return this.repo.deleteParticipant(competitionId, participantId);
  }
}
