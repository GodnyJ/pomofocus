import React from "react";
import "./navbutton.css";

interface NavButtonProps {
  iconSrc: string;
  label: string;
  handleClick: () => void;
  className?: string;
}

export default function NavButton({
  iconSrc,
  label,
  handleClick,
  className = "",
}: NavButtonProps) {
  return (
    <button className={`navbutton ${className}`} onClick={handleClick}>
      <img src={iconSrc} alt="" />
      {label}
    </button>
  );
}
