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
  GetParticipantResponse,
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

export abstract class AbstractRepository {
  abstract createUser(userName: string): Promise<CreateUserResponse>;
  abstract updateUser(
    userId: number,
    userName: string,
  ): Promise<UpdateUerResponse>;
  abstract getUser(userId: number): Promise<GetUserResponse>;
  abstract deleteUser(userId: number): Promise<DeleteUerResponse>;

  abstract getCompetitions(): Promise<GetCompetitionsResponse>;
  abstract getCompetition(
    competitionId: number,
  ): Promise<GetCompetitionResponse>;
  abstract createCompetition(
    createCompetitionsRequest: CreateCompetitionsRequest,
  ): Promise<CreateCompetitionsResponse>;
  abstract updateCompetition(
    UpdateCompetitionsRequest: UpdateCompetitionsRequest,
  ): Promise<UpdateCompetitionsResponse>;
  abstract deleteCompetition(
    competitionId: number,
  ): Promise<DeleteCompetitionsResponse>;
  abstract completeCompetition(
    competitionId: number,
  ): Promise<CompleteCompetitionsResponse>;
  // abstract getCompetitionStandings():void

  abstract getProblems(competitionId: number): Promise<GetProblemsResponse>;
  abstract getProblem(
    competitionId: number,
    problemId: number,
  ): Promise<GetProblemResponse>;
  abstract createProblem(
    createProblemRequest: CreateProblemRequest,
  ): Promise<CreateProblemResponse>;
  abstract updateProblem(
    updateProblemRequest: UpdateProblemRequest,
  ): Promise<UpdateProblemResponse>;
  abstract deleteProblem(
    competitionId: number,
    problemId: number,
  ): Promise<DeleteProblemResponse>;

  abstract getSubmissions(): Promise<GetSubmissionsResponse>;
  abstract getSubmission(
    competitionId: number,
    submissionId: number,
  ): Promise<GetSubmissionResponse>;
  abstract createSubmission(
    createSubmissionRequest: CreateSubmissionRequest,
  ): Promise<CreateSubmissionResponse>;
  // abstract updateSubmission():void

  abstract evaluate(
    evaluationRequest: EvaluationRequest,
  ): Promise<EvaluationResponse>;
  abstract submit(
    competitionId: number,
    problemId: number,
    promptHistory: Conversation,
  ): Promise<CreateSubmissionResponse>;

  abstract getParticipants(
    competitionId: number,
  ): Promise<GetParticipantsResponse>;
  abstract createParticipant(
    createParticipantRequest: CreateParticipantRequest,
  ): Promise<CreateParticipantResponse>;
  abstract updateParticipant(
    updateParticipantRequest: UpdateParticipantRequest,
  ): Promise<UpdateParticipantResponse>;
  abstract deleteParticipant(
    competitionId: number,
    participantId: number,
  ): Promise<DeleteParticipantResponse>;
}
