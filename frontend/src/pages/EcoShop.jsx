import React from "react";
import LatestCollection from "../components/EcoShopComponents/LatestCollection";
import BestSeller from "../components/EcoShopComponents/BestSeller";

const EcoShop = () => {
	return (
		<div className='px-4 sm:px-[2vw] md:px-[4vw] lg:px-[5vw] eco-static-bg'>
			<LatestCollection />
			<BestSeller />
		</div>
	);
};

export default EcoShop;
