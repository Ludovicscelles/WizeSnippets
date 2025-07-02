import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { PublicUserType, RegisterInput } from "../models/User";
import { hashPassword, verifyPassword } from "../service/utils/hash";
import { signToken } from "./utils/jwt";

export class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<{ token: string; user: PublicUserType }> {
    const user = await AppDataSource.getRepository(User).findOneBy({ email });
    if (!user) {
      throw new Error("Identifiants invalides");
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Identifiants invalides");
    }

    const token = signToken({ userId: user.id }, { expiresIn: "1h" });

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
  ): Promise<{ token: string; user: PublicUserType }> {
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({
      email: userData.email,
    });

    if (existingUser) {
      throw new Error("Email déjà utilisé");
    }

    const hashedPassword = await hashPassword(userData.password);
    const newUser = userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    await userRepository.save(newUser);

    const token = signToken(
      { userId: newUser.id },
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
