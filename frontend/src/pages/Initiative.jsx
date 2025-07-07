import React, { useState, useEffect } from 'react';

const categories = [
  'All',
  'Tree Plantation',
  'Waste Management',
  'Sustainable Living',
  'Awareness Drives',
  'Community Cleanups',
  'Workshops',
];

const featured = [
  {
    title: 'Green Roots: Tree Plantation Drive',
    image: 'https://www.aces.edu/wp-content/uploads/2019/03/GettyImages-1096104376.jpg',
    description: 'Join our mission to plant 1000 trees across urban zones.',
    category: 'Tree Plantation',
  },
  {
    title: 'Zero-Waste Week Challenge',
    image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=1170&auto=format&fit=crop',
    description: 'Live a week without generating waste. Are you in?',
    category: 'Waste Management',
  },
  {
    title: 'Eco Talks in Schools',
    image: 'https://hindustanuniv.ac.in/assets/img/events/2023/jan/road-safety-awareness3.jpg',
    description: 'Spreading awareness through education in rural schools.',
    category: 'Awareness Drives',
  },
];

const images = [
  'https://images.unsplash.com/photo-1638560926839-cb90ababd947?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1679580447808-b5b6911aacea?q=80&w=1170&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1591184510259-b6f1be3d7aff?q=80&w=1170&auto=format&fit=crop',
];

const Initiatives = () => {
  const [current, setCurrent] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const slide = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(slide);
  }, []);

  const filteredInitiatives =
    selectedCategory === 'All'
      ? featured
      : featured.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-green-50 text-green-900 min-h-screen">
      {/* Header Section with Slider */}
      <section className="relative h-[70vh] flex items-center justify-center text-center bg-green-50 overflow-hidden">
        {/* Image Slider */}
        <div className="absolute inset-0 z-0">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Slide ${i}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                i === current ? 'opacity-80' : 'opacity-0'
              }`}
            />
          ))}
        </div>

        {/* Content on top */}
        <div className="relative z-10 px-4">
          <h1 className="text-4xl font-bold text-green-800">Our Initiatives for a Greener Future</h1>
          <p className="mt-4 text-green-900 max-w-2xl mx-auto">
            Explore environmental campaigns and projects making real change — join, support, or create your own.
          </p>
          <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md">
              + Create Initiative
            </button>
            <button className="bg-white text-green-700 border border-green-600 px-6 py-2 rounded-md hover:bg-green-100">
              Explore All
            </button>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-white py-6 px-4 border-t border-b border-green-200">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`px-4 py-2 border rounded-full text-sm transition ${
                selectedCategory === cat
                  ? 'bg-green-600 text-white border-green-600'
                  : 'border-green-500 text-green-700 hover:bg-green-100'
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* All Initiatives Grid */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
       <h2 className="text-2xl font-bold text-green-700 mb-6">
  {selectedCategory === 'All'
    ? 'All Initiatives'
    : `${selectedCategory} Initiatives`}
</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {filteredInitiatives.map((item, i) => (
            <div key={i} className="bg-white shadow-md rounded-md p-4 space-y-3">
              <img
                src={item.image}
                alt="Initiative"
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">Location: India | Status: Active</p>
              <span className="inline-block bg-green-100 text-green-800 px-2 py-1 text-xs rounded">
                {item.category}
              </span>
              <button className="block text-green-600 font-medium hover:underline">Join</button>
            </div>
          ))}
        </div>
        {filteredInitiatives.length === 0 && (
          <p className="text-center text-gray-600 mt-4">No initiatives found in this category.</p>
        )}
      </section>
    </div>
  );
};

export default Initiatives;
