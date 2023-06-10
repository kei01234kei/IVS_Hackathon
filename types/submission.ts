// example SubmissionResponse
// {
//     "id": "新規提出ID",
//     "user_id": "ユーザーID",
//     "problem_id": "問題ID",
//     "problem_type": "問題タイプ",
//     "content": "提出内容",
//     "score": "スコア",
//     "submitted_at": "提出時間"
// }
export interface SubmissionResponse {
  id: number;
  user_id: number;
  problem_id: number;
  problem_type: string;
  content: string;
  score: number;
  submitted_at: string;
}