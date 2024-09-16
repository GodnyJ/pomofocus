import React, { useState } from "react"
import Checklist from "./components/Checklist/Checklist"
import Navbar from "./components/Navbar/Navbar"
// import Timer from "./components/Timer/Timer";
import TimerDisplay from "./components/Timer/TimerDisplay";
import TimerMenuBtn from "./components/Timer/TimerMenuBtn";
import './App.css';
import './components/Timer/timer.css'


export default function App() {
  const [currentTime, setCurrentTime] = useState(25);
  const [backgroundColor, setBackgroundColor] = useState('rgb(186, 73, 73)'); 
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false); 

  const handleTimerChange = (time, bgc) => {
    setCurrentTime(time);
    setBackgroundColor(bgc);
    setIsTimerRunning(false) 
  }

  const handleStartClick = () => {
    if (currentTime) { 
      setIsTimerRunning(!isTimerRunning) 
    }
  }

  // DO POPRAWY w trybie long break
  const handleNextClick = () => {
    if (!isBreak) {
      handleTimerChange(5, 'rgb(56, 133, 138)');
      setIsBreak(true);
    } else {
      handleTimerChange(25, 'rgb(186, 73, 73)'); 
      setIsBreak(false);
    }
  }

  return (
    <div className="app" style={{backgroundColor: backgroundColor}}>
      <Navbar/>
      <main className="main">
        <div className="line-under-navbar"></div>

        {/* Timer */}
        <div className="timer-box">
          <div className="timer">
              <div className="timer__menu">
                  <TimerMenuBtn text={'Pomodoro'} time={25} bgc={'rgb(186, 73, 73)'} handleTimerChange={handleTimerChange}/> 
                  <TimerMenuBtn text={'Short Break'} time={5} bgc={'rgb(56, 133, 138)'} handleTimerChange={handleTimerChange}/>
                  <TimerMenuBtn text={'Long Break'} time={10} bgc={'rgb(57, 112, 151)'} handleTimerChange={handleTimerChange}/>
              </div>
              {/* Licznik */}
              <TimerDisplay timeInMinutes={currentTime} isTimerRunning={isTimerRunning}/>    

              <div className="timer__buttons">
                {/* Start - Pause button */}
                <button 
                  className={`timer__button--start ${isTimerRunning ? "timer__button--start-active" : ""}`} 
                  onClick={handleStartClick}
                  style={{color: backgroundColor}}
                >
                  {isTimerRunning ? 'Pause' : 'Start'} 
                </button>

                {/* Jeśli Timer pracuje wyświetl przycisk przejścia */}
                {isTimerRunning ? 
                  <button className="timer__button--next" onClick={handleNextClick}>
                    <img src="icons/next-white3.png" alt="next arrow icon"/>
                  </button> : null 
                }
              </div>
                     
          </div>
        </div>

        <Checklist backgroundColor={backgroundColor}/>
      </main>
    </div>
  )
}
