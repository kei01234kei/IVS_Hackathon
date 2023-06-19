export interface GetTipsRequest {
  competition_id: number;
  problem_id: number;
}


export interface GetTipsResponse {
  content: string;
  examples: example[]
}


export interface example {
  title: string;
  content: string;
}