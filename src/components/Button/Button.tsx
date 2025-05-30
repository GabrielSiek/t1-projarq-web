import React from "react";
import "./Button.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button = ({ children, onClick, className = "" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`custom-button ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
