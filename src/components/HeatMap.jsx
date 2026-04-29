import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { getData } from "../utils/storage";

export default function Heatmap() {
  const data = getData();

  const values = data.map((d) => ({
    date: d.date,
    count: d.score,
  }));

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md">
      <h2 className="mb-2">📅 Activity</h2>

      <CalendarHeatmap
        startDate={new Date(new Date().setDate(new Date().getDate() - 30))}
        endDate={new Date()}
        values={values}
        classForValue={(value) => {
          if (!value) return "color-empty";
          if (value.count >= 8) return "color-green";
          if (value.count >= 5) return "color-yellow";
          return "color-red";
        }}
      />
    </div>
  );
}
