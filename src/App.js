import React, { useState } from "react"
import Checklist from "./components/Checklist/Checklist"
import Navbar from "./components/Navbar/Navbar"
// import Timer from "./components/Timer/Timer";
import TimerDisplay from "./components/Timer/TimerDisplay";
import TimerMenuBtn from "./components/Timer/TimerMenuBtn";
import './App.css';
import './components/Timer/timer.css'
import Settings from "./components/Navbar/Settings";

export default function App() {
  const [currentTime, setCurrentTime] = useState(16);
  const [backgroundColor, setBackgroundColor] = useState('rgb(186, 73, 73)'); 
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isSettingsClicked, setIsSettingsClicked] = useState(false) 
  // Checklist.js
  const [tasks, setTasks] = useState([]);
  const [clickedLiElementIndex, setClickedLiElementIndex] = useState(0);

  //Settings.js
  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [isActiveToggle, setIsActiveToggle] = useState(false);

  const handleTimerChange = (time, bgc) => {
    setCurrentTime(time);
    setBackgroundColor(bgc);
    setIsTimerRunning(false) 
  }

  const handleStartClick = () => {
    if (currentTime !== 0) { 
      setIsTimerRunning(!isTimerRunning) 
    }

    if (!isTimerRunning && currentTime === 0 && clickedLiElementIndex !== null) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.index === clickedLiElementIndex
            ? { ...task, completedPomodoros: task.completedPomodoros + 1 }
            : task
        )
      );
    }

  }

  // DO POPRAWY w trybie long break
  const handleNextClick = () => {
    // Sprawdam czy nie jesteśmy na przerwie
    if (!isBreak) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.index === clickedLiElementIndex
            ? { ...task, completedPomodoros: task.completedPomodoros + 1 }
            : task
        )
      );
      handleTimerChange(5, 'rgb(56, 133, 138)');
      setIsBreak(true);
    } else {
      handleTimerChange({pomodoroTime}, 'rgb(186, 73, 73)');
      setIsBreak(false);
    }
  };

  const handleSettingsClick = () => {
    setIsSettingsClicked(!isSettingsClicked)
  }


  //Settings
  const handleAutoStartBreaks = () => {
    console.log(`isActiveToggle: ${isActiveToggle}, isBreak: ${isBreak}`)
    if (isActiveToggle === true) {
      setIsTimerRunning(true);
      console.log('zegar powinien się odpalić jak jesteśmy w trybie przerwy')
    }
  }

 const handleAutoCheckTasks = () => { //i teraz gdzie to wywołać?????????????????????????
  if (isActiveToggle === true) {
    const updatedTasks = tasks.map((task) => {
      return task.pomodoroCount === task.completedPomodoros
        ? { ...task, isDone: true } 
        : task; 
    });
    setTasks(updatedTasks); 
  }
};

  return (
    <main >
      <div id="target">
        <div className="app-box1" style={{backgroundColor: backgroundColor}}>
          <div className="app-box2">
            <div className="navbar-div">
              <Navbar handleSettingsClick={handleSettingsClick}/>
            </div>
            <div className="site-div">
              <div className="site">
                <div className="line-under-navbar"></div>

                <div className="timer1">
                  <div className="timer0">
                    <div className="timer__menu">
                        <TimerMenuBtn text={'Pomodoro'} time={pomodoroTime} bgc={'rgb(186, 73, 73)'} handleTimerChange={handleTimerChange}/> 
                        <TimerMenuBtn text={'Short Break'} time={5} bgc={'rgb(56, 133, 138)'} handleTimerChange={handleTimerChange}/>
                        <TimerMenuBtn text={'Long Break'} time={10} bgc={'rgb(57, 112, 151)'} handleTimerChange={handleTimerChange}/>
                    </div>
                    {/* Licznik */}
                    <TimerDisplay 
                      key={currentTime} 
                      timeInMinutes={currentTime} 
                      isTimerRunning={isTimerRunning}
                    />    

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
                <Checklist tasks={tasks} setTasks={setTasks} backgroundColor={backgroundColor} clickedLiElementIndex={clickedLiElementIndex} setClickedLiElementIndex={setClickedLiElementIndex
                }/>
              </div>
            </div>
          </div>
          {isSettingsClicked && 
          <Settings 
            handleSettingsClick={handleSettingsClick}
            setPomodoroTime={setPomodoroTime}
            pomodoroTime={pomodoroTime}
            isActiveToggle= {isActiveToggle}
            setIsActiveToggle = {setIsActiveToggle}
            handleAutoStartBreaks={handleAutoStartBreaks}
            handleAutoCheckTasks = {handleAutoCheckTasks}
          />}
            
         

        </div>
      </div>
    </main>
  )
}
