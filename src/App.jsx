import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import "./App.css";
import { Modal } from "./modal";
import { Card } from "./card";

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
      <div className="container" hidden={mainHidden}>
        <div>
          <h1>GOAL TRACKER APP</h1>

          <p>Track your goals here. See your life change.</p>
        </div>
        <div className="action">
          {!goals.length && (
            <p className="sub-title">You do not have any goal yet.</p>
          )}
          <button onClick={handleFormOpen}>Set a new goal</button>
        </div>
      </div>

      <div hidden={mainHidden}>
        <h2>Goals</h2>
        <ul>
          {goals.map((goal, index) => (
            <li key={`${goal.name}-${index}`} id={`${goal.name}-${index}`}>
              <Card
                name={goal.name}
                date={goal.date}
                description={goal.description}
              />
            </li>
          ))}
        </ul>
      </div>

      {mainHidden && (
        <Modal
          goals={goals}
          setGoals={setGoals}
          setMainhidden={setMainHidden}
        />
      )}
    </>
  );
}

export default App;
