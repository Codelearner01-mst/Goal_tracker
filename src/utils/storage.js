export function saveGoals(goals) {
  if (goals && Array.isArray(goals)) {
    localStorage.setItem("goals", JSON.stringify(goals));
  }
}

export function savedGoals() {
  try {
    return JSON.parse(localStorage.getItem("goals")) || [];
  } catch (error) {
    console.error("Goals data not found", error);
  }
}
