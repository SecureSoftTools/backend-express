import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
  statusCode = 400;
  constructor(message: string) {
    super(message);
  }
}
