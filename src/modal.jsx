import { useState, useActionState } from "react";
import { savedGoals, saveGoals } from "./utils/storage";
//import { submitForm } from "./utils/submmission";
//import { SubmitConfirmationCard } from "./submitCard";

export function Modal({ setGoals, setFilteredGoals, setOpenForm }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  //const [state, submit, isPending] = useActionState(submitForm, "");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFormHidden = () => {
    setOpenForm(false);
  };

  const handleSubmission = (e) => {
    e.preventDefault();

    const goals = savedGoals();
    console.log("Saved goals", goals);
    const id = !goals.length ? 1 : goals[goals.length - 1].id + 1;
    const goalObj = {
      id: id,
      name: name,
      description: description,
      date: date,
      completed: false,
    };

    const updatedGoals = [...goals, goalObj];
    setGoals(updatedGoals);
    saveGoals(updatedGoals);
    setFilteredGoals(updatedGoals);
    setOpenForm(false);

    // Reset form fields
    setName("");
    setDate("");
    setDescription("");
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <button
            className="modal-close"
            onClick={handleFormHidden}
            aria-label="Close modal"
          >
            ✕
          </button>

          <div className="modal-header">
            <h2>Create New Goal</h2>
            <p>Add a new goal to track your progress</p>
          </div>

          <form onSubmit={handleSubmission} className="goal-form">
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Goal Title
              </label>
              <input
                type="text"
                id="title"
                className="form-input"
                placeholder="Enter your goal title"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date" className="form-label">
                Target Date
              </label>
              <input
                type="date"
                id="date"
                className="form-input"
                value={date}
                onChange={handleDateChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                placeholder="Describe your goal in detail"
                value={description}
                onChange={handleDescriptionChange}
                rows="4"
                required
              ></textarea>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={handleFormHidden}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Add Goal
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
