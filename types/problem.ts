// example GetProblemsResponse
// {
//   "problems": [
//     {
//       "id": "問題ID",
//       "competition_id": "コンペティションID",
//       "problem_number": "問題番号",
//       "name": "問題名",
//       "level": "問題の難易度",
//       "score": "問題を解いた時のスコア",
//       "problem_type_id": "問題の種類のID",
//       "content": "問題内容",
//       "input_example": "⼊⼒例",
//       "output_example": "出⼒例"
//     },
//     ...
//   ]
// }
export interface GetProblemsResponse {
  problems: GetProblemResponse[];
}

// example GetProblemResponse
// {
//   "id": "問題ID",
//   "competition_id": "コンペティションID",
//   "problem_number": "問題番号",
//   "name": "問題名",
//   "level": "問題の難易度",
//   "score": "問題を解いた時のスコア",
//   "problem_type_id": "問題の種類のID",
//   "content": "問題内容",
//   "input_example": "⼊⼒例",
//   "output_example": "出⼒例"
// }
export interface GetProblemResponse {
  id: number;
  competition_id: number;
  problem_number: number;
  name: string;
  level: number;
  score: number;
  problem_type_id: number;
  content: string;
  input_example: string;
  output_example: string;
}



// example CreateProblemResponse
// {
//   "id": "新しい問題ID",
//   "competition_id": "コンペティションID",
//   "problem_number": "問題番号",
//   "name": "問題名",
//   "level": "問題の難易度",
//   "score": "問題を解いた時のスコア",
//   "problem_type_id": "問題の種類のID",
//   "content": "問題内容",
//   "input_example": "⼊⼒例",
//   "output_example": "出⼒例"
// }
export interface CreateProblemResponse {
  id: number;
  competition_id: number;
  problem_number: number;
  name: string;
  level: number;
  score: number;
  problem_type_id: number;
  content: string;
  input_example: string;
  output_example: string;
}


export interface Problem {
  id: number;
  competition_id: number;
  problem_number: number;
  name: string;
  level: number;
  score: number;
  problem_type_id: number;
  content: string;
  input_example: string;
  output_example: string;
}

// example UpdateProblemResponse
// {
//   "problem_number": "新しい問題番号",
//   "name": "新しい問題名",
//   "level": "新しい問題の難易度",
//   "score": "新しい問題を解いた時のスコア",
//   "problem_type_id": "新しい問題の種類のID",
//   "content": "新しい問題内容",
//   "input_example": "新しい⼊⼒例",
//   "output_example": "新しい出⼒例"
// }
export interface UpdateProblemResponse {
  problem_number: number;
  name: string;
  level: number;
  score: number;
  problem_type_id: number;
  content: string;
  input_example: string;
  output_example: string;
}


// example DeleteProblemResponse
// {
//   "code": 0
// }
export interface DeleteProblemResponse {
  code: number;
}