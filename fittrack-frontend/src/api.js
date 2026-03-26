import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

// 🔥 ALWAYS ATTACH TOKEN
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// 🔥 HANDLE 401 (AUTO LOGOUT)
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export default API;