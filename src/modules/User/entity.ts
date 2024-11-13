import { z } from "zod";
import { validCNPJ, validCPF } from "./validators.js";

export const userValidateSchemaRequest = z.object({
  tipoPessoa: z.enum(["f", "j"]),
  tipoUsuario: z.enum(["v", "c"]),
  cnpj: z
    .string()
    .optional()
    .refine((cnpj) => {
      return !cnpj || validCNPJ(cnpj);
    }),
  cpf: z.string().refine((cpf) => validCPF(cpf)),
  nome: z.string(),
  celular: z
    .string()
    .regex(
      /^\d{10,11}$/,
      "Custom - Celular deve ter 10 - 11 dígitos (somente números) com DDD"
    ),
  telefone: z
    .string()
    .regex(
      /^\d{10,11}$/,
      "Custom - Telefone deve ter 10 - 11 dígitos (somente números) com DDD"
    ),
  email: z.string().email(),
  checkEmail: z.string().email(),
});
