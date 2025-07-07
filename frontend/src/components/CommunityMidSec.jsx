import React from 'react'
import { useState,useEffect } from 'react';

const CommunityMidSec = () => {
     const sliderImages = [
      'https://media.istockphoto.com/id/1493434989/photo/150-individual-personalities-collage.jpg?s=2048x2048&w=is&k=20&c=-kqVgcEtLr52AlBShQhZ81qB9K4_P3Oe1MTxAvB_1ck=',
      'https://cdn.pixabay.com/photo/2023/08/04/07/22/people-8168554_1280.jpg',
      'https://images.pexels.com/photos/32866061/pexels-photo-32866061.jpeg',
      'https://media.istockphoto.com/id/1480574526/photo/happy-multigenerational-people-having-fun-sitting-on-grass-in-a-public-park.jpg?s=2048x2048&w=is&k=20&c=b2yrJ_XBjqOeKbzVv6JcWdDrgXZ7FQ1kacnWGj8mtP0='
    ];
    
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
      }, 3000); // Change slide every 3 seconds
      return () => clearInterval(interval);
    }, []);
    
  return (

    
    <div>    {/* Past Community Interactions Slider */}
<div className="bg-white py-12">
  <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
    Past Community Interactions
  </h2>
  <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-xl shadow-md h-100">
    <div
      className="flex transition-transform duration-700 ease-in-out"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      {sliderImages.map((img, idx) => (
        <div key={idx} className="min-w-full h-100">
          <img
            src={img}
            alt={`Slide ${idx}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  </div>
</div>
</div>
  )
}

export default CommunityMidSec