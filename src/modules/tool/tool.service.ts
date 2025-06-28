import ResponseService from "../../utils/response.handler";
import { ICreateTool, IToolService } from "./tool.interface";
import toolModel from "../../database/models/tool.model";
import { IServiceResponse } from "../../utils/interface";
import { Types } from "mongoose";
import { BadRequestError } from "../../utils/errors";

class ToolService extends ResponseService implements IToolService {
  constructor(private readonly toolRepo = toolModel) {
    super();
  }

  getTools = async (): Promise<IServiceResponse> => {
    const tools = await this.toolRepo.find().sort({ createdAt: -1 });
    return this.serviceResponse(200, tools, "Tools fetched successfully");
  };

  getToolById = async (toolId: string): Promise<IServiceResponse> => {
    const tool = await this.toolRepo.findOne({
      _id: new Types.ObjectId(toolId),
    });

    if (!tool) throw new BadRequestError("No tool found by id");

    return this.serviceResponse(200, tool, "Tool fetched successfully");
  };

  createTool = async (payload: ICreateTool): Promise<IServiceResponse> => {
    await this.toolRepo.create(payload);
    return this.serviceResponse(200, {}, "Tool created successfully");
  };

  createTools = async (payload: ICreateTool[]): Promise<IServiceResponse> => {
    await this.toolRepo.insertMany(payload);
    return this.serviceResponse(200, {}, "Tools created successfully");
  };
}

const toolService = new ToolService();
export default toolService;
