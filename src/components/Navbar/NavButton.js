import React from "react";
import './navbutton.css';


export default function NavButton({iconSrc, label, className = ''}) {
    return (
        <button className={`navbutton ${className}`}>
           <img src={iconSrc} alt="" />
           {label}
        </button>
    )
}