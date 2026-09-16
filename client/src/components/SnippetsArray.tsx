import eye from "../assets/eye_icon.svg";
import chevrons from "../assets/chevron_icon.png";
import cross from "../assets/cross_icon.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../service/UseAuth";
import type { SnippetsArrayProps } from "../types/Snippet";

export function SnippetsArray({ snippets }: SnippetsArrayProps) {
  const { isLogged } = useAuth();

  const navigate = useNavigate();

  const handleSnippetClick = (snippetId: number) => {
    navigate(`/snippets/${snippetId}`);
  };

  const renderedSnippets = snippets.map((snippet) => (
    <tr key={snippet.id} className="hover:bg-gray-800">
      <td className="px-4 py-2 hidden md:table-cell">
        {snippet.pseudo ?? snippet.firstname}
      </td>
      <td className="px-4 py-2">{snippet.title}</td>
      <td className="px-4 py-2 text-center">
        <button
          type="button"
          onClick={() => handleSnippetClick(snippet.id)}
          aria-label={`Voir le snippet ${snippet.title} en détail`}
        >
          <img src={eye} alt="" className="w-6 h-6 inline-block" />
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="p-4 bg-black text-white border-4 border-bluewize rounded-lg w-full max-w-4xl mx-auto">
      <h2 className="text-center text-4xl font-bold mb-4">Snippets</h2>

      <table className="w-full table-auto text-left border-collapse ">
        <thead>
          <tr className="border-b border-white">
            <th className="px-4 py-2 hidden md:table-cell">Pseudo</th>
            <th className="px-4 py-2">Titre</th>
            <th className="px-4 py-2">Voir en détail</th>
          </tr>
        </thead>

        <tbody className="text-sm font-bold">{renderedSnippets}</tbody>
      </table>
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-20 mt-10 mb-10">
        <p className="text-white text-xl md:text-2xl font-bold">
          Envie de partager un snippet ?
        </p>
        <img
          src={chevrons}
          alt="chevrons "
          className="w-24 h-24 transform md:rotate-0 rotate-90"
        />
        <button
          type="button"
          onClick={() =>
            isLogged ? navigate("/ajouter-snippet") : navigate("/connexion")
          }
          aria-label="Ajouter un snippet"
        >
          <img src={cross} alt="" className="w-14 h-14" />
        </button>
      </div>
    </div>
  );
}
