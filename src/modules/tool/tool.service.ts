import ResponseService from "../../utils/response.handler";
import { ICreateTool, IToolService, IUpdateTool } from "./tool.interface";
import toolModel from "../../database/models/tool.model";
import { IPagination, IServiceResponse } from "../../utils/interface";
import { Mongoose, Types } from "mongoose";
import { BadRequestError } from "../../utils/errors";

class ToolService extends ResponseService implements IToolService {
  constructor(private readonly toolRepo = toolModel) {
    super();
  }

  getTools = async (pagination: IPagination): Promise<IServiceResponse> => {
    const { skip, take } = pagination;
    const [tools, totalRecords] = await Promise.all([
      this.toolRepo.find().skip(skip).limit(take).sort({ createdAt: -1 }),
      this.toolRepo.countDocuments(),
    ]);

    return this.serviceResponse(
      200,
      { data: tools, count: tools.length, totalRecords },
      "Tools fetched successfully"
    );
  };

  getToolById = async (toolId: string): Promise<IServiceResponse> => {
    const tool = await this.toolRepo.findOne({
      _id: new Types.ObjectId(toolId),
    });

    if (!tool) throw new BadRequestError("No tool found by id");

    return this.serviceResponse(
      200,
      { data: tool },
      "Tool fetched successfully"
    );
  };

  createTool = async (payload: ICreateTool): Promise<IServiceResponse> => {
    await this.toolRepo.create(payload);
    return this.serviceResponse(200, {}, "Tool created successfully");
  };

  createTools = async (payload: ICreateTool[]): Promise<IServiceResponse> => {
    await this.toolRepo.insertMany(payload);
    return this.serviceResponse(200, {}, "Tools created successfully");
  };

  updateToolById = async (payload: IUpdateTool): Promise<IServiceResponse> => {
    const { _id, ...updateData } = payload;

    await this.toolRepo.updateOne(
      { _id: new Types.ObjectId(_id) },
      { $set: updateData }
    );
    return this.serviceResponse(200, {}, "Tool updated successfully");
  };
}

const toolService = new ToolService();
export default toolService;
