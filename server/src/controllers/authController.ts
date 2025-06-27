import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { AuthService } from "../service/AuthService";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { token, user } = await AuthService.login(email, password);

    res.status(200).json({
      message: "Connexion réussie",
      token,
      user,
    });
  } catch (error: any) {
    console.error("Erreur login", error);
    res
      .status(401)
      .json({ message: error.message || "Identifiants invalides" });
  }
};
