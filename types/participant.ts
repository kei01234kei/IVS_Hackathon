// example GetParticipantsResponse
// [
//   {
//     "id": "参加者ID",
//     "username": "ユーザーネーム",
//     "competition_id": "コンペティションID",
//     "score": "コンペティションの総合スコア",
//     "registerd_at": "登録時間"
//   },
//   ...
// ]
export interface GetParticipantsResponse {
  participants: GetParticipantResponse[];
}

// example GetParticipantResponse
// {
//   "id": "参加者ID",
//   "username": "ユーザーネーム",
//   "competition_id": "コンペティションID",
//   "score": "コンペティションの総合スコア",
//   "registered_at": "登録時間"
// },
export interface GetParticipantResponse {
  id: number;
  username: string;
  competition_id: number;
  score: number;
  registered_at: string;
}

// example CreateParticipantRequest
// {
//     "competitionId": 1
//     "username": "新規ユーザーネーム"
// }
export interface CreateParticipantRequest {
  competitionId: number;
  username: string;
}

// example CreateParticipantResponse
// {
//   "id": "新規参加者ID",
//   "username": "新規ユーザーネーム",
//   "competition_id": "コンペティションID",
//   "registered_at": "登録時間"
// }
export interface CreateParticipantResponse {
  id: number;
  username: string;
  competition_id: number;
  registered_at: string;
}

// example UpdateParticipantRequest
// {
//     "competitionId": 1
//     "id": "参加者ID",
//     "username": "ユーザーネーム"
//     "registerd_at": "登録時間"
// }
export interface UpdateParticipantRequest {
  competitionId: number;
  id: number;
  username: string;
  registered_at: string;
}

// example UpdateParticipantResponse
// {
//   "id": "参加者ID",
//   "username": "新規ユーザーネーム",
//   "registerd_at": "登録時間"
// }
export interface UpdateParticipantResponse {
  id: number;
  username: string;
  registered_at: string;
}

// example DeleteParticipantResponse
// {
//   "code": 0,
// }
export interface DeleteParticipantResponse {
  code: number;
}
