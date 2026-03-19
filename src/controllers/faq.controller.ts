import { Request, Response } from "express";
import { createFaqSchema } from "../schemas/faq.schema";
import {
  send_200_response,
  send_201_response,
  send_404_response,
  send_response_error,
  send_zod_response_error,
} from "../utils/response";
import { faqService } from "../services/faq.service";

export const faqController = {
  async create(req: Request, res: Response) {
    const faqData = createFaqSchema.safeParse(req.body);
    if (faqData.error) {
      send_zod_response_error(res, faqData.error);
      return;
    }
    try {
      const faq = await faqService.create(faqData.data);
      if (faq) {
        send_201_response(res, "Faq criada com sucesso.", faq);
      }
    } catch (error) {
      send_response_error(res, error);
    }
  },
  async list(_: Request, res: Response) {
    try {
      const faqs = await faqService.list();
      if (Object.keys(faqs).length < 1) {
        send_404_response(res, "Nenhuma FAQ's encontrada.");
        return;
      }
      send_200_response(res, "Todas as FAQ's encontradas.", faqs);
    } catch (error) {
      send_response_error(res, error);
    }
  },
};
