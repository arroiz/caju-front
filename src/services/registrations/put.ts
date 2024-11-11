import { RegistrationUpdateData } from './types';
import { apiClient } from '~/config/apiClient';

export const updateRegistration = (data: RegistrationUpdateData) =>
  apiClient.put(`/registrations/${data.id}`, data);
