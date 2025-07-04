import cross from "../assets/cross_icon.svg";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../service/UseAuth";
import { useParams } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function AddComment() {
  const navigate = useNavigate();
  const { id } = useParams<"id">();

  const snippet = useLoaderData() as { title: string };

  const { token } = useAuth();

  const [showSuggestedCodeInput, setShowSuggestedCodeInput] = useState(false);
  const [showMessageInput, setShowMessageInput] = useState(false);

  const [suggestedCode, setSuggestedCode] = useState("");
  const [message, setMessage] = useState("");

  const handleChangeSuggestedCode = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSuggestedCode(e.target.value);
  };

  const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!suggestedCode || !message) {
      toast.error("Tous les champs doivent être remplis.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/snippets/${id}/comment`,
        {
          suggestedCode,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (import.meta.env.DEV) {
        console.info("Détail du commentaire:", response.data);
      }
      toast.success("Commentaire ajouté avec succès !");
      setSuggestedCode("");
      setMessage("");
      setShowSuggestedCodeInput(false);
      setShowMessageInput(false);
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Une erreur est survenue lors de l'ajout du commentaire.");
    }
  };

  const handleClose = () => {
    setSuggestedCode("");
    setMessage("");
    setShowSuggestedCodeInput(false);
    setShowMessageInput(false);
    navigate(`/snippets/${id}`);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border-2 border-bluewize rounded-lg bg-black text-white">
      <h1 className="text-3xl font-bold text-center mb-2">
        Snippets Commentaires{" "}
      </h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex justify-center items-center gap-2 border-b border-white pb-2 mb-6">
          <p>{snippet.title}</p>
        </div>

        <div>
          <label className="block text-center mb-2">
            Ajoute ta proposition de code
          </label>
          <div className="w-full flex justify-center border-2 border-bluewize rounded p-4 text-center cursor-pointer hover:bg-gray-800">
            <div className="flex items-center justify-center w-full">
              <button
                type="button"
                className="hover:scale-110 transition"
                onClick={() => setShowSuggestedCodeInput((prev) => !prev)}
              >
                <img src={cross} />
              </button>
            </div>
          </div>
        </div>

        {showSuggestedCodeInput && (
          <div className="mb-4">
            <textarea
              placeholder="Code du snippet"
              className="w-full px-4 py-2 bg-black text-white border-2 border-bluewize rounded focus:outline-none focus:ring-2 focus:ring-bluewize"
              rows={5}
              value={suggestedCode}
              onChange={handleChangeSuggestedCode}
            />
          </div>
        )}

        <div>
          <label className="block text-center mb-2">Ajoute ton message</label>
          <div className="w-full flex justify-center border-2 border-bluewize rounded p-4 text-center cursor-pointer hover:bg-gray-800">
            <button
              type="button"
              className="hover:scale-110 transition"
              onClick={() => setShowMessageInput((prev) => !prev)}
            >
              <img src={cross} />
            </button>
          </div>
        </div>

        {showMessageInput && (
          <div className="mb-4">
            <textarea
              placeholder="Message du snippet"
              className="w-full px-4 py-2 bg-black text-white border-2 border-bluewize rounded focus:outline-none focus:ring-2 focus:ring-bluewize"
              rows={5}
              value={message}
              onChange={handleChangeMessage}
            />
          </div>
        )}
        <div className="space-y-4">
          <Button type="submit" className="bg-bluewize hover:bg-blue-700">
            Valider
          </Button>

          <Button
            type="button"
            className="bg-pinkwize hover:bg-red-500"
            onClick={handleClose}
          >
            Fermer
          </Button>
        </div>
      </form>
    </div>
  );
}
