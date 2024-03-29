// example GetCompetitionsResponse
// {
//     "competitions": [
//         {
//             "id": "コンペティションID",
//             "name": "コンペティション名",
//             "description": "コンペティション説明",
//             "start_date": "開始日",
//             "end_date": "終了日"
//         },
//         ...
//     ]
// }
export interface GetCompetitionsResponse {
  competitions: GetCompetitionResponse[];
}

// example GetCompetitionResponse
// {
//     "id": "コンペティションID",
//     "name": "コンペティション名",
//     "description": "コンペティション説明",
//     "start_date": "開始日",
//     "end_date": "終了日"
// }
export interface GetCompetitionResponse {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
}

// example CreateCompetitionsRequest
// {
//     "name": "コンペティション名",
//     "description": "コンペティション説明",
//     "start_date": "開始日",
//     "end_date": "終了日"
// }
export interface CreateCompetitionsRequest {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
}

// example CreateCompetitionsResponse
// {
//     "id": "コンペティションID",
//     "name": "更新後のコンペティション名",
//     "description": "更新後のコンペティション説明",
//     "start_date": "更新後の開始日",
//     "end_date": "更新後の終了日"
// }
export interface CreateCompetitionsResponse {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
}

// example UpdateCompetitionsRequest
// {
//     "id": "コンペティションID",
//     "name": "コンペティション名",
//     "description": "コンペティション説明",
//     "start_date": "開始日",
//     "end_date": "終了日"
// }
export interface UpdateCompetitionsRequest {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
}

// example UpdateCompetitionsResponse
// {
//     "id": "コンペティションID",
//     "name": "更新後のコンペティション名",
//     "description": "更新後のコンペティション説明",
//     "start_date": "更新後の開始日",
//     "end_date": "更新後の終了日"
// }
export interface UpdateCompetitionsResponse {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
}

// example DeleteCompetitionsResponse
// {
//     "code": 0
// }
export interface DeleteCompetitionsResponse {
  code: number;
}

// example CompleteCompetitionsResponse
// {
//     "code": 0
// }
export interface CompleteCompetitionsResponse {
  code: number;
}
