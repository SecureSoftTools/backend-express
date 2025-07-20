import Joi, { ObjectSchema } from "joi";
import { IUploadResume } from "./resume.interface";

export const uploadResumeSchmea: ObjectSchema<IUploadResume> =
  Joi.object<IUploadResume>({
    filename: Joi.string().required(),
    rank: Joi.string().required(),
  });
