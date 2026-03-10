import { useState, useEffect } from "react";
import { Header } from "./header";
import "./App.css";
import { Modal } from "./modal";
import { Card } from "./card";
import { Footer } from "./footer";

function App() {
  const [goals, setGoals] = useState(
    localStorage.getItem("goals")
      ? JSON.parse(localStorage.getItem("goals"))
      : [],
  );

  const [mainHidden, setMainHidden] = useState(false);

  const handleFormOpen = () => {
    setMainHidden(true);
  };

  return (
    <>
      <Header />
      <main>
        <div className="container" hidden={mainHidden}>
          <div className="goals-container">
            <div className="goals-heading">
              <h2>Goals</h2>
              <span className="goals-count">0</span>
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
                {goals.map((goal, index) => (
                  <li
                    key={`${goal.name}-${index}`}
                    id={`${goal.name}-${index}`}
                  >
                    <Card
                      name={goal.name}
                      date={goal.date}
                      description={goal.description}
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
        {mainHidden && (
          <Modal
            goals={goals}
            setGoals={setGoals}
            setMainhidden={setMainHidden}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
