import { z } from "zod";

/*
  id?: string;
  nome: string;
  email: string;
  telefone: number;
  senha: string;
*/

export const createUserSchema = z.object({
  nome: z.string().min(3, "Informe um nome de pelo menos 3 caracteres."),
  email: z.email("Informe um E-mail válido."),
  telefone: z.number().positive().int(),
  senha: z.string().min(6, "Informe uma senha de pelo menos 6 caracteres."),
});

export const userIdSchema = z.object({
  id: z.uuid(),
});

export const accStatusSchema = z.object({
  status: z.enum(["true", "false"]),
});

export const changePasswordSchema = z.object({
  password: z.string(),
  newPassword: z
    .string()
    .min(6, "Informe uma senha de pelo menos 6 caracteres."),
});
