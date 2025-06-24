import Joi, { ObjectSchema } from "joi";
import { AiModels, AiTools, IGenerate } from "../../utils/interface";
import { ISendColdEmail } from "./aiTool.interface";

export const coldEmailContentSchema: ObjectSchema<IGenerate> =
  Joi.object<IGenerate>({
    ai: Joi.string().valid(AiModels).required(),
    input: Joi.string().required(),
    usecase: Joi.string().valid(AiTools).required(),
    model: Joi.string().optional(),
  });

export const sendColdEmailSchema: ObjectSchema<ISendColdEmail> =
  Joi.object<ISendColdEmail>({
    senderEmail: Joi.string().required(),
    subject: Joi.string().required(),
    content: Joi.string().required(),
    resumeId: Joi.string().required(),
  });
