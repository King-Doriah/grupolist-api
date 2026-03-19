import prisma from "../model/prisma.client";
import type { List, UpList } from "../types";

export const listService = {
  async create(userId: string, listData: List) {
    return await prisma.list.create({
      data: {
        ...listData,
        disponivel: listData.disponivel,
        userId,
        token: crypto.randomUUID().split("-")[0].toUpperCase(),
      },
    });
  },
  async my(userId: string) {
    return await prisma.list.findMany({
      where: {
        userId,
      },
    });
  },
  async byProduto(userId: string, produto: string) {
    return await prisma.list.findMany({
      where: {
        produto,
        userId,
      },
    });
  },
  async byId(listId: string) {},
  async myById(userId: string, listId: string) {
    return await prisma.list.findUnique({
      where: {
        id: listId,
        userId,
      },
    });
  },
  async byUserId(userId: string) {
    return await prisma.list.findMany({
      where: {
        userId,
      },
    });
  },
  async all() {
    return await prisma.list.findMany();
  },
  async search(token: string) {
    return await prisma.list.findFirst({
      where: {
        /*
        OR: [
          { produto: { contains: String(q) } },
          { token: { contains: String(q) } },
        ],
        */
        token,
        disponivel: true,
      },
      include: {
        user: {
          select: {
            id: true,
            nome: true,
            telefone: true,
          },
        },
      },
    });
  },
  async upstatus(userId: string, listId: string, upData: UpList) {
    if (upData.status === "FINISHED") {
      return await prisma.list.update({
        where: {
          id: listId,
          userId: userId,
        },
        data: {
          ...upData,
          disponivel: false,
        },
      });
    }
    return await prisma.list.update({
      where: {
        id: listId,
        userId: userId,
      },
      data: upData,
    });
  },
  async update() {},
};
