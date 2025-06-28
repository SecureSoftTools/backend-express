import { Types } from "mongoose";

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
  COLD_EMAILER = "cold_emailer",
}

export interface IPayload {
  data?: object | object[];
  count?: number;
  totalRecords?: number;
}

export interface IServiceResponse {
  statusCode: number;
  payload: IPayload;
  message: string;
}

export interface ICreateToken {
  id: Types.ObjectId;
  name: string;
  email: string;
}

export interface IGetRequestUser {
  id: string;
  name: string;
  email: string;
}

export interface ICreateMail {
  subject: string;
  content: string;
  usecase: string;
  used: number;
}

export interface ICloudinaryResponse {
  secureUrl: string;
  url: string;
}

export interface IPagination {
  skip: number;
  take: number;
}
