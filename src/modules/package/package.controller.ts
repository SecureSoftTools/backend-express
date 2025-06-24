import { Request, Response, NextFunction } from "express";
import ResponseService from "../../utils/response.handler";
import packageService from "./package.service";
import { ICreatePackage, IPackageController } from "./package.interface";

export class PackageController
  extends ResponseService
  implements IPackageController
{
  constructor(private readonly service = packageService) {
    super();
  }

  getPackages = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { message, payload, statusCode } = await this.service.getPackages();
      this.sendResponse(res, statusCode, payload, message);
    } catch (error) {
      next(error);
    }
  };

  createPackages = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: ICreatePackage = req.payload;
      const { message, payload, statusCode } = await this.service.createPackage(
        data
      );
      this.sendResponse(res, statusCode, payload, message);
    } catch (error) {
      next(error);
    }
  };

  createPackage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: ICreatePackage[] = req.payload;
      const { message, payload, statusCode } =
        await this.service.createPackages(data);
      this.sendResponse(res, statusCode, payload, message);
    } catch (error) {
      next(error);
    }
  };
}

const packageController = new PackageController();
export default packageController;
