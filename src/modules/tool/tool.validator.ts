import Joi, { ArraySchema, ObjectSchema } from "joi";
import { ICreateTool, IUpdateTool } from "./tool.interface";

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
    slug: Joi.string().required(),
    tagline: Joi.string().optional(),
  })
);

export const getToolByIdSchema: ObjectSchema<{ toolId: string }> = Joi.object<{
  toolId: string;
}>({
  toolId: Joi.string().required(),
});

export const updateToolByIdSchema: ObjectSchema<IUpdateTool> =
  Joi.object<IUpdateTool>({
    _id: Joi.string().required(),
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    icon: Joi.string().optional(),
    slug: Joi.string().optional(),
    tagline: Joi.string().optional(),
  });
