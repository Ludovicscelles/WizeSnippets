import { AppDataSource } from "../data-source";
import { Snippet } from "../entities/Snippet";
import { User } from "../entities/User";
import { Language } from "../entities/Languages";
import {
  SnippetType,
  SnippetWithCommentsType,
  SnippetInputType,
} from "../models/Snippet";

const getUserRepository = () => AppDataSource.getRepository(User);
const getLanguageRepository = () => AppDataSource.getRepository(Language);
const getSnippetRepository = () => AppDataSource.getRepository(Snippet);

export class SnippetService {
  static async getAll(): Promise<SnippetType[]> {
    const snippets = await getSnippetRepository().find({
      relations: ["user", "language"],
    });
    return snippets.map(
      ({ id, title, message, code, createdAt, user, language }) => ({
        id,
        title,
        message,
        code,
        createdAt,
        user_id: user.id,
        pseudo: user.pseudo,
        firstname: user.firstname,
        languageId: language.id,
        language: language.name,
      }),
    );
  }

  static async getById(id: number): Promise<SnippetWithCommentsType | null> {
    const snippet = await getSnippetRepository().findOne({
      where: { id },
      relations: ["user", "language", "comments", "comments.user"],
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
      languageId: snippet.language.id,
      language: snippet.language.name,
      Comments: snippet.comments.map((comment) => ({
        id: comment.id,
        pseudo: comment.user.pseudo,
        firstname: comment.user.firstname,
        suggestedCode: comment.suggestedCode,
        message: comment.message,
      })),
    };
  }

  static async create(snippetData: SnippetInputType): Promise<SnippetType> {
    const snippetRepository = getSnippetRepository();

    const user = await getUserRepository().findOneBy({
      id: snippetData.user_id,
    });

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    const language = await getLanguageRepository().findOneBy({
      id: snippetData.languageId,
    });

    if (!language) {
      throw new Error("Langage non trouvé");
    }

    const snippet = snippetRepository.create({
      title: snippetData.title,
      message: snippetData.message,
      code: snippetData.code,
      firstname: user.firstname,
      pseudo: user.pseudo,
      user,
      language,
    });

    const savedSnippet = await snippetRepository.save(snippet);

    return {
      id: savedSnippet.id,
      title: savedSnippet.title,
      message: savedSnippet.message,
      code: savedSnippet.code,
      createdAt: savedSnippet.createdAt,
      user_id: user.id,
      pseudo: user.pseudo,
      firstname: user.firstname,
      languageId: language.id,
      language: language.name,
    };
  }
}
