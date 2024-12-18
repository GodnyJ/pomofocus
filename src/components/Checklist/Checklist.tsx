import React, { useState } from "react";
import "./checklist.css";
import TaskForm from "./task-form/task-form";
import { useAtom } from "jotai";
import { tasksAtom, addTaskAtom } from "../../atoms/atoms";
import {
  newTaskInputTextAtom,
  newPomodoroCountAtom,
  isTaskFormOpenAtom,
  handleTaskFormOpenAtom,
} from "./checklist-atoms";

const initialTasks = [
  {
    id: 1,
    text: "task nr 1",
    pomodoroCount: 1,
    completedPomodoros: 0,
    isDone: false,
    subtasks: [
      {
        id: 11,
        text: "subtask nr 1",
        pomodoroCount: 1,
        completedPomodoros: 0,
        isDone: false,
      },
      {
        id: 12,
        text: "subtask nr 2",
        pomodoroCount: 2,
        completedPomodoros: 0,
        isDone: false,
      },
      {
        id: 13,
        text: "subtask nr 3",
        pomodoroCount: 2,
        completedPomodoros: 0,
        isDone: false,
      },
    ],
  },
  {
    id: 2,
    text: "task nr 2",
    pomodoroCount: 1,
    completedPomodoros: 0,
    isDone: false,
    subtasks: [
      {
        id: 21,
        text: "subtask nr 21",
        pomodoroCount: 1,
        completedPomodoros: 0,
        isDone: false,
      },
      {
        id: 22,
        text: "subtask nr 22",
        pomodoroCount: 2,
        completedPomodoros: 0,
        isDone: false,
      },
      {
        id: 23,
        text: "subtask nr 23",
        pomodoroCount: 2,
        completedPomodoros: 0,
        isDone: false,
      },
    ],
  },
];

