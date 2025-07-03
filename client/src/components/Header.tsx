import logo from "../assets/logo.svg";
import avatar from "../assets/avatar_icon.svg";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../service/UseAuth";
import { LogoutButton } from "./LogoutButton";

export default function Header() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  const [hovered, setHovered] = useState(false);

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

  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  const greetingName = user?.pseudo || user?.firstname || "à vous";

  console.log("user", user);

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
          <div className="w-16 mr-10 flex flex-col items-center justify-center">
            <div
              className="relative flex justify-center items-center w-20 h-20 rounded-full cursor-pointer hover:opacity-80 transition-opacity duration-300"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <img
                src={avatar}
                alt="icon avatar"
                className="w-20 h-auto"
                onClick={handleClickAvatar}
              />
              {user && hovered && (
                <LogoutButton onLogout={logout} isMobile={false} />
              )}
            </div>
            {user && (
              <div className="text-white text-lg flex flex-col items-center">
                Bonjour&nbsp;
                <span>{greetingName}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-between px-4 overflow-hidden">
          <div className="flex w-full items-start justify-between gap-4 sm:gap-20">
            <div className="w-12" />
            <img
              src={logo}
              onClick={handleClickLogo}
              alt="LogoWizeSnippets"
              className="w-[200px] h-auto"
            />
            <div className="w-12 flex flex-col items-center justify-center">
              <div
                className="relative flex justify-center items-center w-20 h-20 rounded-full cursor-pointer hover:opacity-80 transition-opacity duration-300"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <img
                  src={avatar}
                  alt="icon avatar"
                  className="w-12 h-auto mt-5"
                  onClick={handleClickAvatar}
                />
                {user && hovered && (
                  <LogoutButton onLogout={logout} isMobile={true} />
                )}
              </div>
              {user && (
                <div className="flex flex-col text-white font-bold text-xs text-center leading-tight">
                  Bonjour&nbsp;
                  <span>{greetingName}</span>
                </div>
              )}
            </div>
          </div>
          <h1 className="text-white text-center text-[4rem] font-bold mt-10 mb-10 max-w-xs">
            Partage ton code&nbsp;!
          </h1>
        </div>
      )}
    </header>
  );
}
