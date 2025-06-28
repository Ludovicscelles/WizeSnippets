import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Inscription() {
  const [pseudo, setPseudo] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePseudo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPseudo(e.target.value);
  };

  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target.value);
  };

  const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          pseudo,
          firstname,
          lastname,
          email,
          password,
        }
      );

      const { token, user } = response.data;

      toast.success("Inscription réussie !");
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          pseudo: user.pseudo,
          firstname: user.firstnmame,
        })
      );

      console.log("Inscription réussie :", user);

      setPseudo("");
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: unknown) {
      console.error("Erreur d'inscription :", error);
      toast.error("Erreur d'inscription. Veuillez réessayer.");
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border-2 border-blue-500 rounded-lg bg-black text-white">
      <h1 className="text-3xl font-bold text-center mb-2">Inscription</h1>
      <p className="text-center border-b border-white pb-2 mb-6">
        Inscrivez-vous pour accéder à notre réseau
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={pseudo}
          onChange={handleChangePseudo}
          placeholder="Pseudo"
          className="w-full px-4 py-2 bg-black text-white border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={firstname}
          onChange={handleChangeFirstName}
          placeholder="Prénom"
          className="w-full px-4 py-2 bg-black text-white border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={lastname}
          onChange={handleChangeLastName}
          placeholder="Nom"
          className="w-full px-4 py-2 bg-black text-white border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          value={email}
          onChange={handleChangeEmail}
          placeholder="Adresse Email"
          className="w-full px-4 py-2 bg-black text-white border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          value={password}
          onChange={handleChangePassword}
          placeholder="Mot de passe"
          className="w-full px-4 py-2 bg-black text-white border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
          placeholder="Confirmer Mot de passe"
          className="w-full px-4 py-2 bg-black text-white border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white text-xl font-bold rounded hover:bg-blue-600 transition"
        >
          Valider
        </button>
      </form>
    </div>
  );
}
