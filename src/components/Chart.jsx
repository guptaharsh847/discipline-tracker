import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
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
  Filler
);

export default function ChartComp() {
  const data = getData();

  const labels = data.map(d => d.date);
  const scores = data.map(d => d.score);

  return (
    <div className="mt-6 h-64">
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
              backgroundColor: "rgba(34,197,94,0.2)",
              borderColor: "#22c55e"
            }
          ]
        }}
        options={{
          animation: {
            duration: 1200,
            easing: "easeInOutQuart"
          },
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 2 }
            }
          }
        }}
      />
    </div>
  );
}