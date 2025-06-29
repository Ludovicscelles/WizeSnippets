import { AppDataSource } from "../data-source";
import { Snippet } from "../entities/Snippet";
import { User } from "../entities/User";
import {
  SnippetType,
  SnippetWithCommentsType,
  SnippetInputType,
} from "../models/Snippet";

export class SnippetService {
  static async getAll(): Promise<SnippetType[]> {
    const snippets = await AppDataSource.getRepository(Snippet).find({
      relations: ["user"],
    });
    return snippets.map(({ id, title, message, code, createdAt, user }) => ({
      id: id,
      title,
      message,
      code,
      createdAt,
      user_id: user.id,
      pseudo: user.pseudo,
      firstname: user.firstname,
    }));
  }

  static async getById(id: number): Promise<SnippetWithCommentsType | null> {
    const snippet = await AppDataSource.getRepository(Snippet).findOne({
      where: { id },
      relations: ["user", "comments", "comments.user"],
    });
    if (!snippet) return null;
    return {
      id: snippet.id,
      title: snippet.title,
      code: snippet.code,
      message: snippet.message,
      createdAt: snippet.createdAt,
      user_id: snippet.user.id,
      pseudo: snippet.user.pseudo,
      firstname: snippet.user.firstname,
      Comments: snippet.comments.map((comment) => ({
        pseudo: comment.user.pseudo || comment.user.firstname || "Anonymous",
        firstname: comment.user.firstname || "Anonymous",
        suggestedCode: comment.suggestedCode,
        message: comment.message,
      })),
    };
  }

  static async create(snippetData: SnippetInputType): Promise<SnippetType> {
    const user = await AppDataSource.getRepository(User).findOneBy({
      id: snippetData.user_id,
    });

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    const snippet = AppDataSource.getRepository(Snippet).create({
      title: snippetData.title,
      message: snippetData.message,
      code: snippetData.code,
      firstname: user.firstname,
      pseudo: user.pseudo,
      user,
    });

    const savedSnippet =
      await AppDataSource.getRepository(Snippet).save(snippet);

    return {
      id: savedSnippet.id,
      title: savedSnippet.title,
      message: savedSnippet.message,
      code: savedSnippet.code,
      createdAt: savedSnippet.createdAt,
      user_id: user.id,
      pseudo: user.pseudo,
      firstname: user.firstname,
    };
  }
}
