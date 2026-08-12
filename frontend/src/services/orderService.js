import api from "./api";

const ORDER_ENDPOINTS = {
  cod: "/api/order/place",
  stripe: "/api/order/stripe",
  razorpay: "/api/order/razorpay",
};

const placeOrder = (method, orderData) => {
  const endpoint = ORDER_ENDPOINTS[method];
  if (!endpoint) {
    return Promise.reject(new Error(`Unsupported payment method: ${method}`));
  }
  return api.post(endpoint, orderData);
};

const verifyRazorpay = (response) => api.post("/api/order/verifyRazorpay", { response });

export default { placeOrder, verifyRazorpay };
