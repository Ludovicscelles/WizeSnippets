import request from "supertest";
import { describe, it, beforeAll, afterAll, afterEach, expect } from "vitest";
import { AppDataSource } from "../src/data-source";
import app from "../src/app";
import { User } from "../src/entities/User";

const timestamp = Date.now();
const testEmail = `test${timestamp}@example.com`;

describe("POST /api/users", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterEach(async () => {
    await AppDataSource.getRepository(User).delete({ email: testEmail });
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("should create a new user", async () => {
    const newUser = {
      firstname: "Test",
      lastname: "User",
      email: testEmail,
      pseudo: `testuser${timestamp}`,
      password: "TestPassword123!",
      confirmPassword: "TestPassword123!",
    };

    const response = await request(app)
      .post("/api/auth/register")
      .send(newUser)
      .expect(201);

    console.log("Response body:", response.body);

    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");

    const user = await AppDataSource.getRepository(User).findOneBy({
      email: newUser.email,
    });
    expect(user).not.toBeNull();
  });
});
