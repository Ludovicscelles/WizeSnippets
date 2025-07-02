import jwt, { SignOptions, Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET: Secret = process.env.JWT_SECRET || "dev-secret";

export const signToken = (
  payload: object,
  options?: SignOptions
): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h",
    ...options,
  });
}

export const verifyToken = (token: string): { userId: number } => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number };
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("Invalid token");
  }
}