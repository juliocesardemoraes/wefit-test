import { z } from "zod";
import { validCNPJ, validCPF } from "./validators.js";
import { translateErrorMessage } from "utils/zod-pt.js";
import { ZodCustomError } from "utils/utils.js";

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

export function validateRequest(data: unknown, requestSchema: any): any {
  const result = requestSchema.safeParse(data);
  let errorsCustomArray: any[] = [];

  if (!result.success) {
    for (let i = 0; i < result.error.issues.length; i++) {
      const error = result.error.issues[i];
      console.log("ERROR", error);
      const mapper = error.path?.[0] ?? "Erro não mapeado";

      const obj: any = {
        [mapper]: translateErrorMessage(error.code, error),
      };

      if (error?.message && error?.message?.includes("Custom - ")) {
        obj.mensagemCustomizada = error?.message?.replace("Custom - ", "");
      }
      errorsCustomArray.push(obj);
    }

    throw new ZodCustomError(
      "Erro na validação dos campos",
      400,
      errorsCustomArray
    );
  }
  return result.data;
}
