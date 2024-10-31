import React from "react";
import "./settings.css";
import DropdownSelect from "./DropdownSelect";
import { useState } from "react";
import { useAtom } from "jotai";
import { toggleSettingsAtom } from "../../atoms";

function ToggleButton({ isActiveToggle, functionToCall }) {
  //nowe--------------------------------------
  //przeniosłam do settings - czy powinnam?
  // const [toggles, setToggles] = useState({
  //     autoStartBreaks: {name: "Auto Start Breaks", isClicked: false, functionToCall: handleAutoStartBreaks},
  //     autoCheckTasks: {name: "Auto Check Tasks", isClicked: false, functionToCall: handleAutoCheckTasks}
  // })

  // const handleToggleClick = (toggleName) => {
  //     setToggles((prevToggles) => {
  //         const newToggles = {
  //           ...prevToggles,
  //           [toggleName]: {
  //             ...prevToggles[toggleName],
  //             isClicked: !prevToggles[toggleName].isClicked,
  //           },
  //         };

  //         if (newToggles[toggleName].isClicked === true ) {
  //           newToggles[toggleName].functionToCall();
  //         }

  //         return newToggles; //muszę?
  //       });
  //   };
  //----------------------------------------

  //stare--------------------
  // const handleClickToggleButton = () => {
  //     setIsActiveToggle(!isActiveToggle)

  //     console.log(isActiveToggle)

  //     if (isActiveToggle === true) {
  //         functionToCall();
  //         console.log('powinno wywołać funkcję function to call')
  //     }
  // };
  //---------------------

  return (
    <div
      className={`settings__toggle-btn ${isActiveToggle ? "settings__toggle-btn-active" : ""}`}
      onClick={functionToCall}
    >
      <div
        className={`settings__toggle-btn--circle ${isActiveToggle ? "settings__toggle-btn--circle-active" : ""}`}
      ></div>
    </div>
  );
}

