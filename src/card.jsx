export function Card({ goal, toggleStatus, onDelete }) {
  return (
    <div className={`card ${goal.completed ? "card--completed" : ""}`}>
      <div className="card-checkbox">
        <input
          type="checkbox"
          className="status-checkbox"
          onChange={() => toggleStatus(goal.id)}
          checked={goal.completed}
          title={goal.completed ? "Mark as ongoing" : "Mark as completed"}
        />
      </div>
      <div className="card-content">
        <div className="card-top-row">
          <h3
            className={`card-title ${goal.completed ? "card-title--done" : ""}`}
          >
            {goal.name}
          </h3>
          <button
            className="card-delete-btn"
            onClick={() => onDelete(goal.id)}
            title="Remove goal"
            aria-label="Remove goal"
          >
            🗑
          </button>
        </div>
        {goal.description && (
          <p className="card-description">{goal.description}</p>
        )}
        <div className="card-meta">
          <span className="card-date">Date: {goal.date}</span>
          <span
            className={`card-status ${goal.completed ? "status-completed" : "status-ongoing"}`}
          >
            {goal.completed ? "Completed" : " Ongoing"}
          </span>
        </div>
      </div>
    </div>
  );
}
