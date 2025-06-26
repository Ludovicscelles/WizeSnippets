import { AppDataSource } from "../data-source";
import { Comment } from "../entities/Comment";
import { User } from "../entities/User";
import { Snippet } from "../entities/Snippet";
import { snippetSeeder } from "./snippetSeeder";
import { userSeeder } from "./userSeeder";

export const commentSeeder = async () => {
  const commmentRepository = AppDataSource.getRepository(Comment);
  const userRepository = AppDataSource.getRepository(User);
  const snippetRepository = AppDataSource.getRepository(Snippet);

  const userRefs = await userSeeder();
  const snippetRefs = await snippetSeeder();

  const comments = [
    {
      suggestedCode: `
  async function fetchData() {
    try {
      const response = await fetch('https://api.example.com/data');
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Une erreur est survenue :", error);
      return null;
    }
  }
  
  fetchData().then(data => {
    if (data) {
      console.log(data);
    } else {
      console.log("Aucune donnée récupérée.");
    }
  });
  `,
      message:
        "Oui, pour bien gérer les erreurs (réseau, parsing, etc.), l’usage de `try/catch` est recommandé avec `async/await`. Cela te permet d’avoir un comportement contrôlé si quelque chose échoue.",
      createdAt: new Date(),
      snippetId: userRefs["snippet1"],
      userId: userRefs["user2"],
      refName: "snippet1",
    },
    {
      suggestedCode: `
  const numbers = [1, 2, 3, 4, 5];
  const doubled = numbers.map(num => num * 2);
  console.log(doubled); // [2, 4, 6, 8, 10]
  `,
      message:
        "Non, `map` est une méthode des tableaux et ne peut pas être utilisée directement sur un objet. Tu peux convertir un objet en tableau avec `Object.values()` ou `Object.entries()` avant d'utiliser `map`.",
      createdAt: new Date(),
      snippetId: userRefs["snippet2"],
      userId: userRefs["user3"],
      refName: "snippet2",
    },
    {
      suggestedCode: `
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
      message:
        "Pour une gestion plus élégante des erreurs, tu peux utiliser des classes d'erreur personnalisées ou des bibliothèques comme `winston` pour la journalisation. Cela  te permet de mieux structurer et gérer les erreurs dans ton application.",
      createdAt: new Date(),
      snippetId: userRefs["snippet3"],
      userId: userRefs["user4"],
      refName: "snippet3",
    },
    {
      suggestedCode: `
  const numbers = [1, 2, 3, 4, 5];
  const evenNumbers = numbers.filter(num => num % 2 === 0);
  console.log(evenNumbers); // [2, 4]
  `,
      message:
        "Non, `filter` est utilisé pour créer un nouveau tableau avec les éléments qui passent un test spécifique. Si tu veux modifier les éléments, tu devrais utiliser `map`. Par exemple, si tu veux doubler les nombres pairs, tu peux combiner `filter` et `map` comme ceci :\n\n```javascript\nconst doubledEvenNumbers = numbers.filter(num => num % 2 === 0).map(num => num * 2);\nconsole.log(doubledEvenNumbers); // [4, 8]\n```",
      createdAt: new Date(),
      snippetId: userRefs["snippet4"],
      userId: userRefs["user5"],
      refName: "snippet4",
    },
    {
      suggestedCode: `
  const numbers = [1, 2, 3, 4, 5];
  const oddNumbers = numbers.filter(num => num % 2 !== 0);
  console.log(oddNumbers); // [1, 3, 5]
  `,
      message:
        "Oui, tu peux utiliser `filter` pour créer un nouveau tableau contenant uniquement les nombres impairs. La méthode `filter` crée un nouveau tableau avec tous les éléments qui passent le test implémenté par la fonction fournie. Dans cet exemple, la fonction teste si chaque nombre est impair en vérifiant si le reste de la division par 2 n'est pas égal à 0.",
      createdAt: new Date(),
      snippetId: userRefs["snippet5"],
      userId: userRefs["user6"],
      refName: "snippet5",
    },
  ];
  const commentRefs: Record<string, number> = {};

  for (const { refName, ...commentData } of comments) {
    const user = await userRepository.findOneBy({
      id: commentData.userId,
    });
    const snippet = await snippetRepository.findOneBy({
      id: commentData.snippetId,
    });
    if (!user) {
      console.warn(
        `Utilisateur avec l'ID ${commentData.userId} non trouvé pour le commentaire`
      );
      continue;
    }
    if (!snippet) {
      console.warn(
        `Snippet avec l'ID ${commentData.snippetId} non trouvé pour le commentaire`
      );
      continue;
    }
    let comment = await commmentRepository.findOne({
      where: {
        suggestedCode: commentData.suggestedCode,
        user: { id: commentData.userId },
        snippet: { id: commentData.snippetId },
      },
    });
    if (comment) {
      commmentRepository.merge(comment, {
        suggestedCode: commentData.suggestedCode,
        message: commentData.message,
        createdAt: commentData.createdAt,
      });
      await commmentRepository.save(comment);
      console.log(`Commentaire avec l'ID ${comment.id} mis à jour avec succès`);
    } else {
      comment = commmentRepository.create({
        ...commentData,
        user: user,
        snippet: snippet,
      });
      await commmentRepository.save(comment);
      console.log(`Commentaire avec l'ID ${comment.id} créé avec succès`);
    }
    if (refName) {
      commentRefs[refName] = comment.id;
    }
  }
  console.log("Commentaires insérés avec succès");
  return commentRefs;
};
