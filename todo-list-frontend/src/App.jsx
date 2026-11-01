import { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskSummary from "./components/TaskSummary";
import { getToday } from "./utils/date";

const STORAGE_KEY = "todo-list-mahasiswa";

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const data = JSON.parse(saved);

    const isValid =
      Array.isArray(data) &&
      data.every(
        (task) =>
          task !== null &&
          typeof task === "object" &&
          typeof task.id === "string" &&
          typeof task.title === "string" &&
          typeof task.createdAt === "string" &&
          typeof task.deadline === "string" &&
          typeof task.completed === "boolean"
      );

    return isValid ? data : [];
  } catch (error) {
    console.error("Gagal membaca tugas:", error);
    return [];
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      setStorageError("");
    } catch (error) {
      console.error("Gagal menyimpan tugas:", error);
      setStorageError(
        "Gagal menyimpan ke browser. Perubahan dapat hilang setelah refresh."
      );
    }
  }, [tasks]);

  function addTask({ title, deadline }) {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      createdAt: getToday(),
      deadline,
      completed: false,
    };

    setTasks((previous) => [...previous, newTask]);
  }

  function deleteTask(id) {
    setTasks((previous) => previous.filter((task) => task.id !== id));
  }

  function toggleTask(id) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function updateTask(id, changes) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, ...changes } : task
      )
    );
  }

  return (
    <main className="app">
      <Header title="To Do List Mahasiswa" />

      {storageError && (
        <p className="error" role="alert">{storageError}</p>
      )}

      <TaskSummary tasks={tasks} />
      <TaskForm onAdd={addTask} />

      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
        onUpdate={updateTask}
      />

      <footer>
        Tugas disimpan di browser ini menggunakan localStorage.
      </footer>
    </main>
  );
}