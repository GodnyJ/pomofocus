import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useState } from "react";

//atom do zarządzania tablicą tasków

// const [tasks, setTasks] = useState(() => {
//   const savedTasks = localStorage.getItem("tasks");
//   return savedTasks ? JSON.parse(savedTasks) : [];
// });

//czytająca:
// useEffect(() => {
//   localStorage.setItem("tasks", JSON.stringify(tasks));
// }, [tasks]);

interface Task {
  id: number;
  text: string;
  pomodoroCount: number;
  completedPomodoros: number;
  isDone: boolean;
}

export const tasksAtom = atomWithStorage<Task[]>("tasks", []);

export const setTasksAtom = atom(
  (get) => get(tasksAtom), //get - funkcja odczytu
  (get, set, update: (tasks: Task[]) => Task[]) => {
    const currentTask = get(tasksAtom); //pobiera aktualne zadania
    const updatedTasks = update(currentTask); //aktualizuje zadania
    set(tasksAtom, updatedTasks); //ustawia nowy stan
  }
);

// Atom do zarządzania stanem panelu ustawień
export const isSettingsOpenAtom = atom(false);

export const toggleSettingsAtom = atom(
  (get) => get(isSettingsOpenAtom),
  (get, set) => {
    set(isSettingsOpenAtom, !get(isSettingsOpenAtom));
  }
);
