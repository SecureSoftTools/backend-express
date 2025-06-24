import nodemailer from "nodemailer";

const {
  NODEMAILER_HOST,
  NODEMAILER_PORT,
  NODEMAILER_SENDER_EMAIL,
  NODEMAILER_SENDER_PASSWORD,
} = process.env;

const transporter = nodemailer.createTransport({
  host: NODEMAILER_HOST,
  port: Number(NODEMAILER_PORT),
  secure: false,
  auth: {
    user: NODEMAILER_SENDER_EMAIL,
    pass: NODEMAILER_SENDER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000,
  logger: false,
  debug: false,
});

transporter.verify((error, _success) => {
  if (error) {
    console.error("Error connecting with smtp " + JSON.stringify(error));
  } else {
    console.error("Server is ready to send emails");
  }
});

export { transporter };
