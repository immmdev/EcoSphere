import React from "react";
import { assets } from "../assets/assets.js";

const Navbar = ({ setToken }) => {
	return (
		<div className="flex items-center py-2 px-[4%] justify-between">
			<div className="flex items-center gap-2">
				<img alt="logo" className="w-10 h-10" src="/earth.png" />
				<span style={{ fontFamily: "Pacifico" }} className="text-green-700 text-lg">
					EcoSphere
				</span>
			</div>
			<button
				onClick={() => setToken("")}
				className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm shadow-md transition-colors duration-200 font-semibold"
			>
				Logout
			</button>
		</div>
	);
};

export default Navbar;
