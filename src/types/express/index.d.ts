import { Express } from "express";
import { IGetRequestUser } from "../../utils/interface";

declare global {
  namespace Express {
    interface Request {
      payload: any;
      user?: IGetRequestUser;
    }
  }
}
