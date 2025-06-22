import Joi, { ObjectSchema } from "joi";
import { AiModels, AiTools, IGenerate } from "../../utils/interface";

export const coldEmailContentSchema: ObjectSchema<IGenerate> =
  Joi.object<IGenerate>({
    ai: Joi.string().valid(AiModels).required(),
    input: Joi.string().required(),
    usecase: Joi.string().valid(AiTools).required(),
    model: Joi.string().optional(),
  });
