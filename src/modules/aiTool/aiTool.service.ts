import SMTPTransport from "nodemailer/lib/smtp-transport";
import AIGen from "../../utils/ai-models/generator";
import { IGenerate, IServiceResponse } from "../../utils/interface";
import { transporter } from "../../utils/mailer";
import ResponseService from "../../utils/response.handler";
import { IAiToolService, ISendColdEmail } from "./aiTool.interface";
import { resumeRepository, mailRepository } from "../../database/repository";
import { BadRequestError } from "../../utils/errors";

class AiToolService extends ResponseService implements IAiToolService {
  private aiGen: AIGen;
  constructor(
    private readonly resumeRepo = resumeRepository,
    private readonly mailRepo = mailRepository
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

    const resume = await this.resumeRepo.getResumeById(resumeId);

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
