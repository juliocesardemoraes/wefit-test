import { z } from "zod";
import { validCNPJ } from "./validators.js";

export const messageCheckSchemaRequest = z.object({
  cnpj: z
    .string()
    .optional()
    .refine((cnpj) => {
      return !cnpj || validCNPJ(cnpj);
    }, "Digite um CNPJ válido"),
  cpf: z.string().refine((cpf: string) => {
    if (typeof cpf !== "string") return false;

    cpf = cpf.replace(/[^\d]+/g, "");

    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

    const cpfDigits: number[] = [];
    for (let i = 0; i < 11; i++) {
      cpfDigits.push(parseInt(cpf[i]));
    }

    const rest = (count: number): number => {
      let sum = 0;
      for (let i = 0; i < count - 1; i++) {
        sum += cpfDigits[i] * (count - i);
      }
      return ((sum * 10) % 11) % 10;
    };

    return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
  }, "Digite um CPF válido."),
});
