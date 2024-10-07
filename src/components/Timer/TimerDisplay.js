import React, { useEffect, useState } from "react";
import './timerDisplay.css';

export default function TimerDisplay({timeInMinutes, isTimerRunning}) {
    const [timeLeft, setTimeLeft] = useState(timeInMinutes*60)

    // funkcja formatująca czas
    const formatTime = (t) => {
        const minutes = Math.floor(t / 60); // Obliczamy minuty
        const seconds = t % 60; // Obliczamy pozostałe sekundy
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // zaktualizowanie timeleft kiedy zmieni się props time
    // useEffect(() => {
    //     setTimeLeft(timeInMinutes); //???????czy powinnam przeliczać w tym miejscu? wtedy mamy przeliczenie przy każdym renderze, może powinnam to przeliczyć w oddzielnyj zmiennej?
    // }, [timeInMinutes]); 

        useEffect(() => { 
            if (isTimerRunning === true) {
                const intervalId = setInterval(() => { 
                    setTimeLeft((prevTime) => prevTime > 0 ? prevTime - 1 : 0);
                }, 1000);

                return () => clearInterval(intervalId);
            }
        }, [isTimerRunning]); 

    return (
        <span className="timer-display">{formatTime(timeLeft)}</span>
    )
}

//bląd któy napotkałam to to że do timeleft przypisałam wartość {time} czyli obiekt z propsów
//a powinnam przypisac samo time bo prevTime wymagał liczy a ja podałąm obiekt 

  
