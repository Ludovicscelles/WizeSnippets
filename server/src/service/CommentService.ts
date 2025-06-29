import { AppDataSource } from "../data-source";
import { Snippet } from "../entities/Snippet";
import { User } from "../entities/User";
import { Comment } from "../entities/Comment";
import { CommentType, CommentInputType } from "../models/Comment";

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

  static async create(commentData: CommentInputType): Promise<CommentType> {
    const user = await AppDataSource.getRepository(User).findOneBy({
      id: commentData.userId,
    });

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    const snippet = await AppDataSource.getRepository(Snippet).findOneBy({
      id: commentData.snippetId,
    });

    if (!snippet) {
      throw new Error("Snippet non trouvé");
    }

    const comment = AppDataSource.getRepository(Comment).create({
      suggestedCode: commentData.suggestedCode,
      message: commentData.message,
      snippet,
      user,
    });

    const savedComment =
      await AppDataSource.getRepository(Comment).save(comment);

    return {
      id: savedComment.id,
      suggestedCode: savedComment.suggestedCode,
      message: savedComment.message,
      createdAt: savedComment.createdAt,
      userId: user.id,
      snippetId: snippet.id,
    };
  }
}
