import React from "react";
import "./timerMenuBtn.css";

export default function TimerMenuBtn({ text, modeName, handleTimerChange }) {
  // console.log(`Button: ${text}, Time: ${time}, Color: ${bgc}`);
  return (
    <button
      className="timer-menu-btn"
      onClick={() => {
        handleTimerChange(modeName);
      }}
    >
      {text}
    </button>
  );
}
