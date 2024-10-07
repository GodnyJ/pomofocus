import React from "react";
import './navbar.css';
import NavButton from "./NavButton";


export default function Navbar({handleSettingsClick}) {
    return (
        <nav className="navbar">
            <h1 className="navbar__logo">
                <a href="/app">
                    <img src="icons/icon-white2.png" alt="pomofocus icon"/>
                    <div className="navbar__logo--text">Pomofocus</div>
                </a>
            </h1>
            <div className="navbar__menu">
                <NavButton 
                    iconSrc={'icons/graph-white.png'} 
                    label={'Report'}
                    handleClick={handleSettingsClick}
                />
                <NavButton 
                    iconSrc={'icons/config-white.png'}
                    label={'Setting'}
                    handleClick={handleSettingsClick}
                />
                <NavButton 
                    iconSrc={'icons/user-white.png'} 
                    label="Sign In"
                    handleClick={handleSettingsClick}
                />
                <NavButton 
                    iconSrc={'icons/threedots-white.png'} 
                    label="" 
                    className="navbar__menu--lastbtn"
                    handleClick={handleSettingsClick}
                />
            </div>
        </nav>
    )
}