import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CollapsibleSection({ title, icon, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-lime-700 rounded-lg">
      <button
        className="w-full p-6 text-left hover:bg-green-900 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {icon && <div className="text-xl mr-4">{icon}</div>}
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-lime-300" />
          ) : (
            <ChevronDown className="w-5 h-5 text-lime-300" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="p-6 pt-0">
          {children}
        </div>
      )}
    </div>
  );
}
