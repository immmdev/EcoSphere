import React from "react";

// entries: [{ total, createdAt }] — most recent first
function TrendBars({ entries, color = "#BFFF00" }) {
  if (!entries || entries.length === 0) return null;

  const chronological = [...entries].reverse();
  const max = Math.max(...chronological.map((e) => e.total), 1);

  return (
    <div className="flex items-end gap-2 h-32">
      {chronological.map((entry, idx) => {
        const heightPct = Math.max((entry.total / max) * 100, 4);
        const date = new Date(entry.createdAt);
        return (
          <div key={idx} className="group relative flex-1 flex flex-col items-center h-full justify-end">
            {/* tooltip */}
            <div className="absolute -top-9 opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-[#0c2d1a] text-green-100 text-xs rounded-md px-2 py-1 whitespace-nowrap pointer-events-none z-10 shadow-lg">
              {entry.total} kg · {date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
            </div>
            <div
              className="w-full rounded-t-[4px] transition-all duration-300"
              style={{ height: `${heightPct}%`, backgroundColor: color, minWidth: "10px" }}
            />
            <span className="text-[10px] text-green-200 mt-1 whitespace-nowrap">
              {date.toLocaleDateString(undefined, { day: "numeric", month: "short" })}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default TrendBars;
