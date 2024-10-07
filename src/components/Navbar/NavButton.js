import React from "react";
import './navbutton.css';

export default function NavButton({iconSrc, label, handleClick, className = ''}) {
    return (
        <button className={`navbutton ${className}`} onClick={handleClick}>
           <img src={iconSrc} alt="" />
           {label}
        </button>
    )
}