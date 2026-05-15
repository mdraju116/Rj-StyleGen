import axios from 'axios';

//export const API_URL = 'http://localhost:4000'; //this is the backend localhost address
 
//export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const API_URL = "https://rj-stylegen.onrender.com/api";

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

// Adding an Interceptor 
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
