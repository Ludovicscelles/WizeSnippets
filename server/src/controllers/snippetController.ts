import { Request, Response, RequestHandler } from "express";
import { SnippetService } from "../service/SnippetService";

export const getSnippets: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const snippets = await SnippetService.getAll();
    res.json(snippets);
  } catch (e) {
    console.error("Erreur dans getSnippets:", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSnippetById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid snippet ID" });
  }

  try {
    const snippet = await SnippetService.getById(id);
    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }
    res.json(snippet);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createSnippet: RequestHandler = async (
  req: Request<
    {},
    {},
    { title: string; message: string; code: string; languageId: number }
  >,
  res: Response,
) => {
  const { title, message, code, languageId } = req.body;

  if (!req.user) {
    res.status(401).json({ message: "Non autorisé" });
    return;
  }

  try {
    const snippetData = {
      title,
      message,
      code,
      languageId,
      user_id: req.user.id,
    };
    const newSnippet = await SnippetService.create(snippetData);
    res.status(201).json(newSnippet);
  } catch (error) {
    console.error("Erreur création snippet :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
