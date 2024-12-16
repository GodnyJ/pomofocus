import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { isSettingsOpenAtom, tasksAtom } from "../atoms";
import Checklist from "./Checklist/Checklist";
import Navbar from "./Navbar/Navbar";
import TimerDisplay from "./Timer/TimerDisplay";
import TimerMenuBtn from "./Timer/TimerMenuBtn";
import Settings from "./Navbar/Settings";
import ChatWindow from "./ChatWindow";
import "./timerApp.css";
import "./Timer/timer.css";

const initialConfig = {
  pomodoro: { initialTime: 25, color: "rgb(186, 73, 73)" },
  shortBreak: { initialTime: 5, color: "rgb(56, 133, 138)" },
  longBreak: { initialTime: 10, color: "rgb(57, 112, 151)" },
};

type ModeName = keyof typeof initialConfig;

export default function TimerApp() {
  const [isSettingsOpen] = useAtom(isSettingsOpenAtom); //tylko odczytuję wartość więc czy powinnam zmienić z useAtom na useAtomValue? jak to się ma do renderów?

  const [currentMode, setCurrentMode] = useState<ModeName>("pomodoro");
  const [currentTheme, setCurrentTheme] = useState("white"); //lub white
  const [config, setConfig] = useState(initialConfig);
  const mode = config[currentMode];
  const [currentTime, setCurrentTime] = useState(mode.initialTime); //zrobić zamist current time, elapsedTime - czas który upłynął
  const currentColor = mode.color;
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [clickedLiElementIndex, setClickedLiElementIndex] = useState(0);
  const [tasks, setTasks] = useAtom(tasksAtom);

  // funkcja, która ustawia initialValue w config
  const processSettingsData = (
    modeName: ModeName,
    { initialPomodoroTime }: { initialPomodoroTime: number }
  ) => {
    setConfig((oldConfig) => ({
      ...oldConfig,
      [modeName]: { ...oldConfig[modeName], initialTime: initialPomodoroTime },
    }));
  };

  //zarządzanie motywem strony
  useEffect(() => {
    if (currentTheme === "red") {
      import("./timerAppRedTheme.css");
    } else if (currentTheme === "white") {
      import("./timerApp-white-theme.css");
    }
  }, [currentTheme]);

  useEffect(() => {
    setCurrentTime(mode.initialTime);
  }, [mode.initialTime]);

  const handleAutoStartBreaks = () => {
    setIsTimerRunning(true);
  };

  //automatyczne zaznaczanie tasków na done - NIE DZIAŁA
  const handleAutoCheckTasks = () => {
    setTasks((oldTasks) => {
      console.log("Before update:", oldTasks); // jakie są stare zadania

      // nowa tablica zamiast aktualizować w miejscu dla pewności
      const updatedTasks = oldTasks.map((task) => {
        const pomodoroCount = Number(task.pomodoroCount);
        const completedPomodoros = Number(task.completedPomodoros);
        return completedPomodoros >= pomodoroCount
          ? { ...task, isDone: true }
          : task;
      });

      console.log("After update:", updatedTasks); //czy zadania się zmieniają

      return [...updatedTasks]; // tworze tablice aby React wymusił ponowne renderowanie - ale to nic nie dało
    });
  };

  const autoConfig = {
    autoStartBreaks: handleAutoStartBreaks,
    autoCheckTasks: handleAutoCheckTasks,
  };

  const [toggles, setToggles] = useState({
    autoStartBreaks: {
      name: "Auto Start Breaks",
      isClicked: false,
    },
    autoCheckTasks: {
      name: "Auto Check Tasks",
      isClicked: false,
    },
  });

  const handleToggleClick = (toggleName) => {
    setToggles((prevToggles) => {
      const newToggles = {
        ...prevToggles,
        [toggleName]: {
          ...prevToggles[toggleName],
          isClicked: !prevToggles[toggleName].isClicked,
        },
      };

      if (newToggles[toggleName].isClicked === true) {
        console.log(`${toggleName} clicked`);
        autoConfig[toggleName]();
        newToggles[toggleName].functionToCall();
      }

      return newToggles;
    });
  };
  //---------------------------------------------------

  const handleTimerChange1 = (modeName) => {
    const selectedMode = config[modeName];

    setCurrentTime(selectedMode.initialTime);
    // setCurrentColor(selectedMode.color);
    setCurrentMode(modeName);
    console.log(currentMode);
    console.log(currentColor);
    console.log(selectedMode.color);
  };

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
          task.id === clickedLiElementIndex
            ? { ...task, completedPomodoros: task.completedPomodoros + 1 }
            : task
        )
      );
    }
  };

  //aktualnie w użyciu
  const handleNextClick1 = () => {
    if (currentMode === "pomodoro") {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === clickedLiElementIndex
            ? { ...task, completedPomodoros: task.completedPomodoros + 1 }
            : task
        )
      );

      // Sprawdzam, czy opcja "Auto Check Tasks" jest włączona
      if (toggles.autoCheckTasks.isClicked) {
        handleAutoCheckTasks();
      } // Wywołanie funkcji tylko wtedy, gdy toggle jest na "true"

      //switch
      handleTimerChange1("shortBreak");
      // setCurrentMode("shortBreak")
    } else if (currentMode === "shortBreak") {
      handleTimerChange1("pomodoro");
      // setCurrentMode("pomodoro")
    } else if (currentMode === "longBreak") {
      handleTimerChange1("pomodoro");
      // setCurrentMode("pomodoro")
    }
  };

  const handleSettingsClick = () => {
    setIsSettingsDialogOpen(!isSettingsDialogOpen);
  };

  // renderowanie ikony lub tekstu w zależności od wybranego motywu
  const renderStartBtnContent = () => {
    if (currentTheme === "red") {
      return isTimerRunning ? "Pause" : "Start";
    }
    return <img className="play-icon" src="../../public/icons/play-icon.png" />;
  };

  return (
    <main>
      {/* <SignupPage /> */}
      <div id="target">
        <div className="app-box1" style={{ backgroundColor: currentColor }}>
          <div className="app-box2">
            <div className="navbar-div">
              <Navbar />
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
                        handleTimerChange={handleTimerChange1}
                      />
                      <TimerMenuBtn
                        text={"Short Break"}
                        modeName={"shortBreak"}
                        handleTimerChange={handleTimerChange1}
                      />
                      <TimerMenuBtn
                        text={"Long Break"}
                        modeName={"longBreak"}
                        handleTimerChange={handleTimerChange1}
                      />
                    </div>
                    {/* Licznik */}
                    <TimerDisplay
                      key={currentTime}
                      initialTimeInMinutes={currentTime}
                      isTimerRunning={isTimerRunning}
                      // handleNextClick1={handleNextClick1}
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
                        {/* {isTimerRunning && currentTheme === "red" ? (
                          "Pause"
                        ) : !isTimerRunning && currentTheme === "red" ? (
                          "Start"
                        ) : (
                          <img
                            className="play-icon"
                            src="../../public/icons/play-icon.png"
                          />
                        )} */}
                        {renderStartBtnContent()}
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
                  backgroundColor={currentColor}
                  clickedLiElementIndex={clickedLiElementIndex}
                  setClickedLiElementIndex={setClickedLiElementIndex}
                />
              </div>
            </div>
          </div>
          <ChatWindow />
          {isSettingsOpen && (
            <Settings
              onDataReady={processSettingsData}
              // handleSettingsClick={handleSettingsClick}
              // setPomodoroTime={setPomodoroTime}
              // pomodoroTime={pomodoroTime}
              // isActiveToggle={isActiveToggle}
              // setIsActiveToggle={setIsActiveToggle}
              toggles={toggles}
              handleToggleClick={handleToggleClick}
              setCurrentTheme={setCurrentTheme}
              // handleAutoStartBreaks={handleAutoStartBreaks}
              // handleAutoCheckTasks={handleAutoCheckTasks}
            />
          )}
        </div>
      </div>
    </main>
  );
}
