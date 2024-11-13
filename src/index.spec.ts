import { AppDataSource } from "./database/data-source.js";
import { app } from "./index.js";
import request from "supertest";

describe("Testes de Integração", () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async () => {
        console.log("Database working");
      })
      .catch((error) => console.log("DB conn ERROR: ", error));
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });
  it("Deve responder com pong", async () => {
    const response = await request(app).get("/ping");
    console.log("RESSS", response.text);
    expect(response.text).toBe("pong");
  });
});
