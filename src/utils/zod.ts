import { ZodCustomError } from "./utils.js";
import { zodTranslatePt } from "./zodPtObject.js";

export const translateErrorMessage = (type: any, data: any) => {
  let stringToReplace = zodTranslatePt?.errors?.[type];

  for (const [key, value] of Object.entries(data)) {
    if (typeof stringToReplace === "string") {
      if (stringToReplace.includes(`{{${key}}}`))
        stringToReplace = stringToReplace.replace(`{{${key}}}`, `${value}`);
    }

    if (
      typeof stringToReplace !== "string" &&
      stringToReplace?.[data?.validation]
    ) {
      stringToReplace = stringToReplace[data.validation];
    }
  }
  return stringToReplace;
};

export function validateRequest(data: unknown, requestSchema: any): any {
  const result = requestSchema.safeParse(data);
  let errorsCustomArray: any[] = [];

  if (!result.success) {
    for (let i = 0; i < result.error.issues.length; i++) {
      const error = result.error.issues[i];
      // console.log("ERROR", error);
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