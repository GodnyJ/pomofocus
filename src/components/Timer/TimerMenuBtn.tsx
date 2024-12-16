interface TimerMenuBtnProps {
  text: string;
  modeName: string;
  handleTimerChange: (modeName: string) => void;
}

export default function TimerMenuBtn({
  text,
  modeName,
  handleTimerChange,
}: TimerMenuBtnProps) {
  return (
    <button
      className="timer-menu-btn"
      onClick={() => {
        handleTimerChange(modeName);
      }}
    >
      {text}
    </button>
  );
}
