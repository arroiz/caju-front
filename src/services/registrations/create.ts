import { apiClient } from '~/config/apiClient';
import { RegistrationCreationData, RegistrationServerData } from './types';

export const createRegistrationService = (data: RegistrationCreationData) =>
  apiClient.post<RegistrationServerData>('/registrations', data);
