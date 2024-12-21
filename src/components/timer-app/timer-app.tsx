import { useEffect, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { isSettingsOpenAtom, tasksAtom } from "../../atoms/atoms";
import Checklist from "../Checklist/Checklist";
import Navbar from "../Navbar/Navbar";
import TimerDisplay from "../Timer/TimerDisplay";
import TimerMenu from "../Timer/timer-menu";
import Settings from "../Navbar/Settings";
import ChatWindow from "../ChatWindow";
import "./timer-app.css";
import "../Timer/timer.css";
import { clickedLiElementIndexAtom } from "../Checklist/checklist-atoms";
import {
  initialConfigAtom,
  currentModeAtom,
  isTimerRunningAtom,
  currentTimeAtom,
} from "../../atoms/atoms";

const initialConfig = {
  pomodoro: { initialTime: 25, color: "rgb(186, 73, 73)" },
  shortBreak: { initialTime: 5, color: "rgb(56, 133, 138)" },
  longBreak: { initialTime: 10, color: "rgb(57, 112, 151)" },
};

type ToggleName = "autoStartBreaks" | "autoCheckTasks";
type ModeName = keyof typeof initialConfig;

export default function TimerApp() {
  const [initialConfig, setInitialConfig] = useAtom(initialConfigAtom); //?
  // const currentMode = use;
  const [isSettingsOpen] = useAtom(isSettingsOpenAtom); //tylko odczytuję wartość więc czy powinnam zmienić z useAtom na useAtomValue? jak to się ma do renderów?
  const [, setTasks] = useAtom(tasksAtom);

  // const [currentMode, setCurrentMode] = useState<ModeName>("pomodoro");
  // const currentMode = useAtomValue(currentModeAtom);
  // const setCurrentMode = useSetAtom(currentModeAtom);
  const [currentMode, setCurrentMode] = useAtom(currentModeAtom);
  // const [config, setConfig] = useState(initialConfig);
  // const [currentTime, setCurrentTime] = useState(
  //   config[currentMode].initialTime
  // );

  const currentTime = useAtomValue(currentTimeAtom);

  const [isTimerRunning, setIsTimerRunning] = useAtom(isTimerRunningAtom);

  const [currentTheme, setCurrentTheme] = useState("red"); //lub white

  const [clickedLiElementIndex] = useAtom(clickedLiElementIndexAtom);
  // const mode = initialConfig[currentMode];
  const currentColor = initialConfig[currentMode].color;

  //zarządzanie motywem strony
  useEffect(() => {
    if (currentTheme === "red") {
      import("./timer-app-red-theme.css");
    } else if (currentTheme === "white") {
      import("./timer-app-white-theme.css");
    }
  }, [currentTheme]);

  //aktualizacja czasu przy zmianie trybu
  // już nie potzrebuję useEffect bo to zadanie przejmuje atom pochodny?
  //currentTimeAtom automatycznie aktualizuje wartość gdy currentMode lub initialConfig się zmienią?
  // useEffect(() => {
  //   setCurrentTime(mode.initialTime);
  // }, [mode.initialTime]);

  //start/pauza timera
  const handleStartClickR = () => {
    setIsTimerRunning((prev) => !prev);
  };

  // obsługa przejścia do kolejnego trybu
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

      // przejście do trybu "shortBreak"
      // handleTimerChange1("shortBreak");
      setCurrentMode("shortBreak");
    } else {
      // przejście do trybu "pomodoro" z dowolnego innego trybu
      // handleTimerChange1("pomodoro");
      setCurrentMode("pomodoro");
    }
  };

  // Automatyczne sprawdzanie zadań - nowe
  const handleAutoCheckTasksR = () => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.completedPomodoros >= task.pomodoroCount
          ? { ...task, isDone: true }
          : task
      )
    );
  };

  //-------------------------------------
  // funkcja, która ustawia initialValue w config
  // const processSettingsData = (
  //   modeName: ModeName,
  //   { initialPomodoroTime }: { initialPomodoroTime: number }
  // ) => {
  //   setInitialConfig((oldConfig) => ({
  //     ...oldConfig,
  //     [modeName]: { ...oldConfig[modeName], initialTime: initialPomodoroTime },
  //   }));
  // };

  const handleAutoStartBreaks = () => {
    setIsTimerRunning(true);
  };

  //automatyczne zaznaczanie tasków na done
  const handleAutoCheckTasks = () => {
    setTasks((oldTasks) => {
      console.log("Before update:", oldTasks); // jakie są stare zadania

      // nowa tablica zamiast aktualizować w miejscu dla pewności
      const updatedTasks = oldTasks.map((task) => {
        const pomodoroCount = task.pomodoroCount;
        const completedPomodoros = Number(task.completedPomodoros);
        return completedPomodoros >= pomodoroCount
          ? { ...task, isDone: true }
          : task;
      });

      console.log("After update:", updatedTasks);

      return [...updatedTasks];
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

  const handleToggleClick = (toggleName: ToggleName) => {
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
        // newToggles[toggleName].functionToCall();
      }

      return newToggles;
    });
  };
  //---------------------------------------------------
  //zastąpione
  // const handleTimerChange1 = (modeName) => {
  //   const selectedMode = config[modeName];

  //   setCurrentTime(selectedMode.initialTime);
  //   // setCurrentColor(selectedMode.color);
  //   setCurrentMode(modeName);
  // };

  // const handleTimerChange1 = (modeName: keyof typeof initialConfig) => {
  //   setCurrentMode(modeName);
  // };

  //zastąpione
  // const handleStartClick = () => {
  //   if (currentTime !== 0) {
  //     setIsTimerRunning(!isTimerRunning);
  //   }

  //   if (
  //     !isTimerRunning &&
  //     currentTime === 0 &&
  //     clickedLiElementIndex !== null
  //   ) {
  //     setTasks((prevTasks) =>
  //       prevTasks.map((task) =>
  //         task.id === clickedLiElementIndex
  //           ? { ...task, completedPomodoros: task.completedPomodoros + 1 }
  //           : task
  //       )
  //     );
  //   }
  // };

  // const handleSettingsClick = () => {
  //   setIsSettingsDialogOpen(!isSettingsDialogOpen);
  // };

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
                      <TimerMenu />
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
                        // onClick={handleStartClick}
                        onClick={handleStartClickR}
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
                  // clickedLiElementIndex={clickedLiElementIndex}
                  // setClickedLiElementIndex={setClickedLiElementIndex}
                />
              </div>
            </div>
          </div>
          <ChatWindow />
          {isSettingsOpen && (
            <Settings
              // onDataReady={processSettingsData}
              toggles={toggles}
              handleToggleClick={handleToggleClick}
              setCurrentTheme={setCurrentTheme}
            />
          )}
        </div>
      </div>
    </main>
  );
}

//skończyłam na tym że nie działa ustawianie czasu z palca w settings, - processettingsdata
//dodatkowo trzeba wyniesć funckję handletimerchange to jest też w timermenubtn
