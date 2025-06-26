import logo from "../assets/logo.svg";
import mouse from "../assets/mouse.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function IntroPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/snippets");
  };

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex w-full min-h-screen bg-black items-center justify-center md:items-start md:justify-center overflow-hidden">
      <div className="bg-black w-full flex flex-col items-center justify-center text-center">
        <img
          src={logo}
          className="w-full max-w-[60vw] mb-5 md:max-w-[25vw]"
          alt="Logo"
        />
        <p className="text-white text-[4rem] font-bold mb-10 max-w-xs md:max-w-none md:text-[6rem]">
          Partage ton code&nbsp;!
        </p>
        <p
          onClick={handleClick}
          className="text-white flex items-center text-[2rem] gap-4 font-bold mb-10 md:text-[3rem]"
        >
          {isMobile ? "Entre ici" : "Clique ici"}
          <img src={mouse} className="w-8 h-8" alt="mouse" />
        </p>
      </div>
    </div>
  );
}
