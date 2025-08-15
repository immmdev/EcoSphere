import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { TrendingUp } from 'lucide-react';

function HomeHero() {
  return (
    <section
      className="relative w-full h-[90vh] bg-green-700 bg-cover bg-center flex items-center"
      style={{
        backgroundImage: "url('/bg-forest-1.jpg')", // path same rakha hai
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div> {/* <-- FIXED */}

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-16 relative z-10 flex flex-col lg:flex-row items-center justify-between">
        
        <motion.div
          className="text-white max-w-xxl text-center lg:text-left"
          initial={{ opacity: 0.4, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center lg:justify-start gap-2">
            <TrendingUp className="text-green-400 w-8 h-8" />
            BE THE <span className="text-green-400">CHANGE!</span>
          </h1>

          <p
            style={{ fontSize: "20px", fontWeight: "500" }}
            className="text-lg text-white mb-8"
          >
            Join our citizen-led movement for climate action with EcoSphere.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <Link
              style={{ fontFamily: "Raleway, sans-serif" }}
              to="/signup"
              className="bg-lime-300 text-black font-semibold px-6 py-2 rounded-full shadow-[0_4px_0_#65a30d] hover:translate-y-[1px] hover:shadow-[0_2px_0_#65a30d] active:translate-y-[2px] active:shadow-none transition-all duration-150"
            >
              Join Us
            </Link>

            <Link
              style={{ fontFamily: "Raleway, sans-serif" }}
              to="/initiatives"
              className="bg-emerald-400 text-black font-semibold px-6 py-2 rounded-full shadow-[0_4px_0_#047857] hover:translate-y-[1px] hover:shadow-[0_2px_0_#047857] active:translate-y-[2px] active:shadow-none transition-all duration-150"
            >
              More about Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HomeHero;
