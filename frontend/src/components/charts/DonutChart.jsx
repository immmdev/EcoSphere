import React, { useState } from "react";

const RADIUS = 42;
const STROKE = 16;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 3;

// data: [{ key, label, value, color }] — value is a 0-100 percent
function DonutChart({ data, emptyLabel = "No data yet" }) {
  const [hovered, setHovered] = useState(null);
  const total = data.reduce((sum, d) => sum + d.value, 0);

  let cumulative = 0;
  const segments = data.map((d) => {
    const length = total > 0 ? (d.value / 100) * CIRCUMFERENCE : 0;
    const segment = {
      ...d,
      dashArray: `${Math.max(length - GAP, 0)} ${CIRCUMFERENCE}`,
      dashOffset: -cumulative,
    };
    cumulative += length;
    return segment;
  });

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <svg
        width="140"
        height="140"
        viewBox="0 0 100 100"
        className="flex-shrink-0 -rotate-90"
        role="img"
        aria-label="Footprint breakdown by category"
      >
        {/* track */}
        <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#0c2d1a" strokeWidth={STROKE} />
        {total === 0 && (
          <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#1f4a30" strokeWidth={STROKE} />
        )}
        {segments.map((seg) => (
          <circle
            key={seg.key}
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke={seg.color}
            strokeWidth={STROKE}
            strokeDasharray={seg.dashArray}
            strokeDashoffset={seg.dashOffset}
            strokeLinecap="round"
            opacity={hovered && hovered !== seg.key ? 0.35 : 1}
            className="transition-opacity duration-150"
            onMouseEnter={() => setHovered(seg.key)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="middle"
          transform="rotate(90 50 50)"
          className="fill-green-100"
          style={{ fontSize: total === 0 ? "7px" : "16px", fontWeight: 700 }}
        >
          {total === 0 ? emptyLabel : `${Math.round(total)}%`}
        </text>
      </svg>

      {/* legend */}
      <div className="flex-1 w-full space-y-2">
        {data.map((d) => (
          <div
            key={d.key}
            onMouseEnter={() => setHovered(d.key)}
            onMouseLeave={() => setHovered(null)}
            className={`flex items-center justify-between text-sm rounded-lg px-2 py-1 transition-colors duration-150 ${
              hovered === d.key ? "bg-white/10" : ""
            }`}
          >
            <span className="flex items-center gap-2 text-green-100">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
              {d.label}
            </span>
            <span className="text-green-100 font-semibold">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonutChart;
