import Joi, { ArraySchema, ObjectSchema } from "joi";
import { ICreatePackage } from "./package.interface";

export const createPackageSchema: ObjectSchema<ICreatePackage> =
  Joi.object<ICreatePackage>({
    name: Joi.string().required(),
    description: Joi.string().required(),
    version: Joi.string().required(),
  });

export const createPackagesSchema: ArraySchema<ICreatePackage[]> =
  Joi.array().items(
    Joi.object<ICreatePackage>({
      name: Joi.string().required(),
      description: Joi.string().required(),
      version: Joi.string().required(),
    })
  );

export const getPackageByIdSchema: ObjectSchema<{ packageId: string }> =
  Joi.object<{
    packageId: string;
  }>({
    packageId: Joi.string().required(),
  });
