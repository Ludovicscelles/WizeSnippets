import cross from "../assets/cross_icon.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../service/UseAuth";

export default function AddASnippet() {
  const { token } = useAuth();

  const [showTitleInput, setShowTitleInput] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showMessageInput, setShowMessageInput] = useState(false);

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [languages, setLanguages] = useState<{ id: number; name: string }[]>(
    []
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    const getLanguages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/languages`
        );
        const data = response.data;
        setLanguages(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des langages:", error);
        toast.error("Erreur lors de la récupération des langages.");
      }
    };
    getLanguages();
  }, []);

  const languageOptions = languages.map((lang) => (
    <option key={lang.id} value={lang.id}>
      {lang.name}
    </option>
  ));

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeCode = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Title:", title);
    console.log("Code:", code);
    console.log("Message:", message);
    console.log("Language:", languages);

    if (!title || !code || !message) {
      toast.error("Tous les champs doivent être remplis.");
      return;
    }

    if (!selectedLanguage) {
      toast.error("Veuillez sélectionner un langage.");
      return;
    }
    if (!token) {
      toast.error("Vous devez être connecté pour ajouter un snippet.");
      return;
    }

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/snippets`,
        {
          title,
          code,
          message,
          languageId: selectedLanguage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Snippet ajouté:", response.data);
        toast.success("Snippet ajouté avec succès !");
        setTitle("");
        setCode("");
        setMessage("");
        setShowTitleInput(false);
        setShowCodeInput(false);
        setShowMessageInput(false);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        toast.error("Une erreur est survenue lors de l'ajout du snippet.");
      });
  };

  const handleClose = () => {
    setTitle("");
    setCode("");
    setMessage("");
    setShowTitleInput(false);
    setShowCodeInput(false);
    setShowMessageInput(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border-2 border-bluewize rounded-lg bg-black text-white">
      <h1 className="text-3xl font-bold text-center mb-2">Snippets</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex justify-center items-center gap-2 border-b border-white pb-2 mb-6">
          <p>Ajoute ton titre</p>
          <button
            type="button"
            className="hover:scale-110 transition"
            onClick={() => setShowTitleInput((prev) => !prev)}
          >
            <img src={cross} width={20} alt="Ajouter un titre" />
          </button>
        </div>

        {showTitleInput && (
          <div className="mb-4">
            <input
              type="text"
              value={title}
              onChange={handleChangeTitle}
              placeholder="Titre du snippet"
              className="w-full px-4 py-2 bg-black text-white border-2 border-bluewize rounded focus:outline-none focus:ring-2 focus:ring-bluewize"
            />
          </div>
        )}

        <div>
          <label className="block text-center mb-2">Choisis ton langage</label>
          <select
            value={selectedLanguage || ""} 
            onChange={handleChangeLanguage}
            className="w-full px-4 py-2 bg-black text-white border-2 border-bluewize rounded focus:outline-none focus:ring-2 focus:ring-bluewize"
          >

            <option value="" disabled>Selectionner un langage</option>
            {languageOptions}
          </select>
        </div>

        <div>
          <label className="block text-center mb-2">Ajoute ton code</label>
          <div className="w-full flex justify-center border-2 border-bluewize rounded p-4 text-center cursor-pointer hover:bg-gray-800">
            <div className="flex items-center justify-center w-full">
              <button
                type="button"
                className="hover:scale-110 transition"
                onClick={() => setShowCodeInput((prev) => !prev)}
              >
                <img src={cross} />
              </button>
            </div>
          </div>
        </div>

        {showCodeInput && (
          <div className="mb-4">
            <textarea
              placeholder="Code du snippet"
              className="w-full px-4 py-2 bg-black text-white border-2 border-bluewize rounded focus:outline-none focus:ring-2 focus:ring-bluewize"
              rows={5}
              value={code}
              onChange={handleChangeCode}
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
          <button
            type="submit"
            className="w-full py-2 bg-bluewize text-white text-xl font-bold rounded hover:bg-bluewize transition"
          >
            Valider
          </button>
          <button
            type="button"
            className="w-full py-2 bg-bluewize text-white text-xl font-bold rounded hover:bg-red-500 transition"
            onClick={handleClose}
          >
            Fermer
          </button>
        </div>
      </form>
    </div>
  );
}
