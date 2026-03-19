import prisma from "../../model/prisma.client";
import { User } from "../../types";
import { passwordHash } from "../../utils/bcrypt";

export const adminService = {
  async create(adminData: User) {
    return await prisma.user.create({
      data: {
        ...adminData,
        level: 2,
        senha: await passwordHash(adminData.senha),
        role: "ADMIN",
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
  async changePassword() {},
};
