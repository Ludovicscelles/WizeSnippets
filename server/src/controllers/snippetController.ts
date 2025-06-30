import { Request, Response } from "express";
import { SnippetService } from "../service/SnippetService";

export const getSnippets = async (req: Request, res: Response) => {
  try {
    const snippets = await SnippetService.getAll();
    res.json(snippets);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSnippetById = async (
  req: Request<{ id: string }>,
  res: Response
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

export const createSnippet = async (
  req: Request<{}, {}, { title: string; message: string; code: string, languageId: number }>,
  res: Response
) => {
  const { title, message, code } = req.body;

  if (!title || !message || !code) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!req.user) {
    return res.status(401).json({ message: "Non autorisé" });
  }

  try {
    const snippetData = {
      title,
      message,
      code,
      languageId: req.body.languageId || 1, // Default to a language ID if not provided
      user_id: req.user.id, // Assuming req.user is set by authentication middleware
    };
    const newSnippet = await SnippetService.create(snippetData);
    res.status(201).json(newSnippet);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};


