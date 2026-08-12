import api from "./api";

const getDashboardStats = () => api.get("/api/stats/dashboard");

export default { getDashboardStats };
