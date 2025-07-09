import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Riya Kapoor',
    role: 'Food Creator',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    message:
      'My sister and I used a recipe from this platform and loved it! The easy instructions and great community features made cooking together a blast.',
  },
  {
    name: 'Ayesha Sharma',
    role: 'Eco Blogger',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    message:
      'This platform helped me connect with like-minded eco warriors. Loved the community engagement and daily tips!',
  },
  {
    name: 'Priya Mehra',
    role: 'Sustainability Coach',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    message:
      'The community here is unlike anything I’ve seen. Super helpful and creative with lots of green ideas!',
  },
];

const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % testimonials.length);
        setFade(true);
      }, 300); // Wait for fade-out before switching
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setFade(true);
    }, 300);
  };

  const nextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
      setFade(true);
    }, 300);
  };

  const testimonial = testimonials[index];

  return (
    <div className="py-16 bg-white px-6 md:px-12">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          What Our Members
        </h2>
        <p className="text-xl text-orange-500 font-semibold mt-1 italic">Are Saying</p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 relative">
        {/* Left - Static Image and Reviewers */}
        <div className="relative w-full max-w-sm">
          <img
            src="https://images.unsplash.com/photo-1606788075760-c8f7eab8d3fa"
            alt="Cooking"
            className="rounded-3xl shadow-md"
          />
          <img
            src="https://images.unsplash.com/photo-1559628233-4b8b4a4bba33"
            alt="Dish"
            className="absolute -bottom-8 -right-8 w-40 rounded-2xl shadow-md border-4 border-white"
          />
          <div className="absolute -bottom-14 left-4 bg-white px-4 py-2 rounded-xl shadow-md flex items-center gap-2">
            <img
              src="https://randomuser.me/api/portraits/women/1.jpg"
              className="w-8 h-8 rounded-full"
              alt="reviewer"
            />
            <img
              src="https://randomuser.me/api/portraits/women/2.jpg"
              className="w-8 h-8 rounded-full"
              alt="reviewer"
            />
            <img
              src="https://randomuser.me/api/portraits/women/3.jpg"
              className="w-8 h-8 rounded-full"
              alt="reviewer"
            />
            <span className="text-sm font-semibold text-gray-700 bg-yellow-300 px-2 py-1 rounded-full">
              +2.4k
            </span>
          </div>
        </div>

        {/* Right - Testimonial Card */}
        <div className="relative bg-white shadow-lg px-6 py-8 rounded-2xl text-center max-w-xl min-h-[280px]">
          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-orange-200 hover:bg-orange-300 p-2 rounded-full"
          >
            <FaChevronLeft className="text-orange-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-orange-200 hover:bg-orange-300 p-2 rounded-full"
          >
            <FaChevronRight className="text-orange-700" />
          </button>

          {/* Fade transition */}
          <div
            className={`transition-opacity duration-500 ease-in-out ${
              fade ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-14 h-14 rounded-full mx-auto mb-2"
            />
            <h4 className="font-semibold text-md">{testimonial.name}</h4>
            <p className="text-xs text-gray-500">{testimonial.role}</p>
            <p className="text-sm text-gray-800 mt-4">{testimonial.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
