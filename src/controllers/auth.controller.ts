import { Request, Response } from "express";
import { authSchema, refreshSchema } from "../schemas/auth.schema";
import {
  send_200_response,
  send_400_response,
  send_401_response,
  send_403_response,
  send_404_response,
  send_500_response,
  send_response_error,
  send_zod_response_error,
} from "../utils/response";
import { authService } from "../services/auth.service";
import { sendWithRetry, verifyPhoneNumber } from "../utils/funcs";
import { userService } from "../services/user.service";
import { resetService } from "../services/reset.service";
import token from "../utils/secretKey";
import env from "../utils/configs";
import { mailService } from "../services/mail.service";
import {
  forgotSchema,
  passwordSchema,
  tokenSchema,
} from "../schemas/reset.schema";

export const authController = {
  async login(req: Request, res: Response) {
    const authData = authSchema.safeParse(req.body);
    if (authData.error) {
      send_zod_response_error(res, authData.error);
      return;
    }
    try {
      if (verifyPhoneNumber(res, authData.data.telefone)) {
        const isOn = await userService.byPhone(authData.data.telefone);
        if (isOn) {
          if (isOn.ativo) {
            const auth = await authService.login(authData.data);
            if (auth) {
              send_200_response(res, "Login feito com sucesso", auth);
              return;
            }
            send_401_response(res, "Credenciais inválidas");
            return;
          }
          send_403_response(res, "Esta conta está temporariamente suspensa.");
          return;
        }
        send_404_response(res, "Conta não encontrada.");
        return;
      }
      send_400_response(
        res,
        "Informe um número com 9 digitos corretos. Ex: 9XXXXXXXX",
        {},
      );
    } catch (error) {
      send_response_error(res, error);
    }
  },
  async refresh(req: Request, res: Response) {
    const tokenData = refreshSchema.safeParse(req.body);
    if (tokenData.error) {
      send_zod_response_error(res, tokenData.error);
      return;
    }
    try {
      const user = await userService.byToken(tokenData.data.refresh);
      if (user) {
        if (user.ativo === true) {
          const token = await authService.refresh(tokenData.data.refresh);
          if (token) {
            send_200_response(res, "Refresh Token feito com sucesso.", {
              token,
            });
            return;
          }
          send_401_response(
            res,
            "Refresh Token inválido. Faça Login novamente.",
          );
        } else {
          send_403_response(res, "Esta conta está temporariamente suspensa.");
        }
      }
      send_404_response(res, "Usuário não encontrado.");
    } catch (error) {
      send_response_error(res, error);
    }
  },
  async forgotPassword(req: Request, res: Response) {
    const forgotData = forgotSchema.safeParse(req.body);
    if (forgotData.error) {
      send_zod_response_error(res, forgotData.error);
      return;
    }
    try {
      const user = await userService.byEmail(forgotData.data.email);
      if (!user) {
        send_200_response(
          res,
          "Se o email existir, enviaremos instruções.",
          {},
        );
        return;
      }

      if (!user.ativo) {
        send_403_response(res, "Esta conta está temporariamente suspensa.");
        return;
      }

      await resetService.delete(user.id);

      const reset = await resetService.create(user.id, token);
      if (!reset) {
        send_500_response(res, "Não foi possível continuar a operação...");
        return;
      }

      const link = `${env.frontUrl}/reset-password/${token}`;
      const data = {
        to: user.email as string,
        link,
      };
      /*
      const mail = await sendWithRetry(mailService.sendEmail(data));
      if (mail.response.includes("250 2.0.0 OK")) {
        send_200_response(res, "E-mail enviado com sucesso.", {});
        return;
      }
      */
      const mail = await mailService.resender(data);
      if (mail) {
        send_200_response(res, "E-mail enviado com sucesso.", {});
        return;
      }
      send_500_response(res, "Falha ao enviar E-mail de recuperação");
      await resetService.delete(user.id);
    } catch (error) {
      send_response_error(res, error);
    }
  },
  async resetPassword(req: Request, res: Response) {
    const tokenData = tokenSchema.safeParse(req.params);
    if (tokenData.error) {
      send_zod_response_error(res, tokenData.error);
      return;
    }

    const passwordData = passwordSchema.safeParse(req.body);
    if (passwordData.error) {
      send_zod_response_error(res, passwordData.error);
      return;
    }

    try {
      const reset = await resetService.byToken(tokenData.data.token);
      if (!reset) {
        send_400_response(res, "Token inválido.", {});
        return;
      }

      if (reset.expiresAt < new Date()) {
        send_400_response(res, "Token expirado.", {});
        return;
      }

      const updated = await userService.resetPassword(
        reset.userId,
        passwordData.data.password,
      );

      if (updated) {
        if (await resetService.delete(reset.userId)) {
          send_200_response(res, "Senha redefinida com sucesso.", {});
          return;
        }
      }

      send_500_response(res, "Ocorreu um erro ao redefinir a senha.");
    } catch (error) {
      send_response_error(res, error);
    }
  },

  async logout(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const deleted = await authService.logout(userId);
      if (deleted) {
        send_200_response(res, "Logout feito com sucesso. Volte sempre :)", {});
        return;
      }
      send_500_response(res, "Erro ao fazer logout...");
    } catch (error) {
      send_response_error(res, error);
    }
  },
};
