import React from "react";
import './timerMenuBtn.css'

export default function TimerMenuBtn({text, time, bgc, handleTimerChange}) {
    return (
        <button 
            className="timer-menu-btn"
            onClick={() => handleTimerChange(time, bgc)}
        >
            {text}
        </button>
    )
}