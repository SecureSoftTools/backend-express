import MailModel from "../models/mail.model";
import { Types } from "mongoose";

class MailRepository {
  async createMail(data: {
    subject: string;
    content: string;
    usecase: string;
    input: string;
    source?: string;
  }) {
    return await MailModel.create(data);
  }

  async findByUsecase(usecase: string, input: string) {
    return await MailModel.findOne({ usecase, input });
  }

  async incrementUsed(mailId: Types.ObjectId) {
    return await MailModel.findByIdAndUpdate(
      mailId,
      { $inc: { used: 1 } },
      { new: true }
    );
  }

  async getAllMails() {
    return await MailModel.find().sort({ createdAt: -1 });
  }
}

export const mailRepository = new MailRepository();
