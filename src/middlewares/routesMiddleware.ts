import { Request, Response, NextFunction } from "express";
import {
  send_400_response,
  send_401_response,
  send_403_response,
  send_404_response,
  send_response,
} from "../utils/response";
import { JsonWebTokenError } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt";
import { jwtErrorResponse } from "../utils/jwtErrors";
import prisma from "../model/prisma.client";
import { userService } from "../services/user.service";

//import { checkUserToken } from "../services/auth.service";

export const verifyUserRoles = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      send_401_response(res, "Acesso proibido. Token necessário");
    }
    try {
      const decoded = verifyToken(token as string) as {
        userId: number | string;
        role: string;
      };
      (req as any).userId = decoded.userId;
      (req as any).userRole = decoded.role;
      //Verificar a verdadeira existência do UserId e do Token no banco de dados
      /*  
      const response: boolean = await checkUserToken(
        (req as any).userId,
        token as string
      );
      if (!response) {
        send_response(
          res,
          "error",
          403,
          "O proprietário do Token informado ou o próprio token não consta no banco de dados.",
          {},
          {}
        );
        return;
      }
*/
      //Verificar a Role de quem autenticqou.
      if (!roles.includes(decoded.role)) {
        send_403_response(
          res,
          `Você não tem permissão para estar aqui. Área restrita para ${roles
            .toString()
            .replace(",", " e ")}`,
        );
        return;
      }
      next();
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        jwtErrorResponse(res, error);
        return;
      }
    }
  };
};

/*
Middleware para sistemas onde usuários pagam planos

Esse middleware serve para verificar
 o tipo de plano que o usuário está a usar
  e caso ele esteja em um plano PRO e já expirou,
   ele volte para o plano FREE
*/
export const checkPlan = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).userId;
    const user = await userService.byId(userId);

    if (!user) {
      send_404_response(res, "Usuário não encontrado.");
      return;
    }

    if (!user.ativo) {
      send_403_response(res, "Esta conta está temporariamente suspensa.");
      return;
    }

    if (
      user.plan === "PRO" &&
      user.planExpires &&
      user.planExpires < new Date()
    ) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          plan: "FREE",
          planExpires: null,
        },
      });
    }

    next();
  };
};

/*
//Liberar apenas em aplicações critícas

export const idempotencyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const key = req.headers["idempotency-key"] as string;
  if (!key) {
    send_400_response(res, "Idempotency Key é necessário.", {});
    return;
  }

  const idempotencyKey = await prisma.idempotencyKey.findUnique({
    where: {
      key: key,
    },
  });
  if (idempotencyKey) return;

  await prisma.idempotencyKey.create({
    data: {
      key,
    },
  });

  next();
};
*/
