import RadialProgress from "./charts/RadialProgress";

function ProfileMiddle({ stats, loading }) {
  const level = stats?.level ?? 1;
  const min = stats?.levelMin ?? 0;
  const max = stats?.levelMax ?? 10;
  const points = stats?.coolPoints ?? 0;
  const progressPct = max > min ? Math.min(100, Math.round(((points - min) / (max - min)) * 100)) : 0;

  return (
    <div className="rounded-2xl p-4 mt-5 mb-5 bg-green-100 text-green-900 shadow-sm flex items-center gap-5">
      <RadialProgress
        percent={loading ? 0 : progressPct}
        label={`Lv ${level}`}
        sublabel={`${points} pts`}
      />

      <div className="flex-1">
        <div className="flex items-center gap-3 text-sm mb-2">
          <span className="bg-[#BFFF00] text-[#0b3d2e] px-3 py-0.5 rounded-full text-xs font-semibold shadow-sm">
            Level {level}
          </span>
          <span className="text-green-800 font-medium tracking-wide">
            EcoSphere Explorer
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-green-900 rounded-full overflow-hidden mb-2">
          <div
            className="bg-gradient-to-r from-[#05C89C] to-[#BFFF00] h-2 transition-all duration-500 ease-out"
            style={{ width: loading ? "0%" : `${progressPct}%` }}
          ></div>
        </div>

        {/* Min-Max Points */}
        <div className="flex justify-between text-xs text-green-800 px-0.5">
          <span className="opacity-100">{min}</span>
          <span className="font-semibold">{max}</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileMiddle;
