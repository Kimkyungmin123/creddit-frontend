import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import reIssueAuthToken from './reIssueAuthToken';

export const fetcher = (url: string) => api.get(url).then((res) => res.data);

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT });

api.interceptors.request.use(
  (config: RequestConfig) => {
    if ((config.retryCount || 0) > 1) return;

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
  async (error: ResponseError) => {
    const { url } = error.config;
    if (
      url === '/auth/reissueAccessRefreshToken' ||
      url === '/auth/reissueAccessToken'
    ) {
      return Promise.reject(error);
    }

    await reIssueAuthToken();
    error.config.retryCount = (error.config.retryCount || 0) + 1;
    return api(error.config);
  }
);

interface RequestConfig extends AxiosRequestConfig {
  retryCount?: number;
}

interface ResponseError extends AxiosError {
  config: RequestConfig;
}

export default api;
