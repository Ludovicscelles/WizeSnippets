import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
import cross from "../assets/cross_icon.svg";
import chevrons from "../assets/chevron_icon.png";
import { useAuth } from "../service/UseAuth";
import { useNavigate } from "react-router-dom";

export function DetailCardSnippet({
  snippet,
}: {
  snippet: {
    id: number;
    title: string;
    code: string;
    message: string;
    createdAt: string;
    user_id: number;
    pseudo?: string;
    firstname: string;
    languageId: number;
    language: string;
    Comments?: {
      id: number;
      pseudo?: string;
      firstname: string;
      suggestedCode: string;
      message: string;
    }[];
  };
}) {
  const { isLogged } = useAuth();
  const navigate = useNavigate();
  const id = snippet.id;

  const snippetCommentsRendered =
    snippet.Comments && snippet.Comments.length > 0 ? (
      snippet.Comments.map((comment) => (
        <div
          key={`comment-${comment.id}`}
          className="mb-4 p-4 w-full bg-gray-700 text-white font-bold rounded-lg"
        >
          <p className="text-sm ">
            Par: {comment.pseudo || comment.firstname || "Anonyme"}
          </p>
          <p className="text-sm">{comment.message}</p>
          {comment.suggestedCode && (
            <pre className="bg-gray-800 text-white p-2 mt-2 rounded-lg overflow-x-auto">
              <SyntaxHighlighter
                language="javascript"
                style={oneDark}
                customStyle={{ backgroundColor: "#191F34" }}
              >
                {comment.suggestedCode}
              </SyntaxHighlighter>
            </pre>
          )}
        </div>
      ))
    ) : (
      <p className="text-sm text-white">Aucun commentaire pour ce snippet.</p>
    );

  return (
    <div className="flex justify-center w-full px-4 bg-black mt-10 mb-5">
      <div className="bg-black text-white border-4 border-bluewize rounded-lg p-4 md:p-10 max-w-5xl w-full min-w-[320px]">
        <h2 className="text-center text-xl md:text-5xl font-bold mb-8">
          Détail du Snippet
        </h2>
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-semibold">{snippet.title}</h3>
          <p className="text-sm font-bold md:text-lg text-gray-400 mb-5">
            Langage: {snippet.language}
          </p>
          <p className="text-xs md:text-base text-white font-semi-bold">
            {snippet.message}
          </p>
        </div>
        <div className="mb-4 text-white">
          <p className="text-sm">
            Créé le: {new Date(snippet.createdAt).toLocaleDateString("fr-FR")}
          </p>
          <p className="text-sm">
            Par: {snippet.pseudo || snippet.firstname || "Anonyme"}
          </p>
        </div>
        <pre className="bg-gray-800 w-full p-4 rounded-lg overflow-x-auto">
          <SyntaxHighlighter
            language="javascript"
            style={oneDark}
            customStyle={{ backgroundColor: "#191F34" }}
          >
            {snippet.code}
          </SyntaxHighlighter>
        </pre>
        <h3 className="text-2xl text-white font-semibold mt-8 mb-4">
          Solutions
        </h3>
        {snippetCommentsRendered}
        <div className="flex flex-col gap-10 md:flex-row h-full items-center md:justify-center mt-10 mb-10 md:h-24 md:gap-20">
          <p className="text-white text-center text-2xl font-bold">
            {`Apporter une solution à ${snippet.pseudo || snippet.firstname || "Anonyme"}`}
          </p>
          <img
            src={chevrons}
            alt="chevrons "
            className="w-24 h-24 transform rotate-90 md:rotate-0"
          />
          <img
            src={cross}
            alt="croix bleu pour ajouter un snippet"
            className="w-14 h-14 cursor-pointer"
            onClick={() =>
              isLogged
                ? navigate(`/snippets/${id}/ajouter-commentaire`)
                : navigate("/connexion")
            }
          />
        </div>
      </div>
    </div>
  );
}
