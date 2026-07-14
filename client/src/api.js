import axios from "axios";

// Read API URL from environment variable, default to localhost for local development
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
