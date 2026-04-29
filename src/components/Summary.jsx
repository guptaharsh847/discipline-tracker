import { getData } from "../utils/storage";

export default function Summary() {
  const data = getData().slice(-7);

  if (!data.length) return null;

  const avg = (data.reduce((a, b) => a + b.score, 0) / data.length).toFixed(1);
  const best = Math.max(...data.map((d) => d.score));
  const worst = Math.min(...data.map((d) => d.score));

  return (
    <div
      className="bg-white dark:bg-white/10
border border-gray-200 dark:border-white/20
backdrop-blur-md shadow-lg p-3 mt-4 rounded"
    >
      <p>Avg: {avg}</p>
      <p>Best: {best}</p>
      <p>Worst: {worst}</p>
    </div>
  );
}
