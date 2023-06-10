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
