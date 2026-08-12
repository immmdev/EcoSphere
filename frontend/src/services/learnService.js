import api from "./api";

const getArticles = ({ page = 1, limit = 9, category = "All" } = {}) =>
  api.get("/api/learn/all-articles", { params: { page, limit, category } });

const toggleLike = (articleId) => api.post("/api/learn/likes-update", { articleId });

const getLikes = (articleId) => api.get(`/api/learn/${articleId}`);

const createArticle = (formData) => api.post("/api/learn/new-article", formData);

export default { getArticles, toggleLike, getLikes, createArticle };
