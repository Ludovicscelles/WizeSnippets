import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: "Token manquant" });
    return;
  }

  try {
    if (process.env.NODE_ENV === "development") {
      console.info("Authenticating token...");
    }

    const decoded = verifyToken(token);

    const user = await AppDataSource.getRepository(User).findOneBy({
      id: decoded.userId,
    });
    if (!user) {
      res.status(401).json({ message: "Utilisateur non trouvé" });
      return;
    }
    req.user = {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      pseudo: user.pseudo,
    };
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Token invalide" });
  }
};
