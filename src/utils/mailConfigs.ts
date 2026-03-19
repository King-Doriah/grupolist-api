import nodemailer from "nodemailer";
import env from "./configs";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: env.emailUser,
    pass: env.emailPass,
  },
  connectionTimeout: 5000, // evita travar infinito
});
