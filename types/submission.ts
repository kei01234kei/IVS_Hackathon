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
// todo: gen

// example GetSubmissionResponse
// {
//   "id": "提出ID",
//   "user_id": "ユーザーID",
//   "problem_id": "問題ID",
//   "content": "提出内容",
//   "score": "スコア",
//   "submitted_at": "提出時間"
// }
// todo: gen

// example CreateSubmissionResponse
// {
//     "id": "新規提出ID",
//     "user_id": "ユーザーID",
//     "problem_id": "問題ID",
//     "problem_type": "問題タイプ",
//     "content": "提出内容",
//     "score": "スコア",
//     "submitted_at": "提出時間"
// }
export interface CreateSubmissionResponse {
  id: number;
  user_id: number;
  problem_id: number;
  problem_type: string;
  content: string;
  score: number;
  submitted_at: string;
}
