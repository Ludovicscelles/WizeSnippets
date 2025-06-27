import { AppDataSource } from "../data-source";
import { Snippet } from "../entities/Snippet";
import { Comment } from "../entities/Comment";
import { CommentType } from "../models/Comment";

export class CommentService {
  static async getAll(): Promise<CommentType[]> {
    const comments = await AppDataSource.getRepository(Comment).find({
      relations: ["user", "snippet"],
    });
    return comments.map(
      ({ id, suggestedCode, message, createdAt, user, snippet }) => ({
        id,
        suggestedCode,
        message,
        createdAt,
        userId: user.id,
        snippetId: snippet.id,
      })
    );
  }

  static async getById(id: number): Promise<CommentType | null> {
    const comment = await AppDataSource.getRepository(Comment).findOne({
      where: { id },
      relations: ["user", "snippet"],
    });
    if (!comment) return null;
    return {
      id: comment.id,
      suggestedCode: comment.suggestedCode,
      message: comment.message,
      createdAt: comment.createdAt,
      userId: comment.user.id,
      snippetId: comment.snippet.id,
    };
  }
}
