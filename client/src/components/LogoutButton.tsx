import { useNavigate } from "react-router-dom";

type LogoutButtonProps = { onLogout: () => void; isMobile?: boolean };

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  onLogout,
  isMobile,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/snippets", { state: { reset: true } }); 
  };

  return (
    <button
      className={`${
        isMobile ? "absolute mt-2 right-0" : "absolute mt-2"
      } bg-pinkwize text-white font-bold px-4 py-2 rounded hover:bg-pinkwize transition-opacity duration-300 opacity-100`}
      onClick={handleLogout}
    >
      {isMobile ? "Sortir" : "Déconnexion"}
    </button>
  );
};
