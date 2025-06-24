import SMTPTransport from "nodemailer/lib/smtp-transport";
import AIGen from "../../utils/ai-models/generator";
import { AiTools, IGenerate, IServiceResponse } from "../../utils/interface";
import { transporter } from "../../utils/mailer";
import ResponseService from "../../utils/response.handler";
import { IAiToolService, ISendColdEmail } from "./aiTool.interface";
import { BadRequestError } from "../../utils/errors";
import resumeModel from "../../database/models/resume.model";
import mailModel from "../../database/models/mail.model";

class AiToolService extends ResponseService implements IAiToolService {
  private aiGen: AIGen;
  constructor(
    private readonly resumeRepo = resumeModel,
    private readonly mailRepo = mailModel
  ) {
    super();

    this.aiGen = new AIGen();
  }

  getColdEmailContent = async (
    payload: IGenerate
  ): Promise<IServiceResponse> => {
    const { ai, model, input, usecase } = payload;

    const coldEmailContent = await this.aiGen.generate({
      ai,
      model,
      input,
      usecase,
    });

    return this.serviceResponse(
      200,
      { coldEmailContent },
      "Cold email content generated successfully"
    );
  };

  sendColdEmail = async (
    payload: ISendColdEmail
  ): Promise<IServiceResponse> => {
    const { senderEmail, subject, content, resumeId } = payload;

    const resume = await this.resumeRepo.findById(resumeId);

    if (!resume) throw new BadRequestError("Resume not found");

    const response: SMTPTransport.SentMessageInfo = await transporter.sendMail({
      to: senderEmail,
      subject: subject,
      text: content,
      attachments: [
        {
          filename: resume.filename,
          path: resume.url,
        },
      ],
    });

    if (response && response.messageId) {
      await this.mailRepo.create({
        subject: subject,
        content: content,
        usecase: AiTools.COLD_EMAILER,
        used: 1,
      });
    }

    return this.serviceResponse(
      200,
      { messageId: response.messageId },
      "Cold email sent successfully"
    );
  };
}

const aiToolService = new AiToolService();
export default aiToolService;
