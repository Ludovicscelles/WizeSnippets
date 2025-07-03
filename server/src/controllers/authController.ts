import { Request, Response } from "express";
import { AuthService } from "../service/AuthService";

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

export const register = async (req: Request, res: Response) => {
  try {
    const { confirmPassword, ...userData } = req.body;

    const { token, user } = await AuthService.register(userData);


    return res.status(201).json({
      message: "Inscription réussie",
      token,
      user,
    });
  } catch (error: any) {
    console.error("Erreur inscription", error);
    return res
      .status(400)
      .json({ message: error.message || "Erreur d'inscription" });
  }
};
