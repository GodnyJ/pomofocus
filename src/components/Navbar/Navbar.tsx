import React from "react";
import "./navbar.css";
import NavButton from "./NavButton";
import { useAtom, useSetAtom } from "jotai";
import { toggleSettingsAtom } from "../../atoms";

// interface NavBarProps {
//   handleSettingsClick: () => void;
// }

export default function Navbar() {
  // const [,toggleSettings] = useAtom(toggleSettingsAtom); zamiast tego to niżej???
  const toggleSettings = useSetAtom(toggleSettingsAtom);

  return (
    <nav className="navbar">
      <h1 className="navbar__logo">
        <a href="/app">
          <img src="icons/icon-white2.png" alt="pomofocus icon" />
          <div className="navbar__logo--text">Pomofocus</div>
        </a>
      </h1>
      <div className="navbar__menu">
        <NavButton
          iconSrc={"icons/graph-white.png"}
          label={"Report"}
          handleClick={toggleSettings}
        />
        <NavButton
          iconSrc={"icons/config-white.png"}
          label={"Setting"}
          handleClick={toggleSettings}
        />
        <NavButton
          iconSrc={"icons/user-white.png"}
          label="Sign In"
          handleClick={toggleSettings}
        />
        <NavButton
          iconSrc={"icons/threedots-white.png"}
          label=""
          className="navbar__menu--lastbtn"
          handleClick={toggleSettings}
        />
      </div>
    </nav>
  );
}
