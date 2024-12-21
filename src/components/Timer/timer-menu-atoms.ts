import { atom } from "jotai";

type ModeName = "pomodoro" | "shortBreak" | "longBreak";

export const timerMenuConfigAtom = atom<{ text: string; modeName: ModeName }[]>(
  [
    { text: "Pomodoro", modeName: "pomodoro" },
    { text: "Short Break", modeName: "shortBreak" },
    { text: "Long Break", modeName: "longBreak" },
  ]
);
