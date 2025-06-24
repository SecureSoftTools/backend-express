import { Request, Response, NextFunction } from "express";
import ResponseService from "../../utils/response.handler";
import { IToolController } from "./tool.interface";
import toolService from "./tool.service";

export class ToolController extends ResponseService implements IToolController {
  constructor(private readonly service = toolService) {
    super();
  }

  getTools = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { message, payload, statusCode } = await this.service.getTools();
      this.sendResponse(res, statusCode, payload, message);
    } catch (error) {
      next(error);
    }
  };
}

const toolController = new ToolController();
export default toolController;
