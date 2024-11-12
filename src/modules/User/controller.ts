import { Request, Response } from "express";
import { UserService } from "./service";

export class UserController {
  public static async create(request: Request, response: Response) {
    try {
      const formData = request.body;
      const service = new UserService();
      const responseFormCreation = await service.create(formData);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";

      response.status(500).send({
        probableError: errorMessage,
        error: "Erro na criação da instância evolution",
      });
    }
  }
}
