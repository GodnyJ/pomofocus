import React, { useState } from "react";
import axios from "axios";
import "./ChatWindow.css";
import { useAtom } from "jotai";
import { tasksAtom } from "../atoms";

interface Task {
  id: number;
  text: string;
  pomodoroCount: number;
  completedPomodoros: number;
  isDone: boolean;
}

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  type?: "addTask";
  taskTexts?: string[];
}

export default function ChatWindow() {
  const [tasks, setTasks] = useAtom<Task[]>(tasksAtom);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const handleAddMultipleTasks = (taskTexts: string[]) => {
    const newTasks = taskTexts.map((taskText, index) => ({
      id: tasks.length + index + 1,
      text: taskText,
      pomodoroCount: 1,
      completedPomodoros: 0,
      isDone: false,
    }));

    setTasks((prev) => [...prev, ...newTasks]);
  };

  const handleSend = async () => {
    if (!input) return;
    console.log("Wysłanie żądania", new Date().toISOString());

    const userMessage: Message = { role: "user", content: input };
    const userInfo =
      "Znam narzędzia i technologie programistyczne i projektowe, radzę sobie z każdym zadaniem technicznym poza tymi spoza programowania. Jesteś moim asystentem do zarządzania zadaniami. Kiedy poproszę o rozbicie zadania na kroki zacznij odpowiedź od 1., podawaj tylko krótkie podpunkty, bez żadnego dodatkowego tekstu.";
    const tasksContext = `Oto lista zadań:
${tasks.map((task) => `- ${task.text}, id: ${task.id}`)}`;

    console.log(tasksContext);

    const apiMessages: Message[] = [
      { role: "system", content: userInfo },
      { role: "system", content: tasksContext },
      ...messages,
      userMessage,
    ];

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post<{
        choices: {
          message: { content: string };
        }[];
      }>(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: apiMessages,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      const aiMessage = response.data.choices[0].message.content;
      // const regexAiMessage = /1\..*/;
      // const aiTasks = aiMessage.match(regexAiMessage);
      // console.log(aiTasks);
      const aiTasksArray: string[] = aiMessage
        .split("\n")
        .filter((line) => line.trim() !== "");
      // console.log(aiTasksArray);

      const isTaskRequest =
        input.toLowerCase().includes("rozbij") ||
        input.toLowerCase().includes("kroki");

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiMessage },
        ...(isTaskRequest
          ? [
              {
                role: "assistant" as const,
                content: "Dodać do listy zadań?",
                type: "addTask" as const,
                taskTexts: aiTasksArray,
              },
            ]
          : []),
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Coś poszło nie tak, spróbuj ponownie!" },
      ]);
    }

    setInput("");
  };

  return (
    <div className="chat-window">
      <div className="chat-window-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-window-message ${msg.role}`}>
            <b>{msg.role === "user" ? "Ty:" : "PomoAssistant:"}</b>{" "}
            {msg.content}
            {msg.type === "addTask" && (
              <div>
                <button
                  onClick={() => handleAddMultipleTasks(msg.taskTexts ?? [])}
                >
                  Dodaj
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Napisz wiadomość..."
        className="chat-window-input"
      />
      <button onClick={handleSend} className="chat-window-button">
        Wyślij
      </button>
    </div>
  );
}

//teraz chciałabym aby podtaski czyli te generowane dla konkretnego taska dodawały sie jako podtaski
//do konkretnego taska, aby ten główny mógł sie rozwijać w dół
//poprawić id
