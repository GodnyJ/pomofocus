import { useAtom } from "jotai";
import "./task-form.css";
import {
  newTaskInputTextAtom,
  handleNewPomodoroCountInputChangeAtom,
  increaseNewPomodoroContAtom,
  decreaseNewPomodoroCountAtom,
  newPomodoroCountAtom,
} from "../checklist-atoms";
import { addTaskAtom } from "../../../atoms/atoms";

export default function TaskForm() {
  const [newTaskInputText, setNewTaskInputText] = useAtom(newTaskInputTextAtom);
  const [newPomodoroCount] = useAtom(newPomodoroCountAtom);
  const [, handleNewPomodoroCountInputChange] = useAtom(
    handleNewPomodoroCountInputChangeAtom
  );
  const [, increaseNewPomodoroCount] = useAtom(increaseNewPomodoroContAtom);
  const [, decreaseNewPomodoroCount] = useAtom(decreaseNewPomodoroCountAtom);
  const [, addTask] = useAtom(addTaskAtom);

  return (
    <div className="form-box">
      <div className="form__up-site">
        <input
          className="form-input__task-name"
          type="text"
          placeholder="What are you working on?"
          onChange={(e) => setNewTaskInputText(e.target.value)}
          value={newTaskInputText}
        />
        <span className="form__title-est-pom">Est Pomodoros</span>
        {/* Pomodoro counter */}
        <div className="form__pom-settings">
          <input
            type="number"
            min="0"
            step="1"
            onChange={(e) =>
              handleNewPomodoroCountInputChange(Number(e.target.value))
            }
            value={newPomodoroCount}
            readOnly
          />
          <div className="form-btns__pom-settins">
            <button
              className="form-btn_pom-settins--up"
              onClick={increaseNewPomodoroCount}
            >
              <img src="icons/caret-up.png" alt="up icon" />
            </button>
            <button
              className="form-btn_pom-settins--down"
              onClick={decreaseNewPomodoroCount}
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
