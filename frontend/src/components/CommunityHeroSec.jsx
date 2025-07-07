import React from 'react'

const CommunityHeroSec = () => {
  return (
     <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src="https://cdn.pixabay.com/photo/2018/11/29/21/51/social-media-3846597_1280.png"
          alt="Community Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0  bg-opacity-40 flex flex-col items-center justify-center text-center text-gray-500 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">EcoSphere Community</h1>
          <p className="text-lg max-w-2xl">
            Where changemakers, eco-enthusiasts, and green thinkers unite to share, inspire, and act for the planet.
          </p>
        </div>
      </div>
  )
}

export default CommunityHeroSec