import { z } from "zod";

export const authSchema = z.object({
  telefone: z.number().positive().int(),
  senha: z.string(),
});

export const refreshSchema = z.object({
  refresh: z.string(),
});
