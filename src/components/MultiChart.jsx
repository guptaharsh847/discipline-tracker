import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { getData } from "../utils/storage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
);

export default function MultiChart() {
  const data = getData();

  const labels = data.map((d) => d.date);

  const getTime = (habit) =>
    data.map((d) => Number(d.habits?.[habit]?.time || 0));

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        📊 Metrics Breakdown
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ChartBlock
          title="🚶 Walk"
          data={getTime("Walk")}
          labels={labels}
          color="#3b82f6"
        />
        <ChartBlock
          title="😴 Sleep"
          data={getTime("Sleep")}
          labels={labels}
          color="#a855f7"
        />
        <ChartBlock
          title="📚 Study"
          data={getTime("Study")}
          labels={labels}
          color="#22c55e"
        />
      </div>
    </div>
  );
}

function ChartBlock({ title, data, labels, color }) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm p-4 rounded-xl transition-colors">
      <h3 className="text-md font-bold mb-3 flex items-center gap-2">
        {title}
      </h3>
      <div className="h-40">
        <Line
          data={{
            labels,
            datasets: [
              {
                data,
                borderColor: color,
                backgroundColor: color + "33",
                fill: true,
                tension: 0.4,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
          }}
        />
      </div>
    </div>
  );
}
