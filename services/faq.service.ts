import prisma from "../model/prisma.client";
import { Faq } from "../types";

export const faqService = {
  async create(faqData: Faq) {
    return await prisma.faq.create({
      data: faqData,
    });
  },

  async list() {
    return await prisma.faq.findMany();
  },
};
