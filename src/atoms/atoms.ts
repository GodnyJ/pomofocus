import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import {
  newTaskInputTextAtom,
  newPomodoroCountAtom,
  isTaskFormOpenAtom,
} from "../components/Checklist/checklist-atoms";

type ModeName = "pomodoro" | "shortBreak" | "longBreak";

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

export const initialConfigAtom = atom({
  pomodoro: { initialTime: 25, color: "rgb(186, 73, 73)" },
  shortBreak: { initialTime: 5, color: "rgb(56, 133, 138)" },
  longBreak: { initialTime: 10, color: "rgb(57, 112, 151)" },
});

export const currentModeAtom =
  atom<keyof ReturnType<(typeof initialConfigAtom)["read"]>>("pomodoro");
/*lub
export const initialConfigAtom = atom(initialConfig);
export const currentModeAtom = atom<keyof typeof initialConfig>("pomodoro");
*/

//atom z wbudowaną funckją aktualizacji
export const updateConfigAtom = atom(
  null,
  (
    get,
    set,
    {
      modeName,
      initialPomodoroTime,
    }: { modeName: ModeName; initialPomodoroTime: number }
  ) => {
    set(initialConfigAtom, (oldConfig) => ({
      ...oldConfig,
      [modeName]: { ...oldConfig[modeName], initialTime: initialPomodoroTime },
    }));
  }
);

//atom przechowujący informację czy timer jest uruchomiony
export const isTimerRunningAtom = atom(false);

//ATOM POCHODNY (nie przechowuje swojej własnej wartości) atom obliczający aktualny czas dla timera, nie mogę użyć set
export const currentTimeAtom = atom(
  (get) => get(initialConfigAtom)[get(currentModeAtom)].initialTime
);

//tablica tasków
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

// atom do zarządzania stanem panelu ustawień
export const isSettingsOpenAtom = atom<boolean>(false);

//pewnie zamiast tego mogę zrobić już w komponencie zwykły set z wykrzyknikiem?
export const toggleSettingsAtom = atom(
  (get): boolean => get(isSettingsOpenAtom),
  (get, set): void => {
    set(isSettingsOpenAtom, !get(isSettingsOpenAtom));
  }
);
