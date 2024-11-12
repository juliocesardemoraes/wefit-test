import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./database/data-source";

const app = express();

const port = process.env.PORT || 4568;

AppDataSource.initialize()
  .then(async () => {
    console.log("Database working");
  })
  .catch((error) => console.log("DB conn ERROR: ", error));

app.get("/ping", (req, res) => {
  return res.send("pong");
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
