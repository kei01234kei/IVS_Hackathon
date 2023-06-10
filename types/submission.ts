export interface SubmissionResponse {
  id: number;
  user_id: number;
  problem_id: number;
  problem_type: string;
  content: string;
  score: number;
  submitted_at: string;
}
