import { Request, Response } from "express";
import { success, ZodCustomError } from "utils/utils.js";
import { UserService } from "./service.js";

export class UserController {
  public static async create(request: Request, response: Response) {
    try {
      const formData = request.body;
      const service = new UserService();
      const responseFormCreation = await service.create(formData);
      return success(
        response,
        responseFormCreation,
        "Usuário criado com sucesso!",
        201
      );
    } catch (error) {
      if (error instanceof ZodCustomError) {
        return response.status(error.statusCode).send({
          error: error.message,
          erros: error.arrayOfErrors,
        });
      }

      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";

      return response.status(500).send({
        error: "Erro na criação de um usuário",
        probableError: errorMessage,
      });
    }
  }
}
