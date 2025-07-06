
import { Link } from 'react-router-dom';
import { useState } from 'react';


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  let onmouseEnterHandler = (e, linkName) => {
    e.preventDefault();
    setHoveredLink(linkName);
  };

  let OnMouseExithandler = (e) => {
    e.preventDefault();
    setHoveredLink(null);
  };

  return (
    <nav className="bg-black border-b border-black px-4 py-3">
      <div className="max-w-7xl mx-auto flex  items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/earth.png" alt="logo" className="w-10 h-10" />
          <span  style={{fontFamily: 'Pacifico'}} className="text-gray-300 text-lg ">EcoSphere</span>
        </Link>

        {/* Toggler for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-600 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Nav Links */}
        <div className={`${isOpen ? 'block' : 'hidden'} lg:flex items-center gap-6`}>
          <ul style={{fontWeight:"400"}} className="flex flex-col lg:flex-row items-center gap-10 text-sm mt-4 lg:mt-0">

            <li>
              <Link to="/" onMouseLeave={OnMouseExithandler} onMouseEnter={(e) => onmouseEnterHandler(e, "home")} className={hoveredLink === "home" ? "text-green-400 transition-colors duration-200 no-underline" : "text-gray-300 hover:text-caribbeanGreen transition-colors duration-200 no-underline"}>
                Home
              </Link>
            </li>

            <li>
              <Link to="/eco-shop" onMouseLeave={OnMouseExithandler} onMouseEnter={(e) => onmouseEnterHandler(e, "eco-shop")} className={hoveredLink === "eco-shop" ? "text-green-400 transition-colors duration-200 no-underline" : "text-gray-300 hover:text-caribbeanGreen transition-colors duration-200 no-underline"}>
                EcoShopping
              </Link>
            </li>

            <li>
              <Link to="/communities" onMouseLeave={OnMouseExithandler} onMouseEnter={(e) => onmouseEnterHandler(e, "communities")} className={hoveredLink === "communities" ? "text-green-400 transition-colors duration-200 no-underline" : "text-gray-300 hover:text-caribbeanGreen transition-colors duration-200 no-underline"}>
                Communities
              </Link>
            </li>

            <li>
              <Link to="/learn" onMouseLeave={OnMouseExithandler} onMouseEnter={(e) => onmouseEnterHandler(e, "learn")} className={hoveredLink === "learn" ? "text-green-400 transition-colors duration-200 no-underline" : "text-gray-300 hover:text-caribbeanGreen transition-colors duration-200 no-underline"}>
                Learn
              </Link>
            </li>

            <li>
              <Link to="/initiatives" onMouseLeave={OnMouseExithandler} onMouseEnter={(e) => onmouseEnterHandler(e, "initiatives")} className={hoveredLink === "initiatives" ? "text-green-400 transition-colors duration-200 no-underline" : "text-gray-300 hover:text-caribbeanGreen transition-colors duration-200 no-underline"}>
                Initiatives
              </Link>
            </li>

            <li>
              <Link to="/support" onMouseLeave={OnMouseExithandler} onMouseEnter={(e) => onmouseEnterHandler(e, "support")} className={hoveredLink === "support" ? "text-green-400 transition-colors duration-200 no-underline" : "text-gray-300 hover:text-caribbeanGreen transition-colors duration-200 no-underline"}>
                Support
              </Link>
            </li>

            <li>
              <Link to="/contact" onMouseLeave={OnMouseExithandler} onMouseEnter={(e) => onmouseEnterHandler(e, "contact")} className={hoveredLink === "contact" ? "text-green-400 transition-colors duration-200 no-underline" : "text-gray-300 hover:text-caribbeanGreen transition-colors duration-200 no-underline"}>
                Contact
              </Link>
            </li>

            <li>
              <Link to="/login" onMouseLeave={OnMouseExithandler} onMouseEnter={(e) => onmouseEnterHandler(e, "login")} className={hoveredLink === "login" ? "text-green-400 transition-colors duration-200 no-underline" : "text-gray-300 hover:text-caribbeanGreen transition-colors duration-200 no-underline"}>
                Login
              </Link>
            </li>

            <li>
              <Link to="/signup" onMouseLeave={OnMouseExithandler} onMouseEnter={(e) => onmouseEnterHandler(e, "signup")} className={hoveredLink === "signup" ? "text-green-400 transition-colors duration-200 no-underline" : "text-gray-300 hover:text-caribbeanGreen transition-colors duration-200 no-underline"}>
                Signup
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
