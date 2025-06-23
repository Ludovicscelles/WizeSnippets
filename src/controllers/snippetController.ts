import { Request, Response } from "express";

type Snippet = {
  id: number;
  title: string;
  code: string;
  message: string;
  createdAt: Date;
  user_id: number;
};

const snippets: Snippet[] = [
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
    user_id: 1,
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
    user_id: 2,
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
    user_id: 3,
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
    user_id: 4,
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
    user_id: 5,
  },
];

export const getSnippets = (req: Request, res: Response<Snippet[]>) => {
  res.json(snippets);
};

export const getSnippetById = (
  req: Request<{ id: string }>,
  res: Response<Snippet | { message: string }>
) => {
  const snippetId = parseInt(req.params.id, 10);
  const snippet = snippets.find((s) => s.id === snippetId);

  if (!snippet) {
    return res.status(404).json({ message: "Snippet not found" });
  }

  res.json(snippet);
};
