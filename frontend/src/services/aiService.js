import api from "./api";

const ask = (payLoad) => api.post("/api/ai/generate", { payLoad });

export default { ask };
