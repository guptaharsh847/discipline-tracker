import { useState } from "react";

const habitNames = [
  "Wake",
  "Cycling",
  "Walk",
  "Study",
  "Bhagwat",
  "Chanting",
  "No Phone",
  "Diet",
  "Sleep",
  "Focus",
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
    habitNames.reduce((acc, h) => {
      acc[h] = { done: false, time: "" };
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
    <div className="space-y-3 pb-24">
      {/* ✅ DATE PICKER */}
      <input
        type="date"
        className="w-full p-3 mb-4 text-black rounded"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {habitNames.map((h) => (
        <div
          key={h}
          className="bg-white dark:bg-white/10
border border-gray-200 dark:border-white/20
backdrop-blur-md shadow-lg p-3 rounded-xl"
        >
          <div className="flex justify-between">
            <span>{h}</span>
            <input type="checkbox" onChange={() => toggle(h)} />
          </div>

          <input
            placeholder="time/min (optional)"
            className="w-full mt-2 p-2 text-black rounded"
            onChange={(e) => setTime(h, e.target.value)}
          />
        </div>
      ))}

      <button
        onClick={() => onSubmit({ habits, date: selectedDate })}
        className="mt-4 w-full bg-green-500 p-4 rounded-xl"
      >
        Submit Day
      </button>
    </div>
  );
}
