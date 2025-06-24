import ResumeModel from "../models/resume.model";
import { Types } from "mongoose";

class ResumeRepository {
  async saveResume(data: { filename: string; url: string }) {
    return await ResumeModel.create(data);
  }

  async getResumeById(id: string | Types.ObjectId) {
    return await ResumeModel.findById(id);
  }

  async deleteResumeById(id: string | Types.ObjectId) {
    return await ResumeModel.findByIdAndDelete(id);
  }

  async getAllResumes() {
    return await ResumeModel.find().sort({ createdAt: -1 });
  }
}

export const resumeRepository = new ResumeRepository();
