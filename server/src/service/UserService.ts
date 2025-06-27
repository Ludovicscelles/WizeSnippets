import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { PublicUserType } from "../models/User";

export class UserService {
  static async getAll(): Promise<PublicUserType[]> {
    const users = await AppDataSource.getRepository(User).find();
    return users.map(({ id, firstname, lastname, email, pseudo }) => ({
      id,
      firstname,
      lastname,
      email,
      pseudo,
    }));
  }

  static async getById(id: number): Promise<PublicUserType | null> {
    const user = await AppDataSource.getRepository(User).findOneBy({ id });
    if (!user) return null;
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      pseudo: user.pseudo,
    };
  }
}
