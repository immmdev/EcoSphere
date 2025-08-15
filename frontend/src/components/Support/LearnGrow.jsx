import {
  GraduationCap,
  Sprout,
  TreePine,
  Award,
  Play,
  Lightbulb,
  Recycle,
  Leaf,
  Clock,
  Users,
} from "lucide-react";
import HelpLayout from './HelpLayout';
import CollapsibleSection from "./Collapsible-Section";

export default function LearnGrow() {
  return (
    <HelpLayout
      title="Learn & Grow"
      description="Expand your knowledge and build sustainable habits through our educational resources"
      icon={<GraduationCap className="text-green-700" />}
      breadcrumb="Learn & Grow"
    >
      {/* Learning Paths */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {[["Beginner", Sprout], ["Intermediate", TreePine], ["Advanced", Award]].map(([level, Icon], i) => (
          <div key={i} className="eco-static-bg p-6 rounded-lg text-center">
            <Icon className="w-12 h-12 text-white mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">{level}</h3>
            <p className="text-green-100 text-sm">
              {["Start your sustainability journey", "Deepen your understanding", "Become a sustainability expert"][i]}
            </p>
          </div>
        ))}
      </div>

      {/* Content Categories */}
      <div className="space-y-6">
        {/* Videos & Tutorials */}
        <CollapsibleSection title="Videos & Tutorials">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left - Featured Series */}
            <div className="space-y-3">
              <h4 className="font-semibold text-green-700">Featured Series</h4>
              {[
                ["Renewable Energy Basics", "12 episodes • 2 hours", Play],
                ["Sustainable Home Living", "8 episodes • 1.5 hours", Play],
                ["Climate Change Science", "15 episodes • 3 hours", Play],
              ].map(([title, meta, Icon], i) => (
                <div key={i} className="bg-white p-3 rounded border border-green-700">
                  <div className="flex items-center">
                    <Icon className="w-5 h-5 text-green-700 mr-3" />
                    <div>
                      <div className="text-black font-medium">{title}</div>
                      <div className="text-green-700 text-sm">{meta}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right - Quick Tips */}
            <div className="space-y-3">
              <h4 className="font-semibold text-green-700">Quick Tips</h4>
              {[
                ["5-Minute Energy Saving Tips", "Daily tips for efficiency", Lightbulb],
                ["Waste Reduction Hacks", "Simple daily changes", Recycle],
                ["Green Transportation", "Eco-friendly travel options", Leaf],
              ].map(([title, desc, Icon], i) => (
                <div key={i} className="bg-white p-3 rounded border border-green-700">
                  <div className="flex items-center">
                    <Icon className="w-5 h-5 text-green-700 mr-3" />
                    <div>
                      <div className="text-black font-medium">{title}</div>
                      <div className="text-green-700 text-sm">{desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CollapsibleSection>

        {/* Articles & Guides */}
        <CollapsibleSection title="Articles & Guides">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              ["Energy Efficiency", ["Solar Panel Installation Guide", "Home Insulation Best Practices", "Smart Home Energy Management", "LED Lighting Benefits"]],
              ["Sustainable Living", ["Zero Waste Kitchen Setup", "Eco-Friendly Cleaning Products", "Sustainable Fashion Choices", "Organic Gardening for Beginners"]],
              ["Climate Science", ["Understanding Carbon Cycles", "Global Warming Impacts", "Renewable Energy Technologies", "Ecosystem Conservation"]],
            ].map(([category, links], i) => (
              <div key={i}>
                <h4 className="font-semibold text-white mb-3">{category}</h4>
                <div className="space-y-2">
                  {links.map((link, j) => (
                    <a
                      key={j}
                      href="#"
                      className="block text-white hover:underline transition text-sm"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Interactive Courses */}
        <CollapsibleSection title="Interactive Courses">
          <div className="space-y-4">
            {[
              ["Carbon Footprint Fundamentals", "Beginner", "Learn to calculate and reduce your personal carbon footprint", "2 hours", "1,234 enrolled", "bg-green-100 text-black"],
              ["Renewable Energy Systems", "Intermediate", "Comprehensive guide to solar, wind, and other renewable technologies", "4 hours", "876 enrolled", "bg-orange-500 text-white"],
              ["Sustainable Business Practices", "Advanced", "Implement sustainability in corporate environments and business operations", "6 hours", "543 enrolled", "bg-red-500 text-white"],
            ].map(([title, level, desc, time, users, badgeClass], i) => (
              <div key={i} className="bg-white p-4 rounded border border-green-700">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-black">{title}</h4>
                  <span className={`px-2 py-1 rounded text-xs ${badgeClass}`}>{level}</span>
                </div>
                <p className="text-green-700 text-sm mb-3">{desc}</p>
                <div className="flex items-center text-sm text-green-700">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{time}</span>
                  <Users className="w-4 h-4 ml-4 mr-1" />
                  <span>{users}</span>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      </div>
    </HelpLayout>
  );
}
