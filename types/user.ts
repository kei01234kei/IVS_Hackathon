// example CreateUserResponse
// {
//     "id": "ユーザid (uid)"
//     "username": "ユーザー名"
// }
export interface CreateUserResponse {
  id: number;
  username: string;
}

// example GetUerResponse
// {
//     "id": "ユーザid (uid)"
//     "username": "ユーザー名"
// }
export interface GetUserResponse {
  id: number;
  username: string;
}

// example UpdateUerResponse
// {
//     "id": "ユーザid (uid)"
//     "username": "ユーザー名"
// }
export interface UpdateUerResponse {
  id: number;
  username: string;
}

// example DeleteUerResponse
// {
//     "code": 0
// }
export interface DeleteUerResponse {
  code: number;
}
