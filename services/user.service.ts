import prisma from "../model/prisma.client";
import { ChangePassword, User } from "../types";
import { passwordHash, verifyHash } from "../utils/bcrypt";

export const userService = {
  async create(userData: User) {
    return await prisma.user.create({
      data: {
        ...userData,
        plan: "FREE",
        senha: await passwordHash(userData.senha),
      },
      omit: {
        token: true,
        senha: true,
        role: true,
        ativo: true,
        createdAt: true,
      },
    });
  },
  async me(userId: string) {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        lists: true,
      },
      omit: {
        senha: true,
        token: true,
      },
    });
  },
  async all() {
    return await prisma.user.findMany({
      omit: {
        token: true,
        senha: true,
        createdAt: true,
      },
    });
  },
  async update(userId: string, userData: User) {},
  async byId(userId: string) {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  },
  async byEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  },
  async byPhone(telefone: number) {
    return await prisma.user.findUnique({
      where: {
        telefone,
      },
    });
  },
  async byToken(token: string) {
    return await prisma.user.findFirst({
      where: {
        token,
      },
    });
  },
  async accStatus(userId: string, status: boolean) {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ativo: status,
      },
    });
  },
  async accOwnerStatus(status: boolean) {
    return await prisma.user.updateMany({
      where: {
        role: "OWNER",
      },
      data: {
        ativo: status,
      },
    });
  },
  async changePassword(
    userId: string,
    senha: string,
    passData: ChangePassword,
  ) {
    const ok = await verifyHash(passData.password, senha);
    if (!ok) return null;

    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        senha: await passwordHash(passData.newPassword),
      },
    });
  },
  async resetPassword(userId: string, password: string) {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        senha: await passwordHash(password),
      },
    });
  },
};
