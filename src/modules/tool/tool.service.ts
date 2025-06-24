import ResponseService from "../../utils/response.handler";
import { ICreateTool, IToolService } from "./tool.interface";
import toolModel from "../../database/models/tool.model";
import { IServiceResponse } from "../../utils/interface";

class ToolService extends ResponseService implements IToolService {
  constructor(private readonly toolRepo = toolModel) {
    super();
  }

  getTools = async (): Promise<IServiceResponse> => {
    const tools = await this.toolRepo.find().sort({ createdAt: -1 });
    return this.serviceResponse(200, tools, "Tools fetched successfully");
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
