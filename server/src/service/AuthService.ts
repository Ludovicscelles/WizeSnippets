import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { PublicUserType } from "../models/User";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<{ token: string; user: PublicUserType }> {
    const user = await AppDataSource.getRepository(User).findOneBy({ email });
    if (!user) {
      throw new Error("Identifiants invalides");
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new Error("Identifiants invalides");
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "dev-secret",
      { expiresIn: "1h" }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        pseudo: user.pseudo,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    };
  }
}
