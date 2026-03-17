export function filterActiveGoals(goals) {
  if (!goals || !Array.isArray(goals)) {
    return;
  }
  return goals.filter((goal) => {
    return goal.completed === false;
  });
}
