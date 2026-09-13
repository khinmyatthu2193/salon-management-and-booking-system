import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — attach token from cookie if present (for SSR/manual cases)
api.interceptors.request.use((config) => {
  return config;
});

// Response interceptor — handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear auth state on next client tick
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth:unauthorized"));
      }
    }
    return Promise.reject(error);
  }
);

export default api;
