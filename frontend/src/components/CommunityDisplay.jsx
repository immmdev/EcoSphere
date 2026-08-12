import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import communityService from "../services/communityService";
import userService from "../services/userService";
import CommunityDisplayLeft from "./CommunityDisplayLeft";
import CommunityDisplayMiddle from "./CommunityDisplayMiddle";
import CommunityDisplayFollowers from "./CommunityDisplayFollowes";
import CommunityDisplayRight from "./CommunityDisplayRight";



function CommunityDisplay() {
  const location = useLocation();
  const { id } = useParams()
  const { community } = location.state || {};
  const [joins, setjoins] = useState(0);
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [membersId, setMembersId] = useState([]);
  const [followingIds, setFollowingIds] = useState([]);

  let token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).id : null;

  // fetch who the current user is already following
  useEffect(() => {
    const fetchFollowing = async () => {
      if (!token) return;
      try {
        const res = await userService.getProfile();
        if (res.data.success) {
          setFollowingIds((res.data.user.following || []).map((id) => id.toString()));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchFollowing();
  }, [token]);

  // follow/unfollow a community member
  const handleToggleFollow = async (targetUserId) => {
    setFollowingIds((prev) =>
      prev.includes(targetUserId)
        ? prev.filter((id) => id !== targetUserId)
        : [...prev, targetUserId]
    );

    try {
      await userService.toggleFollow(targetUserId);
    } catch (err) {
      console.error("Follow error:", err);
      toast.error("Something went wrong");
      // rollback on failure
      setFollowingIds((prev) =>
        prev.includes(targetUserId)
          ? prev.filter((id) => id !== targetUserId)
          : [...prev, targetUserId]
      );
    }
  };



  const [filteredPosts, setFilteredPosts] = useState([]);
  const [chatInputs, setChatInputs] = useState({});
  const [openComments, setOpenComments] = useState({});

  // fetch community posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await communityService.fetchCommunityPosts(community._id);
        if (res.status === 200) {
          setFilteredPosts(res.data.posts);
        }
      } catch { }
    };
    if (community?._id) fetchPosts();
  }, [community?._id]);

  // fetch members & joins
  const fetchJoins = async () => {
    try {
      const res = await communityService.fetchMembers(id);
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
      await communityService.actionCommunity(communityName, action);

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



  // setting chats input in comments
  const handleInputChange = (id, value) => {
    setChatInputs((prev) => ({ ...prev, [id]: value }));
  };

  // handling comments
  const handleAddComment = async (postId) => {
    const value = chatInputs[postId];
    if (!value?.trim()) return;

    try {
      const res = await communityService.addComment(postId, value.trim());
      setFilteredPosts((prev) =>
        prev.map((post) => (post._id === postId ? { ...post, comments: res.data.comments } : post))
      );
      setChatInputs((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error("Error adding comment:", err);
      toast.error("Failed to add comment");
    }
  };

  // handling likes
  const handleToggleLike = async (postId) => {
    try {
      const res = await communityService.toggleLike(postId);
      setFilteredPosts((prev) =>
        prev.map((post) => (post._id === postId ? { ...post, likes: res.data.likes } : post))
      );
    } catch (err) {
      console.error("Error toggling like:", err);
      toast.error("Failed to update like");
    }
  };

  // comment toggle button
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

  return (
    <div className="eco-static-bg min-h-screen grid lg:grid-cols-3 grid-cols-1  justify-between  text-green-900">

      {/* left section for community description */}
      <CommunityDisplayLeft
        community={community}
        joins={joins}
        handleShare={handleShare}
        membersId={membersId}
        token={token}
        loading={loading}
        setLoading={setLoading}
        joiningCommunity={joiningCommunity}
      />

      {/* followers section for small screen */}
      <CommunityDisplayFollowers
        members={members}
        userId={userId}
        followingIds={followingIds}
        handleToggleFollow={handleToggleFollow}
      />

      {/* middle section for community feed */}
      <CommunityDisplayMiddle
        filteredPosts={filteredPosts}
        handleAddComment={handleAddComment}
        handleInputChange={handleInputChange}
        chatInputs={chatInputs}
        openComments={openComments}
        toggleComments={toggleComments}
        handleToggleLike={handleToggleLike}
        userId={userId}
      />

      {/* right section for followers large and medium screen */}
      <CommunityDisplayRight
        members={members}
        userId={userId}
        followingIds={followingIds}
        handleToggleFollow={handleToggleFollow}
      />

    </div>
  );
}

export default CommunityDisplay;
