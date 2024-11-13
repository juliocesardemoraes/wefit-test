import { validateRequest } from "../../utils/zod/zod.js";
import { userValidateSchemaRequest } from "./schema/entity.js";
import { AppDataSource } from "../../database/data-source.js";
import { User } from "../../database/entity/User.js";

export class UserService {
  async create(bodyData: any) {
    console.log("API BODY", bodyData);
    if (!bodyData) throw new Error("Não existe conteúdo na requisição");

    // Validação dos dados
    await validateRequest(bodyData, userValidateSchemaRequest);

    const messageRepository = AppDataSource.getRepository(User);

    // Remover checkEmail porque não vai ser inserido no banco
    delete bodyData?.checkEmail;

    await messageRepository.save(bodyData);
  }
}
