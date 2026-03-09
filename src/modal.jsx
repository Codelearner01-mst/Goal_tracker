import { useState } from "react";

export function Modal({ goals, setGoals, setMainhidden }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDecription] = useState("");
  const [formHidden, setFormHidden] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDecription(e.target.value);
  };
  const handleFormHidden = () => {
    setFormHidden(true);
    setMainhidden(false);
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    const goalObj = {
      name: name,
      description: description,
      date: date,
    };

    const updatedGoals = [...goals, goalObj];
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    setFormHidden(true);
    setMainhidden(false);
  };

  return (
    <>
      <form onSubmit={handleSubmission} hidden={formHidden}>
        <div className="form-container">
          <div onClick={handleFormHidden}>
            <span>Close</span>
          </div>
          <h2>Provide goal datails:</h2>
          <div className="input-container">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              className="input-field"
              onChange={handleNameChange}
            />
          </div>
          <div>
            <label htmlFor="date">End date:</label>
            <input
              type="date"
              id="date"
              className="date-field"
              onChange={handleDateChange}
            />
          </div>
          <div className="description">
            <label htmlFor="desciption">Description:</label>
            <textarea
              id="desciption"
              name="desciption"
              className="input-field"
              required
              rows="5"
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
          <div>
            <button type="submit" className="btn">
              Add goal
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