export default function Settings({
  onDataReady,

  toggles,
  // handleAutoStartBreaks, tego nie potrzebuję bo handle toggle tutaj wywołuje  nazwą a nie tą fnckją
  // handleAutoCheckTasks,
  handleToggleClick,

  handleSettingsClick,
  // setPomodoroTime,
  // pomodoroTime,
  // isActiveToggle,
  // setIsActiveToggle
}) {
  //na 05.11
  const [, toggleSettings] = useAtom(toggleSettingsAtom);

  //na 15.10
  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(10);

  const handlePomodoroTimeInputChange = (e) => {
    setPomodoroTime(e.target.value);
  };
  const handleShortBreakTimeInputChange = (e) => {
    setShortBreakTime(e.target.value);
  };
  const handleLongBreakTimeInputChange = (e) => {
    setLongBreakTime(e.target.value);
  };

  const handleOkButton = () => {
    onDataReady("pomodoro", { initialPomodoroTime: pomodoroTime });
    onDataReady("shortBreak", { initialPomodoroTime: shortBreakTime });
    onDataReady("longBreak", { initialPomodoroTime: longBreakTime });
    toggleSettings();
    // console.log(pomodoroTime)
  };
  //tu koniec

  return (
    <div className="settings-box2">
      <div className="settings-box1">
        <div className="settings-box0">
          <div className="settings__title">
            <h2>Settings</h2>
            <img
              src="/icons/remove-black-sm.png"
              onClick={toggleSettings}
              alt="exit icon"
            />
          </div>
          <div className="settings">
            <h3 className="settings-title__section">
              <img src="/icons/clock-black.png" alt="clock icon" />
              Timer
            </h3>
            <span className="settings__item">Time - minutes</span>
            <div className="settings__timer-box">
              <div>
                <label>Pomodoro</label>
                <input
                  className="input__number"
                  type="number"
                  defaultValue={pomodoroTime}
                  min="0"
                  step="1"
                  onChange={handlePomodoroTimeInputChange}
                />
              </div>
              <div>
                <label>Short Break</label>
                <input
                  className="input__number"
                  type="number"
                  defaultValue={shortBreakTime}
                  min="0"
                  step="1"
                  onChange={handleShortBreakTimeInputChange}
                />
              </div>
              <div>
                <label>Long Break</label>
                <input
                  className="input__number"
                  type="number"
                  defaultValue={longBreakTime}
                  min="0"
                  step="1"
                  onChange={handleLongBreakTimeInputChange}
                />
              </div>
            </div>

            <div className="settings__item">
              <span>Auto Start Breaks</span>
              <ToggleButton
                isActiveToggle={toggles.autoStartBreaks.isClicked}
                functionToCall={() => handleToggleClick("autoStartBreaks")}
              />
            </div>
            <div className="settings__item">
              <span>Auto Start Pomodoros</span>
              {/* <ToggleButton isActiveToggle={toggles.autoStartBreaks.isClicked} functionToCall={handleAutoStartPomodoro}/> */}
            </div>
            <div className="settings__item">
              <span>Long Break interval</span>
              <input
                className="input__number"
                type="number"
                defaultValue={4}
                min="0"
                step="1"
              />
            </div>

            <div className="settings-line"></div>

            <h3 className="settings-title__section">
              <img src="/icons/check-black.png" alt="clock icon" />
              Task
            </h3>

            <div className="settings__item">
              <span>Auto Check Tasks</span>
              <ToggleButton
                isActiveToggle={toggles.autoCheckTasks.isClicked}
                functionToCall={() => handleToggleClick("autoCheckTasks")}
              />
            </div>
            <div className="settings__item">
              <span>Auto Switch Tasks</span>
              {/* <ToggleButton isActiveToggle={isActiveToggle} setIsActiveToggle={setIsActiveToggle} functionToCall={handleAutoSwitchTask}/> */}
            </div>

            <div className="settings-line"></div>

            <h3 className="settings-title__section">
              <img src="/icons/sound-black2.png" alt="clock icon" />
              Sound
            </h3>

            <div className="settings__item top">
              <span className="top-span">Alarm Sound</span>
              <div className="settings__inputs-box">
                <DropdownSelect
                  options={["Bell", "Bird", "Digital", "Kitchen", "Wood"]}
                />
                <div className="input__range-box">
                  <div className="input__range-number">50</div>
                  <input
                    className="settings__input--range"
                    type="range"
                    defaultValue={50}
                    min="0"
                    max="100"
                  />
                </div>
                <div className="settings__repeat">
                  <span>repeat</span>
                  <input
                    className="input__number"
                    type="number"
                    defaultValue={4}
                    min="0"
                    step="1"
                  />
                </div>
              </div>
            </div>
            <div className="settings__item top">
              <span className="top-span">Ticking Sound</span>
              <div className="settings__inputs-box">
                <DropdownSelect
                  options={[
                    "None",
                    "Ticking Fast",
                    "Ticking Slow",
                    "White Noise",
                    "Brown Noise",
                  ]}
                />
                <div className="input__range-box">
                  <div className="input__range-number">50</div>
                  <input
                    className="settings__input--range"
                    type="range"
                    defaultValue={50}
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>

            <div className="settings-line"></div>

            <h3 className="settings-title__section">
              <img src="/icons/theme-black.png" alt="clock icon" />
              Theme
            </h3>

            <div className="settings__item">
              <span>Color Themes</span>
              <div className="settings__color-box">
                <div className="settings__color settings__color--pomodor"></div>
                <div className="settings__color settings__color--short-break"></div>
                <div className="settings__color settings__color--long-break"></div>
              </div>
            </div>

            <div className="settings__item">
              <span>Hour Format</span>
              <div>
                <DropdownSelect options={["24-hour", "12-hour"]} />
              </div>
            </div>
            <div className="settings__item">
              <span>Dark Mode when running</span>
              {/* <ToggleButton isActiveToggle={isActiveToggle} setIsActiveToggle={setIsActiveToggle} functionToCall={handleDarkMode}/> */}
            </div>
            <div className="settings__item">
              <span>Small Window</span>
              <div>
                <button className="settings__item-btn">
                  Open
                  <img src="/icons/external-link.svg" alt="open icon" />
                </button>
              </div>
            </div>

            <div className="settings-line"></div>

            <h3 className="settings-title__section">
              <img src="/icons/notification-black.png" alt="clock icon" />
              Notification
            </h3>

            <div className="settings__item">
              <span>Reminder</span>
              <div className="settings__reminder">
                <DropdownSelect options={["Last", "Every"]} />
                <input
                  className="input__number"
                  type="number"
                  defaultValue={4}
                  min="0"
                  step="1"
                />
                <p>min</p>
              </div>
            </div>

            <div className="settings__item">
              <span>
                Mobile Alarm
                <img
                  className="mobile-alarm-icon"
                  src="/icons/information-black2.png"
                  alt="clock icon"
                />
              </span>
              <button className="mobile-alarm-button">+Add this device</button>
            </div>

            <div className="settings-line"></div>

            <h3 className="settings-title__section">
              <img src="/icons/integration-black.png" alt="clock icon" />
              Integration
            </h3>

            <div className="settings__item">
              <span>
                Todoist
                <img
                  className="mobile-alarm-icon"
                  src="/icons/information-black2.png"
                  alt="clock icon"
                />
              </span>
              <div>
                <button className="settings__item-btn">
                  Connect
                  <img src="/icons/lock-black.png" alt="open icon" />
                </button>
              </div>
            </div>

            <div className="settings__item">
              <span>
                Webhook
                <img
                  className="mobile-alarm-icon"
                  src="/icons/information-black2.png"
                  alt="clock icon"
                />
              </span>
              <div>
                <button className="settings__item-btn">
                  Add
                  <img src="/icons/lock-black.png" alt="open icon" />
                </button>
              </div>
            </div>
          </div>
          <div className="settings__footer">
            <button onClick={handleOkButton}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
}
