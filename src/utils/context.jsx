import { useState, createContext } from "react";
import { savedGoals } from "./storage";

const GoalsContext = createContext();

function GoalsProvider({ children }) {
  const GOALS = savedGoals();
  const [goals, setGoals] = useState(GOALS);
  return (
    <GoalsContext.Provider value={{ goals, setGoals }}>
      {children}
    </GoalsContext.Provider>
  );
}

export { GoalsProvider, GoalsContext };
