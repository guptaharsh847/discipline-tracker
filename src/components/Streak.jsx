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
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-xl p-6 flex flex-col items-center justify-center text-center transition-colors h-full">
      <h2 className="text-4xl font-black mb-2 flex items-center gap-3">
        🔥{" "}
        <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          {streak}
        </span>
        <span className="text-lg font-bold text-slate-500 dark:text-slate-400 mt-2">
          days
        </span>
      </h2>
      <p className="text-lg font-semibold text-slate-600 dark:text-slate-300">
        {badge || "🌱 Getting Started"}
      </p>
    </div>
  );
}
