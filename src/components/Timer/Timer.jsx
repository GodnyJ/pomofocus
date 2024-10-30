// import React, { useState } from "react";
// import "./timer.css";
// import TimerMenuBtn from "./TimerMenuBtn";
// import TimerDisplay from "./TimerDisplay";

// export default function Timer() {
//   const [currentTime, setCurrentTime] = useState(25);
//   const [backgroundColor, setBackgroundColor] = useState("rgb(186, 73, 73)");
//   return (
//     <div className="timer">
//       <div className="timer__menu">
//         <TimerMenuBtn text={"Pomodoro"} time={25} bgc={"rgb(186, 73, 73)"} />
//         <TimerMenuBtn text={"Short Break"} time={5} bgc={"rgb(56, 133, 138)"} />
//         <TimerMenuBtn text={"Long Break"} time={10} bgc={"rgb(57, 112, 151)"} />
//       </div>
//       <TimerDisplay time={currentTime} />
//       <button className="timer__button--start">Start</button>
//     </div>
//   );
// }
