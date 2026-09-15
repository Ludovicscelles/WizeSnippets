import { createBrowserRouter } from "react-router-dom";
import api from "./service/api";
import IntroPage from "./pages/IntroPage";
import Snippets from "./pages/Snippets";
import DetailSnippet from "./pages/DetailSnippet";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import AddASnippet from "./pages/AddASnippet";
import AddComment from "./pages/AddComment";
import Layout from "./components/Layout";
import JuniorDeveloperSnippetList from "./pages/JuniorDeveloperSnippetList";
import { ProtectedRoute } from "./service/ProtectedRoute";

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
          const response = await api.get(`/snippets`);
          return response.data;
        },
      },
      {
        path: "snippets/:id",
        element: <DetailSnippet />,
        loader: async ({ params }) => {
          const response = await api.get(`/snippets/${params.id}`);
          return response.data;
        },
      },
      {
        path: "snippets/:id/ajouter-commentaire",
        element: (
          <ProtectedRoute>
            <AddComment />
          </ProtectedRoute>
        ),
        loader: async ({ params }) => {
          const response = await api.get(`/snippets/${params.id}`);
          return response.data;
        },
      },
      { path: "inscription", element: <Inscription /> },
      { path: "connexion", element: <Connexion /> },
      {
        path: "ajouter-snippet",
        element: (
          <ProtectedRoute>
            <AddASnippet />
          </ProtectedRoute>
        ),
      },
      {
        path: "junior-snippets-list",
        element: <JuniorDeveloperSnippetList />,
        loader: async () => {
          const response = await api.get(`/snippets`);
          return response.data;
        },
      },
    ],
  },
]);

export default router;
