import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export const signToken = (payload: object, options?: SignOptions): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h",
    ...options,
  });
};

export const verifyToken = (token: string): { userId: number } => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number };
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("Invalid token");
  }
};
