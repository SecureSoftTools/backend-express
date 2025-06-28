import { NextFunction, Request, Response } from "express";
import { IServiceResponse } from "../../utils/interface";

export interface IPackageService {
  getPackages(): Promise<IServiceResponse>;
  getPackageById(packageId: string): Promise<IServiceResponse>;
  createPackage(payload: ICreatePackage): Promise<IServiceResponse>;
  createPackages(payload: ICreatePackage[]): Promise<IServiceResponse>;
}

export interface IPackageController {
  getPackages(req: Request, res: Response, next: NextFunction): Promise<void>;
  getPackageById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  createPackage(req: Request, res: Response, next: NextFunction): Promise<void>;
  createPackages(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}

export interface ICreatePackage {
  name: string;
  description: string;
  version: string;
}
