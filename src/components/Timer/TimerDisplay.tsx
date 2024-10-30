// import React from 'react';
// import "./timerDisplay.css";
// import { useCountdown } from '../../hooks/useCountDown';

// export default function TimerDisplay({ initialTimeInMinutes, isTimerRunning }) {
//   const [minutes, seconds] = useCountdown(initialTimeInMinutes, isTimerRunning);

//   const formatTime = (minutes, seconds) => {
//     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   };

//   return (
//     <span className="timer-display">{formatTime(minutes, seconds)}</span>
//   );
// }










import React, { useEffect, useState } from "react";
import "./timerDisplay.css";

interface TimerDispleyProps {
  initialTimeInMinutes: number;
  isTimerRunning: boolean;
}

export default function TimerDisplay({
  initialTimeInMinutes,
  isTimerRunning,
  // handleNextClick1,
}: TimerDispleyProps) {
  const [timeLeft, setTimeLeft] = useState(initialTimeInMinutes * 60);

  // funkcja formatująca czas
  const formatTime = (t: number): string => {
    const minutes = Math.floor(t / 60); // Obliczamy minuty
    const seconds = t % 60; // Obliczamy pozostałe sekundy
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // zaktualizowanie timeleft kiedy zmieni się props time
  // useEffect(() => {
  //     setTimeLeft(timeInMinutes); //???????czy powinnam przeliczać w tym miejscu? wtedy mamy przeliczenie przy każdym renderze, może powinnam to przeliczyć w oddzielnyj zmiennej?
  // }, [timeInMinutes]);

  useEffect(() => {
    if (isTimerRunning === true) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      return () => {
        clearInterval(intervalId);
        // handleNextClick1();
      };
    }
  }, [isTimerRunning]);

  return <span className="timer-display">{formatTime(timeLeft)}</span>;
}

//bląd któy napotkałam to to że do timeleft przypisałam wartość {time} czyli obiekt z propsów
//a powinnam przypisac samo time bo prevTime wymagał liczy a ja podałam obiekt
