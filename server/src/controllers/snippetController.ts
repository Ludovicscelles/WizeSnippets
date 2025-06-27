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
