import { z } from "zod";

/*
  id?: string;
  produto: string;
  foto: string;
  status: "OPEN" | "PURCHASED" | "IN_PROCESS" | "FINISHED";
*/

export const createListSchema = z.object({
  produto: z.string().min(3, "Informe pelo menos 3 caracteres."),
  disponivel: z.enum(["true", "false"]).default("false"),
});

export const listIdSchema = z.object({
  id: z.uuid(),
});

export const listUpSchema = z.object({
  status: z
    .enum(["OPEN", "PURCHASED", "ON_PROCESS", "FINISHED"])
    .default("OPEN"),
  disponivel: z.boolean().default(false),
});

export const listTokenSchema = z.object({
  token: z.string().regex(/^[A-Z0-9]{6,10}$/, "Informe um token válido."),
});
