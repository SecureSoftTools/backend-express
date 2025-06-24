import { NextFunction, Request, Response } from "express";
import { ArraySchema } from "joi";
import { PreconditionError } from "../utils/errors/PreconditionError";

export default function validateBulkPayload<T>(schema: ArraySchema<T>) {
  return function (req: Request, _res: Response, next: NextFunction) {
    try {
      const { error, value } = schema.validate(req.body);

      if (error) {
        throw new PreconditionError(error.message.replace(/\"/g, ""));
      }

      // Attach validated payload
      req.payload = value;
      next();
    } catch (error) {
      return next(error);
    }
  };
}
