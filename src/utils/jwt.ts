import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ICreateToken } from "./interface";
import { PreconditionError } from "./errors/PreconditionError";
import { NotAuthorizedError } from "./errors/NotAuthorizedError";
import { BadRequestError } from "./errors";

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) throw new PreconditionError("JWT_SECRET is missing");

export const createToken = (
  payload: ICreateToken,
  options?: jwt.SignOptions
) => {
  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyJwt = (jwtToken: string): jwt.IJwtPayload => {
  try {
    return <jwt.IJwtPayload>jwt.verify(jwtToken, JWT_SECRET!);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new NotAuthorizedError("Token expired!");
    } else if (error instanceof JsonWebTokenError) {
      throw new NotAuthorizedError("Invalid token value");
    }
    throw error;
  }
};
