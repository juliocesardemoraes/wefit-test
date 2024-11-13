import { AppDataSource } from "../database/data-source.js";
import { app } from "../index.js";
import request from "supertest";
import { generateMockData } from "./mockData.js";

describe("Integration tests", () => {
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

  it("should respond with pong", async () => {
    const response = await request(app).get("/ping");
    expect(response.text).toBe("pong");
  });

  it("should handle POST request to /user and return 400", async () => {
    const response = await request(app).post("/user/create").send({
      name: "Test User",
      email: "testuser@example.com",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toHaveProperty("formErrors");
  });

  it("should handle POST request to /user and insert one user into the database, and it verifies if it was inserted in the database", async () => {
    const fakeData = await generateMockData();
    const response = await request(app).post("/user/create").send(fakeData);
    expect(response.status).toBe(201);

    const responseFromDb = await request(app)
      .get("/user/findOne")
      .query({ email: fakeData.email });

    expect(responseFromDb.status).toBe(200);
  });

  it("should handle POST request to /user and insert ten users", async () => {
    for (let i = 0; i < 10; i++) {
      const fakeData = await generateMockData();
      const response = await request(app).post("/user/create").send(fakeData);
      expect(response.status).toBe(201);
    }
  });
});
