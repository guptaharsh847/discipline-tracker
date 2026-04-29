import { useEffect } from "react";

import HabitList from "./components/HabitList";
import Chart from "./components/Chart";
import Streak from "./components/Streak";
import Summary from "./components/Summary";
import ThemeToggle from "./components/ThemeToggle";
import Heatmap from "./components/HeatMap";
import MultiChart from "./components/MultiChart";

import { saveDay, getData } from "./utils/storage";
import { sendToSheet } from "./utils/api";
import { calculateScore } from "./utils/helpers";

function App() {
  // 🔔 Notification system
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setInterval(
            () => {
              new Notification("📢 Reminder", {
                body: "Fill your discipline tracker today!",
              });
            },
            1000 * 60 * 60 * 6,
          ); // every 6 hours
        }
      });
    }
  }, []);

  // ✅ Handle Submit
  const handleSubmit = (data) => {
    const { habits, date } = data;

    // 🚫 Date validation
    if (!date) {
      alert("⚠️ Please select a date");
      return;
    }

    const score = calculateScore(habits);

    // 🚫 Duplicate check
    const existing = getData();
    const alreadyExists = existing.find((d) => d.date === date);

    if (alreadyExists) {
      alert("⚠️ Entry for this date already exists");
      return;
    }

    const entry = {
      date,
      score,
      habits,
    };

    // 💾 Save locally
    saveDay(entry);

    // ☁️ Send to Google Sheets
    sendToSheet(entry);

    // 🎯 Reward / Punishment
    if (score >= 8) {
      alert("🎉 Great job! Reward unlocked!");
    } else {
      alert("⚠️ Improve! Try better tomorrow.");
    }

    // 🔄 Refresh UI (simple approach)
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 transition-colors duration-300 pb-24">
      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
        {/* Header */}
        <header className="flex justify-between items-center py-4 mb-6 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent tracking-tight">
            🔥 Discipline Tracker
          </h1>
          <ThemeToggle />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative w-full z-10">
          <div className="md:col-span-1 flex flex-col gap-6">
            <Streak />
            <Summary />
          </div>
          <div className="md:col-span-2 h-full min-h-[300px]">
            <Chart />
          </div>
        </div>

        <HabitList onSubmit={handleSubmit} />
        <Heatmap />
        <MultiChart />
      </div>
    </div>
  );
}

export default App;
