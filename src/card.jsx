import { useState } from "react";

export function Card({ name, date, description }) {
  const [status, setStatus] = useState("Ongoing");

  const handleStatus = (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setStatus("Completed");
    } else {
      setStatus("Ongoing");
    }
  };
  return (
    <>
      <div className="card">
        <div>
          <input type="checkbox" className="status" onClick={handleStatus} />
        </div>
        <div>
          <p>{name}</p>
        </div>
        <div>
          <p>{date}</p>
        </div>
        <div>
          <p>{description}</p>
        </div>
        <div className="status">
          <p>{status}</p>
        </div>
      </div>
    </>
  );
}
