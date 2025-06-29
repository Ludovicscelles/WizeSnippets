import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";

export function DetailCardSnippet({
  snippet,
}: {
  snippet: {
    id: number;
    title: string;
    code: string;
    message: string;
    createdAt: Date;
    user_id: number;
    pseudo?: string;
    firstname: string;
    Comments?: {
      pseudo?: string;
      firstname: string;
      suggestedCode: string;
      message: string;
    }[];
  };
}) {
  return (
    <div className="flex justify-center w-full bg-black mt-10 mt-10 mb-5">
      <div className="bg-black text-white border-4 border-bluewize rounded-lg p-4 md:p-10 ">
        <h2 className="text-center text-5xl font-bold mb-8">
          Détail du Snippet
        </h2>
        <div className="mb-4">
          <h3 className="text-2xl font-semibold">{snippet.title}</h3>
          <p className="text-base text-white font-semi-bold">
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
        <pre className="bg-gray-800 w-[50vw] p-4 rounded-lg overflow-x-auto">
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
        {snippet.Comments && snippet.Comments.length > 0 ? (
          snippet.Comments.map((comment, index) => (
            <div
              key={index}
              className="mb-4 p-4 bg-gray-700 text-white font-bold rounded-lg"
            >
              <p className="text-sm ">
                Par: {comment.pseudo || comment.firstname || "Anonyme"}
              </p>
              <p className="text-sm">{comment.message}</p>
              {comment.suggestedCode && (
                <pre className="bg-gray-800 text-white p-2 mt-2 rounded-lg overflow-x-auto">
                  <code>
                    <SyntaxHighlighter
                      language="javascript"
                      style={oneDark}
                      customStyle={{ backgroundColor: "#191F34" }}
                    >
                      {comment.suggestedCode}
                    </SyntaxHighlighter>
                  </code>
                </pre>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-white">
            Aucun commentaire pour ce snippet.
          </p>
        )}
        <div className="w-full h-10"></div>
      </div>
    </div>
  );
}
