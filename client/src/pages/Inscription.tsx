import { useState } from "react";
import { useAuth } from "../service/UseAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function Inscription() {
  const navigate = useNavigate();
  const { login } = useAuth();

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

      login(
        {
          pseudo: user.pseudo,
          firstname: user.firstname,
        },
        token
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

  const handleClose = () => {
    setPseudo("");
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    navigate("/snippets");
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
      </form>
    </div>
  );
}
