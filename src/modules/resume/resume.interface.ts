import { Request, Response, NextFunction } from "express";
import { IServiceResponse } from "../../utils/interface";

export interface IResumeService {
  uploadResume(payload: IUploadResume, file: Express.Multer.File): Promise<IServiceResponse>;
}

export interface IResumeController {
  uploadResume(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface IUploadResume {
  filename: string;
}
