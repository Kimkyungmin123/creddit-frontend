import axios from 'axios';
import Cookies from 'js-cookie';

export const API_ENDPOINT = 'http://localhost:8080';

// TODO: refresh token 유효 기간이 3일 이하면 refresh token 재발급 받기

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
    // TODO: 요청 시 401 에러가 뜨면 refresh token으로 access token 재발급 받기
    return Promise.reject(error);
  }
);

export default api;
