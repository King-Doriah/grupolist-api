import { z } from "zod";

export const diaSchema = z.object({
  dias: z.number().int().positive().default(30),
});
