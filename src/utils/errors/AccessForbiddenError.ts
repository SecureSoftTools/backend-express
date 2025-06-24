import { CustomError } from "./CustomError";

export class AccessForbiddenError extends CustomError {
  statusCode = 403;
  constructor(message: string) {
    super(message);
  }
}
