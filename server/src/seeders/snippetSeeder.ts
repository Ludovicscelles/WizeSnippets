import { AppDataSource } from "../data-source";
import { Snippet } from "../entities/Snippet";
import { User } from "../entities/User";
import { Language } from "../entities/Languages";
import { userSeeder } from "./userSeeder";
import { LanguageEnum } from "../models/Language";

export const snippetSeeder = async () => {
  const snippetRepository = AppDataSource.getRepository(Snippet);
  const userRepository = AppDataSource.getRepository(User);
  const languageRepository = AppDataSource.getRepository(Language);

  const userRefs = await userSeeder();

  const snippets = [
    {
      title: "Comprendre l'asynchronisme avec async/await",
      code: `
async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
}
fetchData().then(data => console.log(data));`,
      message: "J’ai du mal à comprendre ce qu’il se passe si `fetch` échoue. Est-ce que je dois forcément utiliser un try/catch ?",
      userId: userRefs["user9"],
      languageName: "JavaScript",
      refName: "snippet1",
    },
    {
      title: "Utilisation de la méthode map",
      code: `
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled);`,
      message: "Est-ce que je peux utiliser map sur un objet ?",
      userId: userRefs["user2"],
      languageName: "JavaScript",
      refName: "snippet2",
    },
    {
      title: "Gestion des erreurs avec try/catch",
      code: `
try {
  riskyOperation();
} catch (error) {
  console.error("Erreur :", error.message);
}`,
      message: "Comment puis-je gérer les erreurs de manière plus élégante ?",
      userId: userRefs["user3"],
      languageName: "Python",
      refName: "snippet3",
    },
    {
      title: "Utilisation de la méthode filter",
      code: `
const numbers = [1, 2, 3, 4, 5];
const even = numbers.filter(n => n % 2 === 0);`,
      message: "Est-ce que je peux utiliser filter pour modifier les éléments d'un tableau ?",
      userId: userRefs["user4"],
      languageName: "TypeScript",
      refName: "snippet4",
    },
    {
      title: "Comprendre les closures",
      code: `
function makeCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
const counter = makeCounter();`,
      message: "Comment fonctionnent les closures en JavaScript ?",
      userId: userRefs["user5"],
      languageName: "C++",
      refName: "snippet5",
    },
  ];

  const snippetRefs: Record<string, number> = {};

  for (const { refName, languageName, ...snippetData } of snippets) {
    const user = await userRepository.findOneBy({ id: snippetData.userId });
    const language = await languageRepository.findOneBy({ name: languageName as LanguageEnum });

    if (!user || !language) {
      console.warn(`User ou langage manquant pour le snippet "${snippetData.title}"`);
      continue;
    }

    let snippet = await snippetRepository.findOne({
      where: { title: snippetData.title },
      relations: ["user", "language"],
    });

    if (snippet) {
      snippetRepository.merge(snippet, {
        ...snippetData,
        user,
        language,
      });
      await snippetRepository.save(snippet);
      console.log(`Snippet "${snippetData.title}" mis à jour.`);
    } else {
      snippet = snippetRepository.create({
        ...snippetData,
        user,
        language,
        firstname: user.firstname,
        pseudo: user.pseudo,
        createdAt: new Date(),
      });
      await snippetRepository.save(snippet);
      console.log(`Snippet "${snippetData.title}" créé.`);
    }

    if (refName) {
      snippetRefs[refName] = snippet.id;
    }
  }

  console.log("Seeding des snippets terminé");
  return snippetRefs;
};
export default snippetSeeder;