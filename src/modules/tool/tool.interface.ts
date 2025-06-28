import { NextFunction, Request, Response } from "express";
import { IPagination, IServiceResponse } from "../../utils/interface";

export interface IToolService {
  getTools(pagination: IPagination): Promise<IServiceResponse>;
  getToolById(toolId: string): Promise<IServiceResponse>;
  createTool(payload: ICreateTool): Promise<IServiceResponse>;
  createTools(payload: ICreateTool[]): Promise<IServiceResponse>;
}

export interface IToolController {
  getTools(req: Request, res: Response, next: NextFunction): Promise<void>;
  getToolById(req: Request, res: Response, next: NextFunction): Promise<void>;
  createTool(req: Request, res: Response, next: NextFunction): Promise<void>;
  createTools(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface ICreateTool {
  name: string;
  description: string;
  icon: string;
}
