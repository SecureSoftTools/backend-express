import resumeModel from "../../database/models/resume.model";
import { uploadFileToCloudinary } from "../../utils/cloudinary";
import { BadRequestError, InternalServerError } from "../../utils/errors";
import { IServiceResponse } from "../../utils/interface";
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

    return this.serviceResponse(200, resume, "Resume uploaded successfully");
  };
}

const resumeService = new ResumeService();
export default resumeService;
