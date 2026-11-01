import { useState } from "react";
import { formatDate, getToday } from "../utils/date";

export default function TaskItem({
  task,
  onDelete,
  onToggle,
  onUpdate,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [deadline, setDeadline] = useState(task.deadline);
  const [error, setError] = useState("");

  const isOverdue = !task.completed && task.deadline < getToday();

  function startEdit() {
    setTitle(task.title);
    setDeadline(task.deadline);
    setError("");
    setIsEditing(true);
  }

  function saveEdit(event) {
    event.preventDefault();

    if (!title.trim() || !deadline) {
      setError("Nama tugas dan deadline wajib diisi.");
      return;
    }

    if (deadline < task.createdAt) {
      setError("Deadline tidak boleh sebelum tanggal dibuat.");
      return;
    }

    onUpdate(task.id, { title: title.trim(), deadline });
    setIsEditing(false);
  }

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <form className="task-form" onSubmit={saveEdit}>
          <label htmlFor={`title-${task.id}`}>Nama tugas</label>
          <input
            id={`title-${task.id}`}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <label htmlFor={`deadline-${task.id}`}>Deadline</label>
          <input
            id={`deadline-${task.id}`}
            type="date"
            value={deadline}
            min={task.createdAt}
            onChange={(event) => setDeadline(event.target.value)}
            required
          />

          {error && (
            <p className="error" role="alert">{error}</p>
          )}

          <div className="actions">
            <button type="submit">Simpan</button>
            <button
              type="button"
              className="secondary"
              onClick={() => setIsEditing(false)}
            >
              Batal
            </button>
          </div>
        </form>
      ) : (
        <>
          <span
            className={`badge ${
              task.completed ? "done" : isOverdue ? "late" : ""
            }`}
          >
            {task.completed
              ? "Selesai"
              : isOverdue
                ? "Terlambat"
                : "Belum selesai"}
          </span>

          <h3>{task.title}</h3>

          <div className="dates">
            <p>
              Dibuat: <strong>{formatDate(task.createdAt)}</strong>
            </p>
            <p>
              Deadline: <strong>{formatDate(task.deadline)}</strong>
            </p>
          </div>

          <div className="actions">
            <button type="button" onClick={() => onToggle(task.id)}>
              {task.completed ? "Batalkan selesai" : "Tandai selesai"}
            </button>

            <button
              type="button"
              className="secondary"
              onClick={startEdit}
            >
              Edit
            </button>

            <button
              type="button"
              className="danger"
              onClick={() => onDelete(task.id)}
            >
              Hapus
            </button>
          </div>
        </>
      )}
    </li>
  );
}