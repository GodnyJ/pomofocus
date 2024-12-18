import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import {
  newTaskInputTextAtom,
  newPomodoroCountAtom,
  isTaskFormOpenAtom,
} from "../components/Checklist/checklist-atoms";

interface Subtask {
  id: number;
  text: string;
  pomodoroCount?: number;
  completedPomodoros?: number;
  isDone: boolean;
}
interface Task {
  id: number;
  text: string;
  pomodoroCount: number;
  completedPomodoros: number;
  isDone: boolean;
  subtasks?: Subtask[];
}

export const tasksAtom = atomWithStorage<Task[]>("tasks", []);

export const setTasksAtom = atom(
  (get): Task[] => get(tasksAtom), //get - funkcja odczytu
  (get, set, update: (tasks: Task[]) => Task[]): void => {
    const currentTask = get(tasksAtom); //pobiera aktualne zadania
    const updatedTasks = update(currentTask); //aktualizuje zadania
    set(tasksAtom, updatedTasks); //ustawia nowy stan
  }
);

export const addTaskAtom = atom(null, (get, set) => {
  const newTaskInputText = get(newTaskInputTextAtom).trim();
  const newPomodoroCount = get(newPomodoroCountAtom);
  const currentTasks = get(tasksAtom);

  if (newTaskInputText === "") {
    return;
  }

  const newTask: Task = {
    id: Date.now(),
    text: newTaskInputText,
    pomodoroCount: newPomodoroCount,
    completedPomodoros: 0,
    isDone: false,
  };

  set(tasksAtom, [...currentTasks, newTask]);
  set(newTaskInputTextAtom, "");
  set(isTaskFormOpenAtom, false);
});

// Atom do zarządzania stanem panelu ustawień
export const isSettingsOpenAtom = atom<boolean>(false);

export const toggleSettingsAtom = atom(
  (get): boolean => get(isSettingsOpenAtom),
  (get, set): void => {
    set(isSettingsOpenAtom, !get(isSettingsOpenAtom));
  }
);
