import { RegistrationUpdateData } from './types';
import { apiClient } from '~/config/apiClient';

const listUrl = import.meta.env.SERVICE_BASE_URL;

export const updateRegistration = (data: RegistrationUpdateData) => apiClient.post(listUrl, data);
