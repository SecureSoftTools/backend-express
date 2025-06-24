import ResponseService from "../../utils/response.handler";
import { IToolService } from "./tool.interface";
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
}

const toolService = new ToolService();
export default toolService;
