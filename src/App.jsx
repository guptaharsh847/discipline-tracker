import { useEffect, useState } from "react";

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
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [popup, setPopup] = useState(null);
  const [needsReload, setNeedsReload] = useState(false);

  // PWA Install prompt logic
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI to notify the user they can add to home screen
      if (localStorage.getItem("pwa_install_dismissed") !== "true") {
        setShowInstallPrompt(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const handleClosePrompt = () => {
    setShowInstallPrompt(false);
    localStorage.setItem("pwa_install_dismissed", "true");
  };

  const handleCloseMessagePopup = () => {
    setPopup(null);
    if (needsReload) {
      window.location.reload();
    }
  };

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
      setPopup({
        title: "Missing Date",
        message: "⚠️ Please select a date before submitting.",
        type: "warning",
      });
      return;
    }

    const score = calculateScore(habits);

    // 🚫 Duplicate check
    const existing = getData();
    const alreadyExists = existing.find((d) => d.date === date);

    if (alreadyExists) {
      setPopup({
        title: "Duplicate Entry",
        message: "⚠️ An entry for this date already exists.",
        type: "warning",
      });
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
      setPopup({
        title: "🎉 Amazing Work!",
        message: "Great job! Keep building that discipline. Reward unlocked!",
        type: "success",
      });
    } else {
      setPopup({
        title: "💪 Keep Pushing!",
        message: "Every day is a new opportunity. Try to improve tomorrow!",
        type: "motivation",
      });
    }
    setNeedsReload(true);
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

      {showInstallPrompt && (
        <div className="pwa-install-modal-overlay fade-in">
          <div className="pwa-install-modal-content">
            <button className="close-button" onClick={handleClosePrompt}>
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2">
              Install Discipline Tracker
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Add this app to your home screen for quick and easy access.
            </p>
            <button
              onClick={handleInstallClick}
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Install App
            </button>
          </div>
        </div>
      )}

      {popup && (
        <div className="pwa-install-modal-overlay fade-in">
          <div className="pwa-install-modal-content">
            <button className="close-button" onClick={handleCloseMessagePopup}>
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-3">{popup.title}</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">
              {popup.message}
            </p>
            <button
              onClick={handleCloseMessagePopup}
              className={`w-full text-white font-bold py-3 px-4 rounded-xl transition-colors ${
                popup.type === "success"
                  ? "bg-green-500 hover:bg-green-600"
                  : popup.type === "warning"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
