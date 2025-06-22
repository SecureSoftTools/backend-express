export enum AiModels {
  OPEN_AI = "OPEN_AI",
  GEMINI_AI = "GEMINI_AI",
}

export interface IGenerate {
  ai: AiModels;
  input: string;
  usecase: string;
  model?: string;
}

export enum AiTools {
    COLD_EMAILER = "cold_emailer"
}

export interface IServiceResponse {
  statusCode: number;
  payload: object;
  message: string;
}