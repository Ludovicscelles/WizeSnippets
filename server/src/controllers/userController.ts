import { RequestHandler } from "express";
import { UserService } from "../service/UserService";

export const getUsers: RequestHandler = async (_req, res) => {
  try {
    const users = await UserService.getAll();
    res.json(users);
  } catch (error) {
    console.info("Erreur récupération des utilisateurs :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

type IdParams = {
  id: string;
};

export const getUserById: RequestHandler<IdParams> = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    res.status(400).json({ message: "Invalid user ID" });
    return;
  }

  try {
    const user = await UserService.getById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    console.info("Erreur récupération utilisateur :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
