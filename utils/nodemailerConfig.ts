import nodemailer from "nodemailer";
import env from "./configs";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.emailUser,
    pass: env.emailPass,
  },
  connectionTimeout: 5000, // evita travar infinito
});

export default transporter;
