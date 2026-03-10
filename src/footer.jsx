export function Footer() {
  return (
    <>
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Goal Tracker</h3>
            <p className="footer-description">
              Helping you achieve your goals one step at a time.
            </p>
          </div>
          <div className="footer-section">
            <div className="footer-links">
              <a href="#" className="footer-link">
                Privacy Policy
              </a>
              <a href="#" className="footer-link">
                Terms of Service
              </a>
              <a href="#" className="footer-link">
                Contact Us
              </a>
            </div>
          </div>
          <div className="footer-section">
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} Goal Tracker. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
