import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { UserType } from "../models/User";

const userRepository = AppDataSource.getRepository(User);

export const getUsers = async (req: Request, res: Response<UserType[]>) => {
  const users = await userRepository.find();

  const safeUsers: UserType[] = users.map(
    ({ id, firstname, lastname, email, pseudo }) => ({
      id,
      firstname,
      lastname,
      email,
      pseudo,
    })
  );

  res.json(safeUsers);
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response<UserType | { message: string }>
) => {
  const id = parseInt(req.params.id, 10);
  const user = await userRepository.findOneBy({ id });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const safeUser: UserType = {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    pseudo: user.pseudo,
  };

  res.json(safeUser);
};
