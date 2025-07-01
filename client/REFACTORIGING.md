### Code initial

```jsx
// import React from 'react';
// function JuniorDeveloperSnippetList() {
//   const [data, setData] = React.useState(null);

//   React.useEffect(() => {
//     fetch('http://localhost:8080/api/snippets')
//       .then(res => res.json())
//       .then(json => setData(json));
//   }, []);

//   if (!data) {
//     return 'Loading...';
//   }

//   return (
//     <div>
//       <h1>Code Snippets</h1>
//       {data.map(item => (
//         <div key={item.id}>
//           <h2>{item.title}</h2>
//           <p>Language: {item.language}</p>
//           <a href={`/snippets/${item.id}`}>View Details</a>
//         </div>
//       ))}
//     </div>
//   );
// }
// export default JuniorDeveloperSnippetList;


### Refactoré en TSX



> ✅ Pour refactorer ce code, je conseille d/utiliser TypeScript pour ajouter des types et améliorer la robustesse du code d/utiliser axios pour les requêtes HTTP, car il offre une meilleure gestion des erreurs et des fonctionnalités avancées par rapport à fetch.

import React from "react";
import axios from "axios";


> ✅ Nous allons également utiliser useNavigate de react-router-dom pour naviguer vers la page de détails du snippet lorsque l/utilisateur clique sur le lien "View Details". useNavigate a l/avantage de permettre une navigation programmatique, ce qui est plus flexible que l/attribut href d/une balise <a>.

import { useNavigate } from "react-router-dom";



> ✅ Pour utiliser typeScript, nous allons définir un type pour les snippets qui inclut les propriétés id, title et language. Cela nous permettra de bénéficier de la vérification de type.

type Snippet = {
  id: number;
  title: string;
  language: string;
};

> ✅ Ensuite nous créons la fonction JuniorDeveloperSnippetList

function JuniorDeveloperSnippetList() {


> ✅ Nous initialisons l/état data avec un type Snippet[] | null pour indiquer que nous attendons un tableau de snippets ou null si les données ne sont pas encore chargées.

  const [data, setData] = React.useState<Snippet[] | null>(null);



✅ Nous initionalisons une constant navigate en utilisant useNavigate.

  const navigate = useNavigate();


> ✅ Ensuite, nous utilisons useEffect pour effectuer une requête GET à l/URL de l/api pour récupérer les snippets. Nous utilisons axios pour cela, car il gère mieux les erreurs et les réponses que fetch. Les fonctions asynchrones sont utilisées pour gérer la promesse renvoyée par axios.
Nous utilisons un try/catch pour gérer les erreurs potentielles lors de la récupération des données.
Nous utilison async/await pour rendre le code plus lisible et facile à comprendre. De plus, nous utilisons la méthode get de axios pour effectuer une requête GET à l/URL de l/api. Nous stockons les données récupérées dans l/état data en utilisant setData.
Pour une raison de sécurité, il est important de récupérer l/URL de l/api à partir de l/variable d/environnement VITE_API_URL, définie dans le fichier .env. Cela permet de ne pas coder en dur l/URL de l/api dans le code, mais de la configurer dynamiquement en fonction de l/environnement. Cela permet également, de changer facilement l/URL de l/api sans avoir à modifier le code source.


  React.useEffect(() => {

    const fetchSnippets = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/snippets`
        );
        const data = response.data;

        if (!data || data.length === 0) {
          console.warn("No snippets found");
        }

        setData(data);
      } catch (error) {
        console.error("Error fetching snippets:", error);
      }
    };
    fetchSnippets();
  }, []);


> ✅ Avant d/itérer sur les données, nous vérifions si data est null ou vide. Si c/est le cas, nous affichons un message de chargement ou un message indiquant qu/aucun snippet n/a été trouvé. Cela permet d/éviter les erreurs lors du rendu des données.

  if (data === null) {
    return <div>Chargement...</div>;
  }

  if (data.length === 0) {
    return <div>Aucun snippet trouvé</div>;

  }


> ✅ Nous définissons une fonction handleSnippetClick qui sera appelée lorsque l/utilisateur cliquera sur un snippet. Cette fonction empêche le comportement par défaut du lien et utilise navigate pour rediriger l/utilisateur vers la page de détails du snippet en utilisant son id.

  const handleSnippetClick = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    navigate(`/snippets/${id}`);
  };

> ✅ Ensuite, nous allons mapper les données récupérées pour afficher chaque snippet. Nous créons un tableau d/éléments JSX qui contiennent le titre, la langue et un lien vers les détails du snippet. Chaque élément est identifié par son id pour garantir l/unicité des clés dans la liste. Nons prenons le soin de mapper les données avant de retourner l/élément TSX. Cela permet de s/assurer que les données sont prêtes avant de les afficher. 

  const snippetItems = data?.map((item) => (
    <div key={item.id}>
      <h2>{item.title}</h2>
      <p>Language: {item.language}</p>
      <a onClick={(e) => handleSnippetClick(e, item.id)}>
        View Details View Details
      </a>
    </div>
  ));


> ✅ Nous renvoyons ensuite un élément JSX contenant un titre et la liste des snippets. Si les données ne sont pas encore chargées, nous affichons un message de chargement.

  return (
    <div>
      <h1>Code Snippets</h1>
      {snippetItems}
    </div>
  );
}

export default JuniorDeveloperSnippetList;
```



### Refactoré en TSXv2 avec useLoader

> ✅ Nous avons une autre option, celle d/utiliser useLoaderData de react-router-dom pour charger les données avant le rendu du composant. Cela permet de simplifier le code en évitant l/état local et l/effet secondaire pour charger les données.

> ✅ Nous importons useLoaderData depuis react-router-dom 

import { useLoaderData } from "react-router-dom";

type Snippet = {
  id: number;
  title: string;
  language: string;
};

function JuniorDeveloperSnippetList() {

> ✅ Nous initialisons loaderData en utilisant useLoaderData, qui nous permet de récupérer les données chargées par le routeur. Nous définissons le type de loaderData comme Snippet[] pour indiquer que nous attendons un tableau de snippets.

  const loaderData = useLoaderData() as Snippet[];

  if (loaderData.length === 0) {
    return <div>Aucun snippet trouvé</div>;
  }



  const snippetItems = loaderData?.map((item) => (
    <div key={item.id}>
      <h2>{item.title}</h2>
      <p>Language: {item.language}</p>
      <a href={`/snippets/${item.id}`}>View Details</a>
    </div>
  ));

  return (
    <div>
      <h1>Code Snippets</h1>
      {snippetItems}
    </div>
  );
}

export default JuniorDeveloperSnippetList;


