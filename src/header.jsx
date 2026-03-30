import React from "react";
import { Link } from "react-router";
import { useContext, useState } from "react";
import { GoalsContext } from "./utils/context";
import { filterActiveGoals } from "./utils/filter";

export const Header = React.memo(({ onAddGoal }) => {

  const { goals } = useContext(GoalsContext);
  const activeCount = filterActiveGoals(goals).length;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="app-header">
        <nav className="navbar">
          <div className="nav-brand">
            <span className="nav-logo">🎯</span>
            <span className="nav-brand-name">GoalTracker</span>
          </div>
          <ul className={`nav-links ${isMenuOpen ? "mobile-open" : ""}`}>
            <li>
              <Link to="/" className="nav-link" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/goals" className="nav-link" onClick={closeMenu}>
                My Goals
              </Link>
            </li>
            <li>
              <Link to="/progress" className="nav-link" onClick={closeMenu}>
                Progress
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link" onClick={closeMenu}>
                About
              </Link>
            </li>
          </ul>
          <div className="nav-actions">
            <div className="nav-stats-badge">
              <span className="nav-stats-icon">🔥</span>
              <span className="nav-stats-text">{activeCount} active</span>
            </div>
            <button className="nav-cta-btn" onClick={() => {
              closeMenu();
              if (onAddGoal) onAddGoal();
            }}>
              + Add Goal
            </button>
            <button
              className="hamburger-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>
      </header>
    </>
  );
});

export default Header;
