import AIGen from "../../utils/ai-models/generator";
import { IGenerate, IServiceResponse } from "../../utils/interface";
import ResponseService from "../../utils/response.handler";
import { IAiToolService } from "./aiTool.interface";

class AiToolService extends ResponseService implements IAiToolService {
  private aiGen: AIGen;
  constructor() {
    super();

    this.aiGen = new AIGen();
  }

  getColdEmailContent = async (
    payload: IGenerate
  ): Promise<IServiceResponse> => {
    const { ai, model, input, usecase } = payload;

    const coldEmailContent = await this.aiGen.generate({
      ai,
      model,
      input,
      usecase,
    });

    return this.serviceResponse(
      200,
      { coldEmailContent },
      "Cold email content generated successfully"
    );
  };
}

const aiToolService = new AiToolService();
export default aiToolService;
