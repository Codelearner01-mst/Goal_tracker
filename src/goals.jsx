import { useContext, useState, useCallback, useMemo } from "react";

import "./App.css";
import { Modal } from "./modal";
import { filterActiveGoals } from "./utils/filter";

import { Filter } from "./filter";
import { GoalsContext } from "./utils/context";
import { Card } from "./card";

export const Goals = () => {
  const { goals, setGoals } = useContext(GoalsContext);
  const [filteredGoals, setFilteredGoals] = useState(goals);
  const [openForm, setOpenForm] = useState(false);
  const activeGoals = useMemo(() => filterActiveGoals(goals), [goals]);

  const handleFormOpen = useCallback(() => {
    setOpenForm(true);
  }, []);

  const toggleStatus = useCallback(
    (id) => {
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
    },
    [setGoals, setFilteredGoals],
  );

  const handleDeletion = useCallback(
    (id) => {
      setFilteredGoals((goals) => {
        const newGoals = goals.filter((goal) => goal.id !== id);
        return newGoals;
      });

      setGoals((goals) => {
        const newGoals = goals.filter((goal) => goal.id !== id);
        return newGoals;
      });
    },
    [setGoals, setFilteredGoals],
  );

  return (
    <>
      <div className="goals-container">
        <div className="goals-section-header">
          <div>
            <h2 className="goals-section-title">My Goals</h2>
            <p className="goals-section-subtitle">
              Track and manage all your goals in one place
            </p>
          </div>
          <button className="btn-add-goal" onClick={handleFormOpen}>
            + Add Goal
          </button>
        </div>
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
                <Card
                  goal={goal}
                  toggleStatus={toggleStatus}
                  onDelete={handleDeletion}
                />
              </li>
            ))}
          </ul>
        </div>

        {openForm && (
          <Modal
            setFilteredGoals={setFilteredGoals}
            setOpenForm={setOpenForm}
          />
        )}
      </div>
    </>
  );
};
