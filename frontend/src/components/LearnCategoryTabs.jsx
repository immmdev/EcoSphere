import React, { useState, useRef, useContext } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ShopContext } from "../contexts/ShopContext";

const categories = [
  "All",
  "Climate Change",
  "Sustainable Living",
  "Renewable Energy",
  "Food & Diet",
  "Sustainable Fashion",
  "Eco-Friendly Homes",
  "Waste & Recycling",
  "Biodiversity & Nature",
  "DIY Projects",
];

function ArticleFilters() {
  const {activeTab, setActiveTab} = useContext(ShopContext);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full flex items-center justify-center gap-2">
     
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="text-green-100 transition"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Scrollable Categories */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto no-scrollbar py-4 px-2"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200
              ${
                activeTab === category
                  ? "bg-lime-300 text-green-900 shadow-[0_4px_0_#65a30d]"
                  : "bg-emerald-400 text-green-900 shadow-[0_4px_0_#047857] hover:bg-emerald-500"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Right Arrow */}
      <div></div>
      <button
        onClick={() => scroll("right")}
        className="text-green-100  transition"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
}

export default ArticleFilters;
