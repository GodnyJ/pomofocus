import React from "react";
import './navbar.css';
import NavButton from "./NavButton";

export default function Navbar() {
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
                />
                <NavButton 
                    iconSrc={'icons/config-white.png'}
                    label={'Setting'}
                />
                <NavButton iconSrc={'icons/user-white.png'} label="Sign In"/>
                <NavButton iconSrc={'icons/threedots-white.png'} label="" className="navbar__menu--lastbtn"/>
            </div>
        </nav>
    )
}