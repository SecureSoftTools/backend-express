import { CustomError } from "./CustomError";

export class InternalServerError extends CustomError {
  statusCode = 500;
  constructor(message: string) {
    super(message);
  }
}
