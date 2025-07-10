import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function HelpLayout({ children, title, description, icon, breadcrumb }) {
  return (
    <div className=" eco-static-bg min-h-screen">
      {/* Navigation Header */}
      <nav className=" border-b border-lime-700 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/support" className="text-lime-300 hover:text-lime-200 transition flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Support
              </Link>
            </div>
            <div className="text-lime-300 font-semibold">EcoSphere Help Center</div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-3">
        <nav className="text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-green-100">
            <li>
              <Link to="/support" className="hover:text-lime-300">
                Support
              </Link>
            </li>
            <li><ChevronRight className="w-3 h-3 mx-2" /></li>
            <li className="text-lime-300">{breadcrumb}</li>
          </ol>
        </nav>
      </div>

      {/* Page Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">{icon}</div>
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          <p className="text-green-100">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
