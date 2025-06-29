import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token manquant ou invalide" });
    return;
  }
  const token = authHeader.split(" ")[1];

  try {

    console.log("Authenticating token:", authHeader);
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "dev-secret"
    ) as { userId: number };

    console.log("Token extait:  ", token);

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
