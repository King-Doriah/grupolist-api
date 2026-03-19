import { Request, Response } from "express";
import { changePasswordSchema, createUserSchema } from "../schemas/user.schema";
import {
  send_200_response,
  send_201_response,
  send_204_response,
  send_400_response,
  send_401_response,
  send_403_response,
  send_404_response,
  send_response_error,
  send_zod_response_error,
} from "../utils/response";
import { userService } from "../services/user.service";
import { verifyPhoneNumber } from "../utils/funcs";

export const userController = {
  async create(req: Request, res: Response) {
    const userData = createUserSchema.safeParse(req.body);
    if (userData.error) {
      send_zod_response_error(res, userData.error);
      return;
    }

    try {
      if (verifyPhoneNumber(res, userData.data.telefone)) {
        const user = await userService.create(userData.data);
        if (user) {
          send_201_response(res, "Usuário criado com sucesso.", user);
        }
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

  async me(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const user = await userService.me(userId);
      if (user) {
        send_200_response(res, "Meus dados", user);
        return;
      }
      send_404_response(res, "Usuário não encontrado.");
    } catch (error) {
      send_response_error(res, error);
    }
  },

  async changePassword(req: Request, res: Response) {
    const changeData = changePasswordSchema.safeParse(req.body);
    if (changeData.error) {
      send_zod_response_error(res, changeData.error);
      return;
    }
    try {
      const userId = (req as any).userId;
      const user = await userService.byId(userId);
      if (!user) {
        send_404_response(res, "Usuário não encontrado.");
        return;
      }

      if (user.ativo) {
        const changed = await userService.changePassword(
          user.id,
          user.senha,
          changeData.data,
        );
        if (changed) {
          send_204_response(res);
          return;
        }
        send_401_response(res, "Credenciais inválidas.");
        return;
      }
      send_403_response(res, "Esta conta está temporariamente suspensa.");
    } catch (error) {
      send_response_error(res, error);
    }
  },
};
