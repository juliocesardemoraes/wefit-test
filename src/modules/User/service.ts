import { userValidateSchemaRequest, validateRequest } from "./entity.js";

export class UserService {
  async create(bodyData: any) {
    console.log("API BODY", bodyData);
    if (!bodyData) throw new Error("Não existe conteúdo na requisição");

    const validate = await validateRequest(bodyData, userValidateSchemaRequest);
    console.log(validate);

    return validate;
  }
}
