import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { UserType } from "../models/User";

const userRepository = AppDataSource.getRepository(User);

const users: UserType[] = [
  {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    email: "john@example.com",
    pseudo: "johndoe",
    password: "password123",
  },
  {
    id: 2,
    firstname: "Jane",
    lastname: "Doe",
    email: "jane@example.com",
    pseudo: "janedoe",
    password: "password456",
  },

  {
    id: 3,
    firstname: "Alice",
    lastname: "Smith",
    email: "alice@example.com",
    pseudo: "alicesmith",
    password: "password789",
  },
  {
    id: 4,
    firstname: "Bob",
    lastname: "Johnson",
    email: "bob@example.com",
    pseudo: "bobjohnson",
    password: "password101",
  },
  {
    id: 5,
    firstname: "Charlie",
    lastname: "Brown",
    email: "charlie@example.com",
    pseudo: "charliebrown",
    password: "password102",
  },
  {
    id: 6,
    firstname: "David",
    lastname: "Miller",
    email: "david@example.com",
    pseudo: "davidmiller",
    password: "password103",
  },
  {
    id: 7,
    firstname: "Emma",
    lastname: "Wilson",
    email: "emma@example.com",
    pseudo: "emmawilson",
    password: "password104",
  },
  {
    id: 8,
    firstname: "Frank",
    lastname: "Taylor",
    email: "frank@example.com",
    pseudo: "franktaylor",
    password: "password105",
  },
  {
    id: 9,
    firstname: "Grace",
    lastname: "Anderson",
    email: "grace@example.com",
    pseudo: "graceanderson",
    password: "password106",
  },
  {
    id: 10,
    firstname: "Henry",
    lastname: "Thomas",
    email: "henry@example.com",
    pseudo: "henrythomas",
    password: "password107",
  },
];

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
