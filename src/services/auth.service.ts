import prisma from "../model/prisma.client";
import { Auth } from "../types";
import { verifyHash } from "../utils/bcrypt";
import { generateRefreshToken, generateToken } from "../utils/jwt";

export const authService = {
  async login(authData: Auth) {
    const user = await prisma.user.findUnique({
      where: {
        telefone: authData.telefone,
      },
    });
    if (!user) return null;

    const ok = await verifyHash(authData.senha, user.senha);
    if (!ok) return null;

    const token = generateToken(user.id, user.role);
    const refresh = generateRefreshToken(user.id, user.role);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: refresh,
      },
    });

    return {
      user: { id: user.id, nome: user.nome, level: user.level },
      token,
      refresh,
    };
  },
  async refresh(token: string) {
    const user = await prisma.user.findFirst({
      where: {
        token,
      },
    });
    if (!user) return null;

    const newToken = generateToken(user.id, user.role);

    return newToken;
  },
  async logout(userId: string) {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        token: null,
      },
    });
  },
};
