// example GetSubmissionsResponse
// {
//   "submissions": [
//     {
//       "id": "提出ID",
//       "user_id": "ユーザーID",
//       "problem_id": "問題ID",
//       "content": "提出内容",
//       "score": "スコア",
//       "submitted_at": "提出時間"
//     },
//     ...
//   ]
// }
export interface GetSubmissionsResponse {
  submissions: GetSubmissionResponse[];
}

// example GetSubmissionResponse
// {
//   "id": "提出ID",
//   "user_id": "ユーザーID",
//   "problem_id": "問題ID",
//   "content": "提出内容",
//   "score": "スコア",
//   "submitted_at": "提出時間"
// }
export interface GetSubmissionResponse {
  id: number;
  user_id: number;
  problem_id: number;
  content: string;
  score: number;
  submitted_at: string;
}

// example CreateSubmissionRequest
// {
//     "user_id": "ユーザーID",
//     "competition_id": "コンペID",
//     "problem_id": "問題ID",
//     "content": "提出内容"
// }
export interface CreateSubmissionRequest {
  user_id: number;
  competition_id: number;
  problem_id: number;
  content: string;
}

// example CreateSubmissionResponse
// {
//     "id": "新規提出ID",
//     "user_id": "ユーザーID",
//     "problem_id": "問題ID",
//     "problem_type_id": "問題タイプ",
//     "content": "提出内容",
//     "score": "スコア",
//     "submitted_at": "提出時間"
// }
export interface CreateSubmissionResponse {
  id: number;
  user_id: number;
  problem_id: number;
  problem_type_id: number;
  content: string;
  score: number;
  submitted_at: string;
}
