import { Request, Response } from "express";
import { LanguageService } from "../service/LanguageService";

export const getLanguages = async (req: Request, res: Response) => {
  try {
    const languages = await LanguageService.getAll();
    res.json(languages);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getLanguageById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid language ID" });
  }

  try {
    const language = await LanguageService.getById(id);
    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }
    res.json(language);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};