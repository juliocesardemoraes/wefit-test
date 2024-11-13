import { validateRequest } from "utils/zod.js";
import { userValidateSchemaRequest } from "./entity.js";

export class UserService {
  async create(bodyData: any) {
    console.log("API BODY", bodyData);
    if (!bodyData) throw new Error("Não existe conteúdo na requisição");

    const validate = await validateRequest(bodyData, userValidateSchemaRequest);

    return validate;
  }
}
