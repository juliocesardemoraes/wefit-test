import { z } from "zod";
import { validCNPJ, validCPF } from "./customvalidator.js";

export const userValidateSchemaRequest = z
  .object({
    tipoPessoa: z.enum(["f", "j"], {
      message:
        "Custom - Deve ser f para pessoa física ou j para pessoa jurídica",
    }),
    tipoUsuario: z.enum(["v", "c"], {
      message: "Custom - Deve ser v para vendedor ou c para comprador",
    }),
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
    cep: z
      .string()
      .regex(/^\d{8}$/, "Custom - Cep deve ter 8 dígitos (somente números)"),
    logradouro: z
      .string()
      .min(1, { message: "Custom - Logradouro não pode ser vazio" }),
    numero: z.string().regex(/^\d+$/, "Custom - Número só pode conter digítos"),
    complemento: z
      .string()
      .regex(/^\d+$/, "Custom - Complemento só pode conter digítos")
      .optional(),
    cidade: z
      .string()
      .min(1, { message: "Custom - Cidade não pode ser vazio" }),
    bairro: z
      .string()
      .min(1, { message: "Custom - Bairro não pode ser vazio" }),
    estado: z
      .string()
      .min(1, { message: "Custom - Estado não pode ser vazio" }),
  })
  .refine(
    (data) => {
      if (data.email !== data.checkEmail) {
        return false;
      }

      if (data.tipoPessoa === "j") {
        return data?.cnpj ? true : false;
      }

      return true;
    },
    {
      message:
        "Custom - Falha na validação. Certifique-se de que o email e a confirmação do email são iguais, Valide caso o tipo de pessoa seja jurídica se o cnpj está preenchido.",
      path: ["checkEmail"],
    }
  );
