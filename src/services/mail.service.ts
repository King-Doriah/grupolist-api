import { Mail } from "../types";
import env from "../utils/configs";
import { transporter } from "../utils/mailConfigs";
import { Resend } from "resend";

export const mailService = {
  async sendEmail(mailData: Mail) {
    return await transporter.sendMail({
      from: `"GrupoList" <${process.env.EMAIL_USER}>`,
      to: mailData.to,
      subject: "Recuperação de senha",
      html: `
      <h2>Recuperação de senha</h2>
      <p>Clique no link abaixo:</p>
      <a href="${mailData.link}">${mailData.link}</a>
      <p>Expira em 1 hora</p>
    `,
    });
  },
  async resender(mailData: Mail) {
    const resend = new Resend(env.resend);
    return await resend.emails.send({
      from: `"GrupoList" <${process.env.EMAIL_USER}>`,
      to: mailData.to,
      subject: "Recuperação de senha",
      html: `
      <h2>Recuperação de senha</h2>
      <p>Clique no link abaixo:</p>
      <a href="${mailData.link}">${mailData.link}</a>
      <p>Expira em 1 hora</p>
    `,
    });
  },
};
