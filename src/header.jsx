import React from "react";

export const Header = React.memo(({ count, onAddGoal }) => {
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
              <a href="#home" className="nav-link">
                Home
              </a>
            </li>
            <li>
              <a href="#goals" className="nav-link">
                My Goals
              </a>
            </li>
            <li>
              <a href="#progress" className="nav-link">
                Progress
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link">
                About
              </a>
            </li>
          </ul>
          <div className="nav-actions">
            <div className="nav-stats-badge">
              <span className="nav-stats-icon">🔥</span>
              <span className="nav-stats-text">{count} active</span>
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
