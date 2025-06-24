import Joi, { ObjectSchema } from "joi";
import { ICreatePackage } from "./package.interface";

export const createPackageSchema: ObjectSchema<ICreatePackage> =
  Joi.object<ICreatePackage>({
    name: Joi.string().required(),
    description: Joi.string().required(),
    version: Joi.string().required(),
  });
