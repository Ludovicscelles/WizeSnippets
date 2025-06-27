import { AppDataSource } from "../data-source";
import { Snippet } from "../entities/Snippet";
import { SnippetType } from "../models/Snippet";

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
      createdAt, // Assuming createdAt is set to current time
      user_id: user.id,
    }));
  }

  static async getById(id: number): Promise<SnippetType | null> {
    const snippet = await AppDataSource.getRepository(Snippet).findOne({
      where: { id },
      relations: ["user"],
    });
    if (!snippet) return null;
    return {
      id: snippet.id,
      title: snippet.title,
      code: snippet.code,
      message: snippet.message,
      createdAt: snippet.createdAt,
      user_id: snippet.user.id,
    };
  }
}
