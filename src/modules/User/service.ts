import { validateRequest } from "../../utils/zod/zod.js";
import {
  getUserValidateRequest,
  userValidateSchemaRequest,
} from "./schema/entity.js";
import { AppDataSource } from "../../database/data-source.js";
import { User } from "../../database/entity/User.js";

export class UserService {
  async create(bodyData: any) {
    if (!bodyData) throw new Error("Não existe conteúdo na requisição");

    // Validação dos dados
    await validateRequest(bodyData, userValidateSchemaRequest);

    const messageRepository = AppDataSource.getRepository(User);

    // Remover checkEmail porque não vai ser inserido no banco
    delete bodyData?.checkEmail;

    await messageRepository.save(bodyData);
  }

  async findOne(bodyData: { email?: string }) {
    if (!bodyData) throw new Error("Não existe conteúdo na requisição");

    await validateRequest(bodyData, getUserValidateRequest);

    const messageRepository = AppDataSource.getRepository(User);

    return await messageRepository.findOne({
      where: { email: bodyData.email },
    });
  }
}
