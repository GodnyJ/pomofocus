import { useSetAtom, useAtomValue } from "jotai";
import { currentModeAtom } from "../../atoms/atoms";
import { timerMenuConfigAtom } from "./timer-menu-atoms";

export default function TimerMenu() {
  const timerMenuConfig = useAtomValue(timerMenuConfigAtom);
  const setCurrentMode = useSetAtom(currentModeAtom);
  return (
    <div>
      {timerMenuConfig.map(({ text, modeName }) => (
        <button
          key={modeName}
          className="timer-menu-btn"
          onClick={() => setCurrentMode(modeName)}
        >
          {text}
        </button>
      ))}
    </div>
  );
}
