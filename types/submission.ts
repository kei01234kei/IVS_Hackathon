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
import { Conversation } from './chat';

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
  content: Conversation;
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
  content: Conversation;
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
  content: Conversation;
  score: number;
  submitted_at: string;
}

// example evaluationRequest
// {
//     "user_id": "1",
//     "problem_id": "3",
//     "messages": [
//       {
//         "message_id": "1",
//         "role": "system",
//         "content": "You are a smart assistant."
//       },
//       {
//         "message_id": "2",
//         "role": "user",
//         "content": "Given a document from a user, try to extract the following metadata:\n - minimum_monthly_salary: number or null\n - maximum_monthly_salary: number or null\n\nexample input1: 年棒240万円以上\nexample output1: {minimum_monthly_salary: 200000, maximum_monthly_salary:null}\n\n Respond with a JSON containing the extracted metadata in key value pairs. If you dont find a metadata field, dont specify it.\n ONLY JSON is accepted as a response."
//       }
//     ]
// }
export interface EvaluationRequest {
  competition_id: string;
  user_id: number;
  problem_id: number;
  message: Conversation;
}

// example EvaluationResponse
// {
//   "id": "Nay-3JSahEYqOVV_20B9F",
//   "user_id": "1",
//   "problem_id": "3",
//   "messages": [
//     {
//       "message_id": "1",
//       "role": "system",
//       "content": "You are a smart assistant."
//     },
//     {
//       "message_id": "2",
//       "role": "user",
//       "content": "Given a document from a user, try to extract the following metadata:\n - minimum_monthly_salary: number or null\n - maximum_monthly_salary: number or null\n\nexample input1: 年棒240万円以上\nexample output1: {minimum_monthly_salary: 200000, maximum_monthly_salary:null}\n\n Respond with a JSON containing the extracted metadata in key value pairs. If you dont find a metadata field, dont specify it.\n ONLY JSON is accepted as a response."
//     }
//   ],
//   "score": 200,
//   "submitted_at": "2023-06-11T08:19:34.015Z"
// }
export interface EvaluationResponse {
  competition_id: string;
  user_id: number;
  problem_id: number;
  message: Conversation;
  score: number;
  submitted_at: string;
}