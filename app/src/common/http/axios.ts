import axios from "axios";

const GuestHttp = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const AuthenticatedHttp = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

AuthenticatedHttp.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

AuthenticatedHttp.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status !== 401) {
      // localStorage.removeItem("token");
      // window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export { AuthenticatedHttp, GuestHttp };
