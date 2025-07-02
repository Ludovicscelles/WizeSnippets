import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  className = "",
}) => {
  const baseClass =
    "w-full py-2 text-white text-xl font-bold rounded transition";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${className}`}
    >
      {children}
    </button>
  );
};
