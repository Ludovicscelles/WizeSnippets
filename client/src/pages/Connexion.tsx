import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      const { token, user } = response.data;

      toast.success("Connexion réussie !");

      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          pseudo: user.pseudo,
          firstname: user.firstname,
        })
      );

      console.log("Connexion réussie :", user);
    } catch (error: unknown) {
      console.error("Erreur de connexion :", error);
      setError("Identifiants invalides. Veuillez réessayer.");
      toast.error("Erreur de connexion. Veuillez réessayer.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 border-2 border-bluewize rounded-lg bg-black text-white"
    >
      <h1 className="text-3xl font-bold text-center mb-2">Bonjour</h1>
      <p className="text-center border-b border-white pb-2 mb-6">
        Connectez-vous pour accéder à notre réseau
      </p>

      <div className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={handleChangeEmail}
            placeholder="Adresse Email"
            className="w-full px-4 py-2 bg-black text-white border-2 border-bluewize rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={handleChangePassword}
            placeholder="Mot de passe"
            className="w-full px-4 py-2 bg-black text-white border-2 border-bluewize rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white text-xl font-bold rounded hover:bg-bluewize transition"
          >
            Valider
          </button>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </div>
      </div>

      <p className="text-center mt-6 text-sm">
        Envie de nous rejoindre ?
        <a
          href="/inscription"
          className="font-semibold underline hover:text-bluewize"
        >
          créer un compte
        </a>
      </p>
    </form>
  );
}
