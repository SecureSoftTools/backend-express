import { NextFunction, Request, Response } from "express";
import { IGenerate, IServiceResponse } from "../../utils/interface";

export interface IAiToolService {
  getColdEmailContent(payload: IGenerate): Promise<IServiceResponse>;
}

export interface IAiToolController {
  getColdEmailContent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}
