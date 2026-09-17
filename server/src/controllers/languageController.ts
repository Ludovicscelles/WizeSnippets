import { RequestHandler } from "express";
import { LanguageService } from "../service/LanguageService";

export const getLanguages: RequestHandler = async (_req, res) => {
  try {
    const languages = await LanguageService.getAll();
    res.json(languages);
  } catch (error) {
    console.error("Erreur récupération des langages", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

type IdParams = {
  id: string;
};

export const getLanguageById: RequestHandler<IdParams> = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    res.status(400).json({ message: "Invalid language ID" });
    return;
  }

  try {
    const language = await LanguageService.getById(id);
    if (!language) {
      res.status(404).json({ message: "Language not found" });
      return;
    }
    res.json(language);
  } catch (error) {
    console.error("Erreur récupération du langage", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
