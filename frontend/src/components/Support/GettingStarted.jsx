import { useState } from "react";
import {
  Rocket,
  CheckCircle,
  Play,
  Download,
  HelpCircle,
  Mail,
  TrendingUp,
  Users,
  ShoppingBag,
} from "lucide-react";
import HelpLayout from './HelpLayout';

export default function GettingStarted() {
  const [completedSteps, setCompletedSteps] = useState([true, false, false]);

  const toggleStep = (index) => {
    const updatedSteps = [...completedSteps];
    updatedSteps[index] = !updatedSteps[index];
    setCompletedSteps(updatedSteps);
  };

  

  return (
    <HelpLayout
      title="Getting Started with EcoSphere"
      description="Your complete guide to setting up and beginning your sustainable journey"
      icon={<Rocket className="text-lime-300" />}
      breadcrumb="Getting Started"
    >
   
      {/* Steps */}
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="border border-lime-700 rounded-lg">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div
                  className={`rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 ${
                    completedSteps[index] ? "bg-lime-300 text-black" : "bg-lime-700 text-white"
                  }`}
                >
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {["Create Your Profile", "Explore Key Features", "Start Your Journey"][index]}
                </h3>
                <button onClick={() => toggleStep(index)} className="ml-auto">
                  <CheckCircle
                    className={`w-6 h-6 ${
                      completedSteps[index] ? "text-lime-300" : "text-gray-500"
                    }`}
                  />
                </button>
              </div>

              {/* Step content */}
              {index === 0 && (
                <>
                  <p className="text-green-100 mb-4">
                    Set up your personal profile to get personalized recommendations and track your progress.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <InfoBox
                      title="Basic Information"
                      points={[
                        "Upload a profile photo",
                        "Add your location",
                        "Set your sustainability goals",
                        "Choose your interests",
                      ]}
                    />
                    <InfoBox
                      title="Privacy Settings"
                      points={[
                        "Adjust visibility preferences",
                        "Set notification preferences",
                        "Choose data sharing options",
                        "Configure privacy controls",
                      ]}
                    />
                  </div>
                  
                </>
              )}

              {index === 1 && (
                <>
                  <p className="text-green-100 mb-4">
                    Familiarize yourself with EcoSphere's main features and tools.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <FeatureCard
                      icon={<TrendingUp className="w-8 h-8 text-lime-300 mx-auto mb-2" />}
                      title="Carbon Tracker"
                      description="Monitor your daily carbon footprint"
                    />
                    <FeatureCard
                      icon={<Users className="w-8 h-8 text-lime-300 mx-auto mb-2" />}
                      title="Communities"
                      description="Connect with eco-minded people"
                    />
                    <FeatureCard
                      icon={<ShoppingBag className="w-8 h-8 text-lime-300 mx-auto mb-2" />}
                      title="EcoShop"
                      description="Buy and sell sustainable products"
                    />
                  </div>
                </>
              )}

              {index === 2 && (
                <>
                  <p className="text-white mb-4">Take your first steps towards a more sustainable lifestyle.</p>
                  <div className="space-y-3">
                    {[
                      "Log your first carbon footprint entry",
                      "Join your first community",
                      "Browse learning resources",
                      "Set your first sustainability goal",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center p-3 bg-white text-black rounded border border-lime-700"
                      >
                        <CheckCircle className="w-5 h-5 text-black mr-3" />
                        <span className="text-black">{item}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="mt-8 bg-white text-black rounded-lg p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Quick Links</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <QuickLink icon={<HelpCircle className="w-4 h-4 mr-2" />} label="Frequently Asked Questions" link = "/support" />
          <QuickLink icon={<Mail className="w-4 h-4 mr-2" />} label="Contact Support Team" link = "/contact"/>
        </div>
      </div>
    </HelpLayout>
  );
}

function InfoBox({ title, points }) {
  return (
    <div className="bg-white text-black p-4 rounded border border-lime-700">
      <h4 className="font-semibold  mb-2">{title}</h4>
      <ul className="text-black space-y-1 text-sm">
        {points.map((point, i) => (
          <li key={i}>• {point}</li>
        ))}
      </ul>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="text-black bg-white p-4 rounded border border-lime-700 text-center">
      {icon}
      <h4 className="font-semibold text-white mb-2">{title}</h4>
      <p className=" text-sm">{description}</p>
    </div>
  );
}

function QuickLink({ icon, label ,link}) {
  return (
    <a href={link} className="text-black hover:text-lime-300 transition flex items-center">
      {icon}
      {label}
      
    </a>
  );
}
