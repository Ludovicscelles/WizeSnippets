import { Request, Response } from "express";
import { Comment } from "../models/Comment";

const comments: Comment[] = [
  {
    id: 1,
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
    snippetId: 1,
    userId: 2,
  },
  {
    id: 2,
    suggestedCode: `
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
`,
    message:
      "Non, `map` est une méthode des tableaux et ne peut pas être utilisée directement sur un objet. Tu peux convertir un objet en tableau avec `Object.values()` ou `Object.entries()` avant d'utiliser `map`.",
    createdAt: new Date(),
    snippetId: 2,
    userId: 3,
  },
  {
    id: 3,
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
    snippetId: 3,
    userId: 4,
  },
  {
    id: 4,
    suggestedCode: `
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]
`,
    message:
      "Non, `filter` est utilisé pour créer un nouveau tableau avec les éléments qui passent un test spécifique. Si tu veux modifier les éléments, tu devrais utiliser `map`. Par exemple, si tu veux doubler les nombres pairs, tu peux combiner `filter` et `map` comme ceci :\n\n```javascript\nconst doubledEvenNumbers = numbers.filter(num => num % 2 === 0).map(num => num * 2);\nconsole.log(doubledEvenNumbers); // [4, 8]\n```",
    createdAt: new Date(),
    snippetId: 4,
    userId: 5,
  },
  {
    id: 5,
    suggestedCode: `
const numbers = [1, 2, 3, 4, 5];
const oddNumbers = numbers.filter(num => num % 2 !== 0);
console.log(oddNumbers); // [1, 3, 5]
`,
    message:
      "Oui, tu peux utiliser `filter` pour créer un nouveau tableau contenant uniquement les nombres impairs. La méthode `filter` crée un nouveau tableau avec tous les éléments qui passent le test implémenté par la fonction fournie. Dans cet exemple, la fonction teste si chaque nombre est impair en vérifiant si le reste de la division par 2 n'est pas égal à 0.",
    createdAt: new Date(),
    snippetId: 5,
    userId: 6,
  },
];

export const getComments = (req: Request, res: Response<Comment[]>) => {
  res.json(comments);
};

export const getCommentById = (
  req: Request<{ id: string }>,
  res: Response<Comment | { message: string }>
) => {
  const commentId = parseInt(req.params.id, 10);
  const comment = comments.find((c) => c.id === commentId);

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  res.json(comment);
};
