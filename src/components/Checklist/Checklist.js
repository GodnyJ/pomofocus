import React, { useState } from "react";
import "./checklist.css";
import AddEditTaskForm from "./AddEditTaskForm";

export default function Checklist({tasks, setTasks, backgroundColor, clickedLiElementIndex, setClickedLiElementIndex}) {
    
    const [newTask, setNewTask] = useState('');
    const [isAddingTask, setIsAddingTask] = useState(false); // czy tutaj potrzebuje stanu?
    const [pomodoroCount, setPomodoroCount] = useState(1);
    

    function addTask() {
        if (newTask.trim() === '') { //wczesne returny 
            return;
        }

        const newTaskObj = {
            id: Date.now(),
            text: newTask,
            // index: tasks.length,
            pomodoroCount: pomodoroCount,
            completedPomodoros: 0,
            isDone: false
        };
        setTasks([...tasks, newTaskObj]); 
        setNewTask('');
        setIsAddingTask(false);

    }

    const handleTaskInputChange = (e) => {
        setNewTask(e.target.value);
    }

    // Funkcja pobierająca liczbę z inputu pomodoro i ustawiająca stan pomodoro dla danego zadania
    const handlePomodoroInput = (e) => {
        setPomodoroCount(e.target.value)
    }

    const showTaskForm = () => {
        setIsAddingTask(true);
    }
//zmienić z index
    // const handleChangeIsDoneValue = (taskIndex) => { 
    //     const updatedTask = tasks.map((task, index) =>
    //         taskIndex === index ? { ...task, isDone: !task.isDone } : task
    //     );
    //     setTasks(updatedTask); 
    // }
//zmeniona na 22.10.24
        const handleChangeIsDoneValue = (taskId) => {
            setTasks(oldTasks => oldTasks.map((task) => 
                taskId === task.id ? {...task, isDone: !task.isDone} : task
            ));
        };

    const increasePomodoroCount= () => {
        setPomodoroCount(prevCount => prevCount + 1)
    }

    const decreasePomodoroCount = () => {
        setPomodoroCount(prevCount => Math.max(prevCount - 1, 1))
    }


    const whichLiElementIsClicked = (taskId) => {
        setClickedLiElementIndex(taskId);
        console.log(clickedLiElementIndex);
        console.log(tasks);
    }

    return (
        <div className="checklist-section">
            
            <p className="checklist__current-task">
                {tasks.map((task) => (
                    clickedLiElementIndex === task.id ? task.text : ''
                ))}
            </p>
            <div className="checklist__title-box">
                <h2>Tasks</h2>
                <button className="title__option-btn">
                    <img src="icons/threedots-white.png" alt="option button"/>
                </button>
            </div>
            
            {/* Wyświetlanie listy zadań */}
            <div>
                <ul className="checklist__ul-tasks-box">
                    {tasks
                    .sort((a,b) => a.isDone - b.isDone)
                    .map((task) => (
                        <li key={task.id} 
                            className={`checklist__task-item ${clickedLiElementIndex === task.id ? 'clicked-li-element' : ''}`} 
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
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill={task.isDone ? backgroundColor : "#DFDFDF"}></path> </g></svg>
                                </span>
                                <span className={`task-item__text ${task.isDone ? 'checked' : ''}`}>
                                    {task.text}
                                </span>
                            </div>
                            <div>
                                <span className="task-item__counter">
                                    {task.completedPomodoros}
                                    <span>/ {task.pomodoroCount}</span>
                                </span>
                                <button className="task-item__option-btn">
                                    <img className="threedots-img" src="icons/threedots-black.png" alt="option button"/>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Renderowanie warunkowe formularza do dodawania zadań */}
            {isAddingTask && 
                <AddEditTaskForm 
                    addTask={addTask} 
                    handleTaskInputChange={handleTaskInputChange} 
                    newTask={newTask}
                    pomodoroCount={pomodoroCount}
                    handlePomodoroInput={handlePomodoroInput}
                    increasePomodoroCount={increasePomodoroCount}
                    decreasePomodoroCount={decreasePomodoroCount}
                />}

            {isAddingTask || (
             <button className="add-task-btn" onClick={showTaskForm}>
                <img className="add-task-btn__icon" src="icons/plus-circle-white.png" alt="plus icon"/>
                <div className="add-task-btn__text">Add task</div>
            </button>
            )}
        </div>
    )
}
