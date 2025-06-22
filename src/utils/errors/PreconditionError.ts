import { CustomError } from "./CustomError";

export class PreconditionError extends CustomError {
  statusCode = 412;
  constructor(message: string) {
    super(message);
  }
}
