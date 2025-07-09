import React from 'react';

const CommunityHeroSec = () => {
  return (
    <div className="relative h-[60vh] w-full overflow-hidden">
      {/* Background Image */}
      <img
        src="https://cdn.pixabay.com/photo/2018/11/29/21/51/social-media-3846597_1280.png"
        alt="Community Banner"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-center px-4">
        <h2 className="text-xl md:text-2xl font-semibold text-green-100">
          See What Makes Our{' '}
          <span className="text-green-900 font-bold">Community Shine</span>
        </h2>

        <h3 className="mt-4 text-xl md:text-3xl font-bold text-green-50">
          Experience the Passion and Creativity <br /> of Our Top Community Members!
        </h3>

        {/* Avatars */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <img
            src="https://randomuser.me/api/portraits/women/1.jpg"
            className="w-8 h-8 rounded-full border-2 border-white"
            alt="user"
          />
          <img
            src="https://randomuser.me/api/portraits/women/2.jpg"
            className="w-8 h-8 rounded-full border-2 border-white"
            alt="user"
          />
          <img
            src="https://randomuser.me/api/portraits/women/3.jpg"
            className="w-8 h-8 rounded-full border-2 border-white"
            alt="user"
          />
          <span className="text-sm font-medium bg-yellow-300 px-2 py-1 rounded-full text-green-900">
            +2.4k
          </span>
        </div>

        {/* Button */}
        <button className="mt-6 bg-green-900 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition">
          Join the Community Now
        </button>
      </div>
    </div>
  );
};

export default CommunityHeroSec;
