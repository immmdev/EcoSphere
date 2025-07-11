import { Users, Leaf, Globe, Lightbulb } from "lucide-react";
import HelpLayout from "./HelpLayout";
import CollapsibleSection from "./Collapsible-Section";

export default function Community() {
  return (
    <HelpLayout
      title="Communities Guide"
      description="Connect, collaborate, and grow with like-minded eco-enthusiasts"
      icon={<Users className="text-green-700" />}
      breadcrumb="Communities"
    >
      {/* Community Types */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {[["Local Groups", Leaf, "Connect with people in your area for local initiatives"],
          ["Global Communities", Globe, "Join worldwide movements and discussions"],
          ["Special Interest", Lightbulb, "Focus on specific sustainability topics"]
        ].map(([title, Icon, desc], i) => (
          <div key={i} className="eco-static-bg shadlow-2xl p-6 rounded-lg text-center">
            <Icon className="w-12 h-12 text-white mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-white text-sm">{desc}</p>
          </div>
        ))}
      </div>

      {/* How to Sections */}
      <div className="space-y-6">

        {/* Finding Communities */}
        <CollapsibleSection title="Finding the Right Community">
          <div className="space-y-4">
            {[
              ["Browse by Category", ["Renewable Energy", "Sustainable Living", "Zero Waste", "Climate Action", "Eco-friendly Technology"]],
              ["Search Tips", ["Use location filters for local groups", "Check activity levels and member count", "Read community guidelines and values", "Look for verified communities"]]
            ].map(([heading, items], i) => (
              <div key={i} className="bg-white text-black p-4 rounded border border-green-700">
                <h4 className="font-semibold text-green-700 mb-2">{heading}</h4>
                <ul className="space-y-1 text-sm">
                  {items.map((item, j) => <li key={j}>• {item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Joining Communities */}
        <CollapsibleSection title="How to Join Communities">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Step by Step Process</h4>
              <div className="space-y-3">
                {[
                  "Browse community profiles",
                  "Read community guidelines",
                  'Click "Join Community"',
                  "Introduce yourself (if required)"
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="bg-green-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">
                      {idx + 1}
                    </div>
                    <span className="text-white text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Community Types</h4>
              <div className="space-y-2">
                {[
                  ["Open Communities", "Instant Join"],
                  ["Moderated Communities", "Request to Join"],
                  ["Private Communities", "Invitation Only"]
                ].map(([type, access], i) => (
                  <div key={i} className="bg-white text-black p-3 rounded border border-green-700">
                    <div className="flex items-center justify-between text-sm">
                      <span>{type}</span>
                      <span className="text-green-700">{access}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Community Engagement */}
        <CollapsibleSection title="Engaging with Communities">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Participation Activities</h4>
              <div className="space-y-2">
                {[
                  [Users, "Join discussions"],
                  [Globe, "Share your experiences"],
                  [Leaf, "Attend events"],
                  [Lightbulb, "Volunteer for projects"]
                ].map(([Icon, text], i) => (
                  <div key={i} className="flex items-center p-2 bg-white rounded border border-green-700 text-black">
                    <Icon className="w-5 h-5 text-green-700 mr-3" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Community Guidelines</h4>
              <ul className="text-white space-y-2 text-sm">
                <li>• Be respectful and constructive</li>
                <li>• Stay on topic and relevant</li>
                <li>• Share reliable information</li>
                <li>• Support fellow members</li>
                <li>• Follow posting guidelines</li>
                <li>• Report inappropriate content</li>
              </ul>
            </div>
          </div>
        </CollapsibleSection>
      </div>

      {/* Featured Communities */}
      <div className="mt-8 eco-static-bg rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Featured Communities</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            ["Climate Action Network", "Global community focused on climate change solutions", "12,543 members"],
            ["Zero Waste Living", "Tips and support for reducing waste in daily life", "8,921 members"]
          ].map(([title, desc, count], i) => (
            <div key={i} className="bg-white text-black p-4 rounded border border-green-700">
              <h4 className="font-semibold mb-2">{title}</h4>
              <p className="text-sm mb-2">{desc}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-700">{count}</span>
                <div className="px-3 py-1 bg-green-700 text-white text-sm rounded cursor-pointer hover:opacity-90">
                  Join
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HelpLayout>
  );
}
