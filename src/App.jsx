import { useState, useEffect, useRef } from "react";
import { Header } from "./header";
import "./App.css";
import { Modal } from "./modal";
import { Card } from "./card";
import { Footer } from "./footer";
import { getIndex } from "./utils/helper";
import { savedGoals } from "./utils/storage";

function App() {
  const GOALS = savedGoals();
  const [goals, setGoals] = useState(GOALS);
  const [openForm, setOpenForm] = useState(false);

  const handleFormOpen = () => {
    setOpenForm(true);
  };

  const handleDeletion = (e) => {
    const selectedCard = e.target.closest("li");
    const cardId = parseInt(selectedCard.id.split("-")[1]);

    setGoals((goals) => {
      const copiedGoals = [...goals];
      const index = getIndex(cardId, copiedGoals);
      copiedGoals.splice(index, 1);
      localStorage.setItem("goals", JSON.stringify(copiedGoals));
      return copiedGoals;
    });
  };

  return (
    <>
      <Header count={goals.length} />
      <main>
        <div className="container">
          <div className="goals-container">
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
                {goals.map((goal) => (
                  <li
                    key={`${goal.name}-${goal.id}`}
                    id={`${goal.name}-${goal.id}`}
                  >
                    <button className="card-remove" onClick={handleDeletion}>
                      remove
                    </button>

                    <Card
                      name={goal.name}
                      date={goal.date}
                      description={goal.description}
                      goal={goal}
                    />
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
          <Modal goals={goals} setGoals={setGoals} setOpenForm={setOpenForm} />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
