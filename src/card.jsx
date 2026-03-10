import { useState } from "react";

export function Card({ name, date, description }) {
  const [status, setStatus] = useState("Ongoing");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleStatus = (e) => {
    const isChecked = e.target.checked;
    setIsCompleted(isChecked);

    if (isChecked) {
      setStatus("Completed");
    } else {
      setStatus("Ongoing");
    }
  };

  return (
    <>
      <div className={`card ${isCompleted ? "completed" : ""}`}>
        <div className="card-checkbox">
          <input
            type="checkbox"
            className="status-checkbox"
            onChange={handleStatus}
            checked={isCompleted}
          />
        </div>
        <div className="card-content">
          <h3 className="card-title">{name}</h3>
          <p className="card-description">{description}</p>
          <div className="card-meta">
            <span className="card-date">Due: {date}</span>
            <span
              className={`card-status ${isCompleted ? "status-completed" : "status-ongoing"}`}
            >
              {status}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
