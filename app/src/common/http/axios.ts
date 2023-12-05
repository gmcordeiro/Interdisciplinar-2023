import axios from "axios";
import { jwtDecode } from "jwt-decode";

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
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

const getToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const { exp } = jwtDecode(token);

    if (!exp || Date.now() >= exp * 1000) {
      throw new Error("Token expired");
    }
  } catch (error) {
    localStorage.removeItem("token");
    return null;
  }

  return token;
};

AuthenticatedHttp.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { AuthenticatedHttp, GuestHttp };
