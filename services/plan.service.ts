import prisma from "../model/prisma.client";
import { addDays } from "../utils/funcs";

export const planService = {
  async updateUserPlan(userId: string, dias: number, planExpires: Date) {
    const now = new Date();

    const baseDate = planExpires && planExpires > now ? planExpires : now;
    //console.log({ baseDate });

    const newExpires = addDays(baseDate, dias);
    //console.log({ newExpires });

    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        plan: "PRO",
        planExpires: newExpires,
      },
      select: {
        id: true,
        nome: true,
        telefone: true,
        plan: true,
        planExpires: true,
      },
    });
  },
};
