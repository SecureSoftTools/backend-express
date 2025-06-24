import UserModel from "../models/user.model";
import { Types } from "mongoose";

class UserRepository {
  async createUser(data: {
    name: string;
    email: string;
    password: string;
    image?: string;
  }) {
    return await UserModel.create(data);
  }

  async getUserById(id: string | Types.ObjectId) {
    return await UserModel.findById(id).populate("resume").populate("mail");
  }

  async getUserByEmail(email: string) {
    return await UserModel.findOne({ email });
  }

  async addResumeToUser(userId: string, resumeId: string) {
    return await UserModel.findByIdAndUpdate(
      userId,
      { $push: { resume: resumeId } },
      { new: true }
    );
  }

  async addMailToUser(userId: string, mailId: string) {
    return await UserModel.findByIdAndUpdate(
      userId,
      { $push: { mail: mailId } },
      { new: true }
    );
  }
}

export const userRepository = new UserRepository();
