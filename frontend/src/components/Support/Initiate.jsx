import {
  Handshake,
  Users,
  Globe,
  Lightbulb,
  Recycle,
  TreePine,
  Zap,
  GraduationCap,
} from "lucide-react";
import HelpLayout from "./HelpLayout";
import CollapsibleSection from "./Collapsible-Section";

export default function Initiate() {
  return (
    <HelpLayout
      title="Join Initiatives"
      description="Make a real impact by participating in community-driven environmental initiatives"
      icon={<Handshake className="text-green-700" />}
      breadcrumb="Join Initiatives"
    >
      {/* Initiative Types */}
      <div className="grid md:grid-cols-3 gap-6 mb-8 ">
        {[["Community Projects", Users, "Local environmental improvements and awareness campaigns"],
          ["Global Movements", Globe, "Join worldwide efforts for climate action and sustainability"],
          ["Innovation Challenges", Lightbulb, "Contribute to solving environmental problems through innovation"]
        ].map(([title, Icon, desc], idx) => (
          <div key={idx} className="eco-static-bg shadow-2xl p-6 rounded-lg text-center text-white">
            <Icon className="w-12 h-12 text-green-700 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm">{desc}</p>
          </div>
        ))}
      </div>

      {/* Finding Initiatives */}
      <div className="space-y-6">
        <CollapsibleSection title="Finding the Right Initiative">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Browse by Category</h4>
              <div className="space-y-2">
                {[
                  ["Waste Reduction", Recycle, "Community cleanups, recycling drives"],
                  ["Reforestation", TreePine, "Tree planting, forest conservation"],
                  ["Clean Energy", Zap, "Solar installations, energy efficiency"],
                  ["Education", GraduationCap, "Environmental awareness programs"]
                ].map(([label, Icon, desc], idx) => (
                  <div key={idx} className="bg-white p-3 rounded border border-green-700">
                    <div className="flex items-center">
                      <Icon className="w-5 h-5 text-green-700 mr-3" />
                      <div>
                        <div className="text-black font-medium">{label}</div>
                        <div className="text-white text-sm">{desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Filter Options</h4>
              {[
                ["Location", "Local, regional, national, or global"],
                ["Time Commitment", "One-time, weekly, monthly, or ongoing"],
                ["Skills Required", "No experience to expert level"],
                ["Impact Level", "Community, regional, or global impact"]
              ].map(([label, desc], idx) => (
                <div key={idx} className="bg-white p-3 rounded border border-green-700 space-y-1 mb-3">
                  <div className="text-black font-medium">{label}</div>
                  <div className="text-white text-sm">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </CollapsibleSection>

        {/* How to Participate */}
        <CollapsibleSection title="How to Participate">
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4 text-white">
              {["Discover", "Learn", "Join", "Act"].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="bg-green-700 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-3">
                    {i + 1}
                  </div>
                  <h4 className="font-semibold text-white  mb-2">{step}</h4>
                  <p className="text-white text-sm">Step description for {step.toLowerCase()}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-3">Participation Types</h4>
                {["Volunteer", "Supporter", "Advocate", "Leader"].map((type, i) => (
                  <div key={i} className="bg-white p-3 rounded border border-green-700 flex items-center justify-between mb-2">
                    <span className="text-white">{type}</span>
                    <span className="text-black text-sm">{["Hands-on", "Financial", "Awareness", "Organize"][i]}</span>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="font-semibold text-black mb-3">Recognition & Rewards</h4>
                <ul className="text-white space-y-2 text-sm">
                  <li>• Earn EcoCoins for participation</li>
                  <li>• Unlock achievement badges</li>
                  <li>• Boost your EcoScore rating</li>
                  <li>• Get featured as a community hero</li>
                  <li>• Access to exclusive events</li>
                  <li>• Leadership development opportunities</li>
                </ul>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Starting Your Own Initiative */}
        <CollapsibleSection title="Starting Your Own Initiative">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Planning Process</h4>
              {[
                ["Define Your Goal", "Clearly articulate the environmental problem you want to address"],
                ["Research & Plan", "Study similar initiatives and develop a detailed action plan"],
                ["Build a Team", "Recruit passionate volunteers and identify key partnerships"],
                ["Launch & Promote", "Use EcoSphere tools to recruit participants and track progress"]
              ].map(([title, desc], i) => (
                <div key={i} className="bg-white p-3 rounded border border-green-700 space-y-1 mb-3">
                  <div className="text-black font-medium">{title}</div>
                  <div className="text-black text-sm">{desc}</div>
                </div>
              ))}
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Support Resources</h4>
              <ul className="text-white space-y-2 text-sm">
                <li>• Initiative planning templates and guides</li>
                <li>• Mentorship from experienced organizers</li>
                <li>• Funding and grant application assistance</li>
                <li>• Marketing and promotion tools</li>
                <li>• Progress tracking and reporting features</li>
                <li>• Legal and compliance guidance</li>
                <li>• Community networking opportunities</li>
              </ul>
              <div className="mt-4">
                <Button className="bg-green-700 text-white hover:bg-green-600">
                  Submit Initiative Proposal
                </Button>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Success Stories */}
        <CollapsibleSection title="Success Stories">
          {[
            ["Urban Forest Project - Seattle", TreePine, "Community initiative planted 5,000 trees...", "1,200 volunteers", "Impact: 150 tons CO2 absorbed annually"],
            ["Zero Waste Schools - Austin", Recycle, "District-wide initiative reduced school waste...", "50 schools participated", "Impact: 500 tons waste diverted"],
            ["Community Solar Garden - Denver", Zap, "Collective solar installation providing clean energy...", "300 families", "Impact: 1.2 MW clean energy generated"]
          ].map(([title, Icon, desc, meta1, meta2], i) => (
            <div key={i} className="bg-white text-black p-4 rounded border border-green-700 mb-4">
              <div className="flex items-start space-x-4">
                <Icon className="w-8 h-8 mt-1 text-green-700" />
                <div>
                  <h4 className="font-semibold text-black mb-2">{title}</h4>
                  <p className="text-sm mb-2">{desc}</p>
                  <div className="flex items-center text-sm">
                    <span className="mr-4">{meta1}</span>
                    <span className="text-black">{meta2}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CollapsibleSection>
      </div>

      {/* Featured Initiatives */}
      <div className="mt-8 eco-static-bg rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold text-white mb-4">Featured Active Initiatives</h3>
        <div className="grid md:grid-cols-2 gap-4 t">
          {[
            ["Ocean Cleanup Drive", "Ongoing", "Join coastal cleanups happening worldwide...", "2,543 volunteers • 23 locations"],
            ["Green Energy Challenge", "New", "Help install solar panels in underserved communities...", "156 volunteers • 8 cities"]
          ].map(([title, status, desc, stats], i) => (
            <div key={i} className="bg-white  p-4 rounded border border-green-700 text-black">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{title}</h4>
                <span
                  className={`px-2 py-1 rounded text-xs text-white ${
                    status === "Ongoing" ? "bg-blue-600" : "bg-green-600"
                  }`}
                >
                  {status}
                </span>
              </div>
              <p className="text-sm text-black mb-3">{desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-green-700 text-sm">{stats}</span>
                <Button className="bg-green-700 text-white hover:bg-green-600" size="sm">
                  Join Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HelpLayout>
  );
}

function Button({ children, className = "", type = "button", onClick, size }) {
  const sizeClasses = size === "sm" ? "px-3 py-1 text-sm" : "px-4 py-2 text-base";
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${sizeClasses} rounded font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-700 ${className}`}
    >
      {children}
    </button>
  );
}
