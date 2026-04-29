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
    <div className="mt-6 space-y-6 pd-10">
      <ChartBlock
        title="🚶 Walk Time"
        data={getTime("Walk")}
        labels={labels}
        color="#3b82f6"
      />
      <ChartBlock
        title="😴 Sleep Time"
        data={getTime("Sleep")}
        labels={labels}
        color="#a855f7"
      />
      <ChartBlock
        title="📚 Study Time"
        data={getTime("Study")}
        labels={labels}
        color="#22c55e"
      />
    </div>
  );
}

function ChartBlock({ title, data, labels, color }) {
  return (
    <div
      className="bg-white dark:bg-white/10
border border-gray-200 dark:border-white/20
backdrop-blur-md shadow-lg p-3 rounded-xl"
    >
      <h3 className="mb-2">{title}</h3>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: title, // ✅ FIX
              data,
              borderColor: color,
              backgroundColor: color + "33",
              tension: 0.4,
            },
          ],
        }}
      />
    </div>
  );
}
