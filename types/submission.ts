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
//   "content": '{"id":"c5465594-f720-4184-b32b-ce32b7a4288e","name":"こんにちは","messages":[{"role":"user","content":"こんにちは"},{"role":"assistant","content":"こんにちは！お元気ですか？"},{"role":"user","content":"はい"},{"role":"assistant","content":"良かったです！何かお手伝いできることがありますか？"}],"model":{"id":"gpt-3.5-turbo","name":"GPT-3.5","maxLength":12000,"tokenLimit":4000},"prompt":"システムのプロンプト","temperature":0,"folderId":null}',
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
