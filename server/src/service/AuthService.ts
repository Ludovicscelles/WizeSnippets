import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { PublicUserType, RegisterInput } from "../models/User";
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

  static async register(
    userData: RegisterInput
  ): Promise< {token: string; user:PublicUserType}> {
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({ email: userData.email });

    if (existingUser) {
      throw new Error("Email déjà utilisé");
    }

    const hashedPassword = await argon2.hash(userData.password);
    const newUser = userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    await userRepository.save(newUser);

    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET || "dev-secret",
      { expiresIn: "1h" }
    );

    return {
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        pseudo: newUser.pseudo,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
      },
    };
  }
}
