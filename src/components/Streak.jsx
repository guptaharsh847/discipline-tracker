import { getData } from "../utils/storage";

export default function Streak() {
  const data = getData();

  let streak = 0;
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].score >= 8) streak++;
    else break;
  }

  let badge = "";
  if (streak >= 21) badge = "🥇 Gold";
  else if (streak >= 7) badge = "🥈 Silver";
  else if (streak >= 3) badge = "🥉 Bronze";

  return (
    <div>
      <h2>🔥 Streak: {streak}</h2>
      <p>{badge}</p>
    </div>
  );
}