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

export abstract class AbstractRepository {
  abstract createUser(userName: string): Promise<CreateUserResponse>
  abstract updateUser(userId: number, userName: string): Promise<UpdateUerResponse>
  abstract getUser(userId: number): Promise<GetUserResponse>
  abstract deleteUser(userId: number): Promise<DeleteUerResponse>

  abstract getCompetitions(): Promise<GetCompetitionsResponse>
  abstract getCompetition(competitionId: number): Promise<GetCompetitionResponse>
  abstract createCompetition(createCompetitionsRequest: CreateCompetitionsRequest): Promise<CreateCompetitionsResponse>
  abstract updateCompetition(UpdateCompetitionsRequest: UpdateCompetitionsRequest): Promise<UpdateCompetitionsResponse>
  abstract deleteCompetition(competitionId: number): Promise<DeleteCompetitionsResponse>
  abstract completeCompetition(competitionId: number): Promise<CompleteCompetitionsResponse>
  // abstract getCompetitionStandings():void

  abstract getProblems(): Promise<GetProblemsResponse>
  abstract getProblem(competitionId: number, problemId: number): Promise<GetProblemResponse>
  abstract createProblem(createProblemRequest: CreateProblemRequest): Promise<CreateProblemResponse>
  abstract updateProblem(updateProblemRequest: UpdateProblemRequest): Promise<UpdateProblemResponse>
  abstract deleteProblem(competitionId: number, problemId: number): Promise<DeleteProblemResponse>

  abstract getSubmissions(): Promise<GetSubmissionsResponse>
  abstract getSubmission(competitionId: number, submissionId: number): Promise<GetSubmissionResponse>
  abstract createSubmission(createSubmissionRequest: CreateSubmissionRequest): Promise<CreateSubmissionResponse>
  // abstract updateSubmission():void

  abstract evaluate(competitionId: number, problemId: number, promptHistory: Conversation): Promise<number>
  abstract submit(competitionId: number, problemId: number, promptHistory: Conversation): Promise<CreateSubmissionResponse>

  abstract getParticipants(competitionId: number): Promise<GetParticipantsResponse>
  abstract createParticipant(createParticipantRequest: CreateParticipantRequest): Promise<CreateParticipantResponse>
  abstract updateParticipant(updateParticipantRequest: UpdateParticipantRequest): Promise<UpdateParticipantResponse>
  abstract deleteParticipant(competitionId: number, participantId: number): Promise<DeleteParticipantResponse>
}
