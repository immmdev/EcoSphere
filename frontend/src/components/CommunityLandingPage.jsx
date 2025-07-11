import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../contexts/ShopContext";

function CommunityLanding() {
  const { backendUrl, navigate, refresh, setRefresh } = useContext(ShopContext);
  const [tab, setTab] = useState("all");
  const [communities, setCommunities] = useState([]);
  const [communityName, setCommunityName]=useState("");

  const fetchCommunity = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/communities/all-communities`);
      setCommunities(res.data);
      console.log("Successfully fetched communities");
    } catch (err) {
      console.error("Community fetch failed", err);
    }
  };

  useEffect(() => {
    fetchCommunity();
  }, [refresh]);


  const joiningCommunity = async () => {
    try {
      await axios.post(`${backendUrl}/api/communities/join-community`,{communityName} ,{ headers: { token } });
      toast.success("joined");
      return true;
    } catch (err) {
      console.error(err);
      toast.error("EcoCommunity Creation failed");
      return false;
    }
  };

  let onJoinHandler = async (e) => {
    e.preventDefault();
    const isJoin = joiningCommunity();

    if (isJoin) {
      setCommunityName(e.target.value)
      setRefresh(!refresh);

    }

    


  }

  const filtered = tab === "joined"
    ? communities.filter((c) => c.joined)
    : communities;

  const handleCreateCommunity = () => {
    navigate("/communities/new");
  };

  return (
    <div className="eco-static-bg min-h-screen text-green-900 ">
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 mb-20 flex flex-col justify-center items-center z-20 text-center px-4 -translate-y-10">
          <h1 className="text-5xl mb-md:text-5xl font-extrabold text-white">
            EcoCommunities
          </h1>
          <p className="text-white text-lg font-semibold text-center">
            Here you can join communities of like-minded people who share your environmental goals. <br />
            Connect, share ideas, and spark conversations through posts and comments.
          </p>
          <button
            onClick={handleCreateCommunity}
            className='mt-5 bg-lime-300 text-green-900 font-semibold px-6 py-2 rounded-full shadow-[0_4px_0_#65a30d] hover:translate-y-[1px] hover:shadow-[0_2px_0_#65a30d] active:translate-y-[2px] active:shadow-none transition-all duration-150'
          >
            + Create Community
          </button>
        </div>
        <img
          style={{ width: "95%" }}
          src="https://cdn.pixabay.com/photo/2018/11/29/21/51/social-media-3846597_1280.png"
          alt="Community Banner"
        />
        <div className="absolute inset-0 bg-black/30 z-10" />
      </div>

      {/* Tabs */}
      <div className="flex gap-3 p-4 mt-5">
        {["all"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`font-semibold px-6 py-2 rounded-full transition-all duration-150 ${tab === t
                ? 'bg-lime-300 text-green-900 shadow-[0_4px_0_#65a30d]'
                : 'bg-emerald-400 text-green-900 shadow-[0_4px_0_#047857]'
              } hover:translate-y-[1px] active:translate-y-[2px] active:shadow-none`}
          >
            All Communities
          </button>
        ))}
      </div>

      {/* Community Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 pb-10 mt-5">
        {filtered.map((comm) => (
          <div
            key={comm._id}
            className="bg-green-50 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={comm.coverImage}
              alt={`${comm.name} cover`}
              className="w-full h-40 object-cover"
            />
            <div className="p-5 mt-5">
              <h2 className="text-2xl font-extrabold text-green-900 mb-2">{comm.name}</h2>
              <p className="text-md font-semibold text-green-800 mb-1">{comm.agenda}</p>
              <p className="text-sm text-green-700 mb-1">{comm.description}</p>
              <p className="text-sm text-green-700 mb-3">{comm.members} members</p>

              <div className="flex justify-between items-center mt-4">

                <button
                  onClick={onJoinHandler} 
                  value={comm.name}
                  className='font-semibold px-6 py-2 rounded-full transition-all duration-150
                    bg-emerald-400 text-green-900 shadow-[0_4px_0_#047857]
                   hover:translate-y-[1px] active:translate-y-[2px] active:shadow-none'
                >Join</button>
                <Link
                  to={`/community/${comm._id}`}
                  state={{ community: comm }}
                  className="text-sm text-green-700 font-medium hover:underline hover:text-green-900"
                >
                  Explore →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityLanding;
