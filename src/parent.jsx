import { useState, useEffect, useContext } from "react";
import { Header } from "./header";
import "./App.css";
import { Modal } from "./modal";
import { Card } from "./card";
import { Footer } from "./footer";
import { Filter } from "./filter";
import { saveGoals } from "./utils/storage";
import { filterActiveGoals } from "./utils/filter";
import { GoalsContext } from "./utils/context";

export function Main() {
  const { goals, setGoals } = useContext(GoalsContext);
  const [filteredGoals, setFilteredGoals] = useState(goals);
  const [openForm, setOpenForm] = useState(false);
  const activeGoals = filterActiveGoals(goals);

  useEffect(() => {
    saveGoals(goals);
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

    setGoals((goals) => {
      const newGoals = goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal,
      );
      return newGoals;
    });
  };

  const handleDeletion = (id) => {
    setFilteredGoals((goals) => {
      const newGoals = goals.filter((goal) => goal.id !== id);
      return newGoals;
    });

    setGoals((goals) => {
      const newGoals = goals.filter((goal) => goal.id !== id);
      return newGoals;
    });
  };

  return (
    <>
      <Header count={activeGoals.length} />
      <main>
        <div className="container">
          <div className="goals-container">
            <Filter goals={goals} setFilteredGoals={setFilteredGoals} />
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
                    <button
                      className="card-remove"
                      onClick={() => handleDeletion(goal.id)}
                    >
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
