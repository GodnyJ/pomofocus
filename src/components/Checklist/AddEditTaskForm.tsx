import React, { ChangeEventHandler } from "react";
import "./addEditTaskForm.css";

type VoidFunction = () => void;

interface AddEditTaskFormProps {
  addTask: VoidFunction;
  handleTaskInputChange: (value: string) => void;
  newTask: string;
  pomodoroCount: number;
  increasePomodoroCount: VoidFunction;
  decreasePomodoroCount: VoidFunction;
  handlePomodoroInput: (value: number) => void;
}

export default function AddEditTaskForm({
  addTask,
  handleTaskInputChange,
  newTask,
  pomodoroCount,
  increasePomodoroCount,
  decreasePomodoroCount,
  handlePomodoroInput,
}: AddEditTaskFormProps) {
  return (
    <div className="form-box">
      <div className="form__up-site">
        {/* <p style={{color:"black"}}>{newTask}</p> */}
        <input
          className="form-input__task-name"
          type="text"
          placeholder="What are you working on?"
          onChange={(e) => handleTaskInputChange(e.target.value)}
          value={newTask}
        />

        <span className="form__title-est-pom">Est Pomodoros</span>

        {/* Pomodoro counter */}
        <div className="form__pom-settings">
          <input
            type="number"
            min="0"
            step="1"
            onChange={(e) => handlePomodoroInput(Number(e.target.value))}
            value={pomodoroCount}
            readOnly
          />
          <div className="form-btns__pom-settins">
            <button
              className="form-btn_pom-settins--up"
              onClick={increasePomodoroCount}
            >
              <img src="icons/caret-up.png" alt="up icon" />
            </button>
            <button
              className="form-btn_pom-settins--down"
              onClick={decreasePomodoroCount}
            >
              <img src="icons/caret-down.png" alt="down icon" />
            </button>
          </div>
        </div>

        <div className="form-btns__add">
          <button className="form-btn__add--note">+ Add Note</button>
          {/* <textarea placeholder="Some notes..."></textarea> */}
          <button className="form-btn__add--project">
            + Add Project
            <img src="icons/lock-black.png" alt="lock closed icon" />
          </button>
        </div>
      </div>

      <div className="form__down-site">
        <button className="form-btn form-btn__delete">Delete</button>
        <div>
          <button className="form-btn form-btn__cancel">Cancel</button>
          <button className="form-btn form-btn__save" onClick={addTask}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
