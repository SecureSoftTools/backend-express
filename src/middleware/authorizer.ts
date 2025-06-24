import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { NotAuthorizedError, AccessForbiddenError } from "../utils/errors";
import { verifyJwt } from "../utils/jwt";
import { userRepository } from "../database/repository";

export default function authorizer() {
  return async function (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const bearerToken = req.headers["authorization"];

      if (!bearerToken) {
        throw new NotAuthorizedError("Missing header");
      }
      if (!bearerToken.startsWith("Bearer ")) {
        throw new NotAuthorizedError("Missing header");
      }

      const tokenValue = bearerToken.split(" ")[1];

      if (!tokenValue) {
        throw new NotAuthorizedError("Authorization token not found.");
      }

      const decodedData = verifyJwt(tokenValue);
      const { id, name, email } = decodedData;

      const user = await userRepository.getUserById(id);

      if (!user) {
        throw new AccessForbiddenError("User not found");
      }

      req.user = { id, name, email };
      next();
    } catch (error) {
      next(error);
    }
  };
}
