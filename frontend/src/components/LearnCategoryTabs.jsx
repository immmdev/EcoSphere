import React, { useState } from 'react';

function LearnCategoryTabs() {
  const [activeTab, setActiveTab] = useState('All');

  const categories = [
    'All',
    'Carbon Basics',
    'Zero Waste',
    'DIY Reuse Projects',
    'Green Tech',
    'Nature',
    'Natural Beauty'
  ];

  return (
    <div className="mt-10 px-4 md:px-8">
        <div className='eco-static-bg py-6 px-4 border border-b border-green-100'>
        {/* Filters + Buttons */}
        <div className="flex flex-wrap justify-center gap-2">


          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={
                activeTab === category ? 'bg-lime-300 text-green-900 font-semibold px-6 py-2 rounded-full shadow-[0_4px_0_#65a30d] hover:translate-y-[1px] hover:shadow-[0_2px_0_#65a30d] active:translate-y-[2px] active:shadow-none transition-all duration-150' :
                 'bg-emerald-400 text-green-900 font-semibold px-6 py-2 rounded-full shadow-[0_4px_0_#047857] hover:translate-y-[1px] hover:shadow-[0_2px_0_#047857] active:translate-y-[2px] active:shadow-none transition-all duration-150'
              }
            >
              {category}
            </button>
          ))}
        </div>
         </div>
      </div>

  );
}

export default LearnCategoryTabs;
