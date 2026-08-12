import api from "./api";

const sendMessage = (form) => api.post("/api/contact/contact", form);

export default { sendMessage };
