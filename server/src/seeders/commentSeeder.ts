import { AppDataSource } from "../data-source";
import { Comment } from "../entities/Comment";
import { User } from "../entities/User";
import { Snippet } from "../entities/Snippet";
import { snippetSeeder } from "./snippetSeeder";
import { userSeeder } from "./userSeeder";

export const commentSeeder = async () => {
  const commentRepository = AppDataSource.getRepository(Comment);
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
        "Oui, pour bien gérer les erreurs (réseau, parsing, etc.), l’usage de try/catch est recommandé avec async/await. Cela te permet d’avoir un comportement contrôlé si quelque chose échoue.",
      createdAt: new Date(),
      snippetId: snippetRefs["snippet1"],
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
        "Non, map est une méthode des tableaux et ne peut pas être utilisée directement sur un objet. Tu peux convertir un objet en tableau avec Object.values() ou Object.entries() avant d'utiliser map.",
      createdAt: new Date(),
      snippetId: snippetRefs["snippet2"],
      userId: userRefs["user3"],
      refName: "snippet2",
    },
    {
      suggestedCode: `
import logging

logging.basicConfig(level=logging.ERROR)

class CustomError(Exception):
    pass

def risky_operation():
    raise CustomError("Quelque chose s'est mal passé")

try:
    risky_operation()
except CustomError as error:
    logging.error("Erreur capturée: %s", error)
`,
      message:
        "Pour une gestion plus élégante des erreurs en Python, tu peux utiliser des classes d'exception personnalisées et le module `logging` pour une journalisation structurée. Cela améliore la lisibilité et la maintenabilité de ton application.",
      createdAt: new Date(),
      snippetId: snippetRefs["snippet3"],
      userId: userRefs["user4"],
      refName: "snippet3",
    },
    {
      suggestedCode: `
const numbers: number[] = [1, 2, 3, 4, 5];
const evenNumbers: number[] = numbers.filter((num: number) => num % 2 === 0);
console.log(evenNumbers); // [2, 4]
`,
      message:
        "Non, `filter` est utilisé pour créer un nouveau tableau contenant uniquement les éléments qui passent un test. Si tu veux modifier les éléments, utilise plutôt `map`. Par exemple :\n\n```ts\nconst doubledEvenNumbers: number[] = numbers\n  .filter((num: number) => num % 2 === 0)\n  .map((num: number) => num * 2);\nconsole.log(doubledEvenNumbers); // [4, 8]\n```",
      createdAt: new Date(),
      snippetId: snippetRefs["snippet4"],
      userId: userRefs["user5"],
      refName: "snippet4",
    },
    {
      suggestedCode: `
#include <iostream>
#include <functional>

std::function<int()> makeCounter() {
    int count = 0;
    return [count]() mutable {
        return ++count;
    };
}

int main() {
    auto counter = makeCounter();
    std::cout << counter() << std::endl; // 1
    std::cout << counter() << std::endl; // 2
    return 0;
}
`,
      message:
        "Oui, ce code montre comment fonctionnent les closures en C++. La variable `count` est capturée par valeur dans la lambda, et grâce au mot-clé `mutable`, elle peut être modifiée à chaque appel. Cela permet de conserver un état interne, comme en JavaScript avec les closures.",
      createdAt: new Date(),
      snippetId: snippetRefs["snippet5"],
      userId: userRefs["user6"],
      refName: "snippet5",
    },
    {
      suggestedCode: `
async function getUserInfo(userId) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    if (!response.ok) {
      throw new Error(\`Erreur HTTP ! Statut : \${response.status}\`);
    }
    const userInfo = await response.json();
    return userInfo;
  } catch (error) {
    console.error("Erreur lors de la récupération des informations utilisateur :", error);
    return null;
  }
}

getUserInfo(42).then(user => {
  if (user) {
    console.log("Utilisateur récupéré :", user);
  } else {
    console.log("Impossible de récupérer les informations de l'utilisateur.");
  }
});
`,
      message:
        "Exactement, encapsuler la logique fetch dans un try/catch permet de traiter proprement les cas d’échec (réseau, statut HTTP, JSON invalide).",
      createdAt: new Date(),
      snippetId: snippetRefs["snippet1"],
      userId: userRefs["user4"],
      refName: "snippet1b",
    },
    {
      suggestedCode: `
const numbers: number[] = [10, 15, 20, 25, 30];
const multiplesOfTen: number[] = numbers.filter((n: number) => n % 10 === 0);
console.log(multiplesOfTen); // [10, 20, 30]
`,
      message:
        "Oui, ici filter permet d’extraire uniquement les nombres qui sont des multiples de 10. Pour transformer ensuite les résultats, pense à chaîner un map.",
      createdAt: new Date(),
      snippetId: snippetRefs["snippet4"],
      userId: userRefs["user7"],
      refName: "snippet4b",
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

    let comment = await commentRepository.findOne({
      where: {
        suggestedCode: commentData.suggestedCode,
        user: { id: commentData.userId },
        snippet: { id: commentData.snippetId },
      },
      relations: ["user", "snippet"],
    });

    if (comment) {
      commentRepository.merge(comment, {
        suggestedCode: commentData.suggestedCode,
        message: commentData.message,
        createdAt: commentData.createdAt,
      });
      await commentRepository.save(comment);
      console.log(`Commentaire avec l'ID ${comment.id} mis à jour avec succès`);
    } else {
      comment = commentRepository.create({
        ...commentData,
        user,
        snippet,
      });
      await commentRepository.save(comment);
      console.log(
        `Commentaire avec le titre du snippet "${snippet.title}" créé avec succès`
      );
    }

    if (refName) {
      commentRefs[refName] = comment.id;
    }
  }

  console.log("Commentaires insérés avec succès");
  return commentRefs;
};
