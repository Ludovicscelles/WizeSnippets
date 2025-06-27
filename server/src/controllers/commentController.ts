import { Request, Response } from "express";
import { CommentService } from "../service/CommentService";

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await CommentService.getAll();
    res.json(comments);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCommentById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid comment ID" });
  }

  try {
    const comment = await CommentService.getById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json(comment);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};
