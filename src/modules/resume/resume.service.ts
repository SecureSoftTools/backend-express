import resumeModel from "../../database/models/resume.model";
import { uploadFileToCloudinary } from "../../utils/cloudinary";
import { BadRequestError, InternalServerError } from "../../utils/errors";
import { IPagination, IServiceResponse } from "../../utils/interface";
import ResponseService from "../../utils/response.handler";
import { IResumeService, IUploadResume } from "./resume.interface";

class ResumeService extends ResponseService implements IResumeService {
  constructor(private readonly resumeRepo = resumeModel) {
    super();
  }

  uploadResume = async (
    payload: IUploadResume,
    file: Express.Multer.File | undefined
  ): Promise<IServiceResponse> => {
    const { filename } = payload;

    const resumeExist = await this.resumeRepo.findOne({
      filename,
    });

    if (resumeExist)
      throw new BadRequestError("Resume already exists filename");

    const uploadRes = await uploadFileToCloudinary(file?.path);

    if (!uploadRes) throw new InternalServerError("Something went wrong");

    const resume = await this.resumeRepo.create({
      filename,
      url: uploadRes?.secureUrl,
    });

    return this.serviceResponse(
      200,
      { data: resume },
      "Resume uploaded successfully"
    );
  };

  fetchRankingResume = async (
    pagination: IPagination
  ): Promise<IServiceResponse> => {
    const { skip, take } = pagination;
    const [resume, totalRecords] = await Promise.all([
      this.resumeRepo.find().skip(skip).limit(take).sort({ createdAt: -1 }),
      this.resumeRepo.countDocuments(),
    ]);

    return this.serviceResponse(
      200,
      { data: resume, count: resume.length, totalRecords },
      "Resume fetched successfully"
    );
  };
}

const resumeService = new ResumeService();
export default resumeService;
