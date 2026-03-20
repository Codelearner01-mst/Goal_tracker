import { useState, useEffect, useRef } from "react";
import { Header } from "./header";
import "./App.css";
import { Modal } from "./modal";
import { Card } from "./card";
import { Footer } from "./footer";
import { Filter } from "./filter";
import { getIndex } from "./utils/helper";
import { savedGoals } from "./utils/storage";
import { filterActiveGoals } from "./utils/filter";

function App() {
  const GOALS = savedGoals();
  const [goals, setGoals] = useState(GOALS);
  const [filteredGoals, setFilteredGoals] = useState(goals);
  const [openForm, setOpenForm] = useState(false);

  const activeGoals = filterActiveGoals(goals);

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const handleFormOpen = () => {
    setOpenForm(true);
  };

  const toggleStatus = (id) => {
    setFilteredGoals((goals) => {
      const newGoals = goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal,
      );
      return newGoals;
    });
  };

  const handleDeletion = (e) => {
    const selectedCard = e.target.closest("li");
    const cardId = parseInt(selectedCard.id.split("-")[1]);

    setFilteredGoals((goals) => {
      const copiedGoals = [...goals];
      const index = getIndex(cardId, copiedGoals);
      copiedGoals.splice(index, 1);
      return copiedGoals;
    });
  };

  return (
    <>
      <Header count={activeGoals.length} />
      <main>
        <div className="container">
          <div className="goals-container">
            <Filter setFilteredGoals={setFilteredGoals} />
            <div className="goals-heading">
              <h2>Goals</h2>
              <span className="goals-count">{goals.length}</span>
            </div>
            <div className="goals">
              {!goals.length && (
                <div>
                  <p className="sub-title">
                    You do not have any goal yet. Create your first goal to get
                    started!
                  </p>
                </div>
              )}
              <ul>
                {filteredGoals.map((goal) => (
                  <li
                    key={`${goal.name}-${goal.id}`}
                    id={`${goal.name}-${goal.id}`}
                  >
                    <button className="card-remove" onClick={handleDeletion}>
                      remove
                    </button>
                    <Card goal={goal} toggleStatus={toggleStatus} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="btn-container">
            <button className="create-goal-btn" onClick={handleFormOpen}>
              +
            </button>
          </div>
        </div>
        {openForm && (
          <Modal
            setFilteredGoals={setFilteredGoals}
            setOpenForm={setOpenForm}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
