import eye from "../assets/eye_icon.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SnippetsArray({
  snippets: snippets,
}: {
  snippets: {
    id: number;
    title: string;
    code: string;
    message: string;
    createdAt: Date;
    user_id: number;
    pseudo?: string;
    firstname: string;
  }[];
}) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate();

  const handleSnippetClick = (snippetId: number) => {
    navigate(`/snippets/${snippetId}`);
  };

  return (
    <>
      {isMobile ? (
        <div className="flex justify-center  justify-center w-full bg-black mb-5">
          <div className="p-4 bg-black text-white border-4 border-bluewize rounded-lg">
            <h2 className="text-center text-4xl font-bold mb-4">Snippets</h2>

            <table className="w-full table-auto text-left border-collapse">
              <thead>
                <tr className="border-b border-white">
                  <th className="px-4 py-2">Titre</th>
                  <th className="px-4 py-2">Voir en détail</th>
                </tr>
              </thead>

              <tbody className="text-sm text-bold">
                {snippets.map((snippet) => (
                  <tr key={snippet.id} className="hover:bg-gray-800">
                    <td className="px-4 py-2">{snippet.title}</td>
                    <td className="px-4 py-2 text-center">
                      <img
                        src={eye}
                        alt="Voir"
                        className="w-6 h-6 inline-block"
                        onClick={() => {
                          handleSnippetClick(snippet.id);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-black text-white border-4 border-bluewize rounded-lg w-full  max-w-4xl mx-auto">
          <h2 className="text-center text-4xl font-bold mb-4">Snippets</h2>

          <table className="w-full table-auto text-left border-collapse">
            <thead>
              <tr className="border-b border-white">
                <th className="px-4 py-2">Pseudo</th>
                <th className="px-4 py-2">Titre</th>
                <th className="px-4 py-2">Voir en détail</th>
              </tr>
            </thead>

            <tbody className="text-sm text-bold">
              {snippets.map((snippet) => (
                <tr key={snippet.id} className="hover:bg-gray-800">
                  <td className="px-4 py-2">
                    {snippet.pseudo ? snippet.pseudo : snippet.firstname}
                  </td>
                  <td className="px-4 py-2">{snippet.title}</td>
                  <td className="px-4 py-2 text-center">
                    <img
                      src={eye}
                      alt="Voir"
                      className="w-6 h-6 inline-block"
                      onClick={() => {
                        handleSnippetClick(snippet.id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
