import api from "./api";

const login = (email, password) => api.post("/api/user/login", { email, password });

const register = (name, email, phone, password) =>
  api.post("/api/user/register", { name, email, phone, password });

const getProfile = () => api.post("/api/user/profile", {});

const toggleFollow = (targetUserId) => api.post("/api/user/follow", { targetUserId });

export default { login, register, getProfile, toggleFollow };
