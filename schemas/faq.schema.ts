import { z } from "zod";

export const createFaqSchema = z.object({
  pergunta: z.string().min(1, "Informe a pergunta."),
  resposta: z.string().min(1, "Informe a resposta."),
});
