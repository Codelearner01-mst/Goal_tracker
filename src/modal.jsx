import { useState, useContext } from "react";
import { savedGoals, saveGoals } from "./utils/storage";
import { SubmitConfirmationCard } from "./submitCard";
import { GoalsContext } from "./utils/context";

export function Modal({ setFilteredGoals, setOpenForm }) {
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { setGoals } = useContext(GoalsContext);

  const submit = async (event) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.target);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const goals = savedGoals();
    const id = !goals.length ? 1 : goals[goals.length - 1].id + 1;

    if (formData.get("name").length > 3) {
      const goalObj = {
        id,
        name: formData.get("name"),
        description: formData.get("description"),
        date: formData.get("date"),
        completed: false,
      };
      const updatedGoals = [...goals, goalObj];
      setGoals(updatedGoals);
      setFilteredGoals(updatedGoals);
      saveGoals(updatedGoals);
      setMessage("Goal added to goals");
      setTimeout(() => setOpenForm(false), 100);
    } else {
      setMessage("Failed to add goals");
    }

    setIsPending(false);
  };

  const handleFormHidden = () => {
    setOpenForm(false);
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
          <SubmitConfirmationCard message={message} />

          <div className="modal-header">
            <h2>Create New Goal</h2>
            <p>Add a new goal to track your progress</p>
          </div>

          <form onSubmit={submit} className="goal-form">
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Goal Title
              </label>
              <input
                type="text"
                id="title"
                className="form-input"
                placeholder="Enter your goal title"
                name="name"
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
                name="date"
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
                {isPending ? "Adding..." : "Add Goal"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
