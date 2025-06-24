import { NextFunction, Request, Response } from "express";
import { IGenerate, IServiceResponse } from "../../utils/interface";

export interface IAiToolService {
  getColdEmailContent(payload: IGenerate): Promise<IServiceResponse>;
  sendColdEmail(payload: ISendColdEmail): Promise<IServiceResponse>;
}

export interface IAiToolController {
  getColdEmailContent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}

export interface ISendColdEmail {
  senderEmail: string;
  subject: string;
  content: string;
  resumeId: string;
}
