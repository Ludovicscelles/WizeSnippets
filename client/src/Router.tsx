import { createBrowserRouter } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import Snippets from "./pages/Snippets";
import DetailSnippet from "./pages/DetailSnippet";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Layout from "./components/Layout";

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
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/snippets`),
      },
      {
        path: "snippets/:id",
        element: <DetailSnippet />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/snippets/${params.id}`),
      },
      { path: "inscription", element: <Inscription /> },
      { path: "connexion", element: <Connexion /> },
    ],
  },
]);

export default router;
