import { atom } from "jotai";

export const newTaskInputTextAtom = atom(""); //newTask - też do task-form

//set do newTaskTextAtom - czyli przekazuje do stanu tekst z inputu
//value - wartość na jaką ma być ustawiony stan
export const handleTaskInputChangeAtom = atom(
  //handleTaskInputChange - też do task-form
  null, //oznacza, ze atom nie przechowuje swojego stanu
  (_get, set, value: string) => {
    //_podreślam, ze get nie jest używane, nie ma porzeby tutaj pobierać info jaki jest aktualny task text
    if (value.trim() !== "") set(newTaskInputTextAtom, value);
  } // drugi argument to funckja write, zmieniająca stan innego atomu
);

//do ustawiania liczby pomodoro w task form nowego zadania
export const newPomodoroCountAtom = atom(1); //pomodoroCount - też do task-form

// funkcja pobierająca liczbę z inputu task-form i ustawiająca stan pomodoroCount dla danego zadania
export const handleNewPomodoroCountInputChangeAtom = atom(
  null,
  (_get, set, value: number) => {
    set(newPomodoroCountAtom, value);
  }
);

//zmniejszamy liczbę pomodoro na click
export const increaseNewPomodoroContAtom = atom(null, (get, set) => {
  const currentPomoCount = get(newPomodoroCountAtom);
  set(newPomodoroCountAtom, currentPomoCount + 1);
  //lub
  //set(newPomodoroCountAtom, get(newPomodoroCountAtom) + 1);
});

//zwiększamy liczbę pomodoro na click
export const decreaseNewPomodoroCountAtom = atom(null, (get, set) => {
  set(newPomodoroCountAtom, Math.max(1, get(newPomodoroCountAtom) - 1)); // nie możemy przypisać mniej niż jedno pomodoro dla zadania
});

export const isTaskFormOpenAtom = atom(false); //isAddingTask - pokazywanie i chowanie formularza dodawania tasków

export const handleTaskFormOpenAtom = atom(null, (_get, set) => {
  set(isTaskFormOpenAtom, true);
});
