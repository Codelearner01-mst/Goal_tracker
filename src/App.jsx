import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Header } from "./header";
import "./App.css";
import { Modal } from "./modal";
import { Card } from "./card";

function App() {
  const [goals, setGoals] = useState(
    localStorage.getItem("goals")
      ? JSON.parse(localStorage.getItem("goals"))
      : [],
  );
  localStorage.removeItem("goals");

  const [mainHidden, setMainHidden] = useState(false);

  const handleFormOpen = () => {
    setMainHidden(true);
  };
  return (
    <>
      <Header />
      <main>
        <div className="container" hidden={mainHidden}>
          <p>Track your goals here. Improve your life</p>
          <div className="goals-container">
            <div className="goals-heading">
              <h2>Goals</h2>
            </div>
            <div className="goals">
              {!goals.length && (
                <div>
                  <p className="sub-title">You do not have any goal yet.</p>
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
    </>
  );
}

export default App;
