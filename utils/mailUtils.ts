import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { format } from "date-fns";

import logging from "./loggingUtils";

dotenv.config();

const USER = process.env.ETHEREAL_USER;
const PASS = process.env.ETHEREAL_PASSWORD;
const TO_EMAIL = process.env.TO_EMAIL;
const SUBJECT = process.env.EMAIL_SUBJECT;
const BACKUP_FOLDER_PATH = "./temp";

export const sendMail = async () => {
  if (!USER || !PASS) {
    logging.error(
      "Please provide valid credentials for Ethereal Email Service."
    );
    return;
  }

  if (!TO_EMAIL) {
    logging.error("Please provide a valid recipient email address.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "SendinBlue",
    secure: false, // true for 465, false for other ports
    auth: {
      user: USER,
      pass: PASS,
    },
  });

  const todayDate = format(new Date(), "yyyy-MM-dd");

  // Subject of the email
  const emailSubject = `${todayDate} | ${SUBJECT}`;

  logging.info(`Sending email to ${TO_EMAIL}...`);

  const mailOptions = {
    from: USER,
    to: TO_EMAIL,
    subject: emailSubject,
    text: "Backup files are attached.",
    attachments: [
      {
        filename: "mongodb_backup.zip",
        path: `${BACKUP_FOLDER_PATH}/mongodb_backup.zip`,
      },
    ],
  };

  await transporter.sendMail(mailOptions);

  logging.success("Email sent successfully.");
};
