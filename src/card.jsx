import { useState, useEffect } from "react";
import { savedGoals } from "./utils/storage";
import { saveGoals } from "./utils/storage";
import { getIndex } from "./utils/helper";

export function Card({ name, date, description, goal }) {
  const [status, setStatus] = useState("Ongoing");
  const [isCompleted, setIsCompleted] = useState(goal.status);

  useEffect(() => {
    if (isCompleted) {
      setStatus("Completed");
    } else {
      setStatus("Ongoing");
    }
    const GOALS = savedGoals();
    const index = getIndex(goal.id, GOALS);
    GOALS[index].status = isCompleted;
    console.log(GOALS);
    saveGoals(GOALS);
  }, [isCompleted, goal.id]);

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
