import React from "react";
import { Link } from "react-router";
import { useContext } from "react";
import { GoalsContext } from "./utils/context";
import { filterActiveGoals } from "./utils/filter";

export const Header = React.memo(({ onAddGoal }) => {

  const { goals } = useContext(GoalsContext);
  const activeCount = filterActiveGoals(goals).length;

  return (
    <>
      <header className="app-header">
        <nav className="navbar">
          <div className="nav-brand">
            <span className="nav-logo">🎯</span>
            <span className="nav-brand-name">GoalTracker</span>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/goals" className="nav-link">
                My Goals
              </Link>
            </li>
            <li>
              <Link to="/progress" className="nav-link">
                Progress
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
          </ul>
          <div className="nav-actions">
            <div className="nav-stats-badge">
              <span className="nav-stats-icon">🔥</span>
              <span className="nav-stats-text">{activeCount} active</span>
            </div>
            <button className="nav-cta-btn" onClick={onAddGoal}>
              + Add Goal
            </button>
          </div>
        </nav>
      </header>
    </>
  );
});

export default Header;
