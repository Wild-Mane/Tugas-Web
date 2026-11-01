import { useState } from "react";
import { formatDate, getToday } from "../utils/date";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !deadline) {
      setError("Nama tugas dan deadline wajib diisi.");
      return;
    }

    if (deadline < getToday()) {
      setError("Deadline tidak boleh sebelum hari ini.");
      return;
    }

    onAdd({ title: title.trim(), deadline });

    setTitle("");
    setDeadline("");
    setError("");
  }

  return (
    <section className="panel">
      <h2>Tambah tugas</h2>

      <form onSubmit={handleSubmit} className="task-form">
        <label htmlFor="title">Nama tugas</label>
        <input
          id="title"
          placeholder="Contoh: Menyelesaikan laporan praktikum React"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <label htmlFor="deadline">Deadline</label>
        <input
          id="deadline"
          type="date"
          value={deadline}
          min={getToday()}
          onChange={(event) => setDeadline(event.target.value)}
          required
        />

        {deadline && (
          <small>Deadline dipilih: {formatDate(deadline)}</small>
        )}

        <small>Tanggal dibuat dicatat otomatis saat tugas ditambahkan.</small>

        {error && (
          <p className="error" role="alert">{error}</p>
        )}

        <button type="submit">+ Tambah tugas</button>
      </form>
    </section>
  );
}