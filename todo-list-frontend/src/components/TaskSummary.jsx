export default function TaskSummary({ tasks }) {
  const completed = tasks.filter((task) => task.completed).length;

  return (
    <section className="summary" aria-label="Ringkasan tugas">
      <div>
        <strong>{tasks.length}</strong>
        <span>Total tugas</span>
      </div>

      <div>
        <strong>{tasks.length - completed}</strong>
        <span>Belum selesai</span>
      </div>

      <div>
        <strong>{completed}</strong>
        <span>Selesai</span>
      </div>
    </section>
  );
}