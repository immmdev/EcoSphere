import React, { useEffect, useRef, useState } from "react";

function IntroLeftCalci({ header, info, imgURL }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`px-5 py-10 max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Image */}
      <div
        className={`${
          isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        } transition-all duration-700 flex w-full sm:w-1/2 justify-center`}
      >
        <img src={imgURL} alt={header} className="w-4/5" />
      </div>

      {/* Text */}
      <div
        className={`${
          isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        } transition-all duration-700 w-full sm:w-1/2 text-center sm:text-left`}
      >
        <h1 className="text-2xl text-white font-semibold">{header}</h1>
        <p className="text-green-100 mt-2">{info}</p>
      </div>
    </div>
  );
}

export default IntroLeftCalci;
