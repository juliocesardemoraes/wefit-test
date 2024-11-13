import express from "express";
import "reflect-metadata";
import cors from "cors";
import { AppDataSource } from "./database/data-source.js";
import { userRouter } from "routes/index.js";

const app = express();
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const port = process.env.PORT || 4568;

AppDataSource.initialize()
  .then(async () => {
    console.log("Database working");
  })
  .catch((error) => console.log("DB conn ERROR: ", error));

app.use("/user", userRouter);

app.get("/ping", (req, res) => {
  return res.send("pong");
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
