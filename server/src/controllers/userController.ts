import { Request, Response } from "express";
import { UserService } from "../service/UserService";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAll();
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await UserService.getById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};
