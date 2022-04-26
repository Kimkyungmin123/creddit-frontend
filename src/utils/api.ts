import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import reIssueAuthToken from './reIssueAuthToken';

export const API_ENDPOINT = 'http://localhost:8080';

const api = axios.create({ baseURL: API_ENDPOINT });

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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    await reIssueAuthToken();
    api(error.config);
    return Promise.reject(error);
  }
);

export default api;
