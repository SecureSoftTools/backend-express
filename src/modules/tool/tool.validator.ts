import Joi, { ArraySchema, ObjectSchema } from "joi";
import { ICreateTool } from "./tool.interface";

export const createToolSchema: ObjectSchema<ICreateTool> =
  Joi.object<ICreateTool>({
    name: Joi.string().required(),
    description: Joi.string().required(),
    icon: Joi.string().required(),
  });

export const createToolsSchema: ArraySchema<ICreateTool[]> = Joi.array().items(
  Joi.object<ICreateTool>({
    name: Joi.string().required(),
    description: Joi.string().required(),
    icon: Joi.string().required(),
  })
);
