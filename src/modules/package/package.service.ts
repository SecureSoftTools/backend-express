import ResponseService from "../../utils/response.handler";
import { IServiceResponse } from "../../utils/interface";
import { ICreatePackage, IPackageService } from "./package.interface";
import packageModel from "../../database/models/package.model";
import { Types } from "mongoose";
import { BadRequestError } from "../../utils/errors";

class PackageService extends ResponseService implements IPackageService {
  constructor(private readonly packageRepo = packageModel) {
    super();
  }

  getPackages = async (): Promise<IServiceResponse> => {
    const [packages, totalRecords] = await Promise.all([
      this.packageRepo.find().sort({ createdAt: -1 }),
      this.packageRepo.countDocuments(),
    ]);
    return this.serviceResponse(
      200,
      { data: packages, count: packages.length, totalRecords },
      "Packages fetched successfully"
    );
  };

  getPackageById = async (packageId: string): Promise<IServiceResponse> => {
    const packageData = await this.packageRepo.findOne({
      _id: new Types.ObjectId(packageId),
    });

    if (!packageData) throw new BadRequestError("No package found by id");

    return this.serviceResponse(
      200,
      { data: packageData },
      "Package fetched successfully"
    );
  };

  createPackage = async (
    payload: ICreatePackage
  ): Promise<IServiceResponse> => {
    await this.packageRepo.create(payload);

    return this.serviceResponse(200, {}, "Package created successfully");
  };

  createPackages = async (
    payload: ICreatePackage[]
  ): Promise<IServiceResponse> => {
    await this.packageRepo.insertMany(payload);

    return this.serviceResponse(200, {}, "Packages created successfully");
  };
}

const packageService = new PackageService();
export default packageService;
