import { NextFunction, Request, Response } from "express";
import { IServiceResponse } from "../../utils/interface";

export interface IToolService {
  getTools(): Promise<IServiceResponse>;
}

export interface IToolController {
  getTools(req: Request, res: Response, next: NextFunction): Promise<void>;
}
