import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { UserProfileType } from "../models/User";

const getUserRepository = () => AppDataSource.getRepository(User);

export class UserService {
  static async getAll(): Promise<UserProfileType[]> {
    const users = await getUserRepository().find();
    return users.map(({ id, firstname, lastname, pseudo }) => ({
      id,
      firstname,
      lastname,
      pseudo,
    }));
  }

  static async getById(id: number): Promise<UserProfileType | null> {
    const user = await getUserRepository().findOneBy({ id });
    if (!user) return null;
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      pseudo: user.pseudo,
    };
  }
}
