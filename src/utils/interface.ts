export enum AIModels {
  OPEN_AI = "OPEN_AI",
  GEMINI_AI = "GEMINI_AI",
}

export interface IGenerate {
  ai: AIModels;
  input: string;
  usecase: string;
  model?: string;
}

export enum aiTools {
    COLD_EMAILER = "cold_emailer"
}

export interface IServiceResponse {
  statusCode: number;
  payload: object;
  message: string;
}