import { z } from "zod";

export const forgotSchema = z.object({
  email: z.email("Informe um E-mail válido."),
});

export const tokenSchema = z.object({
  token: z.string(),
});

export const passwordSchema = z.object({
  password: z.string().min(6, "Informa uma senha de pelo menos 6 caracteres."),
});
