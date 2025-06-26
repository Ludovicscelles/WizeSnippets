import logo from "../assets/logo.svg";
import avatar from "../assets/avatar_icon.svg";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const navigate = useNavigate();

  const updateMedia = useCallback(() => {
    const isNowDesktop = window.innerWidth > 768;
    if (isNowDesktop !== isDesktop) {
      setIsDesktop(isNowDesktop);
    }
  }, [isDesktop]);

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [updateMedia]);

  const handleClickLogo = () => {
    navigate("/snippets");
  };

  const handleClickAvatar = () => {
    navigate("/connexion");
  };

  return (
    <header className="flex w-full bg-black mt-5 px-8">
      {isDesktop ? (
        <div className="flex w-full gap-20  items-center justify-between flex-row ">
          <img
            src={logo}
            alt="Logo WizeSnippets"
            className="w-32 h-auto"
            onClick={handleClickLogo}
          />
          <h1 className="text-white text-center text-[4rem] font-bold mt-10 mb-10 max-w-none">
            Partage ton code&nbsp;!
          </h1>
          <img
            src={avatar}
            alt="icon avatar"
            className="w-20 h-auto"
            onClick={handleClickAvatar}
          />
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-between px-4">
          <div className="flex w-full gap-20 items-start justify-between">
            <div className="w-16" />
            <img
              src={logo}
              onClick={handleClickLogo}
              alt="LogoWizeSnippets"
              className="w-[200px] h-auto"
            />
            <img
              src={avatar}
              alt="icon avatar"
              className="w-16 h-auto mt-5"
              onClick={handleClickAvatar}
            />
          </div>
          <h1 className="text-white text-center text-[4rem] font-bold mt-10 mb-10 max-w-xs">
            Partage ton code&nbsp;!
          </h1>
        </div>
      )}
    </header>
  );
}
