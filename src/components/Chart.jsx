import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { getData } from "../utils/storage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
);

export default function ChartComp() {
  const data = getData();

  const labels = data.map((d) => d.date);
  const scores = data.map((d) => d.score);

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm p-4 md:p-6 rounded-xl transition-colors h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        📈 Performance Trend
      </h2>
      <div className="flex-1 w-full min-h-[250px]">
        <Line
          key={JSON.stringify(data)}
          data={{
            labels,
            datasets: [
              {
                label: "Score",
                data: scores,
                tension: 0.4, // smooth curve
                fill: true,
                borderWidth: 3,
                pointRadius: 4,
                backgroundColor: "rgba(99, 102, 241, 0.2)",
                borderColor: "#4f46e5",
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 1200,
              easing: "easeInOutQuart",
            },
            plugins: {
              legend: { display: false },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { stepSize: 2 },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
