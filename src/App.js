import React, { useEffect, useState } from "react";
import Checklist from "./components/Checklist/Checklist";
import Navbar from "./components/Navbar/Navbar";
// import Timer from "./components/Timer/Timer";
import TimerDisplay from "./components/Timer/TimerDisplay";
import TimerMenuBtn from "./components/Timer/TimerMenuBtn";
import "./App.css";
import "./components/Timer/timer.css";
import Settings from "./components/Navbar/Settings";
import { isValidInputTimeValue } from "@testing-library/user-event/dist/utils";

export default function App() {

  const [currentMode, setCurrentMode] = useState("pomodoro");
  const [config, setConfig] = useState({
    pomodoro: {initialTime: 25, color: "rgb(186, 73, 73)"},
    shortBreak: {initialTime: 5, color: "rgb(56, 133, 138)"},
    longBreak: {initialTime: 10, color: "rgb(57, 112, 151)"},
  });

  // funkcja, która ustawia initialValue w config
  const processSettingsData = (modeName,{ initialPomodoroTime }) => { //dlaczego tu przyjmujemy obiekt?, modename to nazwa trybu
    setConfig((oldConfig) => ({
      ...oldConfig,
      [modeName]: { ...oldConfig[modeName], initialTime: initialPomodoroTime },
    }));
  };

  const mode = config[currentMode];
//zrobić zamist current time, elapsedTime - czas który upłyną

  const [currentTime, setCurrentTime] = useState(mode.initialTime);
  // const [currentColor, setCurrentColor] = useState(mode.color);

  const currentColor = mode.color;

  useEffect(() => {
    setCurrentTime(mode.initialTime);
  },[mode.initialTime])

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [clickedLiElementIndex, setClickedLiElementIndex] = useState(0);

  //Settings.js
  // const [pomodoroTime, setPomodoroTime] = useState(25);
  // const [isActiveToggle, setIsActiveToggle] = useState(false);

  //na 15.10 z toggleButton
  const handleAutoStartBreaks = () => {
    setIsTimerRunning(true);
  };

  const handleAutoCheckTasks = () => {
    console.log({tasks});
    // if (isActiveToggle === true) { //nie robiłabym już ifa skoro jest w handleToggleClick wywołyanie funckji tylko jak jest true
      const updatedTasks = tasks.map((task) => {
        return task.pomodoroCount === task.completedPomodoros
          ? { ...task, isDone: true }
          : task;
      });
      
      setTasks(updatedTasks);
    // }
  };

  const [toggles, setToggles] = useState({
    autoStartBreaks: {name: "Auto Start Breaks", isClicked: false, functionToCall: handleAutoStartBreaks},
    autoCheckTasks: {name: "Auto Check Tasks", isClicked: false, functionToCall: handleAutoCheckTasks}
  })  

  const handleToggleClick = (toggleName) => {
    setToggles((prevToggles) => {
        const newToggles = {
          ...prevToggles,
          [toggleName]: {
            ...prevToggles[toggleName],
            isClicked: !prevToggles[toggleName].isClicked,
          },
        };
      
        if (newToggles[toggleName].isClicked === true ) {
          newToggles[toggleName].functionToCall();
        }
      
        return newToggles; //muszę? 
      }); 
  };
  //---------------------------------------------------

  const handleTimerChange1 = (modeName) => {
    const selectedMode = config[modeName];

    setCurrentTime(selectedMode.initialTime);
    // setCurrentColor(selectedMode.color);
    setCurrentMode(modeName)
    console.log(currentMode)
    console.log(currentColor)
    console.log(selectedMode.color)
  }

  const handleStartClick = () => {
    if (currentTime !== 0) {
      setIsTimerRunning(!isTimerRunning);
    }

    if (
      !isTimerRunning &&
      currentTime === 0 &&
      clickedLiElementIndex !== null
    ) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.index === clickedLiElementIndex
            ? { ...task, completedPomodoros: task.completedPomodoros + 1 }
            : task
        )
      );
    }
  };



  //aktualnie w użyciu 
  const handleNextClick1 = () => {
    if(currentMode === 'pomodoro') {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.index === clickedLiElementIndex
            ? { ...task, completedPomodoros: task.completedPomodoros + 1 }
            : task
        )
      );

//switch
      handleTimerChange1('shortBreak');
      // setCurrentMode("shortBreak")
    } else if (currentMode === 'shortBreak') {
      handleTimerChange1('pomodoro');
      // setCurrentMode("pomodoro")
    } else if (currentMode === 'longBreak') {
      handleTimerChange1('pomodoro');
      // setCurrentMode("pomodoro")
    }
  
  } 

  const handleSettingsClick = () => {
    setIsSettingsDialogOpen(!isSettingsDialogOpen);
  };

  return (
    <main>
      <div id="target">
        <div className="app-box1" style={{ backgroundColor: currentColor }}>
          <div className="app-box2">
            <div className="navbar-div">
              <Navbar handleSettingsClick={handleSettingsClick} />
            </div>
            <div className="site-div">
              <div className="site">
                <div className="line-under-navbar"></div>

                <div className="timer1">
                  <div className="timer0">
                    <div className="timer__menu">
                      <TimerMenuBtn
                        text={"Pomodoro"}
                        modeName={"pomodoro"}
                        // time={config.pomodoro.initialTime}
                        // bgc={config.pomodoro.color}
                        handleTimerChange={handleTimerChange1}
                      />
                      <TimerMenuBtn
                        text={"Short Break"}
                        modeName={"shortBreak"}
                        // time={config.shortBreak.initialTime}
                        // bgc={config.shortBreak.color}
                        handleTimerChange={handleTimerChange1}
                      />
                      <TimerMenuBtn
                        text={"Long Break"}
                        modeName={"longBreak"}
                        // time={config.longBreak.initialTime}
                        // bgc={config.longBreak.color}
                        handleTimerChange={handleTimerChange1}
                      />
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
                        className={`timer__button--start ${
                          isTimerRunning ? "timer__button--start-active" : ""
                        }`}
                        onClick={handleStartClick}
                        style={{ color: currentColor }}
                      >
                        {isTimerRunning ? "Pause" : "Start"}
                      </button>

                      {/* Jeśli Timer pracuje wyświetl przycisk przejścia */}
                      {isTimerRunning ? (
                        <button
                          className="timer__button--next"
                          onClick={handleNextClick1}
                        >
                          <img
                            src="icons/next-white3.png"
                            alt="next arrow icon"
                          />
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
                <Checklist
                  tasks={tasks}
                  setTasks={setTasks}
                  backgroundColor={currentColor}
                  clickedLiElementIndex={clickedLiElementIndex}
                  setClickedLiElementIndex={setClickedLiElementIndex}
                />
              </div>
            </div>
          </div>
          {isSettingsDialogOpen && (
            <Settings
              onDataReady={processSettingsData}
              handleSettingsClick={handleSettingsClick}
              // setPomodoroTime={setPomodoroTime}
              // pomodoroTime={pomodoroTime}
              // isActiveToggle={isActiveToggle}
              // setIsActiveToggle={setIsActiveToggle}
              toggles={toggles}
              handleToggleClick={handleToggleClick}
              handleAutoStartBreaks={handleAutoStartBreaks}
              handleAutoCheckTasks={handleAutoCheckTasks}
            />
          )}
        </div>
      </div>
    </main>
  );
}
