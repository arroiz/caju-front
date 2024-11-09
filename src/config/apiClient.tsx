import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_SERVICE_BASE_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json, */*',
  },
});
