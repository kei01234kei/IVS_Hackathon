// example competitionsResponse
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
export interface CompetitionsResponse {
  competitions: CompetitionResponse[];
}

// example competitionResponse
// {
//     "id": "コンペティションID",
//     "name": "コンペティション名",
//     "description": "コンペティション説明",
//     "start_date": "開始日",
//     "end_date": "終了日"
// }
export interface CompetitionResponse {
  id: number;
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

