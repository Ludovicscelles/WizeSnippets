import { Request, Response } from "express";

type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  pseudo: string;
  password: string;
};

const users: User[] = [
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

export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};

export const getUserById = (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(user);
};
