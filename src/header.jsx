export function Header() {
  return (
    <>
      <header className="app-header">
        <div className="header-content">
          <div className="brand">
            <h1 className="brand-title">Goal Tracker</h1>
            <p className="brand-subtitle">
              Track your goals. Improve your life.
            </p>
          </div>
          <div className="header-actions">
            <div className="stats-badge">
              <span className="stats-label">Active Goals</span>
              <span className="stats-value" id="goals-count">
                0
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
