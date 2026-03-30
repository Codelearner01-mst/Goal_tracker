import { useState, useContext } from "react";
import { filterActiveGoals, filterCompleted } from "./utils/filter";
import { GoalsContext } from "./utils/context";

export function Filter({ setFilteredGoals }) {
  const { goals } = useContext(GoalsContext);
  const [activeTab, setActiveTab] = useState("all");
  const completed = filterCompleted(goals);
  const active = filterActiveGoals(goals);
  const totalCount = goals.length;

  const tabs = [
    { key: "all", label: "All", data: goals, count: totalCount },
    {
      key: "ongoing",
      label: "Ongoing",
      data: active,
      count: active.length,
    },
    {
      key: "completed",
      label: "Completed",
      data: completed,
      count: completed.length,
    },
  ];

  function handleTab(tab) {
    setActiveTab(tab.key);
    setFilteredGoals(tab.data);
  }

  return (
    <div className="filter-bar">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`filter-tab ${activeTab === tab.key ? "filter-tab--active" : ""}`}
          onClick={() => handleTab(tab)}
        >
          <span className="filter-tab-label">{tab.label}</span>
          <span
            className={`filter-tab-count ${activeTab === tab.key ? "filter-tab-count--active" : ""}`}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}
