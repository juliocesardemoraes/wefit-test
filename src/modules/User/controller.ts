import { Request, Response } from "express";
import { success, ZodCustomError } from "../../utils/utils.js";
import { UserService } from "./service.js";
import { QueryFailedError } from "typeorm";

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
      console.error("ERRROR", error);

      let errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";

      if (error instanceof ZodCustomError) {
        return response.status(error.statusCode).send({
          error: error.message,
          probableError: "",
          formErrors: error.arrayOfErrors,
        });
      }

      if (
        error instanceof QueryFailedError &&
        error.message.includes("Duplicate entry")
      ) {
        return response.status(400).send({
          error: "Erro na criação de um usuário",
          probableError:
            "O usuário já existe. Os campos CPF, CNPJ (se fornecido) e e-mail devem ser exclusivos da conta que está querendo criar.",
          formErrors: [],
        });
      }

      return response.status(500).send({
        error: "Erro na criação de um usuário",
        probableError: errorMessage,
        formErrors: [],
      });
    }
  }

  public static async findOne(request: Request, response: Response) {
    try {
      const formData = request.query;
      const service = new UserService();
      const responseFormCreation = await service.findOne(formData);
      return success(
        response,
        responseFormCreation,
        "Usuário pesquisado com sucesso!",
        200
      );
    } catch (error) {
      let errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";

      if (error instanceof ZodCustomError) {
        return response.status(error.statusCode).send({
          error: error.message,
          probableError: "",
          formErrors: error.arrayOfErrors,
        });
      }

      return response.status(500).send({
        error: "Erro na pesquisa de um usuário",
        probableError: errorMessage,
        formErrors: [],
      });
    }
  }
}
