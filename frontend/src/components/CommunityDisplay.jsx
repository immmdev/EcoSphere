import React, { useContext, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { ShopContext } from "../contexts/ShopContext";
import { jwtDecode } from "jwt-decode";



function CommunityDisplay() {
  const location = useLocation();
  const { id } = useParams()
  const { backendUrl } = useContext(ShopContext);
  const { community } = location.state || {};
  const [joins, setjoins] = useState(0);
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [membersId, setMembersId] = useState([]);
  const [open, setOpen] = useState(false);

  let token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).id : null;



  const [filteredPosts, setFilteredPosts] = useState([]);
  const [chatInputs, setChatInputs] = useState({});
  const [openComments, setOpenComments] = useState({});

  // fetch community posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.post(
          `${backendUrl}/api/communities/fetch-community-posts`,
          { communityId: community._id },
          { headers: { token } }
        );
        if (res.status === 200) {
          setFilteredPosts(res.data.posts);
        }
      } catch { }
    };
    fetchPosts();
  }, [backendUrl, community?._id, token]);

  // fetch members & joins
  const fetchJoins = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/communities/${id}`);
      setMembers(res.data.members);
      setjoins(res.data.members.length);
      setMembersId(res.data.members.map((member) => {
        return member._id;
      }))
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJoins();
  }, []);


  // Optimistic Join/Leave handler
  const joiningCommunity = async (communityName, action) => {
    setLoading(true);

    // optimistic update first ui changes then chnges in backend
    if (action === "join") {
      setMembersId((prev) => [...prev, userId]);
      setjoins((prev) => prev + 1);
    } else {
      setMembersId((prev) => prev.filter((id) => id !== userId));
      setjoins((prev) => Math.max(0, prev - 1));
    }

    try {
      await axios.post(
        `${backendUrl}/api/communities/action-community`,
        { communityName, action },
        { headers: { token } }
      );

      // sync actual server data fetched from backend 
      fetchJoins();
    } catch (err) {
      console.error("Join Error:", err);
      toast.error("Something went wrong");

      // rollback UI if error
      fetchJoins();
    } finally {
      setLoading(false);
    }
  };



  const handleInputChange = (id, value) => {
    setChatInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddComment = (id) => {
    const value = chatInputs[id];
    if (value?.trim()) {
      const postIndex = dummyPosts.findIndex((p) => p.id === id);
      dummyPosts[postIndex].comments.push({ user: "You", text: value });
      setChatInputs((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const toggleComments = (id) => {
    setOpenComments((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!community) {
    return <div className="p-6 text-green-800">Community data not found.</div>;
  }

  // Share handler
  const handleShare = async () => {
    const url = window.location.href;
    const title = community?.title || 'Check this out!';
    const text = `Have a look at this community I found about ${community.agenda} on EcoSphere`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        try {
          await navigator.clipboard.writeText(url);
          toast.info('Link copied to clipboard!');
        } catch {
          toast.error('Failed to share link');
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
      } catch {
        toast.error('Failed to copy link');
      }
    }
  };

  if (!community) {
    return <div className="p-6 text-green-800">Community data not found.</div>;
  }

  return (
    <div className="eco-static-bg min-h-screen grid lg:grid-cols-3 grid-cols-1  justify-between  text-green-900">

      {/* Community Description (Left Section) */}
      <div className="eco-static-bg border-1 border-r-green-100 w-full p-5 ">

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <img className="w-6 h-6" src="/earth.png" alt="logo" />
          <span
            style={{ fontFamily: 'Pacifico, cursive' }}
            className="text-white text-lg font-medium"
          >
            EcoSphere
          </span>
        </div>

        {/* Cover Image */}
        <div className="rounded-2xl overflow-hidden mb-4">
          <img
            src={community.coverImage}
            alt={`${community.name} cover`}
            className="w-full object-cover rounded-2xl"
          />
        </div>

        {/* Community Info */}
        <div className="text-left whitespace-pre-wrap">
          <h1 className="text-4xl font-bold text-green-100 mb-3">
            {community.name}
          </h1>

          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg text-green-100">Admin: {community.creator.name}</h1>
            <h1 className="text-lg text-green-100">Members: {joins}</h1>
          </div>

          <p className="text-lg text-green-100">{community.agenda}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-6 bg-green-100 rounded-2xl px-5 py-3 w-fit shadow-md">

          {/* share button */}
          <button onClick={handleShare} className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="25"
              width="25"
              fill="#0d542b"
              viewBox="0 0 640 640"
            >
              <path d="M448 256C501 256 544 213 544 160C544 107 501 64 448 64C395 64 352 107 352 160C352 165.4 352.5 170.8 353.3 176L223.6 248.1C206.7 233.1 184.4 224 160 224C107 224 64 267 64 320C64 373 107 416 160 416C184.4 416 206.6 406.9 223.6 391.9L353.3 464C352.4 469.2 352 474.5 352 480C352 533 395 576 448 576C501 576 544 533 544 480C544 427 501 384 448 384C423.6 384 401.4 393.1 384.4 408.1L254.7 336C255.6 330.8 256 325.5 256 320C256 314.5 255.5 309.2 254.7 304L384.4 231.9C401.3 246.9 423.6 256 448 256z" />
            </svg>
          </button>

         
          {/* WhatsApp */}
          <a
            href={`https://wa.me/91${community.creator.phone}?text=Hi%20${community.creator.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="29"
              fill="#0d542b"
              viewBox="0 0 640 640"

            >
              <path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z" />
            </svg>
            {community.creator.phone}
          </a>



          {/* Join Button with Text */}
          {membersId.includes(jwtDecode(token).id) ? (
            <button
              disabled={loading}
              onClick={() => {
                setLoading(true);
                joiningCommunity(community.name, "leave");
              }}
              className="flex items-center gap-2 transition-opacity duration-200"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-green-900"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  ></path>
                </svg>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22"
                    width="22"
                    fill="#0d542b"
                    viewBox="0 0 640 640"
                  >
                    <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" />
                  </svg>
                  <span className="text-green-900 font-medium">Following</span>
                </>
              )}
            </button>
          ) : (
            <button
              disabled={loading}
              onClick={() => {
                setLoading(true);
                joiningCommunity(community.name, "join");
              }}
              className="flex items-center gap-2 transition-opacity duration-200"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-green-900"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  ></path>
                </svg>
              ) : (
                <>
                  <svg
                    height="22"
                    width="22"
                    fill="#0d542b"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                  >
                    <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
                  </svg>
                  <span className="text-green-900 font-medium">Follow</span>
                </>
              )}
            </button>
          )}

          <Link to={{
            pathname: "/communities/post/new",
            search: `?communityId=${community._id}`,
          }}>          <button className="flex items-center gap-1">
              <svg height="22"
                width="22"
                fill="#0d542b"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"><path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM296 408L296 344L232 344C218.7 344 208 333.3 208 320C208 306.7 218.7 296 232 296L296 296L296 232C296 218.7 306.7 208 320 208C333.3 208 344 218.7 344 232L344 296L408 296C421.3 296 432 306.7 432 320C432 333.3 421.3 344 408 344L344 344L344 408C344 421.3 333.3 432 320 432C306.7 432 296 421.3 296 408z" /></svg>
              <span>Create</span>
            </button>
          </Link>

        </div>
      </div>

      <div className="eco-static-bg border border-y-green-100 sm:hidden w-full px-5 py-4">
       

        {/* followers card horizontally scrollable */}
        <div className="overflow-x-auto no-scrollbar flex gap-4 pb-2">
          {members.map((member, index) => (
            <div
              key={index}
              className="bg-green-100 text-green-900 p-4 rounded-xl shadow flex flex-col items-center min-w-[140px]"
            >
              {/* Avatar */}
              <img
                className="bg-green-900 rounded-full h-20 w-20 p-1 mb-3"
                src="https://png.pngtree.com/png-vector/20231019/ourlarge/pngtree-user-profile-avatar-png-image_10211467.png"
                alt={member.name}
              />

              {/* Name */}
              <div className="font-medium text-green-900 mb-3 text-center">{member.name}</div>

              {/* Follow Button */}
              <button className="px-4 py-1 rounded-full font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 bg-emerald-400 text-green-900 shadow-[0_4px_0_#047857] hover:bg-emerald-500">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>


      {/* middle part */}
      <div className="w-full lg:px-16 md:px-14 px-4 py-5">
        <div className="bg-green-100 text-green-900 h-10 w-full mb-4 flex justify-center rounded-xl items-center text-2xl">
          Community Feed
        </div>

        {/* SCROLLABLE WRAPPER */}
        <div className="lg:h-[600px] lg:overflow-y-auto md:h-[600px] md:overflow-y-auto  no-scrollbar ">
          
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-green-100 rounded-xl shadow-md mb-5 overflow-hidden"
            >
              <div className="relative">
                <img src={post.image} alt={post.title} className="w-full h-60 object-cover" />
              </div>
              <div className="p-4">
                <h2 className="font-bold text-md uppercase mb-2">{post.title}</h2>
                <p className="text-sm text-green-800 mb-3">{post.content}</p>
                <div className="text-xs text-green-800 flex justify-between mb-2">
                  <div className="bg-green-700 text-white text-xs px-2 py-1 rounded">
                    {post.tag}
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <button>
                        <FaHeart className="text-green-600 w-10 h-4 transition-colors duration-200" />
                      </button>
                    </div>
                    <div>{post.joins}</div>
                  </div>
                </div>

                <div className="flex justify-between mb-5 mt-2">
                  <div className="text-sm">Posted by {post.authorId.name}</div>
                  <div className="text-sm">{post.time}</div>
                </div>

                <button
                  onClick={() => toggleComments(post.id)}
                  className="text-green-700 text-sm font-medium hover:underline"
                >
                  {openComments[post.id] ? "Hide Comments" : "View Comments"}
                </button>

                {openComments[post.id] && (
                  <div className="mt-4 border-t pt-3">
                    <h4 className="text-green-700 font-medium mb-2">Comments</h4>
                    {post.comments.map((cmt, idx) => (
                      <div key={idx} className="text-sm text-gray-800 mb-1">
                        <strong className="text-green-800">{cmt.user}:</strong> {cmt.text}
                      </div>
                    ))}
                    <div className="mt-2 flex gap-2">
                      <input
                        value={chatInputs[post.id] || ""}
                        onChange={(e) => handleInputChange(post.id, e.target.value)}
                        className="flex-1 border border-green-300 px-3 py-1 rounded-md text-sm"
                        placeholder="Add a comment..."
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="eco-static-bg border hidden md:block border-l-green-100 w-full px-5 py-4 ">
        <div className="bg-green-100 text-green-900 h-10 w-full mb-4 flex justify-center rounded-xl items-center text-2xl">Community Members</div>
        {/* followers card */}
        <div className="h-[600px] overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">

            {members.map((member, index) => (
              <div
                key={index}
                className="bg-green-100 text-green-900 p-4 rounded-xl shadow flex flex-col items-center"
              >
                {/* Avatar */}
                <img
                  className="bg-green-900 rounded-full h-20 w-20 p-1 mb-3"
                  src="https://png.pngtree.com/png-vector/20231019/ourlarge/pngtree-user-profile-avatar-png-image_10211467.png"
                  alt={member.name}
                />

                {/* Name */}
                <div className="font-medium text-green-900 mb-3 text-center">{member.name}</div>

                {/* Follow Button */}
                <button className="px-6 py-1 rounded-full font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 bg-emerald-400 text-green-900 shadow-[0_4px_0_#047857] hover:bg-emerald-500">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
}

export default CommunityDisplay;

