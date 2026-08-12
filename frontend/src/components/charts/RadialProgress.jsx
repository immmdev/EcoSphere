import React from "react";

const RADIUS = 42;
const STROKE = 10;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// percent: 0-100
function RadialProgress({ percent, size = 96, color = "#05C89C", label, sublabel }) {
  const clamped = Math.max(0, Math.min(100, percent));
  const dashOffset = CIRCUMFERENCE * (1 - clamped / 100);

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#0c2d1a" strokeWidth={STROKE} />
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth={STROKE}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold text-green-900 leading-none">{label}</span>
        {sublabel && <span className="text-[10px] text-green-700 mt-0.5">{sublabel}</span>}
      </div>
    </div>
  );
}

export default RadialProgress;
