import { getData } from "../utils/storage";

export default function Summary() {
  const data = getData().slice(-7);

  if (!data.length) return null;

  const avg = (data.reduce((a, b) => a + b.score, 0) / data.length).toFixed(1);
  const best = Math.max(...data.map((d) => d.score));
  const worst = Math.min(...data.map((d) => d.score));

  return (
    <div className="relative w-full grid grid-cols-3 gap-4 mb-10 mt-8">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-xl p-3 text-center transition-colors">
        <div className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider mb-1">
          Avg
        </div>
        <div className="text-xl font-extrabold text-blue-800 dark:text-blue-300">
          {avg}
        </div>
      </div>
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/50 rounded-xl p-3 text-center transition-colors">
        <div className="text-xs text-green-600 dark:text-green-400 font-bold uppercase tracking-wider mb-1">
          Best
        </div>
        <div className="text-xl font-extrabold text-green-800 dark:text-green-300">
          {best}
        </div>
      </div>
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/50 rounded-xl p-3 text-center transition-colors">
        <div className="text-xs text-red-600 dark:text-red-400 font-bold uppercase tracking-wider mb-1">
          Worst
        </div>
        <div className="text-xl font-extrabold text-red-800 dark:text-red-300">
          {worst}
        </div>
      </div>
    </div>
  );
}
