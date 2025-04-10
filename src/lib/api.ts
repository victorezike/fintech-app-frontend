import axios from "axios";
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/authStore";


const apiKey = process.env.NEXT_PUBLIC_API_KEY;


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
   headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-API-Key': apiKey,
    'OrganizationId': '2'
  },
});

// Request Interceptor
api.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  console.log(token)
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post<{ token: string }>("/api/auth/refresh", {}, { withCredentials: true });

        Cookies.set("access_token", data.token, { expires: 7 });
        // useAuthStore.getState().set({ token: data.token });

        return api(originalRequest);
      } catch (err) {
        useAuthStore.getState().logout();
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
