import { Request, Response } from "express";
import { SnippetType } from "../models/Snippet";
import { Snippet } from "../entities/Snippet";
import { AppDataSource } from "../data-source";

const snippetRepository = AppDataSource.getRepository(Snippet);

export const getSnippets = async (
  req: Request,
  res: Response<SnippetType[]>
) => {
  const snippets = await snippetRepository.find({
    relations: ["user"],
  });

  const safeSnippets: SnippetType[] = snippets.map((snippet) => ({
    id: snippet.id,
    title: snippet.title,
    code: snippet.code,
    message: snippet.message,
    createdAt: snippet.createdAt,
    user_id: snippet.user.id,
  }));
  res.json(safeSnippets);
};

export const getSnippetById = async (
  req: Request<{ id: string }>,
  res: Response<Snippet | { message: string }>
) => {
  const id = parseInt(req.params.id, 10);
  const snippet = await snippetRepository.findOne({
    where: { id },
    relations: ["user"],
  });

  if (!snippet) {
    return res.status(404).json({ message: "Snippet not found" });
  }

  const safeSnippet: SnippetType = {
    id: snippet.id,
    title: snippet.title,
    code: snippet.code,
    message: snippet.message,
    createdAt: snippet.createdAt,
    user_id: snippet.user.id,
  };

  res.json(safeSnippet);
};
