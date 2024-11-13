import express, { Application } from "express";
import "reflect-metadata";
import { AppDataSource } from "./database/data-source.js";
import { userRouter } from "./routes/index.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
app.use(express.json());
app.use(express.urlencoded());

app.use("/user", userRouter);

app.get("/ping", (req, res) => {
  return res.send("pong");
});

export { app };
