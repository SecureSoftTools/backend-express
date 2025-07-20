import { Request, Response, NextFunction } from "express";
import { IPagination, IServiceResponse } from "../../utils/interface";

export interface IResumeService {
  uploadResume(
    payload: IUploadResume,
    file: Express.Multer.File
  ): Promise<IServiceResponse>;
  fetchRankingResume(pagination: IPagination): Promise<IServiceResponse>;
}

export interface IResumeController {
  uploadResume(req: Request, res: Response, next: NextFunction): Promise<void>;
  fetchRankingResume(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}

export interface IUploadResume {
  filename: string;
  rank: string;
}
