import { Mail } from "../types";
import env from "../utils/configs";
import transporter from "../utils/nodemailerConfig";

export const mailService = {
  async sendEmail(mailData: Mail) {
    return await transporter.sendMail({
      from: `"Sistema" <${process.env.EMAIL_USER}>`,
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
