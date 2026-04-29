export const calculateScore = (habits) => {
  return Object.values(habits).filter(h => h.done).length;
};

export const getTrend = (data) => {
  if (data.length < 2) return "—";

  const last = data[data.length - 1].score;
  const prev = data[data.length - 2].score;

  if (last > prev) return "↑ Improving";
  if (last < prev) return "↓ Declining";
  return "→ Same";
};