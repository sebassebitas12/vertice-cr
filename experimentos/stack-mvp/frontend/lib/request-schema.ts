import { z } from "zod";

export const requestSchema = z.object({
  productId: z.string().optional(),
  description: z.string().trim().min(1, "Describe la pieza que necesitas.").max(1000, "Usa un máximo de 1000 caracteres."),
  useCase: z.string().trim().min(1, "Cuéntanos para qué se usará.").max(500, "Usa un máximo de 500 caracteres."),
  quantity: z.number().int("Usa una cantidad entera.").min(1, "La cantidad mínima es 1.").max(1000, "La cantidad máxima es 1000."),
  preferredMaterial: z.enum(["", "ASA", "PLA", "PETG", "ABS", "TPU"]).optional(),
});

export type RequestFormValues = {
  productId: string;
  description: string;
  useCase: string;
  quantity: number;
  preferredMaterial: "" | "ASA" | "PLA" | "PETG" | "ABS" | "TPU";
};
