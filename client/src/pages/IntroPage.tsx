import logo from "../assets/logo.svg";
import mouse from "../assets/mouse.svg";
import { useNavigate } from "react-router-dom";

export default function IntroPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/snippets");
  };

  return (
    <div className="flex w-full min-h-screen bg-black items-center justify-center md:items-start md:justify-center overflow-hidden">
      <div className="bg-black w-full flex flex-col items-center justify-center text-center">
        <img
          src={logo}
          className="w-full max-w-[60vw] mb-5 md:max-w-[25vw]"
          alt="Logo"
        />
        <h1 className="text-white text-[4rem] font-bold mb-10 max-w-xs md:max-w-none md:text-[6rem]">
          Partage ton code&nbsp;!
        </h1>
        <button
          type="button"
          onClick={handleClick}
          className="text-white flex items-center text-[2rem] gap-4 font-bold mb-10 md:text-[3rem]"
        >
          <span className="md:hidden">Entre ici</span>
          <span className="hidden md:inline">Clique ici pour commencer</span>
          <img src={mouse} className="w-8 h-8" alt="mouse" />
        </button>
      </div>
    </div>
  );
}
