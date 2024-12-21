import "./settings.css";
import DropdownSelect from "./DropdownSelect";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  toggleSettingsAtom,
  updateConfigAtom,
  initialConfigAtom,
  isSettingsOpenAtom,
} from "../../atoms/atoms";

interface ToggleButtonProps {
  isActiveToggle: boolean;
  functionToCall: () => void;
}

function ToggleButton({ isActiveToggle, functionToCall }: ToggleButtonProps) {
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

interface ToggleItem {
  name: string;
  isClicked: boolean;
}

interface Toggles {
  autoStartBreaks: ToggleItem;
  autoCheckTasks: ToggleItem;
}

type ModeName = "pomodoro" | "shortBreak" | "longBreak";

interface SettingsProp {
  // onDataReady: (
  //   modeName: ModeName,
  //   data: { initialPomodoroTime: number }
  // ) => void;
  toggles: Toggles;
  handleToggleClick: (arg: keyof Toggles) => void;
  setCurrentTheme: (arg: string) => void;
}

export default function Settings({
  // onDataReady,
  toggles,
  handleToggleClick,
  setCurrentTheme,
}: SettingsProp) {
  const [, toggleSettings] = useAtom(toggleSettingsAtom);
  const initialConfig = useAtomValue(initialConfigAtom);
  const updateConfig = useSetAtom(updateConfigAtom);
  const setIsSettingsOpen = useSetAtom(isSettingsOpenAtom);

  // const [pomodoroTime, setPomodoroTime] = useState(25);
  // const [shortBreakTime, setShortBreakTime] = useState(5);
  // const [longBreakTime, setLongBreakTime] = useState(10);

  // //=>
  // const [timeSettings, setTimeSettings] = useState({
  //   pomodoro: 25,
  //   shortBreak: 5,
  //   longBreak: 15,
  // }); //

  const handleTimeChange = (
    modeName: keyof typeof initialConfig,
    value: number
  ) => {
    updateConfig({
      modeName,
      initialPomodoroTime: value,
    });
  };

  // const handlePomodoroTimeInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setPomodoroTime(Number(e.target.value));
  // };

  // const handleShortBreakTimeInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setShortBreakTime(Number(e.target.value));
  // };

  // const handleLongBreakTimeInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setLongBreakTime(Number(e.target.value));
  // };

  // //=>
  // const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setTimeSettings((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // }; //

  // const handleOkButton = () => {
  // updateConfig({ modeName: "pomodoro", initialPomodoroTime: pomodoroTime });
  // updateConfig({
  //   modeName: "shortBreak",
  //   initialPomodoroTime: shortBreakTime,
  // });
  // updateConfig({ modeName: "longBreak", initialPomodoroTime: longBreakTime });
  // setIsSettingsOpen(false);
  // console.log("ok");
  // };
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
                  defaultValue={initialConfig.pomodoro.initialTime}
                  min="0"
                  step="1"
                  // onChange={handlePomodoroTimeInputChange}
                  onChange={(e) =>
                    handleTimeChange("pomodoro", Number(e.target.value))
                  }
                />
              </div>
              <div>
                <label>Short Break</label>
                <input
                  className="input__number"
                  type="number"
                  defaultValue={initialConfig.shortBreak.initialTime}
                  min="0"
                  step="1"
                  onChange={(e) =>
                    handleTimeChange("shortBreak", Number(e.target.value))
                  }
                />
              </div>
              <div>
                <label>Long Break</label>
                <input
                  className="input__number"
                  type="number"
                  defaultValue={initialConfig.longBreak.initialTime}
                  min="0"
                  step="1"
                  onChange={(e) =>
                    handleTimeChange("longBreak", Number(e.target.value))
                  }
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
                <div
                  onClick={() => setCurrentTheme("red")}
                  className="settings__color settings__color--new-white"
                ></div>
                <div
                  onClick={() => setCurrentTheme("white")}
                  className="settings__color settings__color--long-break"
                ></div>
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
            <button onClick={() => setIsSettingsOpen(false)}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
}
