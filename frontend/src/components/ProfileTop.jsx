import React from "react";
import { FaShareAlt, FaCog } from "react-icons/fa";
import ProfileMiddle from "./ProfileMiddle";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";

function ProfileTop() {
    const [profileData, setProfileData] = React.useState({});
    const { token, backendUrl } = React.useContext(ShopContext);

    const fetchProfileData = async () => {
        if (!token) {
            return;
        }
        try {
            const response = await axios.post(`${backendUrl}/api/user/profile`, {}, {headers: {token}});
            if (response.data.success) {
                setProfileData(response.data.user);
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    }

    React.useEffect(() => {
        if (token) {
            fetchProfileData();
        }
    }, [token]);


	return (
		<div
			style={{ borderRadius: "10px" }}
			className="flex items-center justify-between px-4 py-4 bg-green-100 rounded-b-2xl shadow-md border-b border-green-100 text-white"
		>
			{/* Profile Info */}
			<div className="flex items-center gap-3">
				<div className="w-14 h-14 bg-[#BFFF00] text-black rounded-full flex items-center justify-center text-xl font-extrabold shadow-inner">
					{profileData.name ? profileData.name.charAt(0).toUpperCase() : "U"}
				</div>
				<div>
					<h3 className="font-semibold text-lg text-green-800">{profileData.name}</h3>
					<p className="text-sm text-green-900">{profileData.email}</p>
				</div>
			</div>

			{/* Actions */}
			<div className="flex items-center gap-3 text-green-800 text-lg">
				<FaShareAlt className="cursor-pointer hover:text-[#BFFF00] transition" />
				<FaCog className="cursor-pointer hover:text-[#BFFF00] transition" />
			</div>
		</div>
	);
}

export default ProfileTop;
