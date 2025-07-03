import { signToken, verifyToken } from "../src/service/utils/jwt";
import { describe, it, expect } from "vitest";

describe("JWT Utility Functions", {}, () => {
  it("should sign and verify a token", () => {
    const payload = { userId: 1 };
    const token = signToken(payload, { expiresIn: "1h" });

    expect(token).toBeDefined();
    const decoded = verifyToken(token) as { userId: number };
    expect(decoded).toMatchObject(payload);
  });

  it("should throw an error for an invalid token", () => {
    const invalidToken = "invalid.token.string";
    expect(() => verifyToken(invalidToken)).toThrow("Invalid token");
  });
});