type ChecklistProps = {
  backgroundColor: string;
  clickedLiElementIndex: number;
  setClickedLiElementIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function Checklist({
  backgroundColor,
  clickedLiElementIndex,
  setClickedLiElementIndex,
}: ChecklistProps) {
  const [newTask, setNewTask] = useState<string>("");
  const [isAddingTask, setIsAddingTask] = useState(false); // czy tutaj potrzebuje stanu?
  const [pomodoroCount, setPomodoroCount] = useState<number>(1);
  const [tasks, setTasks] = useAtom(tasksAtom);
  // const [tasks, setTasks] = useState(initialTasks);

  const [newTaskInputText, setNewTaskInputText] = useAtom(newTaskInputTextAtom);
  const [newPomodoroCount] = useAtom(newPomodoroCountAtom);
  const [isTaskFormOpen] = useAtom(isTaskFormOpenAtom);
  const [, handleTaskFormOpen] = useAtom(handleTaskFormOpenAtom);
  const [, addTask] = useAtom(addTaskAtom);

  // function addTask() {
  //   // if (newTask.trim() === "") {
  //   if (newTaskInputText.trim() === "") {
  //     return;
  //   }

  //   const newTaskObj = {
  //     id: Date.now(),
  //     // text: newTask,
  //     text: newTaskInputText,
  //     // pomodoroCount: pomodoroCount,
  //     pomodoroCount: newPomodoroCount,
  //     completedPomodoros: 0,
  //     isDone: false,
  //   };
  //   setTasks([...tasks, newTaskObj]);
  //   // setNewTask("");
  //   setNewTaskInputText("");
  //   setIsAddingTask(false);
  // }

  //teraz jest handleTaskInputChangeAtom
  // const handleTaskInputChange = (taskTitle: string) => {
  //   setNewTask(taskTitle);
  // };

  // Funkcja pobierająca liczbę z inputu pomodoro i ustawiająca stan pomodoro dla danego zadania
  // const handlePomodoroInput = (valuePom: number) => {
  //   setPomodoroCount(valuePom);
  // };

  const showTaskForm = () => {
    setIsAddingTask(true);
  };
  //zmienić z index
  // const handleChangeIsDoneValue = (taskIndex) => {
  //     const updatedTask = tasks.map((task, index) =>
  //         taskIndex === index ? { ...task, isDone: !task.isDone } : task
  //     );
  //     setTasks(updatedTask);
  // }
  const handleChangeIsDoneValue = (taskId: number) => {
    setTasks((oldTasks) =>
      oldTasks.map((task) =>
        taskId === task.id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  // const increasePomodoroCount = () => {
  //   setPomodoroCount((prevCount) => prevCount + 1);
  // };

  // const decreasePomodoroCount = () => {
  //   setPomodoroCount((prevCount) => Math.max(prevCount - 1, 1));
  // };

  const whichLiElementIsClicked = (taskId: number) => {
    setClickedLiElementIndex(taskId);
    console.log(clickedLiElementIndex);
    console.log(tasks);
  };

  //------------------------------------------------------------
  const handleAddSubtask = (parentTaskId: number, subtaskText: string[]) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === parentTaskId
          ? {
              ...task,
              subtasks: [
                ...(task.subtasks || []),
                ...subtaskText.map((text, index) => ({
                  id: (task.subtasks?.length || 0) + index + 1,
                  text,
                  pomodoroCount: 1,
                  completedPomodoros: 0,
                  isDone: false,
                })),
              ],
            }
          : task
      )
    );
  };
  //--------------------------------------------------------------

  //otwieranie i zamykanie input subtask
  const [activeSubtaskId, setActiveSubtaskId] = useState<number | null>(null); //id zadania z otwartym inputem do wpisania subtasków

  const toggleSubtaskInput = (taskId: number) => {
    if (activeSubtaskId === taskId) {
      // jeśli kliknięte zadanie już ma otwarty input, zamknij input
      setActiveSubtaskId(null);
    } else {
      // jeśli kliknięte zadanie nie ma otwartego inputu, otwórz input
      setActiveSubtaskId(taskId);
    }
  };

  //funkcja, która doda tekst z inputu do subtasks konkretnego taska
  const [subtaskText, setSubtaskText] = useState("");

  const handleSubtaskInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubtaskText(e.target.value);
    console.log(subtaskText);
  };

  const addSubtask = (taskId: number) => {
    if (subtaskText.trim() === "") return;
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: [
                ...(task.subtasks || []),
                {
                  id: Date.now(),
                  text: subtaskText,
                  pomodoroCount: 1,
                  completedPomodoros: 0,
                  isDone: false,
                },
              ],
            }
          : task
      )
    );

    setSubtaskText("");
    setActiveSubtaskId(null);
  };

  return (
    <div className="checklist-section">
      <p className="checklist__current-task">
        {tasks.map((task) =>
          clickedLiElementIndex === task.id ? task.text : ""
        )}
      </p>
      <div className="checklist__title-box">
        <h2>Tasks</h2>
        <button className="title__option-btn">
          <img src="icons/threedots-white.png" alt="option button" />
        </button>
      </div>

      {/* Wyświetlanie listy zadań */}
      <div>
        <ul className="checklist__ul-tasks-box">
          {tasks
            .sort((a, b) => Number(a.isDone) - Number(b.isDone))
            .map((task) => (
              <React.Fragment key={task.id}>
                <li
                  key={task.id}
                  className={`checklist__task-item ${clickedLiElementIndex === task.id ? "clicked-li-element" : ""}`}
                  onClick={() => whichLiElementIsClicked(task.id)}
                >
                  <div className="task-item__left-site">
                    <input
                      className="task-item__checkbox"
                      type="checkbox"
                      checked={task.isDone}
                      onChange={() => handleChangeIsDoneValue(task.id)}
                    />
                    <span className="task-item__checkbox-custom">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
                            fill={task.isDone ? backgroundColor : "#DFDFDF"}
                          ></path>{" "}
                        </g>
                      </svg>
                    </span>
                    <span
                      className={`task-item__text ${task.isDone ? "checked" : ""}`}
                    >
                      {task.text}
                    </span>
                  </div>
                  <div>
                    <span className="task-item__counter">
                      {task.completedPomodoros}
                      <span>/ {task.pomodoroCount}</span>
                    </span>
                    {/* otwieranie i zamykanie inputu do subtasków */}
                    <button
                      className="add-subtask"
                      onClick={() => toggleSubtaskInput(task.id)}
                    >
                      +
                    </button>
                    {activeSubtaskId === task.id && (
                      <div>
                        <label htmlFor="input-subtask">Add subtask</label>
                        <input
                          type="text"
                          className="input-subtask"
                          onChange={handleSubtaskInputChange}
                        />
                        <button onClick={() => addSubtask(task.id)}>Add</button>
                      </div>
                    )}
                    <button className="task-item__option-btn">
                      <img
                        className="threedots-img"
                        src="icons/threedots-black.png"
                        alt="option button"
                      />
                    </button>
                  </div>
                </li>
                {task.subtasks && task.subtasks.length > 0 && (
                  <ul>
                    {task.subtasks.map((subtask) => (
                      <li key={subtask.id} className="checklist__subtask-item">
                        {subtask.text}
                      </li>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
        </ul>
      </div>

      {/* Renderowanie warunkowe formularza do dodawania zadań */}
      {isTaskFormOpen && (
        <TaskForm
        // addTask={addTask}
        // handleTaskInputChange={handleTaskInputChange}
        // newTask={newTask}
        // pomodoroCount={pomodoroCount}
        // handlePomodoroInput={handlePomodoroInput}
        // increasePomodoroCount={increasePomodoroCount}
        // decreasePomodoroCount={decreasePomodoroCount}
        />
      )}

      {isTaskFormOpen || (
        // <button className="add-task-btn" onClick={showTaskForm}>
        <button className="add-task-btn" onClick={handleTaskFormOpen}>
          <img
            className="add-task-btn__icon"
            src="icons/plus-circle-white.png"
            alt="plus icon"
          />
          <div className="add-task-btn__text">Add task</div>
        </button>
      )}
    </div>
  );
}

// zrobiłam funckję spisującą input subtaska do stanu subtasktext teraz musze zrobić funkcję wpychającą ten tekst do danego taska jego subtaska
