import React, { useState } from 'react';
import { FaSeedling, FaBullseye, FaFireAlt, FaLeaf } from 'react-icons/fa';
import DonutChart from './charts/DonutChart';
import TrendBars from './charts/TrendBars';

const CATEGORY_COLORS = {
  Travel: "#2563EB",
  Energy: "#F59E0B",
  Food: "#16A34A",
  Waste: "#92400E",
};

function ProfileBottom({ stats, loading }) {
  const [activeTab, setActiveTab] = useState("Footprint");

  const statCards = [
    { label: "Total Cool Points", value: stats?.coolPoints ?? 0, icon: <FaSeedling /> },
    { label: "Completed Actions", value: stats?.completedActions ?? 0, icon: <FaBullseye /> },
    { label: "Ongoing Streak", value: `${stats?.streak ?? 0} days`, icon: <FaFireAlt /> },
    { label: "Saved Emissions", value: `${stats?.savedEmissions ?? 0} kg CO₂eq`, icon: <FaLeaf /> },
  ];

  const categoryPercent = stats?.categoryPercent || { Travel: 0, Energy: 0, Food: 0, Waste: 0 };
  const donutData = Object.entries(categoryPercent).map(([key, value]) => ({
    key,
    label: key,
    value,
    color: CATEGORY_COLORS[key],
  }));
  const badges = stats?.badges || [];

  return (
    <div style={{borderRadius:"10px"}} className="bg-green-100 text-white px-4 pt-6 pb-20 font-sans rounded-t-3xl  border border-green-100">

      {/* Tabs */}
      <div className="bg-[#0c2d1a] border border-green-100 rounded-full flex justify-between text-sm font-medium mb-8 overflow-hidden">
        {["Achievements", "Reports", "Footprint"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 transition-all duration-200 ${
              activeTab === tab
                ? "bg-[#BFFF00] text-[#012E1C] font-semibold"
                : "text-lime-100 hover:bg-[#194d30]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* === Achievements Tab === */}
      {activeTab === "Achievements" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {statCards.map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-green-50 to-green-100 text-[#012E1C] rounded-xl p-4 flex flex-col items-center text-center shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border border-green-200"
              >
                <div className="text-2xl mb-2 text-[#0f7039]">{item.icon}</div>
                <p className="text-xl font-bold">{loading ? "…" : item.value}</p>
                <p className="text-xs text-green-900 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="bg-[#BFFF00] text-[#0b3d2e] px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* === Reports Tab === */}
      {activeTab === "Reports" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-green-800">My Savings by Category</h3>
          </div>

          <div className="bg-[#154734] rounded-xl p-4 border border-green-100">
            <DonutChart data={donutData} />
          </div>
        </div>
      )}

      {/* === Footprint Tab === */}
      {activeTab === "Footprint" && (
        <div className="mt-4">
          {stats?.latestFootprint ? (
            <div className="w-full space-y-4">
              <p className="text-sm text-green-800 text-center">
                Latest logged footprint:{" "}
                <span className="font-semibold">{stats.latestFootprint.total} kg CO₂</span>{" "}
                on {new Date(stats.latestFootprint.createdAt).toLocaleDateString()}
              </p>
              {stats.recentEntries?.length > 0 && (
                <div className="bg-[#154734] rounded-xl p-4 pt-6 border border-green-100">
                  <TrendBars entries={stats.recentEntries} />
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-green-800 text-center">
              Your Carbon Footprint is not yet calculated!
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileBottom;
