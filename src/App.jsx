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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">

  <div className="max-w-md mx-auto p-4 space-y-6">

    {/* Header */}
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-bold">🔥 Discipline Tracker</h1>
      <ThemeToggle />
    </div>

    <Streak />
    <HabitList onSubmit={handleSubmit} />
    <Summary />
    <Chart />
    <Heatmap />
    <MultiChart />

  </div>
</div>
  );
}

export default App;
