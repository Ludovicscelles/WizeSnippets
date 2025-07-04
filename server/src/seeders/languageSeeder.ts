import { AppDataSource } from "../data-source";
import { Language } from "../entities/Languages"
import { LanguageEnum } from "../models/Language";  
import { LanguageInputType } from "../models/Language";
import { Snippet } from "../entities/Snippet";


export const languageSeeder = async () => {
  const languageRepository = AppDataSource.getRepository(Language);
  const snippetRepository = AppDataSource.getRepository(Snippet);

  const languages: LanguageInputType[] = [
    { name: LanguageEnum.JAVASCRIPT, description: "Langage de programmation orienté objet et fonctionnel." },
    { name: LanguageEnum.PYTHON, description: "Langage de programmation interprété, orienté objet et dynamique." },
    { name: LanguageEnum.JAVA, description: "Langage de programmation orienté objet, compilé et portable." },
    { name: LanguageEnum.C_SHARP, description: "Langage de programmation orienté objet développé par Microsoft." },
    { name: LanguageEnum.C_PLUS_PLUS, description: "Langage de programmation compilé, orienté objet et procédural." },
    { name: LanguageEnum.RUBY, description: "Langage de programmation interprété, orienté objet et dynamique." },
    { name: LanguageEnum.PHP, description: "Langage de script côté serveur pour le développement web." },
    { name: LanguageEnum.GO, description: "Langage de programmation compilé et concurrent développé par Google." },
    { name: LanguageEnum.SWIFT, description: "Langage de programmation pour le développement iOS et macOS." },
    { name: LanguageEnum.KOTLIN, description: "Langage de programmation moderne pour le développement Android." },
    { name: LanguageEnum.RUST, description: "Langage de programmation système axé sur la sécurité et la performance." },
    { name: LanguageEnum.TYPESCRIPT, description: "Superset typé de JavaScript pour le développement web moderne." },
    { name: LanguageEnum.HTML, description: "Langage de balisage pour structurer le contenu web." },
    { name: LanguageEnum.CSS, description: "Langage de style pour la présentation du contenu web." },
    { name: LanguageEnum.SQL, description: "Langage standard pour interagir avec les bases de données relationnelles." },
    { name: LanguageEnum.BASH, description: "Shell Unix pour l'automatisation des tâches système." }
  ];

  const languageRefs: Record <string, Language> = {};

  for (const lang of languages) {
    let language = await languageRepository.findOneBy({ name: lang.name as LanguageEnum });

    if (!language) {
      language = languageRepository.create(lang);
      await languageRepository.save(language);
    }
    languageRefs[lang.name] = language;
  }

  console.info("Languages seeded:", languageRefs);

  // Update snippets with language objects if needed
  const snippets = await snippetRepository.find({
    relations: ["language"],
  });

  for (const snippet of snippets) {
    const currentLang = snippet.language?.name;
    const fallbackLang = LanguageEnum.JAVASCRIPT;
    const targetLanguage = languageRefs[currentLang ?? fallbackLang];

    if (targetLanguage) {
      snippet.language = targetLanguage;
      await snippetRepository.save(snippet);
    } else {
      console.warn(`Langage introuvable pour le snippet : ${snippet.title}`);
    }
  }

  console.info("Snippets updated with languages");
  return languageRefs;
};



