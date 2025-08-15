import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function IntroRightHome({ header, info, visitLink, imgURL }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="px-5 py-10 max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-10"
        >
            {/* Left Content */}
            <div className="sm:w-1/2 text-center sm:text-left">
                <h1 className="text-3xl text-white font-semibold">{header}</h1>
                <p className="text-green-100 mt-2">{info}</p>
                <div className="mt-4">
                    <Link
                        style={{ fontFamily: "Raleway, sans-serif" }}
                        to={visitLink}
                        className="bg-lime-300 text-black font-semibold px-6 py-2 rounded-full shadow-[0_4px_0_#65a30d] hover:translate-y-[1px] hover:shadow-[0_2px_0_#65a30d] active:translate-y-[2px] active:shadow-none transition-all duration-150"
                    >
                        Learn more
                    </Link>
                </div>
            </div>

            {/* Right Image - Hidden on mobile */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
                className="sm:w-1/2 text-center mb-5 hidden sm:block"
            >
                <img src={imgURL} alt={header} className="w-4/5 mx-auto" />
            </motion.div>
        </motion.div>
    );
}

export default IntroRightHome;
