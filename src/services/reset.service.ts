import prisma from "../model/prisma.client";

export const resetService = {
  async create(userId: string, token: string) {
    return await prisma.passwordReset.create({
      data: {
        userId,
        token,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
      },
    });
  },
  async byToken(token: string) {
    return await prisma.passwordReset.findUnique({
      where: {
        token,
      },
    });
  },
  async delete(userId: string) {
    return await prisma.passwordReset.deleteMany({
      where: {
        userId,
      },
    });
  },
};
