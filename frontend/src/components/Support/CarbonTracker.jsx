import {
  TrendingUp,
  Car,
  Zap,
  Utensils,
  Lightbulb,
  Plus,
  BarChart,
} from "lucide-react";
import HelpLayout from "./HelpLayout";
import CollapsibleSection from "./Collapsible-Section";

export default function CarbonTracker() {
  return (
    <HelpLayout
      title="Carbon Tracker Guide"
      description="Learn how to track your carbon footprint and improve your EcoScore"
      icon={<TrendingUp className="text-green-700" />}
      breadcrumb="Carbon Tracker"
    >
      {/* EcoScore Overview */}
      <div className="eco-static-bg shadow-2xl rounded-lg p-6 mb-8 text-white">
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-2">Your Current EcoScore</h3>
          <div className="text-4xl font-bold mb-2">742</div>
          <div className="text-white/80 mb-4">Good - Keep improving!</div>
          <div className="flex justify-center items-center space-x-4">
            <div className="text-center">
              <div className="text-lg font-semibold">-12%</div>
              <div className="text-sm text-white/80">This Month</div>
            </div>
            <div className="w-px h-8 bg-green-700"></div>
            <div className="text-center">
              <div className="text-lg font-semibold">-28%</div>
              <div className="text-sm text-white/80">This Year</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tracking Categories */}
      <div className="space-y-6">
        {/* Transportation */}
        <CollapsibleSection title="Transportation" icon={<Car className="text-green-700" />}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">What to Track</h4>
              {[
                ["Daily car trips (distance & fuel type)", Car],
                ["Flight details (domestic/international)", TrendingUp],
                ["Public transportation usage", Zap],
                ["Bike rides and walking", Car]
              ].map(([text, Icon], i) => (
                <div key={i} className="flex items-center p-2 bg-white rounded border border-green-700 text-black">
                  <Icon className="w-5 h-5 text-green-700 mr-3" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">How to Log</h4>
              {[
                ["Quick Entry", "Use preset routes for common trips"],
                ["Manual Entry", "Enter exact distance and vehicle type"],
                ["GPS Tracking", "Auto-detect trips with mobile app"]
              ].map(([title, desc], i) => (
                <div key={i} className="bg-white p-3 rounded border border-green-700 text-black">
                  <div className="font-medium mb-1">{title}</div>
                  <div className="text-sm">{desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <div className="inline-block px-4 py-2 bg-green-700 text-white rounded hover:opacity-90 cursor-pointer">
              Log Transportation
            </div>
          </div>
        </CollapsibleSection>

        {/* Energy Use */}
        <CollapsibleSection title="Energy Use" icon={<Zap className="text-green-700" />}>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              ["Electricity", ["Monthly kWh usage", "Energy source type", "Peak vs off-peak usage", "Solar panel generation"]],
              ["Heating & Cooling", ["Natural gas consumption", "Heating oil usage", "Propane consumption", "Heat pump efficiency"]],
              ["Smart Tracking", ["Connect smart meters", "Upload utility bills", "Set usage targets", "Track improvements"]]
            ].map(([title, items], i) => (
              <div key={i} className="bg-white text-black p-4 rounded border border-green-700">
                <h4 className="font-semibold text-green-700 mb-2">{title}</h4>
                <ul className="text-sm space-y-1">
                  {items.map((item, j) => <li key={j}>• {item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Food & Consumption */}
        <CollapsibleSection title="Food & Consumption" icon={<Utensils className="text-green-700" />}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Dietary Tracking</h4>
              {[
                ["Meat consumption", "High Impact", "text-red-500"],
                ["Dairy products", "Medium Impact", "text-orange-500"],
                ["Plant-based foods", "Low Impact", "text-green-600"],
                ["Local vs imported", "Track Origin", "text-green-700"]
              ].map(([item, impact, color], i) => (
                <div key={i} className="bg-white p-3 rounded border border-green-700 text-black">
                  <div className="flex items-center justify-between">
                    <span>{item}</span>
                    <span className={`${color} text-sm`}>{impact}</span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Consumption Patterns</h4>
              {[
                ["Purchases", "Track new vs. second-hand items"],
                ["Waste", "Log recycling and composting"],
                ["Water Usage", "Monitor household water consumption"]
              ].map(([title, desc], i) => (
                <div key={i} className="bg-white p-3 rounded border border-green-700 text-black">
                  <div className="font-medium mb-1">{title}</div>
                  <div className="text-sm">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </CollapsibleSection>

        {/* Tracking Tips */}
        <CollapsibleSection title="Tracking Tips & Best Practices" icon={<Lightbulb className="text-green-700" />}>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ["Accuracy Tips", [
                "Log activities daily for better accuracy",
                "Use actual receipts and bills when possible",
                "Estimate conservatively when unsure",
                "Update your profile settings regularly",
                "Verify auto-tracked data before saving"
              ]],
              ["Motivation Strategies", [
                "Set weekly and monthly reduction goals",
                "Compare with community averages",
                "Celebrate small improvements",
                "Share progress with friends",
                "Focus on one category at a time"
              ]]
            ].map(([title, items], i) => (
              <div key={i}>
                <h4 className="font-semibold text-white mb-3">{title}</h4>
                <ul className="text-white space-y-2 text-sm">
                  {items.map((tip, j) => <li key={j}>• {tip}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      </div>

      {/* Action Center */}
      <div className="mt-8 eco-static-bg rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-700 hover:bg-green-600 p-4 rounded transition text-left cursor-pointer">
            <div className="flex items-center">
              <Plus className="w-5 h-5 mr-3" />
              <div>
                <div className="font-semibold">Log Today's Activities</div>
                <div className="text-sm opacity-90">
                  Add transportation, energy, and consumption data
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white text-black border border-green-700 p-4 rounded hover:bg-gray-100 transition text-left cursor-pointer">
            <div className="flex items-center">
              <BarChart className="w-5 h-5 text-green-700 mr-3" />
              <div>
                <div className="font-semibold">View Detailed Reports</div>
                <div className="text-sm text-gray-700">
                  Analyze your carbon footprint trends
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HelpLayout>
  );
}
