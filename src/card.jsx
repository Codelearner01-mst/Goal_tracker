export function Card({ goal, toggleStatus }) {
  return (
    <>
      <div className={`card ${goal.completed ? "completed" : ""}`}>
        <div className="card-checkbox">
          <input
            type="checkbox"
            className="status-checkbox"
            onChange={() => toggleStatus(goal.id)}
            checked={goal.completed}
          />
        </div>
        <div className="card-content">
          <h3 className="card-title">{goal.name}</h3>
          <p className="card-description">{goal.description}</p>
          <div className="card-meta">
            <span className="card-date">Due: {goal.date}</span>
            <span
              className={`card-status ${goal.completed ? "status-completed" : "status-ongoing"}`}
            >
              {goal.completed ? "Completed" : "Ongoing"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
