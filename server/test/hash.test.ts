import { hashPassword, verifyPassword } from "../src/service/utils/hash";
import { describe, it, expect } from "vitest";

describe("Password Hashing", () => {
  it("should hash a password", async () => {
    const password = "mySecurePassword";
    const hashedPassword = await hashPassword(password);
    expect(hashedPassword).toBeDefined();
    expect(hashedPassword).not.toBe(password); 
  });

  it("should verify a correct password", async () => {
    const password = "mySecurePassword";
    const hashedPassword = await hashPassword(password);
    const isValid = await verifyPassword(password, hashedPassword);
    expect(isValid).toBe(true);
  });

  it("should not verify an incorrect password", async () => {
    const password = "mySecurePassword";
    const wrongPassword = "wrongPassword";
    const hashedPassword = await hashPassword(password);
    const isValid = await verifyPassword(wrongPassword, hashedPassword);
    expect(isValid).toBe(false);
  });
});