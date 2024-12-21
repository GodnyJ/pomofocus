import React, { useState } from "react";
import "./checklist.css";
import TaskForm from "./task-form/task-form";
import { useAtom, useAtomValue } from "jotai";
import {
  tasksAtom,
  initialConfigAtom,
  currentModeAtom,
} from "../../atoms/atoms";
import {
  isTaskFormOpenAtom,
  handleTaskFormOpenAtom,
  clickedLiElementIndexAtom,
  setClickedLiElementIndexAtom,
} from "./checklist-atoms";

export default function Checklist() {
  const initialConfig = useAtomValue(initialConfigAtom);
  const currentMode = useAtomValue(currentModeAtom);
  const backgroundColor = initialConfig[currentMode].color;
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [isTaskFormOpen] = useAtom(isTaskFormOpenAtom);
  const [, handleTaskFormOpen] = useAtom(handleTaskFormOpenAtom);
  const [clickedLiElementIndex] = useAtom(clickedLiElementIndexAtom);
  const [, setClickedLiElementIndex] = useAtom(setClickedLiElementIndexAtom);

  //czy jeśli funkcja jest używana tylko w tym komponencie to również mam ją wynosić?
  const handleChangeIsDoneValue = (taskId: number) => {
    setTasks((oldTasks) =>
      oldTasks.map((task) =>
        taskId === task.id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

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
                  // onClick={() => whichLiElementIsClicked(task.id)}
                  onClick={() => setClickedLiElementIndex(task.id)}
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
      {isTaskFormOpen && <TaskForm />}

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
