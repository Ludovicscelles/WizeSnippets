// import React from 'react';
// function JuniorDeveloperSnippetList() { const [data, setData] = React.useState(null);
// React.useEffect(() => { fetch('http://localhost:8080/api/snippets') .then(res => res.json()) .then(json =>
// setData(json)); }, []);
// if (!data) { return 'Loading...'; }
// return (# Code Snippets {data.map(item => (
// {item.title} Language: {item.language} View Details ))} ); } export default
// JuniorDeveloperSnippetList;

// correction syntax error and formatting

// import React from "react";
// function JuniorDeveloperSnippetList() {
//   const [data, setData] = React.useState(null);

//   React.useEffect(() => {
//     fetch("http://localhost:3015/api/snippets")
//       .then((res) => res.json())
//       .then((json) => setData(json));
//   }, []);

//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Code Snippets</h1>
//       {data.map((item) => (
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

// correction syntax error and formatting for tsx

// import axios from "axios";
// import React from "react";

// // Define the Snippet type

// type Snippet = {
//   id: number;
//   title: string;
//   language: string;
// };

// function JuniorDeveloperSnippetList() {
//   // définition de l'état pour stocker les données des snippets
//   // Utilisation de Snippet[] pour indiquer que data peut être un tableau de Snippet ou null
//   const [data, setData] = React.useState<Snippet[] | null>(null);

//   React.useEffect(() => {
//     // Fetching data from the API
//     // Utilisation de l'URL de l'API définie dans les variables d'environnement

//     // Utilisation de async/await pour gérer les appels asynchrones
//     // Gestion des erreurs avec un bloc try/catch
//     // La fonction fetchSnippets est appelée pour récupérer les données des snippets
//     // Les données sont ensuite stockées dans l'état data avec setData
//     // En cas d'erreur, un message d'erreur est affiché dans la console
//     // L'URL de l'API est récupérée depuis les variables d'environnement pour une meilleure flexibilité
//     // Cela permet de changer facilement l'URL de l'API sans modifier le code source
//     const fetchSnippets = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL}/snippets`
//         );
//         const data = await response.data
//         setData(data);
//       } catch (error) {
//         console.error("Error fetching snippets:", error);
//       }
//     };
//     fetchSnippets();
//   }, []);

//   // Mapping à travers les données pour créer des éléments snippet
//   // Chaque snippet affichera son titre, sa langue et un lien vers les détails
//   // Utilisation de l'ID du snippet comme clé pour chaque élément
//   const snippetItems = data?.map((item) => (
//     <div key={item.id}>
//       <h2>{item.title}</h2>
//       <p>Language: {item.language}</p>
//       <a href={`/snippets/${item.id}`}>View Details</a>
//     </div>
//   ));

//   return (
//     // Rendu du composant avec un titre et la liste des snippets
//     <div>
//       {" "}
//       <h1>Code Snippets</h1>
//       {snippetItems}{" "}
//     </div>
//   );
// }

// export default JuniorDeveloperSnippetList;

// import React from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// type Snippet = {
//   id: number;
//   title: string;
//   language: string;
// };

// function JuniorDeveloperSnippetList() {
//   const [data, setData] = React.useState<Snippet[] | null>(null);

//   const navigate = useNavigate();

//   React.useEffect(() => {
//     const fetchSnippets = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL}/snippets`
//         );
//         const data = response.data;

//         if (!data || data.length === 0) {
//           console.warn("No snippets found");
//         }

//         setData(data);
//       } catch (error) {
//         console.error("Error fetching snippets:", error);
//       }
//     };
//     fetchSnippets();
//   }, []);

//   if (data === null) {
//     return <div>Chargement...</div>;
//   }

//   if (data?.length === 0) {
//     return <div>Aucun snippet trouvé</div>;
//   }

//   const handleSnippetClick = (e: React.MouseEvent, id: number) => {
//     e.preventDefault();
//     navigate(`/snippets/${id}`);
//   };

//   const snippetItems = data?.map((item) => (
//     <div key={item.id}>
//       <h2>{item.title}</h2>
//       <p>Language: {item.language}</p>
//       <a onClick={(e) => handleSnippetClick(e, item.id)}>
//         View Details View Details
//       </a>
//     </div>
//   ));

//   return (
//     <div>
//       <h1>Code Snippets</h1>
//       {snippetItems}
//     </div>
//   );
// }

// export default JuniorDeveloperSnippetList;

import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type Snippet = {
  id: number;
  title: string;
  language: string;
};

function JuniorDeveloperSnippetList() {
  const loaderData = useLoaderData() as Snippet[];

  const navigate = useNavigate();

  const handleSnippetClick = (e: React.MouseEvent, id: number) => {
    e.preventDefault(); 
    navigate(`/snippets/${id}`);
  };

  if (loaderData.length === 0) {
    return <div>Aucun snippet trouvé</div>;
  }

  const snippetItems = loaderData?.map((item) => (
    <div key={item.id}>
      <h2>{item.title}</h2>
      <p>Language: {item.language}</p>
      <a onClick={(e) => handleSnippetClick(e, item.id)}>View Details</a>
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
