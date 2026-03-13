export function getIndex(id, goals) {
  return goals.findIndex((goal) => goal.id === id);
}
