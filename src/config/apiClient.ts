import axios from 'axios';
import { BASE_URL } from './environmentConstants';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json, */*',
  },
});
