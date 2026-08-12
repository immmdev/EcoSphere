import api from "./api";

const listCommunities = () => api.get("/api/communities/all-communities");

const createCommunity = (formData) => api.post("/api/communities/new-community", formData);

const actionCommunity = (communityName, action) =>
  api.post("/api/communities/action-community", { communityName, action });

const fetchMembers = (communityId) => api.get(`/api/communities/${communityId}`);

const fetchCommunityPosts = (communityId) =>
  api.post("/api/communities/fetch-community-posts", { communityId });

const makePost = (formData) => api.post("/api/communities/make-post", formData);

const toggleLike = (postId) => api.post("/api/communities/post/like", { postId });

const addComment = (postId, content) =>
  api.post("/api/communities/post/comment", { postId, content });

export default {
  listCommunities,
  createCommunity,
  actionCommunity,
  fetchMembers,
  fetchCommunityPosts,
  makePost,
  toggleLike,
  addComment,
};
