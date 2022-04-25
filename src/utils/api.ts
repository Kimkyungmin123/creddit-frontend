import axios from 'axios';
import Cookies from 'js-cookie';

export const API_ENDPOINT = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_ENDPOINT,
});

api.interceptors.request.use(
  (config) => {
    if (config.headers) {
      const accessToken = Cookies.get('access_token');
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
