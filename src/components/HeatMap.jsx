import { useMemo } from "react";
import { getData } from "../utils/storage";

export default function Heatmap() {
  const data = getData();

  // Get the last 28 days for a perfect 4-week grid
  const last28Days = useMemo(() => {
    const days = [];
    for (let i = 27; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];

      const record = data.find((item) => item.date === dateStr);
      const score = record ? record.score : 0;

      days.push({
        dateStr,
        day: d.getDate(),
        month: d.toLocaleString("default", { month: "short" }),
        weekday: d.toLocaleString("default", { weekday: "short" }),
        score,
      });
    }
    return days;
  }, [data]);

  const getColor = (score) => {
    if (!score)
      return "bg-slate-50 dark:bg-slate-800/50 text-slate-400 border-slate-200 dark:border-slate-700";
    if (score >= 8)
      return "bg-emerald-500 text-white border-emerald-600 shadow-emerald-500/30 shadow-lg dark:border-emerald-400";
    if (score >= 5)
      return "bg-emerald-400 text-white border-emerald-500 shadow-emerald-400/20 shadow-md dark:border-emerald-300";
    if (score >= 3)
      return "bg-emerald-300 text-emerald-900 border-emerald-400 dark:border-emerald-200";
    return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-200 dark:border-emerald-800";
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm p-4 md:p-6 rounded-xl mt-8 transition-colors">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        📅 Daily Score Calendar
      </h2>

      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 md:gap-3">
        {last28Days.map(({ dateStr, day, month, weekday, score }) => (
          <div
            key={dateStr}
            className={`flex flex-col items-center justify-center p-2 rounded-2xl border-2 transition-all hover:scale-105 ${getColor(score)}`}
            title={`${dateStr} - Score: ${score}`}
          >
            <span className="text-2xl font-black">{score || "-"}</span>
            <span className="text-[10px] uppercase font-bold opacity-75 mt-1 leading-none">
              {month} {day} {weekday}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
