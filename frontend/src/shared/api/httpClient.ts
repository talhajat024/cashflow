import axios from 'axios';

export const httpClient = axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL,
    headers:{
        "Content-Type":"application/json",
    },
});

httpClient.interceptors.request.use((config) => {
  // Example: attach auth token later
  // const token = authStore.getToken();
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error handling
    return Promise.reject(
      error.response?.data?.message ?? "Something went wrong"
    );
  }
);