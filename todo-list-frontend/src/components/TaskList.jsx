import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  onDelete,
  onToggle,
  onUpdate,
}) {
  return (
    <section className="panel">
      <h2>Daftar tugas</h2>

      {tasks.length === 0 ? (
        <p className="empty">Belum ada data tugas</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
              onUpdate={onUpdate}
            />
          ))}
        </ul>
      )}
    </section>
  );
}