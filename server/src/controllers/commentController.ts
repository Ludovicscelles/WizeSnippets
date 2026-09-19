import { RequestHandler } from "express";
import { CommentService } from "../service/CommentService";

export const getComments: RequestHandler = async (_req, res) => {
  try {
    const comments = await CommentService.getAll();
    res.json(comments);
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

type IdParams = {
  id: string;
};

export const getCommentById: RequestHandler<IdParams> = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    res.status(400).json({ message: "Invalid comment ID" });
    return;
  }

  try {
    const comment = await CommentService.getById(id);
    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }
    res.json(comment);
  } catch (error) {
    console.error("Erreur récupération du commentaire", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

type CreateCommentBody = {
  suggestedCode: string;
  message: string;
};

export const createComment: RequestHandler<
  IdParams,
  unknown,
  CreateCommentBody
> = async (req, res) => {
  const { suggestedCode, message } = req.body;
  const snippetId = parseInt(req.params.id, 10);

  if (Number.isNaN(snippetId)) {
    res.status(400).json({ message: "Invalid snippet ID" });
    return;
  }

  if (!req.user) {
    res.status(401).json({ message: "Non autorisé" });
    return;
  }

  try {
    const commentData = {
      suggestedCode,
      message,
      snippetId,
      userId: req.user.id,
    };

    const newComment = await CommentService.create(commentData);
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Erreur lors de la création du commentaire :", error);
    res.status(500).json({ message: "Erreur de serveur" });
  }
};
