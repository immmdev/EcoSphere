import api from "./api";

const listInitiatives = () => api.get("/api/initiative/getinitiatives");

const createInitiative = (formData) => api.post("/api/initiative/create", formData);

const memberAction = (initiativeId, action) =>
  api.post("/api/initiative/memberaction", { initiativeId, action });

const fetchJoins = (initiativeId) => api.get(`/api/initiative/${initiativeId}`);

export default { listInitiatives, createInitiative, memberAction, fetchJoins };
