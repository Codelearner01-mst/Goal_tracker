import { filterActiveGoals, filterCompleted } from "./utils/filter";
import { savedGoals } from "./utils/storage";

const goals = savedGoals();

export function Filter({ setFilteredGoals }) {
  const completed = filterCompleted(goals);
  const active = filterActiveGoals(goals);

  function handleGoalsFilter(fllter) {
    setFilteredGoals(fllter);
  }

  return (
    <>
      <div className="filter-container">
        <div className="all">
          <span
            role="button"
            className="filter-category-text"
            onClick={() => handleGoalsFilter(goals)}
          >
            All
          </span>
        </div>
        <div>
          <span
            role="button"
            className="filter-category-text"
            onClick={() => handleGoalsFilter(completed)}
          >
            Completed
          </span>
        </div>
        <div>
          <span
            role="button"
            className="filter-category-text"
            onClick={() => handleGoalsFilter(active)}
          >
            {" "}
            Ongoing
          </span>
        </div>
      </div>
    </>
  );
}
