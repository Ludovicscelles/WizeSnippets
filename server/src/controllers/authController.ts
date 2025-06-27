import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await AppDataSource.getRepository(User).findOneBy({ email });
    if (!user) {
      return res.status(422).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return res.status(422).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "dev-secret",
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        pseudo: user.pseudo,
        firstname: user.firstname,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
