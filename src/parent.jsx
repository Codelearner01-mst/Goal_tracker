import { useState, useEffect, useMemo, useContext, useCallback } from "react";
import { Link } from "react-router";
import "./App.css";
import { Modal } from "./modal";

import { saveGoals } from "./utils/storage";
import { filterActiveGoals } from "./utils/filter";
import { GoalsContext } from "./utils/context";

export function Main() {
  const { goals } = useContext(GoalsContext);
  const [filteredGoals, setFilteredGoals] = useState(goals);
  const [openForm, setOpenForm] = useState(false);
  const activeGoals = useMemo(() => filterActiveGoals(goals), [goals]);

  useEffect(() => {
    saveGoals(goals);
  }, [goals]);

  const handleFormOpen = useCallback(() => {
    setOpenForm(true);
  }, []);

  return (
    <>
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
            <Link to="/goals" className="hero-cta-secondary">
              View My Goals ↓
            </Link>
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
        <div className="container" id="goals"></div>
        {openForm && (
          <Modal
            setFilteredGoals={setFilteredGoals}
            setOpenForm={setOpenForm}
          />
        )}
      </main>
    </>
  );
}
