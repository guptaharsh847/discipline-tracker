import { useState } from "react";

const habitConfig = [
  { name: "Wake", icon: "🌅" },
  { name: "Cycling", icon: "🚴" },
  { name: "Walk", icon: "🚶" },
  { name: "Study", icon: "📚" },
  { name: "Bhagwat", icon: "📖" },
  { name: "Chanting", icon: "📿" },
  { name: "No Phone", icon: "📵" },
  { name: "Diet", icon: "🥗" },
  { name: "Sleep", icon: "😴" },
  { name: "Focus", icon: "🎯" },
];

export default function HabitList({ onSubmit }) {
  // ✅ Date state inside component
  const getYesterday = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
  };

  const [selectedDate, setSelectedDate] = useState(getYesterday());

  const [habits, setHabits] = useState(
    habitConfig.reduce((acc, h) => {
      acc[h.name] = { done: false, time: "" };
      return acc;
    }, {}),
  );

  const toggle = (h) => {
    setHabits({
      ...habits,
      [h]: { ...habits[h], done: !habits[h].done },
    });
  };

  const setTime = (h, val) => {
    setHabits({
      ...habits,
      [h]: { ...habits[h], time: val },
    });
  };

  return (
    <div className="relative w-full space-y-6 pb-28 mt-12">
      {/* ✅ DATE PICKER */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
          Select Date
        </label>
        <input
          type="date"
          className="w-full bg-slate-100 dark:bg-slate-900 border-none p-3 text-lg font-semibold text-slate-800 dark:text-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-shadow outline-none cursor-pointer"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* ✅ HABIT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {habitConfig.map((h) => {
          const isDone = habits[h.name]?.done || false;
          return (
            <div
              key={h.name}
              className={`group relative bg-white dark:bg-slate-800 border-2 transition-all duration-300 rounded-2xl p-4 shadow-sm hover:shadow-md ${
                isDone
                  ? "border-green-500 dark:border-green-500 bg-green-50/50 dark:bg-green-900/10"
                  : "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700"
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-3xl bg-slate-100 dark:bg-slate-700 p-2 rounded-xl group-hover:scale-110 transition-transform">
                    {h.icon}
                  </div>
                  <span
                    className={`text-lg font-bold ${
                      isDone
                        ? "text-green-700 dark:text-green-400"
                        : "text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {h.name}
                  </span>
                </div>

                <label className="relative flex items-center justify-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={isDone}
                    onChange={() => toggle(h.name)}
                  />
                  <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 peer-checked:bg-green-500 peer-checked:border-green-500 transition-all flex items-center justify-center shadow-inner peer-hover:ring-4 peer-hover:ring-green-500/20">
                    <svg
                      className={`w-5 h-5 text-white transition-transform duration-300 ${
                        isDone ? "scale-100 opacity-100" : "scale-50 opacity-0"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </label>
              </div>

              <input
                placeholder="Add notes or time..."
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all placeholder:text-slate-400"
                value={habits[h.name]?.time || ""}
                onChange={(e) => setTime(h.name, e.target.value)}
              />
            </div>
          );
        })}
      </div>

      <div className="bottom-6 left-0 right-0 px-4 md:px-0 md:max-w-[70vw] lg:max-w-4xl mx-auto z-50">
        <button
          onClick={() => onSubmit({ habits, date: selectedDate })}
          className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-lg font-black py-4 rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          💾 Save Daily Log
        </button>
      </div>
    </div>
  );
}
