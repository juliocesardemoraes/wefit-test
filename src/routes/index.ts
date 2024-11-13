import { Router } from "express";
import { UserController } from "../modules/User/controller.js";

const userRouter = Router();

/**
 * @swagger
 * /user/findOne:
 *   get:
 *     tags:
 *      - User
 *     summary: Find a single user based on email
 *     description: Retrieve details of a specific user by providing their email as a query parameter.
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: The email address of the user to search for.
 *     responses:
 *       201:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário pesquisado com sucesso!"
 *                 data:
 *                   type: object
 *                   description: The user details.
 *       400:
 *         description: Zod validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Validation Error"
 *                 probableError:
 *                   type: string
 *                   example: ""
 *                 formErrors:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Error in finding a user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro na pesquisa de um usuário"
 *                 probableError:
 *                   type: string
 *                   example: "Internal server error or unknown error message"
 *                 formErrors:
 *                   type: array
 *                   items:
 *                     type: string
 */
userRouter.get("/findOne", UserController.findOne);

/**
 * @swagger
 * /user/create:
 *   post:
 *     tags:
 *      - User
 *     summary: Create a new user
 *     description: Adds a new user to the system with the provided data. Fields like CPF, CNPJ (if provided), and email must be unique.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipoPessoa:
 *                 type: string
 *                 description: Indica se é pessoa física (f) ou jurídica (j).
 *                 enum: ["f", "j"]
 *                 example: "f"
 *               tipoUsuario:
 *                 type: string
 *                 description: Indica se é vendedor (v) ou comprador (c).
 *                 enum: ["v", "c"]
 *                 example: "v"
 *               cpf:
 *                 type: string
 *                 description: The CPF (Cadastro de Pessoas Físicas) of the user.
 *                 example: "12345678909"
 *               cnpj:
 *                 type: string
 *                 description: The CNPJ (Cadastro Nacional da Pessoa Jurídica) if applicable.
 *                 example: "12345678000195"
 *               celular:
 *                 type: string
 *                 description: The phone of the user.
 *                 example: "1234567891"
 *               telefone:
 *                 type: string
 *                 description: The phone of the user.
 *                 example: "1234567891"
 *               nome:
 *                 type: string
 *                 description: The name of the user.
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user.
 *                 example: "user@example.com"
 *               checkEmail:
 *                 type: string
 *                 format: email
 *                 description: Confirmação do endereço de email.
 *                 example: "usuario@example.com"
 *               cep:
 *                 type: string
 *                 description: Código postal com 8 dígitos.
 *                 example: "12345678"
 *               logradouro:
 *                 type: string
 *                 description: Nome do logradouro (rua, avenida).
 *                 example: "Rua Exemplo"
 *               numero:
 *                 type: string
 *                 description: Número do endereço.
 *                 example: "123"
 *               complemento:
 *                 type: string
 *                 description: Complemento do endereço (opcional).
 *                 example: "45"
 *               cidade:
 *                 type: string
 *                 description: Nome da cidade.
 *                 example: "São Paulo"
 *               bairro:
 *                 type: string
 *                 description: Bairro da cidade.
 *                 example: "Centro"
 *               estado:
 *                 type: string
 *                 description: Estado (UF).
 *                 example: "SP"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário criado com sucesso!"
 *                 data:
 *                   type: object
 *                   description: Details of the created user.
 *       400:
 *         description: Validation or duplicate entry error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro na criação de um usuário"
 *                 probableError:
 *                   type: string
 *                   example: "O usuário já existe. Os campos CPF, CNPJ (se fornecido) e e-mail devem ser exclusivos da conta que está querendo criar."
 *                 formErrors:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Generic server error in creating a user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro na criação de um usuário"
 *                 probableError:
 *                   type: string
 *                   example: "Internal server error or unknown error message"
 *                 formErrors:
 *                   type: array
 *                   items:
 *                     type: string
 */
userRouter.post("/create", UserController.create);

export { userRouter };
