import api from "./api";

const logFootprint = (formData) => api.post("/api/carbon/log", formData);

const getHistory = () => api.get("/api/carbon/history");

const getSummary = () => api.get("/api/carbon/summary");

export default { logFootprint, getHistory, getSummary };
