import { AppDataSource } from "../data-source";
import { LanguageType, LanguageInputType } from "../models/Language";
import { Language } from "../entities/Languages";

export class LanguageService {
  static async getAll(): Promise<LanguageType[]> {
    const languages = await AppDataSource.getRepository(Language).find({
      relations: ["snippets"],
    });
    return languages.map(({ id, name, description, icon, snippets }) => ({
      id,
      name,
      description,
      icon,
      snippetIds: snippets.map(snippet => snippet.id), 
    }));
  }

  static async getById(id: number): Promise<LanguageType | null> {
    const language = await AppDataSource.getRepository(Language).findOne({
      where: {id},
      relations: ["snippets"],
    });
    if (!language) return null;
    return {
      id: language.id,
      name: language.name,
      description: language.description,
      icon: language.icon,
      snippetIds: language.snippets.map(snippet => snippet.id),
    };
  }
}
