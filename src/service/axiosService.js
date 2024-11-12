import axios from 'axios';
import { backendUrl } from 'global';
import storageService from './storageService';
import authService from './authService';
const axiosService = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

axiosService.interceptors.request.use(
  (config) => {
    const token = storageService.getAccessToken();
    if (!config.headers.Authorization) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    if (config.url.endsWith('refresh-token')) {
      const refreshToken = storageService.getRefreshToken();
      if (refreshToken) {
        config.headers['refresh-token'] = refreshToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosService.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await authService.consumeRefreshToken(storageService.getUserId());

        const { token, refreshToken } = response.data.payload;
        storageService.setAccessToken(token);
        storageService.setRefreshToken(refreshToken);
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return axiosService(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosService;
