import express, { Application } from "express";
import "reflect-metadata";
import { userRouter } from "./routes/index.js";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

const swaggerOptions: swaggerJsDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "We fit Documentation",
      version: "1.0.0",
      description: "Documentação da api do projeto",
    },
    servers: [
      {
        url: "http://localhost:4568",
      },
    ],
  },
  apis: ["./src/routes/index.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);

app.get("/ping", (req, res) => {
  return res.send("pong");
});

export { app };
