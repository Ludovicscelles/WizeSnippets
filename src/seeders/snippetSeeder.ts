import { AppDataSource } from "../data-source";
import { Snippet } from "../entities/Snippet";
import { User } from "../entities/User";

export const snippetSeeder = async () => {
  const snippetRepository = AppDataSource.getRepository(Snippet);
  const userRepository = AppDataSource.getRepository(User);

  const snippets = [
    {
      id: 1,
      title: "Comprendre l'asynchronisme avec async/await",
      code: `
async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
}

fetchData().then(data => console.log(data));
`,
      message:
        "J’ai du mal à comprendre ce qu’il se passe si `fetch` échoue. Est-ce que je dois forcément utiliser un try/catch ?",
      createdAt: new Date(),
      user_id: 11,
    },
    {
      id: 2,
      title: "Utilisation de la méthode map",
      code: `
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
`,
      message: "Est-ce que je peux utiliser map sur un objet ?",
      createdAt: new Date(),
      user_id: 12,
    },
    {
      id: 3,
      title: "Gestion des erreurs avec try/catch",
      code: `
function riskyFunction() {
  try {
    // Code qui peut échouer
    throw new Error("Quelque chose s'est mal passé");
  } catch (error) {
    console.error("Erreur capturée:", error.message);
  }
}
riskyFunction();
`,
      message: "Comment puis-je gérer les erreurs de manière plus élégante ?",
      createdAt: new Date(),
      user_id: 13,
    },
    {
      id: 4,
      title: "Utilisation de la méthode filter",
      code: `
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]
`,
      message:
        "Est-ce que je peux utiliser filter pour modifier les éléments d'un tableau ?",
      createdAt: new Date(),
      user_id: 14,
    },
    {
      id: 5,
      title: "Comprendre les closures",
      code: `
function makeCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
`,
      message: "Comment fonctionnent les closures en JavaScript ?",
      createdAt: new Date(),
      user_id: 15,
    },
  ];

  for (const snippetData of snippets) {
    const user = await userRepository.findOneBy({ id: snippetData.user_id });
    if (!user) {
      console.warn(
        `Utilisateur avec l'ID ${snippetData.user_id} non trouvé pour le snippet ${snippetData.title}`
      );
      continue;
    }

    let snippet = await snippetRepository.findOneBy({
      id: snippetData.id,
    });

    if (snippet) {
      snippetRepository.merge(snippet, {
        title: snippetData.title,
        code: snippetData.code,
        message: snippetData.message,
        createdAt: snippetData.createdAt,
        user: user,
      });

      await snippetRepository.save(snippet);

      console.log(
        `Snippet avec le titre "${snippetData.title}" mis à jour avec succès`
      );
    } else {
      snippet = snippetRepository.create({
        id: snippetData.id,
        title: snippetData.title,
        code: snippetData.code,
        message: snippetData.message,
        createdAt: snippetData.createdAt,
        user: user,
      });
      await snippetRepository.save(snippet);
      console.log(`Snippet avec l'ID ${snippetData.title} créé avec succès`);
    }
    console.log("Seeding des snippets terminé");
  }
  console.log("Vérification des snippets enregistrés en base :");
  const persistedSnippets = await snippetRepository.find({
    relations: ["user"],
  });

  for (const s of persistedSnippets) {
    console.log(`Snippet ${s.id} → user:`, s.user?.id ?? "null");
  }
};
