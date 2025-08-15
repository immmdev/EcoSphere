import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function InfoSection({ imgURL, header, info, visitLink }) {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    // Appear animation trigger on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <div
            ref={sectionRef}
            className={`px-5 py-5 max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-10 min-h-screen transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
            {/* Image - hide on small screen */}
            <div
                className={`${
                    isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
                } transition-all duration-700 hidden sm:flex sm:w-1/2 justify-center`}
            >
                <img
                    style={{ width: "90%" }}
                    src={imgURL}
                    alt="calculator"
                    className="w-4/5"
                />
            </div>

            {/* Text - full width when image hidden */}
            <div
                className={`${
                    isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
                } transition-all duration-700 w-full sm:w-1/2 text-center sm:text-left`}
            >
                <h1 className="text-2xl text-white font-semibold">{header}</h1>
                <p className="text-green-100 mt-2">{info}</p>

                <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-4 mb-5">
                    <Link
                        style={{ fontFamily: "Raleway, sans-serif" }}
                        to={visitLink}
                        className="bg-lime-300 text-black font-semibold px-6 py-2 rounded-full shadow-[0_4px_0_#65a30d] hover:translate-y-[1px] hover:shadow-[0_2px_0_#65a30d] active:translate-y-[2px] active:shadow-none transition-all duration-150"
                    >
                        Learn more
                    </Link>
                </div>
            </div>
        </div>
    );
}
