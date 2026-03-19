import nodemailer from "nodemailer";
import env from "./configs";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: env.brevoUser,
    pass: env.brevoPass,
  },
  connectionTimeout: 5000, // evita travar infinito
});
