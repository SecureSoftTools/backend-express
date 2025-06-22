import { Request, Response, NextFunction } from "express";
import ResponseService from "../../utils/response.handler";
import { IAiToolController } from "./aiTool.interface";
import aiToolService from "./aiTool.service";
import { IGenerate } from "../../utils/interface";

class AiToolController extends ResponseService implements IAiToolController {
  constructor(private readonly service = aiToolService) {
    super();
  }

  getColdEmailContent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: IGenerate = req.payload;

      const { message, payload, statusCode } =
        await this.service.getColdEmailContent(data);
      this.sendResponse(res, statusCode, payload, message);
    } catch (error) {
      next(error);
    }
  };
}

const aiToolController = new AiToolController();
export default aiToolController;
