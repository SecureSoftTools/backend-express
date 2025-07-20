import { Request, Response, NextFunction } from "express";
import ResponseService from "../../utils/response.handler";
import { IResumeController, IUploadResume } from "./resume.interface";
import resumeService from "./resume.service";

class ResumeController extends ResponseService implements IResumeController {
  constructor(private readonly service = resumeService) {
    super();
  }

  uploadResume = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: IUploadResume = req.payload;
      const file: Express.Multer.File | undefined = req.file;

      const { message, payload, statusCode } = await this.service.uploadResume(
        data,
        file
      );
      this.sendResponse(res, statusCode, payload, message);
    } catch (error) {
      next(error);
    }
  };

  fetchRankingResume = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { message, payload, statusCode } =
        await this.service.fetchRankingResume(req.pagination);
      this.sendResponse(res, statusCode, payload, message);
    } catch (error) {
      next(error);
    }
  };
}

const resumeController = new ResumeController();
export default resumeController;
