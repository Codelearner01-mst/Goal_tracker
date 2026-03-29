import { useState, useEffect, useMemo, useContext, useCallback } from "react";
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
  const activeGoals = useMemo(() => filterActiveGoals(goals), [goals]);

  useEffect(() => {
    saveGoals(goals);
  }, [goals]);

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
      <Header count={activeGoals.length} onAddGoal={handleFormOpen} />

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-content">
          <div className="hero-badge">🚀 Start achieving today</div>
          <h1 className="hero-title">
            Set Goals. <span className="hero-highlight">Stay Focused.</span>
            <br />
            Achieve More.
          </h1>
          <p className="hero-subtitle">
            GoalTracker helps you define what matters, track your progress, and
            celebrate every win — big or small.
          </p>
          <div className="hero-actions">
            <button className="hero-cta-primary" onClick={handleFormOpen}>
              + Create Your First Goal
            </button>
            <a href="#goals" className="hero-cta-secondary">
              View My Goals ↓
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">{goals.length}</span>
              <span className="hero-stat-label">Total Goals</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-value">{activeGoals.length}</span>
              <span className="hero-stat-label">In Progress</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-value">
                {goals.length - activeGoals.length}
              </span>
              <span className="hero-stat-label">Completed</span>
            </div>
          </div>
        </div>
      </section>

      <main>
        <div className="container" id="goals">
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
