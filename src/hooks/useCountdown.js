import {useEffect, useState } from "react";
import TimerDisplay from "../components/Timer/TimerDisplay";

export const useCountdown = (initialTimeInMinutes, isTimerRunning) => {
    const [timeLeft, setTimeLeft] = useState(initialTimeInMinutes *60);

    useEffect(() => {
        const startTime = Date.now(); //pobieranie aktualnego czasu

        //czy nie moge po prostu dodac tu : if (isTimerRunning === true) ?
        if (isTimerRunning === true) {
        const interval = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            const timeRemaining = initialTimeInMinutes * 60 - elapsedTime; // nie da się prościej?

            setTimeLeft(timeRemaining > 0 ? timeRemaining : 0);
        }, 1000);

        return () => clearInterval(interval);
    }
    }, [initialTimeInMinutes]);

    return getReturnValues(timeLeft);
};

const getReturnValues = (timeLeft) => {  //przeciez funkcje strzałkowe nie sa hoistowane?
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return [minutes, seconds];
};