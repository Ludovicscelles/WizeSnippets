import { createBrowserRouter } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import Snippets from "./pages/Snippets";
import DetailSnippet from "./pages/DetailSnippet";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import AddASnippet from "./pages/AddASnippet";
import AddComment from "./pages/AddComment";
import Layout from "./components/Layout";
import JuniorDeveloperSnippetList from "./pages/JuniorDeveloperSnippetList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IntroPage />,
  },

  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "snippets",
        element: <Snippets />,
        loader: async () => {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/snippets`
          );
          if (!response.ok) {
            throw new Error("Erreur de chargement des snippets");
          }
          return response.json();
        },
      },
      {
        path: "snippets/:id",
        element: <DetailSnippet />,
        loader: async ({ params }) => {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/snippets/${params.id}`
          );
          if (!response.ok) {
            throw new Error("Erreur de chargement du snippet");
          }
          return response.json();
        },
      },
      {
        path: "snippets/:id/ajouter-commentaire",
        element: <AddComment />,
        loader: async ({ params }) => {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/snippets/${params.id}`
          );
          if (!response.ok) {
            throw new Error("Erreur de chargement du snippet");
          }
          return response.json();
        },
      },
      { path: "inscription", element: <Inscription /> },
      { path: "connexion", element: <Connexion /> },
      { path: "ajouter-snippet", element: <AddASnippet /> },
      {
        path: "junior-snippets-list",
        element: <JuniorDeveloperSnippetList />,
        loader: async () => {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/snippets`
          );
          if (!response.ok) {
            throw new Error("Erreur de chargement des snippets");
          }
          return response.json();
        },
      },
    ],
  },
]);

export default router;
